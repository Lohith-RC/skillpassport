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
  { id: 's_4', usn: '1VT22EC018', name: 'Sneha Reddy', cgpa: 9.05, department: 'Electronics', proofScore: 76, status: 'VERIFIED', commitsCount: 310 },
  { id: 's_5', usn: '1VT22AI012', name: 'Ananya Gupta', cgpa: 9.60, department: 'AI & Data Science', proofScore: 96, status: 'VERIFIED', commitsCount: 1340 },
  { id: 's_6', usn: '1VT22CS145', name: 'Kavya Nair', cgpa: 9.55, department: 'Computer Science', proofScore: 94, status: 'VERIFIED', commitsCount: 1120 },
  { id: 's_7', usn: '1VT22AI055', name: 'Neha Deshmukh', cgpa: 9.48, department: 'AI & ML', proofScore: 93, status: 'VERIFIED', commitsCount: 1080 },
  { id: 's_8', usn: '1VT22CS008', name: 'Aditya Verma', cgpa: 9.38, department: 'Computer Science', proofScore: 90, status: 'VERIFIED', commitsCount: 950 },
  { id: 's_9', usn: '1VT22CS199', name: 'Divya Iyer', cgpa: 9.30, department: 'Computer Science', proofScore: 89, status: 'VERIFIED', commitsCount: 890 },
  { id: 's_10', usn: '1VT22IS110', name: 'Meera Krishnan', cgpa: 9.25, department: 'Information Science', proofScore: 87, status: 'VERIFIED', commitsCount: 710 },
  { id: 's_11', usn: '1VT22CS210', name: 'Vikram Malhotra', cgpa: 9.12, department: 'Computer Science', proofScore: 85, status: 'VERIFIED', commitsCount: 780 },
  { id: 's_12', usn: '1VT22IS089', name: 'Rohan Joshi', cgpa: 8.92, department: 'Information Science', proofScore: 82, status: 'VERIFIED', commitsCount: 590 },
  { id: 's_13', usn: '1VT22EC102', name: 'Karthik Rao', cgpa: 8.95, department: 'Electronics', proofScore: 80, status: 'VERIFIED', commitsCount: 520 },
  { id: 's_14', usn: '1VT22EC064', name: 'Tanvi Saxena', cgpa: 8.75, department: 'Electronics', proofScore: 75, status: 'VERIFIED', commitsCount: 380 },
  { id: 's_15', usn: '1VT22CS304', name: 'Siddharth Roy', cgpa: 8.65, department: 'Computer Science', proofScore: 72, status: 'PENDING', commitsCount: 290 },
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
    name: 'Ananya Gupta',
    avatar: 'AG',
    headline: 'AI & Data Infrastructure Engineer @ IIT Delhi',
    proofScore: 96,
    tier: 'PLATINUM',
    liveAppsCount: 22,
    verifiedInternships: 'Google AI Research Intern',
    topProject: 'Distributed LLM Inference Engine (PyTorch, vLLM, Rust)',
    verifiedSkills: ['Python 3.12', 'PyTorch', 'Rust', 'vLLM', 'CUDA', 'Docker'],
    availability: 'Available Immediately',
    location: 'New Delhi, India',
    shaSeal: 'e96a12c4b78912e...e96a012',
  },
  {
    id: 'cand_2',
    name: 'Kavya Nair',
    avatar: 'KN',
    headline: 'Senior Full Stack & Systems Engineer @ NIT Calicut',
    proofScore: 94,
    tier: 'PLATINUM',
    liveAppsCount: 18,
    verifiedInternships: 'Meta Systems Engineering Sign-off',
    topProject: 'High-Throughput Event Streaming Core (Go, Kafka, Redis)',
    verifiedSkills: ['Golang 1.22', 'TypeScript', 'Next.js 14', 'Kafka', 'PostgreSQL'],
    availability: 'Available in 1 Week',
    location: 'Kochi, India',
    shaSeal: 'f94b12c4b78912e...f94b145',
  },
  {
    id: 'cand_3',
    name: 'Neha Deshmukh',
    avatar: 'ND',
    headline: 'ML & Autonomous Vision Engineer @ COEP Pune',
    proofScore: 93,
    tier: 'PLATINUM',
    liveAppsCount: 16,
    verifiedInternships: 'NVIDIA Autonomous Systems Intern',
    topProject: 'Real-time Object Tracking Pipeline (TensorRT, C++)',
    verifiedSkills: ['C++ 20', 'Python', 'OpenCV', 'TensorRT', 'ROS 2'],
    availability: 'Available in 2 Weeks',
    location: 'Pune, India',
    shaSeal: 'c93d12c4b78912e...c93d055',
  },
  {
    id: 'cand_4',
    name: 'Aditya Verma',
    avatar: 'AV',
    headline: 'Distributed Systems & Cloud Architect @ PEC',
    proofScore: 90,
    tier: 'PLATINUM',
    liveAppsCount: 15,
    verifiedInternships: 'Amazon Web Services CTO Sign-off',
    topProject: 'Zero-Downtime Multi-Region Kubernetes Mesh (Go, Istio)',
    verifiedSkills: ['Golang', 'Kubernetes', 'Istio', 'AWS', 'Terraform'],
    availability: 'Available Immediately',
    location: 'Chandigarh, India',
    shaSeal: 'd90a12c4b78912e...d90a008',
  },
  {
    id: 'cand_5',
    name: 'Divya Iyer',
    avatar: 'DI',
    headline: 'Backend Systems & Distributed Databases Engineer @ PSG',
    proofScore: 89,
    tier: 'GOLD',
    liveAppsCount: 14,
    verifiedInternships: 'Uber Infrastructure Intern',
    topProject: 'Raft-based Distributed Transaction Log (Java, Spring Boot 3)',
    verifiedSkills: ['Java 21', 'Spring Boot 3', 'PostgreSQL', 'Redis', 'gRPC'],
    availability: 'Available in 1 Month',
    location: 'Coimbatore, India',
    shaSeal: 'e89d12c4b78912e...e89d199',
  },
  {
    id: 'cand_6',
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
    id: 'cand_7',
    name: 'Meera Krishnan',
    avatar: 'MK',
    headline: 'Cybersecurity & Cryptography Engineer @ NIE Mysuru',
    proofScore: 87,
    tier: 'GOLD',
    liveAppsCount: 12,
    verifiedInternships: 'Cisco Security Labs Intern',
    topProject: 'Zero-Knowledge Proof Identity Protocol (Rust, ZK-SNARKs)',
    verifiedSkills: ['Rust', 'Cryptography', 'Node.js', 'Solidity', 'Linux'],
    availability: 'Available in 2 Weeks',
    location: 'Mysuru, India',
    shaSeal: 'm87k12c4b78912e...m87k110',
  },
  {
    id: 'cand_8',
    name: 'Vikram Malhotra',
    avatar: 'VM',
    headline: 'Frontend Performance & WebGL Engineer @ DTU',
    proofScore: 85,
    tier: 'GOLD',
    liveAppsCount: 11,
    verifiedInternships: 'Flipkart UX Engineering Sign-off',
    topProject: '60fps 3D Data Visualization Engine (Three.js, WebGPU)',
    verifiedSkills: ['TypeScript', 'Three.js', 'React 18', 'WebGPU', 'Tailwind'],
    availability: 'Available Immediately',
    location: 'Gurgaon, India',
    shaSeal: 'v85m12c4b78912e...v85m210',
  },
  {
    id: 'cand_9',
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
    id: 'cand_10',
    name: 'Rohan Joshi',
    avatar: 'RJ',
    headline: 'Cloud Microservices Developer @ MIT Pune',
    proofScore: 82,
    tier: 'GOLD',
    liveAppsCount: 10,
    verifiedInternships: 'Red Hat Cloud Engineering Intern',
    topProject: 'Serverless Event Gateway (Spring Cloud, Kafka)',
    verifiedSkills: ['Java 17', 'Spring Boot', 'Kafka', 'Docker', 'GCP'],
    availability: 'Available in 3 Weeks',
    location: 'Pune, India',
    shaSeal: 'r82j12c4b78912e...r82j089',
  },
  {
    id: 'cand_11',
    name: 'Karthik Rao',
    avatar: 'KR',
    headline: 'Embedded Systems & IoT Engineer @ NITK',
    proofScore: 80,
    tier: 'SILVER',
    liveAppsCount: 8,
    verifiedInternships: 'Bosch Embedded Systems Intern',
    topProject: 'Industrial Telemetry Mesh (C++, FreeRTOS, MQTT)',
    verifiedSkills: ['Embedded C++', 'FreeRTOS', 'MQTT', 'Python', 'Linux'],
    availability: 'Available in 1 Month',
    location: 'Mangaluru, India',
    shaSeal: 'k80r12c4b78912e...k80r102',
  },
  {
    id: 'cand_12',
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
  {
    id: 'cand_13',
    name: 'Sneha Reddy',
    avatar: 'SR',
    headline: 'Mobile & Cross-Platform Engineer @ JNTU',
    proofScore: 76,
    tier: 'SILVER',
    liveAppsCount: 7,
    verifiedInternships: 'Swiggy Mobile Engineering Sign-off',
    topProject: 'Real-time Delivery Tracking App (React Native, Firebase)',
    verifiedSkills: ['React Native', 'TypeScript', 'GraphQL', 'Firebase'],
    availability: 'Available in 2 Weeks',
    location: 'Chennai, India',
    shaSeal: 's76r12c4b78912e...s76r018',
  },
  {
    id: 'cand_14',
    name: 'Tanvi Saxena',
    avatar: 'TS',
    headline: 'DevOps & CI/CD Pipeline Automation Engineer @ Amity',
    proofScore: 75,
    tier: 'SILVER',
    liveAppsCount: 5,
    verifiedInternships: 'Paytm Infrastructure Intern',
    topProject: 'GitOps Continuous Deployment Pipeline (ArgoCD, Helm)',
    verifiedSkills: ['Docker', 'Kubernetes', 'Helm', 'GitHub Actions', 'Python'],
    availability: 'Available in 1 Month',
    location: 'Noida, India',
    shaSeal: 't75s12c4b78912e...t75s064',
  },
  {
    id: 'cand_15',
    name: 'Siddharth Roy',
    avatar: 'SR',
    headline: 'Junior Web & API Developer @ JU Kolkata',
    proofScore: 72,
    tier: 'BRONZE',
    liveAppsCount: 4,
    verifiedInternships: 'TCS Innovation Labs Trainee',
    topProject: 'Real-Time Chat & Collaboration Tool (Node.js, Socket.io)',
    verifiedSkills: ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'React'],
    availability: 'Available Immediately',
    location: 'Kolkata, India',
    shaSeal: 's72r12c4b78912e...s72r304',
  },
];

