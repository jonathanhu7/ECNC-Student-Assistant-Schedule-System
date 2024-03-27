// avatar.tsx 的作用是使用 MUI 的主题定制系统来重定义 Avatar 组件的默认样式

import { type Components } from "@mui/material/styles";
import { type Theme } from "../types";

export const MuiAvatar = {
  styleOverrides: {
    root: {
      fontSize: "14px",
      fontWeight: 600,
      letterSpacing: 0, // 修改字符间距为默认值，即不增加也不减少字符之间的空间
    },
  },
} satisfies Components<Theme>["MuiAvatar"];
