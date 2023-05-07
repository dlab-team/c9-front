/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      borderRadius: {
        'xl': '1.5rem',
      },
      colors: {
        'navbar-blue': '#1E3A8A',
      },
    },
  },
  darkMode: "class",
  plugins: [require("tw-elements/dist/plugin.cjs")],
}

