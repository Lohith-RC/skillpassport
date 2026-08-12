import React, { useMemo } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { TabType } from '../../types';
import { SettingsModal } from '../features/SettingsModal';
import { NotificationsDropdown } from '../features/NotificationsDropdown';
import {
  LayoutDashboard,
  UserCheck,
  Clock,
  FolderGit2,
  Rocket,
  Trophy,
  Award,
  Users,
  Search,
  Bell,
  MessageSquare,
  Settings,
  LogOut,
  TrendingUp,
  Code2,
  Sun,
  Moon,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface NavItem {
  key: string; // unique key to avoid React duplicate-key warnings
  id: TabType | 'action';
  label: string;
  Icon: React.FC<{ className?: string }>;
  badge?: string | number;
  badgeVariant?: 'blue' | 'purple' | 'emerald' | 'amber';
  onClick?: () => void;
}

interface AppLayoutProps {
  children: React.ReactNode;
}

// ─────────────────────────────────────────────────────────────────────────────
// AppLayout
// ─────────────────────────────────────────────────────────────────────────────

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const {
    activeTab,
    setActiveTab,
    setSearchOpen,
    isDarkMode,
    toggleTheme,
    addToast,
    setSettingsOpen,
    isNotificationsOpen,
    setNotificationsOpen,
    notifications,
    profile,
    isDemoMode,
  } = useAppStore();

  const unreadCount = useMemo(
    () => notifications.filter((n: { read: boolean }) => !n.read).length,
    [notifications]
  );

  // ── Navigation definitions ─────────────────────────────────────────────────

  const primaryNavItems: NavItem[] = [
    { key: 'ws-dashboard',    id: 'dashboard',  label: 'Dashboard',      Icon: LayoutDashboard },
    { key: 'ws-passport',     id: 'profile',    label: 'Skill Passport', Icon: UserCheck, badge: `${profile.proofScore}%`, badgeVariant: 'blue' },
    { key: 'ws-projects',     id: 'repos',      label: 'Projects',       Icon: FolderGit2 },
    { key: 'ws-contribution', id: 'heatmap',    label: 'Contribution',   Icon: Code2 },
    { key: 'ws-challenges',   id: 'challenges', label: 'Challenges',     Icon: Trophy },
  ];

  const identityNavItems: NavItem[] = [
    { key: 'id-leetcode',     id: 'leetcode',   label: 'LeetCode',        Icon: Rocket, badge: profile.leetcodeSolved || undefined, badgeVariant: 'amber' },
    { key: 'id-experience',   id: 'timecapsule', label: 'Time Capsule',   Icon: Clock },
    { key: 'id-certifications', id: 'university', label: 'Certifications', Icon: Award },
  ];

  const networkNavItems: NavItem[] = [
    { key: 'net-connections', id: 'recruiter',  label: 'Recruiter Portal', Icon: Users },
    { key: 'net-investor',    id: 'investor',   label: 'Investor Hub',    Icon: TrendingUp },
    {
      key: 'net-messages',
      id: 'action',
      label: 'Messages',
      Icon: MessageSquare,
      onClick: () => addToast('Recruiter chat is coming in Stage 2 — invites will land here.', 'info'),
    },
    {
      key: 'net-settings',
      id: 'action',
      label: 'Settings',
      Icon: Settings,
      onClick: () => setSettingsOpen(true),
    },
  ];

  // ── Nav item renderer ──────────────────────────────────────────────────────

  const renderNavItem = (item: NavItem) => {
    const { key, id, label, Icon, badge, badgeVariant, onClick } = item;
    const isActive = id !== 'action' && activeTab === (id as TabType);

    const badgeStyles: Record<string, string> = {
      blue:    'bg-blue-100 dark:bg-[#172033] text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-[#232F48]',
      purple:  'bg-purple-600 text-white',
      emerald: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30',
      amber:   'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30',
    };

    const handleClick = () => {
      if (onClick) onClick();
      else if (id !== 'action') setActiveTab(id as TabType);
    };

    return (
      <button
        key={key}
        onClick={handleClick}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
          isActive
            ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/25'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#13192B]'
        }`}
      >
        <span className="flex items-center space-x-3 min-w-0">
          <Icon className="w-4 h-4 shrink-0" />
          <span className="truncate">{label}</span>
        </span>

        {badge !== undefined && (
          <span
            className={`px-1.5 py-0.5 rounded-full font-mono font-bold text-[9px] shrink-0 ${
              badgeVariant ? badgeStyles[badgeVariant] : badgeStyles.blue
            } ${isActive ? '!bg-white/20 !text-white !border-transparent' : ''}`}
          >
            {badge}
          </span>
        )}
      </button>
    );
  };

  // ── Section label ──────────────────────────────────────────────────────────

  const SectionLabel: React.FC<{ label: string }> = ({ label }) => (
    <p className="px-3.5 pt-3 pb-1 text-[9px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-600">
      {label}
    </p>
  );

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#070A11] text-slate-900 dark:text-white flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <div className="flex flex-1 w-full min-h-screen">

        {/* ================================================================= */}
        {/* LEFT SIDEBAR                                                       */}
        {/* ================================================================= */}
        <aside className="w-64 bg-white dark:bg-[#0B0F19] border-r border-gray-200 dark:border-[#161D2F] flex flex-col justify-between shrink-0 hidden lg:flex overflow-y-auto">
          <div className="p-4 space-y-1">

            {/* Brand Logo */}
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center space-x-3 px-2 py-3 mb-2 w-full text-left hover:opacity-90 transition group"
            >
              <img
                src="/logo.png"
                alt="SkillPassport AI"
                className="w-10 h-10 rounded-xl object-cover shadow-md shadow-blue-600/30 shrink-0 border border-blue-500/30 group-hover:scale-105 transition-transform duration-200"
              />
              <div>
                <h1 className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white leading-tight">
                  SkillPassport <span className="text-blue-600 dark:text-blue-500">AI</span>
                </h1>
                <p className="text-[10px] text-slate-500">One Identity. Endless Opportunities.</p>
              </div>
            </button>

            {/* Primary navigation */}
            <SectionLabel label="Workspace" />
            <nav className="space-y-0.5">{primaryNavItems.map(renderNavItem)}</nav>

            {/* Identity navigation */}
            <SectionLabel label="Identity" />
            <nav className="space-y-0.5">{identityNavItems.map(renderNavItem)}</nav>

            {/* Network navigation */}
            <SectionLabel label="Network" />
            <nav className="space-y-0.5">{networkNavItems.map(renderNavItem)}</nav>
          </div>

          {/* Professional Score Widget */}
          <div className="p-4 shrink-0">
            <div className="p-4 bg-gray-50 dark:bg-[#0F1626] rounded-2xl border border-gray-200 dark:border-[#1C263B] relative overflow-hidden space-y-2">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Professional Score</div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight">{profile.proofScore}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
                  {profile.tier}
                </span>
              </div>
              <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                {profile.totalContributions.toLocaleString()} verified contributions
              </div>

              {/* Sparkline */}
              <svg className="w-full h-8 overflow-visible no-transition" viewBox="0 0 100 30">
                <defs>
                  <linearGradient id="scoreSparkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M 0 25 Q 25 20, 50 15 T 100 5 L 100 30 L 0 30 Z" fill="url(#scoreSparkGrad)" />
                <path d="M 0 25 Q 25 20, 50 15 T 100 5" fill="none" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" />
              </svg>

              {/* Sign out */}
              <button
                onClick={() => {
                  if (window.confirm('Sign out and wipe all local session data?')) {
                    useAppStore.getState().purgeAndResetSession();
                  }
                }}
                className="w-full flex items-center gap-2 pt-1 text-[11px] text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition cursor-pointer"
              >
                <LogOut className="w-3 h-3" />
                <span>Sign out & Wipe Session</span>
              </button>
            </div>
          </div>
        </aside>

        {/* ================================================================= */}
        {/* MAIN CONTENT                                                       */}
        {/* ================================================================= */}
        <div className="flex-1 flex flex-col min-w-0 bg-gray-50 dark:bg-[#070A11]">

          {/* TOP HEADER */}
          <header className="h-16 border-b border-gray-200 dark:border-[#161D2F] px-4 md:px-8 flex items-center justify-between gap-4 bg-white/85 dark:bg-[#090D17]/80 backdrop-blur-md sticky top-0 z-30">

            {/* Global search */}
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search developers, projects, companies…"
                onClick={() => setSearchOpen(true)}
                readOnly
                className="w-full pl-10 pr-14 py-2.5 bg-gray-100 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 placeholder:text-slate-400 dark:placeholder:text-slate-500 cursor-pointer transition"
              />
              <kbd className="absolute right-3 top-2.5 px-1.5 py-0.5 text-[10px] bg-white dark:bg-[#172033] border border-gray-200 dark:border-[#232F48] rounded text-slate-500 dark:text-slate-400 font-mono">
                ⌘K
              </kbd>
            </div>

            {/* Right actions */}
            <div className="flex items-center space-x-3">

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#13192B] border border-gray-200 dark:border-[#1C263B] transition"
                aria-label="Toggle theme"
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#13192B] border border-gray-200 dark:border-[#1C263B] transition"
                  aria-label="View notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white font-mono text-[9px] font-bold flex items-center justify-center border-2 border-white dark:border-[#070A11]">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <NotificationsDropdown />
              </div>

              {/* Messages */}
              <button
                onClick={() => addToast('Recruiter chat is coming in Stage 2 — invites will land here.', 'info')}
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#13192B] border border-gray-200 dark:border-[#1C263B] transition"
                aria-label="Open messages"
              >
                <MessageSquare className="w-4 h-4" />
              </button>

              {/* User profile chip */}
              <button
                onClick={() => setActiveTab('profile')}
                className="flex items-center space-x-2.5 pl-3 border-l border-gray-200 dark:border-[#161D2F] hover:opacity-90 transition"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-xs font-extrabold text-white shadow-sm border border-blue-400/40">
                    {profile.avatar}
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#070A11]" />
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{profile.name}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Verified Developer</div>
                </div>
              </button>
            </div>
          </header>

          {/* Demo mode banner (Java backend offline) */}
          {isDemoMode && (
            <div className="flex items-center gap-2.5 px-4 md:px-8 py-2 bg-amber-500/10 border-b border-amber-500/20 text-amber-700 dark:text-amber-400 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
              <span>Demo mode — backend offline, running on local mock data. Everything you do is simulated and stored in your browser.</span>
            </div>
          )}

          {/* MOBILE NAV — flexible tab strip under the header on screens < lg */}
          <nav className="lg:hidden flex items-center gap-1 px-3 py-2 border-b border-gray-200 dark:border-[#161D2F] bg-white/85 dark:bg-[#090D17]/80 backdrop-blur-md overflow-x-auto no-scrollbar sticky top-16 z-20">
            {[...primaryNavItems, ...identityNavItems, ...networkNavItems].map((item) => (
              <button
                key={`mobile-${item.key}`}
                onClick={() => {
                  if (item.onClick) item.onClick();
                  else if (item.id !== 'action') setActiveTab(item.id as TabType);
                }}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-semibold transition ${
                  item.id !== 'action' && activeTab === (item.id as TabType)
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#13192B]'
                }`}
              >
                <item.Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="px-1.5 py-0.5 rounded-full font-mono font-bold text-[9px] bg-blue-600/15 text-blue-500">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* PAGE BODY */}
          <main className="p-4 md:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
            {children}
          </main>
        </div>
      </div>

      <SettingsModal />
    </div>
  );
};
