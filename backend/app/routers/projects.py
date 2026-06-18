import re
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.middleware.auth import get_current_user
from app.models.project import Project
from app.models.user import User
from app.schemas.project import ProjectCreate, ProjectResponse

router = APIRouter(prefix="/api/projects", tags=["Projects"])


@router.get("/", response_model=List[ProjectResponse])
def list_projects(db: Session = Depends(get_db)):
    projects = db.query(Project).order_by(Project.created_at.desc()).all()
    return [ProjectResponse.model_validate(p) for p in projects]


@router.get("/{slug}", response_model=ProjectResponse)
def get_project(slug: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.slug == slug).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return ProjectResponse.model_validate(project)


@router.post("/", response_model=ProjectResponse)
def create_project(data: ProjectCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    slug = re.sub(r'[^a-z0-9]+', '-', data.title.lower()).strip('-')
    project = Project(slug=slug, **data.model_dump())
    db.add(project)
    db.commit()
    db.refresh(project)
    return ProjectResponse.model_validate(project)
