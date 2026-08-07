import { Repository, LeetCodeStats, PlatformSeededDetail, RecruiterCandidate, CareerMilestone, UniversityStudent } from '../types';

export const mockCareerMilestones: CareerMilestone[] = [
  {
    id: 'm_1',
    year: '2023',
    title: 'First Repository & Open Source Commit',
    category: 'REPO',
    description: 'Initialized skillpassport-core engine on GitHub with automated Jest test suite.',
    proofBadge: 'GitHub Verified',
    shaSeal: 'SHA-256: 8f92a1c4b78912e...e45a901',
    icon: 'fa-brands fa-github',
    color: '#10B981',
  },
  {
    id: 'm_2',
    year: '2024',
    title: 'First Production Vercel Deployment',
    category: 'DEPLOYMENT',
    description: 'Shipped high-throughput payment microservice gateway using Spring Boot 3 & Redis.',
    proofBadge: 'PASSED 🟢 (38s Build)',
    shaSeal: 'SHA-256: c412a89b9018f92...a9018f9',
    icon: 'fa-solid fa-cloud-arrow-up',
    color: '#2563EB',
  },
  {
    id: 'm_3',
    year: '2025',
    title: 'LeetCode 1,942 Knight Rating Achieved',
    category: 'CONTEST',
    description: 'Ranked in the top 3.8% globally across 98 algorithmic competition rounds.',
    proofBadge: 'Knight Badge (Top 3.8%)',
    shaSeal: 'SHA-256: 78912e45a9018f9...2a1c4b7',
    icon: 'fa-solid fa-trophy',
    color: '#F59E0B',
  },
  {
    id: 'm_4',
    year: '2026',
    title: 'VTU Academic Registrar CGPA Verification Seal',
    category: 'ACADEMIC',
    description: 'Official digital degree transcript seal verified with 9.42 CGPA in Computer Science.',
    proofBadge: 'VTU Registrar Signed',
    shaSeal: 'SHA-256: a12e459018f92a1...c4b7891',
    icon: 'fa-solid fa-graduation-cap',
    color: '#7C3AED',
  },
];

export const mockUniversityStudents: UniversityStudent[] = [
  { id: 's_1', usn: '1VT22CS084', name: 'Rahul Sharma', cgpa: 9.42, department: 'Computer Science', proofScore: 88, status: 'VERIFIED', commitsCount: 840 },
  { id: 's_2', usn: '1VT22CS102', name: 'Priya Patel', cgpa: 9.18, department: 'Computer Science', proofScore: 84, status: 'VERIFIED', commitsCount: 620 },
  { id: 's_3', usn: '1VT22IS042', name: 'Arjun Mehta', cgpa: 8.86, department: 'Information Science', proofScore: 79, status: 'VERIFIED', commitsCount: 450 },
  { id: 's_4', usn: '1VT22EC018', name: 'Sneha Reddy', cgpa: 9.05, department: 'Electronics', proofScore: 76, status: 'PENDING', commitsCount: 310 },
];

