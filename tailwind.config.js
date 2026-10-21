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
        mc: {
          dirt: '#866043',
          grass: '#5c8e32',
          grassLight: '#7ec046',
          stone: '#737373',
          stoneDark: '#505050',
          deepslate: '#1b1d24',
          bedrock: '#12141a',
          diamond: '#4dedf4',
          diamondGlow: '#80ffff',
          diamondDark: '#1b8b91',
          emerald: '#17dd62',
          gold: '#fcee4b',
          goldShadow: '#b0a31c',
          redstone: '#ff3322',
          netherite: '#3e3436',
          gui: {
            bg: '#c6c6c6',
            panel: '#dcdcdc',
            slot: '#8b8b8b',
            slotDark: '#373737',
            darkBg: '#181b24',
            darkSurface: '#212635',
            darkElevated: '#2a3144',
            darkBorder: '#363d50',
            darkBorderMuted: '#2b3040',
          }
        },
        omarchy: {
          darkest: '#080a0e',
          base: '#0c0f14',
          surface: '#12161f',
          elevated: '#181e29',
          highlight: '#202736',
          border: '#232b3b',
          borderSubtle: '#191f2b',
          borderMuted: '#2e384d',
          amber: '#f59e0b',
          amberGlow: '#fbbf24',
          amberDim: '#b45309',
          amberSoft: 'rgba(245, 158, 11, 0.1)',
          emerald: '#10b981',
          emeraldSoft: 'rgba(16, 185, 129, 0.12)',
          cyan: '#38bdf8',
          cyanSoft: 'rgba(56, 189, 248, 0.1)',
          text: {
            bright: '#f8fafc',
            muted: '#94a3b8',
            dim: '#64748b',
          }
        }
      },
      fontFamily: {
        pixel: ['"Pixelify Sans"', '"Silkscreen"', 'monospace'],
        minecraft: ['"Silkscreen"', '"Pixelify Sans"', 'monospace'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(0.96)' },
        },
      },
      animation: {
        'cursor-blink': 'blink 1.05s infinite',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
