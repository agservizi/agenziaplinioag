module.exports = {
  content: [
    "./*.html",
    "./**/*.html",
    "./assets/js/**/*.js",
    "./assets/css/**/*.css"
  ],
  darkMode: "class", // usa la classe 'dark' per il tema scuro
  theme: {
    extend: {
      colors: {
        accent: "#00d1b2",
      },
    },
  },
  plugins: [],
}
