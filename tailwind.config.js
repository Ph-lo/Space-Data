/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '4242': '49%'
      },
      screens: {
        xs: {'max': '765px'}
      },
      margin: {
        '590px': '590px'
      }
    },
  },
  plugins: [],
}
