/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        uims: {
          red: '#D62828',
          black: '#1A1A1A',
        }
      }
    },
  },
  plugins: []
}
