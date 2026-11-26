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
          light: '#fafafa',
          dark: '#09090b',
        },
        ink: {
          light: '#09090b',
          dark: '#fafafa',
          muted: '#71717a',
          dim: '#a1a1aa',
        },
        accent: {
          DEFAULT: '#1d7eb6',
          hover: '#156593',
          muted: '#e0f2fe',
          darkMuted: '#082f49',
        },
        cobalt: {
          DEFAULT: '#1d7eb6',
          hover: '#156593',
          light: '#38bdf8',
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
    },
  },
  plugins: [],
}
