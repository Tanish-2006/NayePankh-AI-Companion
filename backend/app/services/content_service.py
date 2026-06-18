from sqlalchemy.orm import Session
from typing import List, Dict, Any

from app.models.opportunity import Opportunity
from app.models.event import Event
from app.models.report import ImpactStory


class ContentService:
    def get_published_opportunities(self, db: Session) -> List[Dict[str, Any]]:
        opportunities = db.query(Opportunity).filter(
            Opportunity.status == "published"
        ).order_by(Opportunity.created_at.desc()).all()
        return [
            {
                "id": o.id,
                "title": o.title,
                "description": o.description,
                "type": o.opportunity_type,
                "eligibility": o.eligibility,
                "deadline": o.deadline.isoformat() if o.deadline else None,
                "apply_link": o.apply_link,
            }
            for o in opportunities
        ]

    def get_published_events(self, db: Session) -> List[Dict[str, Any]]:
        events = db.query(Event).filter(
            Event.status == "published"
        ).order_by(Event.event_date.desc()).all()
        return [
            {
                "id": e.id,
                "title": e.title,
                "description": e.description,
                "location": e.location,
                "date": e.event_date.isoformat() if e.event_date else None,
                "category": e.category,
            }
            for e in events
        ]

    def get_published_stories(self, db: Session) -> List[Dict[str, Any]]:
        stories = db.query(ImpactStory).filter(
            ImpactStory.status == "published"
        ).order_by(ImpactStory.created_at.desc()).all()
        return [
            {
                "id": s.id,
                "title": s.title,
                "story": s.story,
                "author": s.author,
                "category": s.category,
            }
            for s in stories
        ]


content_service = ContentService()
