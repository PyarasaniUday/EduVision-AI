const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const getHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    headers["Authorization"] = `Bearer ${user.token}`;
  }
  return headers;
};

// Client-side static mock datasets
const MOCK_STUDENTS = [
  {
    "student_id": "stud_001",
    "name": "Alex Mercer",
    "email": "alex.mercer@edu.vision",
    "academic_details": {
      "major": "Computer Science",
      "gpa": 3.8,
      "year_of_study": 3,
      "completed_courses": [
        "Data Structures & Algorithms",
        "Introduction to Database Systems",
        "Linear Algebra",
        "Software Engineering Principles"
      ]
    },
    "skills": {
      "Python": 4,
      "SQL": 3,
      "React": 2,
      "Git": 3,
      "Data Communication": 2
    },
    "interests": [
      "Machine Learning",
      "Data Analysis",
      "Full-Stack Development"
    ],
    "career_goals": [
      "Data Scientist",
      "Machine Learning Engineer"
    ],
    "assessments": {
      "aptitude_score": 85,
      "technical_score": 82,
      "soft_skills_score": 78
    },
    "resume_url": ""
  }
];

const MOCK_CAREERS = {
  "car_ml_eng": {
    title: "Machine Learning Engineer",
    required_skills: {
      "Python": 5,
      "Machine Learning": 4,
      "Deep Learning": 4,
      "SQL": 3,
      "Cloud Foundations (Vertex AI/GCP)": 3
    }
  },
  "car_cloud_arch": {
    title: "Cloud Solutions Architect",
    required_skills: {
      "Cloud Architectures (GCP/AWS)": 4,
      "Python": 3,
      "Docker": 3,
      "SQL": 2
    }
  },
  "car_frontend_dev": {
    title: "Frontend Software Engineer",
    required_skills: {
      "JavaScript": 4,
      "React": 4,
      "CSS/Tailwind": 4,
      "Git": 3
    }
  }
};

// 1. Fetch student profile
export const fetchStudentProfile = async (studentId) => {
  try {
    const res = await fetch(`${API_URL}/api/student/${studentId}`, {
      headers: getHeaders(),
    });
    if (res.ok) return await res.json();
  } catch (error) {
    console.warn("[API Fallback] Server offline, loading client-side mock profile:", error);
  }

  // Fallback
  const student = MOCK_STUDENTS.find(s => s.student_id === studentId) || MOCK_STUDENTS[0];
  return student;
};

// 2. Chat with career mentor
export const chatWithMentor = async (message, studentId) => {
  try {
    const res = await fetch(`${API_URL}/api/mentor/chat`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ message, student_id: studentId }),
    });
    if (res.ok) return await res.json();
  } catch (error) {
    console.warn("[API Fallback] Server offline, running client-side AI simulator:", error);
  }

  // Fallback chat logic
  const msg = message.toLowerCase();
  let reply = "";
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    reply = "Hello! I am your AI Career Mentor. I can help you analyze your skills, build personalized learning roadmaps, audit your resume, or answer career transition questions! What field are you interested in today?";
  } else if (msg.includes("cloud") || msg.includes("aws") || msg.includes("gcp") || msg.includes("azure")) {
    reply = "Cloud engineering is a high-growth domain! I suggest establishing strong Linux, networking, and virtualization foundations, and getting a certification like Google Associate Cloud Engineer or AWS Certified Solutions Architect. Let's run a Skill Gap analysis to see what you need!";
  } else if (msg.includes("python") || msg.includes("backend") || msg.includes("django") || msg.includes("fastapi")) {
    reply = "Python is excellent for backend engineering. Focus on FastAPI or Django frameworks, database management (PostgreSQL/SQL), and API design principles. What projects have you built with Python?";
  } else if (msg.includes("frontend") || msg.includes("react") || msg.includes("vue") || msg.includes("javascript") || msg.includes("css")) {
    reply = "Frontend development is highly visual and engaging. You should master JavaScript, React, and responsive design systems like Tailwind CSS. Check out the Placement Readiness section to test your React skills!";
  } else if (msg.includes("resume") || msg.includes("cv")) {
    reply = "To build an outstanding resume, emphasize quantitative metrics (e.g., 'improved page load speed by 40% using code splitting') rather than listing tasks. Let's analyze your resume alignment in the Resume Analyzer tab!";
  } else if (msg.includes("job") || msg.includes("career") || msg.includes("placement")) {
    reply = "For successful placements, make sure your GitHub has 2-3 solid completed projects with clean READMEs, and practice technical DSA questions regularly. What job profiles are you targeting?";
  } else {
    reply = `That's a great question! Regarding your query about "${message}", to transition successfully, I suggest focusing on building hands-on projects, earning certifications, and bridging your skill gaps. Would you like me to generate a personalized learning roadmap or evaluate your skills against a specific job role?`;
  }

  return { reply, timestamp: new Date().toISOString() };
};

