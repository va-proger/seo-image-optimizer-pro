/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [  // Purge-safe: Добавь, если Tailwind жрёт dark: классы
    'dark',
    { pattern: /dark:(bg|text|border)-(slate|gray|sky|emerald)/ },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
