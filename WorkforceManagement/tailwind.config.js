/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        border: 'borderColorCycle 2.5s linear infinite',
      },
      keyframes: {
        borderColorCycle: {
          '0%': { borderColor: '#E4E2E9' },
          '33%': { borderColor: '#FF0000' },
          '66%': { borderColor: '#00FF00' },
          '100%': { borderColor: '#0000FF' },
        },
      },
    },
  },
  plugins: [],
}

