import React from "react"; /* 声明 React 以防止 ESLint 报错 */
import "@/app/ui/globals.css"; /* 引入全局样式 */
import SideNavigationBar from "@/app/ui/dashboard/side-navigation-bar";
import { lxgwBright } from "@/app/ui/fonts";
import Breadcrumb from "@/app/ui/dashboard/breadcrumb";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="zh-CN">
      <body className={`${lxgwBright.className} bg-body-background-color`}>
        <div className="h-full p-3 flex">
          <SideNavigationBar /> {/* 侧边导航栏 */}
          <div className="flex-1 ml-5 h-full flex flex-col">
            <Breadcrumb />
            {/* 导航栏中每一项对应的内容 */}
            <div className="grow h-full">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
