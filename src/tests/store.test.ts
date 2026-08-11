import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../stores/useAppStore';

describe('Zustand App Store', () => {
  beforeEach(() => {
    useAppStore.setState({
      activeTab: 'landing',
      isDarkMode: true,
      toasts: [],
      notifications: [],
    });
  });

  it('updates active tab correctly', () => {
    useAppStore.getState().setActiveTab('dashboard');
    expect(useAppStore.getState().activeTab).toBe('dashboard');
  });

  it('toggles theme between dark and light', () => {
    expect(useAppStore.getState().isDarkMode).toBe(true);
    useAppStore.getState().toggleTheme();
    expect(useAppStore.getState().isDarkMode).toBe(false);
  });

  it('adds and removes toast messages', () => {
    useAppStore.getState().addToast('Test toast', 'success');
    let toasts = useAppStore.getState().toasts;
    expect(toasts.length).toBe(1);
    expect(toasts[0].message).toBe('Test toast');

    const id = toasts[0].id;
    useAppStore.getState().removeToast(id);
    expect(useAppStore.getState().toasts.length).toBe(0);
  });

  it('initializes a fresh user session', () => {
    useAppStore.getState().initializeUserSession({
      name: 'Bob Dev',
      email: 'bob@dev.com',
    });

    const state = useAppStore.getState();
    expect(state.profile.name).toBe('Bob Dev');
    expect(state.profile.proofScore).toBe(0);
    expect(state.activeTab).toBe('dashboard');
  });
});
