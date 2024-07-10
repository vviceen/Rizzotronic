/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    //"./src/components/*.html",
    "./src/*.html",
    "./src/views/*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
