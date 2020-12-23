
module.exports = {
  future: {},
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    gradientColorStops: theme => ({
      'primary': '#FF9900',
      'secondary': '#FFC700',
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#FF9900',
      'secondary': '#FFC700',
      'button': '#FFB800 ',
    }),
    borderColor: theme => ({
      ...theme('colors'),
      'button': '#FFA800 ',
    }),
    ringColor: theme => ({
      ...theme('colors'),
      'button': '#fcd060',
    }),
    extend: {
      fontFamily: {
        default: ["Roboto", "sans-serif"],
        heading: ["Baloo", "sans-serif"]
      }
    }
  },
  variants: {},
  plugins: [],
};