export const mockRepositories: Repository[] = [
  {
    id: 'repo_1',
    name: 'skillpassport-identity-engine',
    fullName: 'github.com/rahulsharma/skillpassport-core',
    platform: 'github',
    description: 'Next.js 14 WebGL operating system providing zero-knowledge cryptographic proof verification for developer identity.',
    stars: 184,
    forks: 42,
    commitsCount: 284,
    status: 'LIVE',
    tags: ['Next.js 14', 'TypeScript', 'Three.js', 'Tailwind', 'Zod'],
    liveUrl: 'https://skillpassport.ai',
    architectureDetails: 'Micro-frontend architecture powered by Zustand state tree and WebGL Three.js canvas.',
    commitHistory: [
      { sha: 'e89f412a', message: 'feat(auth): add zero-knowledge proof verification route', date: '2 hours ago' },
      { sha: 'c412a89b', message: 'perf(matrix): optimize 52-week heatmap canvas rendering', date: 'Yesterday' },
      { sha: 'a9018f92', message: 'fix(theme): support light luminance mode with purple accents', date: '3 days ago' },
    ],
  },
  {
    id: 'repo_2',
    name: 'distributed-raft-consensus',
    fullName: 'gitlab.com/rahul_dev/raft-go',
    platform: 'gitlab',
    description: 'High-throughput fault-tolerant distributed consensus algorithm engine written in Go with Docker Swarm orchestration.',
    stars: 96,
    forks: 18,
    commitsCount: 168,
    mrsCount: 42,
    buildTime: '38s',
    status: 'PASSED',
    tags: ['Golang 1.22', 'Docker', 'gRPC', 'GitLab Runner'],
    liveUrl: 'https://gitlab.com/rahul_dev/raft-go',
    architectureDetails: 'Leader election and log replication with persistent WAL logging and gRPC transport.',
    commitHistory: [
      { sha: '78912e45', message: 'feat(consensus): implement leader heartbeat failover mechanism', date: '1 day ago' },
      { sha: '5a9018f9', message: 'ci(gitlab): add runner pipeline automated benchmark spec', date: '4 days ago' },
    ],
  },
  {
    id: 'repo_3',
    name: 'enterprise-payment-gateway',
    fullName: 'bitbucket.org/rahul_bb/payments-spring',
    platform: 'bitbucket',
    description: 'Production Spring Boot 3.2 payment gateway with Redis rate limiting, idempotent webhooks, and Stripe integration.',
    stars: 54,
    forks: 12,
    commitsCount: 142,
    buildTime: '52s',
    status: 'LIVE',
    tags: ['Java 21', 'Spring Boot 3', 'Redis', 'PostgreSQL', 'Stripe'],
    liveUrl: 'https://bitbucket.org/rahul_bb/payments-spring',
    architectureDetails: 'Event-driven payment processing pipeline using Kafka topics and PostgreSQL ACID transactions.',
    commitHistory: [
      { sha: 'b78912e4', message: 'feat(stripe): add webhook signature validation filter', date: '5 days ago' },
    ],
  },
];

export const mockLeetCodeStats: LeetCodeStats = {
  solved: { total: 264, easy: 142, medium: 98, hard: 24 },
  targets: { total: 450, easy: 180, medium: 120, hard: 40 },
  contestRating: 1942,
  contestPercentile: 'Top 3.8%',
  badgeName: 'Knight Badge',
  topics: [
    { name: 'Dynamic Programming', score: 92 },
    { name: 'Graph Theory', score: 88 },
    { name: 'Trees & Heaps', score: 95 },
    { name: 'System Design', score: 84 },
    { name: 'Segment Trees', score: 78 },
    { name: 'Bit Manipulation', score: 90 },
  ],
  recentSubmissions: [
    { id: 'sub_1', title: '146. LRU Cache', difficulty: 'Medium', language: 'Java 21', runtime: '12ms (Beats 98.4%)', date: 'Today' },
    { id: 'sub_2', title: '42. Trapping Rain Water', difficulty: 'Hard', language: 'Go 1.22', runtime: '4ms (Beats 96.1%)', date: 'Yesterday' },
    { id: 'sub_3', title: '200. Number of Islands', difficulty: 'Medium', language: 'TypeScript', runtime: '68ms (Beats 94.2%)', date: '2 days ago' },
    { id: 'sub_4', title: '295. Find Median from Data Stream', difficulty: 'Hard', language: 'C++', runtime: '84ms (Beats 99.0%)', date: '3 days ago' },
  ],
};

