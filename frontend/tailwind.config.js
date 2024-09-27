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
          "admin": "#2b9999",
          "vendedor": "#A8B545",
          "cliente": "#C2C0A6",
          "accent": "#b7021d",
          "neutral": "#18181E",
          "base-100": "#FBFFFE",
          "green": "#84B026",
          "info": "#38bdf8",
          "success": "#2F6400",
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
      "admin": "#2b9999",
      "vendedor": "#A8B545",
      "cliente": "#C2C0A6",
      "accent": "#b7021d",
      "neutral": "#18181E",
      "base-100": "#FBFFFE",
      "green": "#84B026",
      "info": "#38bdf8",
      "success": "#00D640",
      "warning": "#D62500",
      "error": "#da003d",
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
