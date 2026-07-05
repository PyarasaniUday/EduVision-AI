import React, { useState } from 'react';
import { analyzeSkillGap } from '../services/api';
import { ShieldCheck, HelpCircle, RefreshCw, Star } from 'lucide-react';

const SkillGap = () => {
  const [targetCareer, setTargetCareer] = useState('car_ml_eng');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const careers = [
    { id: 'car_ml_eng', title: 'Machine Learning Engineer' },
    { id: 'car_cloud_arch', title: 'Cloud Solutions Architect' },
    { id: 'car_frontend_dev', title: 'Frontend Software Engineer' }
  ];

  const handleAnalyze = async () => {
    setLoading(true);
    setError('');
    setAnalysis(null);
    try {
      const res = await analyzeSkillGap('stud_001', targetCareer);
      setAnalysis(res);
    } catch (err) {
      setError(err.message || 'Error processing skill gap analysis.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Proficient' || status === 'Matches') return 'bg-google-green/10 text-google-green border-google-green/20';
    return 'bg-google-red/10 text-google-red border-google-red/20';
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Skill Gap Analyzer</h1>
        <p className="text-slate-400 mt-1">Benchmark your skills against standard industry profiles and find exact milestones to fix them.</p>
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
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full md:w-auto bg-google-blue hover:bg-blue-600 disabled:bg-blue-800 text-white font-semibold rounded-xl px-6 py-3 text-sm transition-colors flex items-center justify-center space-x-2 shrink-0"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing Deficits...</span>
            </>
          ) : (
            <span>Compute Skill Gap</span>
          )}
        </button>
      </div>

      {error && <div className="p-4 bg-google-red/10 border border-google-red/30 rounded-xl text-xs text-google-red">{error}</div>}

      {analysis && (
        <div className="space-y-8 animate-fadeIn">
          {/* Summary Banner */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border-l-4 border-l-google-blue">
            <div>
              <h3 className="text-lg font-bold text-white">Analysis Complete</h3>
              <p className="text-sm text-slate-400 mt-1">You are missing approximately {analysis.overall_gap_percentage}% of target competencies.</p>
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-4xl font-black text-white">{analysis.overall_gap_percentage}%</span>
              <span className="text-sm text-slate-400 font-semibold">Deficit</span>
            </div>
          </div>

          {/* Grid Layout for details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Skills Table List */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-semibold text-slate-200">Skills Comparison Matrix</h3>
              <div className="space-y-3">
                {analysis.skills_analysis.map((s, idx) => (
                  <div key={idx} className="glass-panel rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-700/60">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-slate-100 text-sm">{s.skill_name}</span>
                        <span className={`text-xs px-2 py-0.5 border rounded-full font-medium ${getStatusColor(s.status)}`}>
                          {s.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{s.action_item}</p>
                    </div>
                    <div className="flex items-center space-x-4 shrink-0 justify-between md:justify-end border-t border-slate-800 pt-2 md:border-t-0 md:pt-0">
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">Required</span>
                        <span className="text-sm font-bold text-slate-300">{s.required_rating} / 5</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">Your Rating</span>
                        <span className="text-sm font-bold text-google-blue">{s.student_rating} / 5</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic recommendations */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-lg font-semibold text-slate-200">Recommended Focus</h3>
              <div className="glass-panel rounded-2xl p-6 space-y-4">
                {analysis.strategic_recommendations.map((rec, idx) => (
                  <div key={idx} className="flex space-x-3 items-start">
                    <ShieldCheck className="w-5 h-5 text-google-blue shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-300 leading-relaxed">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillGap;
