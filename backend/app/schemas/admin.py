from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class AdminStoryCreate(BaseModel):
    title: str
    story: str
    author: str = ""
    category: str = ""
    image_url: str = ""
    status: str = "draft"


class AdminStoryUpdate(BaseModel):
    title: Optional[str] = None
    story: Optional[str] = None
    author: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    status: Optional[str] = None


class AdminStoryResponse(BaseModel):
    id: int
    user_id: Optional[int] = None
    title: str
    story: str
    author: str
    category: str
    image_url: str
    status: str
    is_published: bool
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class AdminEventCreate(BaseModel):
    title: str
    description: str
    location: str
    event_date: datetime
    end_date: Optional[datetime] = None
    category: str = ""
    organizer: str = ""
    max_participants: int = 0
    image_url: str = ""
    status: str = "draft"


class AdminEventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    event_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    category: Optional[str] = None
    organizer: Optional[str] = None
    max_participants: Optional[int] = None
    image_url: Optional[str] = None
    status: Optional[str] = None


class AdminEventResponse(BaseModel):
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
    status: str
    is_upcoming: bool
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class DashboardResponse(BaseModel):
    total_users: int
    total_volunteers: int
    active_events: int
    published_opportunities: int
    published_stories: int
    recent_activity: list


class AdminVolunteerResponse(BaseModel):
    id: int
    user_id: int
    user_email: str
    user_name: str
    bio: str
    skills: list[str] = []
    interests: list[str] = []
    availability: str
    location: str
    phone: str
    hours_contributed: float
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
