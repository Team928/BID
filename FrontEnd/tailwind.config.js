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
        BID_HOVER_MAIN: '#1B7DBF',
      },
      translate: {
        mHalf: '-50%',
      },
      keyframes: {
        modalOn: {
          from: { opacity: 0, transform: 'translate(-50%, -45%)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%)' },
        },
        modalOff: {
          from: { opacity: 1, transform: 'translate(-50%, -50%)' },
          to: { opacity: 0, transform: 'translate(-50%, -45%)' },
        },
      },
      animation: {
        modalOn: 'modalOn 0.5s ease-in-out',
        modalOff: 'modalOff 0.5s ease-in',
      },
      padding: {
        BID_P: '1rem',
      },
    },
  },
  plugins: [],
};
