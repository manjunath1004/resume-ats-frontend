module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  extend: {
  animation: {
    'fade-in': 'fadeIn 0.3s ease-in-out',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: 0, transform: 'translateY(-10px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
    },
  },
},

}
