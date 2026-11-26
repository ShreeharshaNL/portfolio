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
        canvas: {
          light: '#faf7f2',
          dark: '#111620',
        },
        ink: {
          light: '#18181b',
          dark: '#f8fafc',
          muted: '#71717a',
          dim: '#a1a1aa',
        },
        coral: {
          DEFAULT: '#e07a5f',
          hover: '#cf6b50',
          light: '#f49d85',
          muted: '#fdf0ec',
          darkMuted: '#2d1b16',
        },
        teal: {
          DEFAULT: '#4a7b87',
          hover: '#3b6570',
          light: '#7ec3d4',
          muted: '#edf5f7',
          darkMuted: '#14252a',
        },
        accent: {
          DEFAULT: '#e07a5f',
          hover: '#cf6b50',
          muted: '#fdf0ec',
          darkMuted: '#2d1b16',
          teal: '#4a7b87',
          tealLight: '#7ec3d4',
        },
        cobalt: {
          DEFAULT: '#4a7b87',
          hover: '#3b6570',
          light: '#7ec3d4',
          dark: '#2e5058',
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
          '50%': { transform: 'translateY(-8px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
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
