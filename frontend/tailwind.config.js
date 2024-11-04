/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "../backend/app/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        // Extiende los colores de Tailwind CSS
        primary: {
          light: '#3B82F6', // Azul claro
          DEFAULT: '#1E3A8A', // Azul oscuro
          dark: '#1E3A8A', // Azul oscuro
        },
        secondary: {
          light: '#10B981', // Verde claro
          DEFAULT: '#065F46', // Verde oscuro
          dark: '#065F46', // Verde oscuro
        },
        cliente: {
          light: '#A78BFA', // Púrpura claro
          DEFAULT: '#7C3AED', // Púrpura oscuro
          dark: '#7C3AED', // Púrpura oscuro
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        cliente: {
          "primary": "#FAA916",
          "secondary": "#6D676E",
          "accent": "#b7021d",
          "neutral": "#18181E",
          "base-100": "#FBFFFE",
          "info": "#38bdf8",
          "success": "#2F6400",
          "warning": "#d64c00",
          "error": "#da003d",
        },
      },
      {
        admin: {
          "primary": "#1E3A8A", // Azul oscuro
          "secondary": "#3B82F6", // Azul claro
          "accent": "#b7021d",
          "neutral": "#18181E",
          "base-100": "#FBFFFE",
          "info": "#38bdf8",
          "success": "#2F6400",
          "warning": "#d64c00",
          "error": "#da003d",
        },
      },
      {
        vendedor: {
          "primary": "#065F46", // Verde oscuro
          "secondary": "#10B981", // Verde claro
          "accent": "#b7021d",
          "neutral": "#18181E",
          "base-100": "#FBFFFE",
          "info": "#38bdf8",
          "success": "#2F6400",
          "warning": "#d64c00",
          "error": "#da003d",
        },
      }
    ],
  },
  plugins: [require("daisyui")],
}