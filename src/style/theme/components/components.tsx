// components.tsx 汇集了所有的组件样式

import { type Components } from "@mui/material/styles";
import { type Theme } from "../types";
import { MuiAvatar } from "./avatar";

export const components = {
  MuiAvatar,
} satisfies Components<Theme>;
