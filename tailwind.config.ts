import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#e8faf0',
          100: '#d1f4e2',
          200: '#a3e9c4',
          300: '#75dea7',
          400: '#47d389',
          500: '#2ecc71',   // primary green
          600: '#25a55a',
          700: '#1c7e44',
          800: '#13562d',
          900: '#0a2f19',
        },
      },
    },
  },
  plugins: [],
}
export default config