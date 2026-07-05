import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/firebase';
import { Eye, EyeOff, ShieldAlert, Award } from 'lucide-react';

const Login = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('alex.mercer@edu.vision');
  const [password, setPassword] = useState('password123');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let user;
      if (isRegister) {
        user = await registerUser(email, password, displayName);
      } else {
        user = await loginUser(email, password);
      }
      onLoginSuccess(user);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to authenticate user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      {/* Background radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(26,115,232,0.15),rgba(255,255,255,0))] pointer-events-none"></div>
      
      <div className="glass-panel w-full max-w-md rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-google-blue via-google-red to-google-yellow"></div>
        
        <div className="flex flex-col items-center mb-8 mt-4">
          <div className="w-12 h-12 bg-google-blue rounded-2xl flex items-center justify-center mb-3">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">EduVision AI</h1>
          <p className="text-sm text-slate-400 mt-1">Decision Intelligence Portal</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-google-red/10 border border-google-red/30 flex items-start space-x-3">
            <ShieldAlert className="w-5 h-5 text-google-red shrink-0 mt-0.5" />
            <span className="text-xs font-medium text-google-red">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Alex Mercer"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-google-blue text-sm"
                required={isRegister}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-google-blue text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-google-blue text-sm pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-google-blue hover:bg-blue-600 disabled:bg-blue-800 text-white font-semibold rounded-xl py-3 text-sm transition-colors mt-2"
          >
            {loading ? 'Authenticating...' : isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            className="text-google-blue hover:underline font-medium"
          >
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
          </button>
        </div>

        <div className="mt-8 text-center text-xs text-slate-400 border-t border-slate-800 pt-6">
          <p>{isRegister ? 'Mock account registration enabled for evaluation.' : 'Mock User Credentials loaded automatically for hackathon evaluation.'}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
