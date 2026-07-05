import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AIMentor from './pages/AIMentor';
import SkillGap from './pages/SkillGap';
import Roadmap from './pages/Roadmap';
import PlacementReadiness from './pages/PlacementReadiness';
import Login from './pages/Login';
import { logoutUser } from './services/firebase';
import { 
  Bot, LayoutDashboard, Compass, GitMerge, FileText, 
  LogOut, Menu, X, GraduationCap 
} from 'lucide-react';

const AppContent = ({ user, handleLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'AI Career Mentor', path: '/mentor', icon: Bot },
    { name: 'Skill Gap Analyzer', path: '/skillgap', icon: GitMerge },
    { name: 'Learning Roadmap', path: '/roadmap', icon: Compass },
    { name: 'Placement Readiness', path: '/readiness', icon: FileText }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-google-blue/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 border-r border-slate-800 p-6 shrink-0 z-20">
        <div className="flex items-center space-x-3 mb-10 mt-2">
          <div className="w-9 h-9 bg-google-blue rounded-xl flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            EduVision AI
          </span>
        </div>

        <nav className="flex-1 space-y-1.5">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive(item.path)
                    ? 'bg-google-blue text-white shadow-lg shadow-blue-500/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User bar */}
        <div className="border-t border-slate-800 pt-6 mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
              AM
            </div>
            <div className="truncate max-w-[100px]">
              <p className="text-xs font-semibold text-slate-200 truncate">{user.displayName}</p>
              <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-slate-500 hover:text-google-red rounded-lg transition-colors"
          >
            <LogOut className="w-4.5 h-4.5" />
          </button>
        </div>
      </aside>

      {/* Main container */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Mobile Header Bar */}
        <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 z-30">
          <div className="flex items-center space-x-3">
            <GraduationCap className="w-6 h-6 text-google-blue" />
            <span className="font-bold text-lg text-white">EduVision AI</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-slate-400 hover:text-white"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Sidebar overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm">
            <div className="w-64 h-full bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8 mt-2">
                  <span className="font-bold text-lg text-white">EduVision AI</span>
                  <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          isActive(item.path)
                            ? 'bg-google-blue text-white'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
              <div className="border-t border-slate-800 pt-6 mt-6 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 truncate">{user.displayName}</span>
                <button onClick={handleLogout} className="text-slate-500 hover:text-google-red p-2">
                  <LogOut className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Page content */}
        <main className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/mentor" element={<AIMentor />} />
            <Route path="/skillgap" element={<SkillGap />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/readiness" element={<PlacementReadiness />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null;
  });

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!user ? <Login onLoginSuccess={(u) => setUser(u)} /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="*" 
          element={user ? <AppContent user={user} handleLogout={handleLogout} /> : <Navigate to="/login" replace />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
