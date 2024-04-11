import React from "react";
import GenAssistGuard from "@/components/dashboard/gen-assist-guard";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <GenAssistGuard>
      <React.Fragment>{children}</React.Fragment>
    </GenAssistGuard>
  );
}
