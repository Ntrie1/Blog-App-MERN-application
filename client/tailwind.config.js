import { content as _content } from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
export const darkMode = 'class';
export const content = [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}',
  _content(), // Include Flowbite content
];
export const theme = {
  extend: {},
};
export const plugins = [
  _content(),
  require('tailwind-scrollbar'),
];

