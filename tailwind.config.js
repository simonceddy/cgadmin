const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Sen',
          ...defaultTheme.fontFamily.sans,
        ],
        cursive: [
          'Moon Dance',
          ...defaultTheme.fontFamily.serif
        ],
        heading: [
          'Quintessential',
          ...defaultTheme.fontFamily.serif
        ]
      }
    },
  },
  plugins: [],
};
