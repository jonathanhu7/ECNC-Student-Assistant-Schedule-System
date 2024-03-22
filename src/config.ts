import localFont from "next/font/local";

/* ----------------- 字体设置 ----------------- */

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

/* ----------------- 排班模板设置 ----------------- */

export interface ScheduleTemplate {
  dayOfTheWeek: string[];
  workingHours: string[];
}

export const scheduleTemplate = {
  dayOfTheWeek: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  workingHours: [
    "09:00-10:00",
    "10:00-12:00",
    "13:30-16:10",
    "16:10-18:00",
    "19:00-21:00",
  ],
};
