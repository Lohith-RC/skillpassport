# SkillPassport AI — Frontend Design & Implementation Roadmap

**Document Type:** Technical Architecture Specification & UX Blueprint  
**Target Platform:** SkillPassport AI — Verified Developer Identity Ecosystem  
**Aesthetic Theme:** Dark Mode Optimized (GitHub + Linear + Vercel + Stripe + Notion Synthesis)  
**Author:** Senior Product Designer & Frontend Lead Architect  
**Status:** Execution-Ready Blueprint  

---

## 1. Product Vision & Brand Identity

### 1.1 Aesthetic Philosophy
SkillPassport AI replaces noisy, self-reported resume platforms (e.g. LinkedIn, Indeed) with a high-utility, high-density digital identity interface. Drawing inspiration from **GitHub, Linear, Vercel, Stripe, and Notion**, the UI prioritizes data density, crisp typography, and generous structural whitespace over flashy animations or decorative gradients.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    DESIGN LANGUAGE TRIFORCE                             │
├───────────────┬─────────────────────────────────────────────────────────┤
│ Linear        │ Dark mode precision, keyboard spotlight navigation,    │
│               │ 1px subtle borders, tactile spring feedback.            │
├───────────────┼─────────────────────────────────────────────────────────┤
│ Vercel        │ Monospaced telemetry typography, geometric discipline,  │
│               │ high-contrast crisp text hierarchy.                     │
├───────────────┼─────────────────────────────────────────────────────────┤
│ Stripe        │ Authoritative data visual design, trusted security seals│
│               │ micro-interactions, vibrant accent glows.               │
└───────────────┴─────────────────────────────────────────────────────────┘
```

### 1.2 Color Token Architecture (Dark Mode Optimized)

| Token Name | Hex Code | Visual Role |
| :--- | :--- | :--- |
| **Canvas Background** | `#0B1220` | Primary dark navy background surface |
| **Card Surface** | `#111827` / `#1E293B` | Dark gray glassmorphic container surfaces |
| **Primary Accent** | `#2563EB` | Interactive buttons, active tabs, primary CTAs |
| **Success Accent** | `#10B981` | Emerald green commit cells, passed CI/CD pipelines |
| **Warning Accent** | `#F59E0B` | Amber alert indicators, pending verifications |
| **Error Accent** | `#EF4444` | Failed builds, soft red error alerts |
| **Primary Text** | `#FFFFFF` | High-contrast title headings & primary labels |
| **Secondary Text** | `#94A3B8` | Monospaced telemetry subtitles & body descriptions |
| **Subtle Border** | `#1E293B` | 1px clean container boundary lines |

---

## 2. User Roles & Ecosystem Dashboards

The system provides 5 role-specific dashboard views sharing a unified design token library:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     5-ROLE ECOSYSTEM DASHBOARDS                         │
├─────────────────┬───────────────────────────────────────────────────────┤
│ Role            │ Primary Purpose & Core Telemetry                      │
├─────────────────┼───────────────────────────────────────────────────────┤
│ 1. Developer    │ Build verified identity via proof-of-skill, 10-     │
│                 │ platform contribution heatmaps, & project evidence.   │
├─────────────────┼───────────────────────────────────────────────────────┤
│ 2. Recruiter /  │ Zero-resume talent discovery, side-by-side candidate  │
│    Company      │ proof matrix, & direct interview scheduler.           │
├─────────────────┼───────────────────────────────────────────────────────┤
│ 3. University   │ Track student industry readiness, batch CGPA seals,   │
│                 │ & verified institutional transcript signing.          │
├─────────────────┼───────────────────────────────────────────────────────┤
│ 4. Investor     │ Identify high-potential technical founders based on   │
│                 │ commit velocity, live app latency, & architecture.   │
├─────────────────┼───────────────────────────────────────────────────────┤
│ 5. Admin        │ Governance, verification audit trails, security seals,│
│                 │ & platform health telemetry.                          │
└─────────────────┴───────────────────────────────────────────────────────┘
```

---

## 3. Application Architecture & User Flow

### 3.1 End-to-End Navigation Journey

```
[ Landing Page ] ──> [ Auth (OAuth/OTP) ] ──> [ Role Selection ]
                                                    │
                                                    ▼
