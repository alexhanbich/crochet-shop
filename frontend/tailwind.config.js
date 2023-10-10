/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EDDCD9',
        accent: '#D8C0C0',
        secondary: '#F9F3F2',
        black: '#191919',
        red: '#B34242',
        green: '#3F5041',
        gray:'#5A5A5A',
        lightgray:'#D3D3D3',
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

