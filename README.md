<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI">
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
</p>

<div align="center">
  <h1>NayePankh AI Companion</h1>
  <p><strong>Spreading wings, changing lives — a full-stack NGO management platform powered by AI</strong></p>
  <p>
    <a href="https://nayepankh-ai-companion.vercel.app" target="_blank">🌐 Live Demo</a> •
    <a href="https://nayepankh-ai-companion.onrender.com/docs" target="_blank">📖 API Docs</a> •
    <a href="https://nayepankh-ai-companion.onrender.com/api/health" target="_blank">💚 Health Check</a>
  </p>
</div>

---

## Overview

NayePankh AI Companion is a production-grade full-stack platform designed for the **NayePankh Foundation**, an Indian NGO committed to education, empowerment, and community development. The platform bridges the gap between NGOs, volunteers, students, and communities through a unified digital experience.

**What it does:**
- Enables volunteers to discover, register, and track their contributions
- Matches volunteers to projects using AI-powered recommendations
- Provides students with scholarship discovery and AI-curated opportunities
- Generates polished impact stories, donor reports, and social media content via AI
- Offers an intelligent chatbot for NGO knowledge and program information
- Gives administrators full CRM capabilities for users, events, opportunities, stories, and volunteers

---

## Key Features

| Feature | Description |
|---|---|
| **Authentication & Authorization** | JWT-based registration and login with bcrypt password hashing |
| **Role-Based Access Control** | User and admin roles with route-level guards on both frontend and backend |
| **Volunteer Management** | Profile creation, skills/interests tracking, hours contributed, activity history |
| **AI-Powered Volunteer Matching** | OpenAI-driven matching of volunteers to NGO projects based on skills and interests |
| **Opportunities Hub** | Browse scholarships, internships, workshops, and competitions with type filtering |
| **Scholarship Search** | AI-enhanced scholarship discovery with personalized recommendations |
| **Events Management** | Browse upcoming events, filter by category, detailed event pages |
| **Impact Story Generator** | AI transforms raw activity notes into polished stories, donor reports, LinkedIn posts, and newsletters |
| **AI Assistant** | Conversational chatbot trained on NayePankh programs, impact, and FAQs |
| **Admin Dashboard** | Real-time platform statistics, CRUD management for all content types |
| **Responsive UI** | Mobile-first design with Tailwind CSS, Framer Motion animations, and custom theme |
| **PostgreSQL Database** | Cloud-hosted on Supabase with SQLAlchemy ORM and automatic migration |

---

## System Architecture

