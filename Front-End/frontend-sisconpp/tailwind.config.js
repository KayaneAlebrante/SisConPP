/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js, ts, jsx, tsx}"],
  theme: {
    extend: {
      fontFamily:{
        sans: "Roboto, sans-serif",
      },
      
      colors:{
        green:{
          500: "#1d3728",
          200: "#7dbc97",
        },

        white:{
          200: "#f9f3d5",
          100: "#fcfbe5",
        },

        brown:{
          500: "#783e19",
          400: "#c5692a",
          300: "#b99471",
        },

        black: {
          500: "#000000",
        },

        alertColor:{
          erro: "#b00005",
          sucess: "#28b000",
        },
      },
    },
  },
  plugins: [],
}

