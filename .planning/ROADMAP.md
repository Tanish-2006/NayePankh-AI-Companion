# Roadmap: NayePankh AI Companion

## Overview

This roadmap defines the development lifecycle of the NayePankh AI Companion from a clean slate to a fully-deployed, production-ready RAG application. The journey starts with establishing the codebase foundations, building core auth and data schemas, implementing vector search/indexing pipelines, orchestrating AI chat with Google Gemini, rendering client interfaces, and finally introducing admin dashboard analytics and multi-language capabilities.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [ ] **Phase 1: Project Skeleton & Database Setup** - Scaffold Vite React, FastAPI backend, and PostgreSQL Docker environment.
- [ ] **Phase 2: JWT User Authentication** - Build JWT authentication flow on backend and auth state provider on frontend.
- [ ] **Phase 3: Database & Document Schema Design** - Define database models for users, docs, chat sessions, and messages using SQLAlchemy.
- [ ] **Phase 4: Admin Document Upload & Management** - Create secure document upload and deletion endpoints and corresponding UI screens.
- [ ] **Phase 5: Document Chunking & ChromaDB Vector Indexing** - Set up background chunking and embedding pipelines powered by Google Gemini API and ChromaDB.
- [ ] **Phase 6: Semantic Document Search API** - Expose document snippet querying and vector search with metadata relevance rankings.
- [ ] **Phase 7: Chat API with Gemini & LangChain (RAG)** - Orchestrate AI response pipeline using LangChain, combining context and conversation history.
- [ ] **Phase 8: React Conversation Interface & History** - Develop complete chatbot chat screen and sidebar list tracking user sessions.
- [ ] **Phase 9: Admin Dashboard & Analytics** - Integrate dashboard charts visualizing chatbot requests, token usage, and chat histories.
- [ ] **Phase 10: Multi-language Support & Polishing** - Polish UI components, add English/Hindi toggle support, and configure production builds.

## Phase Details

### Phase 1: Project Skeleton & Database Setup
**Goal**: Establish full monorepo skeleton, Docker Compose configuration, and local development start scripts.
**Depends on**: Nothing
**Requirements**: [INFRA-01, INFRA-02]
**Success Criteria** (what must be TRUE):
  1. Vite React and FastAPI instances run simultaneously in Docker.
  2. PostgreSQL database accepts client connections inside the Docker bridge.
**Plans**: 1 plan

Plans:
- [ ] 01-01: Build Vite React and FastAPI template workspace with Docker Compose.

### Phase 2: JWT User Authentication
**Goal**: Secure system paths and identify users via JSON Web Tokens (JWT).
**Depends on**: Phase 1
**Requirements**: [AUTH-01, AUTH-02, AUTH-03]
**Success Criteria** (what must be TRUE):
  1. Backend routes reject requests lacking valid JWT tokens.
  2. Users can login and register via responsive React input forms.
**Plans**: 2 plans

Plans:
- [ ] 02-01: Create backend auth routes, hashing, and token sign/verify.
- [ ] 02-02: Implement React auth page and AuthContext wrapper.

### Phase 3: Database & Document Schema Design
**Goal**: Structuring SQLAlchemy models and migration tools (Alembic) for core domain entities.
**Depends on**: Phase 2
**Requirements**: [DB-01]
**Success Criteria** (what must be TRUE):
  1. Database migrations run successfully creating Users, Documents, Conversations, and Messages tables.
  2. Database seeds initialize default admin and user accounts.
**Plans**: 1 plan

Plans:
- [ ] 03-01: Define SQLAlchemy schemas and run initial migrations with Alembic.

### Phase 4: Admin Document Upload & Management
**Goal**: Enable administrators to upload local NGO resource guides and FAQ files.
**Depends on**: Phase 3
**Requirements**: [DOC-01, DOC-02, DOC-03]
**Success Criteria** (what must be TRUE):
  1. Admin can upload files (PDF/TXT) via the React dashboard.
  2. Document database entries accurately record metadata, file paths, and processing status.
**Plans**: 2 plans

Plans:
- [ ] 04-01: Implement backend file upload handler and database operations.
- [ ] 04-02: Build document manager list and upload modal in React.

