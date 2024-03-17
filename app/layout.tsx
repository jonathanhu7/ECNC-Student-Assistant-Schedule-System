import React from "react";
import "@/app/ui/globals.css";
import { notoSansSC } from "@/app/ui/fonts"; /* 导入中文字体 */
import SideNavigationBar from "@/app/ui/side-navigation-bar"; /* 导入侧边导航栏 */
export const metadata = {
  title: "ECNC 排班系统",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="zh-CN">
      <body className={`${notoSansSC.className}`}>
        <div>
          <div>
            <SideNavigationBar />
          </div>
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
