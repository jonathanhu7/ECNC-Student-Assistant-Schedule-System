"use client";

// Context 允许你在组件树中跨层级直接传递数据，避免你在每个层级中手动转递 props
// 简单来说就是，Context 为全局数据（如当前认证的用户、主题或首选语言）提供一个共享的数据源

import { authClient } from "@/lib/auth/client";
import { logger } from "@/lib/default-logger";
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
  // checkSession 是一个暴露给子组件的函数，用来检查用户状态
  checkSession?: () => Promise<void>;
}

// UserContext 即为用户上下文，初始化为 undefined
export const UserContext = React.createContext<UserContextValue | undefined>(
  undefined,
);

export interface UserProviderProps {
  children: React.ReactNode;
}

// UserProvider 组件，提供 User 上下文信息给所有的子组件
export function UserProvider({
  children,
}: UserProviderProps): React.ReactElement {
  // 通过 useState 来实时设置 user 状态，并将其作为上下文转发出去
  // useState 是一个钩子 (Hook)，用于在函数组件中添加局部状态
  // 当我们的组件需要保存一些会随着时间改变的数据时（比如下面的 userState），就可能会需要用到 useState。
  const [userState, setUserState] = React.useState<{
    user: User | null;
    error: string | null;
    isLoading: boolean;
  }>({
    user: null,
    error: null,
    isLoading: false,
  });

  // useCallback 是一个钩子 (Hook)，用于对函数进行缓存，在函数组件中，每次组件重新渲染时，其中定义的函数都会被重新创建。
  // 当你将一个函数作为 prop 传给子组件时（比如下面的 checkSession 会传递给 UserContext.Provider），每次父组件（UserProvider）重新
  // 渲染时，checkSession 都会被重新创建，如果不缓存的话，UserContext.Provider 以为接收到了新的 prop，从而导致不必要的重渲染
  const checkSession = React.useCallback(async (): Promise<void> => {
    // checkSession 主要通过 authClient 来获取用户信息，根据获取结果来调整 userState
    try {
      const { data, error } = await authClient.getUser();

      if (error !== null) {
        logger.error(error);
        // prev 表示 setUserState 被调用前的状态，使用 (prev) => newState 来更新状态时
        // React 会将当前的状态值作为参数传递给这个函数，这样就可以确保状态更新是基于最新的状态值
        // 避免了因为异步状态更新导致的潜在的竞态条件问题
        setUserState((prev) => ({
          ...prev,
          user: null,
          error: "服务端获取用户失败",
          isLoading: false,
        }));
      }

      // 从服务端获取用户成功
      setUserState((prev) => ({
        ...prev,
        user: data,
        error: null,
        isLoading: false,
      }));
    } catch (err) {
      // 此时客户端获取用户失败
      logger.error(err);
      setUserState((prev) => ({
        ...prev,
        user: null,
        error: "客户端获取用户失败",
        isLoading: false,
      }));
    }
  }, []);

  // useEffect 是一个钩子 (Hook)，它能够让你在函数组件中执行副作用操作。副作用指那些对组建的渲染
  // 结果有影响但却发生在渲染流程之外的操作，比如数据获取、订阅、手动修改 DOM 等等。
  // 比如这里的 checkSession 本质上就是一个从服务区获取用户数据的过程，获取数据不应该在渲染流程中进行，
  // 因此你应该使用 useEffect 来进行数据获取
  React.useEffect(() => {
    checkSession().catch((err) => {
      logger.error(err);
    });
  }, []);

  return (
    // 当你调用 React.createContext 时，React 会自动为你创建一个 Provider
    // Provider 组件允许你将上下文的值传递给组件树中所有位于此 Provider 内部的组件
    // Provider 的 value 应该填写你想要共享的数据与函数
    <UserContext.Provider value={{ ...userState, checkSession }}>
      {children}
    </UserContext.Provider>
  );
}
