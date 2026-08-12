import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchRepositories, fetchCareerMilestones, fetchUniversityStudents, apiAuth } from '../services/api';

describe('API Service Layer & Fallbacks', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    localStorage.clear();
    sessionStorage.clear();
  });

  it('gracefully returns mock repositories when backend is unreachable', async () => {
    const repos = await fetchRepositories();
    expect(Array.isArray(repos)).toBe(true);
    expect(repos.length).toBeGreaterThan(0);
    expect(repos[0].name).toBe('skillpassport-identity-engine');
  });

  it('gracefully returns mock career milestones when backend is unreachable', async () => {
    const milestones = await fetchCareerMilestones();
    expect(Array.isArray(milestones)).toBe(true);
    expect(milestones.length).toBeGreaterThan(0);
    expect(milestones[0].title).toBe('First Repository & Open Source Commit');
  });

  it('gracefully returns mock university students when backend is unreachable', async () => {
    const students = await fetchUniversityStudents();
    expect(Array.isArray(students)).toBe(true);
    expect(students.length).toBe(15);
  });

  it('falls back to a demo session when the backend returns 5xx through a proxy/gateway', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 502,
      json: async () => ({}),
    }));

    const user = await apiAuth.login('test@demo.com', 'whatever');

    expect(user.isDemo).toBe(true);
    expect(user.token).toBe('demo-token');
    expect(user.email).toBe('test@demo.com');
    expect(localStorage.getItem('token')).toBe('demo-token');
  });

  it('surfaces real 4xx auth errors instead of silently entering demo mode', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Invalid email or password.' }),
    }));

    await expect(apiAuth.login('test@demo.com', 'wrong-pass')).rejects.toThrow('Invalid email or password.');
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('persists the JWT for a successful login', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ token: 'real-jwt', name: 'Rahul Sharma', email: 'demo@skillpassport.ai', role: 'DEVELOPER' }),
    }));

    const user = await apiAuth.login('demo@skillpassport.ai', 'DemoPass!2026');

    expect(user.isDemo).toBeUndefined();
    expect(user.token).toBe('real-jwt');
    expect(localStorage.getItem('token')).toBe('real-jwt');
  });

  it('enters demo mode with an isolated new-account space on register 5xx', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    }));

    const user = await apiAuth.register('Kavya Nair', 'kavya@demo.com', 'Password@123', 'UNIVERSITY', '1VT22CS145');

    expect(user.isNewUser).toBe(true);
    expect(user.isDemo).toBe(true);
    expect(user.role).toBe('UNIVERSITY');
    expect(user.name).toBe('Kavya Nair');
  });
});
