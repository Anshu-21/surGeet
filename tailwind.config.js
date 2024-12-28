/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        gradientShift: 'gradientShift 10s ease infinite',
      },
      keyframes: {
        gradientShift: {
          '0%': { background: 'linear-gradient(135deg, #1d2671, #c33764)' },
          '50%': { background: 'linear-gradient(135deg, #ff6f61, #6a0572)' },
          '100%': { background: 'linear-gradient(135deg, #1d2671, #c33764)' },
        },
      },
    },
  },
  plugins: [],
}