```
┌────────────────────────────────────────────────────────────┐
│                     Frontend (React + Vite)                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐ │
│  │   Auth   │ │Volunteer │ │   Chat   │ │   Admin      │ │
│  │   Pages  │ │ Dashboard│ │Interface │ │   Panel      │ │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └──────┬───────┘ │
│       └────────────┴────────────┴───────────────┘         │
│                        │  HTTP / JSON / JWT                │
│                        ▼                                   │
│              ┌─────────────────────┐                       │
│              │  API Client (api.ts) │                       │
│              └─────────┬───────────┘                       │
└────────────────────────┼───────────────────────────────────┘
                         │ CORS
                         ▼
┌────────────────────────────────────────────────────────────┐
│                   Backend (FastAPI + Python)                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐ │
│  │Auth Router│ │ Volunteer│ │  Chat    │ │   Admin      │ │
│  │          │ │  Router  │ │  Router  │ │   Router     │ │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └──────┬───────┘ │
│       └────────────┴────────────┴───────────────┘         │
│                        │                                    │
│              ┌─────────┴─────────┐                         │
│              │  Middleware (JWT)  │                         │
│              └─────────┬─────────┘                         │
│          ┌─────────────┼─────────────┐                     │
│          ▼             ▼             ▼                     │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐             │
│  │SQLAlchemy  │ │   OpenAI   │ │   Pydantic │             │
│  │   ORM      │ │  Service   │ │ Validation │             │
│  └─────┬──────┘ └────────────┘ └────────────┘             │
│        ▼                                                   │
│  ┌────────────┐                                            │
│  │ PostgreSQL │ (Supabase)                                 │
│  └────────────┘                                            │
└────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **React 18** | UI library with functional components and hooks |
| **TypeScript** | Type-safe development with strict mode |
| **Vite 5** | Fast build tool with HMR and optimized production builds |
| **Tailwind CSS 3** | Utility-first CSS with custom brand theme |
| **React Router v6** | Client-side routing with protected/admin route guards |
| **Framer Motion** | Declarative animations and page transitions |
| **Radix UI** | Accessible headless UI primitives (dialog, dropdown, select, tabs, toast) |
| **Lucide React** | Consistent icon library |
| **React Three Fiber** | 3D graphics capabilities |
| **Class Variance Authority** | Component variant management |

### Backend

| Technology | Purpose |
|---|---|
| **FastAPI** | High-performance async Python web framework with automatic OpenAPI docs |
| **SQLAlchemy 2.0** | ORM with PostgreSQL backend and connection pooling |
| **Pydantic v2** | Request/response validation with EmailStr and custom schemas |
| **python-jose** | JWT token creation and verification (HS256) |
| **passlib + bcrypt** | Password hashing with configurable work factor |
| **OpenAI API** | AI-powered story generation, volunteer matching, and scholarship recommendations |
| **Python 3.12** | Latest stable Python runtime |
| **uvicorn** | ASGI server with hot reload for development |

### Database

| Technology | Purpose |
|---|---|
| **PostgreSQL** | Relational database hosted on Supabase |
| **Supabase** | Managed PostgreSQL with connection pooling and auto-scaling |

### DevOps & Deployment

| Service | Purpose |
|---|---|
| **Vercel** | Frontend hosting with automatic deployments from Git |
| **Render** | Backend hosting with Python runtime and environment variable management |
| **dotenv** | Environment configuration across development and production |

---

## Screenshots

> *Screenshots to be added. The platform features a polished UI with gradient hero sections, animated statistics counters, glassmorphism cards, and a consistent brand theme.*

| Page | Description |
|---|---|
| **Home** | Hero section with CTA, mission cards, animated impact counters, success stories, programs showcase, upcoming events, and scholarship previews |
| **Login / Register** | Split-panel layout with gradient decorative panels and form validation |
| **Dashboard** | Welcome card with stats grid, quick actions (Story Generator, AI Assistant, Scholarships), and tabbed interface for profile, skills, history, and matches |
| **Opportunities Hub** | Filterable grid of scholarships, internships, workshops, and competitions |
| **Events** | Card grid with search, category filter, and upcoming date sorting |
| **Volunteer** | Registration form, benefits section, and impact statistics |
| **AI Assistant** | Chat interface with suggested questions and message history |
| **Story Generator** | Form-based AI story creation with tabs for Impact Story, Donor Report, LinkedIn Post, and Newsletter |
| **Admin Dashboard** | Statistics cards (users, volunteers, events, opportunities, stories) with recent activity feed and quick action links |
| **Admin Management** | Full CRUD interfaces for opportunities, events, impact stories, and volunteer database |

---

## Project Structure

```
nayepankh-ai-companion/
├── backend/
│   ├── app/
│   │   ├── main.py                 # FastAPI app, CORS, lifespan, router registration
│   │   ├── config.py               # Settings via pydantic-settings + .env
│   │   ├── database.py             # SQLAlchemy engine, session, Base
│   │   ├── middleware/
│   │   │   └── auth.py             # JWT, password hashing, current_user/admin_user deps
│   │   ├── models/
│   │   │   ├── user.py             # User: id, email, username, hashed_password, role, etc.
│   │   │   ├── volunteer.py        # Volunteer: skills, interests, availability, hours
│   │   │   ├── project.py          # Project: title, category, location, skills_required
│   │   │   ├── event.py            # Event: title, date, category, organizer, max_participants
│   │   │   ├── opportunity.py      # Opportunity: type, eligibility, deadline, status
│   │   │   ├── scholarship.py      # Scholarship: amount, provider, education_level, deadline
│   │   │   ├── report.py           # ImpactStory, Report
│   │   │   └── chat.py             # ChatHistory, ChatMessage
│   │   ├── schemas/                # Pydantic models for request/response validation
│   │   │   ├── user.py             # UserCreate, UserLogin, UserResponse, TokenResponse
│   │   │   ├── volunteer.py        # VolunteerCreate, VolunteerResponse, VolunteerMatchResponse
│   │   │   ├── project.py          # ProjectCreate, ProjectResponse
│   │   │   ├── event.py            # EventCreate, EventResponse
│   │   │   ├── opportunity.py      # OpportunityCreate, OpportunityUpdate, OpportunityResponse
│   │   │   ├── scholarship.py      # ScholarshipSearchRequest, ScholarshipResponse
│   │   │   ├── report.py           # StoryGenerateRequest, StoryResponse, ReportCreate, ReportResponse
│   │   │   ├── chat.py             # ChatRequest, ChatResponse
│   │   │   └── admin.py            # AdminStoryCreate/Update/Response, AdminEvent, DashboardResponse
│   │   ├── routers/
│   │   │   ├── auth.py             # register, login, me
│   │   │   ├── admin.py            # dashboard, CRUD opportunities/events/stories, volunteers list
│   │   │   ├── volunteers.py       # profile CRUD, matches, match trigger, history
│   │   │   ├── projects.py         # list, get by slug, create
│   │   │   ├── events.py           # list, upcoming, get by slug, create
│   │   │   ├── opportunities.py    # list published, get by id
│   │   │   ├── scholarships.py     # AI-enhanced search
│   │   │   ├── chat.py             # send message, get history
│   │   │   └── reports.py          # generate story, list/get stories, CRUD reports
│   │   └── services/
│   │       ├── ai_service.py       # OpenAI integration: chat, match, stories, scholarships
│   │       └── content_service.py  # Content management helpers
│   ├── requirements.txt
│   ├── runtime.txt                 # Python 3.12.3
│   ├── seed.py                     # Database seeder with admin user, projects, events, scholarships
│   └── .env                        # DATABASE_URL, SECRET_KEY, OPENAI_API_KEY, etc.
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx                # React entry point
│   │   ├── App.tsx                 # Routes, protected/admin route guards
│   │   ├── index.css               # Tailwind directives, custom utilities, animations
│   │   ├── lib/
│   │   │   ├── api.ts              # Centralized API client with JWT handling
│   │   │   └── utils.ts            # cn(), formatDate(), formatCurrency(), truncate()
│   │   ├── hooks/
│   │   │   └── useAuth.tsx         # Auth context provider (login, register, logout, user state)
│   │   ├── types/
│   │   │   └── index.ts            # TypeScript interfaces for all data models
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Layout.tsx      # Public layout with Navbar + Footer + Outlet
│   │   │   │   ├── AdminLayout.tsx # Admin layout with sidebar navigation
│   │   │   │   ├── Navbar.tsx      # Responsive nav with auth-aware links and mobile menu
│   │   │   │   └── Footer.tsx      # Site footer with links and branding
│   │   │   └── ui/                 # Reusable UI primitives (button, card, input, badge, textarea)
│   │   └── pages/
│   │       ├── Home.tsx            # Landing page with hero, stats, stories, programs, events
│   │       ├── About.tsx           # Organization information
│   │       ├── Programs.tsx        # NGO programs showcase
│   │       ├── Events.tsx          # Event listings with search and filter
│   │       ├── Volunteer.tsx       # Volunteer registration and information
│   │       ├── Login.tsx           # Authentication form
│   │       ├── Register.tsx        # User registration form
│   │       ├── Dashboard.tsx       # User dashboard with stats and tabs
│   │       ├── AIChat.tsx          # AI knowledge assistant interface
│   │       ├── OpportunityFinder.tsx # Browse scholarships, internships, workshops, competitions
│   │       ├── ScholarshipFinder.tsx # AI-powered scholarship search
│   │       ├── StoryGenerator.tsx  # AI impact story creator with multi-format output
│   │       ├── Contact.tsx         # Contact form and information
│   │       └── admin/
│   │           ├── Dashboard.tsx   # Admin statistics overview
│   │           ├── Opportunities.tsx # CRUD opportunities management
│   │           ├── Events.tsx      # CRUD events management
│   │           ├── Stories.tsx     # CRUD impact stories management
│   │           └── Volunteers.tsx  # Volunteer database with search
│   ├── package.json
│   ├── vite.config.ts              # Vite config with React plugin and path alias
│   ├── tailwind.config.ts          # Custom brand colors, fonts, animations
│   ├── tsconfig.json
│   └── postcss.config.js
│
└── README.md
```

---

## Installation

### Prerequisites

- Python 3.12+
- Node.js 18+
- PostgreSQL (or a Supabase account for cloud-hosted DB)
- OpenAI API key (optional — falls back to template responses)

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/nayepankh-ai-companion.git
cd nayepankh-ai-companion/backend

# Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env   # Create .env file (see Environment Variables below)

# Seed the database with sample data
python seed.py

# Start the development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000` with interactive docs at `http://localhost:8000/docs`.

### Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`. The Vite dev server proxies `/api` requests to the backend at `http://localhost:8000`.

### Production Build

```bash
# Build frontend for production
npm run build

# Preview the production build locally
npm run preview
```

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Default | Description |
|---|---|---|---|
| `DATABASE_URL` | Yes | `postgresql://postgres:postgres@localhost:5432/nayepankh` | PostgreSQL connection string (local or Supabase) |
| `SECRET_KEY` | Yes | `change-this-to-a-secure-secret-key-in-production` | JWT signing secret (use a strong random value in production) |
| `ALGORITHM` | No | `HS256` | JWT signing algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | No | `30` | JWT token expiration time in minutes |
| `OPENAI_API_KEY` | No | `""` | OpenAI API key for AI features (story generation, matching, chat, scholarships) |
| `OPENAI_MODEL` | No | `gpt-4o-mini` | OpenAI model to use for AI features |

> **Note:** All AI features work even without an OpenAI API key by falling back to intelligent template-based responses, making the platform fully functional in development.

---

## API Endpoints

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | None | Register a new user (email, username, password, full_name) → JWT + user |
| `POST` | `/api/auth/login` | None | Login (username, password via form) → JWT + user |
| `GET` | `/api/auth/me` | User | Get current authenticated user profile |

### Volunteers

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/volunteers/profile` | User | Get current user's volunteer profile |
| `POST` | `/api/volunteers/profile` | User | Create or update volunteer profile (sets `is_volunteer=true`) |
| `GET` | `/api/volunteers/matches` | User | Get AI-generated project matches |
| `POST` | `/api/volunteers/match` | User | Trigger AI matching for new recommendations |
| `GET` | `/api/volunteers/history` | User | Get match history |

### Content

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/projects/` | None | List all projects |
| `GET` | `/api/projects/{slug}` | None | Get project by slug |
| `GET` | `/api/events/` | None | List all events |
| `GET` | `/api/events/upcoming` | None | List upcoming events |
| `GET` | `/api/events/{slug}` | None | Get event by slug |
| `GET` | `/api/opportunities/` | None | List published opportunities (optional `?type=` filter) |
| `GET` | `/api/opportunities/{id}` | None | Get opportunity by ID |
| `POST` | `/api/scholarships/search` | None | AI-enhanced scholarship search |

