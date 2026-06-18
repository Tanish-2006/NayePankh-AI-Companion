from sqlalchemy import Boolean, Column, Integer, String, Text, DateTime, Float, ForeignKey
from sqlalchemy.sql import func

from app.database import Base


class Scholarship(Base):
    __tablename__ = "scholarships"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    provider = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    amount = Column(Float, default=0.0)
    eligibility = Column(Text, default="")
    education_level = Column(String, nullable=False)
    interest_area = Column(String, default="")
    application_url = Column(String, default="")
    deadline = Column(DateTime, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class ScholarshipApplication(Base):
    __tablename__ = "scholarship_applications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    scholarship_id = Column(Integer, ForeignKey("scholarships.id"), nullable=False)
    status = Column(String, default="draft")
    notes = Column(Text, default="")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
