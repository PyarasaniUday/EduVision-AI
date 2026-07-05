import React from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Star, ShieldAlert, Award, Calendar } from 'lucide-react';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const PlacementReadinessWidget = ({ score }) => {
  const getFeedbackMessage = (val) => {
    if (val >= 85) return { text: "Outstanding Readiness", color: "text-google-green" };
    if (val >= 70) return { text: "Strong Candidate", color: "text-google-blue" };
    return { text: "Needs Action Plan", color: "text-google-red" };
  };

  const feedback = getFeedbackMessage(score);

  return (
    <div className="glass-panel rounded-2xl p-6 hover-glow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-slate-200">Placement Readiness Score</h3>
        <Award className="w-6 h-6 text-google-blue" />
      </div>
      <div className="flex items-baseline space-x-2">
        <span className="text-5xl font-bold tracking-tight text-white">{score}</span>
        <span className="text-lg text-slate-400">/ 100</span>
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <Star className="w-5 h-5 fill-current text-google-yellow" />
        <span className={`text-sm font-semibold ${feedback.color}`}>{feedback.text}</span>
      </div>
      <p className="mt-2 text-xs text-slate-400">
        Calculated from core programming aptitude, backend frameworks proficiency, soft skills, and resume alignment score.
      </p>
    </div>
  );
};

export const SkillRadarChart = ({ studentSkills, careerSkills }) => {
  const labels = Object.keys(careerSkills);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'My Skills',
        data: labels.map(l => studentSkills[l] || 0),
        backgroundColor: 'rgba(26, 115, 232, 0.2)',
        borderColor: 'rgba(26, 115, 232, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(26, 115, 232, 1)',
      },
      {
        label: 'Required Skills',
        data: labels.map(l => careerSkills[l] || 0),
        backgroundColor: 'rgba(234, 67, 53, 0.1)',
        borderColor: 'rgba(234, 67, 53, 0.7)',
        borderWidth: 1.5,
        borderDash: [5, 5],
        pointBackgroundColor: 'rgba(234, 67, 53, 1)',
      }
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: { color: '#94a3b8', font: { size: 11, family: 'Inter' } },
        ticks: { backdropColor: 'transparent', color: '#64748b', stepSize: 1, max: 5 },
        suggestedMin: 0,
        suggestedMax: 5
      }
    },
    plugins: {
      legend: { labels: { color: '#e2e8f0', font: { family: 'Inter' } } }
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 h-full flex flex-col justify-between">
      <h3 className="text-lg font-semibold text-slate-200 mb-4">Competency Map (VS Target Job)</h3>
      <div className="w-full max-h-64 flex justify-center items-center">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

export const RoadmapMilestonesSummary = ({ milestones }) => {
  return (
    <div className="glass-panel rounded-2xl p-6 hover-glow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-slate-200">Current Career Roadmap Path</h3>
        <Calendar className="w-6 h-6 text-google-yellow" />
      </div>
      <div className="space-y-4">
        {milestones.slice(0, 3).map((m, idx) => (
          <div key={idx} className="flex space-x-3 items-start">
            <div className="flex flex-col items-center">
              <span className="w-6 h-6 rounded-full glass-card flex items-center justify-center text-xs font-semibold text-google-yellow border border-slate-600">
                {idx + 1}
              </span>
              {idx < 2 && <div className="w-0.5 h-12 bg-slate-700 mt-1"></div>}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-100">{m.title}</h4>
              <p className="text-xs text-slate-400 mt-1">{m.duration_weeks} weeks • {m.topics_to_learn.join(', ')}</p>
              <div className="mt-2 text-xs font-medium text-google-blue">Proj: {m.milestone_project}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
