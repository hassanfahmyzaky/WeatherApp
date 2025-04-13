/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            light: '#3b82f6',
            dark: '#1e40af'
          },
          secondary: {
            light: '#10b981',
            dark: '#065f46'
          }
        },
      },
    },
    darkMode: 'class',
    plugins: [],
  }