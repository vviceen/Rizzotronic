/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
