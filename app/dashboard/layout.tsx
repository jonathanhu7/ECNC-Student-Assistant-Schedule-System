import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AuthGuard from "@/components/auth/auth-guard";
import SideNav from "@/components/dashboard/layout/side-nav";
import MainNav from "@/components/dashboard/layout/main-nav";
import GlobalStyles from "@mui/material/GlobalStyles";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <AuthGuard>
      <GlobalStyles
        styles={{
          body: {
            "--SideNav-width": "280px",
            "--SideNav-zIndex": 1000,
          },
        }}
      />
      <SideNav />
      <Box
        sx={{
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          pl: "var(--SideNav-width)",
        }}
      >
        <MainNav />
        <Container maxWidth="xl" sx={{ py: "64px" }}>
          {children}
        </Container>
      </Box>
    </AuthGuard>
  );
}
