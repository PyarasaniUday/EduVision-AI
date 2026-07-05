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

export const fetchStudentProfile = async (studentId) => {
  const res = await fetch(`${API_URL}/api/student/${studentId}`, {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to load student profile");
  return res.json();
};

export const chatWithMentor = async (message, studentId) => {
  const res = await fetch(`${API_URL}/api/mentor/chat`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ message, student_id: studentId }),
  });
  if (!res.ok) throw new Error("Failed to chat with mentor");
  return res.json();
};

export const generateRoadmap = async (studentId, targetCareerId) => {
  const res = await fetch(`${API_URL}/api/roadmap/generate`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ student_id: studentId, target_career_id: targetCareerId }),
  });
  if (!res.ok) throw new Error("Failed to generate career roadmap");
  return res.json();
};

export const analyzeSkillGap = async (studentId, targetCareerId) => {
  const res = await fetch(`${API_URL}/api/skillgap/analyze`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ student_id: studentId, target_career_id: targetCareerId }),
  });
  if (!res.ok) throw new Error("Failed to compute skill gap analysis");
  return res.json();
};

export const analyzeResume = async (studentId, targetCareerId, resumeText) => {
  const res = await fetch(`${API_URL}/api/resume/analyze`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ student_id: studentId, target_career_id: targetCareerId, resume_text: resumeText }),
  });
  if (!res.ok) throw new Error("Failed to analyze resume alignment");
  return res.json();
};
