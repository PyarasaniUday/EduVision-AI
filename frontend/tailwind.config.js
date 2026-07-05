/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        google: {
          blue: '#1a73e8',
          red: '#ea4335',
          yellow: '#fbbc05',
          green: '#34a853',
          dark: '#202124',
          gray: '#5f6368',
          light: '#f1f3f4'
        },
        brand: {
          primary: '#1A73E8',     // Deep Google Blue
          secondary: '#1557B0',   // Darker shade
          accent: '#FF9100',      // Warm Amber/orange for highlights
          background: '#0F172A',  // Slate 900 for modern dark themes
          surface: '#1E293B',     // Slate 800
          border: '#334155'       // Slate 700
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
