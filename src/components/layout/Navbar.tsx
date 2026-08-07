import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { TabType } from '../../types';
import { UserCheck, BarChart3, GitBranch, Code, ShieldCheck, Search, Bell, Sun, Moon, Sparkles, Clock, GraduationCap, TrendingUp } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, setSearchOpen, isDarkMode, toggleTheme, setSyncModalOpen, profile } = useAppStore();

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'landing', label: '3D Landing', icon: <Sparkles className="w-4 h-4 mr-1.5" /> },
    { id: 'profile', label: 'Passport', icon: <UserCheck className="w-4 h-4 mr-1.5" /> },
    { id: 'timecapsule', label: 'Time Capsule', icon: <Clock className="w-4 h-4 mr-1.5" /> },
    { id: 'heatmap', label: 'Matrix', icon: <BarChart3 className="w-4 h-4 mr-1.5" /> },
    { id: 'repos', label: 'Repos', icon: <GitBranch className="w-4 h-4 mr-1.5" /> },
    { id: 'leetcode', label: 'LeetCode', icon: <Code className="w-4 h-4 mr-1.5" /> },
    { id: 'recruiter', label: 'Recruiter', icon: <ShieldCheck className="w-4 h-4 mr-1.5" /> },
    { id: 'university', label: 'University', icon: <GraduationCap className="w-4 h-4 mr-1.5" /> },
    { id: 'investor', label: 'Investor', icon: <TrendingUp className="w-4 h-4 mr-1.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full h-16 glass-card rounded-none border-b border-slate-200 dark:border-border-subtle px-4 md:px-8 flex items-center justify-between">
      {/* Brand Logo with Purple Accent */}
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-emerald-500 flex items-center justify-center font-extrabold text-white text-base shadow-lg shadow-purple-500/25">
          SP
        </div>
        <div>
          <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
            SkillPassport <span className="text-purple-600 dark:text-purple-400">AI</span>
          </span>
          <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40">
            5 Ecosystem Roles
          </span>
        </div>
      </div>

      {/* Navigation Tabs with Easing */}
      <nav className="hidden xl:flex items-center space-x-1 bg-slate-100 dark:bg-bg-base/60 p-1 rounded-xl border border-slate-200 dark:border-border-subtle text-xs font-medium overflow-x-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center px-3 py-1.5 rounded-lg transition-all ${
                isActive
                  ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/20'
                  : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-bg-hover'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Header Actions */}
      <div className="flex items-center space-x-3">
        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          title="Toggle Light / Dark Theme"
          className="p-2 rounded-xl text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-bg-hover border border-slate-200 dark:border-border-subtle transition"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-600" />}
        </button>

        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center space-x-2 px-3.5 py-1.5 text-xs font-mono text-slate-600 dark:text-gray-300 bg-slate-100 dark:bg-bg-input border border-slate-200 dark:border-border-default rounded-xl hover:bg-slate-200 dark:hover:bg-bg-hover transition"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span>Search</span>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-bg-base rounded border border-slate-200 dark:border-border-subtle text-slate-500 dark:text-gray-400">
            Cmd K
          </kbd>
        </button>

        <button className="relative p-2 rounded-xl text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-bg-hover transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
        </button>

        <div className="flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-border-subtle">
          <div
            onClick={() => setActiveTab('profile')}
            className="cursor-pointer w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-emerald-500 p-0.5"
          >
            <div className="w-full h-full rounded-xl bg-white dark:bg-bg-card flex items-center justify-center text-xs font-bold text-slate-900 dark:text-white">
              {profile.avatar}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
