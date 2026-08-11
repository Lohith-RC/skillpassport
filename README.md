# SkillPassport AI — Verified Developer Identity Ecosystem

> **One Identity. Endless Opportunities.**  
> A Next-Generation AI-powered Developer Proof-of-Skill Platform featuring multi-platform telemetry aggregation, cryptographic SHA-256 verification seals, live coding sandboxes, and recruiter pipeline analytics.

----

## 📁 Repository Structure

```text
skillpassport/
├── docs/                                 # Project Specifications & Documentation
│   ├── design/                           # UI/UX Specifications & Design System
│   │   ├── DESIGN_SYSTEM_AND_PRODUCT_SPEC.md
│   │   ├── FRONTEND_DESIGN_AND_ROADMAP.md
│   │   └── design.md
│   ├── investor/                         # Pitch Decks, Q&A, and Investor Analytics
│   │   └── SkillPassport_AI_Investor_QA.md
│   └── specs/                            # Architecture & Technical Requirements
│       ├── FRONTEND_SCAFFOLDING_SPEC.md
│       ├── ISE_FRONTEND_ASSIGNMENT_SUMMARY.md
│       ├── SKILLPASSPORT_FRONTEND_TRD.md
│       └── TECHNICAL_ARCHITECTURE_SPEC.md
├── public/                               # Static Assets & Logos
│   └── logo.png
├── src/                                  # Application Source Code
│   ├── components/                       # React UI Components
│   │   ├── canvas/                       # 3D Interactive Three.js Canvas Elements
│   │   ├── features/                     # Feature-specific Views & Modals
│   │   │   ├── AuthView.tsx              # Dual-Role Authentication View
│   │   │   ├── ChallengesView.tsx        # Real-Time AI Coding Sandbox
│   │   │   ├── ContributionMatrix.tsx    # Multi-Platform Commit Heatmap
│   │   │   ├── Dashboard.tsx             # Master Executive Dashboard
│   │   │   ├── InterviewModal.tsx        # 1-Click Recruiter Interview Scheduler
│   │   │   ├── InvestorAnalytics.tsx     # Platform & Traction Metrics
│   │   │   ├── LandingPage.tsx           # Full-Screen Hero & Product Showcase
│   │   │   ├── LeetCodeDashboard.tsx     # CP Ratings & Topic Trajectory
│   │   │   ├── NotificationsDropdown.tsx # Real-Time Security & Badge Feed
│   │   │   ├── PassportCard.tsx          # Cryptographic Skill Passport Component
│   │   │   ├── PlatformSyncModal.tsx     # Multi-Account Integration Modal
│   │   │   ├── ProjectInspectDrawer.tsx  # Git Commit Proof & Diff Inspector
│   │   │   ├── ProjectsView.tsx          # Verified Code Repositories
│   │   │   ├── RecruiterPipeline.tsx     # Candidate Match & Fit Scores
│   │   │   ├── SettingsModal.tsx         # User Profile & Preferences Manager
│   │   │   ├── SkillPassportView.tsx     # Full Passport Skill Cards & Badges
│   │   │   ├── TimeCapsuleView.tsx       # Historical Milestone Timeline
│   │   │   └── UniversityHub.tsx         # Institutional Skill Verifications
│   │   ├── layout/                       # Layout Components (Sidebar, Top Header)
│   │   │   └── AppLayout.tsx
│   │   └── ui/                           # Reusable Atom UI Controls (Modal, Toast)
│   ├── hooks/                            # Custom React Hooks (useDebounce, useScroll)
│   ├── services/                         # API Service Integrations & Mock Endpoints
│   │   └── api.ts
│   ├── stores/                           # Centralized State Management (Zustand)
│   │   └── useAppStore.ts
│   ├── types/                            # TypeScript Data Contracts & Interfaces
│   │   └── index.ts
│   ├── utils/                            # Helper Functions & Classnames Merge Utility
│   │   └── cn.ts
│   ├── App.tsx                           # Main Application Container & Route Switcher
│   ├── main.tsx                          # Vite Application Entry Point
│   └── index.css                         # Global CSS & Tailwind Directives
├── index.html                            # Root HTML Document
├── package.json                          # Dependencies & Build Scripts
├── postcss.config.js                     # PostCSS Tailwind Configuration
├── tailwind.config.js                    # Custom Design Tokens & Dark Theme Colors
├── tsconfig.json                         # TypeScript Compiler Options
├── tsconfig.node.json                    # TypeScript Node Build Target Options
└── vite.config.ts                        # Vite Application Bundler Configuration
```

---

## 🛠️ Technology Stack

- **Core Framework**: React 18 + TypeScript 5
- **Build Tooling**: Vite 5
- **Styling**: Tailwind CSS + Framer Motion (Animations) + Lucide React (Icons)
- **State Management**: Zustand
- **Async Data Querying**: TanStack React Query v5
- **3D Graphics**: Three.js

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Installation

1. **Clone repository**:
   ```bash
   git clone https://github.com/Lohith-RC/skillpassport.git
   cd skillpassport
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Verify TypeScript compilation**:
   ```bash
   npm run lint
   ```

5. **Build production bundle**:
   ```bash
   npm run build
   ```

---

## 📚 Documentation Index

All technical specifications and product guides are organized in the `docs/` folder:

- **Architecture**: [`docs/specs/TECHNICAL_ARCHITECTURE_SPEC.md`](docs/specs/TECHNICAL_ARCHITECTURE_SPEC.md)
- **Technical Requirements**: [`docs/specs/SKILLPASSPORT_FRONTEND_TRD.md`](docs/specs/SKILLPASSPORT_FRONTEND_TRD.md)
- **Design System & Product Spec**: [`docs/design/DESIGN_SYSTEM_AND_PRODUCT_SPEC.md`](docs/design/DESIGN_SYSTEM_AND_PRODUCT_SPEC.md)
- **Frontend Design Roadmap**: [`docs/design/FRONTEND_DESIGN_AND_ROADMAP.md`](docs/design/FRONTEND_DESIGN_AND_ROADMAP.md)
- **Investor Q&A**: [`docs/investor/SkillPassport_AI_Investor_QA.md`](docs/investor/SkillPassport_AI_Investor_QA.md)