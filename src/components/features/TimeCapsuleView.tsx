import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { 
  Plus, 
  Rocket, 
  Code, 
  Briefcase, 
  Trophy, 
  GraduationCap, 
  Lightbulb, 
  ExternalLink, 
  Github, 
  Calendar, 
  TrendingUp, 
  Sparkles, 
  ChevronDown,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';

export const TimeCapsuleView: React.FC = () => {
  const { addToast, profile, setSyncModalOpen } = useAppStore();
  const [activeFilter, setActiveFilter] = useState<'All' | 'Projects' | 'Experience' | 'Achievements' | 'Certifications' | 'Education'>('All');
  const [viewMode, setViewMode] = useState<'Timeline' | 'Calendar'>('Timeline');

  if (profile.proofScore === 0) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Time Capsule</h1>
            <p className="text-xs text-slate-400 mt-1">Visualizing your journey, growth and verified career milestones</p>
          </div>
          <button
            onClick={() => addToast('Opening milestone submission form...', 'info')}
            className="self-start sm:self-auto flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-xs transition shadow-lg shadow-blue-600/25 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Milestone</span>
          </button>
        </div>

        <div className="p-16 text-center bg-white dark:bg-[#0B0F19] rounded-2xl border border-gray-200 dark:border-[#161D2F] space-y-4 shadow-xl">
          <div className="w-20 h-20 rounded-full bg-purple-600/10 text-purple-400 flex items-center justify-center mx-auto border border-purple-500/20">
            <Sparkles className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Milestones Logged Yet</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Your career time capsule starts clean. Sync platforms or upload your academic degree transcripts to generate cryptographic SHA proof seals.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* TITLE & TOP ACTION BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center">
            Time Capsule
          </h1>
          <p className="text-xs text-slate-400 mt-1">Visualizing your journey, growth and milestones over time</p>
        </div>

        <button
          onClick={() => addToast('Opening milestone submission form...', 'info')}
          className="self-start sm:self-auto flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-[#2B2354] hover:border-purple-500 text-white font-semibold text-xs transition shadow-lg shadow-purple-500/10"
        >
          <Plus className="w-4 h-4 text-purple-400" />
          <span>Add Milestone</span>
        </button>
      </div>


      {/* MILESTONE FILTER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-[#161D2F] pb-4">
        
        {/* Category Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto">
          {['All Milestones', 'Projects', 'Experience', 'Achievements', 'Certifications', 'Education'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab.replace(' Milestones', '') as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeFilter === tab.replace(' Milestones', '') || (activeFilter === 'All' && tab === 'All Milestones')
                  ? 'bg-blue-600 text-white font-semibold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-gray-50 dark:bg-[#0F1626]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center space-x-1 bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] p-1 rounded-xl text-xs">
          <button
            onClick={() => setViewMode('Timeline')}
            className={`px-3 py-1 rounded-lg transition font-medium ${
              viewMode === 'Timeline' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Timeline View
          </button>
          <button
            onClick={() => setViewMode('Calendar')}
            className={`px-3 py-1 rounded-lg transition font-medium ${
              viewMode === 'Calendar' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Calendar View
          </button>
        </div>

      </div>


      {/* MAIN TWO COLUMN LAYOUT: TIMELINE STREAM (SPAN 2) + STATS CARDS (SPAN 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* TIMELINE STREAM (SPAN 2 COLS) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative pl-8 space-y-6 border-l-2 border-[#162544] my-2">
            
            {/* Milestone 1: 2024 May - Deployed First Project */}
            <div className="relative group">
              <span className="absolute -left-[45px] top-0.5 w-8 h-8 rounded-full bg-emerald-600/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Rocket className="w-4 h-4" />
              </span>
              
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] hover:border-emerald-500/40 transition space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-slate-500">2024 May</div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Deployed First Project</h3>
                    <p className="text-xs text-slate-400 mt-1">Successfully deployed my portfolio website using Vercel.</p>
                  </div>
                  
                  <div className="w-24 h-14 rounded-lg bg-slate-900 border border-gray-300 dark:border-[#1C263B] overflow-hidden shrink-0 hidden sm:flex flex-col justify-between p-1">
                    <div className="w-full h-1 bg-emerald-500 rounded" />
                    <div className="text-[7px] font-mono text-slate-400">vercel.app</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-[#141D30] border border-[#202D47] text-[10px] font-mono text-slate-300">Next.js</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#141D30] border border-[#202D47] text-[10px] font-mono text-slate-300">Tailwind CSS</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#141D30] border border-[#202D47] text-[10px] font-mono text-slate-300">Vercel</span>
                  </div>

                  <a href="#" className="text-xs font-semibold text-blue-400 hover:underline flex items-center space-x-1">
                    <span>Live Site</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Milestone 2: 2024 Mar - Open Source Contribution */}
            <div className="relative group">
              <span className="absolute -left-[45px] top-0.5 w-8 h-8 rounded-full bg-purple-600/20 border-2 border-purple-500 text-purple-400 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Code className="w-4 h-4" />
              </span>
              
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] hover:border-purple-500/40 transition space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-slate-500">2024 Mar</div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Open Source Contribution</h3>
                    <p className="text-xs text-slate-400 mt-1">Contributed to an open source project and fixed 12 issues.</p>
                  </div>
                  
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-gray-300 dark:border-[#1C263B] flex items-center justify-center text-white shrink-0">
                    <Github className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="px-2 py-0.5 rounded-md bg-[#141D30] border border-[#202D47] text-[10px] font-mono text-slate-300">Open Source</span>

                  <a href="#" className="text-xs font-semibold text-purple-400 hover:underline flex items-center space-x-1">
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Milestone 3: 2023 Dec - Software Developer Intern */}
            <div className="relative group">
              <span className="absolute -left-[45px] top-0.5 w-8 h-8 rounded-full bg-blue-600/20 border-2 border-blue-500 text-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Briefcase className="w-4 h-4" />
              </span>
              
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] hover:border-blue-500/40 transition space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-slate-500">2023 Dec</div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Software Developer Intern</h3>
                    <p className="text-xs text-slate-400 mt-1">Joined TechNova Solutions as a Software Developer Intern.</p>
                  </div>
                  
                  <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-gray-300 dark:border-[#1C263B] text-[10px] font-bold text-slate-900 dark:text-white shrink-0">
                    TechNova
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-[#141D30] border border-[#202D47] text-[10px] font-mono text-slate-300">React</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#141D30] border border-[#202D47] text-[10px] font-mono text-slate-300">Node.js</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#141D30] border border-[#202D47] text-[10px] font-mono text-slate-300">MongoDB</span>
                  </div>

                  <a href="#" className="text-xs font-semibold text-blue-400 hover:underline flex items-center space-x-1">
                    <span>TechNova Solutions</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Milestone 4: 2023 Sep - Hackathon Winner */}
            <div className="relative group">
              <span className="absolute -left-[45px] top-0.5 w-8 h-8 rounded-full bg-amber-600/20 border-2 border-amber-500 text-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Trophy className="w-4 h-4" />
              </span>
              
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] hover:border-amber-500/40 transition space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-slate-500">2023 Sep</div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Hackathon Winner</h3>
                    <p className="text-xs text-slate-400 mt-1">Won 1st place in Smart India Hackathon 2023.</p>
                  </div>
                  
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    🏆
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-[#141D30] border border-[#202D47] text-[10px] font-mono text-slate-300">SIH 2023</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#141D30] border border-[#202D47] text-[10px] font-mono text-slate-300">Team Lead</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#141D30] border border-[#202D47] text-[10px] font-mono text-slate-300">Innovation</span>
                  </div>

                  <a href="#" className="text-xs font-semibold text-amber-400 hover:underline flex items-center space-x-1">
                    <span>View Certificate</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Milestone 5: 2023 Jun - Completed B.Tech 3rd Year */}
            <div className="relative group">
              <span className="absolute -left-[45px] top-0.5 w-8 h-8 rounded-full bg-blue-600/20 border-2 border-blue-500 text-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <GraduationCap className="w-4 h-4" />
              </span>
              
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] hover:border-blue-500/40 transition space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-slate-500">2023 Jun</div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Completed B.Tech 3rd Year</h3>
                    <p className="text-xs text-slate-400 mt-1">Completed third year of Computer Science Engineering.</p>
                  </div>
                  
                  <div className="px-3 py-1 rounded-xl bg-slate-900 border border-gray-300 dark:border-[#1C263B] text-[10px] font-bold text-slate-900 dark:text-white shrink-0">
                    VTU
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="px-2 py-0.5 rounded-md bg-[#141D30] border border-[#202D47] text-[10px] font-mono text-slate-300">B.Tech CSE</span>

                  <a href="#" className="text-xs font-semibold text-blue-400 hover:underline flex items-center space-x-1">
                    <span>VTU University</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Milestone 6: 2022 Jan - Started My Coding Journey */}
            <div className="relative group">
              <span className="absolute -left-[45px] top-0.5 w-8 h-8 rounded-full bg-emerald-600/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Lightbulb className="w-4 h-4" />
              </span>
              
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] hover:border-emerald-500/40 transition space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-slate-500">2022 Jan</div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Started My Coding Journey</h3>
                    <p className="text-xs text-slate-400 mt-1">Solved my first coding problem on LeetCode.</p>
                  </div>
                  
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                    LC
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="px-2 py-0.5 rounded-md bg-[#141D30] border border-[#202D47] text-[10px] font-mono text-slate-300">LeetCode</span>

                  <a href="#" className="text-xs font-semibold text-emerald-400 hover:underline flex items-center space-x-1">
                    <span>LeetCode</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Button */}
          <button
            onClick={() => addToast('Loaded 10 more past milestones.', 'info')}
            className="w-full py-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] hover:bg-gray-100 dark:bg-[#172033] border border-gray-300 dark:border-[#1C263B] text-slate-200 text-xs font-semibold transition flex items-center justify-center space-x-2"
          >
            <span>View More Milestones</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* RIGHT COLUMN STATS & INSIGHTS CARDS (SPAN 1 COL) */}
        <div className="space-y-6">
          
          {/* CARD 1: JOURNEY OVERVIEW */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#161D2F] pb-3">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">Journey Overview</h3>
              <button className="text-[11px] text-blue-400 hover:underline">View Analytics</button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-mono text-base font-extrabold text-slate-900 dark:text-white">2+</span>
                  <Calendar className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-[11px] text-slate-400">Years of Journey</div>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-mono text-base font-extrabold text-slate-900 dark:text-white">18</span>
                  <Rocket className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-[11px] text-slate-400">Milestones</div>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-mono text-base font-extrabold text-slate-900 dark:text-white">12</span>
                  <Code className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-[11px] text-slate-400">Projects Built</div>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-mono text-base font-extrabold text-slate-900 dark:text-white">8</span>
                  <Trophy className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-[11px] text-slate-400">Achievements</div>
              </div>
            </div>
          </div>

          {/* CARD 2: GROWTH OVER TIME CHART */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#161D2F] pb-3">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">Growth Over Time</h3>
              <button className="text-[11px] text-blue-400 hover:underline">View Details</button>
            </div>

            {/* Glowing Line Chart */}
            <div className="pt-2">
              <svg className="w-full h-32 overflow-visible" viewBox="0 0 200 80">
                <defs>
                  <linearGradient id="timeCapsuleChartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M 0 70 Q 50 60, 100 40 T 200 10 L 200 80 L 0 80 Z" fill="url(#timeCapsuleChartGrad)" />
                <path d="M 0 70 Q 50 60, 100 40 T 200 10" fill="none" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" />
                <circle cx="200" cy="10" r="4" fill="#8B5CF6" className="animate-ping" />
                <circle cx="200" cy="10" r="4" fill="#FFFFFF" />
              </svg>

              <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-gray-200 dark:border-[#161D2F]">
                <span>2022</span>
                <span>2022</span>
                <span>2023</span>
                <span>2023</span>
                <span>2024</span>
              </div>
            </div>
          </div>

          {/* CARD 3: TOP SKILLS OVER TIME */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#161D2F] pb-3">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">Top Skills Over Time</h3>
              <button className="text-[11px] text-blue-400 hover:underline">View All</button>
            </div>

            <div className="space-y-3 text-xs">
              
              {/* JavaScript */}
              <div className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-white">JavaScript</span>
                  <span className="font-mono text-slate-400">90%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#141D30] overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '90%' }} />
                </div>
              </div>

              {/* React */}
              <div className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-white">React</span>
                  <span className="font-mono text-slate-400">85%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#141D30] overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              {/* Node.js */}
              <div className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-white">Node.js</span>
                  <span className="font-mono text-slate-400">80%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#141D30] overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '80%' }} />
                </div>
              </div>

              {/* TypeScript */}
              <div className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-white">TypeScript</span>
                  <span className="font-mono text-slate-400">75%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#141D30] overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>

              {/* AWS */}
              <div className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-white">AWS</span>
                  <span className="font-mono text-slate-400">65%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#141D30] overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>

            </div>
          </div>

          {/* CARD 4: TIME CAPSULE INSIGHTS */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#101426] via-[#120F2A] to-[#0D162B] border border-[#2B2354] space-y-4 relative overflow-hidden shadow-xl">
            
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">Time Capsule Insights</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              You have shown consistent growth in full stack development and system design over the last 2 years.
            </p>

            {/* Glowing Crystal Ball Graphic 🔮 */}
            <div className="flex items-center justify-center py-2">
              <div className="w-16 h-16 rounded-full bg-purple-600/20 border border-purple-500/40 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white text-lg">
                  🔮
                </div>
              </div>
            </div>

            <button
              onClick={() => addToast('Opening AI Time Capsule report...', 'info')}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition shadow-lg shadow-purple-600/30 flex items-center justify-center space-x-1.5"
            >
              <span>Explore Insights</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};
