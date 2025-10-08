/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'ninja-orange': '#ff6806',
        'ninja-gold': '#cf974b',
        'brand-primary': '#ff6806',
        'brand-secondary': '#f8f8f7',
        'brand-background': '#ffffff',
        'brand-text': '#1f2937', 
        'dark-background': '#111827', 
        'dark-text': '#f3f4f6', 
        'brand-dark-gray': '#2e2d2d',
        'brand-off-white': '#f8f8f7',
        'brand-ninja-gold': '#cf974b',
        'brand-light-blue': '#47abd0',
        'brand-medium-gray': '#9d9fa0',
      },
      backgroundImage: {
        'gradient-light': 'linear-gradient(to bottom right, #f8f8f7, #e9e9e9)',
        'gradient-dark': 'linear-gradient(to bottom right, #111827, #2e2d2d)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'top': '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    }
  },
  plugins: [],
}