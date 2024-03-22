import React from "react";
import { lxgwBright } from "@/app/ui/fonts";

export const metadata = {
  title: "ECNC 排班系统" /* 显示在标签页上的文字 */,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="zh-CN" className="h-full">
      <body
        className={`h-full ${lxgwBright.className} bg-gray-100 flex flex-col items-center justify-center`}
      >
        {children}
      </body>
    </html>
  );
}
