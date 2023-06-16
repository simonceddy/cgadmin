const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.js'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      dandelion: '#fed361',
      'pastel-green': '#84ee95',
      'cornflower-blue': '#5dabf4',
      black: '#000000',
      'aqua-spring': '#effaf6',
    },
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
