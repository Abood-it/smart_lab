/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0052CC",
        "primary-hover": "#003D9B",
        teal: "#00A3BF",
        "teal-hover": "#008299",
        "soft-gray": "#F4F5F7",
        background: "#F4F5F7",
        surface: "#FFFFFF",
        error: "#BA1A1A",
        warning: "#E36C09", // added warning for chips
        success: "#0F9D58", // added success for chips
        navy: "#091E42",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}