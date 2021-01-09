
module.exports = {
  future: {},
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    gradientColorStops: theme => ({
      ...theme('colors'),
      'primary': '#FF9900',
      'secondary': '#FFC700',
      'darkViolet': '#1A0139',
      'darkBlue': '#000115',
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#FF9900',
      'secondary': '#FFC700',
      'button': '#FFB800 ',
      'darkViolet': '#1A0139',
      'darkBlue': '#000115',
    }),
    borderColor: theme => ({
      ...theme('colors'),
      'button': '#FFA800 ',
      'secondary': '#FFC700',
    }),
    ringColor: theme => ({
      ...theme('colors'),
      'button': '#fcd060',
    }),
    extend: {
      fontFamily: {
        default: ["Roboto", "sans-serif"],
        heading: ["Baloo", "sans-serif"]
      },
      gridTemplateRows: {
        '30': 'repeat(30, minmax(0, 1fr))',
      },
      gridRowStart: {
        '8': '8',
        '9': '9',
        '10': '10',
        '11': '11',
        '12': '12',
        '13': '13',
        '20': '20',
        '25': '25',
      },
      gridRowEnd: {
        '8': '8',
        '9': '9',
        '10': '10',
        '11': '11',
        '12': '12',
        '13': '13',
        '20': '20',
        '25': '25',
        '31': '31',
      }
    }
  },
  variants: {},
  plugins: [],
};
