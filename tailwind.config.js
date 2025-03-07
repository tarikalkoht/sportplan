/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./public/**/*.{html,js}",
      "./src/**/*.{html,js}"
    ],
    theme: {
      extend: {
        fontFamily: {
          'tajawal': ['Tajawal', 'sans-serif']
        },
        colors: {
          'teal': {
            50: '#f0fdfa',
            100: '#ccfbf1',
            200: '#99f6e4',
            300: '#5eead4',
            400: '#2dd4bf',
            500: '#14b8a6',
            600: '#0d9488',
            700: '#0f766e',
            800: '#115e59',
            900: '#134e4a',
          }
        },
        animation: {
          'spin-slow': 'spin 3s linear infinite',
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'bounce-slow': 'bounce 2s infinite'
        },
        boxShadow: {
          'custom': '0 4px 15px -3px rgba(13, 148, 136, 0.3)'
        }
      },
    },
    plugins: [],
  }