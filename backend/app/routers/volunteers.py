from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.user import User
from app.models.volunteer import Volunteer, VolunteerMatch
from app.models.project import Project
from app.schemas.volunteer import VolunteerCreate, VolunteerResponse, VolunteerMatchResponse
from app.middleware.auth import get_current_user
from app.services.ai_service import ai_service

router = APIRouter(prefix="/api/volunteers", tags=["Volunteers"])


@router.get("/profile", response_model=VolunteerResponse)
def get_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    volunteer = db.query(Volunteer).filter(Volunteer.user_id == current_user.id).first()
    if not volunteer:
        raise HTTPException(status_code=404, detail="Volunteer profile not found")
    return VolunteerResponse.model_validate(volunteer)


@router.post("/profile", response_model=VolunteerResponse)
def create_or_update_profile(
    data: VolunteerCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    volunteer = db.query(Volunteer).filter(Volunteer.user_id == current_user.id).first()
    if volunteer:
        for key, value in data.model_dump().items():
            setattr(volunteer, key, value)
    else:
        volunteer = Volunteer(user_id=current_user.id, **data.model_dump())
        db.add(volunteer)
        current_user.is_volunteer = True

    db.commit()
    db.refresh(volunteer)
    return VolunteerResponse.model_validate(volunteer)


@router.get("/matches", response_model=List[VolunteerMatchResponse])
def get_matches(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    volunteer = db.query(Volunteer).filter(Volunteer.user_id == current_user.id).first()
    if not volunteer:
        raise HTTPException(status_code=404, detail="Create volunteer profile first")

    matches = db.query(VolunteerMatch).filter(
        VolunteerMatch.volunteer_id == volunteer.id
    ).all()

    results = []
    for m in matches:
        project = db.query(Project).filter(Project.id == m.project_id).first()
        results.append(VolunteerMatchResponse(
            id=m.id,
            volunteer_id=m.volunteer_id,
            project_title=project.title if project else "Unknown",
            project_description=project.description if project else "",
            match_score=m.match_score,
            reasoning=m.reasoning,
            status=m.status,
            created_at=m.created_at,
        ))
    return results


@router.post("/match", response_model=List[VolunteerMatchResponse])
async def find_matches(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    volunteer = db.query(Volunteer).filter(Volunteer.user_id == current_user.id).first()
    if not volunteer:
        raise HTTPException(status_code=404, detail="Create volunteer profile first")

    projects = db.query(Project).filter(Project.is_active == True).all()
    if not projects:
        return []

    ai_matches = await ai_service.match_volunteer(
        skills=volunteer.skills or [],
        availability=volunteer.availability or "",
        interests=volunteer.interests or [],
    )

    results = []
    for am in ai_matches:
        project = next((p for p in projects if p.title.lower() in am.get("project", "").lower()), None)
        if not project and projects:
            project = projects[len(results) % len(projects)]

        if project:
            match = VolunteerMatch(
                volunteer_id=volunteer.id,
                project_id=project.id,
                match_score=am.get("score", 50),
                reasoning=am.get("reasoning", ""),
            )
            db.add(match)
            db.commit()
            db.refresh(match)

            results.append(VolunteerMatchResponse(
                id=match.id,
                volunteer_id=match.volunteer_id,
                project_title=project.title,
                project_description=project.description,
                match_score=match.match_score,
                reasoning=match.reasoning,
                status=match.status,
                created_at=match.created_at,
            ))

    return results


@router.get("/history", response_model=List[VolunteerMatchResponse])
def get_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    volunteer = db.query(Volunteer).filter(Volunteer.user_id == current_user.id).first()
    if not volunteer:
        return []

    matches = db.query(VolunteerMatch).filter(
        VolunteerMatch.volunteer_id == volunteer.id
    ).order_by(VolunteerMatch.created_at.desc()).all()

    results = []
    for m in matches:
        project = db.query(Project).filter(Project.id == m.project_id).first()
        results.append(VolunteerMatchResponse(
            id=m.id,
            volunteer_id=m.volunteer_id,
            project_title=project.title if project else "Unknown",
            project_description=project.description if project else "",
            match_score=m.match_score,
            reasoning=m.reasoning,
            status=m.status,
            created_at=m.created_at,
        ))
    return results
