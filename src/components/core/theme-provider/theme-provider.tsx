import React from "react";
import { CssBaseline } from "@mui/material"; // CssBaseline 用于确保应用程序的基础样式的一致性
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material"; // Experimental_CssVarsProvider 支持各种 CSS 变量，使得主题定制和动态变更更加高效

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({
  children,
}: ThemeProviderProps): React.ReactElement {
  return <div></div>;
}
