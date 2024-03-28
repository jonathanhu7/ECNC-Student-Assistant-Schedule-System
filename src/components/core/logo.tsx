"use client";

import React from "react";
import { Box, useColorScheme } from "@mui/material";
import { NoSsr } from "./no-ssr";

type Color = "dark" | "light";

const HEIGHT = 60;
const WIDTH = 60;

export interface LogoProps {
  // color 表示使用黑色 logo 还是白色 logo
  color?: Color;
  // emblem 表示只使用图标，还是说包含文字
  emblem?: boolean;
  height?: number;
  width?: number;
}

export function Logo({
  color = "dark",
  emblem,
  height = HEIGHT,
  width = WIDTH,
}: LogoProps): React.ReactElement {
  // logo 的 url
  let url: string;

  if (emblem === true) {
    url =
      color === "light"
        ? "/assets/logo-emblem-light.svg"
        : "/assets/logo-emblem-dark.svg";
  } else {
    url =
      color === "light" ? "/assets/logo-light.svg" : "/assets/logo-dark.svg";
  }

  return (
    <Box alt="logo" component="img" height={height} width={width} src={url} />
  );
}

export interface DynamicLogoProps {
  // 暗黑模式下的 Logo 颜色
  colorDark?: Color;
  // 明亮模式下的 Logo 颜色
  colorLight?: Color;
  emblem?: boolean;
  height?: number;
  width?: number;
}

export function DynamicLogo({
  colorDark = "light",
  colorLight = "dark",
  height = HEIGHT,
  width = WIDTH,
  ...props
}: DynamicLogoProps): React.ReactElement {
  // 获取当前是暗黑模式还是明亮模式
  const { colorScheme } = useColorScheme();
  const color = colorScheme === "dark" ? colorDark : colorLight;

  return (
    // NoSsr 确保组件只在客户端渲染
    <NoSsr
      fallback={<Box sx={{ height: `${height}px`, width: `${width}px` }} />}
    >
      <Logo color={color} height={height} width={width} {...props} />
    </NoSsr>
  );
}
