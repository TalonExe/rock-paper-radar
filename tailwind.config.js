const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        'default': 'white',
        'body': 'white',
      },
      backgroundImage: {
        'sign-in-bg': "url('src/assets/images/auth/backgroundImage.png')",
        'landing-bg': "url('src/assets/images/public/heroImage.png')",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    addVariablesForColors,
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"],
  },
};