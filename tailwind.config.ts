import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#f6efe3',
        sage: '#7c9a7a',
        terracotta: '#c66a45',
        clay: '#d8b17c',
        olive: '#4d5d3a',
        ink: '#2a2d28',
        rose: '#edd1b4',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(42,45,40,0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
