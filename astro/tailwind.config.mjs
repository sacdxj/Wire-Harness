/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  corePlugins: {
    preflight: true,
  },
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0a0e17',
          secondary: '#111827',
          tertiary: '#1f2937'
        },
        accent: {
          cyan: '#00d4ff',
          amber: '#f59e0b',
          green: '#10b981'
        },
        text: {
          primary: '#f9fafb',
          secondary: '#9ca3af',
          muted: '#6b7280'
        },
        border: {
          DEFAULT: '#1f2937'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Space Grotesk', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'tech-grid': 'linear-gradient(rgba(0, 212, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.08) 1px, transparent 1px)'
      }
    }
  },
  plugins: [],
  // Safari 16.4+ font-display optimization
  safelist: []
};
