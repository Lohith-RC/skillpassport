import React, { useMemo, useCallback, useId } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../stores/useAppStore';
import { TabType } from '../../types';
import { SettingsModal } from '../features/SettingsModal';
import { NotificationsDropdown } from '../features/NotificationsDropdown';
import { Kbd } from '../ui/Kbd';
import { Avatar } from '../ui/Avatar';
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

// ─── Lazy imports for hover-prefetching ─────────────────────────────────────
const viewImports: Record<string, () => Promise<any>> = {
  dashboard: () => import('../features/Dashboard'),
  profile: () => import('../features/SkillPassportView'),
  repos: () => import('../features/ProjectsView'),
  heatmap: () => import('../features/ContributionMatrix'),
  challenges: () => import('../features/ChallengesView'),
  leetcode: () => import('../features/LeetCodeDashboard'),
  timecapsule: () => import('../features/TimeCapsuleView'),
  university: () => import('../features/UniversityHub'),
  recruiter: () => import('../features/RecruiterPipeline'),
  investor: () => import('../features/InvestorAnalytics'),
};

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface NavItem {
  key: string;
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
  const sparklineId = useId();

  const unreadCount = useMemo(
    () => notifications.filter((n: { read: boolean }) => !n.read).length,
    [notifications],
  );

  // ── Navigation definitions ──────────────────────────────────────────────

  const primaryNavItems: NavItem[] = [
    { key: 'ws-dashboard', id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
    { key: 'ws-passport', id: 'profile', label: 'Skill Passport', Icon: UserCheck, badge: `${profile.proofScore}%`, badgeVariant: 'blue' },
    { key: 'ws-projects', id: 'repos', label: 'Projects', Icon: FolderGit2 },
    { key: 'ws-contribution', id: 'heatmap', label: 'Contribution', Icon: Code2 },
    { key: 'ws-challenges', id: 'challenges', label: 'Challenges', Icon: Trophy },
  ];

  const identityNavItems: NavItem[] = [
    { key: 'id-leetcode', id: 'leetcode', label: 'LeetCode', Icon: Rocket, badge: profile.leetcodeSolved || undefined, badgeVariant: 'amber' },
    { key: 'id-experience', id: 'timecapsule', label: 'Time Capsule', Icon: Clock },
    { key: 'id-certifications', id: 'university', label: 'Certifications', Icon: Award },
  ];

  const networkNavItems: NavItem[] = [
    { key: 'net-connections', id: 'recruiter', label: 'Recruiter Portal', Icon: Users },
    { key: 'net-investor', id: 'investor', label: 'Investor Hub', Icon: TrendingUp },
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

  // Every navigable destination, in order — used by the responsive mobile nav
  // so Identity & Network stay reachable below the `lg` breakpoint.
  const allNavItems: NavItem[] = [...primaryNavItems, ...identityNavItems, ...networkNavItems];

  const prefetchView = useCallback((tabId: string) => {
    if (tabId !== 'action' && viewImports[tabId]) {
      viewImports[tabId]().catch(() => {}); // silent — just warming the cache
    }
  }, []);

  // ── Nav item renderer ───────────────────────────────────────────────────

  const renderNavItem = (item: NavItem) => {
    const { key, id, label, Icon, badge, onClick } = item;
    const isActive = id !== 'action' && activeTab === (id as TabType);

    const handleClick = () => {
      if (onClick) onClick();
      else if (id !== 'action') setActiveTab(id as TabType);
    };

    return (
      <button
        key={key}
        onClick={handleClick}
        onMouseEnter={() => prefetchView(id)}
        aria-current={isActive ? 'page' : undefined}
        className={cnNav(isActive)}
      >
        {isActive && (
          <motion.span
            layoutId="sidebar-active-pill"
            className="absolute inset-0 rounded-xl bg-interactive border border-hairline"
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
          />
        )}
        {isActive && (
          <motion.span
            layoutId="sidebar-active-bar"
            className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[3px] rounded-full bg-accent"
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
          />
        )}

        <span className="relative z-10 flex items-center space-x-3 min-w-0">
          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-accent' : ''}`} />
          <span className={`truncate text-xs ${isActive ? 'text-fg font-semibold' : 'text-fg-muted'}`}>
            {label}
          </span>
        </span>

        {badge !== undefined && (
          <span
            className={`relative z-10 px-1.5 py-0.5 rounded-md font-mono font-medium text-2xs shrink-0 tabular ${
              isActive
                ? 'bg-accent text-accent-fg'
                : 'bg-interactive text-fg-muted border border-hairline'
            }`}
          >
            {badge}
          </span>
        )}
      </button>
    );
  };

  const SectionLabel: React.FC<{ label: string }> = ({ label }) => (
    <p className="eyebrow px-3 pt-4 pb-1.5">{label}</p>
  );

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-canvas text-fg flex flex-col font-sans selection:bg-accent selection:text-accent-fg">
      <div className="flex flex-1 w-full min-h-screen">

        {/* ================================================================ */}
        {/* LEFT SIDEBAR                                                     */}
        {/* ================================================================ */}
        <aside className="w-64 bg-sidebar border-r border-hairline flex flex-col justify-between shrink-0 hidden lg:flex overflow-y-auto">
          <div className="p-3 space-y-0.5">
            {/* Brand */}
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center space-x-3 px-2 py-3 mb-1 w-full text-left rounded-xl hover:bg-interactive transition-colors group"
            >
              <img
                src="/logo.png"
                alt=""
                className="w-9 h-9 rounded-lg object-cover border border-hairline shrink-0 group-hover:scale-105 transition-transform duration-200"
              />
              <span className="min-w-0">
                <span className="block font-bold text-sm tracking-tight text-fg leading-tight">
                  SkillPassport <span className="text-fg-muted font-medium">AI</span>
                </span>
                <span className="block text-2xs text-fg-subtle">Verified Developer Identity</span>
              </span>
            </button>

            <SectionLabel label="Workspace" />
            <nav className="space-y-0.5">{primaryNavItems.map(renderNavItem)}</nav>

            <SectionLabel label="Identity" />
            <nav className="space-y-0.5">{identityNavItems.map(renderNavItem)}</nav>

            <SectionLabel label="Network" />
            <nav className="space-y-0.5">{networkNavItems.map(renderNavItem)}</nav>
          </div>

          {/* Score widget */}
          <div className="p-3 shrink-0">
            <div className="p-4 rounded-2xl bg-inset border border-hairline space-y-2">
              <div className="eyebrow">Professional Score</div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-semibold font-mono tabular text-fg tracking-tight">
                  {profile.proofScore}
                </span>
                <span className="px-1.5 py-0.5 rounded text-2xs font-mono font-medium bg-accent-soft text-accent">
                  {profile.tier}
                </span>
              </div>
              <div className="text-2xs font-medium text-success tabular">
                {profile.totalContributions.toLocaleString()} verified contributions
              </div>

              <svg className="w-full h-8 overflow-visible no-transition" viewBox="0 0 100 30" aria-hidden="true">
                <defs>
                  <linearGradient id={`scoreSparkGrad-${sparklineId}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M 0 25 Q 25 20, 50 15 T 100 5 L 100 30 L 0 30 Z" fill={`url(#scoreSparkGrad-${sparklineId})`} />
                <path d="M 0 25 Q 25 20, 50 15 T 100 5" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" />
              </svg>

              <button
                onClick={() => useAppStore.getState().purgeAndResetSession()}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-fg-muted hover:text-danger hover:bg-danger-soft transition-colors"
              >
                <span className="flex items-center space-x-2.5">
                  <LogOut className="w-4 h-4 shrink-0" />
                  <span>Sign Out</span>
                </span>
                <span className="text-2xs font-mono opacity-70">Reset</span>
              </button>
            </div>
          </div>
        </aside>

        {/* ================================================================ */}
        {/* MAIN CONTENT                                                     */}
        {/* ================================================================ */}
        <div className="flex-1 flex flex-col min-w-0 bg-canvas">

          {/* TOP HEADER */}
          <header className="h-14 md:h-16 border-b border-hairline px-4 md:px-6 flex items-center justify-between gap-4 bg-header backdrop-blur-md sticky top-0 z-30">
            {/* Global search */}
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-fg-subtle absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Open command palette"
                className="w-full h-10 pl-10 pr-20 bg-inset border border-hairline rounded-xl text-xs text-fg-muted hover:border-strong focus:outline-none focus:border-focusring transition-colors text-left cursor-pointer"
              >
                Search views, candidates, repos…
              </button>
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </span>
            </div>

            {/* Right actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-lg text-fg-muted hover:text-fg hover:bg-interactive border border-hairline transition-colors flex items-center justify-center"
                aria-label="Toggle theme"
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!isNotificationsOpen)}
                  className="relative w-9 h-9 rounded-lg text-fg-muted hover:text-fg hover:bg-interactive border border-hairline transition-colors flex items-center justify-center"
                  aria-label="View notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-accent text-accent-fg font-mono text-2xs font-semibold flex items-center justify-center border-2 border-canvas">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <NotificationsDropdown />
              </div>

              <button
                onClick={() => addToast('Recruiter chat is coming in Stage 2 — invites will land here.', 'info')}
                className="hidden sm:flex w-9 h-9 rounded-lg text-fg-muted hover:text-fg hover:bg-interactive border border-hairline transition-colors items-center justify-center"
                aria-label="Open messages"
              >
                <MessageSquare className="w-4 h-4" />
              </button>

              {/* Profile chip */}
              <div className="flex items-center space-x-2 pl-2 sm:pl-3 border-l border-hairline">
                <button
                  onClick={() => setActiveTab('profile')}
                  className="flex items-center space-x-2.5 hover:bg-interactive rounded-lg px-1.5 py-1 transition-colors text-left"
                  title="View Profile"
                >
                  <Avatar name={profile.name} size="sm" />
                  <span className="hidden sm:block leading-tight">
                    <span className="block text-xs font-semibold text-fg">{profile.name}</span>
                    <span className="block text-2xs text-fg-subtle">Verified Developer</span>
                  </span>
                </button>
                <button
                  onClick={() => useAppStore.getState().purgeAndResetSession()}
                  className="w-9 h-9 rounded-lg text-fg-muted hover:text-danger hover:bg-danger-soft border border-hairline transition-colors flex items-center justify-center"
                  title="Sign out"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </header>

          {/* Demo mode banner (Java backend offline) */}
          {isDemoMode && (
            <div className="flex items-center gap-2.5 px-4 md:px-6 py-2 bg-warning-soft border-b border-warning-border text-warning text-2xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse shrink-0" />
              <span>
                Demo mode — backend offline, running on local mock data. Everything you do is
                simulated and stored in your browser.
              </span>
            </div>
          )}

          {/* MOBILE NAV — horizontal strip under the header below `md` */}
          <nav
            className="md:hidden flex items-center gap-1 px-3 py-2 border-b border-hairline bg-header backdrop-blur-md overflow-x-auto no-scrollbar sticky top-14 z-20"
            aria-label="Primary"
          >
            {allNavItems.map((item) => (
              <button
                key={`mobile-${item.key}`}
                onClick={() => {
                  if (item.onClick) item.onClick();
                  else if (item.id !== 'action') setActiveTab(item.id as TabType);
                }}
                onMouseEnter={() => prefetchView(item.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-2xs font-medium transition-colors ${
                  item.id !== 'action' && activeTab === (item.id as TabType)
                    ? 'bg-interactive text-fg border border-hairline'
                    : 'text-fg-muted hover:text-fg hover:bg-interactive border border-transparent'
                }`}
              >
                <item.Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* PAGE BODY */}
          <main className="p-4 md:p-6 space-y-6 max-w-[1600px] w-full mx-auto">
            {children}
          </main>
        </div>
      </div>

      {/* MOBILE BOTTOM TAB BAR — md+ below lg */}
      <nav className="hidden md:flex lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-header backdrop-blur-xl border-t border-hairline px-2 py-1 safe-area-bottom">
        <div className="flex items-center justify-start gap-1 w-full overflow-x-auto no-scrollbar">
          {allNavItems.map((item) => {
            const isActive = item.id !== 'action' && activeTab === (item.id as TabType);
            return (
              <button
                key={`bottom-${item.key}`}
                onClick={() => {
                  if (item.onClick) item.onClick();
                  else if (item.id !== 'action') setActiveTab(item.id as TabType);
                }}
                onMouseEnter={() => prefetchView(item.id)}
                className="relative flex flex-col items-center gap-0.5 py-1.5 px-3 shrink-0"
              >
                {isActive && (
                  <motion.span
                    layoutId="mobile-tab-indicator"
                    className="absolute -top-1 w-8 h-0.5 bg-accent rounded-full"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <item.Icon className={`w-5 h-5 ${isActive ? 'text-accent' : 'text-fg-muted'}`} />
                <span className={`text-micro font-medium ${isActive ? 'text-accent' : 'text-fg-subtle'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <SettingsModal />
    </div>
  );
};

/** Shared nav-item surface: neutral at rest, raised + accent when active. */
function cnNav(isActive: boolean) {
  return [
    'relative w-full flex items-center justify-between px-3 py-2.5 rounded-xl',
    'transition-colors duration-150 ease-out',
    isActive ? 'text-fg' : 'text-fg-muted hover:text-fg hover:bg-interactive',
  ].join(' ');
}
