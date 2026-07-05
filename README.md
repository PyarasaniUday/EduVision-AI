# EduVision AI - AI-Powered Decision Intelligence Platform for Education & Lifelong Learning
https://jumpshare.com/s/6LHlKuNkF2t8L7VaxB4H

EduVision AI is a production-ready, enterprise-grade Decision Intelligence Platform designed to help students, teachers, placement officers, and educational institutions make personalized academic, learning, and career decisions. Unlike simple conversational chatbots, EduVision AI leverages advanced decision intelligence engines powered by Google Cloud Vertex AI & Gemini APIs, backed by structured datasets and modern databases to deliver actionable recommendations.

## 🚀 Hackathon Details
- **Project Name:** EduVision AI
- **Tagline:** AI-Powered Decision Intelligence Platform for Education & Lifelong Learning
- **Challenge Domain:** Education & Lifelong Learning
- **Hackathon Theme:** AI for Better Living and Smarter Communities
- **Target Users:** Students, Teachers, Placement Officers, Educational Institutions

---

## 🏗️ System Architecture
The platform is designed to scale from a hackathon prototype into a full-fledged enterprise SaaS application.

```
Students, Teachers, Placements
             │
             ▼
┌──────────────────────────┐
│     React Frontend       │ (Vite, Tailwind CSS, Chart.js)
└────────────┬─────────────┘
             │ (Secured via Firebase Auth tokens)
             ▼
┌──────────────────────────┐
│     FastAPI Backend      │ (Python REST APIs, CORS, Middleware)
└────────────┬─────────────┘
             │
      ┌──────┴────────────────────────────────────┐
      ▼                                           ▼
┌──────────────────────────┐               ┌───────────────┐
│Decision Intelligence Eng.│               │Firestore DB   │ (User profiles, state,
└────────────┬─────────────┘               └───────────────┘  learning roadmaps)
             │
             ├────────────────────────────────────┐
             ▼                                    ▼
┌──────────────────────────┐               ┌───────────────┐
│Google Gemini API (Vertex)│               │Cloud Storage  │ (Resume uploads, static files)
└──────────────────────────┘               └───────────────┘
```

