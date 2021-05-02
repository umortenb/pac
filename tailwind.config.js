module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        notification: {
          "0%": { right: "50%", transform: "translateX(50%)", opacity: "0" },
          "50%": { right: "50%", transform: "translateX(50%)", opacity: "1" },
          "100%": { right: "1.25rem", transform: "translateX(0%)" },
        },
      },
      animation: {
        notification: "notification 2s ease-out",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      pointerEvents: ["disabled"],
    },
  },
  plugins: [],
};
