from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class OpportunityCreate(BaseModel):
    title: str
    description: str
    opportunity_type: str
    eligibility: str = ""
    deadline: Optional[datetime] = None
    apply_link: str = ""
    status: str = "draft"


class OpportunityUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    opportunity_type: Optional[str] = None
    eligibility: Optional[str] = None
    deadline: Optional[datetime] = None
    apply_link: Optional[str] = None
    status: Optional[str] = None


class OpportunityResponse(BaseModel):
    id: int
    title: str
    description: str
    opportunity_type: str
    eligibility: str
    deadline: Optional[datetime] = None
    apply_link: str
    status: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