The enterprise-grade architecture diagram is available at [docs/architecture/architecture_diagram.png](file:///c:/Users/UDAY%20KUMAR/OneDrive/Desktop/Hack2skill/EduVision-AI/docs/architecture/architecture_diagram.png).

---

## 🛠️ Technology Stack
- **Frontend:** React, Tailwind CSS, React Router, Chart.js, Vite
- **Backend:** FastAPI (Python), Uvicorn
- **AI Core:** Google Gemini API (via Google GenAI SDK / Vertex AI)
- **Database & Storage:** Google Cloud Firestore, Google Cloud Storage
- **Authentication:** Firebase Authentication
- **Hosting & Infrastructure:** Firebase Hosting (Frontend), Google Cloud Run (Backend, Dockerized)
- **CI/CD:** GitHub Actions

---

## 📁 Directory Structure Overview

```
EduVision-AI/
├── frontend/                     # React Single Page Application (SPA)
│   ├── public/                   # Static assets for the web application
│   ├── src/
│   │   ├── assets/               # Brand logos, icons, and illustrations
│   │   ├── components/           # Reusable UI widgets and charts (Dashboard widgets, mentor bubble)
│   │   ├── hooks/                # Custom React hooks (useAuth, useFetch)
│   │   ├── pages/                # Page layouts (Dashboard, Mentor, SkillGap, Roadmap, etc.)
│   │   ├── services/             # API services for Backend, Firebase Auth & Firestore
│   │   └── utils/                # Utility helpers for dates, scores, and statistics
│   ├── package.json              # Frontend package dependencies
│   ├── tailwind.config.js        # Tailwind CSS styling design system configuration
│   └── Vite.config.js            # Vite bundler options
│
├── backend/                      # FastAPI Python Backend
│   ├── app/
│   │   ├── api/                  # REST endpoints/routers (routes for Mentor, Gap analysis, Roadmaps)
│   │   ├── core/                 # Config environment variables, security, and DB connection
│   │   ├── models/               # Pydantic data schemas for requests and responses
│   │   ├── services/             # Core algorithms (Decision Intelligence Engine, Recommendation Engine)
│   │   └── main.py               # Main API application entry point
│   ├── requirements.txt          # Python dependencies
│   └── Dockerfile                # Production Docker container image definition
│
├── ai/                           # AI Engine Core
│   ├── prompts/                  # System prompts and templates (Roadmap, SkillGap, Mentor prompts)
│   └── services/                 # Google Gemini SDK API wrappers
│
├── database/                     # Firestore Configuration & Seeding
│   ├── firestore.rules           # Security rules for document access
│   ├── firestore.indexes.json    # Composite indexing rules for quick querying
│   └── seed/                     # Seed data ingestion utilities
│
├── docs/                         # Documentation, Architecture Diagrams, and Resources
│   ├── architecture/             # High-quality PNG architecture diagram
│   ├── api_documentation.md      # FastAPI endpoints specification
│   └── pitch_deck_resources.md   # Resources, metrics, and slides framework for judges
│
├── data/                         # Static Knowledge Bases and Data Catalogs
│   ├── sample_data/
│   │   ├── student/              # Sample student profiles, records, and roadmaps
│   │   └── career/               # Sample career catalog, industry benchmarks, and skills list
│   └── knowledge_base/           # domain JSON files containing curated knowledge indexes
│
├── config/                       # Firebase configuration and security service credentials
├── scripts/                      # Local scripts (seeding DB, lint checking, deployment prep)
├── docker-compose.yml            # Multi-container local execution setup
└── README.md                     # Main project directory guide (This file)
```

---

## 🌟 Core Project Modules
1. **Student Login:** Secure email/password and social login using Firebase Auth.
2. **Dashboard:** Unified hub showing scores, recent activities, recommended learning goals, and planner alerts.
3. **AI Learning Mentor:** Intelligent persistent mentor offering personalized learning roadmap chats, using context-aware Gemini logic.
4. **Skill Gap Analyzer:** Interactive dashboard that lets students compare their skills against industry standards.
5. **Career Recommendation Engine:** Predicts optimal career tracks based on academic history, interests, and placement scores.
6. **Learning Roadmap Generator:** Interactive graphical learning milestones with custom resources, online courses, and estimated timeline.
7. **Placement Readiness Analyzer:** Multi-dimensional score evaluator measuring resume, aptitude, core-subject knowledge, and soft-skills.
8. **Resume Feedback Analyzer:** Parses user resumes and evaluates them for target jobs, giving direct feedback to increase candidate matching scores.

---

## 💻 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- Docker & Docker Compose (Optional)
- Google Cloud Service Account with **Vertex AI User** and **Cloud Datastore User** roles.

### Run with Docker Compose (Recommended)
1. Set up a `.env` in the root folder with Gemini credentials and Firebase parameters:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   ```
2. Build and launch:
   ```bash
   docker-compose up --build
   ```
3. Access:
   - Frontend: `http://localhost:3000`
   - Backend Docs: `http://localhost:8000/docs`

---

## ☁️ Google Cloud Integration Mapping
- **Firebase Authentication:** Handles secure sign-in, token validation inside backend middleware, and user context.
- **Firestore Database:** NoSQL store mapping user metadata, career path catalogs, roadmap configurations, and progress analytics logs.
- **Cloud Storage:** Stores user-uploaded resumes (`.pdf` or `.docx`) for analysis.
- **Vertex AI & Gemini API:** Computes roadmap recommendations, parses skill gaps, and acts as the conversational backend for the AI Mentor.
- **Cloud Run:** Hosts the serverless scalable backend FastAPI Docker container.
- **Firebase Hosting:** Modern CDN hosting the static React web application.
- **BigQuery & Vertex AI Pipelines (Future SaaS ready):** Pre-built pipeline architecture for large scale user analytics and batch model retraining.
