/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Serai Brand Colors
        serai: {
          // Primary Colors
          red: {
            50: '#fceded',
            100: '#fadcdc',
            200: '#f7cbcb',
            300: '#f5baba',
            400: '#f2a9a9',
            500: '#660f0f', // Main brand red - anchor, CTA, premium identity
            600: '#550c0c',
            700: '#440a0a',
            800: '#330707',
            900: '#220505',
          },
          navy: {
            50: '#f0f1f5',
            100: '#d9dbe8',
            200: '#b3b7d1',
            300: '#8d93ba',
            400: '#676fa3',
            500: '#1a1a2e', // Deep navy - sophisticated, digital stability
            600: '#151525',
            700: '#10101c',
            800: '#0b0b13',
            900: '#06060a',
          },
          gold: {
            50: '#fdf9f0',
            100: '#faf2d9',
            200: '#f5e5b3',
            300: '#f0d88d',
            400: '#ebcb67',
            500: '#d4af37', // Warm gold - premium accent
            600: '#b8962e',
            700: '#9c7d25',
            800: '#80641c',
            900: '#644b13',
          },
          // Secondary Colors
          cream: {
            50: '#fefefe',
            100: '#fdfdfd',
            200: '#fbfbfb',
            300: '#f9f9f9',
            400: '#f7f7f7',
            500: '#f5f5dc', // Cream - inviting background, hospitality warmth
            600: '#c4c4b0',
            700: '#939384',
            800: '#626258',
            900: '#31312c',
          },
          charcoal: {
            50: '#f7f8f9',
            100: '#eef0f2',
            200: '#dde1e5',
            300: '#ccd2d8',
            400: '#bbc3cb',
            500: '#36454f', // Charcoal - text + subtle UI elements
            600: '#2b373e',
            700: '#20292e',
            800: '#151b1f',
            900: '#0a0d0f',
          },
          forest: {
            50: '#f0f5f0',
            100: '#e1ebe1',
            200: '#c3d7c3',
            300: '#a5c3a5',
            400: '#87af87',
            500: '#6b9e6b', // Forest green - nature, sustainability touch
            600: '#567e56',
            700: '#415f41',
            800: '#2c3f2c',
            900: '#171f17',
          },
          // Neutrals
          neutral: {
            50: '#ffffff', // White
            100: '#f8f9fa', // Light Gray
            200: '#e9ecef',
            300: '#dee2e6',
            400: '#ced4da',
            500: '#6c757d', // Medium Gray
            600: '#5a6268',
            700: '#495057',
            800: '#343a40', // Dark Gray
            900: '#212529',
          },
        },
        // Legacy support - keeping for backward compatibility
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
