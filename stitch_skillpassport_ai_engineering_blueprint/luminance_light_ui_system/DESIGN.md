---
name: Luminance Light UI System
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#4a4455'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#7b7487'
  outline-variant: '#ccc3d8'
  surface-tint: '#732ee4'
  primary: '#630ed4'
  on-primary: '#ffffff'
  primary-container: '#7c3aed'
  on-primary-container: '#ede0ff'
  inverse-primary: '#d2bbff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#704500'
  on-tertiary: '#ffffff'
  tertiary-container: '#905b00'
  on-tertiary-container: '#ffe1c0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d2bbff'
  on-primary-fixed: '#25005a'
  on-primary-fixed-variant: '#5a00c6'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.15'
    letterSpacing: -0.025em
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.015em
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.35'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  body:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  body-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.5'
    letterSpacing: '0'
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: '0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
---

# Light Theme Design System Specification — `design.md`

**System Name:** Luminance Light UI System  
**Aesthetic Intent:** Clean, Airy, High-Legibility, Professional SaaS Interface  
**Primary Accent:** Royal Purple (`#7C3AED`)  
**Version:** 1.0.0  

---

## 1. Design Philosophy & Vision

The **Luminance Light UI System** is engineered for modern SaaS applications requiring a clean, spacious, and trustworthy visual identity. 

### Core Aesthetic Pillars
1. **Airy & Spacious**: Generous white space (using an 8pt grid), low-density surface clutter, and breathing room around interactive elements.
2. **Vibrant Purple Accents**: Primary focus and call-to-action elements use rich, energetic Royal Purple (`#7C3AED`), creating strong focal points against crisp off-white canvas backgrounds.
3. **Subtle Elevation & Soft Shadows**: Depth is defined through multi-layered 1px slate borders (`#E2E8F0`) paired with subtle ambient diffusion shadows rather than heavy dark fills.
4. **Impeccable Typography**: Crisp contrast with Slate 900 (`#0F172A`) headings and Slate 600 (`#475569`) body copy for maximum readability across light viewports.

---

