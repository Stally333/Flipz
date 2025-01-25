/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'hologram': 'hologram 8s ease infinite',
        'hologram-vertical': 'hologram-vertical 12s ease infinite',
        'glitch': 'glitch 0.15s ease forwards',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'grid-pulse': 'grid-pulse 4s ease-in-out infinite',
        'grid-pulse-slow': 'grid-pulse 6s ease-in-out infinite',
        'rain-fall': 'rain-fall 0.5s linear infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'hologram': {
          '0%, 100%': {
            opacity: 0.3,
            transform: 'translateX(-100%)'
          },
          '50%': {
            opacity: 0.6,
            transform: 'translateX(100%)'
          },
        },
        'hologram-vertical': {
          '0%, 100%': {
            opacity: 0.3,
            transform: 'translateY(-100%)'
          },
          '50%': {
            opacity: 0.6,
            transform: 'translateY(100%)'
          },
        },
        'glitch': {
          '0%': {
            transform: 'translate(0)'
          },
          '20%': {
            transform: 'translate(-2px, 2px)'
          },
          '40%': {
            transform: 'translate(-2px, -2px)'
          },
          '60%': {
            transform: 'translate(2px, 2px)'
          },
          '80%': {
            transform: 'translate(2px, -2px)'
          },
          '100%': {
            transform: 'translate(0)'
          },
        },
        'grid-pulse': {
          '0%, 100%': {
            opacity: 0.4,
            transform: 'scale(1)',
          },
          '50%': {
            opacity: 0.8,
            transform: 'scale(1.02)',
          },
        },
        'rain-fall': {
          '0%': {
            transform: 'translateY(-100%) rotate(-15deg)',
          },
          '100%': {
            transform: 'translateY(100vh) rotate(-15deg)',
          },
        },
      },
    },
  },
  plugins: [],
} 