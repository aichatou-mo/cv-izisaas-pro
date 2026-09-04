/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          void: '#0B0B10',
          gold: '#D4A843',
          goldLight: '#F3DE97',
          goldDark: '#A67D24',
          goldGlow: 'rgba(212, 168, 67, 0.35)',
          ghost: '#F8F8FC',
          graphite: '#16161F',
          surface: '#12121A',
          surfaceCard: '#1A1A26',
          borderSubtle: 'rgba(212, 168, 67, 0.18)'
        }
      },
      fontFamily: {
        sans: ['"Sora"', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        mono: ['"Fira Code"', 'monospace']
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem'
      }
    },
  },
  plugins: [],
}
