const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      minHeight: {
        1: "1rem",
      },
      maxHeight: {
        128: "32rem",
      },
      minWidth: {
        16: "16rem",
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
  plugins: [],
};
