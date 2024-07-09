const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: { 
      backgroundImage: {
      'hero-pattern': "url('/src/assets/bloackarea.png')",
      'hero-pattern2': "url('/src/assets/pexels-ella-olsson-572949-1640772.jpg')",
    }
      
    },
   
  },
  darkMode: "class",
  plugins: [
    nextui()
  ]
}