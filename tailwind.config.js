/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0B0F19',
          card: '#111827',
          accent: '#00F0FF',
          purple: '#7000FF',
          gold: '#FFB800',
          danger: '#FF0055',
          success: '#00FF66'
        }
      }
    },
  },
  plugins: [],
}
