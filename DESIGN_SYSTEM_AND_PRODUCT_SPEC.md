# SkillPassport AI — Enterprise Design System & Product Specification

**Document Version:** 1.0.0  
**Target Audience:** Frontend Engineering Team, UI/UX Designers, Executive Leadership  
**Design Intent:** Enterprise SaaS Operating System (Linear + Stripe + GitHub + Vercel + Notion)  
**Status:** Approved Technical Blueprint  

---

## Executive Summary & Design Vision

SkillPassport AI is built on a single uncompromising product mandate: **"This is not a student assignment—it is a production-grade SaaS operating system."** 

In early-stage venture evaluations, investors scrutinize frontend execution as empirical evidence of engineering maturity, discipline, and execution speed. Most candidate platforms fail by adopting consumer "gamified" aesthetics—excessive gradients, oversized icons, bouncy animations, and redundant dashboard widgets. 

This specification defines an **enterprise-grade, restrained, evidence-first design language** that communicates trust, high information density, scalable architecture, and immediate operational value to developers, enterprise recruiters, universities, and investors.

---

## 1. Brand Identity & Design Language Matrix

The visual DNA of SkillPassport AI synthesizes the defining characteristics of five world-class software platforms into a cohesive design system:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    SKILLPASSPORT AI DESIGN DNA                          │
├───────────────┬─────────────────────────────────────────────────────────┤
│ Linear        │ High-contrast dark typography, crisp 1px borders,       │
│               │ keyboard-first navigation (Cmd+K), micro-spacing.       │
├───────────────┼─────────────────────────────────────────────────────────┤
│ Stripe        │ Enterprise trust, high-density metric tables, structured│
│               │ card layouts, impeccable alignment and typography.      │
├───────────────┼─────────────────────────────────────────────────────────┤
│ GitHub        │ Developer-native iconography, commit-like timeline      │
│               │ feeds, verified status indicators, evidence cards.      │
├───────────────┼─────────────────────────────────────────────────────────┤
│ Vercel        │ Ultra-minimalist monochrome surfaces, precision borders,│
│               │ high contrast, zero decorative clutter.                 │
├───────────────┼─────────────────────────────────────────────────────────┤
│ Notion        │ Context-focused canvas design, modular block layouts,   │
│               │ distraction-free execution spaces.                      │
└───────────────┴─────────────────────────────────────────────────────────┘
```

### Visual Principles
1. **Evidence Over Declarations**: Never display unverified claim text when an interactive, verifiable artifact card can be rendered.
2. **Restrained Precision**: Maximum 2 accent colors active on screen at any time. No rainbow gradients or superfluous decorative illustrations.
3. **High Perceived Velocity**: Sub-200ms interaction response, skeleton loading states, instant optimistic UI updates.
4. **Information Density**: Compact typography scales, tight spatial grids, clear tabular hierarchy suited for professional evaluation.

---

## 2. Comprehensive Design Tokens

### 2.1 Color Palette & Semantic Assignment

```css
:root {
  /* Primitive Dark Surface Tokens */
  --color-bg-base:        #0B1220; /* Primary Operating System Dark Slate */
  --color-bg-surface-l1: #111827; /* Primary Card / Sidebar Surface */
  --color-bg-surface-l2: #1F2937; /* Elevated Surface / Hover States */
  --color-bg-surface-l3: #374151; /* Active State / Modal Surfaces */

  /* Border & Divider Tokens */
  --color-border-subtle:  #1E293B; /* 1px Card Divider Lines */
  --color-border-default: #334155; /* Interactive Component Borders */
  --color-border-focus:   #2563EB; /* Focus Ring Border */

  /* Brand & Accent Tokens */
  --color-accent-primary: #2563EB; /* Electric Blue (Primary CTAs, Active States) */
  --color-accent-hover:   #1D4ED8; /* Darker Blue (Hover State) */
  --color-accent-secondary:#10B981; /* Emerald Green (Verified Seals, Success) */
  --color-accent-warning: #F59E0B; /* Amber (Pending Verification, Audits) */
  --color-accent-error:   #EF4444; /* Soft Red (Failed Deployments, Alert States) */

  /* Neutral Typography Tokens */
  --color-text-primary:   #FFFFFF; /* High-contrast Headings & Metric Values */
  --color-text-secondary: #D1D5DB; /* Body Copy & Section Labels */
  --color-text-muted:     #9CA3AF; /* Metadata, Timestamps, Captions */
  --color-text-disabled:  #4B5563; /* Disabled Controls */

  /* Glow & Elevation Tokens */
  --shadow-card-subtle:   0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
  --shadow-glow-blue:     0 0 20px -3px rgba(37, 99, 235, 0.25);
  --shadow-glow-green:    0 0 20px -3px rgba(16, 185, 129, 0.25);
}
```

### 2.2 Typography Hierarchy & System Fonts

- **Primary Font Family:** `Inter`, `Geist`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`
- **Monospace Font Family:** `JetBrains Mono`, `Fira Code`, `monospace` (Used for commit hashes, code tokens, deployment logs)

