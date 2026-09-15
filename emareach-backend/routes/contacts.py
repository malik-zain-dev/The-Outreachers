"""Contacts management routes"""
import asyncio
import re
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, UploadFile, File, Depends, Request, Query
from pymongo import UpdateOne

from database import db
from routes.dependencies import get_current_user
from config import BLOCK_AFTER_EMAILS
from services.excel_service import ExcelService, UploadContactError, MAX_UPLOAD_BYTES, ALLOWED_EXTENSIONS
from services.email_validation import validate_email_full
from services.zerobounce_helpers import get_zerobounce_api_key_for_user
from routes.region import get_client_ip
from routes.schemas import (
    ContactsSaveRequest,
    DeleteContactsRequest,
    CreateContactRequest,
    UpdateContactRequest,
    UnblockContactsRequest,
    BlockContactsRequest,
    ContactsImportCSVRequest,
    ContactEnrichRequest,
    BulkActionRequest,
)
from services.serper_helpers import get_serper_api_key_for_user, serper_search
from routes.contact_lists import _raise_if_list_used_by_active_campaign, raise_if_any_list_used_by_active_campaign
from services.notification_service import notification_service

router = APIRouter()

# Initialize service (will be injected from server.py)
excel_service: ExcelService = None

def init_excel_service(service: ExcelService):
    """Initialize Excel service"""
    global excel_service
    excel_service = service

def _allowed_file(filename: str) -> bool:
    if not filename or "." not in filename:
        return False
    ext = "." + filename.rsplit(".", 1)[-1].lower()
    return ext in ALLOWED_EXTENSIONS

@router.post("/contacts/upload")
async def upload_contacts(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    """Upload CSV or Excel file and parse contacts. Returns structured error with code, message, fix on failure."""
    filename = file.filename or ""

    if not _allowed_file(filename):
        raise HTTPException(
            status_code=400,
            detail={
                "code": "INVALID_FILE_TYPE",
                "message": f"File type not allowed. Use .csv, .xlsx, or .xls.",
                "fix": "Choose a CSV or Excel file, or download our example CSV.",
                "detail": filename or "No filename",
            },
        )

    try:
        contents = await file.read()
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail={
                "code": "FILE_READ_ERROR",
                "message": "We couldn't read the file.",
                "fix": "Try saving the file again and re-upload, or use a different file.",
                "detail": str(e),
            },
        )

    if len(contents) > MAX_UPLOAD_BYTES:
        raise HTTPException(
            status_code=400,
            detail={
                "code": "FILE_TOO_LARGE",
                "message": f"File is too large (max {MAX_UPLOAD_BYTES // (1024*1024)} MB).",
                "fix": "Split your file into smaller files or remove unnecessary columns.",
                "detail": f"Size: {len(contents) / (1024*1024):.1f} MB",
            },
        )

    try:
        contacts_data = excel_service.parse_excel(contents, filename)
        fields = excel_service.get_available_fields(contacts_data)

        return {
            "message": "File uploaded successfully",
            "total_rows": len(contacts_data),
            "available_fields": fields,
            "preview": contacts_data[:5],
            "contacts_data": contacts_data,
        }
    except UploadContactError as e:
        raise HTTPException(status_code=400, detail=e.to_dict())
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail={
                "code": "PARSE_ERROR",
                "message": "We couldn't process the file.",
                "fix": "Ensure the file is a valid CSV or Excel file. Try the example CSV format.",
                "detail": str(e),
            },
        )

