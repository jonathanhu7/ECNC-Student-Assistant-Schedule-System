import React from "react";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    // AuthGuard 组件是一个权限保护组件，确保只有满足特定条件的用户可以访问其包含的子组件
    <AuthGuard>{children}</AuthGuard>
  );
}
