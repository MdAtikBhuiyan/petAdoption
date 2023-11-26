/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {

        'title-color': '#77b748',

        "primary-text": "var(--primary-text)",
        "secondary-text": "var(--secondary-text)",

        "title-primary": "var(--title-primary)",
        "title-secondary": "var(--title-secondary)",
        "title-optioanl": "var(--title-optioanl)",

        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",

        "theme-bg": "var(--theme-bg)",
        "bg": "var(--bg)",
        "primary-bg": "var(--primary-bg)",
        "secondary-bg": "var(--secondary-bg)",

        "navbar-text": 'var(--navbar-text)',

      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: 'dark'
}

