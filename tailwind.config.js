/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // You can customize your color palette here
        gray: {
          900: '#121212',
          800: '#1a1a1a',
          700: '#2a2a2a',
        }
      },
      animation: {
        'slide': 'slide 0.5s ease-out',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        }
      }
    },
  },
  plugins: [],
}