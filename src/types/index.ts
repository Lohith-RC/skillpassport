export type TabType = 
  | 'dashboard'
  | 'landing' 
  | 'profile' 
  | 'timecapsule'
  | 'heatmap' 
  | 'repos' 
  | 'leetcode' 
  | 'challenges'
  | 'recruiter' 
  | 'university' 
  | 'investor'
  | 'login'
  | 'signup';

export type UserRole = 'developer' | 'recruiter' | 'university' | 'investor' | 'admin';

export type PlatformId = 
  | 'github' 
  | 'gitlab' 
  | 'leetcode' 
  | 'hackerrank' 
  | 'codeforces' 
  | 'exercism' 
  | 'kaggle' 
  | 'frontendmentor' 
  | 'codecademy' 
  | 'bitbucket';

export interface PlatformConnection {
  id: PlatformId;
  name: string;
  handle: string;
  icon: string;
  color: string;
  connected: boolean;
  contributions: number;
  lastSynced: string;
  badge: string;
  topMetric: string;
}

export interface DeveloperProfile {
  id: string;
  name: string;
  avatar: string;
  headline: string;
  location: string;
  degree: string;
  verified: boolean;
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  proofScore: number;
  totalContributions: number;
  pipelinesPassed: number;
  leetcodeSolved: number;
  platforms: Record<PlatformId, PlatformConnection>;
}

export interface CareerMilestone {
  id: string;
  year: string;
  title: string;
  category: 'REPO' | 'DEPLOYMENT' | 'CONTEST' | 'ACADEMIC' | 'SEAL';
  description: string;
  proofBadge: string;
  shaSeal: string;
  icon: string;
  color: string;
}

export interface Repository {
  id: string;
  name: string;
  fullName: string;
  platform: 'github' | 'gitlab' | 'bitbucket';
  description: string;
  stars: number;
  forks: number;
  commitsCount: number;
  mrsCount?: number;
  buildTime?: string;
  coverage?: number;
  language?: string;
  status: 'LIVE' | 'PASSED' | 'BUILDING';
  tags: string[];
  liveUrl?: string;
  architectureDetails?: string;
  commitHistory: { sha: string; message: string; date: string }[];
}

export interface LeetCodeStats {
  solved: {
    total: number;
    easy: number;
    medium: number;
    hard: number;
  };
  targets: {
    total: number;
    easy: number;
    medium: number;
    hard: number;
  };
  contestRating: number;
  contestPercentile: string;
  badgeName: string;
  topics: { name: string; score: number }[];
  recentSubmissions: {
    id: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    language: string;
    runtime: string;
    date: string;
  }[];
}

export interface PlatformSeededDetail {
  platformId: PlatformId;
  name: string;
  title: string;
  ratingBadge: string;
  metrics: { label: string; value: string | number }[];
  recentActivities: { title: string; subtitle: string; timestamp: string }[];
}

export interface RecruiterCandidate {
  id: string;
  name: string;
  avatar: string;
  headline: string;
  proofScore: number;
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  liveAppsCount: number;
  verifiedInternships: string;
  topProject: string;
  verifiedSkills: string[];
  availability: string;
  location: string;
  shaSeal: string;
}

export interface UniversityStudent {
  id: string;
  usn: string;
  name: string;
  cgpa: number;
  department: string;
  proofScore: number;
  status: 'VERIFIED' | 'PENDING';
  commitsCount: number;
}
