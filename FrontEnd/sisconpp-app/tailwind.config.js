const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Ajuste os caminhos conforme necessário
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          500: "#1d3728",
          200: "#7dbc97",
        },
        white: {
          200: "#f9f3d5", 
          100: "#fcfbe5", 
        },
        brown: {
          500: "#783e19", 
          400: "#c5692a", 
          300: "#b99471", 
        },
        purple: {
          500: "#6d28d9", 
          300: "#b794f4", 
          100: "#ede9fe", 
        },
        black: {
          500: "#000000", 
        },
        alertColor: {
          erro: "#b00005", 
          success: "#28b000", 
        },
      },
    },
  },
  plugins: [],
};