# API Documentation - FastAPI Endpoint Details

The EduVision AI backend API coordinates data lookups, processes request validations, and generates structured prompts for the Gemini model.

---

## 🔒 Security Middleware
All private endpoints expect an authorization header with a Firebase Authentication ID token:
```http
Authorization: Bearer <FIREBASE_ID_TOKEN>
```
If Firebase config is running in developer mock mode, any mock header token passes validation automatically.

---

## 📡 Endpoints Specification

### 1. Student Profile
Fetch or overwrite details about student academic paths and skills.

#### `GET /api/student/{student_id}`
- **Response:** `200 OK`
  ```json
  {
    "student_id": "stud_001",
    "name": "Alex Mercer",
    "email": "alex.mercer@edu.vision",
    "academic_details": {
      "major": "Computer Science",
      "gpa": 3.8,
      "year_of_study": 3,
      "completed_courses": ["Data Structures", "Databases"]
    },
    "skills": { "Python": 4, "SQL": 3 },
    "interests": ["Machine Learning"],
    "career_goals": ["Data Scientist"]
  }
  ```

#### `POST /api/student/{student_id}`
- **Request Body:** Complete `StudentProfile` JSON.
- **Response:** `{"status": "success", "message": "Profile updated"}`

---

### 2. AI Career Mentor
Submit user conversations to the chat mentor system.

#### `POST /api/mentor/chat`
- **Request Body:**
  ```json
  {
    "message": "Which certification is best to learn GCP?",
    "student_id": "stud_001"
  }
  ```
- **Response:**
  ```json
  {
    "reply": "I highly recommend starting with the Google Cloud Associate Cloud Engineer (ACE)...",
    "timestamp": "2026-07-04T11:00:00Z"
  }
  ```

---

### 3. Roadmap Generator
Generate a phased roadmap timeline.

#### `POST /api/roadmap/generate`
- **Request Body:**
  ```json
  {
    "student_id": "stud_001",
    "target_career_id": "car_ml_eng"
  }
  ```
- **Response:**
  ```json
  {
    "target_career": "Machine Learning Engineer",
    "estimated_completion_months": 6,
    "milestones": [
      {
        "phase": 1,
        "title": "Mathematical Foundations",
        "duration_weeks": 4,
        "topics_to_learn": ["Linear Algebra", "Calculus"],
        "recommended_resources": [
          { "name": "Linear Algebra for ML", "type": "Course", "provider": "Coursera" }
        ],
        "milestone_project": "Write a matrix transposer in Python without external libraries"
      }
    ],
    "learning_tips": ["Review calculus rules daily."]
  }
  ```

---

### 4. Skill Gap Analyzer
Compare current skills against standard role profiles.

#### `POST /api/skillgap/analyze`
- **Request Body:**
  ```json
  {
    "student_id": "stud_001",
    "target_career_id": "car_ml_eng"
  }
  ```
- **Response:**
  ```json
  {
    "overall_gap_percentage": 35.0,
    "skills_analysis": [
      {
        "skill_name": "Python",
        "student_rating": 3,
        "required_rating": 5,
        "gap": 2,
        "status": "Needs Improvement",
        "action_item": "Practice coding scripts."
      }
    ],
    "strategic_recommendations": ["Focus on programming before frameworks."]
  }
  ```

---

### 5. Resume Feedback Analyzer
Compute alignment scores and extract suggestions from resume text.

#### `POST /api/resume/analyze`
- **Request Body:**
  ```json
  {
    "student_id": "stud_001",
    "target_career_id": "car_ml_eng",
    "resume_text": "Experienced Python developer, built databases..."
  }
  ```
- **Response:**
  ```json
  {
    "alignment_score": 75.0,
    "identified_keywords": ["Python", "SQL"],
    "missing_critical_keywords": ["FastAPI", "Docker"],
    "feedback_sections": {
      "formatting": "Clean layout, use bullet points.",
      "experience_and_projects": "Add concrete metrics.",
      "skills_alignment": "Demonstrate DevOps tools exposure."
    },
    "recommended_action_items": ["Learn container orchestration."]
  }
  ```
