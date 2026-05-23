import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          sand: '#C8A882',
          sage: '#2D4A3E',
          blush: '#E8D5C4',
          warm: '#FDFAF7',
          ink: '#1A1A1A',
          muted: '#8B7E74',
          border: 'rgba(200, 168, 130, 0.2)',
          gold: '#B99B6B',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        accent: ['Italiana', 'ui-serif', 'Georgia', 'serif'],
      },
      fontSize: {
        'xs': ['11px', { lineHeight: '1.4' }],
        'sm': ['13px', { lineHeight: '1.6' }],
        'base': ['16px', { lineHeight: '1.7' }],
        'lg': ['18px', { lineHeight: '1.7' }],
        'xl': ['20px', { lineHeight: '1.55' }],
        '2xl': ['24px', { lineHeight: '1.4' }],
        '3xl': ['30px', { lineHeight: '1.3' }],
        '4xl': ['40px', { lineHeight: '1.2' }],
        '5xl': ['56px', { lineHeight: '1.1' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out forwards',
        slideUp: 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
