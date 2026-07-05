import os
import json
import logging
from typing import Dict, Any, List
import google.generativeai as genai

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class GeminiService:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY", "")
        self.enabled = bool(self.api_key)
        
        if self.enabled:
            logger.info("Initializing Gemini API Client...")
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel("gemini-1.5-flash")
        else:
            logger.warning("GEMINI_API_KEY is not set. Gemini API calls will run in Mock Mode.")

    def _read_prompt_template(self, prompt_name: str) -> str:
        """Reads a system prompt file from the prompts directory."""
        try:
            # Assumes directory structure: EduVision-AI/ai/services/gemini_service.py
            # Prompts at: EduVision-AI/ai/prompts/
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            prompt_path = os.path.join(base_dir, "prompts", f"{prompt_name}_prompt.txt")
            
            if os.path.exists(prompt_path):
                with open(prompt_path, "r", encoding="utf-8") as f:
                    return f.read()
            else:
                logger.error(f"Prompt file not found at: {prompt_path}")
                return ""
        except Exception as e:
            logger.error(f"Error reading prompt template: {str(e)}")
            return ""

    def generate_chat_response(self, user_message: str, chat_history: List[Dict[str, str]] = None) -> str:
        """Acts as the conversational engine for the AI Career Mentor."""
        if not self.enabled:
            msg = user_message.lower()
            if "hello" in msg or "hi" in msg or "hey" in msg:
                return "Hello! I am your AI Career Mentor. I can help you analyze your skills, build personalized learning roadmaps, audit your resume, or answer career transition questions! What field are you interested in today?"
            elif "cloud" in msg or "aws" in msg or "gcp" in msg or "azure" in msg:
                return "Cloud engineering is a high-growth domain! I suggest establishing strong Linux, networking, and virtualization foundations, and getting a certification like Google Associate Cloud Engineer or AWS Certified Solutions Architect. Let's run a Skill Gap analysis to see what you need!"
            elif "python" in msg or "backend" in msg or "django" in msg or "fastapi" in msg:
                return "Python is excellent for backend engineering. Focus on FastAPI or Django frameworks, database management (PostgreSQL/SQL), and API design principles. What projects have you built with Python?"
            elif "frontend" in msg or "react" in msg or "vue" in msg or "javascript" in msg or "css" in msg:
                return "Frontend development is highly visual and engaging. You should master JavaScript, React, and responsive design systems like Tailwind CSS. Check out the Placement Readiness section to test your React skills!"
            elif "resume" in msg or "cv" in msg:
                return "To build an outstanding resume, emphasize quantitative metrics (e.g., 'improved page load speed by 40% using code splitting') rather than listing tasks. Let's analyze your resume alignment in the Resume Analyzer tab!"
            elif "job" in msg or "career" in msg or "placement" in msg:
                return "For successful placements, make sure your GitHub has 2-3 solid completed projects with clean READMEs, and practice technical DSA questions regularly. What job profiles are you targeting?"
            else:
                return f"That's a great question! Regarding your query about '{user_message}', to transition successfully, I suggest focusing on building hands-on projects, earning certifications, and bridging your skill gaps. Would you like me to generate a personalized learning roadmap or evaluate your skills against a specific job role?"
            
        try:
            system_prompt = self._read_prompt_template("mentor")
            full_prompt = f"{system_prompt}\n\nUser Question: {user_message}"
            
            response = self.model.generate_content(full_prompt)
            return response.text
        except Exception as e:
            logger.error(f"Gemini chat response failed: {str(e)}")
            return f"Error connecting to AI services: {str(e)}"

    def generate_personalized_roadmap(self, student_profile: Dict[str, Any], target_career: Dict[str, Any]) -> Dict[str, Any]:
        """Generates a structured learning roadmap (JSON format) to transition a student to a target career."""
        if not self.enabled:
            career_title = target_career.get("title", "Target Career")
            career_lower = career_title.lower()
            
            if "cloud" in career_lower or "devops" in career_lower:
                milestones = [
                    {
                        "phase": 1,
                        "title": "Linux & Network Foundations",
                        "duration_weeks": 4,
                        "topics_to_learn": ["Bash Scripting", "TCP/IP Basics", "Virtual Machines"],
                        "recommended_resources": [
                            {"name": "Linux Command Line Basics", "type": "Course", "provider": "Udacity"},
                            {"name": "Computer Networking", "type": "Tutorial", "provider": "Coursera"}
                        ],
                        "milestone_project": "Write a bash script to automate server resource health auditing."
                    },
                    {
                        "phase": 2,
                        "title": "Containers & Orchestration",
                        "duration_weeks": 6,
                        "topics_to_learn": ["Docker Containers", "Kubernetes Orchestration", "Microservices Architecture"],
                        "recommended_resources": [
                            {"name": "Docker & Kubernetes: The Practical Guide", "type": "Course", "provider": "Udemy"},
                            {"name": "Kubernetes Basics", "type": "Documentation", "provider": "Kubernetes.io"}
                        ],
                        "milestone_project": "Dockerize a Python FastAPI application and deploy it locally using docker-compose."
                    },
                    {
                        "phase": 3,
                        "title": "Cloud Platform Infrastructure",
                        "duration_weeks": 8,
                        "topics_to_learn": ["GCP Compute Engine", "Terraform (IaC)", "CI/CD Pipelines (GitHub Actions)"],
                        "recommended_resources": [
                            {"name": "Google Associate Cloud Engineer", "type": "Prep Course", "provider": "Pluralsight"},
                            {"name": "Terraform Up & Running", "type": "Book", "provider": "O'Reilly"}
                        ],
                        "milestone_project": "Deploy a multi-tier application to GCP using Terraform and automate deployment via GitHub Actions."
                    }
                ]
                tips = ["Get comfortable with command-line tools.", "Understand security groups and IAM permissions thoroughly."]
                duration = 6
            elif "data" in career_lower or "ai" in career_lower or "machine learning" in career_lower or "ml" in career_lower:
                milestones = [
                    {
                        "phase": 1,
                        "title": "Mathematical Foundations & Pandas",
                        "duration_weeks": 6,
                        "topics_to_learn": ["Linear Algebra", "Probability & Statistics", "Pandas & Numpy Data Wrangling"],
                        "recommended_resources": [
                            {"name": "Mathematics for Machine Learning", "type": "Specialization", "provider": "Coursera"},
                            {"name": "Python for Data Analysis", "type": "Book", "provider": "O'Reilly"}
                        ],
                        "milestone_project": "Clean and perform exploratory analysis on a dataset of 50k housing records."
                    },
                    {
                        "phase": 2,
                        "title": "Classical Machine Learning",
                        "duration_weeks": 6,
                        "topics_to_learn": ["Regression & Classification", "Scikit-Learn Framework", "Feature Engineering"],
                        "recommended_resources": [
                            {"name": "Machine Learning Zoomcamp", "type": "Bootcamp", "provider": "DataTalks.Club"},
                            {"name": "Hands-On Machine Learning", "type": "Book", "provider": "O'Reilly"}
                        ],
                        "milestone_project": "Build and evaluate a customer churn prediction model with 85%+ accuracy."
                    },
                    {
                        "phase": 3,
                        "title": "Deep Learning & Deployment",
                        "duration_weeks": 8,
                        "topics_to_learn": ["Neural Networks (Keras/PyTorch)", "MLflow Tracking", "FastAPI Model Serving"],
                        "recommended_resources": [
                            {"name": "Deep Learning Specialization", "type": "Course", "provider": "DeepLearning.AI"},
                            {"name": "Deploying Machine Learning Models", "type": "Tutorial", "provider": "Medium"}
                        ],
                        "milestone_project": "Train an image classifier and serve predictions via a FastAPI backend hosted on Render/HuggingFace."
                    }
                ]
                tips = ["Don't skip the underlying math.", "Focus heavily on validation strategies (cross-validation, target leakage)."]
                duration = 8
            else:
                milestones = [
                    {
                        "phase": 1,
                        "title": "Programming & Development Setup",
                        "duration_weeks": 4,
                        "topics_to_learn": ["Language syntax", "Git & GitHub version control", "IDE setup"],
                        "recommended_resources": [
                            {"name": "Programming Fundamentals", "type": "Course", "provider": "freeCodeCamp"}
                        ],
                        "milestone_project": "Build a command-line utility application."
                    },
                    {
                        "phase": 2,
                        "title": "Core Specialization Skills",
                        "duration_weeks": 6,
                        "topics_to_learn": [f"Core methodologies for {career_title}", "Design patterns", "API consumption"],
                        "recommended_resources": [
                            {"name": f"Advanced {career_title} Guide", "type": "Tutorial", "provider": "W3Schools"}
                        ],
                        "milestone_project": "Create a fully functional prototype implementing core specializations."
                    }
                ]
                tips = ["Build real projects, don't just watch videos.", "Read documentation instead of relying on tutorials."]
                duration = 5
            
            return {
                "target_career": career_title,
                "estimated_completion_months": duration,
                "milestones": milestones,
                "learning_tips": tips
            }

        try:
            system_prompt = self._read_prompt_template("roadmap")
            prompt_content = f"{system_prompt}\n\nStudent Profile: {json.dumps(student_profile)}\nTarget Career Path: {json.dumps(target_career)}"
            
            response = self.model.generate_content(prompt_content)
            clean_text = response.text.replace("```json", "").replace("```", "").strip()
            return json.loads(clean_text)
        except Exception as e:
            logger.error(f"Failed to generate custom roadmap: {str(e)}")
            return {"error": "Failed to synthesize roadmap", "details": str(e)}

    def analyze_skill_gap(self, student_skills: Dict[str, int], target_skills: Dict[str, int]) -> Dict[str, Any]:
        """Performs structured skill gap evaluation."""
        if not self.enabled:
            analysis_list = []
            total_gap_value = 0
            max_gap_value = 0
            
            for skill, required in target_skills.items():
                student_val = student_skills.get(skill, 0)
                gap = required - student_val
                max_gap_value += required
                
                if gap > 0:
                    total_gap_value += gap
                    status = "Needs Improvement" if student_val > 0 else "Critical Gap"
                    action = f"Improve score from {student_val} to {required}. Practice building projects using {skill}."
                else:
                    status = "Proficient"
                    action = f"Already meets requirements ({student_val}/{required}). Focus on teaching others or advanced architecture."
                
                analysis_list.append({
                    "skill_name": skill,
                    "student_rating": student_val,
                    "required_rating": required,
                    "gap": max(0, gap),
                    "status": status,
                    "action_item": action
                })
            
            overall_pct = round((total_gap_value / max(1, max_gap_value)) * 100, 1)
            
            recs = []
            if overall_pct > 60:
                recs.append("Prioritize core foundation topics first before moving to specialized cloud tooling.")
            elif overall_pct > 30:
                recs.append("Build a portfolio project that integrates at least 3 of your gap skills simultaneously.")
            else:
                recs.append("You are in a great position! Standardize your knowledge with industry certifications.")
                
            return {
                "overall_gap_percentage": overall_pct,
                "skills_analysis": analysis_list,
                "strategic_recommendations": recs
            }

        try:
            system_prompt = self._read_prompt_template("skill_gap")
            prompt_content = f"{system_prompt}\n\nStudent Skills: {json.dumps(student_skills)}\nTarget Career Required Skills: {json.dumps(target_skills)}"
            
            response = self.model.generate_content(prompt_content)
            clean_text = response.text.replace("```json", "").replace("```", "").strip()
            return json.loads(clean_text)
        except Exception as e:
            logger.error(f"Failed to compute skill gap: {str(e)}")
            return {"error": "Failed to synthesize skill gap analysis", "details": str(e)}
            
    def analyze_resume_alignment(self, resume_text: str, target_career: Dict[str, Any]) -> Dict[str, Any]:
        """Evaluates resume alignment and returns scoring + action items."""
        if not self.enabled:
            career_title = target_career.get("title", "Target Career")
            required_skills = target_career.get("required_skills", {})
            resume_lower = resume_text.lower()
            
            found = []
            missing = []
            
            for skill in required_skills.keys():
                if skill.lower() in resume_lower:
                    found.append(skill)
                else:
                    missing.append(skill)
            
            base_score = 40.0
            if required_skills:
                match_pct = len(found) / len(required_skills)
                score = round(base_score + (match_pct * 50.0), 1)
            else:
                score = 75.0
                
            action_items = []
            for m in missing[:3]:
                action_items.append(f"Add a project detailing your experience with {m} to resolve validation gaps.")
                
            if "metric" not in resume_lower and "%" not in resume_lower:
                action_items.append("Quantify your accomplishments (e.g. 'Improved efficiency by 25%').")
            
            return {
                "alignment_score": score,
                "identified_keywords": found,
                "missing_critical_keywords": missing,
                "feedback_sections": {
                    "formatting": "The layout is clean, but ensure it is ATS-optimized (no multiple columns or complex tables).",
                    "experience_and_projects": "Expand on your project sections. Use the STAR methodology (Situation, Task, Action, Result) to format descriptions.",
                    "skills_alignment": f"Your resume matches {len(found)} out of {len(required_skills)} key competencies required for a {career_title} role."
                },
                "recommended_action_items": action_items if action_items else ["Your resume looks exceptional for this profile!"]
            }

