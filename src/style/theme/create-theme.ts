// create-theme 提供一个函数，用于创建应用的主题，在这里可以定义颜色、字体等等

import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import { type Theme } from "./types";
import { components } from "./components/components";

// declare module 是 TypeScript的一个特性，允许你向现有的库类型添加新的属性或字段。
declare module "@mui/material/styles/createPalette" {
  // PaletteRange 是调色板的范围
  interface PaletteRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  }

  // 为 Palette 接口添加了一个 neutral 的颜色范围
  interface Palette {
    neutral: PaletteRange;
  }

  interface PaletteOptions {
    neutral?: PaletteRange;
  }

  interface TypeBackground {
    level1: string;
    level2: string;
    level3: string;
  }
}

export function createTheme(): Theme {
  const theme = extendTheme({
    // 响应式设计的断点，也就是一组特定的屏幕宽度，当屏幕尺寸到达这些点时，页面布局和设计会发生变化，以适应不同尺寸的显示设备
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440,
      },
    },
    // components 是一系列自定义的 MUI 组件
    components,
  });

  return theme;
}