| Token Name | Size | Weight | Line Height | Tracking | Usage Context |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `text-display` | `44px` | `700` (Bold) | `1.1` | `-0.025em` | Hero Headings |
| `text-h1` | `32px` | `600` (SemiBold) | `1.2` | `-0.02em` | Primary View Titles |
| `text-h2` | `24px` | `600` (SemiBold) | `1.25` | `-0.015em` | Section Headers |
| `text-h3` | `18px` | `500` (Medium) | `1.35` | `-0.01em` | Card Titles & Dialog Headers |
| `text-body` | `14px` | `400` (Regular) | `1.5` | `0` | Standard Body Text & Descriptions |
| `text-body-bold` | `14px` | `600` (SemiBold) | `1.5` | `0` | Emphasized Table Values & Labels |
| `text-small` | `12px` | `400` (Regular) | `1.4` | `0.01em` | Badges, Timestamps, Subtext |
| `text-mono` | `13px` | `500` (Medium) | `1.4` | `0` | Repositories, SHA-256, Code snippets |

### 2.3 Spacing Scale & Radius Tokens

```json
{
  "spacing": {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "6": "24px",
    "8": "32px",
    "12": "48px",
    "16": "64px"
  },
  "borderRadius": {
    "none": "0px",
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "xl": "16px",
    "full": "9999px"
  }
}
```

### 2.4 Tailwind CSS Configuration (`tailwind.config.js`)

```javascript
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0B1220',
          surface: '#111827',
          elevated: '#1F2937',
          active: '#374151'
        },
        accent: {
          blue: '#2563EB',
          emerald: '#10B981',
          amber: '#F59E0B',
          red: '#EF4444'
        },
        border: {
          subtle: '#1E293B',
          default: '#334155'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        'glow-blue': '0 0 20px -3px rgba(37, 99, 235, 0.25)',
        'glow-emerald': '0 0 20px -3px rgba(16, 185, 129, 0.25)'
      }
    }
  }
}
```

---

## 3. Information Architecture & Component Library

### 3.1 Global Operating System Layout Architecture

The overall layout follows a rigid 3-pane enterprise application structure:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Logo] SkillPassport AI    [Cmd+K Search...]   (🔔 3) [User Avatar]   │ TOP BAR
├──────────────┬──────────────────────────────────────────────────────────┤
│ - Dashboard  │ WORKSPACE HEADER                                         │
│ - Passport   │ Breadcrumbs / Title / Primary View Actions                │
│ - Portfolio  ├──────────────────────────────────────────────────────────┤
│ - Proof Skill│ MAIN CANVAS WORKSPACE                                    │
│ - Economy    │                                                          │
│ - Startup Hub│ [ Metric Cards Grid ]                                    │
│ - Time Capsule│                                                         │
│              │ ┌───────────────────────────┐ ┌────────────────────────┐ │
│ ──────────── │ │ Primary Component / Graph │ │ Side Panel / Feed      │ │
│ - Settings   │ │                           │ │                        │ │
│ - Recruiter  │ └───────────────────────────┘ └────────────────────────┘ │
└──────────────┴──────────────────────────────────────────────────────────┘
```

#### Structural Specifications:
- **Left Collapsible Sidebar**: Fixed width `240px`, background `#0B1220`, border-right `1px solid #1E293B`. Contains logo mark, primary navigation items with SVG icons, collapse toggle (`Cmd+\`).
- **Top Utility Header**: Height `56px`, sticky top, background `#0B1220/80` with `backdrop-filter: blur(12px)`. Houses universal search button (`Cmd+K`), system notifications bell with ping badge, and active profile pill.
- **Main Workspace Canvas**: Fluid container with `max-width: 1440px`, padding `32px`, auto-scrolling with hidden scrollbar styling.

