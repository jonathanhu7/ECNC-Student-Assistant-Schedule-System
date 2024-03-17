import localFont from "next/font/local";
import { Roboto } from "next/font/google";

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

export const roboto = Roboto({
  weight: ["100", "400", "700"],
  subsets: ["latin"],
});
