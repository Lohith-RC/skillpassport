import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { useAppStore } from './stores/useAppStore';
import { LandingPage } from './components/features/LandingPage';  // regular import — entry point
import { Modal } from './components/ui/Modal';
import { ToastContainer } from './components/ui/ToastContainer';
import { apiAuth } from './services/api';

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

// ─── ViewFallback component
const ViewFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
      <span className="text-xs font-mono text-slate-400">Loading module...</span>
    </div>
  </div>
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

  // ─── If user is not authenticated, gate protected tabs ─────────────────────
  if (!isAuthenticated) {
    const isAuthPage = activeTab === 'login' || activeTab === 'signup';
    const effectiveTab = PROTECTED_TABS.has(activeTab as any)
      ? activeTab
      : pendingTab || (isAuthPage ? activeTab : 'landing');

    if (effectiveTab === 'landing') {
      // Render LandingPage directly (no Suspense needed — it's a regular import)
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
      <Suspense fallback={<ViewFallback />}>
        <AuthView initialMode={initialMode} />
        <PlatformSyncModal />
        <ToastContainer />
      </Suspense>
    );
  }

  // ─── Authenticated views wrapped in AppLayout shell ───────────────────────
  return (
    <AppLayout>
      <Suspense fallback={<ViewFallback />}>
        {activeTab === 'dashboard'   && <Dashboard />}
        {activeTab === 'profile'     && <SkillPassportView />}
        {activeTab === 'timecapsule' && <TimeCapsuleView />}
        {activeTab === 'heatmap'     && <ContributionMatrix />}
        {activeTab === 'repos'       && <ProjectsView />}
        {activeTab === 'challenges'  && <ChallengesView />}
        {activeTab === 'leetcode'    && <LeetCodeDashboard />}
        {activeTab === 'recruiter'   && <RecruiterPipeline />}
        {activeTab === 'university'  && <UniversityHub />}
        {activeTab === 'investor'    && <InvestorAnalytics />}
        {activeTab === 'login' && <AuthView initialMode="login" />}
        {activeTab === 'signup' && <AuthView initialMode="signup" />}

        {/* Global interactive modals & drawers */}
        <Modal />
        <PlatformSyncModal />
        <ProjectInspectDrawer />
        <InterviewModal />
      </Suspense>
      <ToastContainer />
    </AppLayout>
  );
};

export default App;