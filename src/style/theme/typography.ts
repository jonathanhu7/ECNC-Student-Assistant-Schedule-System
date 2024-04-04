import { type TypographyOptions } from "@mui/material/styles/createTypography";
import { LXGWBright } from "../fonts";

export const typography = {
  // 使用 LXGWBright 字体
  fontFamily: [LXGWBright.style.fontFamily, "sans-serif"].join(","),
} satisfies TypographyOptions;
