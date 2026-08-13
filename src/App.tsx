import React, { useEffect, useRef, lazy, Suspense, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppLayout } from './components/layout/AppLayout';
import { useAppStore } from './stores/useAppStore';
import { LandingPage } from './components/features/LandingPage';  // regular import — entry point
import { Modal } from './components/ui/Modal';
import { ToastContainer } from './components/ui/ToastContainer';
import { apiAuth } from './services/api';
import { DashboardSkeleton } from './components/skeletons/DashboardSkeleton';
import { GenericSkeleton } from './components/skeletons/GenericSkeleton';

// ─── Lazy-loaded feature views for bundle optimization & code splitting
const Dashboard = lazy(() => import('./components/features/Dashboard').then(m => ({ default: m.Dashboard })));
const SkillPassportView = lazy(() => import('./components/features/SkillPassportView').then(m => ({ default: m.SkillPassportView })));
const ProjectsView = lazy(() => import('./components/features/ProjectsView').then(m => ({ default: m.ProjectsView })));
const TimeCapsuleView = lazy(() => import('./components/features/TimeCapsuleView').then(m => ({ default: m.TimeCapsuleView })));
const ChallengesView = lazy(() => import('./components/features/ChallengesView').then(m => ({ default: m.ChallengesView })));
const ContributionMatrix = lazy(() => import('./components/features/ContributionMatrix').then(m => ({ default: m.ContributionMatrix })));
const LeetCodeDashboard = lazy(() => import('./components/features/LeetCodeDashboard').then(m => ({ default: m.LeetCodeDashboard })));
const RecruiterPipeline = lazy(() => import('./components/features/RecruiterPipeline').then(m => ({ default: m.RecruiterPipeline })));
const UniversityHub = lazy(() => import('./components/features/UniversityHub').then(m => ({ default: m.UniversityHub })));
const InvestorAnalytics = lazy(() => import('./components/features/InvestorAnalytics').then(m => ({ default: m.InvestorAnalytics })));
const PlatformSyncModal = lazy(() => import('./components/features/PlatformSyncModal').then(m => ({ default: m.PlatformSyncModal })));
const ProjectInspectDrawer = lazy(() => import('./components/features/ProjectInspectDrawer').then(m => ({ default: m.ProjectInspectDrawer })));
const InterviewModal = lazy(() => import('./components/features/InterviewModal').then(m => ({ default: m.InterviewModal })));

// ─── Full-screen unauthenticated views (no AppLayout shell)
const AuthView = lazy(() => import('./components/features/AuthView').then(m => ({ default: m.AuthView })));

// ─── Protected tab set — requires user to be authenticated
const PROTECTED_TABS = new Set(['dashboard', 'profile', 'timecapsule', 'heatmap', 'repos', 'leetcode', 'challenges', 'recruiter', 'university', 'investor']);

// ─── Skeleton selector: show a relevant skeleton per view ─────────────────
const getSkeletonForTab = (tab: string) => {
  switch (tab) {
    case 'dashboard': return <DashboardSkeleton />;
    default: return <GenericSkeleton />;
  }
};

