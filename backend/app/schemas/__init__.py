from app.schemas.user import UserCreate, UserLogin, UserResponse, TokenResponse
from app.schemas.volunteer import (
    VolunteerCreate, VolunteerResponse, VolunteerMatchResponse,
    VolunteerSkillSchema
)
from app.schemas.project import ProjectCreate, ProjectResponse
from app.schemas.event import EventCreate, EventResponse
from app.schemas.report import StoryGenerateRequest, StoryResponse, ReportCreate, ReportResponse
from app.schemas.scholarship import ScholarshipResponse, ScholarshipSearchRequest
from app.schemas.chat import ChatRequest, ChatResponse
from app.schemas.opportunity import OpportunityCreate, OpportunityUpdate, OpportunityResponse
from app.schemas.admin import (
    AdminStoryCreate, AdminStoryUpdate, AdminStoryResponse,
    AdminEventCreate, AdminEventUpdate, AdminEventResponse,
    DashboardResponse, AdminVolunteerResponse,
)
