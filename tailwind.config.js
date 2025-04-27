/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        rust: "#C84A31",
        "rust-light": "#E26D5C",
        peach: "#FDD9B5",
      },
    },
  },
  plugins: [],
  
};