// 3. Generate Roadmap
export const generateRoadmap = async (studentId, targetCareerId) => {
  try {
    const res = await fetch(`${API_URL}/api/roadmap/generate`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ student_id: studentId, target_career_id: targetCareerId }),
    });
    if (res.ok) return await res.json();
  } catch (error) {
    console.warn("[API Fallback] Server offline, generating client-side roadmap:", error);
  }

  // Fallback Roadmap generation
  const career = MOCK_CAREERS[targetCareerId] || MOCK_CAREERS["car_ml_eng"];
  const careerTitle = career.title;
  const careerLower = careerTitle.toLowerCase();
  
  let milestones = [];
  let tips = [];
  let duration = 6;

  if (careerLower.includes("cloud")) {
    milestones = [
      {
        phase: 1,
        title: "Linux & Network Foundations",
        duration_weeks: 4,
        topics_to_learn: ["Bash Scripting", "TCP/IP Basics", "Virtual Machines"],
        recommended_resources: [
          { name: "Linux Command Line Basics", type: "Course", provider: "Udacity" },
          { name: "Computer Networking", type: "Tutorial", provider: "Coursera" }
        ],
        milestone_project: "Write a bash script to automate server resource health auditing."
      },
      {
        phase: 2,
        title: "Containers & Orchestration",
        duration_weeks: 6,
        topics_to_learn: ["Docker Containers", "Kubernetes Orchestration", "Microservices Architecture"],
        recommended_resources: [
          { name: "Docker & Kubernetes: The Practical Guide", type: "Course", provider: "Udemy" },
          { name: "Kubernetes Basics", type: "Documentation", provider: "Kubernetes.io" }
        ],
        milestone_project: "Dockerize a Python FastAPI application and deploy it locally using docker-compose."
      },
      {
        phase: 3,
        title: "Cloud Platform Infrastructure",
        duration_weeks: 8,
        topics_to_learn: ["GCP Compute Engine", "Terraform (IaC)", "CI/CD Pipelines (GitHub Actions)"],
        recommended_resources: [
          { name: "Google Associate Cloud Engineer", type: "Prep Course", provider: "Pluralsight" },
          { name: "Terraform Up & Running", type: "Book", provider: "O'Reilly" }
        ],
        milestone_project: "Deploy a multi-tier application to GCP using Terraform and automate deployment via GitHub Actions."
      }
    ];
    tips = ["Get comfortable with command-line tools.", "Understand security groups and IAM permissions thoroughly."];
    duration = 6;
  } else if (careerLower.includes("data") || careerLower.includes("machine") || careerLower.includes("ml")) {
    milestones = [
      {
        phase: 1,
        title: "Mathematical Foundations & Pandas",
        duration_weeks: 6,
        topics_to_learn: ["Linear Algebra", "Probability & Statistics", "Pandas & Numpy Data Wrangling"],
        recommended_resources: [
          { name: "Mathematics for Machine Learning", type: "Specialization", provider: "Coursera" },
          { name: "Python for Data Analysis", type: "Book", provider: "O'Reilly" }
        ],
        milestone_project: "Clean and perform exploratory analysis on a dataset of 50k housing records."
      },
      {
        phase: 2,
        title: "Classical Machine Learning",
        duration_weeks: 6,
        topics_to_learn: ["Regression & Classification", "Scikit-Learn Framework", "Feature Engineering"],
        recommended_resources: [
          { name: "Machine Learning Zoomcamp", type: "Bootcamp", provider: "DataTalks.Club" },
          { name: "Hands-On Machine Learning", type: "Book", provider: "O'Reilly" }
        ],
        milestone_project: "Build and evaluate a customer churn prediction model with 85%+ accuracy."
      },
      {
        phase: 3,
        title: "Deep Learning & Deployment",
        duration_weeks: 8,
        topics_to_learn: ["Neural Networks (Keras/PyTorch)", "MLflow Tracking", "FastAPI Model Serving"],
        recommended_resources: [
          { name: "Deep Learning Specialization", type: "Course", provider: "DeepLearning.AI" },
          { name: "Deploying Machine Learning Models", type: "Tutorial", provider: "Medium" }
        ],
        milestone_project: "Train an image classifier and serve predictions via a FastAPI backend hosted on Render/HuggingFace."
      }
    ];
    tips = ["Don't skip the underlying math.", "Focus heavily on validation strategies (cross-validation, target leakage)."];
    duration = 8;
  } else {
    milestones = [
      {
        phase: 1,
        title: "HTML, CSS & JavaScript Core",
        duration_weeks: 4,
        topics_to_learn: ["ES6 Syntax", "DOM Manipulation", "CSS Grid & Flexbox"],
        recommended_resources: [
          { name: "JavaScript - The Complete Guide", type: "Course", provider: "Udemy" }
        ],
        milestone_project: "Build a highly responsive landing page using modern layout design systems."
      },
      {
        phase: 2,
        title: "React Framework Mastery",
        duration_weeks: 6,
        topics_to_learn: ["React State Management", "Routing (React Router)", "API Consumption"],
        recommended_resources: [
          { name: "React documentation", type: "Docs", provider: "react.dev" }
        ],
        milestone_project: "Create a fully styled personal dashboard connecting to mock user databases."
      }
    ];
    tips = ["Build real projects, don't just watch videos.", "Read documentation instead of relying on tutorials."];
    duration = 5;
  }

  return {
    target_career: careerTitle,
    estimated_completion_months: duration,
    milestones: milestones,
    learning_tips: tips,
    student_id: studentId,
    career_id: targetCareerId,
    created_at: new Date().toISOString()
  };
};

