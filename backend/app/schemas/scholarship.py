from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class ScholarshipResponse(BaseModel):
    id: int
    title: str
    provider: str
    description: str
    amount: float
    eligibility: str
    education_level: str
    interest_area: str
    application_url: str
    deadline: Optional[datetime] = None
    is_active: bool
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ScholarshipSearchRequest(BaseModel):
    education_level: str
    interest_area: str = ""
    budget: float = 0.0
