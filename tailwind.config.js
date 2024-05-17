/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    darkMode: "selector",
    fontFamily: {
      nunito: ["Nunito", "sans-serif"],
      Lucky: ["Luckiest Guy", "cursive"],
      outfit: ["Outfit", " sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
