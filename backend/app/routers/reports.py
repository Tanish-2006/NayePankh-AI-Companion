from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from app.database import get_db
from app.models.user import User
from app.models.report import Report, ImpactStory
from app.schemas.report import StoryGenerateRequest, StoryResponse, ReportCreate, ReportResponse
from app.middleware.auth import get_current_user
from app.services.ai_service import ai_service

router = APIRouter(prefix="/api/reports", tags=["Reports"])


@router.post("/generate-story", response_model=StoryResponse)
async def generate_story(
    data: StoryGenerateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    result = await ai_service.generate_impact_story(
        event_name=data.event_name,
        location=data.location,
        activity_details=data.activity_details,
        observations=data.observations,
    )

    story = ImpactStory(
        user_id=current_user.id,
        title=result.get("title", "Impact Story"),
        story=result.get("story", ""),
        donor_report=result.get("donor_report", ""),
        linkedin_post=result.get("linkedin_post", ""),
        newsletter=result.get("newsletter", ""),
        event_name=data.event_name,
        location=data.location,
    )
    db.add(story)
    db.commit()
    db.refresh(story)

    return StoryResponse.model_validate(story)


@router.get("/stories", response_model=List[StoryResponse])
def list_stories(db: Session = Depends(get_db)):
    stories = db.query(ImpactStory).order_by(ImpactStory.created_at.desc()).all()
    return [StoryResponse.model_validate(s) for s in stories]


@router.get("/stories/{story_id}", response_model=StoryResponse)
def get_story(story_id: int, db: Session = Depends(get_db)):
    story = db.query(ImpactStory).filter(ImpactStory.id == story_id).first()
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    return StoryResponse.model_validate(story)


@router.post("/", response_model=ReportResponse)
def create_report(
    data: ReportCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    report = Report(user_id=current_user.id, **data.model_dump())
    db.add(report)
    db.commit()
    db.refresh(report)
    return ReportResponse.model_validate(report)


@router.get("/", response_model=List[ReportResponse])
def list_reports(db: Session = Depends(get_db)):
    reports = db.query(Report).order_by(Report.created_at.desc()).all()
    return [ReportResponse.model_validate(r) for r in reports]
