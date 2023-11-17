/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00b96b',
        primaryHover: '#00d96b',
        white: '#ffffff'
      },
      boxShadow: {
        'currentShadow': 'rgba(100, 100, 110, 0.3) 0px 8px 10px 0px',
      }
    },
  },
  plugins: [require("daisyui")],
}

