from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any

from app.database import get_db
from app.models.scholarship import Scholarship
from app.schemas.scholarship import ScholarshipResponse, ScholarshipSearchRequest
from app.services.ai_service import ai_service

router = APIRouter(prefix="/api/scholarships", tags=["Scholarships"])


@router.post("/search")
async def search_scholarships(
    data: ScholarshipSearchRequest,
    db: Session = Depends(get_db)
):
    ai_results = await ai_service.find_scholarships(
        education_level=data.education_level,
        interest_area=data.interest_area,
        budget=data.budget,
    )

    db_scholarships = db.query(Scholarship).filter(
        Scholarship.is_active == True,
        Scholarship.education_level.ilike(f"%{data.education_level}%")
    ).all()

    result = {
        "scholarships": [ScholarshipResponse.model_validate(s) for s in db_scholarships],
        "ai_recommendations": ai_results.get("scholarships", []),
        "courses": ai_results.get("courses", []),
        "competitions": ai_results.get("competitions", []),
    }
    return result
