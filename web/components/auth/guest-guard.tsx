import { redirect } from "next/navigation";
import React from "react";
import { paths } from "@/paths";
import { auth } from "@/app/api/auth/[...nextauth]/route";

export interface GuestGuardProps {
  children: React.ReactNode;
}

export default async function GuestGuard({
  children,
}: GuestGuardProps): Promise<React.ReactElement> {
  const session = await auth();

  if (session !== null) {
    redirect(paths.dashboard.overview);
  }

  return <React.Fragment>{children}</React.Fragment>;
}
