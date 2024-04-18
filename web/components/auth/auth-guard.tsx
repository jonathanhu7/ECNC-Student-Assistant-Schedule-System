import { redirect } from "next/navigation";
import React from "react";
import { paths } from "@/paths";
import { auth } from "@/app/api/auth/[...nextauth]/route";

export interface AuthGuardProps {
  children: React.ReactNode;
}

export default async function AuthGuard({
  children,
}: AuthGuardProps): Promise<React.ReactElement> {
  const session = await auth();
  // console.log("session in auth-guard:", session);

  if (session === null) {
    redirect(paths.auth.signIn);
  }

  return <React.Fragment>{children}</React.Fragment>;
}
