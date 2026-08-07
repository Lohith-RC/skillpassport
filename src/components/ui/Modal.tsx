import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Search, X, UserCheck, BarChart3, Code } from 'lucide-react';

export const Modal: React.FC = () => {
  const { isSearchOpen, setSearchOpen, setActiveTab } = useAppStore();

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 dark:bg-black/70 backdrop-blur-md flex items-start justify-center pt-24">
      <div className="glass-card max-w-xl w-full mx-4 rounded-2xl border border-slate-200 dark:border-border-default overflow-hidden shadow-2xl space-y-4 p-4">
        <div className="flex items-center space-x-3 px-3 py-2 bg-slate-100 dark:bg-bg-base rounded-xl border border-slate-200 dark:border-border-subtle">
          <Search className="w-4 h-4 text-slate-400 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Type a command or search repos, skills, challenges..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none font-sans"
            autoFocus
          />
          <button onClick={() => setSearchOpen(false)} className="text-xs text-slate-400 hover:text-slate-900 dark:hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div className="text-slate-500 dark:text-gray-400 font-semibold px-2">Quick Actions</div>
          <button
            onClick={() => {
              setActiveTab('profile');
              setSearchOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-bg-hover flex items-center justify-between text-slate-800 dark:text-gray-200"
          >
            <span className="flex items-center"><UserCheck className="w-4 h-4 mr-2 text-purple-600" />View Unified Profile</span>
            <span className="font-mono text-slate-400 dark:text-gray-500">Cmd + P</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('heatmap');
              setSearchOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-bg-hover flex items-center justify-between text-slate-800 dark:text-gray-200"
          >
            <span className="flex items-center"><BarChart3 className="w-4 h-4 mr-2 text-emerald-600" />View Aggregated Contribution Matrix</span>
            <span className="font-mono text-slate-400 dark:text-gray-500">Cmd + M</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('leetcode');
              setSearchOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-bg-hover flex items-center justify-between text-slate-800 dark:text-gray-200"
          >
            <span className="flex items-center"><Code className="w-4 h-4 mr-2 text-amber-600" />View LeetCode Dashboard</span>
            <span className="font-mono text-slate-400 dark:text-gray-500">Cmd + L</span>
          </button>
        </div>
      </div>
    </div>
  );
};
