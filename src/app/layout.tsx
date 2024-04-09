"use client";

import React from "react";
import "@/style/global.css";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { createCustomeTheme } from "@/style/theme/create-custom-theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const theme = createCustomeTheme();

  return (
    <html lang="zh-CN">
      <body>
        {/* ThemeProvider 的作用是向其内部的所有子组件保持一致的主题样式 */}
        <ThemeProvider theme={theme}>
          {/* CssBaseline 的作用是确保应用的基础样式的一致性 */}
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
