# SkillPassport AI — Frontend Architecture & Scaffolding Technical Specification

**Version:** 1.0.0  
**Target Applications:** Next.js 14 Web Operating System & WebGL Engine  
**Language Specification:** TypeScript 5.x Strict Mode  
**Styling Framework:** Tailwind CSS 3.4+ & shadcn/ui (Radix Primitives)  
**Status:** Canonical Frontend Engineering Blueprint  

---

## 1. Project Overview & Tech Stack

This document defines the production engineering standards, folder hierarchy, component composition patterns, and data integration protocols for the SkillPassport AI frontend application.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     FRONTEND TECHNOLOGY MATRIX                          │
├───────────────────┬─────────────────────────────────────────────────────┤
│ Core Framework    │ Next.js 14 (App Router Architecture)                │
│ Language          │ TypeScript 5.3+ (Strict Mode Enabled)               │
│ UI Component Library│ shadcn/ui + Radix UI Primitives                     │
│ Styling Engine    │ Tailwind CSS + CSS Custom Property Tokens           │
│ 3D & Graphics     │ Three.js + @react-three/fiber + @react-three/drei   │
│ Client State      │ Zustand (Persisted & Ephemeral Stores)              │
│ Server State & Data│ TanStack Query v5 (React Query)                     │
│ Form Engine       │ React Hook Form + Zod Schema Validation             │
│ Motion & Animation│ Framer Motion 11.x                                  │
│ Icons             │ Lucide React                                        │
│ Testing Suite     │ Vitest + React Testing Library + Playwright (E2E)   │
└───────────────────┴─────────────────────────────────────────────────────┘
```

---

## 2. Architecture & Folder Structure

The application enforces a **Feature-First Atomic Architecture** inside the Next.js `src/` directory.

```
skillpassport-web/
├── .github/                    # CI/CD Workflows (GitHub Actions)
├── public/                     # Static Assets (Fonts, WebGL Shaders, Textures)
├── src/
│   ├── app/                    # Next.js App Router Pages & Layouts
│   │   ├── (auth)/             # Authentication Route Group (Login, Register)
│   │   ├── (dashboard)/        # Operating System Dashboard Route Group
│   │   │   ├── passport/       # /passport (Skill Passport View)
│   │   │   ├── portfolio/      # /portfolio (Project Evidence Cards)
│   │   │   ├── recruiter/      # /recruiter (Evidence Pipeline)
│   │   │   ├── time-capsule/   # /time-capsule (Career Trajectory)
│   │   │   └── layout.tsx      # Sidebar & Utility Top Bar Layout Wrapper
│   │   ├── api/                # Next.js API Proxy Routes
│   │   ├── layout.tsx          # Root Layout & Theme Providers
│   │   └── page.tsx            # 3D Scroll Landing Page
│   │
│   ├── components/             # Reusable Design System Components
│   │   ├── ui/                 # Atomic Primitive Controls (Button, Dialog, Card)
│   │   ├── canvas/             # Three.js 3D WebGL Scene & Shader Components
│   │   ├── composite/          # Complex Multi-element Components (SkillPassportCard)
│   │   └── feedback/           # Skeletons, Toast Notifications, Empty States
│   │
│   ├── config/                 # Environment Variables & Site Metadata
│   ├── features/               # Feature-Driven Business Logic Domains
│   │   ├── passport/           # Passport Services, Hooks, Types & Components
│   │   ├── recruiter/          # Recruiter Search Pipeline Services & Hooks
│   │   └── analytics/          # Proof Score Radial Engines
│   │
│   ├── hooks/                  # Custom Utility React Hooks (useDebounce, useScroll)
│   ├── lib/                    # Third-Party Configurations (Axios client, QueryClient)
│   ├── stores/                 # Zustand Global Client State Stores
│   ├── styles/                 # Global CSS Custom Tokens & Tailwind Directives
│   └── types/                  # Global TypeScript Interfaces & Ambient Declarations
│
├── .eslintrc.json              # Strict ESLint Configuration
├── next.config.js              # Next.js Optimization Config
├── tailwind.config.js          # Design Token Tailwind Theme Extension
├── tsconfig.json               # Compiler Strict Mode Settings
└── vitest.config.ts            # Unit Test Configuration
```

---

## 3. State Management Protocol

State management is strictly segmented into four distinct layers:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         STATE TAXONOMY MATRIX                           │
├─────────────────┬───────────────────────┬───────────────────────────────┤
│ Layer           │ Solution              │ Usage Scope                   │
├─────────────────┼───────────────────────┼───────────────────────────────┤
│ Local Component │ React useState        │ Dropdown opens, modal toggles │
│ Form State      │ React Hook Form + Zod │ Input validation, dynamic step│
│ Global Client   │ Zustand               │ Active user profile, sidebar  │
│ Server State    │ TanStack Query v5     │ REST API responses, caching   │
└─────────────────┴───────────────────────┴───────────────────────────────┘
```

