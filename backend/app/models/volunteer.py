from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Float
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import ARRAY

from app.database import Base


class Volunteer(Base):
    __tablename__ = "volunteers"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    bio = Column(Text, default="")
    skills = Column(ARRAY(String), default=[])
    interests = Column(ARRAY(String), default=[])
    availability = Column(String, default="")
    location = Column(String, default="")
    phone = Column(String, default="")
    achievements = Column(ARRAY(String), default=[])
    hours_contributed = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class VolunteerSkill(Base):
    __tablename__ = "volunteer_skills"

    id = Column(Integer, primary_key=True, index=True)
    volunteer_id = Column(Integer, ForeignKey("volunteers.id"), nullable=False)
    skill = Column(String, nullable=False)
    level = Column(String, default="intermediate")


class VolunteerMatch(Base):
    __tablename__ = "volunteer_matches"

    id = Column(Integer, primary_key=True, index=True)
    volunteer_id = Column(Integer, ForeignKey("volunteers.id"), nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    match_score = Column(Float, nullable=False)
    reasoning = Column(Text, default="")
    status = Column(String, default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
