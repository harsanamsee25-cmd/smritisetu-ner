/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgwarm: '#FAF7F2',
        cardwarm: '#FFFFFF',
        tea: {
          50: '#F2F8F5',
          100: '#E1EFE8',
          600: '#2A6F5D',
          700: '#1E4D40',
          800: '#15392F',
          900: '#0D261F',
        },
        assam: {
          red: '#C82333',
          cream: '#FFF9E6',
          gold: '#D4AF37',
        },
        soothing: {
          blue: '#3B5998',
          lightBlue: '#EBF3FA',
          amber: '#D97706',
          lightAmber: '#FEF3C7',
          rose: '#E11D48',
          lightRose: '#FFE4E6',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(30, 77, 64, 0.08)',
        'lifted': '0 10px 30px -5px rgba(30, 77, 64, 0.12)',
        'pressed': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'wave': 'wave 1.2s ease-in-out infinite',
        'pulse-subtle': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { height: '8px' },
          '50%': { height: '28px' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
