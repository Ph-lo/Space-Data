/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "spacexLogo": "url('../assets/logo.png')",
      },
      width: {
        '4242': '49%'
      },
      screens: {
        xs: {'max': '769px'}
      },
      margin: {
        '590px': '590px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('flowbite/plugin'),
  ],
}
