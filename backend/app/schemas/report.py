from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class StoryGenerateRequest(BaseModel):
    event_name: str
    location: str
    activity_details: str
    observations: str


class StoryResponse(BaseModel):
    id: int
    title: str
    story: str
    donor_report: Optional[str] = ""
    linkedin_post: Optional[str] = ""
    newsletter: Optional[str] = ""
    event_name: str
    location: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ReportCreate(BaseModel):
    title: str
    report_type: str
    content: str
    event_name: str = ""
    location: str = ""


class ReportResponse(BaseModel):
    id: int
    title: str
    report_type: str
    content: str
    event_name: str
    location: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
