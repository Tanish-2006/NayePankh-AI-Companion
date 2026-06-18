# Opportunity Data Flow Report

## Root Cause

The public **Scholarship Finder** page was reading from the legacy `Scholarship` model (`scholarships` table), while admin-created content was being written to the `Opportunity` model (`opportunities` table via the admin Opportunities Hub). These two tables were completely disconnected, so published admin opportunities never appeared on the public site.

## Data Flow (After Fix)

```
Admin creates opportunity → POST /api/admin/opportunities
  → Opportunity model (opportunities table, status="published")
    → GET /api/opportunities/ (public endpoint, filters status="published")
      → OpportunityFinder.tsx (public page, displays all types)
```

```
Legacy seed data remains in scholarships table (unused by public pages)
  → POST /api/scholarships/search (AI search endpoint still available, kept for backward compat)
```

## Changes Made

### Backend

| File | Change |
|------|--------|
| `app/routers/opportunities.py` | **New.** Public router with `GET /api/opportunities/` (list, optional `?type=` filter) and `GET /api/opportunities/{id}`. Reads `Opportunity` model filtered by `status == "published"`. |
| `app/routers/scholarships.py` | Removed `GET /` and `GET /{id}` endpoints (were reading from legacy `Scholarship` table). Kept `POST /search` for AI-powered scholarship search. |
| `app/main.py` | Added `opportunities.router` import and registration. |

### Frontend

| File | Change |
|------|--------|
| `src/pages/OpportunityFinder.tsx` | **New.** Replaces `ScholarshipFinder.tsx`. Reads from `GET /api/opportunities/`. Displays all opportunity types with type-specific icons/colors. Includes text search and type filter. |
| `src/lib/api.ts` | Added `api.opportunities.list()` and `api.opportunities.get()`. Removed `api.scholarships.list()` (the old public list endpoint). |
| `src/App.tsx` | Route `/opportunities` renders `OpportunityFinder`. Old `/scholarship-finder` redirects to `/opportunities`. |
| `src/components/layout/Navbar.tsx` | Nav link changed from `/scholarship-finder` ("Scholarships") to `/opportunities` ("Opportunities"). |

## Data Integrity

- **No data was deleted.** The `Scholarship` model/table and seed data remain untouched.
- **No data was duplicated.** The public page reads directly from the `Opportunity` table, same source that admins write to.
- **Legacy scholarship data** is preserved in the `scholarships` table but no longer exposed through public GET endpoints. The AI search endpoint still queries it for backward compatibility.

## Opportunity Types Supported

scholarship, internship, workshop, competition, training, volunteer — all displayed in the unified `OpportunityFinder` page.
