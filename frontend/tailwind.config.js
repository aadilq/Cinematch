/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",               // Scans the index.html file for classes
    "./src/**/*.{js,ts,jsx,tsx}", // Scans all JS/TS files in the src directory
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E40AF',     // Custom primary blue color
          dark: '#1E3A8A',        // Darker variation
          light: '#3B82F6',       // Lighter variation
        },
        secondary: {
          DEFAULT: '#0F172A',     // Dark blue/slate for backgrounds
        },
        accent: {
          DEFAULT: '#F97316',     // Orange accent color
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Modern, clean font
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite', // Custom animation
      },
      boxShadow: {
        'movie': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)', // Custom shadow for movie cards
      }
    },
  },
  plugins: [],
}