import React, { useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { LandingPage } from './components/features/LandingPage';
import { PassportCard } from './components/features/PassportCard';
import { CareerTimeCapsule } from './components/features/CareerTimeCapsule';
import { ContributionMatrix } from './components/features/ContributionMatrix';
import { ProjectEvidenceCard } from './components/features/ProjectEvidenceCard';
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-bg-base text-slate-900 dark:text-white flex flex-col transition-colors duration-300 selection:bg-purple-600 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-8">
        {activeTab === 'landing' && <LandingPage />}
        {activeTab === 'profile' && <PassportCard />}
        {activeTab === 'timecapsule' && <CareerTimeCapsule />}
        {activeTab === 'heatmap' && <ContributionMatrix />}
        {activeTab === 'repos' && <ProjectEvidenceCard />}
        {activeTab === 'leetcode' && <LeetCodeDashboard />}
        {activeTab === 'recruiter' && <RecruiterPipeline />}
        {activeTab === 'university' && <UniversityHub />}
        {activeTab === 'investor' && <InvestorAnalytics />}
      </main>

      <footer className="py-6 border-t border-slate-200 dark:border-border-subtle text-center text-xs text-slate-500 dark:text-gray-400">
        &copy; 2026 SkillPassport AI. Enterprise 5-Role Digital Identity Ecosystem.
      </footer>

      {/* Interactive Modals, Drawers & Toast Stack */}
      <Modal />
      <PlatformSyncModal />
      <ProjectInspectDrawer />
      <InterviewModal />
      <ToastContainer />
    </div>
  );
};

export default App;
