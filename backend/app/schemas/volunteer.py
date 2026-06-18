from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class VolunteerSkillSchema(BaseModel):
    skill: str
    level: str = "intermediate"


class VolunteerCreate(BaseModel):
    bio: str = ""
    skills: List[str] = []
    interests: List[str] = []
    availability: str = ""
    location: str = ""
    phone: str = ""


class VolunteerResponse(BaseModel):
    id: int
    user_id: int
    bio: str
    skills: List[str] = []
    interests: List[str] = []
    availability: str
    location: str
    phone: str
    achievements: List[str] = []
    hours_contributed: float = 0.0
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class VolunteerMatchResponse(BaseModel):
    id: int
    volunteer_id: int
    project_title: str
    project_description: str
    match_score: float
    reasoning: str
    status: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
