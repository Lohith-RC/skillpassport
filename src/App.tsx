import React, { useEffect } from 'react';
import { AppLayout } from './components/layout/AppLayout';
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

  // Sync dark class on html root element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Global Keyboard Shortcuts (Cmd+K)
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

  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen bg-[#070A11] text-white">
        <LandingPage />
        <Modal />
        <ToastContainer />
      </div>
    );
  }

  return (
    <AppLayout>
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'profile' && <SkillPassportView />}
      {activeTab === 'timecapsule' && <TimeCapsuleView />}
      {activeTab === 'heatmap' && <ContributionMatrix />}
      {activeTab === 'repos' && <ProjectsView />}
      {activeTab === 'challenges' && <ChallengesView />}
      {activeTab === 'leetcode' && <LeetCodeDashboard />}
      {activeTab === 'recruiter' && <RecruiterPipeline />}
      {activeTab === 'university' && <UniversityHub />}
      {activeTab === 'investor' && <InvestorAnalytics />}

      {/* Global Interactive Modals & Drawers */}
      <Modal />
      <PlatformSyncModal />
      <ProjectInspectDrawer />
      <InterviewModal />
      <ToastContainer />
    </AppLayout>
  );
};

export default App;
