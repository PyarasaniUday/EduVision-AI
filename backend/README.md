# Backend - FastAPI API Engine

This directory houses the backend REST server for EduVision AI. It handles calculations, queries the databases, manages file payloads, and formats context templates before requesting prompt reasoning from Gemini.

## Tech Stack
- **FastAPI**: Modern, lightweight, high-performance web framework.
- **Firebase Admin SDK**: For interacting with Cloud Firestore and Firebase Auth tokens.
- **Pydantic V2**: For standard data schema modeling and request validation.
- **Gunicorn / Uvicorn**: Direct ASGI production server bindings.

## API Endpoints List
- `GET /`: API entry status check.
- `GET /api/health`: Cloud health checks (used by Cloud Run load balancer).
- `GET /api/student/{student_id}`: Returns the profile data for a specific student.
- `POST /api/student/{student_id}`: Overwrites or merges student profile configurations.
- `POST /api/mentor/chat`: Relays conversations to the Gemini-powered Career Mentor.
- `POST /api/roadmap/generate`: Invokes the decision intelligence engine to synthesize a learning roadmap JSON.
- `POST /api/skillgap/analyze`: Computes skill deficits against a target job profile.
- `POST /api/resume/analyze`: Parses upload text data to benchmark against job description keywords.

## Quickstart Local Development
1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set your environment variables in `.env`.
4. Run locally:
   ```bash
   python app/main.py
   ```
   Open `http://localhost:8000/docs` to test via Swagger UI.

## Cloud Deployment (Google Cloud Run)
The app is fully Dockerized. To deploy to GCP Cloud Run:
```bash
gcloud builds submit --tag gcr.io/your-project-id/eduvision-backend
gcloud run deploy eduvision-backend \
    --image gcr.io/your-project-id/eduvision-backend \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --set-env-vars GEMINI_API_KEY=your_key_here
```
