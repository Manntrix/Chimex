const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media',
  theme: {
    fontSize: {
      '2xs': ['10px', '1.4'],
      xs: ['12px', '1.4'],
      sm: ['14px', '1.4'],
      base: ['16px', '1.4'],
      lg: ['18px', '1.4'],
      xl: ['20px', '1.4'],
      '2xl': ['24px', '1.4'],
      '3xl': ['28px', '1.4'],
      '4xl': ['32px', '1.4'],
      '5xl': ['36px', '1.4'],
      '6xl': ['42px', '1.4'],
      '7xl': ['64px', '1.4'],
      '8xl': ['200px', '0.78'],
    },
    extend: {
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
        work: ['Work Sans', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        '8xl': '1400px',
      },
      colors: {
        'blue-dark': '#101827',
        'blue-deep': '#0A1E42',
        'blue-sea': '#1B3A68',
        'blue-sky': '#2B87C8',
        'blue-turquoise': '#0BAFCE',
        'green-bright': '#45C53B',
        'green-tea': '#A8BE4A',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['dark', 'rounded'],
  },
}
