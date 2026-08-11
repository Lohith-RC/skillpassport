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
  const { addToast, profile, setSyncModalOpen } = useAppStore();
  const [activeFilter, setActiveFilter] = useState<'All' | 'Personal' | 'Team' | 'Collaborations' | 'Archived'>('All');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('ai-code-reviewer');
  const [activeSubTab, setActiveSubTab] = useState<'Overview' | 'Features' | 'Tech Stack' | 'Architecture' | 'Screenshots' | 'Documentation' | 'Activity' | 'Analytics'>('Overview');
  const [sortKey, setSortKey] = useState<'Recent' | 'Stars' | 'Activity'>('Recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Projects list
  const projects = [
    {
      id: 'ai-code-reviewer',
      title: 'AI Code Reviewer',
      description: 'AI-powered code analysis and review tool that helps developers write better code.',
      tech: ['Next.js', 'TypeScript', 'Tailwind'],
      status: 'Live',
      category: 'Personal' as const,
      stars: 128,
      forks: 24,
      updated: '2h ago',
      updatedOrder: 2,
      activityCount: 14,
      isPrivate: false,
      liveUrl: 'https://ai-code-reviewer.dev',
      repoUrl: 'https://github.com/rahul/ai-code-reviewer',
    },
    {
      id: 'devconnect',
      title: 'DevConnect',
      description: 'Developer social platform to connect, collaborate and share knowledge.',
      tech: ['Next.js', 'Node.js', 'MongoDB'],
      status: 'Live',
      category: 'Personal' as const,
      stars: 96,
      forks: 18,
      updated: '1d ago',
      updatedOrder: 1,
      activityCount: 9,
      isPrivate: false,
      liveUrl: 'https://devconnect.dev',
      repoUrl: 'https://github.com/rahul/devconnect',
    },
    {
      id: 'clouddeploy-pro',
      title: 'CloudDeploy Pro',
      description: 'Automated deployment platform for modern applications.',
      tech: ['Docker', 'AWS', 'TypeScript'],
      status: 'Live',
      category: 'Team' as const,
      stars: 78,
      forks: 15,
      updated: '3d ago',
      updatedOrder: 3,
      activityCount: 5,
      isPrivate: false,
      liveUrl: 'https://clouddeploy.pro',
      repoUrl: 'https://github.com/rahul/clouddeploy-pro',
    },
    {
      id: 'codequest',
      title: 'CodeQuest',
      description: 'Gamified coding challenges platform with real-time leaderboards.',
      tech: ['React', 'Firebase', 'Chakra UI'],
      status: 'Private',
      category: 'Collaborations' as const,
      stars: 64,
      forks: 12,
      updated: '5d ago',
      updatedOrder: 5,
      activityCount: 2,
      isPrivate: true,
      liveUrl: 'https://codequest.dev',
      repoUrl: 'https://github.com/rahul/codequest',
    },
  ];

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : activeFilter === 'Archived'
        ? []
        : projects.filter(p => p.category === activeFilter);

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortKey === 'Stars') return b.stars - a.stars;
    if (sortKey === 'Activity') return b.activityCount - a.activityCount;
    return a.updatedOrder - b.updatedOrder;
  });

  const filterCount = (label: string) => {
    if (label === 'All Projects') return projects.length;
    if (label === 'Archived') return 0;
    return projects.filter(p => p.category === label).length;
  };

  if (profile.proofScore === 0) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Code Telemetry Vault</h1>
            <p className="text-xs text-slate-400 mt-1">Showcasing your verified codebase telemetry & proof seals</p>
          </div>
          <button
            onClick={() => setSyncModalOpen(true)}
            className="self-start sm:self-auto flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-xs transition shadow-lg shadow-blue-600/25 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Sync First Repository</span>
          </button>
        </div>

        <div className="p-16 text-center bg-white dark:bg-[#0B0F19] rounded-2xl border border-gray-200 dark:border-[#161D2F] space-y-4 shadow-xl">
          <div className="w-20 h-20 rounded-full bg-blue-600/10 text-blue-500 flex items-center justify-center mx-auto border border-blue-500/20">
            <Code2 className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Your Project Vault Starts at 0</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              No pre-populated repositories found. Connect your GitHub or GitLab accounts to automatically generate verified cryptographic telemetry seals.
            </p>
          </div>
          <button
            onClick={() => setSyncModalOpen(true)}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-lg shadow-blue-600/25 cursor-pointer"
          >
            <Zap className="w-4 h-4 mr-1 text-amber-300" />
            <span>Connect 10 Developer Platforms</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* TITLE & TOP ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Projects</h1>
          <p className="text-xs text-slate-400 mt-1">Showcasing your work, building your identity</p>
        </div>

        <button
          onClick={() => addToast('Project creation wizard is disabled in demo mode — sync a repository to add verified projects.', 'info')}
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
          {(['All Projects', 'Personal', 'Team', 'Collaborations', 'Archived'] as const).map((label) => {
            const filterId = label === 'All Projects' ? 'All' : label;
            return (
              <button
                key={label}
                onClick={() => setActiveFilter(filterId as typeof activeFilter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition ${
                  activeFilter === filterId
                    ? 'bg-[#141D30] text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-gray-50 dark:bg-[#0F1626]'
                }`}
              >
                <span>{label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  activeFilter === filterId
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-[#172033] text-slate-400'
                }`}>
                  {filterCount(label)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-3 text-xs">
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as 'Recent' | 'Stars' | 'Activity')}
            className="bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] rounded-xl px-3 py-1.5 text-slate-300 font-sans focus:outline-none focus:border-blue-500"
          >
            <option value="Recent">Sort by: Recent</option>
            <option value="Stars">Sort by: Stars</option>
            <option value="Activity">Sort by: Activity</option>
          </select>

          <div className="flex items-center space-x-1 bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>


      {/* TOP HORIZONTAL PROJECTS CAROUSEL (4 CARDS) */}
      <div className="relative">
        <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}>
          {sortedProjects.map((project) => {
            const isSelected = project.id === selectedProjectId;
            return (
              <div
                key={project.id}
                onClick={() => setSelectedProjectId(project.id)}
                className={`p-4 rounded-2xl bg-white dark:bg-[#0B0F19] border transition cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden ${
                  viewMode === 'list' ? 'md:flex-row md:space-y-0 md:space-x-4 md:items-center' : ''
                } ${
                  isSelected
                    ? 'border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/50'
                    : 'border-gray-200 dark:border-[#161D2F] hover:border-slate-700'
                }`}
              >
                {/* Thumbnail Header */}
                <div className={`relative w-full h-28 rounded-xl bg-slate-900 border border-gray-300 dark:border-[#1C263B] overflow-hidden flex flex-col justify-between p-2 ${viewMode === 'list' ? 'md:w-44 md:h-20 shrink-0' : ''}`}>
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
                <div className="space-y-1.5 flex-1">
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

        {sortedProjects.length === 0 && (
          <div className="p-10 text-center bg-white dark:bg-[#0B0F19] rounded-2xl border border-gray-200 dark:border-[#161D2F]">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">No projects in this category</h3>
            <p className="text-xs text-slate-400 mt-1">Try another filter, or sync a repository to add verified projects.</p>
          </div>
        )}
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
              <span className="text-[10px] font-mono text-slate-500">{selectedProject.liveUrl.replace('https://', '')}</span>
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
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:underline text-[11px] truncate"
                  >
                    {selectedProject.repoUrl} ↗
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-slate-400">Live Demo</span>
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:underline text-[11px] truncate"
                  >
                    {selectedProject.liveUrl} ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Buttons Row */}
            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition shadow-lg shadow-blue-600/25 flex items-center space-x-1.5"
              >
                <span>View Live Project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => addToast('Editing is disabled in demo mode — manage this project from your synced repository.', 'info')}
                className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-[#0F1626] hover:bg-gray-100 dark:bg-[#172033] border border-gray-300 dark:border-[#1C263B] text-slate-200 font-semibold text-xs transition flex items-center space-x-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Project</span>
              </button>

              <button
                onClick={() => addToast(`Opening ${selectedProject.title} repository menu...`, 'info')}
                className="p-2 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] text-slate-400 hover:text-white"
              >
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


        {/* SUB-PANELS BREAKDOWN BASED ON ACTIVE SUB-TAB */}
        {activeSubTab === 'Overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel: Project Overview & Key Highlights */}
            <div className="space-y-4">
              <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">Project Overview</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {selectedProject.description} It uses advanced AI algorithms to provide real-time suggestions and identify potential performance bottlenecks.
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
              </div>
            </div>

            {/* Middle Panel: Tech Stack Grid */}
            <div className="space-y-4">
              <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">Tech Stack</h4>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {selectedProject.tech.map((t) => (
                  <div key={t} className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] text-center font-medium text-slate-200">
                    <div className="font-bold text-blue-400">{t}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel: Activity Timeline Stream */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">Activity Timeline</h4>
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
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'Features' && (
          <div className="p-6 rounded-2xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] space-y-4">
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">Key Features & Functional Capabilities</h4>
            <ul className="space-y-2 text-xs text-slate-300 font-mono">
              <li>• Automated AST Syntax Tree Analysis & Vulnerability Guard</li>
              <li>• Real-Time WebSocket Telemetry Engine Sync</li>
              <li>• Multi-Language Code Reviewer (TypeScript, Python, Java 21, Go)</li>
            </ul>
          </div>
        )}

        {activeSubTab === 'Tech Stack' && (
          <div className="p-6 rounded-2xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] space-y-4">
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">Complete Technology Ecosystem</h4>
            <div className="flex flex-wrap gap-2">
              {selectedProject.tech.map((t) => (
                <span key={t} className="px-3 py-1 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-mono font-bold">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {(activeSubTab === 'Architecture' || activeSubTab === 'Screenshots' || activeSubTab === 'Documentation' || activeSubTab === 'Activity' || activeSubTab === 'Analytics') && (
          <div className="p-6 rounded-2xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] text-center space-y-2">
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">{activeSubTab} Telemetry Module</h4>
            <p className="text-xs text-slate-400">Detailed {activeSubTab.toLowerCase()} data for <span className="font-bold text-blue-400">{selectedProject.title}</span>.</p>
          </div>
        )}

      </div>

    </div>
  );
};
