import { describe, it, expect } from 'vitest';
import { fetchRepositories, fetchCareerMilestones, fetchUniversityStudents } from '../services/api';

describe('API Service Layer & Fallbacks', () => {
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
});