@router.post("/contacts/save")
async def save_contacts(request: ContactsSaveRequest, current_user: dict = Depends(get_current_user)):
    """Save parsed contacts to database"""
    if request.user_id != current_user["id"]:
        raise HTTPException(status_code=403, detail="Access denied")
    try:
        contacts = excel_service.map_contacts(
            current_user["id"],
            request.contacts_data,
            request.field_mapping,
        )

        # Deduplicate by email (case-insensitive) before any DB work
        seen_emails: set[str] = set()
        unique_contacts: list[dict] = []
        for contact in contacts:
            email_key = (contact.get("email") or "").strip().lower()
            if not email_key or email_key in seen_emails:
                continue
            seen_emails.add(email_key)
            unique_contacts.append(contact)

        contacts = unique_contacts
        contact_ids: list[str] = []

        # Process contacts in batches with up to 5 concurrent workers, using bulk_write per batch
        BATCH_SIZE = 100
        MAX_WORKERS = 5

        async def process_batch(batch: list[dict]) -> list[str]:
            ops: list[UpdateOne] = []
            batch_contact_ids: list[str] = []
            user_id = current_user["id"]

            for contact in batch:
                email = (contact.get("email") or "").strip()
                if not email:
                    continue
                email_escaped = re.escape(email)
                email_query = {
                    "user_id": user_id,
                    "email": {"$regex": f"^{email_escaped}$", "$options": "i"},
                }
                existing = await db.contacts.find_one(email_query)
                if existing:
                    contact["id"] = existing["id"]
                batch_contact_ids.append(contact["id"])
                ops.append(UpdateOne(email_query, {"$set": contact}, upsert=True))

            if ops:
                await db.contacts.bulk_write(ops, ordered=False)

            return batch_contact_ids

        batches: list[list[dict]] = [
            contacts[i : i + BATCH_SIZE] for i in range(0, len(contacts), BATCH_SIZE)
        ]

        for i in range(0, len(batches), MAX_WORKERS):
            group = batches[i : i + MAX_WORKERS]
            results = await asyncio.gather(*(process_batch(batch) for batch in group))
            for ids in results:
                contact_ids.extend(ids)
        
        # Add to list: by list_id, or by list_name (add to existing if same name, else create new)
        list_id = None
        list_name_out = None
        if request.list_id and contact_ids:
            existing = await db.contact_lists.find_one(
                {"id": request.list_id, "user_id": current_user["id"]}
            )
            if existing:
                await _raise_if_list_used_by_active_campaign(request.list_id)
                await db.contact_lists.update_one(
                    {"id": request.list_id},
                    {"$addToSet": {"contact_ids": {"$each": contact_ids}}}
                )
                list_id = existing["id"]
                list_name_out = existing.get("name")
        elif request.list_name and contact_ids:
            name_trimmed = request.list_name.strip()
            existing = await db.contact_lists.find_one(
                {"user_id": current_user["id"], "name": {"$regex": f"^{re.escape(name_trimmed)}$", "$options": "i"}}
            )
            if existing:
                await _raise_if_list_used_by_active_campaign(existing["id"])
                await db.contact_lists.update_one(
                    {"id": existing["id"]},
                    {"$addToSet": {"contact_ids": {"$each": contact_ids}}}
                )
                list_id = existing["id"]
                list_name_out = existing.get("name")
            else:
                contact_list = {
                    "id": str(uuid.uuid4()),
                    "user_id": current_user["id"],
                    "name": name_trimmed,
                    "contact_ids": contact_ids,
                    "created_at": datetime.now(timezone.utc),
                    "updated_at": datetime.now(timezone.utc)
                }
                await db.contact_lists.insert_one(contact_list)
                list_id = contact_list["id"]
                list_name_out = contact_list["name"]

        return {
            "message": f"Saved {len(contacts)} contacts",
            "list_id": list_id,
            "list_name": list_name_out
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/contacts")
async def get_contacts(
    skip: int = 0,
    limit: int = 50,
    search: str | None = None,
    list_id: str | None = None,
    source: str | None = None,
    status: str | None = None,
    company: str | None = None,
    industry: str | None = None,
    location: str | None = None,
    has_email: bool | None = None,
    has_phone: bool | None = None,
    has_linkedin: bool | None = None,
    has_website: bool | None = None,
    current_user: dict = Depends(get_current_user)
):
    """Get contacts for user with rich composable filtering, multi-field search, and pagination."""
    user_id = current_user["id"]
    and_conditions: list[dict] = [{"user_id": user_id}]

    # 1. Search across multiple fields (first_name, last_name, email, company, title, industry, location, phone, linkedin_url, website_url)
    if search and search.strip():
        raw_search = search.strip()
        terms = raw_search.split()
        for term in terms:
            escaped = re.escape(term)
            and_conditions.append({
                "$or": [
                    {"first_name": {"$regex": escaped, "$options": "i"}},
                    {"last_name": {"$regex": escaped, "$options": "i"}},
                    {"email": {"$regex": escaped, "$options": "i"}},
                    {"company": {"$regex": escaped, "$options": "i"}},
                    {"title": {"$regex": escaped, "$options": "i"}},
                    {"industry": {"$regex": escaped, "$options": "i"}},
                    {"location": {"$regex": escaped, "$options": "i"}},
                    {"phone": {"$regex": escaped, "$options": "i"}},
                    {"linkedin_url": {"$regex": escaped, "$options": "i"}},
                    {"website_url": {"$regex": escaped, "$options": "i"}},
                ]
            })

    # 2. List filter
    if list_id and list_id.strip():
        contact_list = await db.contact_lists.find_one(
            {"id": list_id.strip(), "user_id": user_id},
            {"contact_ids": 1}
        )
        c_ids = (contact_list or {}).get("contact_ids", [])
        and_conditions.append({"id": {"$in": c_ids}})

    # 3. Source filter
    if source and source.strip():
        and_conditions.append({"source": source.strip()})

    # 4. Status filter
    if status and status.strip():
        and_conditions.append({"status": status.strip()})

    # 5. Company filter
    if company and company.strip():
        and_conditions.append({"company": {"$regex": re.escape(company.strip()), "$options": "i"}})

    # 6. Industry filter
    if industry and industry.strip():
        and_conditions.append({"industry": {"$regex": re.escape(industry.strip()), "$options": "i"}})

    # 7. Location filter
    if location and location.strip():
        and_conditions.append({"location": {"$regex": re.escape(location.strip()), "$options": "i"}})

    # 8. Boolean presence filters (Has Email, Has Phone, Has LinkedIn, Has Website)
    if has_email is not None:
        if has_email:
            and_conditions.append({
                "email": {"$exists": True, "$ne": None, "$nin": ["", None]}
            })
        else:
            and_conditions.append({
                "$or": [
                    {"email": {"$exists": False}},
                    {"email": None},
                    {"email": ""},
                ]
            })

    if has_phone is not None:
        if has_phone:
            and_conditions.append({
                "phone": {"$exists": True, "$ne": None, "$nin": ["", None]}
            })
        else:
            and_conditions.append({
                "$or": [
                    {"phone": {"$exists": False}},
                    {"phone": None},
                    {"phone": ""},
                ]
            })

    if has_linkedin is not None:
        if has_linkedin:
            and_conditions.append({
                "linkedin_url": {"$exists": True, "$ne": None, "$nin": ["", None]}
            })
        else:
            and_conditions.append({
                "$or": [
                    {"linkedin_url": {"$exists": False}},
                    {"linkedin_url": None},
                    {"linkedin_url": ""},
                ]
            })

    if has_website is not None:
        if has_website:
            and_conditions.append({
                "website_url": {"$exists": True, "$ne": None, "$nin": ["", None]}
            })
        else:
            and_conditions.append({
                "$or": [
                    {"website_url": {"$exists": False}},
                    {"website_url": None},
                    {"website_url": ""},
                ]
            })

    query = {"$and": and_conditions} if len(and_conditions) > 1 else and_conditions[0]
    total = await db.contacts.count_documents(query)
    contacts = await db.contacts.find(
        query,
        {"_id": 0}
    ).sort("created_at", -1).skip(max(0, skip)).limit(min(max(1, limit), 200)).to_list(None)

    if not contacts:
        return {"contacts": [], "total": total}

    # Fetch all user lists to map list names/IDs to contacts
    all_lists = await db.contact_lists.find(
        {"user_id": user_id},
        {"_id": 0, "id": 1, "name": 1, "contact_ids": 1}
    ).to_list(None)

    list_map: dict[str, list[dict]] = {}
    for l in all_lists:
        lid = l["id"]
        lname = l.get("name", "Unnamed")
        for cid in l.get("contact_ids", []):
            if cid not in list_map:
                list_map[cid] = []
            list_map[cid].append({"id": lid, "name": lname})

    contact_ids = [c["id"] for c in contacts]
    pipeline = [
        {"$match": {"user_id": user_id, "contact_id": {"$in": contact_ids}, "status": {"$in": ["sent", "opened", "clicked", "replied"]}}},
        {"$group": {"_id": "$contact_id", "count": {"$sum": 1}}},
    ]
    counts_cursor = await db.email_logs.aggregate(pipeline).to_list(None)
    global_sent = {x["_id"]: x["count"] for x in counts_cursor}
    verified_statuses = ["opened", "clicked", "replied"]

    for c in contacts:
        cid = c["id"]
        c["sent_count"] = global_sent.get(cid, 0)
        c_status = (c.get("status") or "active").lower()
        manual_unblock = c.get("manual_unblock", False)
        c["blocked"] = (
            c_status == "unsubscribed"
            or c_status == "blocked"
            or (
                not manual_unblock
                and c_status not in verified_statuses
                and c["sent_count"] >= BLOCK_AFTER_EMAILS
            )
        )
        c["lists"] = list_map.get(cid, [])

    return {"contacts": contacts, "total": total}


@router.post("/contacts")
async def create_contact(request: CreateContactRequest, current_user: dict = Depends(get_current_user)):
    """Create a new contact with complete profile properties."""
    user_id = current_user["id"]
    contact_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)

    contact = {
        "id": contact_id,
        "user_id": user_id,
        "email": (request.email or "").strip() or None,
        "first_name": (request.first_name or "").strip() or None,
        "last_name": (request.last_name or "").strip() or None,
        "phone": (request.phone or "").strip() or None,
        "company": (request.company or "").strip() or None,
        "title": (request.title or "").strip() or None,
        "industry": (request.industry or "").strip() or None,
        "location": (request.location or "").strip() or None,
        "linkedin_url": (request.linkedin_url or "").strip() or None,
        "website_url": (request.website_url or "").strip() or None,
        "status": request.status or "active",
        "source": request.source or "manual",
        "custom_fields": request.custom_fields or {},
        "created_at": now,
        "updated_at": now,
    }
    await db.contacts.insert_one(contact)
    contact.pop("_id", None)

    # If list_ids specified, add to lists
    if request.list_ids:
        for lid in request.list_ids:
            await db.contact_lists.update_one(
                {"id": lid, "user_id": user_id},
                {"$addToSet": {"contact_ids": contact_id}}
            )

    return contact