---

### 3.2 Core Component Specifications

#### Component 1: `SkillPassportCard`
*The foundational developer identity unit.*

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [ Photo ]  Rahul Sharma  [ Verified Seal (Emerald) ]                    │
│            Full-Stack Software Engineer • Final Year CSE                │
├─────────────────────────────────────────────────────────────────────────┤
│ PROOF OF SKILL SCORE                                                    │
│ 82%  [██████████████████████████████████████░░░░░░]  Platinum Tier      │
├─────────────────────────────────────────────────────────────────────────┤
│ VERIFIED SKILLS                                                         │
│ [ React ] [ TypeScript ] [ Node.js ] [ Docker ] [ AWS S3 ] [ PostgreSQL] │
├─────────────────────────────────────────────────────────────────────────┤
│ CAREER MILESTONE SUMMARY                                                │
│ ⚡ 14 Deployed Repositories   •   ⚡ 2 Verified Internships              │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Component 2: `IdentityProgressBar`
*Real-time visual indicator of evidence density.*

- **State Rules**:
  - `0% - 39%`: Bronze Tier (`#9CA3AF`)
  - `40% - 69%`: Silver Tier (`#2563EB`)
  - `70% - 89%`: Gold / Platinum Tier (`#10B981`)
  - `90% - 100%`: Verified Master Tier (`#F59E0B` with subtle animated shimmer)
- **Props Schema**:
  ```typescript
  interface IdentityProgressBarProps {
    score: number; // 0 to 100
    tierLabel: string;
    showMilestoneTicks?: boolean;
    animatedFill?: boolean;
  }
  ```

#### Component 3: `ActivityTimelineItem`
*Vertical feed item showing chronological proof events.*

- **Visual Layout**: 
  Left column (`32px`): Circular node icon with vertical connecting line (`2px solid #1E293B`).  
  Right column: Event title, timestamp, metadata tag, clickable verification hash link.
- **Event Types & Colors**:
  - `Project Deployed`: Emerald Green node (`#10B981`)
  - `Internship Verified`: Electric Blue node (`#2563EB`)
  - `Challenge Completed`: Amber node (`#F59E0B`)
  - `Recruiter Profile View`: Slate / White node (`#9CA3AF`)

#### Component 4: `ProjectEvidenceCard`
*Replaces conventional resume bullet points with verifiable live proof.*

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [ Live Preview Thumbnail ]  SkillPassport Identity Core                 │
│                             GitHub Rep: github.com/rahul/skillpassport  │
├─────────────────────────────────────────────────────────────────────────┤
│ TECH STACK:  [ Next.js 14 ] [ TypeScript ] [ TailwindCSS ] [ Prisma ]   │
│ DEPLOYMENT:  🟢 Live on Vercel (Production) • Response Time: 42ms       │
│ REPOSITORY:  ⭐ 128 Stars   •   🔄 42 Commits   •   🛡️ MIT License       │
├─────────────────────────────────────────────────────────────────────────┤
│ ARCHITECTURE HIGHLIGHT                                                  │
│ Built zero-knowledge verification proof layer using cryptographic SHA.  │
├─────────────────────────────────────────────────────────────────────────┤
│ [ View Live App ↗ ]           [ Inspect Code ]        [ View Proof ]    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. High-Fidelity User Flow & Screen Specifications

