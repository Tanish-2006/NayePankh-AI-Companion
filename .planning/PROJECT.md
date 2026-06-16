# NayePankh AI Companion

## What This Is

NayePankh AI Companion is an AI-powered digital assistant designed for NGOs, volunteers, students, and beneficiaries associated with the NayePankh Foundation. It centralizes scattered information regarding programs, scholarships, training opportunities, events, and volunteering activities into a single Retrieval-Augmented Generation (RAG) conversational platform.

## Core Value

Providing NGO coordinators, volunteers, and beneficiaries with instant, multi-lingual access to verified opportunities and support through an easy-to-use conversational interface.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] **INFRA-01**: Setup FastAPI and React project skeleton with Docker Compose and PostgreSQL database.
- [ ] **AUTH-01**: JWT-based User Authentication with React sign-in/up screens.
- [ ] **DB-01**: SQLAlchemy database models for Users, Documents, Conversations, and Messages.
- [ ] **DOC-01**: Admin endpoint and UI to upload, store, and manage PDF/TXT documents.
- [ ] **RAG-01**: Document parsing, chunking, and vector indexing into ChromaDB using Gemini Embeddings.
- [ ] **RAG-02**: Semantic Document Search query API with metadata filtering.
- [ ] **AI-01**: Conversational LLM RAG chat engine using Google Gemini API and LangChain.
- [ ] **UI-01**: Dynamic chat interface with session history side panel.
- [ ] **ADM-01**: Admin dashboard showing usage stats, chat analytics, and uploaded documents.
- [ ] **LOC-01**: Multi-language support (English and Hindi) across chatbot responses and UI.

### Out of Scope

- **Real-time Voice Chat**: Focus on text-based conversational interfaces first to lower API costs and network requirements.
- **Auto-sync with Social Media**: Document upload is manual via the Admin Dashboard to guarantee verified information sources.

## Context

- **Target Audience**: Students seeking educational support, NGO coordinators/staff, volunteers, and beneficiaries.
- **Technology Choice**: FastAPI is used for its high performance and automatic OpenAPI generation. React + Tailwind + Vite offers a modern, high-speed frontend bundle. Google Gemini API is chosen for robust multi-language comprehension (English & Hindi).

## Constraints

- **Tech Stack**: FastAPI, Python, PostgreSQL, ChromaDB, Google Gemini API, React.js, Tailwind CSS, Vite.
- **Database**: Single PostgreSQL server instance, ChromaDB for vector indexing.
- **Language**: Core content and chat support must work seamlessly in English and Hindi.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use FastAPI + React | Fast development, robust OpenAPI documentation, and responsive modern UI | — Pending |
| ChromaDB for Vector DB | Light-weight, easy to run locally in Docker, and integrates perfectly with LangChain | — Pending |
| Google Gemini API | Excellent cost-performance ratio and natively supports multilingual tasks | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition**:
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone**:
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-16 after initialization*
