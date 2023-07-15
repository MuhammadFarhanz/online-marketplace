import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'futura': ['futura', 'sans-serif'], 
        'helvetica': ['helvetica', 'sans-serif']
      },
    },
  },
  plugins: [],
} satisfies Config;
