"use client";

// AuthGuard 组件是一个权限保护组件，确保只有满足特定条件的用户可以访问其包含的子组件

import { useUser } from "@/hooks/use-user";
import { logger } from "@/lib/default-logger";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { paths } from "@/path";
import { Alert } from "@mui/material";

interface GuestGuardProps {
  children: React.ReactNode; // 指定传入的 children 必须是 React 可渲染的内容
}

export function GuestGuard({
  children,
}: GuestGuardProps): React.ReactElement | null {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = useState<boolean>(false);

  // checkPermission 用来检查用户是否登陆，若登陆了，则跳转到 dashboard
  const checkPermission = async (): Promise<void> => {
    if (isLoading) {
      return;
    }

    if (error !== null) {
      setIsChecking(false);
      return;
    }

    if (user !== null) {
      logger.debug("[GuardGuard]: 用户已登陆，即将跳转到 dashboard 页面");
      router.replace(paths.dashboard.overview);
      return;
    }

    setIsChecking(false);
  };

  // 以下函数可以让 checkPermission 操作开始执行
  React.useEffect(() => {
    checkPermission().catch(() => {
      // noop
    });
  }, [user, error, isLoading]);

  if (isChecking) {
    return null;
  }

  if (error !== null) {
    return <Alert color="error">{error}</Alert>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
