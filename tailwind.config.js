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
        // myrevisionary Brand Colors (HARDCODED)
        // Azure Blue: #3783a5 - headings, primary actions
        // Turquoise: #37a87b - progress, positive reinforcement
        // ═══════════════════════════════════════════════════════════════

        // Azure Blue - used for headings, primary actions, buttons
        azure: {
          50: '#e9f3f7',
          100: '#d3e7ef',
          200: '#a7cfdf',
          300: '#7bb7cf',
          400: '#4f9fbf',
          500: '#3783a5',   // PRIMARY - Azure Blue #3783a5
          600: '#2c6984',
          700: '#214f63',
          800: '#163542',
          900: '#0b1a21',
          950: '#050d10',
        },

        // Turquoise - used for progress, success, positive reinforcement
        turquoise: {
          50: '#e9f7f2',
          100: '#d3efe5',
          200: '#a7dfcb',
          300: '#7bcfb1',
          400: '#4fbf97',
          500: '#37a87b',   // PRIMARY - Turquoise #37a87b
          600: '#2c8662',
          700: '#21654a',
          800: '#164331',
          900: '#0b2219',
          950: '#05110c',
        },

        // Legacy aliases for backward compatibility (maps to new colors)
        revision: {
          blue: {
            50: '#e9f3f7',
            100: '#d3e7ef',
            200: '#a7cfdf',
            300: '#7bb7cf',
            400: '#4f9fbf',
            500: '#3783a5',   // Azure Blue
            600: '#2c6984',
            700: '#214f63',
            800: '#163542',
            900: '#0b1a21',
            950: '#050d10',
          },
          green: {
            50: '#e9f7f2',
            100: '#d3efe5',
            200: '#a7dfcb',
            300: '#7bcfb1',
            400: '#4fbf97',
            500: '#37a87b',   // Turquoise
            600: '#2c8662',
            700: '#21654a',
            800: '#164331',
            900: '#0b2219',
            950: '#05110c',
          },
          teal: {
            50: '#e9f5f4',
            100: '#d3ebe9',
            200: '#a7d7d3',
            300: '#7bc3bd',
            400: '#4fafa7',
            500: '#3796a0',   // Blend of azure and turquoise
            600: '#2c7880',
            700: '#215a60',
            800: '#163c40',
            900: '#0b1e20',
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
