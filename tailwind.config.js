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
        // ═══════════════════════════════════════════════════════════════
        // myrevisionary Brand Colors (STRICT - from logo)
        // ═══════════════════════════════════════════════════════════════

        // Primary Blue - used for primary actions, headers, agent chat bubbles
        revision: {
          blue: {
            50: '#e8f1f8',
            100: '#d1e3f1',
            200: '#a3c7e3',
            300: '#75abd5',
            400: '#478fc7',
            500: '#1e6aab',   // Primary blue from logo text
            600: '#1a5a91',
            700: '#164a77',   // Navy from wordmark
            800: '#123a5d',
            900: '#0e2a43',
            950: '#0a1a29',
          },
          // Primary Green - used for progress, positive reinforcement, capital I
          green: {
            50: '#eefbee',
            100: '#ddf7dd',
            200: '#bbefbb',
            300: '#99e799',
            400: '#5dd35d',
            500: '#4abe4c',   // Primary green from logo "I"
            600: '#3da33f',
            700: '#328833',
            800: '#276d28',
            900: '#1c521c',
            950: '#113711',
          },
          // Teal - gradient transition color from logo
          teal: {
            50: '#e6f7f9',
            100: '#cceff3',
            200: '#99dfe7',
            300: '#66cfdb',
            400: '#33bfcf',
            500: '#2ba8b8',   // Mid-gradient from logo
            600: '#238a97',
            700: '#1b6c76',
            800: '#144e55',
            900: '#0c3034',
          },
        },

        // ═══════════════════════════════════════════════════════════════
        // Neutral palette - for backgrounds, text, borders
        // ═══════════════════════════════════════════════════════════════
        neutral: {
          50: '#fafafa',     // Off-white backgrounds
          100: '#f5f5f5',    // Light backgrounds
          200: '#e5e5e5',    // Borders, dividers
          300: '#d4d4d4',    // Inactive states
          400: '#a3a3a3',    // Secondary text
          500: '#737373',    // Muted text
          600: '#525252',    // Body text
          700: '#404040',    // Strong text
          800: '#262626',    // Headlines
          900: '#171717',    // Primary text
        },
      },
      fontFamily: {
        // Inter is the ONLY font - set as default sans
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      // Remove any animation bounciness - keep UI calm
      animation: {
        'pulse-gentle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
