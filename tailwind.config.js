/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-gray-900",    // Neutral
    "bg-yellow-500",  // Happy
    "bg-blue-900",    // Sad
    "bg-red-700",     // Angry
    "bg-purple-600",  // Surprised
    "bg-gray-800",    // Fearful
    "bg-green-800",   // Disgusted
    "text-yellow-500",
    "text-blue-400",
    "text-red-500",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};