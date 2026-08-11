import React, { useEffect, lazy, Suspense } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { AuthView } from './components/features/AuthView';
import { LandingPage } from './components/features/LandingPage';
import { Modal } from './components/ui/Modal';
import { ToastContainer } from './components/ui/ToastContainer';
import { useAppStore } from './stores/useAppStore';

// Lazy-loaded feature views for bundle optimization & code splitting
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

const ViewFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
      <span className="text-xs font-mono text-slate-400">Loading module...</span>
    </div>
  </div>
);

export const App: React.FC = () => {
  const { activeTab, setSearchOpen, isDarkMode } = useAppStore();

  // ─── Sync dark/light class on <html> ───────────────────────────────────────
  useEffect(() => {
    const root = document.documentElement;
    isDarkMode ? root.classList.add('dark') : root.classList.remove('dark');
  }, [isDarkMode]);

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

  useEffect(() => {
    if (activeTab) {
      const currentHash = window.location.hash.replace('#', '');
      if (currentHash !== activeTab) {
        window.history.replaceState(null, '', `#${activeTab}`);
      }
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

  // ─── Full-screen unauthenticated views (no AppLayout shell) ───────────────
  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#070A11] text-slate-900 dark:text-white">
        <LandingPage />
        <Modal />
        <ToastContainer />
      </div>
    );
  }

  if (activeTab === 'login') {
    return (
      <>
        <AuthView initialMode="login" />
        <ToastContainer />
      </>
    );
  }

  if (activeTab === 'signup') {
    return (
      <>
        <AuthView initialMode="signup" />
        <ToastContainer />
      </>
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
