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
      // Keep your custom brand scale but rely on Tailwind's built-in
      // emerald-* for UI. emerald-700 (#047857) is the Supabase-adjacent
      // muted-but-confident green that works on white backgrounds.
      colors: {
        brand: {
          50:  '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',  // primary — use this as main accent
          800: '#065f46',
          900: '#064e3b',
        },
      },
    },
  },
  plugins: [],
}
export default config