### Phase 5: Document Chunking & ChromaDB Vector Indexing
**Goal**: Automatically extract text content, split into semantic chunks, and vector index using Gemini embeddings.
**Depends on**: Phase 4
**Requirements**: [RAG-01, RAG-02]
**Success Criteria** (what must be TRUE):
  1. Uploaded files undergo chunking and text vector indexing.
  2. ChromaDB holds index collections populated with vector embeddings.
**Plans**: 2 plans

Plans:
- [ ] 05-01: Build file text extractors and chunking utilities.
- [ ] 05-02: Integrate Gemini Embeddings and store index blocks in ChromaDB.

### Phase 6: Semantic Document Search API
**Goal**: Create direct retrieval API checking most relevant document records against user queries.
**Depends on**: Phase 5
**Requirements**: [RAG-03]
**Success Criteria** (what must be TRUE):
  1. API returns ranked, relevant text snippets given search queries.
  2. Search filtering supports admin scopes or categories.
**Plans**: 1 plan

Plans:
- [ ] 06-01: Implement vector query retrieval endpoints with confidence scores.

### Phase 7: Chat API with Gemini & LangChain (RAG)
**Goal**: Enable RAG chatbot backend using LangChain context retrieval and Gemini generation.
**Depends on**: Phase 6
**Requirements**: [AI-01, AI-02]
**Success Criteria** (what must be TRUE):
  1. Chat responses reference information inside the uploaded NGO documents.
  2. Chat logs store generated replies in the PostgreSQL database.
**Plans**: 2 plans

Plans:
- [ ] 07-01: Implement conversation retrieval chain utilizing LangChain.
- [ ] 07-02: Build core chat endpoint supporting context synthesis.

### Phase 8: React Conversation Interface & History
**Goal**: Expose beautiful interactive chatbot UI and session history navigation.
**Depends on**: Phase 7
**Requirements**: [AI-03, UI-01]
**Success Criteria** (what must be TRUE):
  1. Chat window shows human-like conversation bubble flow and Markdown formatting.
  2. Sidebar loads and displays prior chat threads, allowing user navigation.
**Plans**: 2 plans

Plans:
- [ ] 08-01: Create chat message interface components with markdown rendering.
- [ ] 08-02: Connect conversation history list and active session loading.

### Phase 9: Admin Dashboard & Analytics
**Goal**: Monitor companion usage metrics and allow admins to audit active conversations.
**Depends on**: Phase 8
**Requirements**: [ADM-01, ADM-02]
**Success Criteria** (what must be TRUE):
  1. Dashboard analytics display total users, messages count, and storage sizes.
  2. NGO coordinators can read anonymous chat conversation transcripts.
**Plans**: 2 plans

Plans:
- [ ] 09-01: Implement admin analytics API query service.
- [ ] 09-02: Design analytics page using Recharts / Tailwind CSS.

### Phase 10: Multi-language Support & Polishing
**Goal**: Translate application views and model constraints to support English and Hindi speaking demographics.
**Depends on**: Phase 9
**Requirements**: [LOC-01, LOC-02]
**Success Criteria** (what must be TRUE):
  1. Application interface elements translate dynamically via a language selector.
  2. Chat prompts force Google Gemini to reply in the user's selected language.
**Plans**: 2 plans

Plans:
- [ ] 10-01: Integrate react-i18next framework and localization keys.
- [ ] 10-02: Refine prompt templates for bilingual conversational behavior.

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Project Skeleton & Database Setup | 0/1 | Not started | - |
| 2. JWT User Authentication | 0/2 | Not started | - |
| 3. Database & Document Schema Design | 0/1 | Not started | - |
| 4. Admin Document Upload & Management | 0/2 | Not started | - |
| 5. Document Chunking & ChromaDB Vector Indexing | 0/2 | Not started | - |
| 6. Semantic Document Search API | 0/1 | Not started | - |
| 7. Chat API with Gemini & LangChain (RAG) | 0/2 | Not started | - |
| 8. React Conversation Interface & History | 0/2 | Not started | - |
| 9. Admin Dashboard & Analytics | 0/2 | Not started | - |
| 10. Multi-language Support & Polishing | 0/2 | Not started | - |
