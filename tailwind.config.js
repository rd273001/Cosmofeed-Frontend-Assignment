/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {},
  },
  plugins: [
    // Custom plugin to add utilities for hiding scrollbars and making custom scrollbar
    function name ( { addUtilities } ) {
      const newUtilities = {
        // Hides scrollbars in WebKit browsers (Chrome, Safari, etc.)
        '.scrollbar-hidden::-webkit-scrollbar': {
          display: 'none',
        },
        '.scrollbar-hidden': {
          '-ms-overflow-style': 'none',    // For Internet Explorer and Edge
          'scrollbar-width': 'none'    // For Firefox and Chrome
        },
        // Custom scrollbar
        '.custom-scrollbar::-webkit-scrollbar': {
          width: '8px', // Width of the scrollbar
        },
        '.custom-scrollbar::-webkit-scrollbar-track': {
          background: '#f1f1f1', // Background of the scrollbar track
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb': {
          background: '#888', // Color of the scrollbar thumb
          borderRadius: '10px', // Rounded corners for the thumb
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb:hover': {
          background: '#555', // Color of the thumb on hover
        },
        '.custom-scrollbar': {
          '-ms-overflow-style': 'auto', // For Internet Explorer and Edge
          'scrollbar-width': 'thin', // For Firefox
        },
      };
      addUtilities( newUtilities );    // Adds the new utilities to Tailwind's configuration
    }
  ],
};