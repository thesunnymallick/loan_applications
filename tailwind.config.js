/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
      marquee: "marquee 40s linear infinite",
    },
    keyframes: {
      marquee: {
        from: { transform: "translateX(100%)" },
        to: { transform: "translateX(-100%)" },
      },
    },
  },
  },
  plugins: [],
}