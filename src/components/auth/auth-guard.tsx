// AuthGuard 组件是一个权限保护组件，确保只有满足特定条件的用户可以访问其包含的子组件

import React from "react";

interface AuthGuardProps {
  children: React.ReactNode; // 指定传入的 children 必须是 React 可渲染的内容
}

export function AuthGuard({ children }: AuthGuardProps): React.ReactElement {
  // TODO: 添加权限保护逻辑
  const { user, error, isLoading } = useUser();

  // checkPermission 用来检查用户是否有权限访问内容，该函数需要是异步的，因为你需要从服务器中获取用户登陆状态
  const checkPermission = async (): Promise<void> => {};

  return <div></div>;
}
