/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      }
    },
    extend: {
      fontFamily: {
        'almarai': ['Almarai', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        // Official Saudi Identity Palette
        'saudi-primary': '#007A3D',      // Primary Green (Brand Main)
        'saudi-dark': '#004225',         // Dark Green (Strong backgrounds/headers)
        'saudi-light': '#8DC63F',        // Light Green (Highlights/accents/buttons hover)
        'saudi-gold': '#B38E5D',         // Gold (Luxury/secondary elements)
        'saudi-neutral': '#F5F5F5',      // Light Gray (Neutral backgrounds)
        // Legacy colors for backward compatibility
        'saudi-green': '#007A3D',
        'tech-blue': '#003366',
        'light-green': '#E8F5E8',
        'saudi-dark-green': '#004225',
        'saudi-light-gold': '#FFE17F',
        // Dark mode colors
        'dark': {
          'bg': '#0F0F0F',
          'surface': '#1A1A1A',
          'card': '#262626',
          'border': '#404040',
          'text': '#F5F5F5',
          'text-secondary': '#A3A3A3',
          'accent': '#006B3F',
          'accent-hover': '#008B4F',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0px)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};