@router.put("/contacts/{contact_id}")
async def update_contact(
    contact_id: str,
    request: UpdateContactRequest,
    current_user: dict = Depends(get_current_user),
):
    """Update contact attributes."""
    user_id = current_user["id"]
    update_data: dict = {"updated_at": datetime.now(timezone.utc)}

    if request.email is not None:
        update_data["email"] = request.email.strip() if request.email else None
    if request.first_name is not None:
        update_data["first_name"] = request.first_name.strip() if request.first_name else None
    if request.last_name is not None:
        update_data["last_name"] = request.last_name.strip() if request.last_name else None
    if request.phone is not None:
        update_data["phone"] = request.phone.strip() if request.phone else None
    if request.company is not None:
        update_data["company"] = request.company.strip() if request.company else None
    if request.title is not None:
        update_data["title"] = request.title.strip() if request.title else None
    if request.industry is not None:
        update_data["industry"] = request.industry.strip() if request.industry else None
    if request.location is not None:
        update_data["location"] = request.location.strip() if request.location else None
    if request.linkedin_url is not None:
        update_data["linkedin_url"] = request.linkedin_url.strip() if request.linkedin_url else None
    if request.website_url is not None:
        update_data["website_url"] = request.website_url.strip() if request.website_url else None
    if request.status is not None:
        update_data["status"] = request.status
    if request.source is not None:
        update_data["source"] = request.source
    if request.custom_fields is not None:
        update_data["custom_fields"] = request.custom_fields

    result = await db.contacts.update_one(
        {"id": contact_id, "user_id": user_id},
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")

    if request.list_ids is not None:
        # Sync list memberships
        await db.contact_lists.update_many(
            {"user_id": user_id},
            {"$pull": {"contact_ids": contact_id}}
        )
        if request.list_ids:
            await db.contact_lists.update_many(
                {"id": {"$in": request.list_ids}, "user_id": user_id},
                {"$addToSet": {"contact_ids": contact_id}}
            )

    return {"message": "Contact updated"}


@router.post("/contacts/import-csv")
async def import_csv_contacts(request: ContactsImportCSVRequest, current_user: dict = Depends(get_current_user)):
    """
    Import contacts with customizable column mapping, preview verification,
    and non-destructive duplicate handling ('update', 'skip', 'keep_both').
    """
    user_id = current_user["id"]
    rows = request.contacts_data or []
    mapping = request.field_mapping or {}
    strategy = request.duplicate_strategy or "update"
    now = datetime.now(timezone.utc)

    if not rows:
        raise HTTPException(status_code=400, detail="No contact data provided for import.")

    imported_count = 0
    updated_count = 0
    skipped_count = 0
    assigned_contact_ids: list[str] = []

    for row in rows:
        # Extract mapped values
        def get_val(target_key: str) -> str | None:
            for src_col, tgt_key in mapping.items():
                if tgt_key == target_key:
                    val = row.get(src_col)
                    if val is not None and str(val).strip():
                        return str(val).strip()
            return None

        email = get_val("email")
        first_name = get_val("first_name")
        last_name = get_val("last_name")
        phone = get_val("phone")
        company = get_val("company")
        title = get_val("title")
        industry = get_val("industry")
        location = get_val("location")
        linkedin_url = get_val("linkedin_url")
        website_url = get_val("website_url")

        # Custom fields for unmapped or explicitly custom mapped keys
        custom_fields: dict[str, Any] = {}
        for src_col, tgt_key in mapping.items():
            if tgt_key.startswith("custom_") or tgt_key == "custom":
                val = row.get(src_col)
                if val is not None and str(val).strip():
                    custom_fields[src_col] = str(val).strip()

        # Duplicate check by email if email exists
        existing = None
        if email:
            existing = await db.contacts.find_one({
                "user_id": user_id,
                "email": {"$regex": f"^{re.escape(email)}$", "$options": "i"}
            })

        if existing:
            if strategy == "skip":
                skipped_count += 1
                assigned_contact_ids.append(existing["id"])
                continue
            elif strategy == "update":
                # Non-destructive merge: update only fields that have values in the new data
                update_set: dict[str, Any] = {"updated_at": now}
                if first_name and not existing.get("first_name"):
                    update_set["first_name"] = first_name
                if last_name and not existing.get("last_name"):
                    update_set["last_name"] = last_name
                if phone and not existing.get("phone"):
                    update_set["phone"] = phone
                if company and not existing.get("company"):
                    update_set["company"] = company
                if title and not existing.get("title"):
                    update_set["title"] = title
                if industry and not existing.get("industry"):
                    update_set["industry"] = industry
                if location and not existing.get("location"):
                    update_set["location"] = location
                if linkedin_url and not existing.get("linkedin_url"):
                    update_set["linkedin_url"] = linkedin_url
                if website_url and not existing.get("website_url"):
                    update_set["website_url"] = website_url
                if custom_fields:
                    merged_custom = existing.get("custom_fields", {}) or {}
                    merged_custom.update(custom_fields)
                    update_set["custom_fields"] = merged_custom

                await db.contacts.update_one({"id": existing["id"]}, {"$set": update_set})
                updated_count += 1
                assigned_contact_ids.append(existing["id"])
                continue
            # keep_both falls through to insert new contact

        # Insert new contact
        new_id = str(uuid.uuid4())
        doc = {
            "id": new_id,
            "user_id": user_id,
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "phone": phone,
            "company": company,
            "title": title,
            "industry": industry,
            "location": location,
            "linkedin_url": linkedin_url,
            "website_url": website_url,
            "status": "active",
            "source": "csv_import",
            "custom_fields": custom_fields,
            "created_at": now,
            "updated_at": now,
        }
        await db.contacts.insert_one(doc)
        imported_count += 1
        assigned_contact_ids.append(new_id)

    # Assign to list if requested
    out_list_id = None
    out_list_name = None
    if request.list_id and assigned_contact_ids:
        existing_list = await db.contact_lists.find_one({"id": request.list_id, "user_id": user_id})
        if existing_list:
            await db.contact_lists.update_one(
                {"id": request.list_id},
                {"$addToSet": {"contact_ids": {"$each": assigned_contact_ids}}}
            )
            out_list_id = existing_list["id"]
            out_list_name = existing_list.get("name")
    elif request.list_name and request.list_name.strip() and assigned_contact_ids:
        lname = request.list_name.strip()
        existing_list = await db.contact_lists.find_one({
            "user_id": user_id,
            "name": {"$regex": f"^{re.escape(lname)}$", "$options": "i"}
        })
        if existing_list:
            await db.contact_lists.update_one(
                {"id": existing_list["id"]},
                {"$addToSet": {"contact_ids": {"$each": assigned_contact_ids}}}
            )
            out_list_id = existing_list["id"]
            out_list_name = existing_list.get("name")
        else:
            new_list = {
                "id": str(uuid.uuid4()),
                "user_id": user_id,
                "name": lname,
                "contact_ids": assigned_contact_ids,
                "created_at": now,
                "updated_at": now,
            }
            await db.contact_lists.insert_one(new_list)
            out_list_id = new_list["id"]
            out_list_name = new_list["name"]

    return {
        "message": f"Successfully processed {len(rows)} contacts",
        "total_rows": len(rows),
        "imported": imported_count,
        "updated": updated_count,
        "skipped": skipped_count,
        "list_id": out_list_id,
        "list_name": out_list_name,
    }


@router.post("/contacts/enrich")
async def enrich_contacts(request: ContactEnrichRequest, current_user: dict = Depends(get_current_user)):
    """
    Search and enrich missing contact info (Email, Phone, LinkedIn, Website) via live Serper search.
    STRICT: Zero data fabrication. If verifiable data is not found, leaves field empty.
    """
    user_id = current_user["id"]
    contact_ids = request.contact_ids or []
    fields = request.fields_to_enrich or ["email", "phone", "linkedin_url", "website_url"]

    if not contact_ids:
        raise HTTPException(status_code=400, detail="No contact IDs provided for enrichment.")

    api_key = request.serper_api_key or await get_serper_api_key_for_user(user_id)
    if not api_key:
        raise HTTPException(
            status_code=400,
            detail="Serper API key is required for enrichment. Please configure it in Settings or pass serper_api_key.",
        )

    contacts = await db.contacts.find(
        {"id": {"$in": contact_ids}, "user_id": user_id},
        {"_id": 0}
    ).to_list(None)

    results = []
    enriched_count = 0

    EMAIL_REGEX = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b')
    PHONE_REGEX = re.compile(r'(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}')
    LINKEDIN_REGEX = re.compile(r'https?://(?:[a-z]{2,3}\.)?linkedin\.com/(?:in|company)/[a-zA-Z0-9_-]+')

    for contact in contacts:
        cid = contact["id"]
        fname = contact.get("first_name") or ""
        lname = contact.get("last_name") or ""
        comp = contact.get("company") or ""
        loc = contact.get("location") or ""
        title = contact.get("title") or ""

        # Build targeted query
        query_parts = []
        if fname or lname:
            query_parts.append(f'"{fname} {lname}".strip()')
        if comp:
            query_parts.append(f'"{comp}"')
        if loc:
            query_parts.append(loc)
        query_parts.append("contact email phone linkedin")
        search_query = " ".join(query_parts)

        found_updates: dict[str, Any] = {}

        try:
            serper_res = await serper_search(api_key=api_key, q=search_query, num=10)
            organic = serper_res.get("organic", [])

            for item in organic:
                snippet = item.get("snippet", "") + " " + item.get("title", "")
                link = item.get("link", "")

                # 1. LinkedIn extraction
                if "linkedin_url" in fields and not contact.get("linkedin_url") and not found_updates.get("linkedin_url"):
                    l_match = LINKEDIN_REGEX.search(link) or LINKEDIN_REGEX.search(snippet)
                    if l_match:
                        found_updates["linkedin_url"] = l_match.group(0)

                # 2. Email extraction
                if "email" in fields and not contact.get("email") and not found_updates.get("email"):
                    e_matches = EMAIL_REGEX.findall(snippet)
                    # Filter out common false positives
                    valid_e = [e for e in e_matches if not any(bad in e.lower() for bad in ["example.com", "sentry.io", "domain.com", "email.com"])]
                    if valid_e:
                        found_updates["email"] = valid_e[0]

                # 3. Phone extraction
                if "phone" in fields and not contact.get("phone") and not found_updates.get("phone"):
                    p_matches = PHONE_REGEX.findall(snippet)
                    if p_matches:
                        found_updates["phone"] = p_matches[0]

                # 4. Website extraction
                if "website_url" in fields and not contact.get("website_url") and not found_updates.get("website_url"):
                    if comp and comp.lower().replace(" ", "") in link.lower() and "linkedin.com" not in link and "facebook.com" not in link:
                        found_updates["website_url"] = link

            if found_updates:
                found_updates["updated_at"] = datetime.now(timezone.utc)
                found_updates["last_enriched_at"] = datetime.now(timezone.utc)
                await db.contacts.update_one(
                    {"id": cid, "user_id": user_id},
                    {"$set": found_updates}
                )
                enriched_count += 1
                results.append({
                    "contact_id": cid,
                    "status": "enriched",
                    "enriched_fields": found_updates,
                })
            else:
                results.append({
                    "contact_id": cid,
                    "status": "no_data_found",
                    "enriched_fields": {},
                })

        except Exception as err:
            results.append({
                "contact_id": cid,
                "status": "error",
                "error": str(err),
            })

    return {
        "message": f"Enrichment finished for {len(contacts)} contacts.",
        "enriched_count": enriched_count,
        "results": results,
    }


@router.post("/contacts/bulk-action")
async def bulk_action_contacts(request: BulkActionRequest, current_user: dict = Depends(get_current_user)):
    """Execute bulk actions: delete, add_to_list, remove_from_list, change_status."""
    user_id = current_user["id"]
    action = request.action
    c_ids = request.contact_ids or []

    if not c_ids:
        raise HTTPException(status_code=400, detail="No contacts specified for bulk action.")

    if action == "delete":
        # Check active campaigns
        lists_with_any = await db.contact_lists.find(
            {"contact_ids": {"$in": c_ids}},
            {"id": 1}
        ).to_list(None)
        list_ids = [lst["id"] for lst in lists_with_any]
        await raise_if_any_list_used_by_active_campaign(list_ids)
        await db.contacts.delete_many({"id": {"$in": c_ids}, "user_id": user_id})
        await db.contact_lists.update_many(
            {},
            {"$pull": {"contact_ids": {"$in": c_ids}}}
        )
        return {"message": f"Deleted {len(c_ids)} contacts."}

    elif action == "add_to_list":
        if not request.list_id:
            raise HTTPException(status_code=400, detail="list_id is required to add contacts to a list.")
        await db.contact_lists.update_one(
            {"id": request.list_id, "user_id": user_id},
            {"$addToSet": {"contact_ids": {"$each": c_ids}}}
        )
        return {"message": f"Added {len(c_ids)} contacts to list."}

    elif action == "remove_from_list":
        if not request.list_id:
            raise HTTPException(status_code=400, detail="list_id is required to remove contacts from a list.")
        await db.contact_lists.update_one(
            {"id": request.list_id, "user_id": user_id},
            {"$pull": {"contact_ids": {"$in": c_ids}}}
        )
        return {"message": f"Removed {len(c_ids)} contacts from list."}

    elif action == "change_status":
        if not request.status:
            raise HTTPException(status_code=400, detail="status is required to change contact status.")
        await db.contacts.update_many(
            {"id": {"$in": c_ids}, "user_id": user_id},
            {"$set": {"status": request.status, "updated_at": datetime.now(timezone.utc)}}
        )
        return {"message": f"Updated status to {request.status} for {len(c_ids)} contacts."}

    raise HTTPException(status_code=400, detail=f"Unsupported action '{action}'")

@router.delete("/contacts/{contact_id}")
async def delete_contact(contact_id: str, current_user: dict = Depends(get_current_user)):
    """Delete a contact. Blocked if any list containing this contact is used by an active campaign."""
    user_id = current_user["id"]
    lists_with_contact = await db.contact_lists.find(
        {"contact_ids": contact_id},
        {"id": 1}
    ).to_list(None)
    list_ids = [lst["id"] for lst in lists_with_contact]
    await raise_if_any_list_used_by_active_campaign(list_ids)
    await db.contacts.delete_one({"id": contact_id, "user_id": user_id})
    await db.contact_lists.update_many(
        {},
        {"$pull": {"contact_ids": contact_id}}
    )
    return {"message": "Contact deleted"}


@router.get("/contacts/{contact_id}/history")
async def get_contact_history(contact_id: str, current_user: dict = Depends(get_current_user)):
    """Get full contact history: biodata, campaigns, email logs, opens, clicks, replies, unsubscribes."""
    user_id = current_user["id"]
    contact = await db.contacts.find_one({"id": contact_id, "user_id": user_id}, {"_id": 0})
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    # Email logs for this contact (all campaigns)
    email_logs = await db.email_logs.find(
        {"contact_id": contact_id, "user_id": user_id},
        {"_id": 0, "id": 1, "campaign_id": 1, "subject": 1, "status": 1, "sent_at": 1, "opened_at": 1, "clicked_at": 1, "replied_at": 1}
    ).sort("sent_at", 1).to_list(None)

    # Campaign contacts (events per campaign)
    campaign_contacts = await db.campaign_contacts.find(
        {"contact_id": contact_id, "user_id": user_id},
        {"_id": 0, "campaign_id": 1, "status": 1, "events": 1, "last_activity": 1}
    ).to_list(None)

    # Campaign names
    campaign_ids = list({el["campaign_id"] for el in email_logs} | {cc["campaign_id"] for cc in campaign_contacts})
    campaigns = await db.campaigns.find(
        {"id": {"$in": campaign_ids}},
        {"_id": 0, "id": 1, "name": 1}
    ).to_list(None)
    campaign_map = {c["id"]: c.get("name", "Unknown") for c in campaigns}

    # Link clicks for this contact's emails (for click details)
    log_ids = [el["id"] for el in email_logs]
    link_clicks = []
    if log_ids:
        link_clicks = await db.link_clicks.find(
            {"email_log_id": {"$in": log_ids}, "click_count": {"$gt": 0}},
            {"_id": 0, "email_log_id": 1, "original_url": 1, "click_count": 1, "is_unsubscribe": 1}
        ).to_list(None)

    log_to_campaign = {el["id"]: el.get("campaign_id") for el in email_logs}
    log_to_subject = {el["id"]: el.get("subject", "") for el in email_logs}

    # Build unified timeline events (sent, opened, clicked, replied, unsubscribed)
    events = []
    for el in email_logs:
        cname = campaign_map.get(el.get("campaign_id"), "Unknown")
        subj = el.get("subject", "")
        if el.get("sent_at"):
            events.append({
                "type": "sent",
                "timestamp": el["sent_at"].isoformat() if hasattr(el["sent_at"], "isoformat") else str(el["sent_at"]),
                "campaign_name": cname,
                "campaign_id": el.get("campaign_id"),
                "email_log_id": el["id"],
                "subject": subj,
            })
        if el.get("opened_at"):
            events.append({
                "type": "opened",
                "timestamp": el["opened_at"].isoformat() if hasattr(el["opened_at"], "isoformat") else str(el["opened_at"]),
                "campaign_name": cname,
                "campaign_id": el.get("campaign_id"),
                "email_log_id": el["id"],
                "subject": subj,
            })
        if el.get("clicked_at"):
            events.append({
                "type": "clicked",
                "timestamp": el["clicked_at"].isoformat() if hasattr(el["clicked_at"], "isoformat") else str(el["clicked_at"]),
                "campaign_name": cname,
                "campaign_id": el.get("campaign_id"),
                "email_log_id": el["id"],
                "subject": subj,
            })
        if el.get("replied_at"):
            events.append({
                "type": "replied",
                "timestamp": el["replied_at"].isoformat() if hasattr(el["replied_at"], "isoformat") else str(el["replied_at"]),
                "campaign_name": cname,
                "campaign_id": el.get("campaign_id"),
                "email_log_id": el["id"],
                "subject": subj,
            })

    for cc in campaign_contacts:
        for ev in cc.get("events") or []:
            if ev.get("type") == "unsubscribed":
                ts = ev.get("timestamp")
                ts_str = ts.isoformat() if ts and hasattr(ts, "isoformat") else str(ts) if ts else None
                if ts_str:
                    events.append({
                        "type": "unsubscribed",
                        "timestamp": ts_str,
                        "campaign_name": campaign_map.get(cc.get("campaign_id"), "Unknown"),
                        "campaign_id": cc.get("campaign_id"),
                        "metadata": ev.get("metadata", {}),
                    })

    # Add link-level click details (urls clicked); use email_log.clicked_at as "when clicked"
    log_id_to_clicked_at = {el["id"]: el.get("clicked_at") for el in email_logs}
    for lc in link_clicks:
        log_id = lc.get("email_log_id")
        if not log_id:
            continue
        cid = next((el.get("campaign_id") for el in email_logs if el.get("id") == log_id), None)
        cname = campaign_map.get(cid, "Unknown")
        url = lc.get("original_url", "")
        cnt = lc.get("click_count", 0)
        if cnt > 0 and not lc.get("is_unsubscribe"):
            clicked_at = log_id_to_clicked_at.get(log_id)
            ts_str = None
            if clicked_at and hasattr(clicked_at, "isoformat"):
                ts_str = clicked_at.isoformat()
            elif clicked_at:
                ts_str = str(clicked_at)
            events.append({
                "type": "link_clicked",
                "timestamp": ts_str,
                "campaign_name": cname,
                "campaign_id": cid,
                "email_log_id": log_id,
                "url": url,
                "click_count": cnt,
            })

    events.sort(key=lambda e: (e.get("timestamp") or "0000")[:26], reverse=True)

    # Stats
    total_sent = len([e for e in email_logs if e.get("status") and e.get("status") != "pending"])
    total_opened = len([e for e in email_logs if e.get("opened_at")])
    total_clicked = len([e for e in email_logs if e.get("clicked_at")])
    total_replied = len([e for e in email_logs if e.get("replied_at")])
    total_link_clicks = sum(lc.get("click_count", 0) for lc in link_clicks if not lc.get("is_unsubscribe"))

    return {
        "contact": contact,
        "events": events,
        "stats": {
            "total_sent": total_sent,
            "total_opened": total_opened,
            "total_clicked": total_clicked,
            "total_replied": total_replied,
            "total_link_clicks": total_link_clicks,
        },
        "campaigns": [{"id": cid, "name": campaign_map.get(cid, "Unknown")} for cid in campaign_ids],
    }


@router.delete("/contacts")
async def delete_contacts(request: DeleteContactsRequest, current_user: dict = Depends(get_current_user)):
    """Delete multiple contacts. Blocked if any list containing these contacts is used by an active campaign."""
    user_id = current_user["id"]
    lists_with_any = await db.contact_lists.find(
        {"contact_ids": {"$in": request.contact_ids}},
        {"id": 1}
    ).to_list(None)
    list_ids = [lst["id"] for lst in lists_with_any]
    await raise_if_any_list_used_by_active_campaign(list_ids)
    await db.contacts.delete_many({"id": {"$in": request.contact_ids}, "user_id": user_id})
    await db.contact_lists.update_many(
        {},
        {"$pull": {"contact_ids": {"$in": request.contact_ids}}}
    )
    return {"message": f"{len(request.contact_ids)} contacts deleted"}


# Chunk size for cancel checks during risky-email job (inner loop still updates progress per contact).
RISKY_EMAIL_JOB_BATCH_SIZE = 50


async def _remove_contacts_from_campaigns(user_id: str, contact_ids: list[str]) -> None:
    """Drop contact IDs from campaign-level lists and remove campaign_contacts rows."""
    if not contact_ids:
        return
    await db.campaigns.update_many(
        {"user_id": user_id},
        {"$pull": {"contact_ids": {"$in": contact_ids}}},
    )
    await db.campaign_contacts.delete_many(
        {"user_id": user_id, "contact_id": {"$in": contact_ids}},
    )


async def _notify_risky_emails_done(user_id: str, total: int, deleted: int, failed: bool = False, error: str | None = None) -> None:
    """Send the user an alert/email when Remove risky emails job completes (or fails).

    Uses the notification service so this is logged as a health alert, but is sent
    even if the user has health alerts turned off in settings.
    """
    if not notification_service:
        return
    try:
        user = await db.users.find_one({"id": user_id}, {"email": 1})
        if not user or not user.get("email"):
            return
        to_email = user["email"]
        if failed:
            subject = "Remove risky emails – job failed"
            body_plain = (
                "Your Remove risky emails job did not complete.\n\n"
                f"Error: {error or 'Unknown error'}\n\n"
                "You can try again from Contacts in the app."
            )
        else:
            subject = "Remove risky emails – completed"
            body_plain = (
                f"Remove risky emails has completed.\n\n"
                f"Contacts checked: {total}\n"
                f"Risky contacts deleted: {deleted}\n\n"
                "View your contacts in the app."
            )
        body_html = body_plain.replace("\n", "<br>\n")
        # Always send/log this as a health alert, even if the toggle is off.
        await notification_service.send_notification_always(
            user_id=user_id,
            notification_type="health_alerts",
            subject=subject,
            body_plain=body_plain,
            body_html=body_html,
        )
    except Exception:
        pass


async def _run_risky_email_job(job_id: str) -> None:
    """
    Background task: validate all contacts for the job's user, update job progress
    in DB after each batch, then bulk-delete all risky contacts at the end.
    """
    job = await db.risky_email_jobs.find_one({"id": job_id})
    if not job or job.get("status") != "running":
        return
    user_id = job["user_id"]
    client_ip = job.get("client_ip")

    list_id = job.get("list_id")
    contact_query: dict = {"user_id": user_id}
    if list_id:
        contact_list = await db.contact_lists.find_one(
            {"id": list_id, "user_id": user_id},
            {"_id": 0, "contact_ids": 1},
        )
        list_contact_ids = (
            contact_list.get("contact_ids", [])
            if contact_list and isinstance(contact_list.get("contact_ids"), list)
            else []
        )
        if list_contact_ids:
            contact_query["id"] = {"$in": list_contact_ids}
        else:
            contact_query["id"] = {"$in": []}

    contacts = await db.contacts.find(
        contact_query,
        {"_id": 0, "id": 1, "email": 1},
    ).to_list(None)

    total = len(contacts)
    if total == 0:
        await db.risky_email_jobs.update_one(
            {"id": job_id},
            {
                "$set": {
                    "status": "completed",
                    "checked_so_far": 0,
                    "deleted": 0,
                    "updated_at": datetime.now(timezone.utc),
                }
            },
        )
        await _notify_risky_emails_done(user_id, 0, 0)
        return

    include_catch_all = bool(job.get("include_catch_all", False))
    zerobounce_key = await get_zerobounce_api_key_for_user(user_id)
    stats = {"invalid_syntax": 0, "mx_fail": 0, "stop_forum_spam_block": 0, "catch_all": 0}
    risky_contact_ids: list[str] = []
    checked_so_far = 0

    async def validate_one(contact: dict) -> tuple[str | None, dict]:
        email = (contact.get("email") or "").strip()
        if not email:
            return None, {
                "valid": False,
                "syntax_ok": False,
                "mx_ok": False,
                "stop_forum_spam_ok": True,
                "messages": ["No email provided"],
            }
        # Basic checks always run (syntax/MX/SFS).
        # ZeroBounce runs if key is present — catch-all detection is ZeroBounce-only.
        result = await asyncio.to_thread(
            lambda e=email, ip=client_ip, zb=zerobounce_key: validate_email_full(
                e, ip, zerobounce_api_key=zb
            ),
        )
        return contact.get("id"), result

    async def flush_risky_job_progress() -> None:
        await db.risky_email_jobs.update_one(
            {"id": job_id},
            {
                "$set": {
                    "checked_so_far": checked_so_far,
                    "risky_count": len(risky_contact_ids),
                    "risky_contact_ids": risky_contact_ids,
                    "stats": stats,
                    "updated_at": datetime.now(timezone.utc),
                }
            },
        )

    try:
        for i in range(0, len(contacts), RISKY_EMAIL_JOB_BATCH_SIZE):
            # Check if user requested cancel
            job = await db.risky_email_jobs.find_one({"id": job_id}, {"status": 1})
            if not job or job.get("status") != "running":
                await db.risky_email_jobs.update_one(
                    {"id": job_id},
                    {
                        "$set": {"updated_at": datetime.now(timezone.utc)},
                        "$unset": {"risky_contact_ids": ""},
                    },
                )
                return
            batch = contacts[i : i + RISKY_EMAIL_JOB_BATCH_SIZE]
            for c in batch:
                contact_id, result = await validate_one(c)
                if not contact_id:
                    checked_so_far += 1
                    await flush_risky_job_progress()
                    continue

                syntax_bad = not result.get("syntax_ok", False)
                mx_bad = not result.get("mx_ok", False)
                spam_bad = not result.get("stop_forum_spam_ok", True)
                catch_all_domain = bool(result.get("catch_all"))

                if syntax_bad:
                    stats["invalid_syntax"] += 1
                if mx_bad:
                    stats["mx_fail"] += 1
                if spam_bad:
                    stats["stop_forum_spam_block"] += 1
                if catch_all_domain:
                    stats["catch_all"] += 1

                is_risky = syntax_bad or mx_bad or spam_bad
                if include_catch_all and catch_all_domain:
                    is_risky = True
                if is_risky:
                    risky_contact_ids.append(contact_id)
                checked_so_far += 1
                await flush_risky_job_progress()

        if not risky_contact_ids:
            await db.risky_email_jobs.update_one(
                {"id": job_id},
                {
                    "$set": {
                        "status": "completed",
                        "checked_so_far": total,
                        "deleted": 0,
                        "stats": stats,
                        "updated_at": datetime.now(timezone.utc),
                    },
                    "$unset": {"risky_contact_ids": ""},
                },
            )
            await _notify_risky_emails_done(user_id, total, 0)
            return

        await _remove_contacts_from_campaigns(user_id, risky_contact_ids)

        await db.contacts.delete_many({"id": {"$in": risky_contact_ids}, "user_id": user_id})
        await db.contact_lists.update_many(
            {},
            {"$pull": {"contact_ids": {"$in": risky_contact_ids}}},
        )

        deleted_count = len(risky_contact_ids)
        await db.risky_email_jobs.update_one(
            {"id": job_id},
            {
                "$set": {
                    "status": "completed",
                    "checked_so_far": total,
                    "deleted": deleted_count,
                    "stats": stats,
                    "updated_at": datetime.now(timezone.utc),
                },
                "$unset": {"risky_contact_ids": ""},
            },
        )
        await _notify_risky_emails_done(user_id, total, deleted_count)
    except Exception as e:
        await db.risky_email_jobs.update_one(
            {"id": job_id},
            {
                "$set": {
                    "status": "failed",
                    "error": str(e),
                    "updated_at": datetime.now(timezone.utc),
                }
            },
        )
        await _notify_risky_emails_done(user_id, total, 0, failed=True, error=str(e))


@router.post("/contacts/remove-risky-emails")
async def remove_risky_emails_start(
    request: Request,
    list_id: str | None = None,
    include_catch_all: bool = Query(
        False,
        description="If true, also remove catch-all domain emails (detected via ZeroBounce if API key is configured). If false, syntax/MX/SFS checks only.",
    ),
    current_user: dict = Depends(get_current_user),
):
    """
    Start a background job: syntax + MX + StopForumSpam checks; optionally catch-all removal
    via ZeroBounce (requires ZeroBounce API key in Settings → Integrations).
    Risky contacts are removed from lists, campaign contact_ids, and campaign_contacts.
    Returns job_id for polling status.
    """
    user_id = current_user["id"]
    client_ip = get_client_ip(request)

    contact_query: dict = {"user_id": user_id}
    selected_list_name: str | None = None
    if list_id:
        selected_list = await db.contact_lists.find_one(
            {"id": list_id, "user_id": user_id},
            {"_id": 0, "id": 1, "name": 1, "contact_ids": 1},
        )
        if not selected_list:
            raise HTTPException(status_code=404, detail="Selected list not found")
        selected_list_name = selected_list.get("name")
        list_contact_ids = selected_list.get("contact_ids") or []
        contact_query["id"] = {"$in": list_contact_ids}

    contacts = await db.contacts.find(
        contact_query,
        {"_id": 0, "id": 1},
    ).to_list(None)
    total = len(contacts)

    if total == 0:
        return {
            "job_id": None,
            "message": "No contacts found for the selected scope",
            "total_checked": 0,
            "deleted": 0,
            "status": "completed",
        }

    # If user already has a running job, return its id so frontend can keep polling it
    existing = await db.risky_email_jobs.find_one(
        {"user_id": user_id, "status": "running"},
        {"id": 1},
    )
    if existing:
        return {
            "job_id": existing["id"],
            "message": "Job already running",
            "status": "running",
        }

    job_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    await db.risky_email_jobs.insert_one({
        "id": job_id,
        "user_id": user_id,
        "list_id": list_id,
        "status": "running",
        "total_to_check": total,
        "checked_so_far": 0,
        "risky_count": 0,
        "deleted": 0,
        "include_catch_all": include_catch_all,
        "stats": {"invalid_syntax": 0, "mx_fail": 0, "stop_forum_spam_block": 0, "catch_all": 0},
        "client_ip": client_ip,
        "created_at": now,
        "updated_at": now,
    })

    asyncio.create_task(_run_risky_email_job(job_id))
    return {
        "job_id": job_id,
        "message": "Job started",
        "status": "running",
        "total_to_check": total,
        "list_id": list_id,
        "list_name": selected_list_name,
        "include_catch_all": include_catch_all,
    }


@router.post("/contacts/remove-risky-emails/stop")
async def remove_risky_emails_stop(
    job_id: str,
    current_user: dict = Depends(get_current_user),
):
    """Cancel a running risky-email removal job. No contacts are deleted."""
    user_id = current_user["id"]
    result = await db.risky_email_jobs.update_one(
        {"id": job_id, "user_id": user_id, "status": "running"},
        {"$set": {"status": "cancelled", "updated_at": datetime.now(timezone.utc)}},
    )
    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Job not found or not running (already completed, cancelled, or failed).",
        )
    return {"message": "Job cancelled", "job_id": job_id, "status": "cancelled"}


