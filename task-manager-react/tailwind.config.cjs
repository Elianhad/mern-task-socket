/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', './src/**/*.jsx'],
  theme: {
    extend: {
      backgroundImage: {
        "hero": "url('./hero.jpg')",
        "lines": "url('./lines.png')"
      }
    },
  },
  plugins: [],
}
