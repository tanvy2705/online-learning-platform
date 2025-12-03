/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6a11cb",
        secondary: "#2575fc",
        "light-gray": "#f7f7f7"
      }
    }
  },
  plugins: [],
}