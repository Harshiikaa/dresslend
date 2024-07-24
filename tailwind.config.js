/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        customGray: '#505050',
        borderOutline: '#B5BAC0',
        iconFill: '#F6FCFF',
        boldText: '#181E4B',
        orangeTheme: '#F1A501',
        grayText: "#8B96A5",
        paymentbg: "#8B2950",
      },
      fontFamily: {
        sans: ['sans-serif'],
        poppins: ['Poppins'],
      },
    },
  },
  plugins: [],
}
