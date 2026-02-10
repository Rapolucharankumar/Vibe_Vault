import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a',
        foreground: '#f1f5f9',
        primary: '#ec4899',
        'primary-dark': '#be185d',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
      },
    },
  },
  plugins: [],
}

export default config
