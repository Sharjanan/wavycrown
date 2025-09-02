/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)"],      // maps to Poppins
        display: ["var(--font-playfair)"], // maps to Playfair
      lostinsouth: ["var(--font-lostinsouth)"], // maps to Lost in South
      },
      colors: {
        gold: "#F4CD8A",
        black: "#0a0a0a",
      },
    },
  },
  plugins: [],
};
