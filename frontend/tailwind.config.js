/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "../backend/app/**/*.{html,js}"
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#FAA916",
          "secondary": "#6D676E",
          "accent": "#96031A",
          "neutral": "#18181E",
          "base-100": "#FBFFFE",
          "info": "#38bdf8",
          "success": "#00d573",
          "warning": "#d64c00",
          "error": "#da003d",
          "red":"#fa0000"
        },
      },
    ],
  },
  theme: {
    colors: {
      "primary": "#FAA916",
      "secondary": "#6D676E",
      "accent": "#96031A",
      "neutral": "#18181E",
      "base-100": "#FBFFFE",
      "info": "#38bdf8",
      "success": "#00d573",
      "warning": "#d64c00",
      "error": "#da003d",
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
