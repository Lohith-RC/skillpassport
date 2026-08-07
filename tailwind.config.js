/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          light: '#FAFAFA',
          dark: '#0B1220',
        },
        card: {
          light: '#FFFFFF',
          dark: '#111827',
        },
        hover: {
          light: '#F8FAFC',
          dark: '#1F2937',
        },
        muted: {
          light: '#F1F5F9',
          dark: '#1E293B',
        },
        purple: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          500: '#8B5CF6',
          600: '#7C3AED', /* Primary Royal Purple Accent */
          700: '#6D28D9',
          800: '#5B21B6',
        },
        emerald: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          500: '#10B981', /* Green Contribution Graph Accent */
          600: '#059669',
          700: '#047857',
        },
        slate: {
          900: '#0F172A',
          800: '#1E293B',
          600: '#475569',
          400: '#94A3B8',
          200: '#E2E8F0',
          100: '#F1F5F9',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'purple-glow': '0 0 25px -5px rgba(124, 58, 237, 0.35)',
        'emerald-glow': '0 0 25px -5px rgba(16, 185, 129, 0.35)',
        'light-card': '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
        'light-card-hover': '0 10px 30px -4px rgba(124, 58, 237, 0.15), 0 4px 10px -2px rgba(15, 23, 42, 0.04)',
      },
    },
  },
  plugins: [],
};
