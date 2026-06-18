# Database Migration Report

## Migration Strategy
Migration is handled automatically on application startup via `run_migrations()` in `app/main.py`. This uses raw SQL `ALTER TABLE ADD COLUMN IF NOT EXISTS` to safely add columns to existing tables without data loss.

## Changes Applied

### `users` table
| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `role` | VARCHAR(20) | `'user'` | User role: `admin` or `user` |

**Existing data**: All existing users automatically get `role = 'user'`. No data loss.

### `events` table
| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `status` | VARCHAR(20) | `'draft'` | Event status: draft, published, cancelled |
| `updated_at` | TIMESTAMP WITH TIME ZONE | `NOW()` | Last update timestamp |

**Existing data**: All existing events get `status = 'draft'`. No data loss.

### `impact_stories` table
| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `author` | VARCHAR(255) | `''` | Story author name |
| `category` | VARCHAR(100) | `''` | Story category |
| `image_url` | VARCHAR(500) | `''` | Story image URL |
| `status` | VARCHAR(20) | `'draft'` | Story status: draft, published, archived |
| `updated_at` | TIMESTAMP WITH TIME ZONE | `NOW()` | Last update timestamp |

**Existing data**: All existing stories keep their data, new columns get defaults. No data loss.

### `opportunities` table (NEW)
| Column | Type | Default |
|--------|------|---------|
| id | SERIAL (PK) | auto |
| title | VARCHAR(255) | — |
| description | TEXT | — |
| opportunity_type | VARCHAR(50) | — |
| eligibility | TEXT | `''` |
| deadline | TIMESTAMP | nullable |
| apply_link | VARCHAR(500) | `''` |
| status | VARCHAR(20) | `'draft'` |
| created_at | TIMESTAMP WITH TIME ZONE | `NOW()` |
| updated_at | TIMESTAMP WITH TIME ZONE | `NOW()` |

## Migration Safety
1. **All existing columns unchanged** - no data loss
2. **Only additive changes** - new columns with defaults
3. **`IF NOT EXISTS` guards** - safe to run multiple times
4. **Tables created via `Base.metadata.create_all()`** - new tables auto-created

## Rollback
```sql
ALTER TABLE users DROP COLUMN role;
ALTER TABLE events DROP COLUMN status;
ALTER TABLE events DROP COLUMN updated_at;
ALTER TABLE impact_stories DROP COLUMN author;
ALTER TABLE impact_stories DROP COLUMN category;
ALTER TABLE impact_stories DROP COLUMN image_url;
ALTER TABLE impact_stories DROP COLUMN status;
ALTER TABLE impact_stories DROP COLUMN updated_at;
DROP TABLE IF EXISTS opportunities;
```
