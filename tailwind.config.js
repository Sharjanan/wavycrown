/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // 👇 Add these two lines for Flowbite
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#F4CD8A",
        black: "#0a0a0a",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"), // 👈 required
  ],
};
