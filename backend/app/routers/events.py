import re
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.middleware.auth import get_current_user
from app.models.event import Event
from app.models.user import User
from app.schemas.event import EventCreate, EventResponse

router = APIRouter(prefix="/api/events", tags=["Events"])


@router.get("/", response_model=List[EventResponse])
def list_events(db: Session = Depends(get_db)):
    events = db.query(Event).order_by(Event.event_date.desc()).all()
    return [EventResponse.model_validate(e) for e in events]


@router.get("/upcoming", response_model=List[EventResponse])
def upcoming_events(db: Session = Depends(get_db)):
    events = db.query(Event).filter(
        Event.event_date >= datetime.now()
    ).order_by(Event.event_date.asc()).all()
    return [EventResponse.model_validate(e) for e in events]


@router.get("/{slug}", response_model=EventResponse)
def get_event(slug: str, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.slug == slug).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return EventResponse.model_validate(event)


@router.post("/", response_model=EventResponse)
def create_event(data: EventCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    slug = re.sub(r'[^a-z0-9]+', '-', data.title.lower()).strip('-')
    event = Event(slug=slug, **data.model_dump())
    db.add(event)
    db.commit()
    db.refresh(event)
    return EventResponse.model_validate(event)
