/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // 匹配 app 文件夹及其子文件夹下的 html,js,jsx,ts,tsx,mdx 文件
  ],
  theme: {
    extend: {
      colors: {
        "body-background-color": "#f0f2f5",
        "logo-text-color": "#4f4f4f",
      },
      spacing: {
        "11/12": "91.666667%",
      },
      scale: {
        175: "1.75",
      },
    },
  },
  plugins: [],
};
