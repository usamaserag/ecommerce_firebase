/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F97316',
        primaryHover: '#F3590E',
        white: '#ffffff'
      },
      boxShadow: {
        'currentShadow': 'rgba(100, 100, 110, 0.3) 0px 8px 10px 0px',
        'cardShadow' : '0 0 10px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [require("daisyui")],
}

