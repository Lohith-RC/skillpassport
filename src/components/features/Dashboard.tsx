import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
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
  SlidersHorizontal, 
  Shield, 
  Eye, 
  Star, 
  Bookmark, 
  Calendar, 
  ChevronRight, 
  ChevronDown, 
  ArrowUpRight, 
  CheckCircle2, 
  Code, 
  Plus
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { setActiveTab, setSearchOpen, addToast, setSettingsOpen, profile } = useAppStore();
  const [activeGrowthTab, setActiveGrowthTab] = useState<'Score' | 'Projects' | 'Contributions'>('Score');

  // Avatar URL (developer portrait matching screenshot)
  const avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80";

  return (
    <>
      {/* DASHBOARD PAGE CONTENT */}
      <div className="space-y-6">
            
            {/* WELCOME BACK BANNER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center">
                  Welcome back, {profile.name.split(' ')[0]}! <span className="ml-2 text-2xl">👋</span>
                </h1>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Your journey continues. Keep building, keep growing.
                </p>
              </div>

              <button 
                onClick={() => setSettingsOpen(true)}
                className="self-start sm:self-auto flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] hover:border-blue-500/50 text-xs font-bold text-slate-800 dark:text-slate-200 transition shadow-sm"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <span>Customize Dashboard</span>
              </button>
            </div>


            {/* ========================================================================= */}
            {/* TOP 6 METRICS CARDS ROW                                                   */}
            {/* ========================================================================= */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              
              {/* Card 1 */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-2 hover:border-blue-500/40 transition">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium truncate">Professional Score</span>
                  <div className="w-7 h-7 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-500 shrink-0">
                    <Shield className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
                <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">
                  {profile.proofScore > 0 ? (profile.proofScore * 100).toLocaleString() : '0'}
                </div>
                <div className="text-[10px] font-semibold text-emerald-400 flex items-center">
                  <span>{profile.proofScore > 0 ? '↑ 12.5% this month' : 'New Account'}</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-2 hover:border-blue-500/40 transition">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium truncate">Projects</span>
                  <div className="w-7 h-7 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-500 shrink-0">
                    <FolderGit2 className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">
                  {profile.totalContributions > 0 ? Math.floor(profile.totalContributions / 35) : 0}
                </div>
                <div className="text-[10px] font-semibold text-emerald-400 flex items-center">
                  <span>{profile.totalContributions > 0 ? '↑ Active Repos' : '0 Repositories'}</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-2 hover:border-blue-500/40 transition">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium truncate">Deployments</span>
                  <div className="w-7 h-7 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-500 shrink-0">
                    <Rocket className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">
                  {profile.pipelinesPassed}
                </div>
                <div className="text-[10px] font-semibold text-emerald-400 flex items-center">
                  <span>{profile.pipelinesPassed > 0 ? '↑ Verified Pipelines' : '0 Pipelines'}</span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-2 hover:border-blue-500/40 transition">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium truncate">Profile Views</span>
                  <div className="w-7 h-7 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-500 shrink-0">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">
                  {profile.proofScore > 0 ? Math.floor(profile.proofScore * 14.2) : 0}
                </div>
                <div className="text-[10px] font-semibold text-emerald-400 flex items-center">
                  <span>{profile.proofScore > 0 ? '↑ Active Recruiter Views' : '0 Views'}</span>
                </div>
              </div>

              {/* Card 5 */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-2 hover:border-blue-500/40 transition">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium truncate">Connections</span>
                  <div className="w-7 h-7 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-500 shrink-0">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">
                  {profile.proofScore > 0 ? Math.floor(profile.proofScore * 3.6) : 0}
                </div>
                <div className="text-[10px] font-semibold text-emerald-400 flex items-center">
                  <span>{profile.proofScore > 0 ? '↑ Verified Network' : '0 Connections'}</span>
                </div>
              </div>

              {/* Card 6 */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-2 hover:border-blue-500/40 transition">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium truncate">Badges</span>
                  <div className="w-7 h-7 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-500 shrink-0">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">
                  {profile.proofScore > 0 ? Math.floor(profile.proofScore / 5) : 0}
                </div>
                <button onClick={() => setActiveTab('profile')} className="text-[10px] font-semibold text-blue-400 hover:underline block">
                  View all
                </button>
              </div>

            </div>


            {/* ========================================================================= */}
            {/* MIDDLE SECTION GRID: SKILL PASSPORT HERO CARD + RECENT ACTIVITY            */}
            {/* ========================================================================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* HERO CARD: YOUR SKILL PASSPORT (SPAN 2 COLS) */}
              <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                
                {/* Background Subtle Radial Glow */}
                <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

                {/* Left Profile Details */}
                <div className="flex items-center space-x-5 z-10">
                  <div className="relative shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 shadow-xl shadow-blue-600/20 flex items-center justify-center text-2xl font-extrabold text-white border border-blue-400/40">
                      {profile.avatar}
                    </div>
                    <span className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-[#0B0F19] ${profile.verified ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Your Skill Passport</h2>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${profile.verified ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                        {profile.verified ? 'Verified' : 'New Member'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
                      Your professional identity that grows with every contribution and achievement.
                    </p>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition shadow-lg shadow-blue-600/25"
                    >
                      <span>View Skill Passport</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right Progress Ring & Checklist */}
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 border-t md:border-t-0 md:border-l border-gray-200 dark:border-[#161D2F] pt-4 md:pt-0 md:pl-6 z-10 w-full md:w-auto">
                  
                  {/* SVG Donut Ring */}
                  <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#141D30"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="url(#passportRingGrad)"
                        strokeWidth="8"
                        strokeDasharray="251.2"
                        strokeDashoffset="12.5"
                        strokeLinecap="round"
                        fill="transparent"
                      />
                      <defs>
                        <linearGradient id="passportRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="100%" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute text-center">
                      <div className="text-lg font-extrabold font-mono text-slate-900 dark:text-white">95%</div>
                      <div className="text-[9px] text-slate-400 font-medium">Completed</div>
                    </div>
                  </div>

                  {/* Checklist Items */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center space-x-2 text-slate-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Basic Information</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Skills &amp; Expertise</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Projects (24/25)</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Certifications (8/10)</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Experience (4/5)</span>
                    </div>
                    <button onClick={() => addToast('Social links sync modal opened.', 'info')} className="flex items-center space-x-1.5 text-blue-400 hover:underline font-semibold pt-0.5">
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Social Links</span>
                    </button>
                  </div>

                </div>

              </div>

              {/* RECENT ACTIVITY CARD (SPAN 1 COL) */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-4 flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#161D2F] pb-3">
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Recent Activity</h3>
                  <button onClick={() => setActiveTab('timecapsule')} className="text-xs text-blue-400 hover:underline font-medium">
                    View all
                  </button>
                </div>

                <div className="space-y-3.5 text-xs">
                  {/* Activity Item 1 */}
                  <div className="flex items-start justify-between space-x-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-7 h-7 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Code className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200">Project 'AI Code Reviewer' deployed</div>
                        <div className="text-[10px] text-slate-500">2 hours ago</div>
                      </div>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
                  </div>

                  {/* Activity Item 2 */}
                  <div className="flex items-start justify-between space-x-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Award className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200">AWS Certification verified</div>
                        <div className="text-[10px] text-slate-500">5 hours ago</div>
                      </div>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
                  </div>

                  {/* Activity Item 3 */}
                  <div className="flex items-start justify-between space-x-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <UserCheck className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200">John Doe viewed your profile</div>
                        <div className="text-[10px] text-slate-500">1 day ago</div>
                      </div>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
                  </div>

                  {/* Activity Item 4 */}
                  <div className="flex items-start justify-between space-x-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Trophy className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200">You completed 'React Advanced' challenge</div>
                        <div className="text-[10px] text-slate-500">2 days ago</div>
                      </div>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
                  </div>

                  {/* Activity Item 5 */}
                  <div className="flex items-start justify-between space-x-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-7 h-7 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                        <Calendar className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200">Interview scheduled with TechNova</div>
                        <div className="text-[10px] text-slate-500">3 days ago</div>
                      </div>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
                  </div>

                </div>
              </div>

            </div>


            {/* ========================================================================= */}
            {/* BOTTOM SECTION GRID: RECENT PROJECTS + OPPORTUNITIES + GROWTH + UPCOMING  */}
            {/* ========================================================================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* LEFT SPAN 2 COLS: RECENT PROJECTS + PROFESSIONAL GROWTH */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* RECENT PROJECTS CARD CAROUSEL */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#161D2F] pb-3">
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Recent Projects</h3>
                    <button onClick={() => setActiveTab('repos')} className="text-xs text-blue-400 hover:underline font-medium">
                      View all
                    </button>
                  </div>

                  {/* 4 Cards Carousel Row with Right Arrow Nav */}
                  <div className="relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                      
                      {/* Project Card 1 */}
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] hover:border-blue-500/40 transition space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-slate-900 dark:text-white text-xs truncate flex items-center">
                              <span>AI Code Reviewer</span>
                              <Star className="w-3 h-3 text-amber-400 fill-current ml-1" />
                            </h4>
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-1">AI-Powered code analysis...</p>
                          <div className="flex flex-wrap gap-1">
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-gray-100 dark:bg-[#172033] text-slate-300 border border-gray-300 dark:border-[#232F48]">React</span>
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-gray-100 dark:bg-[#172033] text-slate-300 border border-gray-300 dark:border-[#232F48]">Node.js</span>
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-gray-100 dark:bg-[#172033] text-slate-300 border border-gray-300 dark:border-[#232F48]">AI</span>
                          </div>
                          {/* App Screenshot Preview Placeholder */}
                          <div className="w-full h-20 rounded-lg bg-slate-900 border border-gray-300 dark:border-[#232F48] p-2 flex flex-col justify-between overflow-hidden relative group cursor-pointer" onClick={() => setActiveTab('repos')}>
                            <div className="w-full h-2 bg-slate-800 rounded flex space-x-1 items-center px-1">
                              <div className="w-1 h-1 rounded-full bg-red-500" />
                              <div className="w-1 h-1 rounded-full bg-yellow-500" />
                              <div className="w-1 h-1 rounded-full bg-green-500" />
                            </div>
                            <div className="text-[9px] font-mono text-blue-400">const review = await ai.analyze();</div>
                            <div className="text-[8px] font-mono text-slate-500">Demo Preview</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-gray-300 dark:border-[#1C263B]">
                          <span className="text-emerald-400 font-semibold flex items-center">🟢 Live</span>
                          <div className="flex items-center space-x-2">
                            <span>☆ 128</span>
                            <span>⑂ 24</span>
                          </div>
                        </div>
                      </div>

                      {/* Project Card 2 */}
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] hover:border-blue-500/40 transition space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h4 className="font-bold text-slate-900 dark:text-white text-xs truncate">DevConnect</h4>
                          <p className="text-[11px] text-slate-400 line-clamp-1">Developer social platform</p>
                          <div className="flex flex-wrap gap-1">
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-gray-100 dark:bg-[#172033] text-slate-300 border border-gray-300 dark:border-[#232F48]">Next.js</span>
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-gray-100 dark:bg-[#172033] text-slate-300 border border-gray-300 dark:border-[#232F48]">Tailwind</span>
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-gray-100 dark:bg-[#172033] text-slate-300 border border-gray-300 dark:border-[#232F48]">PostgreSQL</span>
                          </div>
                          {/* App Screenshot Preview Placeholder */}
                          <div className="w-full h-20 rounded-lg bg-slate-900 border border-gray-300 dark:border-[#232F48] p-2 flex flex-col justify-between overflow-hidden relative group cursor-pointer" onClick={() => setActiveTab('repos')}>
                            <div className="w-full h-2 bg-slate-800 rounded flex space-x-1 items-center px-1">
                              <div className="w-1 h-1 rounded-full bg-red-500" />
                              <div className="w-1 h-1 rounded-full bg-yellow-500" />
                              <div className="w-1 h-1 rounded-full bg-green-500" />
                            </div>
                            <div className="text-[9px] font-mono text-purple-400">DevConnect Feed v2.4</div>
                            <div className="text-[8px] font-mono text-slate-500">12k active devs</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-gray-300 dark:border-[#1C263B]">
                          <span className="text-emerald-400 font-semibold flex items-center">🟢 Live</span>
                          <div className="flex items-center space-x-2">
                            <span>☆ 96</span>
                            <span>⑂ 18</span>
                          </div>
                        </div>
                      </div>

                      {/* Project Card 3 */}
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] hover:border-blue-500/40 transition space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h4 className="font-bold text-slate-900 dark:text-white text-xs truncate">CloudDeploy Pro</h4>
                          <p className="text-[11px] text-slate-400 line-clamp-1">Automated deployment...</p>
                          <div className="flex flex-wrap gap-1">
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-gray-100 dark:bg-[#172033] text-slate-300 border border-gray-300 dark:border-[#232F48]">Docker</span>
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-gray-100 dark:bg-[#172033] text-slate-300 border border-gray-300 dark:border-[#232F48]">AWS</span>
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-gray-100 dark:bg-[#172033] text-slate-300 border border-gray-300 dark:border-[#232F48]">TypeScript</span>
                          </div>
                          {/* App Screenshot Preview Placeholder */}
                          <div className="w-full h-20 rounded-lg bg-slate-900 border border-gray-300 dark:border-[#232F48] p-2 flex flex-col justify-between overflow-hidden relative group cursor-pointer" onClick={() => setActiveTab('repos')}>
                            <div className="w-full h-2 bg-slate-800 rounded flex space-x-1 items-center px-1">
                              <div className="w-1 h-1 rounded-full bg-red-500" />
                              <div className="w-1 h-1 rounded-full bg-yellow-500" />
                              <div className="w-1 h-1 rounded-full bg-green-500" />
                            </div>
                            <div className="text-[9px] font-mono text-emerald-400">AWS EC2 Runner: 18ms</div>
                            <div className="text-[8px] font-mono text-slate-500">312 Pipelines</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-gray-300 dark:border-[#1C263B]">
                          <span className="text-emerald-400 font-semibold flex items-center">🟢 Live</span>
                          <div className="flex items-center space-x-2">
                            <span>☆ 78</span>
                            <span>⑂ 15</span>
                          </div>
                        </div>
                      </div>

                      {/* Project Card 4 */}
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] hover:border-blue-500/40 transition space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h4 className="font-bold text-slate-900 dark:text-white text-xs truncate">CodeQuest</h4>
                          <p className="text-[11px] text-slate-400 line-clamp-1">Gamified learning platform</p>
                          <div className="flex flex-wrap gap-1">
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-gray-100 dark:bg-[#172033] text-slate-300 border border-gray-300 dark:border-[#232F48]">React</span>
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-gray-100 dark:bg-[#172033] text-slate-300 border border-gray-300 dark:border-[#232F48]">Firebase</span>
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-gray-100 dark:bg-[#172033] text-slate-300 border border-gray-300 dark:border-[#232F48]">TS</span>
                          </div>
                          {/* App Screenshot Preview Placeholder */}
                          <div className="w-full h-20 rounded-lg bg-slate-900 border border-gray-300 dark:border-[#232F48] p-2 flex flex-col justify-between overflow-hidden relative group cursor-pointer" onClick={() => setActiveTab('repos')}>
                            <div className="w-full h-2 bg-slate-800 rounded flex space-x-1 items-center px-1">
                              <div className="w-1 h-1 rounded-full bg-red-500" />
                              <div className="w-1 h-1 rounded-full bg-yellow-500" />
                              <div className="w-1 h-1 rounded-full bg-green-500" />
                            </div>
                            <div className="text-[9px] font-mono text-amber-400">Level 42 Quest Unlocked</div>
                            <div className="text-[8px] font-mono text-slate-500">264 challenges</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-gray-300 dark:border-[#1C263B]">
                          <span className="text-emerald-400 font-semibold flex items-center">🟢 Live</span>
                          <div className="flex items-center space-x-2">
                            <span>☆ 64</span>
                            <span>⑂ 12</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Carousel Right Navigation Arrow */}
                    <button 
                      onClick={() => addToast('Scrolled projects carousel', 'info')}
                      className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-100 dark:bg-[#172033] border border-gray-300 dark:border-[#232F48] text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition z-10 hidden xl:flex"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* PROFESSIONAL GROWTH SPLINE CHART CARD */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-[#161D2F] pb-3">
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Professional Growth</h3>
                    
                    <div className="flex items-center space-x-3">
                      {/* Tabs */}
                      <div className="flex bg-gray-50 dark:bg-[#0F1626] p-1 rounded-xl border border-gray-300 dark:border-[#1C263B] text-xs font-semibold">
                        {(['Score', 'Projects', 'Contributions'] as const).map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveGrowthTab(tab)}
                            className={`px-3 py-1 rounded-lg transition ${
                              activeGrowthTab === tab
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      {/* Period Dropdown */}
                      <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] text-xs text-slate-300 font-medium">
                        <span>Last 6 months</span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    </div>
                  </div>

                  {/* SVG Bezier Spline Area Chart */}
                  <div className="relative pt-4">
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mb-2">
                      <span>10k</span>
                      <span>7.5k</span>
                      <span>5k</span>
                    </div>

                    <div className="w-full h-44 relative">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="growthAreaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.45" />
                            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Horizontal Grid Guidelines */}
                        <line x1="0" y1="10" x2="500" y2="10" stroke="#161D2F" strokeDasharray="4 4" />
                        <line x1="0" y1="60" x2="500" y2="60" stroke="#161D2F" strokeDasharray="4 4" />
                        <line x1="0" y1="110" x2="500" y2="110" stroke="#161D2F" strokeDasharray="4 4" />

                        {/* Smooth Spline Area Fill */}
                        <path
                          d="M 0 120 Q 80 115, 160 100 T 320 60 T 480 20 L 480 150 L 0 150 Z"
                          fill="url(#growthAreaGradient)"
                        />

                        {/* Smooth Spline Line Curve */}
                        <path
                          d="M 0 120 Q 80 115, 160 100 T 320 60 T 480 20"
                          fill="none"
                          stroke="#3B82F6"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />

                        {/* Glowing Data Point Bulbs */}
                        <circle cx="160" cy="100" r="4" fill="#3B82F6" className="animate-ping opacity-75" />
                        <circle cx="160" cy="100" r="4" fill="#3B82F6" />

                        <circle cx="320" cy="60" r="4" fill="#3B82F6" />
                        
                        <circle cx="480" cy="20" r="6" fill="#60A5FA" stroke="#1E40AF" strokeWidth="3" />
                      </svg>

                      {/* Tooltip Badge on Peak Data Point */}
                      <div className="absolute right-0 top-0 transform translate-x-2 -translate-y-2">
                        <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs shadow-lg shadow-blue-600/40">
                          8,650
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT SPAN 1 COL: OPPORTUNITIES FOR YOU + UPCOMING */}
              <div className="space-y-6">
                
                {/* OPPORTUNITIES FOR YOU CARD */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#161D2F] pb-3">
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Opportunities for You</h3>
                    <button onClick={() => setActiveTab('recruiter')} className="text-xs text-blue-400 hover:underline font-medium">
                      View all
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    {/* Job Item 1 */}
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] hover:border-blue-500/40 transition space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                            O
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">Senior Frontend Developer</div>
                            <div className="text-[11px] text-slate-400">TechNova Solutions</div>
                          </div>
                        </div>
                        <button onClick={() => addToast('Bookmarked Senior Frontend Developer position', 'success')} className="text-slate-400 hover:text-white">
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                        <span>📍 Remote</span>
                        <span className="text-emerald-400 font-bold">₹18 - 25 LPA</span>
                        <span className="text-slate-500">2h ago</span>
                      </div>
                    </div>

                    {/* Job Item 2 */}
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] hover:border-blue-500/40 transition space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                            O
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">Full Stack Developer</div>
                            <div className="text-[11px] text-slate-400">InnovateLab</div>
                          </div>
                        </div>
                        <button onClick={() => addToast('Bookmarked Full Stack Developer position', 'success')} className="text-slate-400 hover:text-white">
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                        <span>📍 Bangalore</span>
                        <span className="text-emerald-400 font-bold">₹12 - 18 LPA</span>
                        <span className="text-slate-500">5h ago</span>
                      </div>
                    </div>

                    {/* Job Item 3 */}
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] hover:border-blue-500/40 transition space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-xl bg-pink-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                            O
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">Frontend Developer Intern</div>
                            <div className="text-[11px] text-slate-400">Creative Minds</div>
                          </div>
                        </div>
                        <button onClick={() => addToast('Bookmarked Intern position', 'success')} className="text-slate-400 hover:text-white">
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                        <span>📍 Remote</span>
                        <span className="text-emerald-400 font-bold">₹25K - 40K / month</span>
                        <span className="text-slate-500">1d ago</span>
                      </div>
                    </div>
                  </div>

                  {/* Explore All Opportunities Footer Link */}
                  <div className="pt-2 text-center border-t border-gray-200 dark:border-[#161D2F]">
                    <button
                      onClick={() => setActiveTab('recruiter')}
                      className="inline-flex items-center space-x-1.5 text-xs text-blue-400 hover:underline font-semibold"
                    >
                      <span>Explore all opportunities</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>


                {/* UPCOMING CARD */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#161D2F] pb-3">
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Upcoming</h3>
                    <button onClick={() => addToast('Calendar view opened.', 'info')} className="text-xs text-blue-400 hover:underline font-medium">
                      View calendar
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">Interview with TechNova</div>
                        <div className="text-[11px] text-slate-400">Tomorrow, 10:00 AM</div>
                      </div>
                    </div>

                    <button
                      onClick={() => addToast('Prepared interview notes for TechNova!', 'success')}
                      className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-[#172033] hover:bg-blue-600 text-white font-semibold text-xs border border-gray-300 dark:border-[#232F48] transition shrink-0"
                    >
                      Prepare
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
    </>
  );
};
