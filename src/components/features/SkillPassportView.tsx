import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { 
  ShieldCheck, 
  Share2, 
  MapPin, 
  Link2, 
  Calendar, 
  Github, 
  Linkedin, 
  Twitter, 
  Globe, 
  Eye, 
  Users, 
  CheckCircle2, 
  Shield, 
  Award, 
  Trophy, 
  Flame, 
  Star, 
  ExternalLink, 
  ChevronRight,
  Code,
  Layers,
  Sparkles,
  Check
} from 'lucide-react';

export const SkillPassportView: React.FC = () => {
  const { setActiveTab, addToast } = useAppStore();
  const [activeSubTab, setActiveSubTab] = useState<'Overview' | 'Skills' | 'Projects' | 'Experience' | 'Certifications' | 'Achievements' | 'Activity' | 'Recommendations'>('Overview');

  // Avatar URL
  const avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80";

  return (
    <div className="space-y-6">
      
      {/* PAGE TITLE BANNER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Skill Passport</h1>
          <p className="text-xs text-slate-400 mt-1">Your verified professional identity</p>
        </div>

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            addToast('Verified Skill Passport link copied to clipboard!', 'success');
          }}
          className="self-start sm:self-auto flex items-center space-x-2 px-4 py-2 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] hover:border-blue-500/50 text-xs font-semibold text-slate-200 transition shadow-sm"
        >
          <Share2 className="w-4 h-4 text-slate-400" />
          <span>Share My Passport</span>
        </button>
      </div>


      {/* ========================================================================= */}
      {/* TOP SECTION: HERO PROFILE CARD + IDENTITY STRENGTH CARD                   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* HERO PROFILE CARD (SPAN 2 COLS) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          
          {/* Subtle Radial Blue Glow Background */}
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Profile Details */}
          <div className="flex items-start space-x-5 z-10">
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-blue-600 to-purple-600 shadow-xl shadow-blue-600/20">
                <img src={avatarUrl} alt="Rahul Sharma" className="w-full h-full object-cover rounded-full" />
              </div>
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0B0F19] flex items-center justify-center text-[10px] text-white">
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Rahul Sharma</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Verified
                </span>
              </div>
              
              <div className="text-xs font-semibold text-slate-300">Full Stack Developer</div>
              
              <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="flex items-center"><MapPin className="w-3 h-3 mr-1 text-slate-400" /> Bengaluru, India</span>
                <span>•</span>
                <span className="flex items-center"><Link2 className="w-3 h-3 mr-1 text-blue-400" /> rahul.dev</span>
                <span>•</span>
                <span className="flex items-center"><Calendar className="w-3 h-3 mr-1 text-slate-400" /> Joined Jan 2023</span>
              </div>

              {/* Social Icons Row */}
              <div className="flex items-center space-x-3 pt-1 text-slate-400">
                <button className="hover:text-white transition"><Github className="w-4 h-4" /></button>
                <button className="hover:text-blue-400 transition"><Linkedin className="w-4 h-4" /></button>
                <button className="hover:text-sky-400 transition"><Twitter className="w-4 h-4" /></button>
                <button className="hover:text-emerald-400 transition"><Globe className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          {/* Center Donut Chart Ring */}
          <div className="flex flex-col items-center justify-center z-10 shrink-0">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#141D30" strokeWidth="8" fill="transparent" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#passportDonutGrad)"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset="12.5"
                  strokeLinecap="round"
                  fill="transparent"
                />
                <defs>
                  <linearGradient id="passportDonutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute text-center">
                <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">95%</div>
                <div className="text-[9px] text-slate-400 font-medium leading-tight">Skill Passport<br />Score</div>
              </div>
            </div>
          </div>

          {/* Right Metrics Breakdown */}
          <div className="space-y-2 text-xs border-t md:border-t-0 md:border-l border-gray-200 dark:border-[#161D2F] pt-4 md:pt-0 md:pl-6 z-10 w-full md:w-auto">
            <div className="flex items-center justify-between space-x-6">
              <span className="text-slate-400 flex items-center"><Shield className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> Professional Score</span>
              <span className="font-extrabold font-mono text-slate-900 dark:text-white flex items-center space-x-1.5">
                <span>8,650</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">Expert</span>
              </span>
            </div>

            <div className="flex items-center justify-between space-x-6">
              <span className="text-slate-400 flex items-center"><Trophy className="w-3.5 h-3.5 mr-1.5 text-amber-500" /> Rank (Global)</span>
              <span className="font-bold text-purple-400 font-mono">Top 2.4%</span>
            </div>

            <div className="flex items-center justify-between space-x-6">
              <span className="text-slate-400 flex items-center"><Eye className="w-3.5 h-3.5 mr-1.5 text-blue-400" /> Profile Views</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono flex items-center">
                <span>1,248</span>
                <span className="ml-1 text-[10px] text-emerald-400 font-semibold">↑ 18.6%</span>
              </span>
            </div>

            <div className="flex items-center justify-between space-x-6">
              <span className="text-slate-400 flex items-center"><Users className="w-3.5 h-3.5 mr-1.5 text-blue-400" /> Connections</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">320</span>
            </div>

            <div className="flex items-center justify-between space-x-6">
              <span className="text-slate-400 flex items-center"><ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> Endorsements</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">186</span>
            </div>
          </div>

        </div>

        {/* IDENTITY STRENGTH CARD (SPAN 1 COL) */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-4 flex flex-col justify-between items-center text-center">
          <div className="w-full flex items-center justify-between border-b border-gray-200 dark:border-[#161D2F] pb-3">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">Identity Strength</h3>
            <span className="text-xs font-extrabold text-emerald-400 font-mono">Excellent</span>
          </div>

          {/* Hexagonal Green Shield Graphic */}
          <div className="relative py-2 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                <ShieldCheck className="w-8 h-8" />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-slate-300 font-medium">Your identity is strong and trusted.</div>
          </div>

          <button
            onClick={() => addToast('Opening verification details audit panel...', 'info')}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition shadow-lg shadow-blue-600/25"
          >
            View Verification Details
          </button>
        </div>

      </div>


      {/* ========================================================================= */}
      {/* SUB-TABS NAVIGATION BAR                                                   */}
      {/* ========================================================================= */}
      <div className="border-b border-gray-200 dark:border-[#161D2F] overflow-x-auto">
        <div className="flex items-center space-x-6 min-w-max">
          {(['Overview', 'Skills', 'Projects', 'Experience', 'Certifications', 'Achievements', 'Activity', 'Recommendations'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`py-3 text-xs font-semibold border-b-2 transition ${
                activeSubTab === tab
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>


      {/* ========================================================================= */}
      {/* MIDDLE ROW 1: SKILLS & EXPERTISE + VERIFICATION STATUS                    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SKILLS & EXPERTISE CARD (SPAN 2 COLS) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-5">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Skills &amp; Expertise</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left Sub-panel: Top Skills Pills Grid (Span 2) */}
            <div className="md:col-span-2 space-y-3">
              <div className="text-xs text-slate-400 font-semibold">Top Skills</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                
                {/* Skill 1: React */}
                <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] flex items-center space-x-2.5 text-white font-medium">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    ⚛
                  </div>
                  <span className="truncate">React</span>
                </div>

                {/* Skill 2: Next.js */}
                <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] flex items-center space-x-2.5 text-white font-medium">
                  <div className="w-6 h-6 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    N
                  </div>
                  <span className="truncate">Next.js</span>
                </div>

                {/* Skill 3: TypeScript */}
                <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] flex items-center space-x-2.5 text-white font-medium">
                  <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    TS
                  </div>
                  <span className="truncate">TypeScript</span>
                </div>

                {/* Skill 4: Node.js */}
                <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] flex items-center space-x-2.5 text-white font-medium">
                  <div className="w-6 h-6 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
                    🟢
                  </div>
                  <span className="truncate">Node.js</span>
                </div>

                {/* Skill 5: Python */}
                <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] flex items-center space-x-2.5 text-white font-medium">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    🐍
                  </div>
                  <span className="truncate">Python</span>
                </div>

                {/* Skill 6: MongoDB */}
                <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] flex items-center space-x-2.5 text-white font-medium">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    🍃
                  </div>
                  <span className="truncate">MongoDB</span>
                </div>

                {/* Skill 7: PostgreSQL */}
                <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] flex items-center space-x-2.5 text-white font-medium">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    🐘
                  </div>
                  <span className="truncate">PostgreSQL</span>
                </div>

                {/* Skill 8: AWS */}
                <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] flex items-center space-x-2.5 text-white font-medium">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    ☁
                  </div>
                  <span className="truncate">AWS</span>
                </div>

                {/* Skill 9: Docker */}
                <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] flex items-center space-x-2.5 text-white font-medium">
                  <div className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                    🐳
                  </div>
                  <span className="truncate">Docker</span>
                </div>

                {/* Skill 10: Tailwind CSS */}
                <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] flex items-center space-x-2.5 text-white font-medium">
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    🌊
                  </div>
                  <span className="truncate">Tailwind CSS</span>
                </div>

              </div>
            </div>

            {/* Right Sub-panel: Skills Distribution Donut Chart (Span 1) */}
            <div className="space-y-3 border-t md:border-t-0 md:border-l border-gray-200 dark:border-[#161D2F] pt-4 md:pt-0 md:pl-6">
              <div className="text-xs text-slate-400 font-semibold">Skills Distribution</div>
              
              <div className="flex items-center space-x-4">
                {/* Donut Ring */}
                <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" stroke="#06B6D4" strokeWidth="8" strokeDasharray="60 200" fill="transparent" />
                    <circle cx="50" cy="50" r="38" stroke="#3B82F6" strokeWidth="8" strokeDasharray="50 200" strokeDashoffset="-60" fill="transparent" />
                    <circle cx="50" cy="50" r="38" stroke="#8B5CF6" strokeWidth="8" strokeDasharray="30 200" strokeDashoffset="-110" fill="transparent" />
                    <circle cx="50" cy="50" r="38" stroke="#EC4899" strokeWidth="8" strokeDasharray="30 200" strokeDashoffset="-140" fill="transparent" />
                    <circle cx="50" cy="50" r="38" stroke="#F59E0B" strokeWidth="8" strokeDasharray="20 200" strokeDashoffset="-170" fill="transparent" />
                  </svg>
                  <div className="absolute text-center">
                    <div className="text-base font-extrabold font-mono text-slate-900 dark:text-white">28</div>
                    <div className="text-[8px] text-slate-400 font-medium">Total Skills</div>
                  </div>
                </div>

                {/* Legend List */}
                <div className="space-y-1 text-[11px] font-medium text-slate-300">
                  <div className="flex items-center justify-between space-x-3">
                    <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-cyan-400 mr-1.5" /> Frontend</span>
                    <span className="font-mono text-slate-400">10</span>
                  </div>
                  <div className="flex items-center justify-between space-x-3">
                    <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5" /> Backend</span>
                    <span className="font-mono text-slate-400">8</span>
                  </div>
                  <div className="flex items-center justify-between space-x-3">
                    <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-purple-500 mr-1.5" /> Database</span>
                    <span className="font-mono text-slate-400">4</span>
                  </div>
                  <div className="flex items-center justify-between space-x-3">
                    <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-pink-500 mr-1.5" /> DevOps</span>
                    <span className="font-mono text-slate-400">4</span>
                  </div>
                  <div className="flex items-center justify-between space-x-3">
                    <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-amber-500 mr-1.5" /> Tools</span>
                    <span className="font-mono text-slate-400">2</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* VERIFICATION STATUS CARD (SPAN 1 COL) */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#161D2F] pb-3">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">Verification Status</h3>
            <button onClick={() => setActiveTab('university')} className="text-xs text-blue-400 hover:underline font-medium">
              View all
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center space-x-2 text-slate-200 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Email Verified</span>
            </div>

            <div className="flex items-center space-x-2 text-slate-200 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Phone Verified</span>
            </div>

            <div className="flex items-center space-x-2 text-slate-200 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Government ID Verified</span>
            </div>

            <div className="flex items-center space-x-2 text-slate-200 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>GitHub Connected</span>
            </div>

            <div className="flex items-center space-x-2 text-slate-200 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>LinkedIn Connected</span>
            </div>

            <div className="flex items-center space-x-2 text-slate-200 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div>Education Verified</div>
                <div className="text-[10px] text-slate-500 font-mono">VTU, Bengaluru</div>
              </div>
            </div>
          </div>

          {/* Bottom Purple Verification Banner */}
          <div className="p-3 rounded-xl bg-[#141226] border border-[#2B2354] flex items-center space-x-3 text-xs">
            <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">All verifications completed</div>
              <div className="text-[10px] text-slate-400">Your identity is 100% verified</div>
            </div>
          </div>
        </div>

      </div>


      {/* ========================================================================= */}
      {/* BOTTOM ROW 2: EXPERIENCE TIMELINE + FEATURED PROJECTS + ACHIEVEMENTS       */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* EXPERIENCE TIMELINE CARD (SPAN 1 COL) */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-4 flex flex-col justify-between">
          <div className="border-b border-gray-200 dark:border-[#161D2F] pb-3">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">Experience Timeline</h3>
          </div>

          <div className="relative pl-6 space-y-6 border-l-2 border-blue-500/30 my-2 text-xs">
            
            {/* Timeline Item 1 */}
            <div className="relative group">
              <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-blue-600 border-2 border-[#0B0F19] shadow-md shadow-blue-600/50" />
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-900 dark:text-white">Software Developer Intern</span>
                  <span className="text-[10px] font-mono text-slate-500">Present</span>
                </div>
                <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                  <span>TechNova Solutions</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Verified</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed pt-0.5">
                  Working on scalable web applications using React, Node.js and AWS.
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative group">
              <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-blue-600 border-2 border-[#0B0F19]" />
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-900 dark:text-white">Full Stack Developer Intern</span>
                  <span className="text-[10px] font-mono text-slate-500">Jul 2023 - Jan 2024</span>
                </div>
                <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                  <span>CodeCraft Labs</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Verified</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed pt-0.5">
                  Built and deployed 3+ projects. Improved system performance by 30%.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative group">
              <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-blue-600 border-2 border-[#0B0F19]" />
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-900 dark:text-white">Open Source Contributor</span>
                  <span className="text-[10px] font-mono text-slate-500">Mar 2023 - Jun 2023</span>
                </div>
                <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                  <span>Various Projects</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Verified</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed pt-0.5">
                  Contributed to 5+ open source projects on GitHub.
                </p>
              </div>
            </div>

          </div>

          <button
            onClick={() => setActiveTab('timecapsule')}
            className="w-full py-2 rounded-xl bg-gray-50 dark:bg-[#0F1626] hover:bg-gray-100 dark:bg-[#172033] border border-gray-300 dark:border-[#1C263B] text-slate-200 text-xs font-semibold transition"
          >
            View Full Timeline
          </button>
        </div>

        {/* FEATURED PROJECTS CARD (SPAN 1 COL) */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#161D2F] pb-3">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">Featured Projects</h3>
            <button onClick={() => setActiveTab('repos')} className="text-xs text-blue-400 hover:underline font-medium">
              View all
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {/* Project 1 */}
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] hover:border-blue-500/40 transition flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-slate-900 border border-gray-300 dark:border-[#232F48] overflow-hidden shrink-0 flex flex-col justify-between p-1">
                <div className="w-full h-1 bg-blue-500 rounded" />
                <div className="text-[7px] font-mono text-slate-400 truncate">ai.review()</div>
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="font-bold text-slate-900 dark:text-white truncate">AI Code Reviewer</div>
                <div className="text-[10px] text-slate-400 truncate">AI-powered code analysis and review tool.</div>
                <div className="flex items-center space-x-2 text-[9px] font-mono text-slate-400">
                  <span>Next.js</span>
                  <span>TypeScript</span>
                  <span>OpenAI</span>
                </div>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 shrink-0">🟢 Live</div>
            </div>

            {/* Project 2 */}
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] hover:border-blue-500/40 transition flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-slate-900 border border-gray-300 dark:border-[#232F48] overflow-hidden shrink-0 flex flex-col justify-between p-1">
                <div className="w-full h-1 bg-purple-500 rounded" />
                <div className="text-[7px] font-mono text-slate-400 truncate">dev.connect()</div>
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="font-bold text-slate-900 dark:text-white truncate">DevConnect</div>
                <div className="text-[10px] text-slate-400 truncate">Developer social platform for collaboration.</div>
                <div className="flex items-center space-x-2 text-[9px] font-mono text-slate-400">
                  <span>Node.js</span>
                  <span>MongoDB</span>
                  <span>Socket.io</span>
                </div>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 shrink-0">🟢 Live</div>
            </div>

            {/* Project 3 */}
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] hover:border-blue-500/40 transition flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-slate-900 border border-gray-300 dark:border-[#232F48] overflow-hidden shrink-0 flex flex-col justify-between p-1">
                <div className="w-full h-1 bg-amber-500 rounded" />
                <div className="text-[7px] font-mono text-slate-400 truncate">aws.deploy()</div>
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="font-bold text-slate-900 dark:text-white truncate">CloudDeploy Pro</div>
                <div className="text-[10px] text-slate-400 truncate">Automated deployment platform.</div>
                <div className="flex items-center space-x-2 text-[9px] font-mono text-slate-400">
                  <span>AWS</span>
                  <span>Docker</span>
                  <span>TypeScript</span>
                </div>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 shrink-0">🟢 Live</div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('repos')}
            className="w-full py-2 rounded-xl bg-gray-50 dark:bg-[#0F1626] hover:bg-gray-100 dark:bg-[#172033] border border-gray-300 dark:border-[#1C263B] text-slate-200 text-xs font-semibold transition"
          >
            View All Projects
          </button>
        </div>

        {/* ACHIEVEMENTS CARD (SPAN 1 COL) */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#161D2F] pb-3">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">Achievements</h3>
            <button onClick={() => addToast('View all achievements clicked.', 'info')} className="text-xs text-blue-400 hover:underline font-medium">
              View all
            </button>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* Achievement 1 */}
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Hackathon Winner</div>
                <div className="text-[10px] text-slate-400">Smart India Hackathon 2024</div>
              </div>
            </div>

            {/* Achievement 2 */}
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Top 1% Coder</div>
                <div className="text-[10px] text-slate-400">LeetCode Global Ranking</div>
              </div>
            </div>

            {/* Achievement 3 */}
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">GitHub Star</div>
                <div className="text-[10px] text-slate-400">50+ Stars on Repositories</div>
              </div>
            </div>

            {/* Achievement 4 */}
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">200 Days Streak</div>
                <div className="text-[10px] text-slate-400">Coding Streak Achievement</div>
              </div>
            </div>
          </div>

          <div className="pt-2 text-center border-t border-gray-200 dark:border-[#161D2F]">
            <span className="text-[10px] font-mono text-slate-500">Verified through cryptographic seals</span>
          </div>
        </div>

      </div>

    </div>
  );
};
