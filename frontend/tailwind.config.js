/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EDDCD9",
        accent: "#E4CCC8",
        secondary: "#F9F3F2",
        black: "#272727",
        red: "#B34242",
        green: "#5BC149",
        gray: "#5A5A5A",
        lightgray: "#D3D3D3",
      },
      fontSize: {
        xxs: "0.6rem",
      },
      fontFamily: {
        logo: ["Amita", "sans-serif"],
        body: ["Roboto Light", "sans-serif"],
        body2: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
