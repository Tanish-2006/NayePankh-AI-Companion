from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from sqlalchemy.sql import func

from app.database import Base


class Opportunity(Base):
    __tablename__ = "opportunities"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    opportunity_type = Column(String, nullable=False)
    eligibility = Column(Text, default="")
    deadline = Column(DateTime, nullable=True)
    apply_link = Column(String, default="")
    status = Column(String, default="draft")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
