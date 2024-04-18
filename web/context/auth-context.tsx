"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

export interface AuthContextProps {
  children: React.ReactNode;
}

export default function AuthContext({
  children,
}: AuthContextProps): React.ReactElement {
  return <SessionProvider>{children}</SessionProvider>;
}
