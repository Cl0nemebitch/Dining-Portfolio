/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#1A1A1A',
        gold: '#D4AF37',
        champagne: '#F7E7CE',
      },
    },
  },
  plugins: [],
}
