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
      <body className={`${lxgwBright.className} min-h-full`}>{children}</body>
    </html>
  );
}