export const API_BASE_URL = 'http://localhost:8080/api/v1';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const apiAuth = {
  login: async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      return data;
    } catch (err: any) {
      // Backend unreachable (offline / not started): fall back to a demo session
      // instead of hard-failing, so the product remains fully explorable.
      console.warn('Backend offline, using demo login fallback:', err.message);
      const name = email
        .split('@')[0]
        .replace(/[._-]+/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return {
        token: 'demo-token',
        name: name || 'Demo Developer',
        email,
        role: 'DEVELOPER',
        isNewUser: false,
        isDemo: true,
      };
    }
  },

  register: async (name: string, email: string, password: string, role: string = 'STUDENT', usn?: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, usn }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      return data;
    } catch (err: any) {
      // Backend unreachable (offline / not started): create a demo account so
      // signup never dead-ends the user.
      console.warn('Backend offline, using demo register fallback:', err.message);
      return {
        token: 'demo-token',
        name,
        email,
        role,
        usn,
        isNewUser: true,
        isDemo: true,
      };
    }
  },

  getCurrentUser: async () => {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
  },
};

export const fetchRepositories = async (): Promise<Repository[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/repositories`, { headers: getAuthHeaders() });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((r: any) => ({
          ...r,
          tags: typeof r.tags === 'string' ? r.tags.split(',') : (r.tags || []),
          commitHistory: r.commitHistory || mockRepositories[0].commitHistory,
        }));
      }
    }
  } catch (err) {
    console.warn('Java backend offline, serving mock repositories');
  }
  return mockRepositories;
};

export const fetchCareerMilestones = async (): Promise<CareerMilestone[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/milestones`, { headers: getAuthHeaders() });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.warn('Java backend offline, serving mock career milestones');
  }
  return mockCareerMilestones;
};

export const fetchUniversityStudents = async (): Promise<UniversityStudent[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/students`, { headers: getAuthHeaders() });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.warn('Java backend offline, serving mock university students');
  }
  return mockUniversityStudents;
};

export const fetchLeetCodeStats = async (): Promise<LeetCodeStats> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockLeetCodeStats), 200));
};

export const fetchPlatformDetails = async (id: string): Promise<PlatformSeededDetail | undefined> => {
  return mock10PlatformsSeededDetails.find(p => p.platformId === id);
};

