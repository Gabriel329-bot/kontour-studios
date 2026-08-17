import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#080908',
        surface: '#0F120F',
        acid: '#00FF66',
        emerald: '#10E575',
        deepgreen: '#0A2B18',
        taggreen: '#1B432C',
        muted: '#94A3B8'
      },
      fontFamily: {
        sans: ['var(--font-space)', 'Arial', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace']
      },
      boxShadow: {
        glow: '0 0 60px rgba(0,255,102,.16)',
        'glow-strong': '0 0 50px rgba(0,255,102,.28)'
      }
    }
  },
  plugins: []
}
export default config
