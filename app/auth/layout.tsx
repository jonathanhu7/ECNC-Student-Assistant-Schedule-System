import React from "react";
import { Box } from "@mui/material";
import RouterLink from "next/link";
import { paths } from "@/paths";
import { Logo } from "@/components/logo";
import GuestGuard from "@/components/auth/guest-guard";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.ReactElement {
  return (
    <GuestGuard>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "100%",
        }}
      >
        {/* 登录布局的左侧 */}
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
          }}
        >
          <Box sx={{ p: 3 }}>
            <Box
              component={RouterLink}
              href={paths.dashboard.overview}
              sx={{ display: "inline-block", fontSize: 0 }}
            >
              <Logo height={32} width={122} />
            </Box>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flex: "1 1 auto",
              justifyContent: "center",
              p: 3,
            }}
          >
            <Box sx={{ maxWidth: "450px", width: "100%" }}>{children}</Box>
          </Box>
        </Box>
        {/* 登录布局的右侧 */}
        <Box
          sx={{
            alignItems: "center",
            backgroundImage: "url(/auth-background.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Box>
    </GuestGuard>
  );
}
