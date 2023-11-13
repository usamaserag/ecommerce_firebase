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
      },
    },
  },
  plugins: [require("daisyui")],
}

