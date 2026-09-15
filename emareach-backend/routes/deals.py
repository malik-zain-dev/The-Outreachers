"""CRM Deals, Activities, Tasks, and Notes Management Routes"""
import logging
import uuid
from datetime import datetime, timezone
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, HTTPException, Depends, Query, Body
from pydantic import BaseModel, ConfigDict, Field

from database import db
from models import Deal, CRMActivity, CRMTask, CRMNote
from routes.dependencies import get_current_user

router = APIRouter(prefix="/deals", tags=["deals"])
logger = logging.getLogger(__name__)


class CreateDealRequest(BaseModel):
    title: str
    pipeline_id: Optional[str] = None
    stage_id: Optional[str] = None
    status: str = "open"
    company_id: Optional[str] = None
    company: Optional[str] = "Enterprise"
    primary_contact_id: Optional[str] = None
    contact_name: Optional[str] = "Decision Maker"
    contact_email: Optional[str] = ""
    contact_role: Optional[str] = "Executive"
    additional_contact_ids: List[str] = Field(default_factory=list)
    value: float = 10000.0
    currency: str = "USD"
    probability: int = 50
    expected_close_date: Optional[str] = None
    source: str = "Outbound Campaign"
    priority: str = "medium"
    assigned_to: str = "Zain Malik"
    tags: List[str] = Field(default_factory=list)
    custom_fields: Dict[str, Any] = Field(default_factory=dict)


class UpdateDealRequest(BaseModel):
    title: Optional[str] = None
    pipeline_id: Optional[str] = None
    stage_id: Optional[str] = None
    status: Optional[str] = None
    company: Optional[str] = None
    contact_name: Optional[str] = None
    contact_email: Optional[str] = None
    contact_role: Optional[str] = None
    value: Optional[float] = None
    currency: Optional[str] = None
    probability: Optional[int] = None
    expected_close_date: Optional[str] = None
    priority: Optional[str] = None
    assigned_to: Optional[str] = None
    tags: Optional[List[str]] = None
    loss_reason: Optional[str] = None


class MoveStageRequest(BaseModel):
    stage_id: str
    from_stage_name: Optional[str] = None
    to_stage_name: Optional[str] = None


class MarkLostRequest(BaseModel):
    loss_reason: str


class AddActivityRequest(BaseModel):
    type: str  # call, email, meeting, note, task
    title: str
    description: Optional[str] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)


class AddTaskRequest(BaseModel):
    title: str
    due_date: Optional[str] = None
    priority: str = "medium"
    assigned_to: Optional[str] = "Zain Malik"


class AddNoteRequest(BaseModel):
    text: str


@router.get("")
async def get_deals(
    pipeline_id: Optional[str] = Query(None),
    stage_id: Optional[str] = Query(None),
    status: Optional[str] = Query(None),  # open, won, lost, all
    search: Optional[str] = Query(None),
    priority: Optional[str] = Query(None),
    limit: int = Query(200, ge=1, le=1000),
    skip: int = Query(0, ge=0),
    current_user: dict = Depends(get_current_user),
):
    """List deals with backend filtering, search, and live forecast calculation."""
    user_id = current_user["id"]
    query: Dict[str, Any] = {"user_id": user_id}

    if pipeline_id:
        query["pipeline_id"] = pipeline_id
    if stage_id:
        query["stage_id"] = stage_id
    if status and status != "all":
        query["status"] = status
    if priority and priority != "all":
        query["priority"] = priority
    if search:
        search_regex = {"$regex": search, "$options": "i"}
        query["$or"] = [
            {"title": search_regex},
            {"company": search_regex},
            {"contact_name": search_regex},
            {"contact_email": search_regex},
        ]

    cursor = db.deals.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit)
    deals = await cursor.to_list(length=limit)

    # Calculate aggregate forecast metrics across all user deals
    all_user_deals = await db.deals.find({"user_id": user_id}, {"_id": 0, "status": 1, "value": 1, "weighted_value": 1, "probability": 1}).to_list(None)

    open_value = sum(d.get("value", 0) for d in all_user_deals if d.get("status") == "open")
    weighted_value = sum(d.get("weighted_value", 0) for d in all_user_deals if d.get("status") == "open")
    won_value = sum(d.get("value", 0) for d in all_user_deals if d.get("status") == "won")
    lost_value = sum(d.get("value", 0) for d in all_user_deals if d.get("status") == "lost")

    return {
        "deals": deals,
        "total": len(deals),
        "forecast": {
            "open_pipeline_value": open_value,
            "weighted_pipeline_value": weighted_value,
            "won_revenue": won_value,
            "lost_revenue": lost_value,
        },
    }


