/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        BID_MAIN: '#6B54C4',
        BID_BLACK: '#545454',
        BID_LIGHT_GRAY: '#F4F4F4',
        BID_SUB_GRAY: '#ABABAB',
        BID_HOVER_MAIN: '#563EB4',
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
        sheetOn: {
          from: { opacity: 0, transform: 'translateY(80px)' },
          to: { opacity: 1 },
        },
        sheetOff: {
          from: { opacity: 1 },
          to: { opacity: 0, transform: 'translateY(80px)' },
        },
      },
      animation: {
        modalOn: 'modalOn 0.5s ease-in-out',
        modalOff: 'modalOff 0.5s ease-in',
        sheetOn: 'sheetOn 0.3s ease-in-out',
        sheetOff: 'sheetOff 0.3s ease-in',
      },
      padding: {
        BID_P: '1rem',
      },
    },
  },
  plugins: [require('daisyui')],
};
