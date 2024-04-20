import type { NavItemConfig } from "@/types/nav";
import { paths } from "@/paths";

export const navItems = [
  {
    key: "overview",
    title: "概览",
    href: paths.dashboard.overview,
    icon: "chart",
  },
  {
    key: "submitFreeTime",
    title: "空闲时间提交",
    href: paths.dashboard.submitFreeTime,
    icon: "clock",
  },
  {
    key: "schedule",
    title: "排班",
    href: paths.dashboard.schedule,
    icon: "calendar",
  },
  {
    key: "settings",
    title: "设置",
    href: paths.dashboard.settings,
    icon: "gear",
  },
] satisfies NavItemConfig[];
