import { create } from 'zustand';
import { TabType, DeveloperProfile, PlatformId, RecruiterCandidate, Repository } from '../types';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppState {
  activeTab: TabType;
  isSearchOpen: boolean;
  isDarkMode: boolean;
  isSyncModalOpen: boolean;
  isInterviewModalOpen: boolean;
  inspectingRepo: Repository | null;
  selectedCandidate: RecruiterCandidate | null;
  heatmapFilter: 'all' | 'github' | 'gitlab' | 'leetcode' | 'hackerrank' | 'codeforces';
  toasts: Toast[];
  profile: DeveloperProfile;

  // Actions
  setActiveTab: (tab: TabType) => void;
  setSearchOpen: (open: boolean) => void;
  toggleTheme: () => void;
  setSyncModalOpen: (open: boolean) => void;
  setInterviewModalOpen: (open: boolean, candidate?: RecruiterCandidate | null) => void;
  setInspectingRepo: (repo: Repository | null) => void;
  setSelectedCandidate: (candidate: RecruiterCandidate | null) => void;
  setHeatmapFilter: (filter: 'all' | 'github' | 'gitlab' | 'leetcode' | 'hackerrank' | 'codeforces') => void;
  togglePlatformConnection: (platformId: PlatformId) => void;
  addToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeTab: 'dashboard',
  isSearchOpen: false,
  isDarkMode: true,
  isSyncModalOpen: false,
  isInterviewModalOpen: false,
  inspectingRepo: null,
  selectedCandidate: null,
  heatmapFilter: 'all',
  toasts: [],
  profile: {
    id: 'dev_8921',
    name: 'Rahul Sharma',
    avatar: 'RS',
    headline: 'Full Stack Developer | Senior Software Engineering Student @ VTU, Bengaluru',
    location: 'Bengaluru, India',
    degree: 'Computer Science & Engineering',
    verified: true,
    tier: 'GOLD',
    proofScore: 88,
    totalContributions: 1482,
    pipelinesPassed: 312,
    leetcodeSolved: 264,
    platforms: {
      github: { id: 'github', name: 'GitHub', handle: 'github/rahulsharma', icon: 'fa-brands fa-github', color: '#10B981', connected: true, contributions: 840, lastSynced: '5m ago', badge: '840 Commits', topMetric: '184 Stars' },
      gitlab: { id: 'gitlab', name: 'GitLab', handle: 'gitlab/rahul_dev', icon: 'fa-brands fa-gitlab', color: '#F97316', connected: true, contributions: 412, lastSynced: '12m ago', badge: '412 MRs', topMetric: '99.1% Success' },
      leetcode: { id: 'leetcode', name: 'LeetCode', handle: 'leetcode/rahul_coder', icon: 'fa-solid fa-code', color: '#F59E0B', connected: true, contributions: 230, lastSynced: '1h ago', badge: '264 Solved', topMetric: '1,942 Knight' },
      hackerrank: { id: 'hackerrank', name: 'HackerRank', handle: 'hackerrank/rahul_hr', icon: 'fa-brands fa-hackerrank', color: '#2563EB', connected: true, contributions: 145, lastSynced: '2h ago', badge: '145 Challenges', topMetric: '6 Stars PS' },
      codeforces: { id: 'codeforces', name: 'Codeforces', handle: 'codeforces/rahul_cf', icon: 'fa-solid fa-terminal', color: '#EF4444', connected: true, contributions: 98, lastSynced: '1d ago', badge: '98 Contests', topMetric: '1,640 Rating' },
      exercism: { id: 'exercism', name: 'Exercism', handle: 'exercism/rahul_ex', icon: 'fa-solid fa-graduation-cap', color: '#8B5CF6', connected: true, contributions: 64, lastSynced: '2d ago', badge: '64 Solutions', topMetric: 'Go/Rust/TS' },
      kaggle: { id: 'kaggle', name: 'Kaggle', handle: 'kaggle/rahul_data', icon: 'fa-brands fa-kaggle', color: '#06B6D4', connected: true, contributions: 52, lastSynced: '3d ago', badge: '52 Notebooks', topMetric: '2 Silver Medals' },
      frontendmentor: { id: 'frontendmentor', name: 'Frontend Mentor', handle: 'frontendmentor/rahul_fm', icon: 'fa-solid fa-layer-group', color: '#EC4899', connected: true, contributions: 38, lastSynced: '4d ago', badge: '38 UI Matches', topMetric: '98% Accuracy' },
      codecademy: { id: 'codecademy', name: 'Codecademy', handle: 'codecademy/rahul_ca', icon: 'fa-solid fa-laptop-code', color: '#3B82F6', connected: false, contributions: 0, lastSynced: 'Never', badge: 'Pro Paths', topMetric: 'Full-Stack Cert' },
      bitbucket: { id: 'bitbucket', name: 'Bitbucket', handle: 'bitbucket/rahul_bb', icon: 'fa-brands fa-bitbucket', color: '#0052CC', connected: true, contributions: 84, lastSynced: '1d ago', badge: '84 Commits', topMetric: '28 Approved PRs' },
    },
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setSyncModalOpen: (open) => set({ isSyncModalOpen: open }),
  setInterviewModalOpen: (open, candidate = null) => set({ isInterviewModalOpen: open, selectedCandidate: candidate }),
  setInspectingRepo: (repo) => set({ inspectingRepo: repo }),
  setSelectedCandidate: (candidate) => set({ selectedCandidate: candidate }),
  setHeatmapFilter: (filter) => set({ heatmapFilter: filter }),

  togglePlatformConnection: (platformId) => set((state) => {
    const platform = state.profile.platforms[platformId];
    const isNowConnected = !platform.connected;
    const updated = {
      ...state.profile.platforms,
      [platformId]: {
        ...platform,
        connected: isNowConnected,
        lastSynced: isNowConnected ? 'Just now' : 'Never',
      },
    };
    return {
      profile: {
        ...state.profile,
        platforms: updated,
      },
    };
  }),

  addToast: (message, type = 'success') => set((state) => ({
    toasts: [...state.toasts, { id: Math.random().toString(), message, type }],
  })),

  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter((t) => t.id !== id),
  })),
}));
