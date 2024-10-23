const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B2F9F",
        secondary: "#FFA500",
        techBlue: {
          50: "#f0f4ff",
          100: "#d9e2ff",
          200: "#a6c1ff",
          300: "#739fff",
          400: "#407eff",
          500: "#050C9C",
          600: "#0849a6",
          700: "#063572",
          800: "#041f3d",
          900: "#020b09",
        },
      },
    },
  },
  plugins: [],
});


