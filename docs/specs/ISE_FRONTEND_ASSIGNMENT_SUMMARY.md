# ISE Assignment — Multi-Platform Developer Identity & Contribution Frontend

**Application Name:** SkillPassport AI — Unified Developer Passport  
**Course Assignment:** Information Systems Engineering (ISE)  
**Target User Roles:** Developers, Tech Leads, Academic Reviewers, Enterprise Recruiters  
**Design Standard:** Modern Dark Slate Glassmorphism (`rounded-2xl`, `#0B1220`, `#111827`, `#2563EB`)  
**Status:** High-Fidelity Single-Page Web Application (SPA)  

---

## Executive Summary

This application solves the core problem of **scattered developer telemetry** by synthesizing functional UX patterns from four major industry platforms into a single, high-fidelity operating system interface:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    MULTI-PLATFORM UX SYNTHESIS                          │
├───────────────┬─────────────────────────────────────────────────────────┤
│ LinkedIn      │ Professional profile banner, connection metadata,       │
│               │ institutional verification seals, endorsement proofs.   │
├───────────────┼─────────────────────────────────────────────────────────┤
│ GitHub        │ Commit activity streams, repository cards, language     │
│               │ distribution bars, star & fork telemetry.               │
├───────────────┼─────────────────────────────────────────────────────────┤
│ GitLab        │ Live CI/CD runner build status badges (PASSED 🟢),      │
│               │ Merge Requests (MRs), deployment build times.           │
├───────────────┼─────────────────────────────────────────────────────────┤
│ LeetCode      │ Algorithmic problem-solving breakdown (Easy, Medium,    │
│               │ Hard), contest rating cards (1,942 Knight), topic radar.│
└───────────────┴─────────────────────────────────────────────────────────┘
```

---

## Key Requirements Implementation

### 1. Unified Multi-Platform Contribution Graph
- **52-Week Matrix Canvas**: Generates a 364-cell interactive contribution grid aggregating activity across GitHub, GitLab, and LeetCode.
- **Platform-Specific Heat Filters**: Users can toggle between `All Platforms (1,482)`, `GitHub (840 commits)`, `GitLab (412 MRs)`, and `LeetCode (230 submissions)`. The heat cells dynamically re-color to reflect platform-specific activity intensity.
- **Hover Micro-Interactions**: Hovering over any cell reveals exact contribution counts and platform breakdown.
- **Streak Telemetry**: Displays Current Streak (21 Days), Longest Streak (48 Days), and Total Active Days (294/365).

### 2. Modern Aesthetic & Soft Rounded Geometry
- **Consistent `rounded-2xl` Containers**: Completely eliminates sharp rectangular corners, replacing them with soft 16px and 24px container radii.
- **Glassmorphic Depth**: Uses frosted glass surfaces (`rgba(17, 24, 39, 0.85)` with `backdrop-filter: blur(16px)`), subtle 1px slate borders (`#1E293B`), and ambient blue/emerald elevation glows.

### 3. Integrated Application Views (Tabs)
1. **Unified Profile Tab**: High-level LinkedIn-style identity banner, connected platform pills, overall Proof Score (88% Gold Tier), and mini contribution stream preview.
2. **Contribution Matrix Tab**: Dedicated 52-week multi-platform activity heat map with real-time platform filters and streak statistics.
3. **Repos & CI/CD Tab**: Card-based repository evidence showing GitHub stars/forks alongside GitLab CI/CD runner build metrics (`Pipeline #9412 PASSED 🟢`, `38s Build`).
4. **LeetCode Dashboard Tab**: Visual problem-solving rings (Easy, Medium, Hard), algorithmic topic mastery cards (Dynamic Programming, Graph Theory, System Design), and recent accepted submissions with runtime percentiles.
5. **Recruiter Vault Tab**: Cryptographically sealed academic proofs (VTU 9.42 CGPA seal) and manager sign-offs with SHA-256 hashes.

### 4. Interactive Command Palette (`Cmd + K`)
- Pressing `Cmd + K` or clicking the top search bar launches a spotlight command palette for keyboard-first navigation across profile views, contribution matrices, and code challenges.

---

## File Architecture

```
skillpassport/
├── index.html                     # Primary ISE Assignment Frontend SPA
├── ise_developer_passport.html    # Dedicated ISE Application Backup
├── landing_3d_demo.html           # 3D WebGL Three.js Landing Engine
├── DESIGN_SYSTEM_AND_PRODUCT_SPEC.md
├── TECHNICAL_ARCHITECTURE_SPEC.md
└── FRONTEND_SCAFFOLDING_SPEC.md
```

### How to Launch & Demo
Double-click `index.html` or open it directly in any modern browser (Chrome, Edge, Safari, Firefox). No backend installation required.
