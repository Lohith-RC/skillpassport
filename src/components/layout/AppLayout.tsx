import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { TabType } from '../../types';
import { 
  LayoutDashboard, 
  UserCheck, 
  Clock, 
  ShieldCheck, 
  FolderGit2, 
  Rocket, 
  Briefcase, 
  Trophy, 
  Building2, 
  GraduationCap, 
  BookOpen, 
  Award, 
  Users, 
  Search, 
  Bell, 
  MessageSquare, 
  Shield, 
  Settings,
  Sparkles
} from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { activeTab, setActiveTab, setSearchOpen, addToast } = useAppStore();

  // Avatar URL (developer portrait matching screenshot)
  const avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80";

  return (
    <div className="min-h-screen bg-[#070A11] text-white flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* GLOBAL SHELL LAYOUT: SIDEBAR + MAIN CONTENT CONTAINER */}
      <div className="flex flex-1 w-full min-h-screen">
        
        {/* ========================================================================= */}
        {/* LEFT SIDEBAR NAVIGATION PANEL                                              */}
        {/* ========================================================================= */}
        <aside className="w-64 bg-[#0B0F19] border-r border-[#161D2F] p-4 flex flex-col justify-between shrink-0 hidden lg:flex">
          <div className="space-y-5">
            
            {/* Brand Logo Header */}
            <div className="flex items-center space-x-3 px-2 py-1 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-600/30 shrink-0">
                <Shield className="w-5 h-5 text-white fill-current" />
              </div>
              <div>
                <h1 className="font-extrabold text-base tracking-tight text-white flex items-center">
                  SkillPassport <span className="text-blue-500 ml-1">AI</span>
                </h1>
                <p className="text-[10px] text-slate-400 font-medium">One Identity. Endless Opportunities.</p>
              </div>
            </div>

            {/* Main Navigation List */}
            <nav className="space-y-1 text-xs font-medium">
              
              {/* Dashboard Pill */}
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/25'
                    : 'text-slate-400 hover:text-white hover:bg-[#13192B]'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              {/* Skill Passport Pill */}
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition ${
                  activeTab === 'profile'
                    ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/25'
                    : 'text-slate-400 hover:text-white hover:bg-[#13192B]'
                }`}
              >
                <span className="flex items-center space-x-3">
                  <UserCheck className="w-4 h-4" />
                  <span>Skill Passport</span>
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  activeTab === 'profile' ? 'bg-white/20 text-white' : 'bg-[#172033] text-slate-300 border border-[#232F48]'
                }`}>
                  95%
                </span>
              </button>

              {/* Projects */}
              <button
                onClick={() => setActiveTab('repos')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl transition ${
                  activeTab === 'repos' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white hover:bg-[#13192B]'
                }`}
              >
                <FolderGit2 className="w-4 h-4" />
                <span>Projects</span>
              </button>

              {/* Deployments */}
              <button
                onClick={() => setActiveTab('repos')}
                className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#13192B] transition"
              >
                <Rocket className="w-4 h-4" />
                <span>Deployments</span>
              </button>

              {/* Challenges */}
              <button
                onClick={() => setActiveTab('challenges')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl transition ${
                  activeTab === 'challenges' ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/25' : 'text-slate-400 hover:text-white hover:bg-[#13192B]'
                }`}
              >
                <Trophy className="w-4 h-4" />
                <span>Challenges</span>
              </button>

              {/* Portfolio */}
              <button
                onClick={() => setActiveTab('profile')}
                className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#13192B] transition"
              >
                <Briefcase className="w-4 h-4" />
                <span>Portfolio</span>
              </button>

              {/* Experience */}
              <button
                onClick={() => setActiveTab('timecapsule')}
                className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#13192B] transition"
              >
                <Clock className="w-4 h-4" />
                <span>Experience</span>
              </button>

              {/* Certifications */}
              <button
                onClick={() => setActiveTab('university')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl transition ${
                  activeTab === 'university' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white hover:bg-[#13192B]'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Certifications</span>
              </button>

              {/* Achievements */}
              <button
                onClick={() => setActiveTab('profile')}
                className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#13192B] transition"
              >
                <Sparkles className="w-4 h-4" />
                <span>Achievements</span>
              </button>

              {/* Time Capsule */}
              <button
                onClick={() => setActiveTab('timecapsule')}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl transition ${
                  activeTab === 'timecapsule' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white hover:bg-[#13192B]'
                }`}
              >
                <span className="flex items-center space-x-3">
                  <Clock className="w-4 h-4" />
                  <span>Time Capsule</span>
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  NEW
                </span>
              </button>

              {/* Connections */}
              <button
                onClick={() => setActiveTab('recruiter')}
                className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#13192B] transition"
              >
                <Users className="w-4 h-4" />
                <span>Connections</span>
              </button>

              {/* Opportunities */}
              <button
                onClick={() => setActiveTab('recruiter')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl transition ${
                  activeTab === 'recruiter' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white hover:bg-[#13192B]'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Opportunities</span>
              </button>

              {/* Learning */}
              <button
                onClick={() => setActiveTab('university')}
                className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#13192B] transition"
              >
                <BookOpen className="w-4 h-4" />
                <span>Learning</span>
              </button>

              {/* Messages */}
              <button
                onClick={() => addToast('Opened instant recruiter chat window.', 'info')}
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#13192B] transition"
              >
                <span className="flex items-center space-x-3">
                  <MessageSquare className="w-4 h-4" />
                  <span>Messages</span>
                </span>
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-mono text-[10px] font-bold flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Settings */}
              <button
                onClick={() => addToast('Opened profile settings modal', 'info')}
                className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#13192B] transition"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>

            </nav>
          </div>

          {/* Bottom Sidebar Score Widget */}
          <div className="p-4 bg-[#0F1626] rounded-2xl border border-[#1C263B] relative overflow-hidden space-y-2 mt-4">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>Professional Score</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-extrabold font-mono text-white tracking-tight">8,650</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Expert
              </span>
            </div>
            <div className="text-[11px] font-semibold text-emerald-400 flex items-center">
              <span>↑ 12.5% this month</span>
            </div>

            {/* Glowing Mini Sparkline Chart */}
            <div className="pt-2">
              <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 30">
                <defs>
                  <linearGradient id="sidebarChartGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M 0 25 Q 25 20, 50 15 T 100 5 L 100 30 L 0 30 Z" fill="url(#sidebarChartGrad2)" />
                <path d="M 0 25 Q 25 20, 50 15 T 100 5" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </aside>


        {/* ========================================================================= */}
        {/* RIGHT MAIN CONTENT AREA                                                   */}
        {/* ========================================================================= */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#070A11]">
          
          {/* TOP NAVBAR HEADER */}
          <header className="h-16 border-b border-[#161D2F] px-4 md:px-8 flex items-center justify-between gap-4 bg-[#090D17]/80 backdrop-blur-md sticky top-0 z-30">
            
            {/* Center Search Input */}
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search developers, projects, companies..."
                onClick={() => setSearchOpen(true)}
                className="w-full pl-10 pr-12 py-2 bg-[#0F1626] border border-[#1C263B] rounded-xl text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-sans placeholder:text-slate-500 cursor-pointer"
                readOnly
              />
              <kbd className="absolute right-3 top-2.5 px-1.5 py-0.5 text-[10px] bg-[#172033] border border-[#232F48] rounded text-slate-400 font-mono">
                ⌘K
              </kbd>
            </div>

            {/* Right User Actions Header */}
            <div className="flex items-center space-x-4">
              
              {/* Bell Notification */}
              <button 
                onClick={() => addToast('You have 12 unread notifications!', 'info')}
                className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#13192B] border border-[#1C263B] transition"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white font-mono text-[9px] font-bold flex items-center justify-center border-2 border-[#070A11]">
                  12
                </span>
              </button>

              {/* Messages Icon */}
              <button 
                onClick={() => addToast('Opened instant recruiter chat box.', 'info')}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#13192B] border border-[#1C263B] transition"
              >
                <MessageSquare className="w-4 h-4" />
              </button>

              {/* User Profile Tile */}
              <div 
                onClick={() => setActiveTab('profile')}
                className="flex items-center space-x-3 cursor-pointer pl-2 border-l border-[#161D2F]"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden border border-blue-500/50">
                    <img src={avatarUrl} alt="Rahul Sharma" className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#070A11]" />
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-white leading-tight">Rahul Sharma</div>
                  <div className="text-[10px] text-slate-400">Developer</div>
                </div>
              </div>

            </div>
          </header>


          {/* PAGE BODY CONTENT */}
          <main className="p-4 md:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
            {children}
          </main>

        </div>

      </div>

    </div>
  );
};
