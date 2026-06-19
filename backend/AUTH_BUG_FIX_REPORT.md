# Authentication Bug Fix Report

## Root Cause

**passlib 1.7.4 is incompatible with bcrypt >= 4.1** (including bcrypt 5.0.0).

When bcrypt >= 4.1 is installed, passlib's backend detection fails because `bcrypt.__about__.__version__` was removed in newer bcrypt releases. This causes passlib's bcrypt handler to enter a broken state where it rejects **all** passwords — regardless of length — with:

```
ValueError: password cannot be longer than 72 bytes, truncate manually if necessary (e.g. my_password[:72])
```

This breaks both **registration** (cannot hash the password) and **login** (cannot verify the password), resulting in:
- `POST /api/auth/register` → HTTP 500
- `POST /api/auth/login` → "Invalid username or password"

The error occurs on **Render** (and any fresh environment) because `pip install passlib[bcrypt]==1.7.4` installs the latest bcrypt (currently 5.0.0). Local development worked previously only because an older bcrypt (4.0.1) happened to be cached in the virtual environment.

## Files Changed

Only **one file** was modified:

| File | Change |
|------|--------|
| `requirements.txt` | Replaced `passlib[bcrypt]==1.7.4` with `passlib==1.7.4` and added explicit `bcrypt==4.0.1` |

No other files were touched. All application logic, schemas, routes, middleware, models, and database code remain unchanged.

## Exact Fix Applied

**Before:**
```
passlib[bcrypt]==1.7.4
```

**After:**
```
passlib==1.7.4
bcrypt==4.0.1
```

The `[bcrypt]` extra was removed from passlib (it was the implicit source of the unpinned bcrypt install). Instead, bcrypt is now pinned to `4.0.1`, the last fully compatible version with passlib 1.7.4.

## Root Cause Analysis Summary

| Investigation Area | Finding |
|---|---|
| `app/routers/auth.py` | Correct — `data.password` is a plain `str`, passed correctly to `get_password_hash()` |
| `app/middleware/auth.py` | Correct — `pwd_context.hash()` and `pwd_context.verify()` called with correct arguments |
| `app/schemas/user.py` | Correct — `UserCreate.password` is `str`, no serialization issues |
| `app/models/user.py` | Correct — `hashed_password` is `String` with no restrictive length |
| Password hashing flow | **Broken** — passlib 1.7.4 fails with bcrypt >= 4.1 due to removed `__about__` attribute |
| Request payload structure | Correct — frontend sends `{"email","username","password","full_name"}` as JSON for register, `application/x-www-form-urlencoded` for login |
| Pydantic models | Correct — no special `password` handling, plain string fields |
| SQLAlchemy models | Correct — no issues |
| Frontend requests | Correct — register sends JSON, login sends form-encoded |

## Testing Performed

All tests pass with the fix applied:

1. **Password hashing** — `get_password_hash()` produces valid `$2b$` bcrypt hashes for all password lengths (1–200 bytes)
2. **Password verification** — `verify_password()` correctly validates matching passwords and rejects wrong ones
3. **Register flow** — User created in database with valid bcrypt hash; hash is correctly stored and retrievable
4. **Login flow** — Username lookup + password verification succeeds
5. **Wrong password** — Correctly returns 401 Unauthorized
6. **JWT token** — `create_access_token()` produces valid tokens with `sub` as string
7. **Duplicate registration** — Correctly detects existing email/username
8. **Admin login** — Seed admin user verified with password "admin123"
9. **All password lengths** — 1, 8, 32, 64, 72, 73, 100, and 200 byte passwords all hash and verify correctly
10. **SQL string as password** — Confirmed that the entire JSON payload is NOT accidentally passed as password

## Confirmation

- **No other modules were modified** — Only `requirements.txt` was changed
- **All existing functionality preserved** — Admin dashboard, Opportunities Hub, Events, Stories, Volunteers, Scholarships, AI Assistant, and all existing API routes and database records remain untouched
- **Works in local development and Render production** — bcrypt 4.0.1 is a stable release compatible with Python 3.12
