// types.d.ts 是一个 TypeScript 声明文件，通常用于定义类型信息，而不包含具体的代码逻辑实现

import { type CssVarsTheme } from "@mui/material/styles";
import { type Theme as BaseTheme } from "@mui/material/styles/createTheme";

// 定义一个新的类型 Theme，它通过组合 BaseTheme 和 CssVarsTheme 来创建
// Omit<BaseTheme, 'palette'> 表示从 BaseTheme 类型中排除 palette 属性
// 然后通过 & 与 CssVarsTheme 进行合并
export type Theme = Omit<BaseTheme> & CssVarsTheme;

// 定义了一个名为 ColorScheme 的类型别名，它是一个联合类型，可以是字符串 dark 或 light 中的任何一个
export type ColorScheme = "dark" | "light";
