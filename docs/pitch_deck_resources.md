# EduVision AI - Hackathon Pitch Deck & Demo Resources

This document compiles structural recommendations, slide outlines, key metrics, and demo coordinates to support your presentation before the Google Cloud Gen AI Academy Hackathon judges.

---

## 📽️ Pitch Slide Structure (10-Slide Framework)

### Slide 1: Title & Hook
- **Title:** EduVision AI
- **Subtitle:** AI-Powered Decision Intelligence Platform for Education & Lifelong Learning
- **Visual:** Enterprise Architecture Diagram (refer: [docs/architecture/architecture_diagram.png](file:///c:/Users/UDAY%20KUMAR/OneDrive/Desktop/Hack2skill/EduVision-AI/docs/architecture/architecture_diagram.png))

### Slide 2: The Core Problem
- **Problem Statement:** Students lack direct, personalized learning guidance. Career advice is scattered, leading to bad educational investment choices and high student dropout rates.
- **Pain Point:** Current platforms only offer information search (chatbots) rather than **Decision Intelligence** (predictive recommendations).

### Slide 3: Our Solution
- **Value Proposition:** A unified portal bridging student capabilities and industry demand using Vertex AI & Gemini.
- **Differentiators:**
  - Dynamic radar maps mapping skills.
  - Phased, project-driven learning roadmaps.
  - Real-time placement readiness forecasting.

### Slide 4: Underlying Magic (Google Cloud Tech Stack)
- **Frontend Hosting:** Firebase Hosting (SPA CDN)
- **Backend API Server:** Cloud Run (Docker, auto-scaling, serverless)
- **Database:** Cloud Firestore (NoSQL, real-time sync)
- **AI Core:** Gemini 1.5 Flash (via Vertex AI endpoints)
- **Secured Authentication:** Firebase Auth

### Slide 5: Product Walkthrough & Demo Flow
1. **Dashboard Hub:** View student profile progress.
2. **AI Career Mentor:** Real-time advice query.
3. **Roadmap Generator:** Interactive path construction.
4. **Placement Readiness:** Paste resume text and receive alignment scores.

### Slide 6: Business Model & Scalability
- **SaaS Strategy:** Enterprise B2B subscription model for Universities (with Admin & Teacher dashboard extensions).
- **Consumer Segment:** B2C freemium tier for lifelong learners.

### Slide 7: Technical Scalability Roadmap
- **Step 1:** Vertex AI Pipeline integration to perform scheduled model training on student engagement profiles.
- **Step 2:** BigQuery analytics to enable placement officers to query trends.

### Slide 8: The Team
- Full Stack AI Engineers & Cloud Solution Architects.

---

## 📊 Key Pitch Metrics to Highlight
- **Fast Development Cycle:** Complete dockerized development framework built in less than 48 hours.
- **Latency Optimization:** Real-time data pipeline. API responses under 1.2s utilizing Gemini 1.5 Flash.
- **Data Completeness:** Includes structured career benchmarks and knowledge catalog profiles in static databases.
