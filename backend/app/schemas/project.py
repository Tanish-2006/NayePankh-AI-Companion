from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class ProjectCreate(BaseModel):
    title: str
    description: str
    category: str
    location: str = ""
    impact: str = ""
    volunteers_needed: int = 0
    skills_required: List[str] = []
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    image_url: str = ""


class ProjectResponse(BaseModel):
    id: int
    title: str
    slug: str
    description: str
    category: str
    location: str
    impact: str
    volunteers_needed: int
    volunteers_enrolled: int
    skills_required: List[str] = []
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    is_active: bool
    image_url: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
