# Bug Report - NayePankh AI Companion

## Fixed Bugs

### CRITICAL
| ID | File | Issue | Fix |
|----|------|-------|-----|
| B-001 | `frontend/src/pages/Volunteer.tsx:7` | `HandHeart` not exported from `lucide-react` - causes build failure | Replaced with `HeartHandshake` |
| B-002 | `backend/requirements.txt` | `email-validator` missing - `pydantic.EmailStr` crashes at import | Added `email-validator==2.1.0.post1` |
| B-003 | `backend/app/main.py:7` | `Base.metadata.create_all()` runs at module import time - app crashes if DB is down | Moved to `lifespan` event handler |

### HIGH
| ID | File | Issue | Fix |
|----|------|-------|-----|
| B-004 | `backend/app/models/event.py:22` | `is_upcoming` stored as String instead of Boolean | Changed to `Column(Boolean)` |
| B-005 | `backend/app/models/scholarship.py:20` | `is_active` stored as String instead of Boolean | Changed to `Column(Boolean)` |
| B-006 | `backend/app/models/report.py:32` | `is_published` stored as String instead of Boolean | Changed to `Column(Boolean)` |
| B-007 | `backend/app/services/ai_service.py` | Async methods wrapping synchronous OpenAI calls (block event loop) | Changed to `AsyncOpenAI` client with `await` |
| B-008 | `backend/app/services/ai_service.py` | `_call_llm` was synchronous but called from async methods | Made `_call_llm` async |
| B-009 | `backend/app/routers/projects.py:27` | POST /api/projects/ had no auth protection | Added `get_current_user` dependency |
| B-010 | `backend/app/routers/events.py:36` | POST /api/events/ had no auth protection | Added `get_current_user` dependency |

### MEDIUM
| ID | File | Issue | Fix |
|----|------|-------|-----|
| B-011 | `frontend/index.html:5` | Referenced `/favicon.svg` but file didn't exist | Created `public/favicon.svg` |
| B-012 | `frontend/src/pages/ScholarshipFinder.tsx:4` | Imported `CardHeader` but never used | Removed import |
| B-013 | `frontend/src/pages/ScholarshipFinder.tsx:15` | Imported `IndianRupee` but never used | Removed import |
| B-014 | `frontend/src/pages/Dashboard.tsx:6` | Imported `CardHeader` but never used | Removed import |
| B-015 | `frontend/src/pages/AIChat.tsx:7,9` | Imported `MessageCircle`, `Sparkles` but never used | Removed imports |
| B-016 | `backend/app/database.py:6` | No connection pooling configuration | Added pool_size, max_overflow, pool_pre_ping |
| B-017 | `backend/app/models/user.py:18` | `updated_at` had no `server_default` (NULL on create) | Added `server_default=func.now()` |

### LOW
| ID | File | Issue | Fix |
|----|------|-------|-----|
| B-018 | `frontend/.env` | Missing frontend environment file | Created with VITE_API_BASE_URL |
| B-019 | `.gitignore` | No gitignore file | Created with standard entries |

## Known Remaining Issues

### Backend
| ID | Issue | Severity |
|----|-------|----------|
| K-001 | No pagination on any list endpoint | LOW |
| K-002 | No PUT/DELETE endpoints for resources | LOW |
| K-003 | No event registration endpoint | MEDIUM |
| K-004 | Login only by username (not email) | LOW |
| K-005 | No password reset or email verification | MEDIUM |
| K-006 | No token refresh mechanism | MEDIUM |
| K-007 | No rate limiting on login | MEDIUM |
| K-008 | Volunteer matching fallback is random assignment | LOW |
| K-009 | db.commit() called in a loop (volunteers match) | LOW |
| K-010 | No SQLAlchemy relationship() definitions | LOW |
| K-011 | No Alembic migrations configured | MEDIUM |
| K-012 | No WebSocket support for chat | LOW |

### Frontend
| ID | Issue | Severity |
|----|-------|----------|
| K-013 | No eslint config file (lint command would fail) | LOW |
| K-014 | Silent API error handling (no console logging) | LOW |
| K-015 | Radix UI, Three.js packages installed but unused | LOW |
| K-016 | Empty component directories (stubs) | LOW |
| K-017 | No form validation library | LOW |