### 3.1 Global Client Store Example (`src/stores/useUserStore.ts`)

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  userId: string | null;
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  isSidebarOpen: boolean;
  setUserId: (id: string) => void;
  toggleSidebar: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: null,
      tier: 'GOLD',
      isSidebarOpen: true,
      setUserId: (id) => set({ userId: id }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    }),
    { name: 'skillpassport-user-storage' }
  )
);
```

---

## 4. Styling & Design System Protocol

### 4.1 CSS Custom Property Tokens (`src/styles/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --bg-base: 11 18 32;       /* #0B1220 Slate Base */
    --bg-surface-l1: 17 24 39;  /* #111827 Card Surface */
    --bg-surface-l2: 31 41 55;  /* #1F2937 Elevated Hover */
    
    --accent-blue: 37 99 235;   /* #2563EB Royal Accent */
    --accent-emerald: 16 185 129;/* #10B981 Verified Emerald */
    --accent-amber: 245 158 11; /* #F59E0B Warning Amber */

    --border-subtle: 30 41 59;  /* #1E293B Card Dividers */
    --border-default: 51 65 85; /* #334155 Component Outline */
  }
}

body {
  background-color: rgb(var(--bg-base));
  color: #FFFFFF;
  font-family: var(--font-inter), sans-serif;
}
```

---

## 5. Component Architecture & Coding Standards

All UI components must adhere to the **Atomic Compound Pattern**:
1. Single Responsibility Principle.
2. Explicit TypeScript interface props (`ComponentNameProps`).
3. Zero inline style attributes (use Tailwind utilities).

### 5.1 Standard Component Boilerplate (`src/components/ui/Button.tsx`)

```tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-accent-blue text-white hover:bg-accent-blue/90 shadow-lg shadow-accent-blue/20',
        secondary: 'bg-bg-surface-l2 text-white border border-border-default hover:bg-bg-surface-l2/80',
        ghost: 'hover:bg-bg-surface-l2 text-gray-300 hover:text-white',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-5 text-sm',
        lg: 'h-12 px-7 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
```

---

## 6. API & Data Fetching Layer

### 6.1 Axios Client Wrapper (`src/lib/api-client.ts`)

```typescript
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.skillpassport.ai/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 6.2 Query Hook with Zod Validation (`src/features/passport/useGetPassport.ts`)

```typescript
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { apiClient } from '@/lib/api-client';

const PassportSchema = z.object({
  id: z.string(),
  name: z.string(),
  proofScore: z.number(),
  tier: z.enum(['BRONZE', 'SILVER', 'GOLD', 'PLATINUM']),
  verifiedSkills: z.array(z.string()),
});

export type PassportData = z.infer<typeof PassportSchema>;

export const useGetPassport = (developerId: string) => {
  return useQuery({
    queryKey: ['passport', developerId],
    queryFn: async () => {
      const response = await apiClient.get(`/passports/${developerId}`);
      return PassportSchema.parse(response.data);
    },
    staleTime: 1000 * 60 * 5, // 5 Minutes
  });
};
```

---

## 7. Documentation & Testing Standards

### 7.1 Component Documentation (Storybook)
Every core UI primitive must feature a `.stories.tsx` file documenting all variants, sizes, and states.

### 7.2 Unit Testing Standard (Vitest + RTL)

```typescript
// src/components/ui/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '../Button';

describe('Button Component', () => {
  it('renders primary variant correctly', () => {
    render(<Button variant="primary">Get Passport</Button>);
    const button = screen.getByRole('button', { name: /get passport/i });
    expect(button).toBeInDocument();
    expect(button).toHaveClass('bg-accent-blue');
  });
});
```

---

## 8. Development Workflow & Quality Assurance

- **Linting & Formatting**: Enforced via ESLint + Prettier. Run `npm run lint` prior to commit.
- **Git Hook Enforcement**: Husky + `lint-staged` prevents non-conforming commits.
- **Commit Format Rules**: Enforce Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).
- **Vercel Pipeline**: Automatic preview deployment generated per Pull Request; production deployment triggers on `main` merge.
