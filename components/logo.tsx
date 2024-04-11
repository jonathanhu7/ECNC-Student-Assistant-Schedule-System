import React from "react";
import { Box } from "@mui/material";

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
