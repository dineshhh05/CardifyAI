import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "myPurple": "#5500ff",
        "myLightPurple": "#681dff",
        "outlineGray": "#272727",
        "darkGray": "#2b3039",
        "darkerGray":"#111111",
        "lightGray": "#d9d9d9",
        "moreLightGray": "#9aa2b2",
        "highlitedGray": "#131313"
      }
    },
  },
  plugins: [daisyui],
}
