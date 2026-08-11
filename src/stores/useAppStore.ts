import { create } from 'zustand';
import { TabType, DeveloperProfile, PlatformId, RecruiterCandidate, Repository } from '../types';
import { DEFAULT_PREDEFINED_PROFILE, createIsolatedUserSpace, purgeSessionData, saveSessionProfile } from '../utils/sessionManager';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface NotificationItem {
  id: string;
  title: string;
  time: string;
  read: boolean;
  type: 'security' | 'interview' | 'deployment' | 'badge';
}

interface AppState {
  activeTab: TabType;
  isSearchOpen: boolean;
  isDarkMode: boolean;
  isSyncModalOpen: boolean;
  isInterviewModalOpen: boolean;
  isSettingsOpen: boolean;
  isNotificationsOpen: boolean;
  isTelemetryActive: boolean;
  inspectingRepo: Repository | null;
  selectedCandidate: RecruiterCandidate | null;
  heatmapFilter: 'all' | 'github' | 'gitlab' | 'leetcode' | 'hackerrank' | 'codeforces';
  toasts: Toast[];
  notifications: NotificationItem[];
  profile: DeveloperProfile;
  isDemoMode: boolean;

  // Actions
  purgeAndResetSession: () => void;
  initializeUserSession: (user: any) => void;
  setActiveTab: (tab: TabType) => void;
  setSearchOpen: (open: boolean) => void;
  toggleTheme: () => void;
  setSyncModalOpen: (open: boolean) => void;
  setInterviewModalOpen: (open: boolean, candidate?: RecruiterCandidate | null) => void;
  setSettingsOpen: (open: boolean) => void;
  setNotificationsOpen: (open: boolean) => void;
  toggleTelemetry: () => void;
  setInspectingRepo: (repo: Repository | null) => void;
  setSelectedCandidate: (candidate: RecruiterCandidate | null) => void;
  setHeatmapFilter: (filter: 'all' | 'github' | 'gitlab' | 'leetcode' | 'hackerrank' | 'codeforces') => void;
  togglePlatformConnection: (platformId: PlatformId) => void;
  updateProfile: (partial: Partial<DeveloperProfile>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  addToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

export const createFreshDeveloperProfile = (user: { name: string; email?: string; role?: string; usn?: string }): DeveloperProfile => {
  const initials = user.name
    ? user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
    : 'SP';

  return {
    id: `dev_${Math.floor(1000 + Math.random() * 9000)}`,
    name: user.name,
    avatar: initials || 'SP',
    headline: `Verified ${user.role || 'Developer'} | SkillPassport Community Member`,
    location: 'Newly Registered Member',
    degree: user.usn ? `Student USN: ${user.usn}` : 'Software Engineering',
    verified: false,
    tier: 'BRONZE',
    proofScore: 0,
    totalContributions: 0,
    pipelinesPassed: 0,
    leetcodeSolved: 0,
    platforms: {
      github: { id: 'github', name: 'GitHub', handle: `github/${user.name.toLowerCase().replace(/\s+/g, '')}`, icon: 'fa-brands fa-github', color: '#10B981', connected: false, contributions: 0, lastSynced: 'Not connected', badge: '0 Commits', topMetric: '0 Stars' },
      gitlab: { id: 'gitlab', name: 'GitLab', handle: `gitlab/${user.name.toLowerCase().replace(/\s+/g, '')}`, icon: 'fa-brands fa-gitlab', color: '#F97316', connected: false, contributions: 0, lastSynced: 'Not connected', badge: '0 MRs', topMetric: '0% Success' },
      leetcode: { id: 'leetcode', name: 'LeetCode', handle: `leetcode/${user.name.toLowerCase().replace(/\s+/g, '')}`, icon: 'fa-solid fa-code', color: '#F59E0B', connected: false, contributions: 0, lastSynced: 'Not connected', badge: '0 Solved', topMetric: '0 Rating' },
      hackerrank: { id: 'hackerrank', name: 'HackerRank', handle: `hackerrank/${user.name.toLowerCase().replace(/\s+/g, '')}`, icon: 'fa-brands fa-hackerrank', color: '#2563EB', connected: false, contributions: 0, lastSynced: 'Not connected', badge: '0 Challenges', topMetric: '0 Stars' },
      codeforces: { id: 'codeforces', name: 'Codeforces', handle: `codeforces/${user.name.toLowerCase().replace(/\s+/g, '')}`, icon: 'fa-solid fa-terminal', color: '#EF4444', connected: false, contributions: 0, lastSynced: 'Not connected', badge: '0 Contests', topMetric: '0 Rating' },
      exercism: { id: 'exercism', name: 'Exercism', handle: `exercism/${user.name.toLowerCase().replace(/\s+/g, '')}`, icon: 'fa-solid fa-graduation-cap', color: '#8B5CF6', connected: false, contributions: 0, lastSynced: 'Not connected', badge: '0 Solutions', topMetric: '0 Languages' },
      kaggle: { id: 'kaggle', name: 'Kaggle', handle: `kaggle/${user.name.toLowerCase().replace(/\s+/g, '')}`, icon: 'fa-brands fa-kaggle', color: '#06B6D4', connected: false, contributions: 0, lastSynced: 'Not connected', badge: '0 Notebooks', topMetric: '0 Medals' },
      frontendmentor: { id: 'frontendmentor', name: 'Frontend Mentor', handle: `frontendmentor/${user.name.toLowerCase().replace(/\s+/g, '')}`, icon: 'fa-solid fa-layer-group', color: '#EC4899', connected: false, contributions: 0, lastSynced: 'Not connected', badge: '0 Challenges', topMetric: '0% Accuracy' },
      codecademy: { id: 'codecademy', name: 'Codecademy', handle: `codecademy/${user.name.toLowerCase().replace(/\s+/g, '')}`, icon: 'fa-solid fa-laptop-code', color: '#3B82F6', connected: false, contributions: 0, lastSynced: 'Not connected', badge: '0 Courses', topMetric: '0 Certs' },
      bitbucket: { id: 'bitbucket', name: 'Bitbucket', handle: `bitbucket/${user.name.toLowerCase().replace(/\s+/g, '')}`, icon: 'fa-brands fa-bitbucket', color: '#0052CC', connected: false, contributions: 0, lastSynced: 'Not connected', badge: '0 Commits', topMetric: '0 PRs' },
    },
  };
};

export const useAppStore = create<AppState>((set) => ({
  activeTab: 'landing',
  isSearchOpen: false,
  isDarkMode: true,
  isSyncModalOpen: false,
  isInterviewModalOpen: false,
  isSettingsOpen: false,
  isNotificationsOpen: false,
  isTelemetryActive: true,
  isDemoMode: false,
  inspectingRepo: null,
  selectedCandidate: null,
  heatmapFilter: 'all',
  toasts: [],
  notifications: (() => {
    try {
      const stored = localStorage.getItem('user');
      if (stored && JSON.parse(stored).isNewUser) {
        return [];
      }
    } catch (e) {}
    return [
      { id: 'n1', title: 'SHA-256 Verified Seal generated for AI Code Reviewer', time: '10m ago', read: false, type: 'security' },
      { id: 'n2', title: 'TechNova requested interview slot for Senior Fullstack Role', time: '1h ago', read: false, type: 'interview' },
      { id: 'n3', title: 'Live Telemetry Runner #482 deployed to AWS ap-south-1', time: '3h ago', read: false, type: 'deployment' },
      { id: 'n4', title: 'Earned Knight Tier Badge on LeetCode Contest #392', time: '1d ago', read: true, type: 'badge' },
    ];
  })(),
  profile: (() => {
    try {
      const activeSessionId = sessionStorage.getItem('sp_active_session_id');
      if (activeSessionId) {
        const sessionData = sessionStorage.getItem(`sp_session_${activeSessionId}`);
        if (sessionData) {
          return JSON.parse(sessionData);
        }
      }
      const stored = localStorage.getItem('user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.isNewUser) {
          return createIsolatedUserSpace(parsed);
        }
        if (parsed.name) {
          const initials = parsed.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
          return {
            ...DEFAULT_PREDEFINED_PROFILE,
            name: parsed.name,
            avatar: initials || 'SP',
            proofScore: parsed.proofScore || 85,
          };
        }
      }
    } catch (e) {
      // ignore JSON parse error
    }
    return DEFAULT_PREDEFINED_PROFILE;
  })(),

  purgeAndResetSession: () => {
    purgeSessionData();
    set({
      activeTab: 'landing',
      profile: DEFAULT_PREDEFINED_PROFILE,
      notifications: [],
      isDemoMode: false,
      toasts: [{ id: Math.random().toString(), message: 'Session data wiped clean. Reset to default environment.', type: 'info' }],
    });
  },

  initializeUserSession: (userData: any) => {
    // New users get an isolated, zeroed-out identity space; returning/demo
    // users resume the seeded demo persona (Rahul Sharma) with their own name.
    const isolatedProfile = userData.isNewUser
      ? createIsolatedUserSpace(userData)
      : {
          ...DEFAULT_PREDEFINED_PROFILE,
          name: userData?.name || DEFAULT_PREDEFINED_PROFILE.name,
        };
    saveSessionProfile(isolatedProfile);
    set({
      profile: isolatedProfile,
      notifications: [],
      activeTab: 'dashboard',
      isDemoMode: Boolean(userData?.isDemo),
    });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setSyncModalOpen: (open) => set({ isSyncModalOpen: open }),
  setInterviewModalOpen: (open, candidate = null) => set({ isInterviewModalOpen: open, selectedCandidate: candidate }),
  setSettingsOpen: (open) => set({ isSettingsOpen: open }),
  setNotificationsOpen: (open) => set({ isNotificationsOpen: open }),
  toggleTelemetry: () => set((state) => ({ isTelemetryActive: !state.isTelemetryActive })),
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
    const nextProfile = {
      ...state.profile,
      platforms: updated,
    };
    saveSessionProfile(nextProfile);
    return { profile: nextProfile };
  }),

  updateProfile: (partial) => set((state) => {
    const nextProfile = { ...state.profile, ...partial };
    saveSessionProfile(nextProfile);
    return { profile: nextProfile };
  }),

  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),

  clearNotifications: () => set({ notifications: [] }),

  addToast: (message, type = 'success') => set((state) => ({
    toasts: [...state.toasts, { id: Math.random().toString(), message, type }],
  })),

  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter((t) => t.id !== id),
  })),
}));
