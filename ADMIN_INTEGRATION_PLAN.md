# Admin Management System - Integration Plan

## Architecture Overview

### Current Stack
- **Backend**: FastAPI + SQLAlchemy + PostgreSQL + JWT Auth
- **Frontend**: React + TypeScript + Vite + TailwindCSS + React Router
- **Auth**: OAuth2PasswordBearer with JWT tokens, bcrypt password hashing

### What Exists
- User model (no role field - only `is_volunteer`)
- Auth (register, login, /me)
- Volunteer profiles & matching
- Events (public listing)
- Projects (public listing)
- Scholarships (public listing + AI search)
- Impact Stories (AI-generated)
- Chat with AI fallback
- User Dashboard

### What's Missing
- Role-based access control (admin vs user)
- Admin-only endpoints
- Opportunities Hub (unified scholarship/internship/workshop/etc.)
- Admin CRUD for events
- Admin CRUD for success stories
- Admin volunteer management
- Admin dashboard with analytics

## Implementation Plan

### Phase 1: Analysis ✓ (this document)
### Phase 2: Role-Based Access Control
- Add `role` column to User model (default "user")
- Migration: ALTER TABLE users ADD COLUMN IF NOT EXISTS
- Helper: `require_admin()` dependency
- Existing users auto-default to "user"

### Phase 3: Admin Authorization
- JWT validation + role check in `require_admin()`
- 403 Forbidden for non-admin users
- No existing auth flow modified

### Phase 4: Admin Dashboard (Backend)
- GET /api/admin/dashboard - aggregated stats

### Phase 5: Opportunities Hub
- New model: `Opportunity` (replaces scholarship-only scope)
- Types: scholarship, internship, workshop, competition, training, volunteer
- CRUD endpoints under /api/admin/opportunities

### Phase 6: Events Management
- Admin CRUD for events (create/edit/delete/publish)
- Uses existing Event model with `status` field addition

### Phase 7: Success Stories
- Admin CRUD for ImpactStory
- Publish/unpublish workflow

### Phase 8: Volunteer Management
- Admin list/search/filter volunteers
- Profile viewing, data export

### Phase 9: AI Integration Prep
- Reusable service layer for content reading
- No API keys required yet

### Phase 10: Frontend Admin Pages
- /admin/dashboard
- /admin/opportunities
- /admin/events
- /admin/stories
- /admin/volunteers
- Admin layout with sidebar navigation

### Phase 11: Security
- Route protection
- JWT + role validation
- Input validation
- SQL injection (ORM-safe)

### Phase 12: Testing
- Full regression test of existing features
- Admin flow verification

### Phase 13: Reports
- ADMIN_FEATURE_REPORT.md
- SECURITY_REPORT.md
- DATABASE_MIGRATION_REPORT.md

## Database Changes
| Table | Change |
|-------|--------|
| users | ADD COLUMN role VARCHAR DEFAULT 'user' |
| opportunities | CREATE TABLE (NEW) |
| events | ADD COLUMN status VARCHAR DEFAULT 'draft' |
| impact_stories | ADD COLUMN status VARCHAR DEFAULT 'draft' |

## New Backend Routes
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/admin/dashboard | Dashboard stats |
| CRUD | /api/admin/opportunities | Opportunities hub |
| CRUD | /api/admin/events | Events management |
| CRUD | /api/admin/stories | Stories management |
| GET | /api/admin/volunteers | Volunteer list/search |

## New Frontend Routes
| Path | Description |
|------|-------------|
| /admin/dashboard | Admin dashboard |
| /admin/opportunities | Opportunities management |
| /admin/events | Events management |
| /admin/stories | Stories management |
| /admin/volunteers | Volunteer management |

## No Breaking Changes
- Existing auth flow untouched
- Existing user data preserved
- Existing routes unchanged
- Existing frontend pages unchanged
