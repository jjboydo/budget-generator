/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        titulo: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#c0924c',
        secondary: '#e2c599',
        accent: '#dcae68',
        texto: "#0f0c07",
        back: "#fff4e4"
      },
    },
  },
  plugins: [],
}

