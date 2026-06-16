# Requirements: NayePankh AI Companion

**Defined:** 2026-06-16
**Core Value:** Providing NGO coordinators, volunteers, and beneficiaries with instant, multi-lingual access to verified opportunities and support through an easy-to-use conversational interface.

## v1 Requirements

Requirements for the MVP release. Each maps to roadmap phases.

### Infrastructure & Database

- [ ] **INFRA-01**: Docker Compose environment containing FastAPI backend, Vite-React frontend, and PostgreSQL database.
- [ ] **INFRA-02**: Configured connection and migration framework (Alembic/SQLAlchemy) for PostgreSQL.
- [ ] **DB-01**: PostgreSQL schema design and tables for Users, Documents, Conversations, and Messages.

### Authentication

- [ ] **AUTH-01**: Registration endpoint for admins, volunteers, and beneficiaries.
- [ ] **AUTH-02**: JWT-based secure login endpoint.
- [ ] **AUTH-03**: Secure route middleware on backend and authentication state context on React frontend.

### Document Upload & Management (Admin Dashboard)

- [ ] **DOC-01**: Secure API endpoint for uploading PDF, TXT, and Markdown files (admin only).
- [ ] **DOC-02**: Admin panel UI in React to view, upload, and delete documents.
- [ ] **DOC-03**: PostgreSQL document metadata storage tracking file name, upload date, status, and size.

### Vector DB & RAG Pipelines

- [ ] **RAG-01**: Background document processing (file reading, chunking, and embedding generation using Google Gemini API).
- [ ] **RAG-02**: Vector storage index setup using ChromaDB.
- [ ] **RAG-03**: Semantic document retrieval query API with relevance score ranking.

### Conversational AI & History

- [ ] **AI-01**: Chat model integration utilizing LangChain and Google Gemini API.
- [ ] **AI-02**: Retrieval-Augmented Generation (RAG) backend engine injecting retrieved document snippets as context.
- [ ] **AI-03**: Save and load chat sessions and messages in PostgreSQL.
- [ ] **UI-01**: Interactive React chat view supporting markdown, code highlights, and conversational history side panel.

### Admin Dashboard & Analytics

- [ ] **ADM-01**: Dashboard home screen displaying count of uploaded files, total chat sessions, and average response times.
- [ ] **ADM-02**: Admin view to inspect user-to-bot chat histories for moderation and verification purposes.

### Localization & Multi-language Support

- [ ] **LOC-01**: System-wide multi-language toggles between English and Hindi.
- [ ] **LOC-02**: Prompts and models instructed to reply in the detected or chosen user language.

## v2 Requirements

Deferred to future releases.

### Notifications & Reminders

- **NOTF-01**: Email and in-app alerts for volunteers when new tasks or activities are posted.
- **NOTF-02**: Push alerts for scholarship deadline reminders.

### Automatic Data Scraping

- **SCRP-01**: Auto-ingest relevant government scholarship databases and NayePankh social media posts weekly.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Real-time Voice Chat | High bandwidth requirements and API costs for NGO environment. Text first. |
| User Profile customization | Beyond core informational MVP needs. Standard credentials suffice. |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Pending |
| INFRA-02 | Phase 1 | Pending |
| DB-01 | Phase 3 | Pending |
| AUTH-01 | Phase 2 | Pending |
| AUTH-02 | Phase 2 | Pending |
| AUTH-03 | Phase 2 | Pending |
| DOC-01 | Phase 4 | Pending |
| DOC-02 | Phase 4 | Pending |
| DOC-03 | Phase 4 | Pending |
| RAG-01 | Phase 5 | Pending |
| RAG-02 | Phase 5 | Pending |
| RAG-03 | Phase 6 | Pending |
| AI-01 | Phase 7 | Pending |
| AI-02 | Phase 7 | Pending |
| AI-03 | Phase 8 | Pending |
| UI-01 | Phase 8 | Pending |
| ADM-01 | Phase 9 | Pending |
| ADM-02 | Phase 9 | Pending |
| LOC-01 | Phase 10 | Pending |
| LOC-02 | Phase 10 | Pending |

**Coverage:**
- v1 requirements: 20 total
- Mapped to phases: 20
- Unmapped: 0 ✓

---
*Requirements defined: 2026-06-16*
*Last updated: 2026-06-16 after initial definition*
