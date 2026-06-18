import re
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List

from app.database import get_db
from app.models.user import User
from app.models.volunteer import Volunteer
from app.models.event import Event
from app.models.project import Project
from app.models.report import ImpactStory
from app.models.opportunity import Opportunity
from app.middleware.auth import get_admin_user
from app.schemas.opportunity import OpportunityCreate, OpportunityUpdate, OpportunityResponse
from app.schemas.admin import (
    AdminStoryCreate, AdminStoryUpdate, AdminStoryResponse,
    AdminEventCreate, AdminEventUpdate, AdminEventResponse,
    DashboardResponse, AdminVolunteerResponse,
)

router = APIRouter(prefix="/api/admin", tags=["Admin"], dependencies=[Depends(get_admin_user)])


@router.get("/dashboard", response_model=DashboardResponse)
def get_dashboard(db: Session = Depends(get_db)):
    total_users = db.query(func.count(User.id)).scalar() or 0
    total_volunteers = db.query(func.count(Volunteer.id)).scalar() or 0
    active_events = db.query(func.count(Event.id)).filter(Event.status == "published").scalar() or 0
    published_opportunities = db.query(func.count(Opportunity.id)).filter(Opportunity.status == "published").scalar() or 0
    published_stories = db.query(func.count(ImpactStory.id)).filter(ImpactStory.status == "published").scalar() or 0

    recent_users = db.query(User).order_by(User.created_at.desc()).limit(5).all()
    recent_activity = [
        {
            "type": "user_registered",
            "message": f"{u.full_name} joined NayePankh",
            "timestamp": u.created_at.isoformat() if u.created_at else None,
        }
        for u in recent_users
    ]

    return DashboardResponse(
        total_users=total_users,
        total_volunteers=total_volunteers,
        active_events=active_events,
        published_opportunities=published_opportunities,
        published_stories=published_stories,
        recent_activity=recent_activity,
    )


@router.get("/opportunities", response_model=List[OpportunityResponse])
def list_opportunities(
    status: str = None,
    opportunity_type: str = None,
    db: Session = Depends(get_db),
):
    q = db.query(Opportunity)
    if status:
        q = q.filter(Opportunity.status == status)
    if opportunity_type:
        q = q.filter(Opportunity.opportunity_type == opportunity_type)
    opportunities = q.order_by(Opportunity.created_at.desc()).all()
    return [OpportunityResponse.model_validate(o) for o in opportunities]


@router.post("/opportunities", response_model=OpportunityResponse, status_code=status.HTTP_201_CREATED)
def create_opportunity(data: OpportunityCreate, db: Session = Depends(get_db)):
    opportunity = Opportunity(**data.model_dump())
    db.add(opportunity)
    db.commit()
    db.refresh(opportunity)
    return OpportunityResponse.model_validate(opportunity)


@router.get("/opportunities/{opportunity_id}", response_model=OpportunityResponse)
def get_opportunity(opportunity_id: int, db: Session = Depends(get_db)):
    opportunity = db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()
    if not opportunity:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    return OpportunityResponse.model_validate(opportunity)


@router.put("/opportunities/{opportunity_id}", response_model=OpportunityResponse)
def update_opportunity(opportunity_id: int, data: OpportunityUpdate, db: Session = Depends(get_db)):
    opportunity = db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()
    if not opportunity:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(opportunity, key, value)
    db.commit()
    db.refresh(opportunity)
    return OpportunityResponse.model_validate(opportunity)