### 4.1 Landing Page & Network Graph Specification

The Landing Page must instantly communicate platform scope without sounding abstract.

#### 1. Hero Section Architecture
- **Headline**: `"One Identity. Endless Opportunities."` (44px, Bold, `#FFFFFF`)
- **Subheading**: `"The trusted digital identity layer connecting developers, companies, universities, and investors through verifiable evidence."` (16px, `#D1D5DB`)
- **Primary CTA**: `"Get Your Skill Passport"` (Electric Blue `#2563EB`, solid fill, `px-6 py-3 rounded-md font-semibold`)
- **Secondary CTA**: `"Explore Platform Demo"` (Ghost style, 1px border `#334155`, `#FFFFFF` text)

#### 2. Interactive Network Graph Canvas Engine Logic
Behind the hero section sits an interactive WebGL / HTML5 Canvas graph visualizer.

```
       [ Developer ]
           │ (0.8s flow)
           ▼
        [ Project ]
           │ (1.2s flow)
           ▼
      [ Deployment ]
       /          \
      / (1.5s)     \ (1.8s)
     ▼              ▼
[ Company ]    [ Investor ]
     │              │
     └──────┬───────┘
            ▼
      [ University ]
```

- **Node Rendering Specifications**:
  - Node Size: 12px radius, dark slate interior, 2px glowing accent ring.
  - Hover Action: Node expands to 16px radius, displays floating inspect card with node metadata (e.g., `"Verified Node: Rahul Sharma → Vercel Deployment #8921"`).
  - Particle Connection Animations: Tiny light pulses travel along edge paths between nodes at staggered intervals (2.5s loop), visually illustrating real-time data exchange across the network.

---

### 4.2 Developer Dashboard Specification

The primary landing view for logged-in talent.

```
┌─────────────────────────────────────────────────────────────────────────┐
│ WELCOME BACK, RAHUL                                                     │
│ Professional Identity Status: 82% Complete [██████████████░░] Gold Tier │
├──────────────────────────────┬──────────────────────────────────────────┤
│ SKILL PASSPORT SUMMARY CARD  │ LIVE ACTIVITY TIMELINE                   │
│                              │                                          │
│ Rahul Sharma                 │ 🟢 Deployed skillpassport-web to Vercel │
│ Full-Stack Engineer          │    2 hours ago • Production Build #42    │
│                              │                                          │
│ Verified Proofs:             │ 🔵 Internship Verified by Acme Corp      │
│ • 14 Projects Deployed       │    Yesterday • Signed by CTO             │
│ • 3 Challenge Certifications │                                          │
│ • 2 Verified Internships     │ 🟡 Recruiter from Stripe viewed profile │
│                              │    3 days ago • Saved to Pipeline       │
│ Top Skill Ratings:           │                                          │
│ React (95%) • Node.js (88%)  │ 🟢 Completed Algorithm Challenge #12     │
│ Docker (82%) • Postgres (90%)│    5 days ago • Score: Top 5%            │
├──────────────────────────────┴──────────────────────────────────────────┤
│ PROOF OF SKILL VISUALIZER (CIRCULAR RADIAL SCORE)                       │
│ [ 82 / 100 ] Breakdown: Code (90) | Deployments (85) | Verification (75) │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### 4.3 Portfolio View Specification

Replaces passive text-based project lists with high-density, card-based evidence tiles.

- **Filter Bar**:
  - Search Input: `"Filter projects by tech stack or deployment status..."`
  - Filter Pills: `All` | `Production Deployed` | `Open Source` | `Hackathon Winners`
- **Card Grid Layout**: 2 columns on desktop (`grid-cols-2 gap-6`), 1 column on mobile.
- **Card Interactivity**:
  - Hovering over a project card subtly lifts the element (`translateY(-2px)`), adds `--shadow-glow-blue`, and renders a `"Quick Inspect"` overlay button.
  - Clicking `"Quick Inspect"` opens a drawer displaying system architecture diagrams, live API health status, and GitHub commit histories.

---

### 4.4 Company & Recruiter Dashboard Specification

Engineered specifically for talent acquisition leads seeking verified evidence rather than unverified PDF claims.

```
┌─────────────────────────────────────────────────────────────────────────┐
│ RECRUITER EVIDENCE PIPELINE                                             │
│ Search Filter: [ React, Node.js ] [ Min. Proof Score: >75% ] [ Deployed ]│
├─────────────────────────────────────────────────────────────────────────┤
│ CANDIDATE VERIFIED MATCHES (3 FOUND)                                    │
├─────────────────────────────────────────────────────────────────────────┤
│ 👤 Rahul Sharma | Proof Score: 82% Gold | 14 Live Apps | Vercel Verified│
│    Top Project: SkillPassport Identity Engine (Next.js, Prisma, AWS)    │
│    Status: Open to Offers • Internship Verified by Acme Corp            │
│    [ Inspect Evidence Proofs ]       [ Schedule Direct Interview ]     │
├─────────────────────────────────────────────────────────────────────────┤
│ 👤 Priya Patel | Proof Score: 79% Silver | 9 Live Apps | AWS Verified   │
│    Top Project: Distributed Key-Value Store in Go                       │
│    Status: Available in 2 Weeks • Hackathon Winner 2025                 │
│    [ Inspect Evidence Proofs ]       [ Schedule Direct Interview ]     │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### 4.5 Proof of Skill & Time Capsule Specification

