# AI Module Configuration & Prompt Engineering

This module hosts the core Artificial Intelligence resources used to support decision intelligence inside the platform. It integrates directly with the **Google Gemini API** (and is structured to be Vertex AI ready for enterprise deployment).

## Directory Structure
- `prompts/`: Contains plaintext System Prompts used by the AI engine. Separation of code and prompts allows prompt-tuning without changing server configurations.
  - `mentor_prompt.txt`: Prompts the AI to act as a career advisor.
  - `roadmap_prompt.txt`: Standardizes JSON outputs for customized learning path timeline generation.
  - `skill_gap_prompt.txt`: Instructs the agent to compute standard deviations between user skill ratings and benchmark expectations.
  - `resume_prompt.txt`: Handles keyword verification and resume formatting critique.
- `services/`: Contains python backend SDK integration classes.
  - `gemini_service.py`: Standard class initialized with API configurations. Includes fail-safes and local mock mode if a Google Cloud project or environment variables are missing, making the local project immediately runnable.

## Google Cloud Vertex AI Upgrade
To transition from the developer-level Gemini API to enterprise **Vertex AI SDK**:
1. Replace `import google.generativeai as genai` with `from google.cloud import aiplatform` and `from vertexai.generative_models import GenerativeModel`.
2. Initialize with your GCP Project ID:
   ```python
   import vertexai
   vertexai.init(project="your-project-id", location="us-central1")
   model = GenerativeModel("gemini-1.5-flash")
   ```
This provides audit logs, VPC security, encryption with CMEK, and deployment under IAM service accounts.
