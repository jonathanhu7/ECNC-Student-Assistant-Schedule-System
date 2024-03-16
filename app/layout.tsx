import React from "react";
import "@/app/ui/globals.css";
import { lxgwBright } from "@/app/ui/fonts"; /* 导入霞鹜文楷字体 */
import ControlPanel from "@/app/ui/components/control-panel";
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
      <body className={`${lxgwBright.className}`}>
        <div>
          <div>
            <ControlPanel />
          </div>
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
