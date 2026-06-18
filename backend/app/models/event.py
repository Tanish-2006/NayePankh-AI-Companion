from sqlalchemy import Boolean, Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.database import Base


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, nullable=False)
    description = Column(Text, nullable=False)
    location = Column(String, nullable=False)
    event_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=True)
    category = Column(String, default="")
    organizer = Column(String, default="")
    max_participants = Column(Integer, default=0)
    registered_count = Column(Integer, default=0)
    image_url = Column(String, default="")
    status = Column(String, default="draft")
    is_upcoming = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
