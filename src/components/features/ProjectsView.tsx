import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { 
  Plus, 
  Search, 
  Grid, 
  List, 
  ExternalLink, 
  Github, 
  Star, 
  GitFork, 
  Eye, 
  Users, 
  Clock, 
  Calendar, 
  Edit3, 
  MoreVertical, 
  CheckCircle2, 
  Shield, 
  Zap, 
  Bug, 
  Award, 
  Code2, 
  Layers, 
  Layout, 
  ChevronRight,
  Lock,
  Globe
} from 'lucide-react';

export const ProjectsView: React.FC = () => {
  const { addToast } = useAppStore();
  const [activeFilter, setActiveFilter] = useState<'All' | 'Personal' | 'Team' | 'Collaborations' | 'Archived'>('All');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('ai-code-reviewer');
  const [activeSubTab, setActiveSubTab] = useState<'Overview' | 'Features' | 'Tech Stack' | 'Architecture' | 'Screenshots' | 'Documentation' | 'Activity' | 'Analytics'>('Overview');

  // Projects list
  const projects = [
    {
      id: 'ai-code-reviewer',
      title: 'AI Code Reviewer',
      description: 'AI-powered code analysis and review tool that helps developers write better code.',
      tech: ['Next.js', 'TypeScript', 'Tailwind'],
      status: 'Live',
      stars: 128,
      forks: 24,
      updated: '2h ago',
      isPrivate: false,
    },
    {
      id: 'devconnect',
      title: 'DevConnect',
      description: 'Developer social platform to connect, collaborate and share knowledge.',
      tech: ['Next.js', 'Node.js', 'MongoDB'],
      status: 'Live',
      stars: 96,
      forks: 18,
      updated: '1d ago',
      isPrivate: false,
    },
    {
      id: 'clouddeploy-pro',
      title: 'CloudDeploy Pro',
      description: 'Automated deployment platform for modern applications.',
      tech: ['Docker', 'AWS', 'TypeScript'],
      status: 'Live',
      stars: 78,
      forks: 15,
      updated: '3d ago',
      isPrivate: false,
    },
    {
      id: 'codequest',
      title: 'CodeQuest',
      description: 'Gamified coding challenges platform with real-time leaderboards.',
      tech: ['React', 'Firebase', 'Chakra UI'],
      status: 'Private',
      stars: 64,
      forks: 12,
      updated: '5d ago',
      isPrivate: true,
    },
  ];

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  return (
    <div className="space-y-6">
      
      {/* TITLE & TOP ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Projects</h1>
          <p className="text-xs text-slate-400 mt-1">Showcasing your work, building your identity</p>
        </div>

        <button
          onClick={() => addToast('Opening project creation wizard...', 'info')}
          className="self-start sm:self-auto flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-xs transition shadow-lg shadow-blue-600/25"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>


      {/* PROJECTS FILTER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-[#161D2F] pb-4">
        
        {/* Category Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto">
          {[
            { label: 'All Projects', count: 12 },
            { label: 'Personal', count: 8 },
            { label: 'Team', count: 3 },
            { label: 'Collaborations', count: 1 },
            { label: 'Archived', count: 0 },
          ].map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveFilter(tab.label.split(' ')[0] as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition ${
                activeFilter === tab.label.split(' ')[0]
                  ? 'bg-[#141D30] text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-gray-50 dark:bg-[#0F1626]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeFilter === tab.label.split(' ')[0]
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-[#172033] text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-3 text-xs">
          <select className="bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] rounded-xl px-3 py-1.5 text-slate-300 font-sans focus:outline-none focus:border-blue-500">
            <option>Sort by: Recent</option>
            <option>Sort by: Stars</option>
            <option>Sort by: Activity</option>
          </select>

          <div className="flex items-center space-x-1 bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] p-1 rounded-xl">
            <button className="p-1.5 rounded-lg bg-blue-600 text-white"><Grid className="w-3.5 h-3.5" /></button>
            <button className="p-1.5 rounded-lg text-slate-400 hover:text-white"><List className="w-3.5 h-3.5" /></button>
          </div>
        </div>

      </div>


      {/* TOP HORIZONTAL PROJECTS CAROUSEL (4 CARDS) */}
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((project) => {
            const isSelected = project.id === selectedProjectId;
            return (
              <div
                key={project.id}
                onClick={() => setSelectedProjectId(project.id)}
                className={`p-4 rounded-2xl bg-white dark:bg-[#0B0F19] border transition cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden ${
                  isSelected
                    ? 'border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/50'
                    : 'border-gray-200 dark:border-[#161D2F] hover:border-slate-700'
                }`}
              >
                {/* Thumbnail Header */}
                <div className="relative w-full h-28 rounded-xl bg-slate-900 border border-gray-300 dark:border-[#1C263B] overflow-hidden flex flex-col justify-between p-2">
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[10px] font-mono text-slate-400">app.preview</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold flex items-center space-x-1 ${
                      project.isPrivate
                        ? 'bg-slate-800 text-slate-300 border border-slate-700'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {project.isPrivate ? <Lock className="w-2.5 h-2.5 mr-0.5" /> : null}
                      <span>{project.status}</span>
                    </span>
                  </div>
                  
                  {/* Subtle code lines mockup inside card thumbnail */}
                  <div className="space-y-1 font-mono text-[8px] text-slate-600">
                    <div className="w-3/4 h-1.5 bg-blue-600/30 rounded" />
                    <div className="w-1/2 h-1.5 bg-purple-600/30 rounded" />
                    <div className="w-2/3 h-1.5 bg-slate-700/40 rounded" />
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-sm truncate">{project.title}</h3>
                    <MoreVertical className="w-4 h-4 text-slate-500 shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-[#141D30] border border-[#202D47] text-[10px] font-mono text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Footer Stats */}
                <div className="pt-2 border-t border-gray-200 dark:border-[#161D2F] flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center"><Star className="w-3 h-3 mr-1 text-amber-400" /> {project.stars}</span>
                    <span className="flex items-center"><GitFork className="w-3 h-3 mr-1 text-slate-400" /> {project.forks}</span>
                  </div>
                  <span>Updated {project.updated}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>


      {/* ========================================================================= */}
      {/* SELECTED PROJECT DEEP-DIVE INSPECTION PANEL                               */}
      {/* ========================================================================= */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-6">
        
        {/* Top Detail Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Screenshot / Web Preview Box (Span 1) */}
          <div className="w-full h-56 rounded-2xl bg-gradient-to-tr from-slate-950 via-[#0F1626] to-slate-900 border border-gray-300 dark:border-[#1C263B] p-4 flex flex-col justify-between relative overflow-hidden shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[10px] font-mono text-slate-500">ai-code-reviewer.dev</span>
            </div>

            <div className="space-y-2 py-4 font-mono text-xs text-slate-400">
              <div className="text-blue-400">const reviewer = new AICodeReviewer();</div>
              <div className="text-purple-400">const result = await reviewer.analyze(code);</div>
              <div className="text-emerald-400">// Passed 142 security tests ✓</div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800 pt-2">
              <span>Next.js 14 WebGL</span>
              <span className="text-emerald-400">Live Telemetry Active</span>
            </div>
          </div>

          {/* Title, Description & Action Controls (Span 1) */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">{selectedProject.title}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  🟢 {selectedProject.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {selectedProject.description} with intelligent suggestions and automated code quality auditing.
              </p>

              <div className="space-y-1.5 pt-2 text-xs font-mono">
                <div className="flex items-center space-x-2 text-slate-300">
                  <Github className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-slate-400">GitHub Repository</span>
                  <a href="#" className="text-blue-400 hover:underline text-[11px] truncate">
                    https://github.com/rahul/ai-code-reviewer ↗
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-slate-400">Live Demo</span>
                  <a href="#" className="text-emerald-400 hover:underline text-[11px] truncate">
                    https://ai-code-reviewer.dev ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Buttons Row */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => addToast('Launching live demo preview tab...', 'info')}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition shadow-lg shadow-blue-600/25 flex items-center space-x-1.5"
              >
                <span>View Live Project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => addToast('Opening project editor...', 'info')}
                className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-[#0F1626] hover:bg-gray-100 dark:bg-[#172033] border border-gray-300 dark:border-[#1C263B] text-slate-200 font-semibold text-xs transition flex items-center space-x-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Project</span>
              </button>

              <button className="p-2 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] text-slate-400 hover:text-white">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Project Status Ring & Checklist (Span 1) */}
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] flex flex-col justify-between space-y-4">
            
            <div className="flex items-center justify-between border-b border-gray-300 dark:border-[#1C263B] pb-2">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">Project Status</h3>
            </div>

            <div className="flex items-center space-x-5">
              
              {/* Green 100% Ring */}
              <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#141D30" strokeWidth="8" fill="transparent" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#10B981"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset="0"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute text-center">
                  <div className="text-sm font-extrabold font-mono text-slate-900 dark:text-white">100%</div>
                  <div className="text-[8px] text-slate-400">Complete</div>
                </div>
              </div>

              {/* Status Checklist */}
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center space-x-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Project Completed</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Documentation Added</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Deployed Successfully</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Repository Connected</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Live Demo Active</span>
                </div>
              </div>

            </div>

            {/* Quick Stats Grid Row */}
            <div className="grid grid-cols-2 gap-2 border-t border-gray-300 dark:border-[#1C263B] pt-3 text-[11px] font-mono text-slate-400">
              <div><Star className="w-3 h-3 inline mr-1 text-amber-400" /> Star <span className="font-bold text-slate-900 dark:text-white ml-1">128</span></div>
              <div><GitFork className="w-3 h-3 inline mr-1 text-slate-400" /> Forks <span className="font-bold text-slate-900 dark:text-white ml-1">24</span></div>
              <div><Eye className="w-3 h-3 inline mr-1 text-blue-400" /> Watchers <span className="font-bold text-slate-900 dark:text-white ml-1">16</span></div>
              <div><Users className="w-3 h-3 inline mr-1 text-purple-400" /> Contributors <span className="font-bold text-slate-900 dark:text-white ml-1">4</span></div>
            </div>

          </div>

        </div>


        {/* SUB-TABS NAVIGATION */}
        <div className="border-b border-gray-200 dark:border-[#161D2F] overflow-x-auto">
          <div className="flex items-center space-x-6 min-w-max">
            {(['Overview', 'Features', 'Tech Stack', 'Architecture', 'Screenshots', 'Documentation', 'Activity', 'Analytics'] as const).map((tab) => (
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


        {/* SUB-PANELS BREAKDOWN (3 COLUMNS) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Panel: Project Overview & Key Highlights */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">Project Overview</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI Code Reviewer is an intelligent code analysis tool that helps developers improve code quality, security, and performance. It uses advanced AI algorithms to provide real-time suggestions and identify potential issues.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2">
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] flex items-center space-x-2 text-slate-300 font-medium">
                <Shield className="w-4 h-4 text-purple-400" />
                <span>AI Code Analysis</span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] flex items-center space-x-2 text-slate-300 font-medium">
                <Zap className="w-4 h-4 text-blue-400" />
                <span>Real-time Feedback</span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] flex items-center space-x-2 text-slate-300 font-medium">
                <Bug className="w-4 h-4 text-pink-400" />
                <span>Bug Detection</span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] flex items-center space-x-2 text-slate-300 font-medium">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Security Scan</span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] flex items-center space-x-2 text-slate-300 font-medium">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Performance Tips</span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] flex items-center space-x-2 text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Best Practices</span>
              </div>
            </div>
          </div>

          {/* Middle Panel: Tech Stack Grid */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">Tech Stack</h4>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] text-center font-medium text-slate-200">
                <div className="font-bold text-slate-900 dark:text-white">N Next.js</div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] text-center font-medium text-slate-200">
                <div className="font-bold text-blue-400">TS TypeScript</div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] text-center font-medium text-slate-200">
                <div className="font-bold text-cyan-400">🌊 Tailwind CSS</div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] text-center font-medium text-slate-200">
                <div className="font-bold text-emerald-400">🟢 Node.js</div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] text-center font-medium text-slate-200">
                <div className="font-bold text-blue-500">🐘 PostgreSQL</div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] text-center font-medium text-slate-200">
                <div className="font-bold text-red-500">🔴 Redis</div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] text-center font-medium text-slate-200">
                <div className="font-bold text-purple-400">🤖 OpenAI API</div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] text-center font-medium text-slate-200">
                <div className="font-bold text-sky-400">🐳 Docker</div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] text-center font-medium text-slate-400 flex items-center justify-center">
                +2 more
              </div>
            </div>
          </div>

          {/* Right Panel: Activity Timeline Stream */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">Activity Timeline</h4>
              <button className="text-[11px] text-blue-400 hover:underline">View All</button>
            </div>

            <div className="space-y-3 text-[11px]">
              <div className="flex items-start space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                <div className="flex-1">
                  <div className="font-bold text-slate-900 dark:text-white">Project deployed successfully</div>
                  <div className="text-[10px] text-slate-500 font-mono">2 hours ago</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1 shrink-0" />
                <div className="flex-1">
                  <div className="font-bold text-slate-900 dark:text-white">New commit pushed to main branch</div>
                  <div className="text-[10px] text-slate-500 font-mono">5 hours ago</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 mt-1 shrink-0" />
                <div className="flex-1">
                  <div className="font-bold text-slate-900 dark:text-white">Updated README.md</div>
                  <div className="text-[10px] text-slate-500 font-mono">1 day ago</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 mt-1 shrink-0" />
                <div className="flex-1">
                  <div className="font-bold text-slate-900 dark:text-white">New contributor joined the project</div>
                  <div className="text-[10px] text-slate-500 font-mono">2 days ago</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1 shrink-0" />
                <div className="flex-1">
                  <div className="font-bold text-slate-900 dark:text-white">Issue #42 has been resolved</div>
                  <div className="text-[10px] text-slate-500 font-mono">3 days ago</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
