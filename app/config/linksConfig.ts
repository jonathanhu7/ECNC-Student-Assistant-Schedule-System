export interface Link {
  name: string;
  href: string;
  icon: string;
}

// 导航栏涉及到的路径
export const links = [
  {
    name: "主页",
    href: "/dashboard",
    icon: "/home.png",
  },
  {
    name: "空闲时间提交",
    href: "/dashboard/free-time-submit",
    icon: "/form.png",
  },
  {
    name: "排班及班表调整",
    href: "/dashboard/schedule",
    icon: "/assessment.png",
  },
];
