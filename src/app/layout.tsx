import React from "react";
import "@/src/style/global.css";
import { UserProvider } from "@/contexts/user-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="zh-CN">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