### AI Features

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/chat/` | User | Send message to AI assistant (creates/manages sessions) |
| `GET` | `/api/chat/history` | User | Get all chat sessions with messages |
| `POST` | `/api/reports/generate-story` | User | Generate AI-powered impact story from activity notes |
| `GET` | `/api/reports/stories` | None | List all impact stories |
| `GET` | `/api/reports/stories/{id}` | None | Get impact story by ID |

### Admin

All admin endpoints require `admin` role.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/dashboard` | Platform statistics (users, volunteers, events, opportunities, stories) |
| `GET` | `/api/admin/opportunities` | List all opportunities (with optional status/type filters) |
| `POST` | `/api/admin/opportunities` | Create a new opportunity |
| `PUT` | `/api/admin/opportunities/{id}` | Update an opportunity |
| `DELETE` | `/api/admin/opportunities/{id}` | Delete an opportunity |
| `GET` | `/api/admin/events` | List all events (with optional status filter) |
| `POST` | `/api/admin/events` | Create a new event |
| `PUT` | `/api/admin/events/{id}` | Update an event |
| `DELETE` | `/api/admin/events/{id}` | Delete an event |
| `GET` | `/api/admin/stories` | List all impact stories (with optional status filter) |
| `POST` | `/api/admin/stories` | Create a new impact story |
| `PUT` | `/api/admin/stories/{id}` | Update an impact story |
| `DELETE` | `/api/admin/stories/{id}` | Delete an impact story |
| `GET` | `/api/admin/volunteers` | List volunteers with optional search and skill filters |
| `GET` | `/api/admin/volunteers/{id}` | Get volunteer details with user info |

