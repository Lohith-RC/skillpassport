import { describe, it, expect, beforeEach } from 'vitest';
import { createIsolatedUserSpace, purgeSessionData, DEFAULT_PREDEFINED_PROFILE } from '../utils/sessionManager';

describe('sessionManager Utility', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it('provides a pre-populated default profile for demo viewing', () => {
    expect(DEFAULT_PREDEFINED_PROFILE.name).toBe('Rahul Sharma');
    expect(DEFAULT_PREDEFINED_PROFILE.proofScore).toBe(88);
    expect(DEFAULT_PREDEFINED_PROFILE.tier).toBe('GOLD');
  });

  it('creates an isolated 0-state user space for a newly registered user', () => {
    const newUser = {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'DEVELOPER',
      usn: '1VT22CS999',
    };

    const isolatedProfile = createIsolatedUserSpace(newUser);

    expect(isolatedProfile.name).toBe('Alice Johnson');
    expect(isolatedProfile.proofScore).toBe(0);
    expect(isolatedProfile.totalContributions).toBe(0);
    expect(isolatedProfile.tier).toBe('BRONZE');
    expect(isolatedProfile.platforms.github.connected).toBe(false);
  });

  it('purges session storage and local auth keys on purgeSessionData', () => {
    localStorage.setItem('token', 'fake-jwt-token');
    sessionStorage.setItem('sp_active_session_id', 'test_session');

    purgeSessionData();

    expect(localStorage.getItem('token')).toBeNull();
    expect(sessionStorage.getItem('sp_active_session_id')).toBeNull();
  });
});
