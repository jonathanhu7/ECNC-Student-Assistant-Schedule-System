"use client";
import React from "react"; /* 声明 React 以防止 ESLint 报错 */
import { usePathname } from "next/navigation"; /* usePathname 是用来获取路径名的钩子 */
import Link from "next/link"; /* Link 用于设置导航栏的跳转项 */
import Image from "next/image";
import clsx from "clsx"; /* clsx 可以根据条件来选择元素被渲染的形式 */

// 导航栏涉及到的路径
const links = [
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

export default function NavigationLinks(): React.ReactElement {
  const pathname = usePathname();
  return (
    /* 由于需要返回一个元素，故这里用一个 <> 来将其返回结果变成元素 */
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex items-center leading-none pt-3 pb-3 pl-10 rounded-xl w-11/12 m-auto",
              {
                /* 将目前所在的导航项变蓝 */
                "bg-blue-500 text-white": pathname === link.href,
              },
            )}
          >
            <Image src={link.icon} alt={link.name} width={18} height={18} />
            <p
              className="text-lg
              ml-3"
            >
              {link.name}
            </p>
          </Link>
        );
      })}
    </>
  );
}
