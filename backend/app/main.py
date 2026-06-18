from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from contextlib import asynccontextmanager
from sqlalchemy import text

from app.database import engine, Base
from app.routers import auth, volunteers, projects, events, reports, scholarships, chat, admin, opportunities


def run_migrations():
    with engine.connect() as conn:
        conn.execute(text("COMMIT"))
        for col, col_type in [
            ("role", "VARCHAR(20) DEFAULT 'user'"),
            ("status", "VARCHAR(20) DEFAULT 'draft'"),
            ("author", "VARCHAR(255) DEFAULT ''"),
            ("category", "VARCHAR(100) DEFAULT ''"),
            ("image_url", "VARCHAR(500) DEFAULT ''"),
            ("updated_at", "TIMESTAMP WITH TIME ZONE DEFAULT NOW()"),
        ]:
            for table, exists_col in [
                ("users", col),
                ("events", col),
                ("impact_stories", col),
                ("opportunities", col),
            ]:
                try:
                    result = conn.execute(text(
                        f"SELECT column_name FROM information_schema.columns "
                        f"WHERE table_name='{table}' AND column_name='{exists_col}'"
                    )).fetchone()
                    if not result and exists_col == col:
                        conn.execute(text(
                            f"ALTER TABLE {table} ADD COLUMN IF NOT EXISTS {col} {col_type}"
                        ))
                        conn.execute(text("COMMIT"))
                except Exception:
                    conn.execute(text("COMMIT"))


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    run_migrations()
    yield


app = FastAPI(
    title="NayePankh AI Companion API",
    description="Backend API for NayePankh Foundation platform",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "https://nayepankh-ai-companion.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(volunteers.router)
app.include_router(projects.router)
app.include_router(events.router)
app.include_router(reports.router)
app.include_router(scholarships.router)
app.include_router(chat.router)
app.include_router(admin.router)
app.include_router(opportunities.router)


@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "NayePankh API is running"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
