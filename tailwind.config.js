/**
 * @type {import('tailwindcss').Config}
 *
 * Design direction: restrained Linear/Vercel-style system.
 * - One accent colour, neutral surfaces, hairline borders.
 * - Every semantic colour resolves to a CSS custom property, so light and dark
 *   are the *same* components with different tokens — never different classes.
 */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ── Surfaces ── */
        canvas: 'var(--bg-canvas)',
        surface: 'var(--bg-surface)',
        raised: 'var(--bg-raised)',
        inset: 'var(--bg-inset)',
        interactive: 'var(--bg-hover)',
        overlay: 'var(--bg-overlay)',
        header: 'var(--bg-header)',
        sidebar: 'var(--bg-sidebar)',

        /* ── Hairlines ── */
        hairline: 'var(--border-hairline)',
        line: 'var(--border-default)',
        strong: 'var(--border-strong)',
        focusring: 'var(--border-focus)',

        /* ── Foreground ── */
        fg: 'var(--text-primary)',
        'fg-muted': 'var(--text-secondary)',
        'fg-subtle': 'var(--text-muted)',
        'fg-inverse': 'var(--text-inverse)',

        /* ── Single accent + semantic states ── */
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-fill': 'var(--accent-fill)',
        'accent-fill-hover': 'var(--accent-fill-hover)',
        'accent-soft': 'var(--accent-soft)',
        'accent-fg': 'var(--accent-fg)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        info: 'var(--info)',

        /* Pre-mixed fills/borders (alpha can't be applied to a var()) */
        'success-soft': 'var(--success-soft)',
        'warning-soft': 'var(--warning-soft)',
        'danger-soft': 'var(--danger-soft)',
        'info-soft': 'var(--info-soft)',
        'warning-border': 'var(--warning-border)',
        'danger-border': 'var(--danger-border)',

        /* ── Legacy design tokens (kept for existing components) ── */
        canvasLight: '#FAFAFA',
        canvasDark: '#0B1220',
        cardLight: '#FFFFFF',
        cardDark: '#111827',
        mutedLight: '#F1F5F9',
        mutedDark: '#1E293B',

        /* ── Brand accents (existing components) ── */
        purple: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          950: '#2E1065',
        },
        cyan: {
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
        },
        zinc: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
          950: '#09090B',
        },
      },
      fontFamily: {
        sans: ['Figtree', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        'micro': ['0.625rem', { lineHeight: '0.875rem', letterSpacing: '0.06em' }],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        pop: 'var(--shadow-pop)',
        lift: 'var(--shadow-lift)',
        'purple-glow': '0 0 25px -5px rgba(124, 58, 237, 0.4)',
        'cyan-glow': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'zinc-card': 'var(--shadow-card)',
        'zinc-card-hover': 'var(--shadow-lift)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'translateY(6px) scale(0.985)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 180ms cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scale-in 180ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
