# Admin Feature Report

## Overview
Complete Admin Management System integrated into the existing NayePankh Foundation platform. All existing functionality remains intact.

## New Backend Routes

### Admin Dashboard
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/admin/dashboard` | Aggregated platform statistics |

### Opportunities Hub (CRUD)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/admin/opportunities` | List all opportunities (supports `?status=` & `?opportunity_type=` filters) |
| POST | `/api/admin/opportunities` | Create a new opportunity |
| GET | `/api/admin/opportunities/{id}` | Get single opportunity |
| PUT | `/api/admin/opportunities/{id}` | Update opportunity |
| DELETE | `/api/admin/opportunities/{id}` | Delete opportunity |

### Events Management (CRUD)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/admin/events` | List all events (supports `?status=` filter) |
| POST | `/api/admin/events` | Create new event |
| GET | `/api/admin/events/{id}` | Get single event |
| PUT | `/api/admin/events/{id}` | Update event |
| DELETE | `/api/admin/events/{id}` | Delete event |

### Stories Management (CRUD)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/admin/stories` | List all stories (supports `?status=` filter) |
| POST | `/api/admin/stories` | Create new story |
| GET | `/api/admin/stories/{id}` | Get single story |
| PUT | `/api/admin/stories/{id}` | Update story |
| DELETE | `/api/admin/stories/{id}` | Delete story |

### Volunteer Management
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/admin/volunteers` | List/search/filter volunteers (supports `?search=` & `?skill=` filters) |
| GET | `/api/admin/volunteers/{id}` | Get volunteer profile details |

## New Database Model: Opportunity
| Column | Type | Description |
|--------|------|-------------|
| id | Integer (PK) | Auto-increment ID |
| title | String | Opportunity title |
| description | Text | Full description |
| opportunity_type | String | scholarship, internship, workshop, competition, training, volunteer |
| eligibility | Text | Eligibility criteria |
| deadline | DateTime | Application deadline |
| apply_link | String | URL to apply |
| status | String | draft, published, archived |
| created_at | DateTime | Auto-generated |
| updated_at | DateTime | Auto-updated |

## New Frontend Pages (under `/admin`)
| Path | Description |
|------|-------------|
| `/admin/dashboard` | Stats dashboard with 5 metric cards, recent activity, quick actions |
| `/admin/opportunities` | CRUD table with create/edit modal, type & status filters |
| `/admin/events` | CRUD table with create/edit modal, status filter |
| `/admin/stories` | Card list with create/edit modal, status filter |
| `/admin/volunteers` | Grid view with search/filter, detail modal, CSV export |

## Admin Authorization
- All admin routes protected by `get_admin_user` dependency
- JWT token must have `role: "admin"` 
- Non-admin users receive **403 Forbidden**
- Unauthenticated requests receive **401 Unauthorized**

## Existing Features Verified
- Register ✓
- Login (form data) ✓
- /api/auth/me ✓
- Events listing ✓
- Projects listing ✓
- Scholarships listing ✓
- Reports/Stories ✓
- Health check ✓
