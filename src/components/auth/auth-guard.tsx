"use client";

// AuthGuard 组件是一个权限保护组件，确保只有满足特定条件的用户可以访问其包含的子组件

import { useUser } from "@/hooks/use-user";
import { logger } from "@/lib/default-logger";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { paths } from "@/path";
import { Alert } from "@mui/material";

interface AuthGuardProps {
  children: React.ReactNode; // 指定传入的 children 必须是 React 可渲染的内容
}

export function AuthGuard({
  children,
}: AuthGuardProps): React.ReactElement | null {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = useState<boolean>(false);

  // checkPermission 用来检查用户是否登陆，若没有登陆，则跳转到登陆界面
  const checkPermission = async (): Promise<void> => {
    if (isLoading) {
      return;
    }

    if (error !== null) {
      setIsChecking(false);
      return;
    }

    if (user === null) {
      logger.debug("[AuthGuard]: 用户未登陆，即将跳转到登陆页面");
      router.replace(paths.auth.signIn);
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
