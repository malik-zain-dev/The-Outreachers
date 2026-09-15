"""Pipeline & Stages Management Routes"""
import logging
import uuid
from datetime import datetime, timezone
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, HTTPException, Depends, Query, Body
from pydantic import BaseModel, ConfigDict, Field

from database import db
from models import Pipeline, PipelineStage
from routes.dependencies import get_current_user

router = APIRouter(prefix="/pipelines", tags=["pipelines"])
logger = logging.getLogger(__name__)

DEFAULT_PIPELINE_STAGES = [
    PipelineStage(name="New Prospect", order=0, probability=10, color="slate"),
    PipelineStage(name="In Sequence", order=1, probability=20, color="blue"),
    PipelineStage(name="Replied", order=2, probability=35, color="cyan"),
    PipelineStage(name="Discovery / Qualified", order=3, probability=50, color="indigo"),
    PipelineStage(name="Meeting Booked", order=4, probability=65, color="purple"),
    PipelineStage(name="Proposal Sent", order=5, probability=80, color="amber"),
    PipelineStage(name="Closed Won", order=6, probability=100, color="emerald", is_won_stage=True),
    PipelineStage(name="Closed Lost", order=7, probability=0, color="rose", is_lost_stage=True),
]


class CreatePipelineRequest(BaseModel):
    name: str
    is_default: bool = False
    stages: Optional[List[PipelineStage]] = None


class UpdatePipelineRequest(BaseModel):
    name: Optional[str] = None
    is_default: Optional[bool] = None
    stages: Optional[List[PipelineStage]] = None


async def get_or_create_default_pipeline(user_id: str) -> Dict[str, Any]:
    """Ensure user has at least one pipeline; seeds default if none exist."""
    existing = await db.pipelines.find_one({"user_id": user_id, "is_default": True}, {"_id": 0})
    if existing:
        return existing

    first_any = await db.pipelines.find_one({"user_id": user_id}, {"_id": 0})
    if first_any:
        return first_any

    # Seed default pipeline
    new_pipeline = Pipeline(
        user_id=user_id,
        name="Standard Sales Pipeline",
        is_default=True,
        stages=DEFAULT_PIPELINE_STAGES,
    )
    doc = new_pipeline.model_dump()
    await db.pipelines.insert_one(doc)
    doc.pop("_id", None)
    return doc


@router.get("")
async def get_pipelines(current_user: dict = Depends(get_current_user)):
    """List all sales pipelines for the current user/workspace."""
    user_id = current_user["id"]
    await get_or_create_default_pipeline(user_id)

    pipelines = await db.pipelines.find({"user_id": user_id}, {"_id": 0}).to_list(length=100)
    return {"pipelines": pipelines}


@router.post("")
async def create_pipeline(
    payload: CreatePipelineRequest,
    current_user: dict = Depends(get_current_user),
):
    """Create a new sales pipeline."""
    user_id = current_user["id"]
    stages = payload.stages if payload.stages else DEFAULT_PIPELINE_STAGES

    pipeline = Pipeline(
        user_id=user_id,
        name=payload.name,
        is_default=payload.is_default,
        stages=stages,
    )
    doc = pipeline.model_dump()
    if payload.is_default:
        await db.pipelines.update_many({"user_id": user_id}, {"$set": {"is_default": False}})

    await db.pipelines.insert_one(doc)
    doc.pop("_id", None)
    return doc


@router.get("/{pipeline_id}")
async def get_pipeline(
    pipeline_id: str,
    current_user: dict = Depends(get_current_user),
):
    """Get pipeline detail by ID."""
    user_id = current_user["id"]
    pipeline = await db.pipelines.find_one({"id": pipeline_id, "user_id": user_id}, {"_id": 0})
    if not pipeline:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    return pipeline


@router.patch("/{pipeline_id}")
async def update_pipeline(
    pipeline_id: str,
    payload: UpdatePipelineRequest,
    current_user: dict = Depends(get_current_user),
):
    """Update pipeline details and stage configurations with active deal protection."""
    user_id = current_user["id"]
    existing = await db.pipelines.find_one({"id": pipeline_id, "user_id": user_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Pipeline not found")

    update_fields: Dict[str, Any] = {"updated_at": datetime.now(timezone.utc)}

    if payload.name is not None:
        update_fields["name"] = payload.name

    if payload.is_default is True:
        await db.pipelines.update_many({"user_id": user_id}, {"$set": {"is_default": False}})
        update_fields["is_default"] = True

    if payload.stages is not None:
        # Check if removing any stages that currently hold active deals
        existing_stage_ids = {s["id"] for s in existing.get("stages", [])}
        new_stage_ids = {s.id for s in payload.stages}
        removed_stage_ids = existing_stage_ids - new_stage_ids

        if removed_stage_ids:
            active_deals_count = await db.deals.count_documents({
                "user_id": user_id,
                "pipeline_id": pipeline_id,
                "stage_id": {"$in": list(removed_stage_ids)},
            })
            if active_deals_count > 0:
                raise HTTPException(
                    status_code=400,
                    detail=f"Cannot delete stage: {active_deals_count} active deal(s) exist in removed stage(s). Reassign deals first."
                )

        update_fields["stages"] = [s.model_dump() for s in payload.stages]

    await db.pipelines.update_one({"id": pipeline_id}, {"$set": update_fields})
    updated = await db.pipelines.find_one({"id": pipeline_id}, {"_id": 0})
    return updated


@router.delete("/{pipeline_id}")
async def delete_pipeline(
    pipeline_id: str,
    current_user: dict = Depends(get_current_user),
):
    """Delete a pipeline if it contains no deals."""
    user_id = current_user["id"]
    deal_count = await db.deals.count_documents({"pipeline_id": pipeline_id, "user_id": user_id})
    if deal_count > 0:
        raise HTTPException(
            status_code=400,
            detail=f"Cannot delete pipeline containing {deal_count} deal(s). Please move or delete deals first."
        )

    res = await db.pipelines.delete_one({"id": pipeline_id, "user_id": user_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    return {"message": "Pipeline deleted successfully"}