@router.delete("/opportunities/{opportunity_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_opportunity(opportunity_id: int, db: Session = Depends(get_db)):
    opportunity = db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()
    if not opportunity:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    db.delete(opportunity)
    db.commit()


@router.get("/events", response_model=List[AdminEventResponse])
def list_events_admin(status: str = None, db: Session = Depends(get_db)):
    q = db.query(Event)
    if status:
        q = q.filter(Event.status == status)
    events = q.order_by(Event.event_date.desc()).all()
    return [AdminEventResponse.model_validate(e) for e in events]


@router.post("/events", response_model=AdminEventResponse, status_code=status.HTTP_201_CREATED)
def create_event_admin(data: AdminEventCreate, db: Session = Depends(get_db)):
    slug = re.sub(r'[^a-z0-9]+', '-', data.title.lower()).strip('-')
    original_slug = slug
    counter = 1
    while db.query(Event).filter(Event.slug == slug).first():
        slug = f"{original_slug}-{counter}"
        counter += 1
    event = Event(slug=slug, **data.model_dump())
    db.add(event)
    db.commit()
    db.refresh(event)
    return AdminEventResponse.model_validate(event)


@router.get("/events/{event_id}", response_model=AdminEventResponse)
def get_event_admin(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return AdminEventResponse.model_validate(event)


@router.put("/events/{event_id}", response_model=AdminEventResponse)
def update_event_admin(event_id: int, data: AdminEventUpdate, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    update_data = data.model_dump(exclude_unset=True)
    if "title" in update_data:
        slug = re.sub(r'[^a-z0-9]+', '-', update_data["title"].lower()).strip('-')
        update_data["slug"] = slug
    for key, value in update_data.items():
        setattr(event, key, value)
    db.commit()
    db.refresh(event)
    return AdminEventResponse.model_validate(event)


@router.delete("/events/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_event_admin(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    db.delete(event)
    db.commit()


@router.get("/stories", response_model=List[AdminStoryResponse])
def list_stories_admin(status: str = None, db: Session = Depends(get_db)):
    q = db.query(ImpactStory)
    if status:
        q = q.filter(ImpactStory.status == status)
    stories = q.order_by(ImpactStory.created_at.desc()).all()
    return [AdminStoryResponse.model_validate(s) for s in stories]


@router.post("/stories", response_model=AdminStoryResponse, status_code=status.HTTP_201_CREATED)
def create_story_admin(data: AdminStoryCreate, db: Session = Depends(get_db)):
    story = ImpactStory(
        title=data.title,
        story=data.story,
        author=data.author,
        category=data.category,
        image_url=data.image_url,
        status=data.status,
        is_published=(data.status == "published"),
    )
    db.add(story)
    db.commit()
    db.refresh(story)
    return AdminStoryResponse.model_validate(story)


@router.get("/stories/{story_id}", response_model=AdminStoryResponse)
def get_story_admin(story_id: int, db: Session = Depends(get_db)):
    story = db.query(ImpactStory).filter(ImpactStory.id == story_id).first()
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    return AdminStoryResponse.model_validate(story)


@router.put("/stories/{story_id}", response_model=AdminStoryResponse)
def update_story_admin(story_id: int, data: AdminStoryUpdate, db: Session = Depends(get_db)):
    story = db.query(ImpactStory).filter(ImpactStory.id == story_id).first()
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    update_data = data.model_dump(exclude_unset=True)
    if "status" in update_data:
        update_data["is_published"] = (update_data["status"] == "published")
    for key, value in update_data.items():
        setattr(story, key, value)
    db.commit()
    db.refresh(story)
    return AdminStoryResponse.model_validate(story)


@router.delete("/stories/{story_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_story_admin(story_id: int, db: Session = Depends(get_db)):
    story = db.query(ImpactStory).filter(ImpactStory.id == story_id).first()
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    db.delete(story)
    db.commit()


@router.get("/volunteers", response_model=List[AdminVolunteerResponse])
def list_volunteers_admin(
    search: str = Query(default=None),
    skill: str = Query(default=None),
    db: Session = Depends(get_db),
):
    q = db.query(Volunteer).join(User, Volunteer.user_id == User.id)
    if search:
        search_filter = (
            User.full_name.ilike(f"%{search}%")
            | User.email.ilike(f"%{search}%")
            | Volunteer.location.ilike(f"%{search}%")
            | Volunteer.bio.ilike(f"%{search}%")
        )
        q = q.filter(search_filter)
    if skill:
        q = q.filter(Volunteer.skills.any(skill))

    volunteers = q.order_by(Volunteer.created_at.desc()).all()
    result = []
    for v in volunteers:
        user = db.query(User).filter(User.id == v.user_id).first()
        result.append(AdminVolunteerResponse(
            id=v.id,
            user_id=v.user_id,
            user_email=user.email if user else "",
            user_name=user.full_name if user else "",
            bio=v.bio or "",
            skills=v.skills or [],
            interests=v.interests or [],
            availability=v.availability or "",
            location=v.location or "",
            phone=v.phone or "",
            hours_contributed=v.hours_contributed or 0,
            created_at=v.created_at,
        ))
    return result


@router.get("/volunteers/{volunteer_id}", response_model=AdminVolunteerResponse)
def get_volunteer_admin(volunteer_id: int, db: Session = Depends(get_db)):
    volunteer = db.query(Volunteer).filter(Volunteer.id == volunteer_id).first()
    if not volunteer:
        raise HTTPException(status_code=404, detail="Volunteer not found")
    user = db.query(User).filter(User.id == volunteer.user_id).first()
    return AdminVolunteerResponse(
        id=volunteer.id,
        user_id=volunteer.user_id,
        user_email=user.email if user else "",
        user_name=user.full_name if user else "",
        bio=volunteer.bio or "",
        skills=volunteer.skills or [],
        interests=volunteer.interests or [],
        availability=volunteer.availability or "",
        location=volunteer.location or "",
        phone=volunteer.phone or "",
        hours_contributed=volunteer.hours_contributed or 0,
        created_at=volunteer.created_at,
    )
