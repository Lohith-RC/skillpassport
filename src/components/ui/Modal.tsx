import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { TabType } from '../../types';
import { mockCandidates, mockRepositories } from '../../services/api';
import { Search, X, UserCheck, BarChart3, Code, GitBranch, ShieldCheck, GraduationCap, TrendingUp, Sparkles, Clock } from 'lucide-react';

export const Modal: React.FC = () => {
  const { isSearchOpen, setSearchOpen, setActiveTab, profile, setInspectingRepo, setInterviewModalOpen } = useAppStore();
  const [query, setQuery] = useState('');

  // Close modal on Escape key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setSearchOpen(false);
        setQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  if (!isSearchOpen) return null;

  const views: { id: TabType; label: string; icon: React.ReactNode; shortcut: string }[] = [
    { id: 'landing', label: '3D WebGL Landing Canvas', icon: <Sparkles className="w-4 h-4 text-purple-600" />, shortcut: 'Cmd 1' },
    { id: 'profile', label: 'Developer Passport Profile', icon: <UserCheck className="w-4 h-4 text-purple-600" />, shortcut: 'Cmd 2' },
    { id: 'timecapsule', label: 'Career Proof Time Capsule', icon: <Clock className="w-4 h-4 text-emerald-600" />, shortcut: 'Cmd 3' },
    { id: 'heatmap', label: 'Multi-Platform Heatmap Matrix', icon: <BarChart3 className="w-4 h-4 text-emerald-600" />, shortcut: 'Cmd 4' },
    { id: 'repos', label: 'Repository CI/CD Telemetry Vault', icon: <GitBranch className="w-4 h-4 text-blue-600" />, shortcut: 'Cmd 5' },
    { id: 'leetcode', label: 'LeetCode Contest Dashboard', icon: <Code className="w-4 h-4 text-amber-600" />, shortcut: 'Cmd 6' },
    { id: 'recruiter', label: 'Enterprise Recruiter Sourcing Portal', icon: <ShieldCheck className="w-4 h-4 text-purple-600" />, shortcut: 'Cmd 7' },
    { id: 'university', label: 'University Academic Registrar Hub', icon: <GraduationCap className="w-4 h-4 text-emerald-600" />, shortcut: 'Cmd 8' },
    { id: 'investor', label: 'Investor Portfolio & Talent Analytics', icon: <TrendingUp className="w-4 h-4 text-indigo-600" />, shortcut: 'Cmd 9' },
  ];

  const filteredViews = views.filter(v => v.label.toLowerCase().includes(query.toLowerCase()));
  const filteredCandidates = mockCandidates.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    c.verifiedSkills.some(s => s.toLowerCase().includes(query.toLowerCase()))
  );
  const filteredRepos = mockRepositories.filter(r => 
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    (r.language || r.tags.join(' ')).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md flex items-start justify-center pt-16 md:pt-24 px-4 animate-in fade-in duration-200">
      <div className="glass-card max-w-2xl w-full rounded-2xl border border-slate-200 dark:border-border-default overflow-hidden shadow-2xl space-y-4 p-4 max-h-[80vh] flex flex-col">
        
        {/* Search Header */}
        <div className="flex items-center space-x-3 px-4 py-3 bg-slate-100 dark:bg-bg-base rounded-xl border border-slate-200 dark:border-border-subtle shrink-0">
          <Search className="w-5 h-5 text-purple-600" />
          <input
            type="text"
            placeholder="Search views, candidates, repos, skills (e.g. Next.js, Java, LeetCode)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none font-sans placeholder:text-slate-400 dark:placeholder:text-gray-500"
            autoFocus
          />
          <button 
            onClick={() => {
              setSearchOpen(false);
              setQuery('');
            }} 
            className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-bg-hover transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results Container */}
        <div className="overflow-y-auto space-y-4 pr-1 flex-1">
          {/* Quick Ecosystem Views */}
          {filteredViews.length > 0 && (
            <div className="space-y-1">
              <div className="text-[11px] uppercase tracking-wider font-mono font-bold text-slate-400 dark:text-gray-400 px-2">
                Ecosystem Views ({filteredViews.length})
              </div>
              {filteredViews.map((view) => (
                <button
                  key={view.id}
                  onClick={() => {
                    setActiveTab(view.id);
                    setSearchOpen(false);
                    setQuery('');
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-bg-hover flex items-center justify-between text-slate-800 dark:text-gray-200 transition group"
                >
                  <span className="flex items-center font-medium text-xs">
                    {view.icon}
                    <span className="ml-2.5 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">{view.label}</span>
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 dark:text-gray-500 bg-slate-200/60 dark:bg-bg-base px-2 py-0.5 rounded border border-slate-200 dark:border-border-subtle">
                    {view.shortcut}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Verified Candidates */}
          {filteredCandidates.length > 0 && (
            <div className="space-y-1">
              <div className="text-[11px] uppercase tracking-wider font-mono font-bold text-slate-400 dark:text-gray-400 px-2 pt-2 border-t border-slate-200 dark:border-border-subtle">
                Verified Candidates ({filteredCandidates.length})
              </div>
              {filteredCandidates.map((cand) => (
                <button
                  key={cand.id}
                  onClick={() => {
                    setActiveTab('recruiter');
                    setInterviewModalOpen(true, cand);
                    setSearchOpen(false);
                    setQuery('');
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-bg-hover flex items-center justify-between text-slate-800 dark:text-gray-200 transition group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-7 h-7 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                      {cand.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-xs group-hover:text-purple-600 dark:group-hover:text-purple-400 transition flex items-center">
                        {cand.name}
                        <span className="ml-2 px-1.5 py-0.2 rounded text-[10px] bg-purple-100 dark:bg-purple-950/60 text-purple-600 font-mono">
                          {cand.proofScore}% Proof Score
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-gray-400 font-sans">{cand.headline}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 group-hover:underline">
                    Schedule &rarr;
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Repositories */}
          {filteredRepos.length > 0 && (
            <div className="space-y-1">
              <div className="text-[11px] uppercase tracking-wider font-mono font-bold text-slate-400 dark:text-gray-400 px-2 pt-2 border-t border-slate-200 dark:border-border-subtle">
                Verified Repositories ({filteredRepos.length})
              </div>
              {filteredRepos.map((repo) => (
                <button
                  key={repo.id}
                  onClick={() => {
                    setActiveTab('repos');
                    setInspectingRepo(repo);
                    setSearchOpen(false);
                    setQuery('');
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-bg-hover flex items-center justify-between text-slate-800 dark:text-gray-200 transition group"
                >
                  <div className="flex items-center space-x-2.5">
                    <GitBranch className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-bold text-xs group-hover:text-blue-600 dark:group-hover:text-blue-400 transition font-mono">
                        {repo.name}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-gray-400">{repo.description}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {repo.coverage || 95}% Coverage
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer Shortcut Legend */}
        <div className="pt-2 border-t border-slate-200 dark:border-border-subtle flex items-center justify-between text-[11px] text-slate-400 dark:text-gray-500 shrink-0 font-mono">
          <span>Tip: Use <kbd className="px-1 rounded bg-slate-200 dark:bg-bg-base text-slate-600 dark:text-gray-300">Cmd + K</kbd> anywhere</span>
          <span>Profile: {profile.name} (Gold Tier {profile.proofScore}%)</span>
        </div>
      </div>
    </div>
  );
};