### Utility

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check endpoint |

---

## Admin Features

The admin panel (`/admin/*`) provides full content management capabilities:

- **Dashboard** — Real-time counts of users, volunteers, active events, published opportunities, and impact stories with a recent activity feed
- **Opportunities Management** — Create, edit, publish/unpublish, and delete scholarships, internships, workshops, and competitions
- **Events Management** — Full CRUD for NGO events with auto-generated slugs and status management
- **Impact Stories** — Review, approve, edit, and publish community impact stories
- **Volunteer Database** — Searchable volunteer directory with skill filtering, contact details, and contribution tracking

**Default admin credentials** (created by `seed.py`):
- Username: `admin`
- Password: `admin123`

---

## Security Features

- **Password Hashing** — All passwords hashed with bcrypt (12 rounds) via passlib
- **JWT Authentication** — Stateless token-based auth with HS256 signing and configurable expiration
- **Protected Routes** — Backend endpoints guarded by `get_current_user` and `get_admin_user` dependencies
- **Frontend Route Guards** — `ProtectedRoute` and `AdminRoute` components redirect unauthenticated users
- **CORS Configuration** — Whitelist of allowed origins (localhost, Vercel domain)
- **Input Validation** — All request bodies validated by Pydantic schemas with type coercion and email format checking
- **SQL Injection Protection** — SQLAlchemy ORM with parameterized queries throughout
- **Token Security** — `sub` claim stored as string (per JWT RFC 7519) with proper type conversion

---

## Future Enhancements

- **Email Verification** — Send welcome/verification emails on registration
- **Password Reset** — Forgot password flow with email-based reset tokens
- **File Uploads** — Image and document upload for events, stories, and volunteer profiles
- **Donation Integration** — Payment gateway (Razorpay/Stripe) for online donations
- **Notification System** — Email and in-app notifications for match updates, event reminders
- **Mobile App** — React Native companion app for volunteers on the go
- **Multi-language Support** — Hindi and regional language translations
- **Advanced Analytics** — Time-series charts and exportable reports for admin dashboard
- **OAuth Login** — Google and GitHub social login options
- **CI/CD Pipeline** — Automated testing, linting, and deployment via GitHub Actions

---

## Live Demo

| Service | URL |
|---|---|
| **Frontend** | [https://nayepankh-ai-companion.vercel.app](https://nayepankh-ai-companion.vercel.app) |
| **Backend API** | [https://nayepankh-ai-companion.onrender.com](https://nayepankh-ai-companion.onrender.com) |
| **API Documentation** | [https://nayepankh-ai-companion.onrender.com/docs](https://nayepankh-ai-companion.onrender.com/docs) |

---

## Author

**Tanish Agrawal**  
B.Tech CSE (AI & ML)  
MIET College, Meerut

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
