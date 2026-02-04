/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vintage: {
          paper: '#F5F1E8',
          cream: '#E8DCC4',
          tan: '#D4C5A9',
          brown: '#8B7355',
          ink: '#2C2416',
          border: '#C9B896',
        }
      },
      fontFamily: {
        serif: ['Crimson Text', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        handwriting: ['Caveat', 'cursive'],
      },
      boxShadow: {
        'vintage': '0 2px 8px rgba(139, 115, 85, 0.1)',
        'vintage-lg': '0 4px 16px rgba(139, 115, 85, 0.15)',
      }
    },
  },
  plugins: [],
}