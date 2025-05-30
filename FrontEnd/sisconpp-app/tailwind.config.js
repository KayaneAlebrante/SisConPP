const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3A6A00',
          dark: '#2A5000',
          light: '#9ED768',
          container: '#3A6A00',
          on: '#FFFFFF',
          onContainer: '#AFE978',
          fixed: '#B9F381',
          onFixed: '#0E2000',
          fixedDim: '#9ED768',
        },
        secondary: {
          DEFAULT: '#E24E6E',
          dark: '#AD2549',
          light: '#FFB2BC',
          container: '#CE3F60',
          on: '#FFFFFF',
          onContainer: '#FFFBFF',
          fixed: '#FFD9DD',
          onFixed: '#400012',
          fixedDim: '#FFB2BC',
        },
        tertiary: {
          DEFAULT: '#F294B3',
          dark: '#924561',
          light: '#FFB0C9',
          container: '#F294B3',
          on: '#FFFFFF',
          onContainer: '#712A46',
          fixed: '#FFD9E2',
          onFixed: '#3E011E',
          fixedDim: '#FFB0C9',
        },
        neutral: {
          DEFAULT: '#F0FAE6',
          variant: '#F0FAE6',
          background: '#F8FBEE',
          onBackground: '#191D15',
          surface: '#FCF9F6',
          onSurface: '#1B1C1A',
          container: '#E1E3DA',
          onContainer: '#454841',
        },
        error: {
          DEFAULT: '#BA1A1A',
          container: '#FFDAD6',
          on: '#FFFFFF',
          onContainer: '#93000A',
        },
        surface: {
          DEFAULT: '#FCF9F6',
          variant: '#E1E3DA',
          onVariant: '#454841',
          dim: '#DCDAD7',
          bright: '#FCF9F6',
          containerLowest: '#FFFFFF',
          containerLow: '#F6F3F0',
          container: '#F0EDEB',
          containerHigh: '#EAE8E5',
          containerHighest: '#E5E2DF',
        },
        outline: {
          DEFAULT: '#757871',
          variant: '#C5C7BF',
        },
        shadow: '#000000',
        scrim: '#000000',
        inverse: {
          surface: '#30302F',
          onSurface: '#F3F0ED',
          primary: '#9ED768',
        },
      },
    },
  },
  plugins: [],
};