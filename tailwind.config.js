/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        customGray: '#505050',
        borderOutline: '#B5BAC0',
        iconFill: '#F6FCFF',

        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",

        // OnSelect: '#9AA2AC',
      },
      fontFamily: {
        sans: ['sans-serif'],
        poppins: ['Poppins'],
      },
    },
  },
  plugins: [],
}
