import React from "react";
import { CssBaseline } from "@mui/material"; // CssBaseline 的作用是确保应用的基础样式的一致性，通过充值浏览器默认样式来实现
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material"; // Experimental_CssVarsProvider 支持各种 CSS 变量，使得主题定制和动态变更更加高效

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({
  children,
}: ThemeProviderProps): React.ReactElement {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}
