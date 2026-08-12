import { DeveloperProfile } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Session Isolation Architecture
// ─────────────────────────────────────────────────────────────────────────────

export const DEFAULT_PREDEFINED_PROFILE: DeveloperProfile = {
  id: 'dev_default_rahul',
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
};

/**
 * Generates an isolated session data space for a new user with 0 stats.
 */
export const createIsolatedUserSpace = (user: { name: string; email?: string; role?: string; usn?: string }): DeveloperProfile => {
  const initials = user.name
    ? user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
    : 'SP';

  const sessionId = `sp_user_${Math.random().toString(36).substring(2, 9)}`;

  const profile: DeveloperProfile = {
    id: sessionId,
    name: user.name,
    avatar: initials || 'SP',
    headline: `Verified ${user.role || 'Developer'} | SkillPassport Member`,
    location: 'Newly Registered Session',
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

  // Save to Session Storage under unique namespace
  try {
    sessionStorage.setItem(`sp_session_${sessionId}`, JSON.stringify(profile));
    sessionStorage.setItem('sp_active_session_id', sessionId);
  } catch (e) {
    console.warn('Session Storage storage unavailable');
  }

  return profile;
};

/**
 * Saves (or creates) the active session's profile slot so edits survive refresh.
 * Also mirrors to localStorage so the profile survives in NEW tabs (sessionStorage
 * is per-tab and silently discards edits otherwise).
 */
export const saveSessionProfile = (profile: DeveloperProfile): void => {
  try {
    let sessionId = sessionStorage.getItem('sp_active_session_id');
    if (!sessionId) {
      sessionId = `sp_user_${Math.random().toString(36).substring(2, 9)}`;
      sessionStorage.setItem('sp_active_session_id', sessionId);
    }
    sessionStorage.setItem(`sp_session_${sessionId}`, JSON.stringify(profile));
    localStorage.setItem('sp_profile_backup', JSON.stringify(profile));
  } catch (e) {
    console.warn('Session Storage storage unavailable');
  }
};

/**
 * Completely purges and resets user session data to prevent cross-contamination.
 * Only removes app-owned keys — never calls sessionStorage.clear().
 */
export const purgeSessionData = (): void => {
  try {
    const activeSessionId = sessionStorage.getItem('sp_active_session_id');
    if (activeSessionId) {
      sessionStorage.removeItem(`sp_session_${activeSessionId}`);
      sessionStorage.removeItem('sp_active_session_id');
    }
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('sp_profile_backup');
    localStorage.removeItem('sp_notification_prefs');
  } catch (e) {
    console.warn('Error purging session storage');
  }
};
