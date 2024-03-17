import React from "react"; /* 声明 React 以防止 ESLint 报错 */
import "@/app/ui/globals.css"; /* 引入全局样式 */
import SideNavigationBar from "@/app/ui/dashboard/side-navigation-bar";
import { lxgwBright } from "@/app/ui/fonts"; /* 导入侧边导航栏 */
export const metadata = {
  title: "ECNC 排班系统" /* 显示在标签页上的文字 */,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="zh-CN">
      <body className={`${lxgwBright.className} bg-body-background-color`}>
        <div
          className="h-full {/* 设置高度为 100% 才能让内部高度生效 */}
          p-3 {/* 设置显示内容和窗口边缘之间的距离 */}"
        >
          <SideNavigationBar /> {/* 侧边导航栏 */}
          <div>{children}</div> {/* 导航栏中每一项对应的内容 */}
        </div>
      </body>
    </html>
  );
}
