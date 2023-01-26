/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // screens: {
      //   'tablet': '640px',},
      colors: {
        transparent: "transparent",
        current: "currentColor",
        whiteweb: "#F4FEFD",
        blueweb: {
          DEFAULT: "#011837",
          50: "#e9f2ff",
          100: "#d2e5fe",
          200: "#a6cbfd",
          300: "#79b1fd",
          400: "#4d97fc",
          500: "#207dfb",
          600: "#0466e9",
          700: "#0352bd",
          800: "#033f90",
          850: "#02357a",
          900: "#022b64",
          950: "#01224d",
        },
      },
      spacing: {
        100: "26rem",
        101.25: "26.325rem",
        105: "27.3rem",
        110: "29rem",
        120: "31rem",
        128: "33.33rem",
        130: "34rem",
        140: "37rem",
        150: "39rem",
        160: "41rem",
        180: "46.8rem",
        186: "48.36rem",
        200: "52rem",
      },

      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out",
      },
    },
  },
  plugins: [],
};