export const mock10PlatformsSeededDetails: PlatformSeededDetail[] = [
  {
    platformId: 'github',
    name: 'GitHub',
    title: 'Core Code Repositories & Open Source',
    ratingBadge: '840 Commits / 184 Stars',
    metrics: [
      { label: 'Commits', value: 840 },
      { label: 'Pull Requests', value: 142 },
      { label: 'Code Reviews', value: 96 },
      { label: 'Stars Earned', value: 184 },
    ],
    recentActivities: [
      { title: 'Merged PR #142 in skillpassport-core', subtitle: 'Added zero-knowledge verification proof route', timestamp: '2h ago' },
      { title: 'Starred by 184 developers', subtitle: 'skillpassport-identity-engine repository', timestamp: '1d ago' },
    ],
  },
  {
    platformId: 'gitlab',
    name: 'GitLab',
    title: 'Enterprise CI/CD & Deployment Runners',
    ratingBadge: '412 MRs / 99.1% Pipeline Success',
    metrics: [
      { label: 'Merge Requests', value: 412 },
      { label: 'Pipeline Runs', value: 312 },
      { label: 'Build Success Rate', value: '99.1%' },
      { label: 'Avg Build Time', value: '38s' },
    ],
    recentActivities: [
      { title: 'Pipeline #9412 PASSED', subtitle: 'raft-go container benchmark runner spec', timestamp: '4h ago' },
    ],
  },
  {
    platformId: 'leetcode',
    name: 'LeetCode',
    title: 'Algorithmic Problem Solving & Contests',
    ratingBadge: '1,942 Knight Badge (Top 3.8%)',
    metrics: [
      { label: 'Solved Problems', value: 264 },
      { label: 'Easy Solved', value: 142 },
      { label: 'Medium Solved', value: 98 },
      { label: 'Hard Solved', value: 24 },
    ],
    recentActivities: [
      { title: 'Accepted 146. LRU Cache', subtitle: 'Beats 98.4% of Java 21 submissions', timestamp: '6h ago' },
    ],
  },
  {
    platformId: 'hackerrank',
    name: 'HackerRank',
    title: 'Domain Certification & Code Challenges',
    ratingBadge: '6-Star Problem Solving',
    metrics: [
      { label: 'Challenges Solved', value: 145 },
      { label: 'Problem Solving', value: '6 Stars' },
      { label: 'Java Certificate', value: '5 Stars' },
      { label: 'Global Rank', value: 'Top 1.2%' },
    ],
    recentActivities: [
      { title: 'Completed Advanced Algorithms Badge', subtitle: 'Earned Gold Badge in Graph Theory', timestamp: '1d ago' },
    ],
  },
  {
    platformId: 'codeforces',
    name: 'Codeforces',
    title: 'Competitive Programming Contests',
    ratingBadge: 'Specialist Rating (1,640)',
    metrics: [
      { label: 'Contest Rounds', value: 98 },
      { label: 'Current Rating', value: 1640 },
      { label: 'Max Rating', value: 1720 },
      { label: 'Problems Solved', value: 184 },
    ],
    recentActivities: [
      { title: 'Rank 312 in Codeforces Div 2 Round #942', subtitle: '+48 Rating increase', timestamp: '3d ago' },
    ],
  },
  {
    platformId: 'exercism',
    name: 'Exercism',
    title: 'Language Mastery & Peer Code Reviews',
    ratingBadge: '64 Mentored Solutions Passed',
    metrics: [
      { label: 'Mentored Solutions', value: 64 },
      { label: 'Tracks Completed', value: 'Go, Rust, TS' },
      { label: 'Peer Reviews Given', value: 28 },
    ],
    recentActivities: [
      { title: 'Passed Rust Concurrency Track', subtitle: 'Reviewed by Senior Staff Engineer', timestamp: '2d ago' },
    ],
  },
  {
    platformId: 'kaggle',
    name: 'Kaggle',
    title: 'Data Science & Machine Learning Notebooks',
    ratingBadge: '2 Silver Medals / 52 Runs',
    metrics: [
      { label: 'Notebook Runs', value: 52 },
      { label: 'Competitions', value: 4 },
      { label: 'Silver Medals', value: 2 },
      { label: 'Upvotes', value: 340 },
    ],
    recentActivities: [
      { title: 'Published NLP Sentiment Transformer', subtitle: '340 Upvotes on Kaggle Community', timestamp: '5d ago' },
    ],
  },
  {
    platformId: 'frontendmentor',
    name: 'Frontend Mentor',
    title: 'Pixel-Perfect Design System Challenges',
    ratingBadge: '38 UI Challenges (98% Match)',
    metrics: [
      { label: 'UI Challenges', value: 38 },
      { label: 'Design Accuracy', value: '98%' },
      { label: 'Wall of Fame', value: 'Top 50' },
    ],
    recentActivities: [
      { title: 'Completed E-Commerce Glassmorphism UI', subtitle: 'Design accuracy score 99.2%', timestamp: '4d ago' },
    ],
  },
  {
    platformId: 'codecademy',
    name: 'Codecademy',
    title: 'Pro Certifications & Technical Skill Paths',
    ratingBadge: 'Full-Stack Web Dev Pro Certified',
    metrics: [
      { label: 'Certifications', value: 4 },
      { label: 'Pro Skill Paths', value: 3 },
      { label: 'Lessons Completed', value: 480 },
    ],
    recentActivities: [
      { title: 'Earned Full-Stack Architect Certificate', subtitle: '100% Course Completion Score', timestamp: '1w ago' },
    ],
  },
  {
    platformId: 'bitbucket',
    name: 'Bitbucket',
    title: 'Enterprise Workspace Repositories',
    ratingBadge: '84 Private Enterprise Commits',
    metrics: [
      { label: 'Private Commits', value: 84 },
      { label: 'Pipelines Passed', value: 42 },
      { label: 'PR Approvals', value: 28 },
    ],
    recentActivities: [
      { title: 'Approved Payments Gateway PR #42', subtitle: 'Stripe webhook signature validation filter', timestamp: '3d ago' },
    ],
  },
];

