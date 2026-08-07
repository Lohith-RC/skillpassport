import React, { useEffect } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { AuthView } from './components/features/AuthView';
import { Dashboard } from './components/features/Dashboard';
import { SkillPassportView } from './components/features/SkillPassportView';
import { ProjectsView } from './components/features/ProjectsView';
import { TimeCapsuleView } from './components/features/TimeCapsuleView';
import { ChallengesView } from './components/features/ChallengesView';
import { LandingPage } from './components/features/LandingPage';
import { ContributionMatrix } from './components/features/ContributionMatrix';
import { LeetCodeDashboard } from './components/features/LeetCodeDashboard';
import { RecruiterPipeline } from './components/features/RecruiterPipeline';
import { UniversityHub } from './components/features/UniversityHub';
import { InvestorAnalytics } from './components/features/InvestorAnalytics';
import { PlatformSyncModal } from './components/features/PlatformSyncModal';
import { ProjectInspectDrawer } from './components/features/ProjectInspectDrawer';
import { InterviewModal } from './components/features/InterviewModal';
import { Modal } from './components/ui/Modal';
import { ToastContainer } from './components/ui/ToastContainer';
import { useAppStore } from './stores/useAppStore';

export const App: React.FC = () => {
  const { activeTab, setSearchOpen, isDarkMode } = useAppStore();

  // ─── Sync dark/light class on <html> ───────────────────────────────────────
  useEffect(() => {
    const root = document.documentElement;
    isDarkMode ? root.classList.add('dark') : root.classList.remove('dark');
  }, [isDarkMode]);

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
      <ToastContainer />
    </AppLayout>
  );
};

export default App;
