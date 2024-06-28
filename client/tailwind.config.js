const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode with a class
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    flowbite.content(), // Include Flowbite content
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.content(),
    require('tailwind-scrollbar'),
  ],

}