@router.post("")
async def create_deal(
    payload: CreateDealRequest,
    current_user: dict = Depends(get_current_user),
):
    """Create a new Deal linked to contact/company and log initial activity."""
    user_id = current_user["id"]

    # If pipeline_id not specified, pick or create default pipeline
    pipeline_id = payload.pipeline_id
    stage_id = payload.stage_id

    if not pipeline_id:
        default_pipe = await db.pipelines.find_one({"user_id": user_id, "is_default": True})
        if not default_pipe:
            default_pipe = await db.pipelines.find_one({"user_id": user_id})
        if default_pipe:
            pipeline_id = default_pipe["id"]
            if not stage_id and default_pipe.get("stages"):
                stage_id = default_pipe["stages"][0]["id"]
        else:
            pipeline_id = "standard-pipeline"
            stage_id = "lead"

    if not stage_id:
        pipe_doc = await db.pipelines.find_one({"id": pipeline_id})
        if pipe_doc and pipe_doc.get("stages"):
            stage_id = pipe_doc["stages"][0]["id"]
        else:
            stage_id = "lead"

    prob = max(0, min(100, payload.probability))
    weighted = float(payload.value * (prob / 100.0))
    now = datetime.now(timezone.utc)

    # Initial activity record
    initial_activity = CRMActivity(
        type="deal_created",
        title="Opportunity Created",
        description=f"Created with initial value ${payload.value:,.0f} ({prob}% probability)",
        author_name=payload.assigned_to or "Zain Malik",
        timestamp=now,
    )

    deal = Deal(
        user_id=user_id,
        title=payload.title,
        pipeline_id=pipeline_id,
        stage_id=stage_id,
        status=payload.status,
        company_id=payload.company_id,
        company=payload.company or "Enterprise",
        primary_contact_id=payload.primary_contact_id,
        contact_name=payload.contact_name or "Decision Maker",
        contact_email=payload.contact_email or "",
        contact_role=payload.contact_role or "Executive",
        additional_contact_ids=payload.additional_contact_ids,
        value=payload.value,
        currency=payload.currency,
        probability=prob,
        weighted_value=weighted,
        expected_close_date=payload.expected_close_date,
        source=payload.source,
        priority=payload.priority,
        assigned_to=payload.assigned_to,
        tags=payload.tags,
        custom_fields=payload.custom_fields,
        activities=[initial_activity],
        created_at=now,
        updated_at=now,
    )

    doc = deal.model_dump()
    await db.deals.insert_one(doc)
    doc.pop("_id", None)
    return doc


@router.get("/{deal_id}")
async def get_deal(
    deal_id: str,
    current_user: dict = Depends(get_current_user),
):
    """Get single deal detail with full chronological activities, notes, and tasks."""
    user_id = current_user["id"]
    deal = await db.deals.find_one({"id": deal_id, "user_id": user_id}, {"_id": 0})
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")
    return deal


