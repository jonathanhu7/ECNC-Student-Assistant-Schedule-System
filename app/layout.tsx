import React from "react";
import "@/style/global.css";
import { ThemeProvider } from "@/components/core/theme-provider";
import AuthContext from "@/context/auth-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="zh-CN">
      <body>
        {/* AuthContext 能够提供用户的登陆信息，主要在客户端组件中使用 */}
        <AuthContext>
          {/* ThemeProvider 的作用是向其内部的所有子组件保持一致的主题样式 */}
          <ThemeProvider>{children}</ThemeProvider>
        </AuthContext>
      </body>
    </html>
  );
}