The signature storytelling component of SkillPassport AI.

```
┌─────────────────────────────────────────────────────────────────────────┐
│ TIME CAPSULE: CAREER TRAJECTORY                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  2024               2025              2025              2026            │
│   ●──────────────────●─────────────────●─────────────────●              │
│  First Repos       First Deployed    Hackathon Winner   Internship      │
│  (github/hello)    App on Vercel     (AI Agent Build)   (Acme Corp)     │
│                                                                         │
│  [ Click node to inspect verified cryptographic proof certificate ]    │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Time Capsule Interaction Details:
- **Scroll Synchronization**: Users scroll horizontally or vertically through a timeline track. As the viewport intersects each node, the node illuminates with `--color-accent-blue` or `--color-accent-emerald`, updating a side panel with the exact historical code commits, pull requests, deployment logs, or managerial sign-offs from that date.

---

### 4.6 Skill Economy & Startup Hub Specification

#### 1. Skill Economy (Challenge Marketplace)
- Replaces traditional job boards with bite-sized, problem-first bounty tiles.
- **Card Data Structure**:
  - `Company Sponsor` (Logo + Name)
  - `Problem Statement` (Short description)
  - `Bounty / Reward` (`$500 USDC` or `Direct Interview Fast-Track`)
  - `Difficulty Tag` (`Intermediate` / `Advanced`)
  - `Est. Time` (`4 Hours`)
  - `CTA Button`: `"Accept Challenge & Build"`

#### 2. Startup Hub (Project Incubator Showcase)
- Designed like Kickstarter for student-led software products.
- Displays: Project Pitch Deck Viewer, Live Web App Embedded Frame, Financial / User Goal Bar (`$12,000 / $20,000 Raised`), Count of Interested Angel Investors (`14 VCs Watching`).

---

## 5. Motion & Interaction Manifesto

To ensure the UI maintains an enterprise-grade, restrained feel, all animations must strictly adhere to the following timing budget:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ TIMING BUDGET                                                           │
├──────────────────────────┬───────────┬──────────────────────────────────┤
│ Micro-Interactions       │ 100-150ms │ Button presses, toggle switches  │
├──────────────────────────┼───────────┼──────────────────────────────────┤
│ Hover & Elevation        │ 150-200ms │ Card lifts, border glow reveals  │
├──────────────────────────┼───────────┼──────────────────────────────────┤
│ Modal & Drawer Entrances │ 200-250ms │ Slide-overs, dialog overlays     │
├──────────────────────────┼───────────┼──────────────────────────────────┤
│ Page Transitions         │ 250-300ms │ Route changes, view fades        │
└──────────────────────────┴───────────┴──────────────────────────────────┘
```

