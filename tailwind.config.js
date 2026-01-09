/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        visual: {
          50: "#eff6ff",
          500: "#3b82f6",
          600: "#2563eb",
        },
        auditory: {
          50: "#f0fdf4",
          500: "#22c55e",
          600: "#16a34a",
        },
        readwrite: {
          50: "#fefce8",
          500: "#eab308",
          600: "#ca8a04",
        },
        kinesthetic: {
          50: "#fef2f2",
          500: "#ef4444",
          600: "#dc2626",
        },
      },
    },
  },
  plugins: [],
};
