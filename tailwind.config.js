const defaultTheme = require("tailwindcss/defaultTheme");

const { colors: defaultColors } = require("tailwindcss/defaultTheme");

const colors = {
  ...defaultColors,
  ...{
    dark: {
      100: "#002d69",
      200: "#0f172a",
    },
  },
};

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["raleway", "sans-serif"],
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        lightfont: ["'Inter', sans-serif"],
      },
      keyframes: {
        beat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.07)" },
        },
      },
      animation: {
        beat: "beat 150ms ease-in",
      },
    },
  },
};
