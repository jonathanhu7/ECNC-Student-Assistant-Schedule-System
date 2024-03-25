import React from "react";
import "@/style/global.css";
import { UserProvider } from "@/contexts/user-context";
import { ThemeProvider } from "@/components/core/theme-provider/theme-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="zh-CN">
      <body>
        {/* UserProvider 可以提供用户的上下文，包括用户登录状态、用户信息等等 */}
        <UserProvider>
          {/* ThemeProvider 的作用是向其内部的所有子组件保持一致的主题样式 */}
          <ThemeProvider>{children}</ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
