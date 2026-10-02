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
          600: '#7C3AED', /* Primary Electric Purple Accent */
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
          500: '#06B6D4', /* Electric Cyan Accent */
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
        sans: ['Inter', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'purple-glow': '0 0 25px -5px rgba(124, 58, 237, 0.4)',
        'cyan-glow': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'zinc-card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'zinc-card-hover': '0 10px 25px -5px rgba(124, 58, 237, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};
