/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      color: {
        customGray: '#F9FAFB',
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
        // OnSelect: '#9AA2AC',

      }
    },
  },
  plugins: [],
}