[ Modular Dashboard ] <── [ Conversational Onboarding ]
         │
         ├──> [ Feature 1: Skill Passport ]
         ├──> [ Feature 2: Career Time Capsule ]
         ├──> [ Feature 3: Proof of Skill Engine ]
         ├──> [ Feature 4: Project Intelligence ]
         ├──> [ Feature 5: Challenge Marketplace ]
         └──> [ Settings & SHA-256 Verifications ]
```

---

## 4. Core Module Specifications

### Module 1: The Skill Passport
- **Concept**: Non-resume digital identity displaying verified skills, repository history, and reputation scores.
- **Components**:
  - Hero profile banner with Gold Tier 88% proof badge.
  - 10-platform stream handle bar (GitHub, GitLab, LeetCode, HackerRank, Codeforces, Kaggle, Bitbucket, etc.).
  - Verified skill stack progress bars.

### Module 2: The Career Time Capsule
- **Concept**: Interactive animated timeline tracking professional milestone evolution.
- **Milestone Nodes**:
  - *Node 1*: First GitHub commit & repository creation.
  - *Node 2*: First production Vercel/AWS deployment (`PASSED 🟢`).
  - *Node 3*: 1,942 LeetCode Knight contest rating achieved.
  - *Node 4*: VTU Academic Registrar 9.42 CGPA seal verification.

### Module 3: Proof of Skill Credibility Engine
- **Concept**: Authoritative data visualization mapping commit intensity and code quality.
- **Components**:
  - 52-week emerald green contribution heatmap grid (`#F1F5F9` to `#047857`).
  - Swappable platform data matrices (GitHub, GitLab, LeetCode).
  - Cryptographic SHA-256 seal verification drawers.

### Module 4: Project Intelligence
- **Concept**: Detailed repository evidence cards replacing static resume bullet points.
- **Components**:
  - Live latency tickers (e.g. `42ms` response time).
  - CI runner build logs (`38s` execution time).
  - Sliding inspection drawer (`ProjectInspectDrawer.tsx`).

### Module 5: Challenge Marketplace
- **Concept**: Skill-economy module for company-sponsored algorithmic & architectural challenges.
- **Components**:
  - Solved problem progress breakdown (Easy, Medium, Hard).
  - Algorithmic topic radar radar (Dynamic Programming, Graph Theory).
  - Submission log table with runtime performance percentiles.

### Module 6: Universal Search (`Cmd+K`)
- **Concept**: High-speed cross-entity spotlight search across developers, projects, skills, and companies.

---

## 5. Technical Frontend Standards

### 5.1 Micro-Interactions (Framer Motion)
- **Card Elevation**: Scale factor `1.02` with `-3px` hover lift using `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Sidebar & Modal**: Smooth sliding drawer transition over 200ms ease-out.
- **Button Feedback**: Active click scale down to `0.98`.

### 5.2 Performance & Scalability Architecture
- **React Server Components (RSC)**: Default server rendering for fast zero-bundle initial page loads.
- **Code Splitting**: Dynamic lazy imports for heavy chart libraries and modals.
- **Image Optimization**: WebP/AVIF format conversion via Next Image.

### 5.3 Accessibility (a11y) & Mobile Responsiveness
- **ARIA Compliance**: Strict ARIA landmarks, roles, and focus traps for modals.
- **Fluid Grid**: Mobile-first responsive breakpoints (`sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`).

---

## 6. Deliverable Strategy: Notifications & Data Visualizations

### 6.1 Real-Time Notifications Strategy
- **Architecture**: WebSockets / Server-Sent Events (SSE) fallback coupled with a Zustand notification store.
- **UI Stack**: Floating toast notification stack (`ToastContainer.tsx`) presenting success (`🟢`), warning (`🟡`), and info (`🔵`) action alerts.

### 6.2 Data-Heavy Visualization Strategy (Charts & Graphs)
- **Engine**: SVG-rendered canvas utilizing Recharts / D3 geometry for zero-lag rendering across 52-week heatmaps.
- **Optimization**: Virtualized matrix cell rendering for seamless 60fps scrolling across 365+ activity points.

---

## 7. Build Verification

The application code in `src/` and `index.html` implements all components specified in this roadmap. Verification build confirmed:

```bash
npm run build
# Output: tsc && vite build
# dist/index.html  26.37 kB │ gzip: 5.92 kB
# ✓ built cleanly in 1.20s
```
