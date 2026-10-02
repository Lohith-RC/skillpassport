import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAppStore } from '../stores/useAppStore';
import { apiAuth, mockCandidates, mockRepositories } from '../services/api';

describe('SkillPassport UI & Button Action Suite', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    useAppStore.setState({
      activeTab: 'landing',
      isDarkMode: true,
      isAuthenticated: false,
      isDemoMode: false,
      isSyncModalOpen: false,
      isInterviewModalOpen: false,
      isSettingsOpen: false,
      isNotificationsOpen: false,
      isSearchOpen: false,
      toasts: [],
      notifications: [],
      inspectingRepo: null,
      selectedCandidate: null,
    });
  });

  it('handles navigation tab changes flawlessly', () => {
    const tabs = [
      'landing', 'dashboard', 'profile', 'timecapsule', 
      'heatmap', 'repos', 'leetcode', 'challenges', 
      'recruiter', 'university', 'investor', 'login', 'signup'
    ] as const;

    tabs.forEach(tab => {
      useAppStore.getState().setActiveTab(tab);
      expect(useAppStore.getState().activeTab).toBe(tab);
    });
  });

  it('handles user authentication login and logout buttons', () => {
    // Demo Login button action
    const user = apiAuth.createDemoSession('test@skillpassport.ai', true, false);
    useAppStore.getState().initializeUserSession(user);

    expect(useAppStore.getState().isAuthenticated).toBe(true);
    expect(useAppStore.getState().activeTab).toBe('dashboard');

    // Signout / Logout button action
    useAppStore.getState().purgeAndResetSession();
    expect(useAppStore.getState().isAuthenticated).toBe(false);
    expect(useAppStore.getState().activeTab).toBe('landing');
  });

  it('handles user registration button action', () => {
    const newUser = apiAuth.createDemoSession('new@skillpassport.ai', true, true, { name: 'Alice Smith', usn: '1VT22CS999' });
    useAppStore.getState().initializeUserSession(newUser);

    expect(useAppStore.getState().isAuthenticated).toBe(true);
    expect(useAppStore.getState().profile.name).toBe('Alice Smith');
  });

  it('handles modal toggle buttons (sync, interview, settings, notifications, search)', () => {
    const store = useAppStore.getState();

    // Platform Sync Modal button
    store.setSyncModalOpen(true);
    expect(useAppStore.getState().isSyncModalOpen).toBe(true);
    store.setSyncModalOpen(false);
    expect(useAppStore.getState().isSyncModalOpen).toBe(false);

    // Interview Modal button
    store.setInterviewModalOpen(true, mockCandidates[0]);
    expect(useAppStore.getState().isInterviewModalOpen).toBe(true);
    expect(useAppStore.getState().selectedCandidate?.name).toBe(mockCandidates[0].name);
    store.setInterviewModalOpen(false);
    expect(useAppStore.getState().isInterviewModalOpen).toBe(false);

    // Settings Modal button
    store.setSettingsOpen(true);
    expect(useAppStore.getState().isSettingsOpen).toBe(true);
    store.setSettingsOpen(false);
    expect(useAppStore.getState().isSettingsOpen).toBe(false);

    // Notifications Dropdown button
    store.setNotificationsOpen(true);
    expect(useAppStore.getState().isNotificationsOpen).toBe(true);
    store.setNotificationsOpen(false);
    expect(useAppStore.getState().isNotificationsOpen).toBe(false);

    // Global Command Search button
    store.setSearchOpen(true);
    expect(useAppStore.getState().isSearchOpen).toBe(true);
    store.setSearchOpen(false);
    expect(useAppStore.getState().isSearchOpen).toBe(false);
  });

  it('handles platform connection toggle buttons', () => {
    const platformId = 'github';
    const initial = useAppStore.getState().profile.platforms[platformId].connected;

    useAppStore.getState().togglePlatformConnection(platformId);
    expect(useAppStore.getState().profile.platforms[platformId].connected).toBe(!initial);

    useAppStore.getState().togglePlatformConnection(platformId);
    expect(useAppStore.getState().profile.platforms[platformId].connected).toBe(initial);
  });

  it('handles project drawer inspect buttons', () => {
    const repo = mockRepositories[0];
    useAppStore.getState().setInspectingRepo(repo);
    expect(useAppStore.getState().inspectingRepo?.id).toBe(repo.id);

    useAppStore.getState().setInspectingRepo(null);
    expect(useAppStore.getState().inspectingRepo).toBeNull();
  });

  it('handles notifications mark read and clear buttons', () => {
    useAppStore.setState({
      notifications: [
        { id: 'n1', title: 'Test Notif', time: '1m ago', read: false, type: 'security' }
      ]
    });

    useAppStore.getState().markNotificationRead('n1');
    expect(useAppStore.getState().notifications[0].read).toBe(true);

    useAppStore.getState().clearNotifications();
    expect(useAppStore.getState().notifications.length).toBe(0);
  });

  it('handles profile update and toast removal buttons', () => {
    useAppStore.getState().updateProfile({ headline: 'Senior Staff Engineer' });
    expect(useAppStore.getState().profile.headline).toBe('Senior Staff Engineer');

    useAppStore.getState().addToast('Success toast', 'success');
    const toast = useAppStore.getState().toasts[0];
    expect(toast.message).toBe('Success toast');

    useAppStore.getState().removeToast(toast.id);
    expect(useAppStore.getState().toasts.length).toBe(0);
  });
});
