/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B8DEF',
        secondary: '#7CBF9E',
        accent: '#5FB8B8',
        background: '#F7F9FC',
        textdark: '#2E3A45',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        hind: ['Hind', 'sans-serif'],
      },
    },
  },
  plugins: [],
}