import { Box } from "@mui/material";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <Box>{children}</Box>;
}