### Motion Curve Specifications
- **Entrance Easing Curve**: `cubic-bezier(0.16, 1, 0.3, 1)` *(Ease-Out Expo — fast acceleration, smooth settle)*
- **Exit Easing Curve**: `cubic-bezier(0.7, 0, 0.84, 0)` *(Ease-In Expo — rapid exit without lingering)*
- **Hover Transitions**: `cubic-bezier(0.4, 0, 0.2, 1)` *(Standard smooth ease-in-out)*

### Forbidden Motion Patterns
❌ **No Bouncy / Elastic Springs**: Bouncy physics feel like consumer apps or children's games.  
❌ **No Prolonged Page Transitions (>300ms)**: Slow page slides create perceived latency.  
❌ **No Full-Screen Background Particle Swarms**: Superfluous visual noise distracts from data evaluation.

---

## 6. UX Maturity & Engineering Standards

### 6.1 Loading Experience: Skeleton Screen Rules

Never display blank screens or spinning loaders for primary dashboard views. Use geometry-matched skeleton placeholders with a subtle CSS shimmer animation:

```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton-box {
  background: linear-gradient(
    90deg,
    #111827 25%,
    #1F2937 50%,
    #111827 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite ease-in-out;
  border-radius: 6px;
}
```

---

### 6.2 Empty States Specification

Every empty data container must present a proactive, clear call-to-action rather than an unstyled blank box:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                        [ 📂 Empty Vault Icon ]                          │
│                      No Verified Projects Found                         │
│                                                                         │
│   You haven't connected a GitHub repository or deployed web application │
│   yet. Connect your accounts to automatically build your Proof of Skill.│
│                                                                         │
│             [ Connect GitHub Account ]   [ Import Manual App ]          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### 6.3 Universal Search (`Cmd+K` Command Palette)

Pressing `Cmd+K` or clicking the top search bar launches an instant spotlight modal styled after Linear:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔍 Type a command or search developers, skills, projects...           │
├─────────────────────────────────────────────────────────────────────────┤
│ QUICK ACTIONS                                                           │
│  ⚡ View My Skill Passport                            Cmd + P           │
│  🚀 Submit New Project Deployment                      Cmd + D           │
│  🔍 Search Recruiter Pipeline                         Cmd + R           │
├─────────────────────────────────────────────────────────────────────────┤
│ SEARCH RESULTS                                                          │
│  👤 Rahul Sharma — Full-Stack Engineer (Proof Score: 82%)               │
│  📦 skillpassport-core — Next.js 14 Identity Repository                 │
│  🏢 Stripe — Recruiter Account                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### 6.4 Accessibility & Responsive Breakpoints

- **Contrast Ratios (WCAG 2.1 AA Compliance)**:
  - Text `#FFFFFF` on `#0B1220`: **16.8:1** (Exceeds AAA rating).
  - Text `#D1D5DB` on `#111827`: **10.4:1** (Exceeds AAA rating).
  - Accent `#2563EB` on `#FFFFFF`: **4.6:1** (Passes AA for large text/buttons).
- **Responsive Layout Breakpoints**:
  - `Desktop XL`: `>= 1440px` (Full 3-pane layout, all sidebars expanded).
  - `Desktop`: `1280px - 1439px` (Standard layout).
  - `Laptop / Tablet Landscape`: `1024px - 1279px` (Sidebar collapses to icon-only rail).
  - `Tablet Portrait`: `768px - 1023px` (Sidebar becomes slide-over drawer).
  - `Mobile`: `< 768px` (Single column layout, bottom navigation bar).

---

## 7. The "Investor Demo" Storyboard

