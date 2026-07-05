import React, { useState } from 'react';
import { analyzeResume } from '../services/api';
import { CheckCircle2, AlertTriangle, RefreshCw, BarChart2 } from 'lucide-react';

const PlacementReadiness = () => {
  const [targetCareer, setTargetCareer] = useState('car_ml_eng');
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const careers = [
    { id: 'car_ml_eng', title: 'Machine Learning Engineer' },
    { id: 'car_cloud_arch', title: 'Cloud Solutions Architect' },
    { id: 'car_frontend_dev', title: 'Frontend Software Engineer' }
  ];

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!resumeText.trim()) return;

    setLoading(true);
    setError('');
    setAnalysis(null);
    try {
      const res = await analyzeResume('stud_001', targetCareer, resumeText);
      setAnalysis(res);
    } catch (err) {
      setError(err.message || 'Error processing resume analysis.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-google-green';
    if (score >= 60) return 'text-google-yellow';
    return 'text-google-red';
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Placement Readiness Analyzer</h1>
        <p className="text-slate-400 mt-1">Paste your current resume details and target role to compute alignment scores and extract constructive feedback.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1 glass-panel rounded-2xl p-6 h-fit space-y-5">
          <form onSubmit={handleAnalyze} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Target Career Position</label>
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

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Paste Resume Text</label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste the text from your resume here (experience, projects, skills, education)..."
                rows={10}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:border-google-blue placeholder-slate-600 resize-none font-mono"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !resumeText.trim()}
              className="w-full bg-google-blue hover:bg-blue-600 disabled:bg-blue-800 text-white font-semibold rounded-xl py-3 text-sm transition-colors flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Parsing content...</span>
                </>
              ) : (
                <span>Analyze Alignment</span>
              )}
            </button>
          </form>
        </div>

        {/* Results Presentation */}
        <div className="lg:col-span-2 space-y-6">
          {error && <div className="p-4 bg-google-red/10 border border-google-red/30 rounded-xl text-xs text-google-red">{error}</div>}

          {!analysis && !loading && (
            <div className="glass-panel rounded-2xl p-8 text-center text-slate-500 h-full flex flex-col justify-center items-center space-y-3">
              <BarChart2 className="w-12 h-12 text-slate-700" />
              <p className="text-sm">Submit your resume text on the left panel to begin calculating matching scores.</p>
            </div>
          )}

          {analysis && (
            <div className="space-y-6 animate-fadeIn">
              {/* Score card */}
              <div className="glass-panel rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Resume Matching Complete</h3>
                  <p className="text-xs text-slate-400 mt-1">Evaluated against standard benchmarks for the selected career track.</p>
                </div>
                <div className="text-right">
                  <span className={`text-4xl font-black ${getScoreColor(analysis.alignment_score)}`}>{analysis.alignment_score}%</span>
                  <span className="text-xs text-slate-400 block font-semibold">Alignment Score</span>
                </div>
              </div>

              {/* Keywords comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel rounded-2xl p-5 space-y-3 border-t-2 border-t-google-green">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Matching Keywords Found</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.identified_keywords.map((kw, idx) => (
                      <span key={idx} className="text-[11px] bg-google-green/10 text-google-green border border-google-green/20 px-2 py-0.5 rounded font-medium">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="glass-panel rounded-2xl p-5 space-y-3 border-t-2 border-t-google-red">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Missing Critical Keywords</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.missing_critical_keywords.map((kw, idx) => (
                      <span key={idx} className="text-[11px] bg-google-red/10 text-google-red border border-google-red/20 px-2 py-0.5 rounded font-medium">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section-by-section feedback */}
              <div className="glass-panel rounded-2xl p-6 space-y-4">
                <h4 className="font-semibold text-slate-200 text-sm border-b border-slate-800 pb-3">Feedback Report</h4>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-google-yellow font-bold uppercase tracking-wider block">Structure & Formatting</span>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{analysis.feedback_sections.formatting}</p>
                  </div>
                  <div>
                    <span className="text-xs text-google-blue font-bold uppercase tracking-wider block">Experience & Projects Description</span>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{analysis.feedback_sections.experience_and_projects}</p>
                  </div>
                  <div>
                    <span className="text-xs text-google-green font-bold uppercase tracking-wider block">Skills Stack & Frameworks</span>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{analysis.feedback_sections.skills_alignment}</p>
                  </div>
                </div>
              </div>

              {/* Action items */}
              <div className="glass-panel rounded-2xl p-6 space-y-4">
                <h4 className="font-semibold text-slate-200 text-sm">Recommended Action Items</h4>
                <div className="space-y-3">
                  {analysis.recommended_action_items.map((item, idx) => (
                    <div key={idx} className="flex space-x-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-google-blue shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-300 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlacementReadiness;
