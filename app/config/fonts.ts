import localFont from "next/font/local";

export const lxgwBright = localFont({
  // 导出霞鹜文楷字体
  src: [
    {
      path: "../../public/fonts/LXGWWenKaiLite-Light.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/LXGWWenKaiLite-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/LXGWWenKaiLite-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});