// ─── Page transition wrapper ──────────────────────────────────────────────
const PageTransition: React.FC<{ children: React.ReactNode; tabKey: string }> = ({ children, tabKey }) => (
  <motion.div
    key={tabKey}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

// ─── View with skeleton-aware Suspense ────────────────────────────────────
const ViewWithSkeleton: React.FC<{ tab: string; children: React.ReactNode }> = ({ tab, children }) => (
  <Suspense fallback={getSkeletonForTab(tab)}>
    {children}
  </Suspense>
);

export const App: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isDarkMode,
    isAuthenticated,
    pendingTab,
    isSearchOpen,
    setSearchOpen,
    addToast,
    purgeAndResetSession,
    setPendingTab,
  } = useAppStore();

  // ─── Sync dark/light class on <html> ───────────────────────────────────────
  useEffect(() => {
    const root = document.documentElement;
    isDarkMode ? root.classList.add('dark') : root.classList.remove('dark');
  }, [isDarkMode]);

  // ─── Initialize from URL hash (deep-link support on cold load) ────────────
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && hash !== 'landing') {
      useAppStore.getState().setActiveTab(hash as any);
    } else if (window.location.hash !== '#landing') {
      window.history.replaceState(null, '', '#landing');
    }
  }, []);

  // ─── Sync activeTab with URL Hash for Browser Back/Forward navigation ──────
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash !== activeTab) {
        useAppStore.getState().setActiveTab(hash as any);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeTab]);

  // ─── Persist activeTab in history (replaceState — no duplicate history spam) ─
  useEffect(() => {
    if (activeTab && window.location.hash !== `#${activeTab}`) {
      window.history.replaceState(null, '', `#${activeTab}`);
    }
  }, [activeTab]);

  // ─── Global keyboard shortcuts ────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchOpen]);

  // ─── Remember deep-linked protected tabs & close global UI while logged out ─
  useEffect(() => {
    if (!isAuthenticated) {
      setSearchOpen(false);
      if (PROTECTED_TABS.has(activeTab as any) && activeTab !== pendingTab) {
        setPendingTab(activeTab as any);
      }
    }
  }, [isAuthenticated, activeTab, pendingTab, setPendingTab, setSearchOpen]);

  // ─── Boot-time token validation ────────────────────────────────────────────
  // A stored token is only "authenticated" if the backend still accepts it.
  // The demo fallback token is exempt (offline demo mode).
  const validationRan = useRef(false);
  useEffect(() => {
    if (!isAuthenticated || validationRan.current) return;
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token || token === 'demo-token') return;

    validationRan.current = true;
    let cancelled = false;

    (async () => {
      try {
        const data = await apiAuth.getCurrentUser();
        if (cancelled) return;
        // /auth/me mints a fresh token — persist the rotation in the SAME
        // storage the original session used (don't silently promote a
        // sessionStorage "don't remember me" session to persistent storage).
        if (localStorage.getItem('token')) {
          localStorage.setItem('token', data.token);
        } else {
          sessionStorage.setItem('token', data.token);
        }
        useAppStore.getState().initializeUserSession({ ...data });
      } catch {
        if (cancelled) return;
        useAppStore.getState().purgeAndResetSession();
        addToast('Your session has expired. Please sign in again.', 'warning');
      }
    })();

    return () => { cancelled = true; };
  }, [isAuthenticated, addToast]);

  // ─── View switcher with tab key for AnimatePresence ───────────────────────
  const renderAuthenticatedView = () => {
    const viewMap: Record<string, React.ReactNode> = {
      dashboard:   <Dashboard />,
      profile:     <SkillPassportView />,
      timecapsule: <TimeCapsuleView />,
      heatmap:     <ContributionMatrix />,
      repos:       <ProjectsView />,
      challenges:  <ChallengesView />,
      leetcode:    <LeetCodeDashboard />,
      recruiter:   <RecruiterPipeline />,
      university:  <UniversityHub />,
      investor:    <InvestorAnalytics />,
      login:       <AuthView initialMode="login" />,
      signup:      <AuthView initialMode="signup" />,
    };

    const currentView = viewMap[activeTab];
    if (!currentView) return null;

    return (
      <ViewWithSkeleton tab={activeTab}>
        {currentView}
      </ViewWithSkeleton>
    );
  };

  // ─── If user is not authenticated, gate protected tabs ─────────────────────
  if (!isAuthenticated) {
    const isAuthPage = activeTab === 'login' || activeTab === 'signup';
    const effectiveTab = PROTECTED_TABS.has(activeTab as any)
      ? activeTab
      : pendingTab || (isAuthPage ? activeTab : 'landing');

    if (effectiveTab === 'landing') {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#070A11] text-slate-900 dark:text-white">
          <LandingPage />
          <PlatformSyncModal />
          <Modal />
          <ToastContainer />
        </div>
      );
    }

    const initialMode = effectiveTab === 'signup' ? 'signup' : 'login';
    return (
      <Suspense fallback={<GenericSkeleton />}>
        <AuthView initialMode={initialMode} />
        <PlatformSyncModal />
        <ToastContainer />
      </Suspense>
    );
  }

  // ─── Authenticated views wrapped in AppLayout with page transitions ──────
  return (
    <AppLayout>
      <AnimatePresence mode="sync">
        <PageTransition tabKey={activeTab}>
          {renderAuthenticatedView()}
        </PageTransition>
      </AnimatePresence>

      {/* Global interactive modals & drawers */}
      <Modal />
      <PlatformSyncModal />
      <ProjectInspectDrawer />
      <InterviewModal />
      <ToastContainer />
    </AppLayout>
  );
};

export default App;