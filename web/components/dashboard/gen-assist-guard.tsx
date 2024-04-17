import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { paths } from "@/paths";

export interface GenAssistGuardProps {
  children: React.ReactNode;
}

export default async function GenAssistGuard({
  children,
}: GenAssistGuardProps): Promise<JSX.Element> {
  const session = await getServerSession();

  if (session === null) {
    redirect(paths.auth.signIn);
  }

  return <React.Fragment>{children}</React.Fragment>;
}