// 4. Analyze Skill Gap
export const analyzeSkillGap = async (studentId, targetCareerId) => {
  try {
    const res = await fetch(`${API_URL}/api/skillgap/analyze`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ student_id: studentId, target_career_id: targetCareerId }),
    });
    if (res.ok) return await res.json();
  } catch (error) {
    console.warn("[API Fallback] Server offline, calculating client-side skill gap:", error);
  }

  // Fallback Skill Gap logic
  const student = MOCK_STUDENTS.find(s => s.student_id === studentId) || MOCK_STUDENTS[0];
  const career = MOCK_CAREERS[targetCareerId] || MOCK_CAREERS["car_ml_eng"];
  
  const studentSkills = student.skills || {};
  const careerSkills = career.required_skills || {};
  
  const analysisList = [];
  let totalGapValue = 0;
  let maxGapValue = 0;
  
  for (const [skill, required] of Object.entries(careerSkills)) {
    const studentVal = studentSkills[skill] || 0;
    const gap = required - studentVal;
    maxGapValue += required;
    
    let status = "Proficient";
    let action = `Already meets requirements (${studentVal}/${required}). Focus on teaching others or advanced architecture.`;
    
    if (gap > 0) {
      totalGapValue += gap;
      status = studentVal > 0 ? "Needs Improvement" : "Critical Gap";
      action = `Improve score from ${studentVal} to ${required}. Practice building projects using ${skill}.`;
    }
    
    analysisList.push({
      skill_name: skill,
      student_rating: studentVal,
      required_rating: required,
      gap: Math.max(0, gap),
      status: status,
      action_item: action
    });
  }
  
  const overallPct = Math.round((totalGapValue / Math.max(1, maxGapValue)) * 100);
  
  const recs = [];
  if (overallPct > 60) {
    recs.push("Prioritize core foundation topics first before moving to specialized cloud tooling.");
  } else if (overallPct > 30) {
    recs.push("Build a portfolio project that integrates at least 3 of your gap skills simultaneously.");
  } else {
    recs.push("You are in a great position! Standardize your knowledge with industry certifications.");
  }
  
  return {
    overall_gap_percentage: overallPct,
    skills_analysis: analysisList,
    strategic_recommendations: recs,
    created_at: new Date().toISOString()
  };
};

// 5. Analyze Resume
export const analyzeResume = async (studentId, targetCareerId, resumeText) => {
  try {
    const res = await fetch(`${API_URL}/api/resume/analyze`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ student_id: studentId, target_career_id: targetCareerId, resume_text: resumeText }),
    });
    if (res.ok) return await res.json();
  } catch (error) {
    console.warn("[API Fallback] Server offline, analyzing resume client-side:", error);
  }

  // Fallback Resume Analysis
  const career = MOCK_CAREERS[targetCareerId] || MOCK_CAREERS["car_ml_eng"];
  const careerTitle = career.title;
  const requiredSkills = career.required_skills || {};
  const resumeLower = (resumeText || "").toLowerCase();
  
  const found = [];
  const missing = [];
  
  for (const skill of Object.keys(requiredSkills)) {
    if (resumeLower.includes(skill.toLowerCase())) {
      found.push(skill);
    } else {
      missing.push(skill);
    }
  }
  
  const baseScore = 40.0;
  let score = 75.0;
  if (Object.keys(requiredSkills).length > 0) {
    const matchPct = found.length / Object.keys(requiredSkills).length;
    score = Math.round(baseScore + (matchPct * 50.0));
  }
  
  const actionItems = [];
  for (const m of missing.slice(0, 3)) {
    actionItems.push(`Add a project detailing your experience with ${m} to resolve validation gaps.`);
  }
  if (!resumeLower.includes("metric") && !resumeLower.includes("%")) {
    actionItems.push("Quantify your accomplishments (e.g. 'Improved efficiency by 25%').");
  }
  
  return {
    alignment_score: score,
    identified_keywords: found,
    missing_critical_keywords: missing,
    feedback_sections: {
      formatting: "The layout is clean, but ensure it is ATS-optimized (no multiple columns or complex tables).",
      experience_and_projects: "Expand on your project sections. Use the STAR methodology (Situation, Task, Action, Result) to format descriptions.",
      skills_alignment: `Your resume matches ${found.length} out of ${Object.keys(requiredSkills).length} key competencies required for a ${careerTitle} role.`
    },
    recommended_action_items: actionItems.length > 0 ? actionItems : ["Your resume looks exceptional for this profile!"],
    created_at: new Date().toISOString()
  };
};