export const mockCandidates: RecruiterCandidate[] = [
  {
    id: 'cand_1',
    name: 'Rahul Sharma',
    avatar: 'RS',
    headline: 'Senior Software Engineering Student @ VTU',
    proofScore: 88,
    tier: 'GOLD',
    liveAppsCount: 14,
    verifiedInternships: 'Acme Corp CTO Sign-off',
    topProject: 'SkillPassport Identity Engine (Next.js, Prisma, AWS)',
    verifiedSkills: ['Next.js 14', 'TypeScript', 'Java 21', 'Docker', 'AWS'],
    availability: 'Available Immediately',
    location: 'Bengaluru, India',
    shaSeal: '8f92a1c4b78912e...e45a901',
  },
  {
    id: 'cand_2',
    name: 'Priya Patel',
    avatar: 'PP',
    headline: 'Distributed Systems & Go Developer @ IIIT',
    proofScore: 84,
    tier: 'GOLD',
    liveAppsCount: 9,
    verifiedInternships: 'Stripe Engineering Sign-off',
    topProject: 'Distributed KV Store in Go (Raft Consensus)',
    verifiedSkills: ['Golang 1.22', 'gRPC', 'Docker Swarm', 'PostgreSQL'],
    availability: 'Available in 2 Weeks',
    location: 'Hyderabad, India',
    shaSeal: 'a12e459018f92a1...c4b7891',
  },
  {
    id: 'cand_3',
    name: 'Arjun Mehta',
    avatar: 'AM',
    headline: 'AI & Data Infrastructure Engineer @ BITS',
    proofScore: 79,
    tier: 'SILVER',
    liveAppsCount: 6,
    verifiedInternships: 'Microsoft Research Intern',
    topProject: 'PyTorch Vector Search Engine (Qdrant, Python)',
    verifiedSkills: ['Python 3.11', 'FastAPI', 'PyTorch', 'Qdrant', 'Redis'],
    availability: 'Available in 1 Month',
    location: 'Mumbai, India',
    shaSeal: 'b456e7891234a56...7890123',
  },
];

export const fetchRepositories = async (): Promise<Repository[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockRepositories), 200));
};

export const fetchLeetCodeStats = async (): Promise<LeetCodeStats> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockLeetCodeStats), 200));
};

export const fetchPlatformDetails = async (id: string): Promise<PlatformSeededDetail | undefined> => {
  return mock10PlatformsSeededDetails.find(p => p.platformId === id);
};
