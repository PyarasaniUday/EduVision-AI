import React, { useEffect, useState } from 'react';
import { fetchStudentProfile } from '../services/api';
import { PlacementReadinessWidget, RoadmapMilestonesSummary, SkillRadarChart } from '../components/DashboardWidgets';
import { GraduationCap, Briefcase, BookOpen, User, Flame } from 'lucide-react';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Target Career profile details (Normally retrieved from Firestore careers database)
  const targetCareer = {
    title: "Machine Learning Engineer",
    required_skills: {
      "Python": 5,
      "Machine Learning": 4,
      "Deep Learning": 4,
      "SQL": 3,
      "Cloud Foundations (Vertex AI/GCP)": 3
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchStudentProfile('stud_001');
        setProfile(res);
      } catch (err) {
        setError(err.message || 'Error loading dashboard');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-400">Loading student dashboard...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  // Static mock roadmap phases for visualization on Dashboard summary
  const mockMilestones = [
    { title: "Mathematics for ML & Core Python", duration_weeks: 4, topics_to_learn: ["Linear Algebra", "OOP Python"], milestone_project: "Matrix library" },
    { title: "Supervised Learning & Data Engineering", duration_weeks: 6, topics_to_learn: ["SciKit-Learn", "SQL"], milestone_project: "House pricing model" },
    { title: "Deep Learning & Cloud Architectures", duration_weeks: 8, topics_to_learn: ["TensorFlow", "GCP Vertex AI"], milestone_project: "Image classifier on Cloud Run" }
  ];

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back, {profile.name}</h1>
          <p className="text-slate-400 mt-1">Here is your current career transition status and learning path analysis.</p>
        </div>
        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl">
          <Flame className="w-5 h-5 text-google-yellow fill-current" />
          <span className="text-sm font-semibold text-slate-200">5 Day Learning Streak!</span>
        </div>
      </div>

      {/* Profile quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-2xl p-6 flex items-center space-x-4">
          <div className="p-4 bg-google-blue/10 rounded-xl text-google-blue">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Current Academic Level</p>
            <h4 className="text-lg font-bold text-white mt-0.5">{profile.academic_details.major} (Yr {profile.academic_details.year_of_study})</h4>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex items-center space-x-4">
          <div className="p-4 bg-google-green/10 rounded-xl text-google-green">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Completed Subjects</p>
            <h4 className="text-lg font-bold text-white mt-0.5">{profile.academic_details.completed_courses.length} Core Courses</h4>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex items-center space-x-4">
          <div className="p-4 bg-google-yellow/10 rounded-xl text-google-yellow">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Primary Career Target</p>
            <h4 className="text-lg font-bold text-white mt-0.5">{targetCareer.title}</h4>
          </div>
        </div>
      </div>

      {/* Grid containing Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <PlacementReadinessWidget score={profile.assessments?.technical_score || 82} />
          <RoadmapMilestonesSummary milestones={mockMilestones} />
        </div>
        
        <div className="lg:col-span-2">
          <SkillRadarChart studentSkills={profile.skills} careerSkills={targetCareer.required_skills} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
