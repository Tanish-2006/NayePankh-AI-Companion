# Authentication Fix Report

## Bugs Found

### 1. Login endpoint not OAuth2-compatible (root cause of Swagger 422)
**File:** `app/routers/auth.py:43-55`

The login endpoint used `UserLogin` (Pydantic JSON body) which expects `Content-Type: application/json`. Swagger's "Authorize" button sends credentials as `application/x-www-form-urlencoded` via `OAuth2PasswordRequestForm`. This caused a **422 Unprocessable Entity** when clicking Authorize.

**Fix:** Replaced `data: UserLogin` with `form_data: OAuth2PasswordRequestForm = Depends()`. This makes the endpoint accept form-encoded `username` and `password` fields, matching the OAuth2 password flow that Swagger uses.

Added `headers={"WWW-Authenticate": "Bearer"}` to the 401 response for proper OAuth2 compliance.

### 2. JWT `sub` claim stored as integer instead of string
**File:** `app/routers/auth.py:36,53` and `app/middleware/auth.py:44-47`

`create_access_token({"sub": user.id})` stored the user ID as an integer. Per JWT RFC 7519, the `sub` claim should be a string.

**Fix:** Changed to `create_access_token({"sub": str(user.id)})` in both register and login endpoints.

### 3. `get_current_user` didn't handle string-to-int conversion
**File:** `app/middleware/auth.py:43-48`

After decoding the JWT, `user_id: int = payload.get("sub")` assumed `sub` was already an int. With `sub` now stored as a string, the SQLAlchemy query `User.id == user_id` would fail silently or not match.

**Fix:** Changed to `user_id_raw = payload.get("sub")` then `user_id = int(user_id_raw)`, with `ValueError` and `TypeError` caught alongside `JWTError` in the except block.

## Changes Summary

| File | Change |
|------|--------|
| `app/routers/auth.py` | Replaced `UserLogin` with `OAuth2PasswordRequestForm`; `sub` stored as `str(user.id)` |
| `app/middleware/auth.py` | Added int conversion for `sub` claim; expanded exception handling |
| `app/schemas/user.py` | No changes (UserLogin kept for backward compatibility) |

## Verified Flow

1. **Register** → returns JWT with `sub` as string
2. **Login** (`application/x-www-form-urlencoded`) → returns JWT with `sub` as string
3. **Swagger Authorize** → accepts form data, stores Bearer token
4. **/api/auth/me** with `Authorization: Bearer <token>` → returns user data
5. **Invalid credentials** → 401 with `WWW-Authenticate: Bearer` header
6. **Invalid/expired token** → 401 with "Could not validate credentials"
