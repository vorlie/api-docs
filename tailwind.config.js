/** @type {import('tailwindcss').Config} */
export default {
  // Configure paths to all of your template files
  content: [
    "./index.html", // Include the main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS/TS/JSX/TSX files in the src folder
  ],

  // Optional: Add dark mode support (if you want it)
  darkMode: 'class', // or 'media'

  // Theme customizations (optional, can extend later)
  theme: {
    extend: {
      // You can add custom fonts, colors, spacing, etc., here
      // Example:
      // fontFamily: {
      //   sans: ['Inter', 'sans-serif'],
      // },
    },
  },

  // Add plugins here
  plugins: [
    require('@tailwindcss/typography'), // Add the typography plugin
    // You can add other Tailwind plugins here later if needed
  ],
}