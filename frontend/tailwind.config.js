/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#EDDCD9',
        secondary: '#F9F3F2'
      },
      fontSize: {
        xxs: '0.6rem',
      },
      fontFamily: {
        'logo': ['Amita','sans-serif'],
        'body': ['Roboto Light','sans-serif'],
      },
      gridTemplateColumns: {
        'fluid': 'repeat(auto-fit, minmax(12rem, 1fr))',
      }
    },
  },
  plugins: [],
}

