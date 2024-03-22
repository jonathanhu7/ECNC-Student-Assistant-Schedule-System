// Context 允许你在组件树中跨层级直接传递数据，避免你在每个层级中手动转递 props
// 简单来说就是，Context 为全局数据（如当前认证的用户、主题或首选语言）提供一个共享的数据源

import { authClient } from "@/lib/auth/client";
import type { User } from "@/types/user";
import React from "react";

// 定义 UserContextValue 接口，描述了 UserContext 应该具有的属性以及类型
export interface UserContextValue {
  // User 类型的属性，其中包含 id、姓名、邮箱、头像等等
  // 在初始化的时候，上下文中的 user 应为空，因为此时还没有任何用户登录
  user: User | null;
  // 当你从服务器上获取 user 信息时，可能会返回 error 的结果
  // 因此在上下文中你应该也把 error 也记录上，这样调用方就知道获取结果了
  error: string | null;
  // 从服务器获取 user 信息是异步的，因此你还需要有一个 isLoading 的状态，表示是否正在获取
  isLoading: boolean;
}

// UserContext 即为用户上下文，初始化为 undefined
export const UserContext = React.createContext<UserContextValue | undefined>(
  undefined,
);

export interface UserProvider {
  children: React.ReactNode;
}

// UserProvider 组件，提供 User 上下文信息给所有的子组件
export function UserProvider({ children }: UserProvider): React.ReactElement {
  // 通过 useState 来实时设置 user 状态，并将其作为上下文转发出去
  const [userState, setUserState] = React.useState<{
    user: User | null;
    error: string | null;
    isLoading: boolean;
  }>({
    user: null,
    error: null,
    isLoading: false,
  });

  // 当你需要将某个函数传出去的时候，使用 useCallback 可以放置页面重渲染的时候，函数重新被创造一次，这样可以提高速度
  // checkSession 需要从服务器获取信息，因此该函数需要是异步的
  const checkSession = React.useCallback(async (): Promise<void> => {
    try {
      const { data, error } = await authClient.getUser();

      if (error) {
        logger
      }
    }
  });

  return <div></div>;
}