*This structured UX narrative ensures presenter walkthroughs flow seamlessly and tell a compelling, evidence-first story.*

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      INVESTOR DEMO WALKTHROUGH FLOW                     │
│                                                                         │
│  [ 1. LANDING ] ────► [ 2. ONBOARDING ] ────► [ 3. PASSPORT CARD ]      │
│  Hero & Graph Canvas     GitHub Sync             82% Identity Progress  │
│                                                         │               │
│  [ 6. STARTUP HUB ] ◄── [ 5. RECRUITER VIEW ] ◄─────────┘               │
│  Prototype Funded        Zero-Resume Evidence                           │
└─────────────────────────────────────────────────────────────────────────┘
```

### Scene-by-Scene Presenter Script & Interface Actions

#### Scene 1: The Vision & Ecosystem Hook
- **Presenter View**: Landing Page (`/`)
- **Action**: Hover over nodes in the interactive Network Graph.
- **Narrative**: *"Investors, meet the fragmented developer ecosystem. Today, talent is scattered across GitHub, LinkedIn, Vercel, and college transcripts. SkillPassport unifies these into one verifiable identity."*

#### Scene 2: Automated Evidence Ingestion
- **Presenter View**: Quick Onboarding (`/onboard`)
- **Action**: Click `"Connect GitHub & Vercel"`. The interface triggers instant optimistic loading skeletons.
- **Narrative**: *"Meet Rahul, a final-year engineering student. In under 10 seconds, Rahul links his GitHub and live deployment URLs. Notice there are no manual resume text fields."*

#### Scene 3: The Skill Passport Identity Reveal
- **Presenter View**: Developer Dashboard (`/dashboard`)
- **Action**: Point out the `IdentityProgressBar` animating smoothly from 35% up to **82% Gold Tier**.
- **Narrative**: *"Instead of unverified claims, Rahul's Skill Passport automatically generates an 82% Proof of Skill score backed by 14 live Vercel deployments and verified repository commits."*

#### Scene 4: The Zero-Resume Recruiter Search
- **Presenter View**: Company Dashboard (`/recruiter`)
- **Action**: Filter candidates by `"Next.js"` and `"Proof Score > 80%"`. Rahul's profile surfaces at the top. Click `"Inspect Evidence Proofs"`.
- **Narrative**: *"Now look at this from a hiring company's perspective. Recruiters don't filter through 500 PDF resumes. They search for verified live evidence. With one click, the recruiter inspects Rahul's live app latency and GitHub commit history."*

#### Scene 5: Visual Storytelling & The Time Capsule
- **Presenter View**: Time Capsule View (`/time-capsule`)
- **Action**: Scroll through Rahul's career trajectory timeline from his first 2024 repository commit to his 2025 hackathon win and 2026 verified internship.
- **Narrative**: *"Recruiters love visual storytelling. Here, Rahul's entire engineering evolution is verified chronologically, leading directly to an instant interview invitation."*

#### Scene 6: The Ultimate Ecosystem Expansion
- **Presenter View**: Startup Hub (`/startup-hub`)
- **Action**: Show Rahul's project listed on the Startup Hub with `$12,000` raised and live prototype demo.
- **Narrative**: *"And here is the power of a unified identity network: Rahul doesn't just get a job—he launches a startup. Investors on our platform discover his verified prototype and fund his company. One platform, an entire career lifecycle."*

---

## 8. Summary Checklist for Frontend Engineers

Before submitting any component pull request or presenting the frontend live to investors, verify the implementation against this production-readiness matrix:

- [ ] **Color Discipline**: All background surfaces use `#0B1220`, `#111827`, or `#1F2937`. Zero bright/unrestrained gradients.
- [ ] **1px Borders**: All cards and structural containers feature subtle `1px solid #1E293B` borders.
- [ ] **Skeleton Screens**: Every asynchronous data query renders geometry-matched skeleton loaders during fetch states.
- [ ] **Sub-200ms Responsiveness**: All button clicks, tab switches, and hover lifts resolve within 150-200ms with zero elastic/bouncy spring physics.
- [ ] **Keyboard Shortcut (`Cmd+K`)**: Universal search modal opens reliably on keyboard trigger.
- [ ] **Evidence First Layout**: No project tile or developer card displays empty claim text without a live link, commit SHA, or verification badge.
- [ ] **Responsive Breakpoints**: Layout adapts cleanly across 1440px, 1024px, 768px, and 375px viewports without horizontal scroll overflow.
