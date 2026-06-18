from sqlalchemy import Boolean, Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database import Base


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    title = Column(String, nullable=False)
    report_type = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    event_name = Column(String, default="")
    location = Column(String, default="")
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class ImpactStory(Base):
    __tablename__ = "impact_stories"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    title = Column(String, nullable=False)
    story = Column(Text, nullable=False)
    author = Column(String, default="")
    category = Column(String, default="")
    image_url = Column(String, default="")
    donor_report = Column(Text, default="")
    linkedin_post = Column(Text, default="")
    newsletter = Column(Text, default="")
    event_name = Column(String, default="")
    location = Column(String, default="")
    status = Column(String, default="draft")
    is_published = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