## 2. Color Palette & Token Specification

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     LIGHT THEME COLOR PALETTE                           │
├───────────────────┬─────────┬───────────────────────────────────────────┤
│ Token Name        │ Hex Code│ Application Context                       │
├───────────────────┼─────────┼───────────────────────────────────────────┤
│ Canvas Base       │ #FAFAFA │ Main application background               │
│ Card Surface      │ #FFFFFF │ Primary elevated cards, modals, dropdowns │
│ Muted Surface     │ #F1F5F9 │ Secondary panels, hover states, code boxes│
│ Border Subtle     │ #E2E8F0 │ 1px Card outlines & section dividers      │
│ Border Focus      │ #7C3AED │ Active input focus rings & selected tabs  │
├───────────────────┼─────────┼───────────────────────────────────────────┤
│ Purple Primary    │ #7C3AED │ Main CTAs, primary buttons, active icons  │
│ Purple Hover      │ #6D28D9 │ Button hover state                        │
│ Purple Dark/Active│ #5B21B6 │ Button active / pressed state             │
│ Purple Soft Tint  │ #F3E8FF │ Subtle badge backgrounds, active item tint│
├───────────────────┼─────────┼───────────────────────────────────────────┤
│ Text Primary      │ #0F172A │ Headings, main text, metric values        │
│ Text Secondary    │ #475569 │ Body copy, form labels, secondary titles  │
│ Text Muted        │ #94A3B8 │ Captions, metadata, placeholder text      │
├───────────────────┼─────────┼───────────────────────────────────────────┤
│ Success Emerald   │ #10B981 │ Positive status seals, completed steps    │
│ Warning Amber     │ #F59E0B │ Pending verification, audit alerts        │
│ Destructive Red   │ #EF4444 │ Errors, deletion CTAs, failed validation  │
└───────────────────┴─────────┴───────────────────────────────────────────┘
```

### 2.1 CSS Custom Properties (`:root`)

```css
:root {
  /* Surface Tokens */
  --bg-canvas: #FAFAFA;
  --bg-card: #FFFFFF;
  --bg-muted: #F1F5F9;
  --bg-hover: #F8FAFC;

  /* Border Tokens */
  --border-subtle: #E2E8F0;
  --border-default: #CBD5E1;
  --border-focus: #7C3AED;

  /* Brand Accent Tokens (Royal Purple) */
  --purple-primary: #7C3AED;
  --purple-hover: #6D28D9;
  --purple-active: #5B21B6;
  --purple-soft: #F3E8FF;
  --purple-soft-hover: #E9D5FF;

  /* Text Tokens */
  --text-primary: #0F172A;
  --text-secondary: #475569;
  --text-muted: #94A3B8;
  --text-on-purple: #FFFFFF;

  /* Semantic Feedback Tokens */
  --success: #10B981;
  --warning: #F59E0B;
  --destructive: #EF4444;

  /* Elevation Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(15, 23, 42, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04);
  --shadow-lg: 0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04);
  --shadow-purple-glow: 0 0 20px -3px rgba(124, 58, 237, 0.35);
}
```

---

## 3. Typography Hierarchy

Primary Font Stack: `Inter`, `Plus Jakarta Sans`, `-apple-system`, `sans-serif`  
Monospace Font Stack: `JetBrains Mono`, `Fira Code`, `monospace`

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        TYPOGRAPHY HIERARCHY                             │
├───────────────┬──────┬────────┬─────────────┬───────────┬───────────────┤
│ Scale Token   │ Size │ Weight │ Line Height │ Letter Sp.│ Context       │
├───────────────┼──────┼────────┼─────────────┼───────────┼───────────────┤
│ display       │ 40px │ 800    │ 1.15        │ -0.025em  │ Hero Title    │
│ h1            │ 32px │ 700    │ 1.2         │ -0.02em   │ Page Title    │
│ h2            │ 24px │ 600    │ 1.25        │ -0.015em  │ Section Title │
│ h3            │ 18px │ 600    │ 1.35        │ -0.01em   │ Card Header   │
│ body-lg       │ 16px │ 400    │ 1.5         │ 0         │ Featured Body │
│ body          │ 14px │ 400    │ 1.5         │ 0         │ Regular Body  │
│ body-bold     │ 14px │ 600    │ 1.5         │ 0         │ Form Labels   │
│ caption       │ 12px │ 500    │ 1.4         │ 0.01em    │ Badges & Sub  │
│ mono          │ 13px │ 500    │ 1.4         │ 0         │ Code & SHA    │
└───────────────┴──────┴────────┴─────────────┴───────────┴───────────────┘
```

---

## 4. Button System & Interactive Controls

Buttons are the focal identity anchors in the Luminance Light system. Primary buttons utilize Royal Purple (`#7C3AED`) with crisp white typography and a soft purple elevation glow on focus.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         BUTTON VARIANT GUIDE                            │
├──────────────┬──────────────────┬─────────────────┬─────────────────────┤
│ Variant      │ Background       │ Text Color      │ Border / Shadow     │
├──────────────┼──────────────────┼─────────────────┼─────────────────────┤
│ Primary      │ #7C3AED          │ #FFFFFF         │ shadow-sm / glow    │
│ Primary Hover│ #6D28D9          │ #FFFFFF         │ shadow-md           │
│ Secondary    │ #FFFFFF          │ #0F172A         │ 1px border #E2E8F0 │
│ Purple Soft  │ #F3E8FF          │ #7C3AED         │ none                │
│ Outline      │ Transparent      │ #7C3AED         │ 2px border #7C3AED  │
│ Destructive │ #EF4444          │ #FFFFFF         │ shadow-sm           │
│ Disabled     │ #F1F5F9          │ #94A3B8         │ cursor-not-allowed  │
└──────────────┴──────────────────┴─────────────────┴─────────────────────┘
```

### 4.1 React Button Component Implementation (`Button.tsx`)

```tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-slate-100 disabled:text-slate-400',
  {
    variants: {
      variant: {
        primary:
          'bg-[#7C3AED] text-white hover:bg-[#6D28D9] active:bg-[#5B21B6] shadow-sm hover:shadow-md hover:shadow-purple-500/20',
        secondary:
          'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm',
        soft:
          'bg-[#F3E8FF] text-[#7C3AED] hover:bg-[#E9D5FF] active:bg-[#D8B4FE]',
        outline:
          'bg-transparent text-[#7C3AED] border-2 border-[#7C3AED] hover:bg-[#F3E8FF]',
        destructive:
          'bg-red-500 text-white hover:bg-red-600 shadow-sm',
        ghost:
          'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900',
      },
      size: {
        sm: 'h-8 px-3 text-xs rounded-md',
        md: 'h-10 px-4 text-sm rounded-lg',
        lg: 'h-12 px-6 text-base rounded-xl',
        icon: 'h-10 w-10 p-0 rounded-lg',
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
        {isLoading && (
          <svg className="mr-2 h-4 w-4 animate-spin text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
```

---

## 5. Component Spacing & Layout Architecture

The system strictly adheres to an **8-point spatial grid system**:

```json
{
  "spacingScale": {
    "0.5": "2px",
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px",
    "8": "32px",
    "10": "40px",
    "12": "48px",
    "16": "64px"
  },
  "borderRadius": {
    "sm": "6px",
    "md": "10px",
    "lg": "14px",
    "xl": "20px",
    "full": "9999px"
  }
}
```

### 5.1 Light Theme Card Container Specification (`Card.tsx`)

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';
```

---

## 6. Tailwind CSS Theme Extension (`tailwind.config.js`)

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FAFAFA',
        card: '#FFFFFF',
        muted: '#F1F5F9',
        border: {
          subtle: '#E2E8F0',
          default: '#CBD5E1',
        },
        purple: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          500: '#8B5CF6',
          600: '#7C3AED', /* Primary Accent */
          700: '#6D28D9', /* Hover */
          800: '#5B21B6', /* Active */
        },
        slate: {
          900: '#0F172A', /* Text Primary */
          600: '#475569', /* Text Secondary */
          400: '#94A3B8', /* Text Muted */
        }
      },
      boxShadow: {
        'purple-glow': '0 0 20px -3px rgba(124, 58, 237, 0.35)',
      },
      borderRadius: {
        lg: '14px',
        md: '10px',
        sm: '6px',
      }
    }
  }
}
```