@router.patch("/{deal_id}")
async def update_deal(
    deal_id: str,
    payload: UpdateDealRequest,
    current_user: dict = Depends(get_current_user),
):
    """Update deal properties and append change audit."""
    user_id = current_user["id"]
    existing = await db.deals.find_one({"id": deal_id, "user_id": user_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Deal not found")

    update_fields: Dict[str, Any] = {"updated_at": datetime.now(timezone.utc)}
    changes: List[str] = []

    for field, val in payload.model_dump(exclude_unset=True).items():
        if val is not None:
            update_fields[field] = val
            if field == "value" and val != existing.get("value"):
                changes.append(f"Value updated to ${val:,.0f}")
            elif field == "probability" and val != existing.get("probability"):
                changes.append(f"Probability changed to {val}%")
            elif field == "priority" and val != existing.get("priority"):
                changes.append(f"Priority changed to {val.upper()}")

    # Recalculate weighted value if value or probability changed
    new_val = update_fields.get("value", existing.get("value", 0))
    new_prob = update_fields.get("probability", existing.get("probability", 50))
    update_fields["weighted_value"] = float(new_val * (new_prob / 100.0))

    if changes:
        audit_act = CRMActivity(
            type="deal_updated",
            title="Deal Updated",
            description=", ".join(changes),
            author_name=existing.get("assigned_to", "Zain Malik"),
        ).model_dump()
        await db.deals.update_one(
            {"id": deal_id},
            {
                "$set": update_fields,
                "$push": {"activities": audit_act},
            }
        )
    else:
        await db.deals.update_one({"id": deal_id}, {"$set": update_fields})

    updated = await db.deals.find_one({"id": deal_id}, {"_id": 0})
    return updated


@router.post("/{deal_id}/stage")
async def move_deal_stage(
    deal_id: str,
    payload: MoveStageRequest,
    current_user: dict = Depends(get_current_user),
):
    """Move deal to another pipeline stage and log chronological stage change."""
    user_id = current_user["id"]
    deal = await db.deals.find_one({"id": deal_id, "user_id": user_id})
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")

    from_name = payload.from_stage_name or deal.get("stage_id", "Previous")
    to_name = payload.to_stage_name or payload.stage_id

    activity = CRMActivity(
        type="stage_change",
        title=f"Moved to {to_name}",
        description=f"Stage advanced from {from_name} → {to_name}",
        author_name=deal.get("assigned_to", "Zain Malik"),
        metadata={"from_stage": deal.get("stage_id"), "to_stage": payload.stage_id},
    ).model_dump()

    await db.deals.update_one(
        {"id": deal_id},
        {
            "$set": {
                "stage_id": payload.stage_id,
                "updated_at": datetime.now(timezone.utc),
            },
            "$push": {"activities": activity},
        }
    )

    updated = await db.deals.find_one({"id": deal_id}, {"_id": 0})
    return updated


@router.post("/{deal_id}/win")
async def mark_deal_won(
    deal_id: str,
    current_user: dict = Depends(get_current_user),
):
    """Mark deal as Won and update closed revenue."""
    user_id = current_user["id"]
    deal = await db.deals.find_one({"id": deal_id, "user_id": user_id})
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")

    now = datetime.now(timezone.utc)
    activity = CRMActivity(
        type="status_change",
        title="Opportunity Won 🏆",
        description=f"Closed won for ${deal.get('value', 0):,.0f}",
        author_name=deal.get("assigned_to", "Zain Malik"),
    ).model_dump()

    await db.deals.update_one(
        {"id": deal_id},
        {
            "$set": {
                "status": "won",
                "probability": 100,
                "weighted_value": deal.get("value", 0),
                "actual_closed_date": now.strftime("%Y-%m-%d"),
                "updated_at": now,
            },
            "$push": {"activities": activity},
        }
    )

    updated = await db.deals.find_one({"id": deal_id}, {"_id": 0})
    return updated


@router.post("/{deal_id}/lose")
async def mark_deal_lost(
    deal_id: str,
    payload: MarkLostRequest,
    current_user: dict = Depends(get_current_user),
):
    """Mark deal as Lost with required loss reason."""
    user_id = current_user["id"]
    deal = await db.deals.find_one({"id": deal_id, "user_id": user_id})
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")

    now = datetime.now(timezone.utc)
    activity = CRMActivity(
        type="status_change",
        title="Deal Marked Lost",
        description=f"Loss reason: {payload.loss_reason}",
        author_name=deal.get("assigned_to", "Zain Malik"),
        metadata={"loss_reason": payload.loss_reason},
    ).model_dump()

    await db.deals.update_one(
        {"id": deal_id},
        {
            "$set": {
                "status": "lost",
                "probability": 0,
                "weighted_value": 0.0,
                "loss_reason": payload.loss_reason,
                "actual_closed_date": now.strftime("%Y-%m-%d"),
                "updated_at": now,
            },
            "$push": {"activities": activity},
        }
    )

    updated = await db.deals.find_one({"id": deal_id}, {"_id": 0})
    return updated


@router.post("/{deal_id}/activities")
async def add_deal_activity(
    deal_id: str,
    payload: AddActivityRequest,
    current_user: dict = Depends(get_current_user),
):
    """Log manual activity (call, email, meeting, custom event)."""
    user_id = current_user["id"]
    deal = await db.deals.find_one({"id": deal_id, "user_id": user_id})
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")

    act = CRMActivity(
        type=payload.type,
        title=payload.title,
        description=payload.description,
        author_name=deal.get("assigned_to", "Zain Malik"),
        metadata=payload.metadata,
    ).model_dump()

    await db.deals.update_one(
        {"id": deal_id},
        {
            "$set": {"updated_at": datetime.now(timezone.utc)},
            "$push": {"activities": act},
        }
    )

    return {"message": "Activity recorded", "activity": act}


@router.post("/{deal_id}/tasks")
async def add_deal_task(
    deal_id: str,
    payload: AddTaskRequest,
    current_user: dict = Depends(get_current_user),
):
    """Add a next action task with due date."""
    user_id = current_user["id"]
    deal = await db.deals.find_one({"id": deal_id, "user_id": user_id})
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")

    task = CRMTask(
        title=payload.title,
        due_date=payload.due_date,
        priority=payload.priority,
        assigned_to=payload.assigned_to or deal.get("assigned_to", "Zain Malik"),
    ).model_dump()

    await db.deals.update_one(
        {"id": deal_id},
        {
            "$set": {"updated_at": datetime.now(timezone.utc)},
            "$push": {"tasks": task},
        }
    )

    return {"message": "Task created", "task": task}


@router.patch("/{deal_id}/tasks/{task_id}")
async def toggle_deal_task(
    deal_id: str,
    task_id: str,
    completed: bool = Body(..., embed=True),
    current_user: dict = Depends(get_current_user),
):
    """Toggle task completion state."""
    user_id = current_user["id"]
    deal = await db.deals.find_one({"id": deal_id, "user_id": user_id})
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")

    now = datetime.now(timezone.utc)
    tasks = deal.get("tasks", [])
    updated = False

    for t in tasks:
        if t.get("id") == task_id:
            t["completed"] = completed
            t["completed_at"] = now if completed else None
            updated = True
            break

    if not updated:
        raise HTTPException(status_code=404, detail="Task not found")

    await db.deals.update_one(
        {"id": deal_id},
        {"$set": {"tasks": tasks, "updated_at": now}}
    )

    return {"message": "Task updated", "tasks": tasks}


@router.post("/{deal_id}/notes")
async def add_deal_note(
    deal_id: str,
    payload: AddNoteRequest,
    current_user: dict = Depends(get_current_user),
):
    """Add collaborative deal note."""
    user_id = current_user["id"]
    deal = await db.deals.find_one({"id": deal_id, "user_id": user_id})
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")

    note = CRMNote(
        author_id=user_id,
        author_name=deal.get("assigned_to", "Zain Malik"),
        text=payload.text,
    ).model_dump()

    act = CRMActivity(
        type="note",
        title="Note Added",
        description=payload.text[:80] + ("..." if len(payload.text) > 80 else ""),
        author_name=deal.get("assigned_to", "Zain Malik"),
    ).model_dump()

    await db.deals.update_one(
        {"id": deal_id},
        {
            "$set": {"updated_at": datetime.now(timezone.utc)},
            "$push": {"notes": note, "activities": act},
        }
    )

    return {"message": "Note added", "note": note}


@router.delete("/{deal_id}")
async def delete_deal(
    deal_id: str,
    current_user: dict = Depends(get_current_user),
):
    """Delete deal from CRM."""
    user_id = current_user["id"]
    res = await db.deals.delete_one({"id": deal_id, "user_id": user_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Deal not found")
    return {"message": "Deal deleted successfully"}
