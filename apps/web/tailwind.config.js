const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#A71132',
      'secondary': '#3C0C36',
      'black-17': '#171717',
      'black-20': '#202020',
      'black-13': '#131313',
    }),
    colors: {
      'primary': '#A71132',
      'secondary': '#3C0C36',
      white: colors.white,
    },
    minHeight: {
      '112': '112px'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
