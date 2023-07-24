/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        '2xs': ['0.625rem', '1rem'],
      },
      spacing: {
        wrap: '5.62vw',
      },
    },
  },
  plugins: [],
}
