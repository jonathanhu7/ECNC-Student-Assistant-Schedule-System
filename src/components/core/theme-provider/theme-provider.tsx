import React from "react";
import {
  CssBaseline, // CssBaseline 的作用是确保应用的基础样式的一致性，通过充值浏览器默认样式来实现
  Experimental_CssVarsProvider as CssVarsProvider, // Experimental_CssVarsProvider 支持各种 CSS 变量，使得主题定制和动态变更更加高效
} from "@mui/material";
import { createTheme } from "@/style/theme/create-theme";
import EmotionCache from "./emotion-cache"; // EmotionCache 用来记录 CSS 缓存信息，可以提高速度

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({
  children,
}: ThemeProviderProps): React.ReactElement {
  const theme = createTheme();
  return (
    <EmotionCache options={{ key: "mui" }}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </EmotionCache>
  );
}
