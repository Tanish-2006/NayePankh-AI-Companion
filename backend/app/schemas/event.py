from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class EventCreate(BaseModel):
    title: str
    description: str
    location: str
    event_date: datetime
    end_date: Optional[datetime] = None
    category: str = ""
    organizer: str = ""
    max_participants: int = 0
    image_url: str = ""


class EventResponse(BaseModel):
    id: int
    title: str
    slug: str
    description: str
    location: str
    event_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    category: str
    organizer: str
    max_participants: int
    registered_count: int
    image_url: str
    is_upcoming: bool
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