@router.get("/contacts/remove-risky-emails/status")
async def remove_risky_emails_status(
    job_id: str | None = None,
    current_user: dict = Depends(get_current_user),
):
    """
    Get status of risky-email removal job. If job_id is omitted, returns the latest job for the user.
    """
    user_id = current_user["id"]
    if job_id:
        job = await db.risky_email_jobs.find_one({"id": job_id, "user_id": user_id}, {"_id": 0, "risky_contact_ids": 0})
    else:
        job = await db.risky_email_jobs.find_one(
            {"user_id": user_id},
            {"_id": 0, "risky_contact_ids": 0},
            sort=[("created_at", -1)],
        )
    if not job:
        return {"status": "not_found", "job_id": job_id}
    return {
        "job_id": job["id"],
        "status": job["status"],
        "total_to_check": job.get("total_to_check", 0),
        "checked_so_far": job.get("checked_so_far", 0),
        "risky_count": job.get("risky_count", 0),
        "deleted": job.get("deleted", 0),
        "stats": job.get("stats", {}),
        "include_catch_all": bool(job.get("include_catch_all", False)),
        "error": job.get("error"),
        "updated_at": job.get("updated_at"),
    }


@router.get("/contacts/remove-risky-emails/jobs/history")
async def remove_risky_emails_history(
    skip: int = 0,
    limit: int = 50,
    current_user: dict = Depends(get_current_user),
):
    """List risky-email removal job history for the current user."""
    user_id = current_user["id"]
    safe_skip = max(skip, 0)
    safe_limit = min(max(limit, 1), 200)

    jobs = await db.risky_email_jobs.find(
        {"user_id": user_id},
        {
            "_id": 0,
            "id": 1,
            "status": 1,
            "list_id": 1,
            "include_catch_all": 1,
            "total_to_check": 1,
            "checked_so_far": 1,
            "risky_count": 1,
            "deleted": 1,
            "stats": 1,
            "error": 1,
            "created_at": 1,
            "updated_at": 1,
        },
    ).sort("created_at", -1).skip(safe_skip).limit(safe_limit).to_list(None)

    total = await db.risky_email_jobs.count_documents({"user_id": user_id})
    list_ids = [j.get("list_id") for j in jobs if j.get("list_id")]
    list_name_by_id: dict[str, str] = {}
    if list_ids:
        lists = await db.contact_lists.find(
            {"user_id": user_id, "id": {"$in": list_ids}},
            {"_id": 0, "id": 1, "name": 1},
        ).to_list(None)
        list_name_by_id = {l["id"]: l.get("name", "Unknown list") for l in lists}

    history = []
    for job in jobs:
        jid = job.get("id")
        list_id = job.get("list_id")
        history.append({
            "job_id": jid,
            "status": job.get("status", "unknown"),
            "list_id": list_id,
            "list_name": list_name_by_id.get(list_id) if list_id else None,
            "include_catch_all": bool(job.get("include_catch_all", False)),
            "total_to_check": job.get("total_to_check", 0),
            "checked_so_far": job.get("checked_so_far", 0),
            "risky_count": job.get("risky_count", 0),
            "deleted": job.get("deleted", 0),
            "stats": job.get("stats", {}),
            "error": job.get("error"),
            "created_at": job.get("created_at"),
            "updated_at": job.get("updated_at"),
        })

    return {"jobs": history, "total": total}


