/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#090d16',
        surface: '#0f172a',
        'surface-card': '#131d33',
        'surface-light': '#1e293b',
        'zinc-border': '#27272a',
        'slate-border': '#1e293b',
        primary: {
          DEFAULT: '#3b82f6',
          glow: '#60a5fa',
        },
        emerald: {
          glow: '#10b981',
          subtle: '#064e3b',
        },
        rose: {
          glow: '#f43f5e',
          subtle: '#881337',
        },
        amber: {
          glow: '#f59e0b',
          subtle: '#78350f',
        },
        violet: {
          glow: '#8b5cf6',
          subtle: '#4c1d95',
        },
        cyan: {
          glow: '#06b6d4',
          subtle: '#164e63',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.4)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.4)',
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.4)',
        'glow-rose': '0 0 25px -5px rgba(244, 63, 94, 0.4)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 4s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
