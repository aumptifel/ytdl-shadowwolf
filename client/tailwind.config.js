/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '15': '3.75rem',
      },
      maxWidth: {
        '106': '26.5rem',
      },
      padding: {
        '15': '3.75rem',
      }
    },
  },
  plugins: [],
}

