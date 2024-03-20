import React from "react";

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
      <body>
        <div className="h-full bg-gray-300">{children}</div>
      </body>
    </html>
  );
}
