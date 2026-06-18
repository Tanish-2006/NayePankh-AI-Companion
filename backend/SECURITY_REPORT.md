# Security Report

## Authentication
- **JWT-based**: Tokens signed with HS256 using configurable `SECRET_KEY`
- **OAuth2 compatible**: Uses `OAuth2PasswordBearer` with `tokenUrl="/api/auth/login"`
- **Token expiry**: Configurable via `ACCESS_TOKEN_EXPIRE_MINUTES` (default: 1440)
- **Password hashing**: bcrypt via `passlib` with `CryptContext`
- **`sub` claim**: Stored as string per JWT RFC 7519

## Authorization (Role-Based Access Control)
- **`get_current_user`**: Decodes JWT, looks up user by ID
- **`get_admin_user`**: Extends `get_current_user`, checks `role == "admin"`
- **Admin routes**: Protected by `dependencies=[Depends(get_admin_user)]` at router level
- **Non-admin**: Returns **403 Forbidden** with `"Admin access required"`
- **Unauthenticated**: Returns **401 Unauthorized** with `WWW-Authenticate: Bearer` header

## Route Protection
| Access Level | Routes |
|-------------|--------|
| Public | `/api/health`, `/api/auth/register`, `/api/auth/login` |
| Authenticated | `/api/auth/me`, `/api/volunteers/*`, `/api/reports/*`, `/api/chat/*` |
| Admin Only | `/api/admin/*` |

## Input Validation
- **Pydantic models**: All request bodies validated with type checking
- **Email validation**: Uses `EmailStr` from pydantic
- **SQL injection**: ORM-based queries (SQLAlchemy) prevent injection
- **XSS protection**: React's JSX auto-escapes; no `dangerouslySetInnerHTML` used

## Database Security
- **SQLAlchemy ORM**: Parameterized queries prevent SQL injection
- **`pool_pre_ping=True**: Connection health checks
- **Password storage**: bcrypt hashed, never stored in plaintext

## Test Results
| Test | Result |
|------|--------|
| Authenticated admin access | ✅ Works |
| Authenticated non-admin access | ✅ 403 Forbidden |
| Unauthenticated access | ✅ 401 Unauthorized |
| Invalid JWT token | ✅ 401 Unauthorized |
| Invalid credentials | ✅ 401 Unauthorized |
| SQL injection attempt | ✅ ORM-safe |
