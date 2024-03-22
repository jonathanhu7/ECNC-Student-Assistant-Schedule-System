// 自定义钩子：用来实时获取用户上下文

import React from "react";
import { type UserContextValue, UserContext } from "@/contexts/user-context";

export function useUser(): UserContextValue {
  // 通过 react 的 useContext 钩子来实时获取 UserContext 从而间接实现钩子效果
  const userContext = React.useContext(UserContext);

  if (userContext === undefined) {
    // 当 useUser 钩子被调用的时候，如果它没有在被 UserProvider 包裹下使用的话，它就没法获取到 UserContext，此时它就为 undefined
    throw new Error("useUser 必须在 userContext 包裹下使用");
  }

  return userContext;
}
