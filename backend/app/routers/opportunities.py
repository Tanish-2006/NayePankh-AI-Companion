from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.models.opportunity import Opportunity
from app.schemas.opportunity import OpportunityResponse

router = APIRouter(prefix="/api/opportunities", tags=["Opportunities"])


@router.get("/", response_model=List[OpportunityResponse])
def list_opportunities(
    opportunity_type: Optional[str] = Query(None, alias="type"),
    db: Session = Depends(get_db),
):
    query = db.query(Opportunity).filter(Opportunity.status == "published")
    if opportunity_type:
        query = query.filter(Opportunity.opportunity_type == opportunity_type)
    opportunities = query.order_by(Opportunity.created_at.desc()).all()
    return [OpportunityResponse.model_validate(o) for o in opportunities]


@router.get("/{opportunity_id}", response_model=OpportunityResponse)
def get_opportunity(opportunity_id: int, db: Session = Depends(get_db)):
    opportunity = db.query(Opportunity).filter(
        Opportunity.id == opportunity_id,
        Opportunity.status == "published",
    ).first()
    if not opportunity:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    return OpportunityResponse.model_validate(opportunity)
