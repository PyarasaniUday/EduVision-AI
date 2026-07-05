import React, { useState, useRef, useEffect } from 'react';
import { chatWithMentor } from '../services/api';
import { Send, Bot, User, Award, Terminal } from 'lucide-react';

const AIMentor = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am your EduVision Career Mentor. How can I help you plan your studies or target a Google Cloud path today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await chatWithMentor(userMsg.text, 'stud_001');
      setMessages(prev => [...prev, { role: 'bot', text: res.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, I encountered an error retrieving advice. Please check the backend connection.' }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto glass-panel rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl">
      {/* Header bar */}
      <div className="bg-slate-900 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-google-blue/15 border border-google-blue/30 flex items-center justify-center text-google-blue">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100 text-sm md:text-base">AI Career Mentor</h3>
            <span className="text-xs text-google-green font-medium flex items-center space-x-1">
              <span className="w-2.5 h-2.5 bg-google-green rounded-full inline-block animate-pulse"></span>
              <span>Gemini Pro Online</span>
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
          <Terminal className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-400 font-mono">ID: stud_001</span>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start space-x-3 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${m.role === 'user' ? 'bg-google-blue text-white' : 'bg-slate-800 text-slate-300'}`}>
                {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-google-blue text-white rounded-tr-none' : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'}`}>
                <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center bg-slate-800 text-slate-300">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 rounded-tl-none flex items-center space-x-2">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input area */}
      <form onSubmit={handleSend} className="bg-slate-900 border-t border-slate-700 p-4 flex space-x-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about roadmaps, certifications, or how to bridge your skills gap..."
          className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-google-blue text-sm placeholder-slate-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-google-blue hover:bg-blue-600 disabled:bg-blue-800 text-white p-3.5 rounded-xl transition-colors shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default AIMentor;