@router.post("/contacts/unblock")
async def unblock_contacts(request: UnblockContactsRequest, current_user: dict = Depends(get_current_user)):
    """Unblock selected contacts or all blocked. Sets manual_unblock and clears unsubscribed status so they can receive campaigns again."""
    user_id = current_user["id"]
    if request.contact_ids:
        # Unsubscribed/blocked: set manual_unblock and clear status to pending; others: set manual_unblock only
        r1 = await db.contacts.update_many(
            {"id": {"$in": request.contact_ids}, "user_id": user_id, "status": {"$in": ["unsubscribed", "blocked"]}},
            {"$set": {"manual_unblock": True, "status": "pending"}}
        )
        r2 = await db.contacts.update_many(
            {"id": {"$in": request.contact_ids}, "user_id": user_id, "status": {"$nin": ["unsubscribed", "blocked"]}},
            {"$set": {"manual_unblock": True}}
        )
        result = r1.modified_count + r2.modified_count
        return {"message": f"{result} contact(s) unblocked", "unblocked": result}
    # Unblock all: find contacts that are currently blocked (by limit or unsubscribed)
    contacts = await db.contacts.find(
        {"user_id": user_id, "manual_unblock": {"$ne": True}},
        {"_id": 0, "id": 1, "status": 1}
    ).to_list(None)
    contact_ids = [c["id"] for c in contacts]
    if not contact_ids:
        return {"message": "No blocked contacts to unblock", "unblocked": 0}
    pipeline = [
        {"$match": {"user_id": user_id, "contact_id": {"$in": contact_ids}, "status": {"$in": ["sent", "opened", "clicked", "replied"]}}},
        {"$group": {"_id": "$contact_id", "count": {"$sum": 1}}},
    ]
    counts_cursor = await db.email_logs.aggregate(pipeline).to_list(None)
    global_sent = {x["_id"]: x["count"] for x in counts_cursor}
    verified = ["opened", "clicked", "replied"]
    to_unblock = [
        c["id"] for c in contacts
        if (c.get("status") or "pending").lower() == "unsubscribed"
        or (c.get("status") or "pending").lower() == "blocked"
        or (
            (c.get("status") or "pending").lower() not in verified
            and global_sent.get(c["id"], 0) >= BLOCK_AFTER_EMAILS
        )
    ]
    if not to_unblock:
        return {"message": "No blocked contacts to unblock", "unblocked": 0}
    unsub_ids = [c["id"] for c in contacts if (c.get("status") or "pending").lower() == "unsubscribed"]
    blocked_ids = [c["id"] for c in contacts if (c.get("status") or "pending").lower() == "blocked"]
    other_ids = [cid for cid in to_unblock if cid not in unsub_ids and cid not in blocked_ids]
    count = 0
    unsub_only = [cid for cid in unsub_ids if cid not in blocked_ids]
    blocked_only = [cid for cid in blocked_ids if cid not in unsub_ids]
    if unsub_only:
        r1 = await db.contacts.update_many(
            {"id": {"$in": unsub_only}, "user_id": user_id},
            {"$set": {"manual_unblock": True, "status": "pending"}}
        )
        count += r1.modified_count
    if blocked_only:
        r1b = await db.contacts.update_many(
            {"id": {"$in": blocked_only}, "user_id": user_id},
            {"$set": {"manual_unblock": True, "status": "pending"}}
        )
        count += r1b.modified_count
    if other_ids:
        r2 = await db.contacts.update_many(
            {"id": {"$in": other_ids}, "user_id": user_id},
            {"$set": {"manual_unblock": True}}
        )
        count += r2.modified_count
    return {"message": f"{count} contact(s) unblocked", "unblocked": count}


@router.post("/contacts/block")
async def block_contacts(request: BlockContactsRequest, current_user: dict = Depends(get_current_user)):
    """Block selected contacts by setting manual_unblock = False. They will be excluded from campaigns again (if they meet block criteria)."""
    user_id = current_user["id"]
    if not request.contact_ids:
        return {"message": "No contacts to block", "blocked": 0}
    result = await db.contacts.update_many(
        {"id": {"$in": request.contact_ids}, "user_id": user_id},
        {"$set": {"manual_unblock": False}}
    )
    return {"message": f"{result.modified_count} contact(s) blocked", "blocked": result.modified_count}
