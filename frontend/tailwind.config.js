/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // we'll control dark/light via classes
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        input: "hsl(var(--input))",
        primary: "hsl(var(--primary))",
        // etc...
      },
       fontFamily: {
        GeistMono: ['GeistMono', 'monospace'], // Match class name
        Geist: ['Geist', 'sans-serif'],
      },
    },
  },
};
