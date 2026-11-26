/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./apps/professional/index.html",
    "./apps/professional/src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cad: {
          bg: 'var(--cad-bg)',
          panel: 'var(--cad-panel)',
          subtle: 'var(--cad-panel-subtle)',
          accent: 'var(--cad-accent)',
          hover: 'var(--cad-accent-hover)',
          text: 'var(--cad-text)',
          muted: 'var(--cad-muted)',
          dim: 'var(--cad-dim)',
          status: 'var(--cad-status)',
          border: 'var(--cad-border)',
          gold: 'var(--cad-accent)',
        },
        canvas: {
          light: '#F5F7F4',
          dark: '#0D1613',
          DEFAULT: 'var(--cad-bg)',
        },
        ink: {
          light: '#111A16',
          dark: '#E9E4D2',
          muted: 'var(--cad-muted)',
          dim: 'var(--cad-dim)',
          DEFAULT: 'var(--cad-text)',
        },
        accent: {
          DEFAULT: 'var(--cad-accent)',
          hover: 'var(--cad-accent-hover)',
          muted: 'rgba(217, 164, 65, 0.15)',
          darkMuted: 'rgba(217, 164, 65, 0.15)',
        },
        panel: {
          DEFAULT: 'var(--cad-panel)',
          dark: '#13211C',
          light: '#FFFFFF',
        },
        border: {
          DEFAULT: 'var(--cad-border)',
          gold: 'var(--cad-accent)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      lineHeight: {
        relaxed: '1.6',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.04)' },
        },
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        'marquee-fast': 'marquee 22s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
        float: 'float 5s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
