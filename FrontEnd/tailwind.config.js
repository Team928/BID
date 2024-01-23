/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        BID_MAIN: '#3498DB',
        BID_BLACK: '#545454',
        BID_LIGHT_GRAY: '#F4F4F4',
        BID_SUB_GRAY: '#ABABAB',
      },
    },
  },
  plugins: [],
};
