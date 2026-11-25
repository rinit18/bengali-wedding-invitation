/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        bengali: ['"Noto Serif Bengali"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        sindoor: '#9E1B24',
        alta: '#7A1118',
        kanch: '#FAF5EE',
        ivory: '#F4ECE0',
        turmeric: '#E8A317',
        marigold: '#F39C12',
        gold: '#C89B3C',
        jamdani: '#1A3A32',
        ink: '#240B0E',
      },
      animation: {
        'spin-slow': 'spin 45s linear infinite',
        'spin-reverse-slow': 'spin 60s linear infinite reverse',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
