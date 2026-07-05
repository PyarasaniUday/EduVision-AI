import React, { useState } from 'react';
import { generateRoadmap } from '../services/api';
import { Compass, GraduationCap, Link2, RefreshCw, Calendar } from 'lucide-react';

const Roadmap = () => {
  const [targetCareer, setTargetCareer] = useState('car_ml_eng');
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const careers = [
    { id: 'car_ml_eng', title: 'Machine Learning Engineer' },
    { id: 'car_cloud_arch', title: 'Cloud Solutions Architect' },
    { id: 'car_frontend_dev', title: 'Frontend Software Engineer' }
  ];

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setRoadmap(null);
    try {
      const res = await generateRoadmap('stud_001', targetCareer);
      setRoadmap(res);
    } catch (err) {
      setError(err.message || 'Error generating roadmap');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Interactive Learning Roadmap</h1>
        <p className="text-slate-400 mt-1">Get custom milestones, timeline estimates, project proposals, and direct certification resources tailored just for you.</p>
      </div>

      <div className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row items-end justify-between gap-4">
        <div className="w-full md:w-2/3">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Select Target Job Position</label>
          <select
            value={targetCareer}
            onChange={(e) => setTargetCareer(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:border-google-blue"
          >
            {careers.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full md:w-auto bg-google-blue hover:bg-blue-600 disabled:bg-blue-800 text-white font-semibold rounded-xl px-6 py-3 text-sm transition-colors flex items-center justify-center space-x-2 shrink-0"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Synthesizing Roadmaps...</span>
            </>
          ) : (
            <span>Generate Roadmap</span>
          )}
        </button>
      </div>

      {error && <div className="p-4 bg-google-red/10 border border-google-red/30 rounded-xl text-xs text-google-red">{error}</div>}

      {roadmap && (
        <div className="space-y-8 animate-fadeIn">
          {/* Timeline Summary Box */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">Transition to {roadmap.target_career}</h3>
              <p className="text-xs text-slate-400 mt-1">Generated and saved in your student profile catalog.</p>
            </div>
            <div className="flex items-center space-x-3 bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl">
              <Calendar className="w-5 h-5 text-google-blue" />
              <span className="text-sm font-semibold text-slate-200">{roadmap.estimated_completion_months} Months Est. Duration</span>
            </div>
          </div>

          {/* Detailed Phases */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-200">Milestone Action Phases</h3>
            {roadmap.milestones.map((m, idx) => (
              <div key={idx} className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-google-blue"></div>
                
                {/* Phase identifier */}
                <div className="md:w-1/4">
                  <span className="text-xs uppercase font-bold tracking-wider text-google-blue">Phase {m.phase}</span>
                  <h4 className="text-base font-bold text-slate-200 mt-1">{m.title}</h4>
                  <span className="inline-block text-xs font-semibold text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 mt-3">
                    {m.duration_weeks} Weeks
                  </span>
                </div>

                {/* Topics & Projects */}
                <div className="md:w-3/4 space-y-4">
                  <div>
                    <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Topics to Master</h5>
                    <div className="flex flex-wrap gap-2">
                      {m.topics_to_learn.map((t, tIdx) => (
                        <span key={tIdx} className="text-xs bg-slate-900 text-slate-300 border border-slate-800 px-3 py-1 rounded-lg">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <h6 className="text-xs font-semibold text-google-yellow uppercase tracking-wider mb-2">Milestone Project Goal</h6>
                      <p className="text-xs text-slate-300 leading-relaxed">{m.milestone_project}</p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                      <h6 className="text-xs font-semibold text-google-green uppercase tracking-wider mb-2">Learning Resources</h6>
                      <div className="space-y-1.5">
                        {m.recommended_resources.map((res, rIdx) => (
                          <div key={rIdx} className="flex items-center justify-between text-xs">
                            <span className="text-slate-300 font-medium truncate max-w-[70%]">{res.name} ({res.provider})</span>
                            <span className="text-[10px] bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-slate-400 uppercase font-semibold">{res.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick learning tips */}
          <div className="glass-panel rounded-2xl p-6">
            <h4 className="font-semibold text-slate-200 text-sm mb-3">Tips for success</h4>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-400">
              {roadmap.learning_tips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roadmap;
