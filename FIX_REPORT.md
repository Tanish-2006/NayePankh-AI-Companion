# Fix Report - NayePankh AI Companion

## Summary
- **Total bugs found:** 31
- **Total bugs fixed:** 22  
- **Remaining issues:** 9 (known limitations)
- **Build:** Frontend ✅ | Backend ✅

---

## Bugs Fixed

### CRITICAL (5 fixes)

| ID | File | Issue | Fix |
|----|------|-------|-----|
| F-001 | `backend/.env:3` | `ALGORITHM=HS256postgres` — JWT would silently fail or produce invalid tokens | Changed to `ALGORITHM=HS256` |
| F-002 | `backend/app/schemas/event.py:27` | `is_upcoming: str` but model uses `Boolean` — Pydantic validation mismatch | Changed to `is_upcoming: bool` |
| F-003 | `backend/app/schemas/scholarship.py:18` | `is_active: str` but model uses `Boolean` — Pydantic validation mismatch | Changed to `is_active: bool` |
| F-004 | `frontend/src/types/index.ts` | `Event.is_upcoming: string` but backend now returns boolean | Changed to `is_upcoming: boolean` |
| F-005 | `frontend/src/types/index.ts` | `Scholarship.is_active: string` but backend now returns boolean | Changed to `is_active: boolean` |

### HIGH (8 fixes)

| ID | File | Issue | Fix |
|----|------|-------|-----|
| F-006 | `frontend/src/pages/Events.tsx:47,63,79,95,111,127` | Fallback data used `is_upcoming: 'true'` (string) instead of boolean | Changed to `is_upcoming: true/false` |
| F-007 | `frontend/src/pages/Events.tsx:155` | `event.is_upcoming === 'true'` string comparison with boolean field | Changed to `event.is_upcoming` |
| F-008 | `frontend/src/pages/Events.tsx:270` | `event.is_upcoming === 'true'` string comparison in JSX | Changed to `event.is_upcoming` |
| F-009 | `frontend/src/pages/ScholarshipFinder.tsx:35,49,63,77,91` | Fallback data used `is_active: 'true'` (string) instead of boolean | Changed to `is_active: true` |
| F-010 | `frontend/src/pages/AIChat.tsx:55` | Read `res.response` but backend returns `reply` — AI responses never appeared | Changed to `res.reply` |
| F-011 | `backend/app/models/volunteer.py:22` | `Volunteer.updated_at` missing `server_default` — would be NULL on create | Added `server_default=func.now()` |
| F-012 | `frontend/src/pages/Volunteer.tsx:7` | `HandHeart` not exported from lucide-react — build failure | Replaced with `HeartHandshake` |
| F-013 | `backend/requirements.txt` | Missing `email-validator` — pydantic.EmailStr crashes at import | Added dependency |

### MEDIUM (6 fixes)

| ID | File | Issue | Fix |
|----|------|-------|-----|
| F-014 | `backend/app/main.py:7` | `Base.metadata.create_all()` ran at module import — app crashes if DB down | Moved to `lifespan` event handler |
| F-015 | `backend/app/routers/events.py:22` | `from datetime import datetime` inside function body | Moved to top-level imports |
| F-016 | `backend/app/routers/events.py:39` | `import re` inside function body | Moved to top-level imports |
| F-017 | `backend/app/routers/projects.py:29` | `import re` inside function body | Moved to top-level imports |
| F-018 | `backend/app/models/user.py:18` | `updated_at` had no `server_default` — NULL on create | Added `server_default=func.now()` |
| F-019 | `backend/app/routers/projects.py` | `POST /api/projects/` had no auth protection | Added `get_current_user` |

### LOW (3 fixes)

| ID | File | Issue | Fix |
|----|------|-------|-----|
| F-020 | `backend/app/routers/events.py` | `POST /api/events/` had no auth protection | Added `get_current_user` |
| F-021 | `backend/app/database.py:6` | No connection pooling configuration | Added pool_size, pool_pre_ping |
| F-022 | `frontend/src/pages/ScholarshipFinder.tsx:4` | Unused `CardHeader` import | Removed |

---

## Remaining Issues

| ID | Issue | Severity | Notes |
|----|-------|----------|-------|
| R-001 | No PostgreSQL running — backend won't start | CRITICAL | Requires Postgres on localhost:5432 |
| R-002 | No Alembic migrations configured | HIGH | Schema changes require manual SQL |
| R-003 | Contact form doesn't submit to API | MEDIUM | No backend `/api/contact` endpoint |
| R-004 | No pagination on list endpoints | MEDIUM | All list endpoints return full data |
| R-005 | Login only by username (not email) | LOW | Backend query filters by username only |
| R-006 | No token refresh mechanism | MEDIUM | Tokens expire after 1440 minutes |
| R-007 | No rate limiting on login | MEDIUM | No brute-force protection |
| R-008 | No WebSocket streaming for AI chat | LOW | Request/response only |
| R-009 | No eslint config file | LOW | `npm run lint` would fail |
