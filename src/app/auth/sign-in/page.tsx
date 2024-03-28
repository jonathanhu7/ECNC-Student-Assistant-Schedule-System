import React from "react";
import { Layout } from "@/components/auth/layout";
import { SignInForm } from "@/components/auth/sign-in-form";
import { GuestGuard } from "@/components/auth/guest-guard";

export default function Page(): React.ReactElement {
  return (
    <GuestGuard>
      <Layout>
        <SignInForm />
      </Layout>
    </GuestGuard>
  );
}
