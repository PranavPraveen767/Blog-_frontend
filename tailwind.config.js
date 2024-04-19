/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Salsa", "cursive"],
        boogaloo: ["Boogaloo", "sans-serif"],
        merienda: ["Merienda", "cursive"],
        kurale: ["Kurale", "serif"],
        labrada: ["Labrada", "serif"],
      },
    },
  },
  plugins: [],
};
