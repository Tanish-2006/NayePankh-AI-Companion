from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import ARRAY

from app.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String, nullable=False)
    location = Column(String, default="")
    impact = Column(Text, default="")
    volunteers_needed = Column(Integer, default=0)
    volunteers_enrolled = Column(Integer, default=0)
    skills_required = Column(ARRAY(String), default=[])
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True)
    is_active = Column(Boolean, default=True)
    image_url = Column(String, default="")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
