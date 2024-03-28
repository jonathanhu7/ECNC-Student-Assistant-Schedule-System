import { GuestGuard } from "@/components/auth/guest-guard";
import React from "react";
import { Box } from "@mui/material";
import RouterLink from "next/link";
import { paths } from "@/path";
import { DynamicLogo } from "@/components/core/logo";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.ReactElement {
  return (
    <GuestGuard>
      <Box
        sx={{
          // 在小屏幕上，容器将使用 flex 布局，在大屏幕上，将切换到 grid 布局
          display: { xs: "flex", lg: "grid" },
          // 在小屏幕上，子元素的排列方向为垂直方向
          flexDirection: "column",
          // 在大屏幕上，创建两列，每列占用可用可空间的相等份额
          gridTemplateColumns: "1fr 1fr",
          // 设置容器的最小高度为 100%，容器至少会沾满其父容器的全部高度
          minHeight: "100%",
        }}
      >
        <Box
          sx={{
            // 设置这个 box 为 flex 容器
            display: "flex",
            // flex: "1 1 auto" 告诉浏览器，这个 flex 项目应该能够等比例地扩展额外空间 (flex-grow: 1)
            // 当空间不足时，也能等比例缩小来适应 (felx-shrink: 1)
            // 并且在分配额外空间之前，他的初始大小由它的内容或尺寸来决定 (flex-basis: auto)
            flex: "1 1 auto",
            // 子元素的排列方向为垂直方向
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              // 设置内边距为 3，3 是 MUI 主题中的一个尺寸值，具体数值取决于主题配置
              p: 3,
            }}
          >
            <Box
              // 表明这个 Box 实际上是一个路由链接
              component={RouterLink}
              // href 制定了额链接的目的地
              href={paths.home}
              sx={{
                // 使这个元素表现为行内块级元素
                display: "inline-block",
                // 移除链接内字体大小，以避免布局问题
                fontSize: 0,
              }}
            >
              <DynamicLogo
                colorDark="light"
                colorLight="dark"
                height={32}
                width={122}
              />
            </Box>
          </Box>
          {children}
        </Box>
      </Box>
    </GuestGuard>
  );
}
