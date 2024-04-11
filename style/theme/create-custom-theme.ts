import { createTheme } from "@mui/material/styles";
import { type Theme } from "@mui/material/styles";
import { typography } from "./typography";

export function createCustomeTheme(): Theme {
  const theme = createTheme({
    typography,
  });

  return theme;
}
