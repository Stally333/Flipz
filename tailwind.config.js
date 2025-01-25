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
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-intense': 'glow-intense 3s ease-in-out infinite alternate',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'glitch-slide': 'glitch-slide 2s ease-in-out infinite',
        'glitch-opacity': 'glitch-opacity 3s ease-in-out infinite',
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
        'glow': {
          '0%': {
            filter: 'drop-shadow(0 0 15px rgba(56,189,248,0.5))',
          },
          '100%': {
            filter: 'drop-shadow(0 0 30px rgba(56,189,248,0.8)) drop-shadow(0 0 10px rgba(255,255,255,0.3))',
          },
        },
        'glow-intense': {
          '0%': {
            filter: 'drop-shadow(0 0 20px rgba(56,189,248,0.7)) drop-shadow(0 0 40px rgba(124,58,237,0.3))',
            transform: 'scale(1)',
          },
          '50%': {
            filter: 'drop-shadow(0 0 40px rgba(56,189,248,0.9)) drop-shadow(0 0 60px rgba(124,58,237,0.5))',
            transform: 'scale(1.02)',
          },
          '100%': {
            filter: 'drop-shadow(0 0 30px rgba(56,189,248,0.8)) drop-shadow(0 0 50px rgba(124,58,237,0.4))',
            transform: 'scale(1)',
          },
        },
        'glow-pulse': {
          '0%, 100%': {
            opacity: 0.3,
            transform: 'scale(1)',
          },
          '50%': {
            opacity: 0.6,
            transform: 'scale(1.05)',
          },
        },
        'glitch-slide': {
          '0%, 100%': {
            transform: 'translateX(0)',
            opacity: 0.3,
          },
          '50%': {
            transform: 'translateX(2px)',
            opacity: 0.5,
          },
        },
        'glitch-opacity': {
          '0%, 100%': {
            opacity: 0.2,
          },
          '50%': {
            opacity: 0.4,
          },
        },
      },
    },
  },
  plugins: [],
} 