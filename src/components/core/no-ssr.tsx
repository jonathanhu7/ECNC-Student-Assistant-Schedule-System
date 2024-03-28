// no-ssr.tsx 能够确保组件只在客户端上渲染，相较于 "use client"; no-ssr.tsx 提供了一种可以在组件级别控制 SSR 行为的方法

"use client";

import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import React from "react";

export interface NoSsrProps {
  children: React.ReactNode;
  // defer 用来指示是否延迟渲染 children 直到客户端组件挂载完成
  defer?: boolean;
  // 是否在服务器端渲染或客户端组件尚未挂载时显示内容
  fallback?: React.ReactNode;
}

// 以下代码在 https://github.com/mui/material-ui/blob/master/packages/mui-base/src/NoSsr/NoSsr.tsx 的基础上修改
export function NoSsr(props: NoSsrProps): React.ReactElement {
  const { children, defer = false, fallback = null } = props;

  // 一旦组件在客户端挂载完成，这个状态会被设置为 true
  const [mountedState, setMountedState] = React.useState(false);

  // useEnhancedEffect 类似于 useEffect，但它在服务器端不执行，只在客户端上执行
  // 这意味着在服务器端渲染的过程中，useEnhancedEffect 内的代码不被执行
  useEnhancedEffect((): void => {
    // useEnhancedEffect 将在客户端首次渲染时立刻执行，如果 defer === false
    // 那么就表示不需要延迟渲染子组件，此时直接设置 mountedState 为 true，即可直接渲染
    if (!defer) {
      setMountedState(true);
    }
  }, [defer]);

  // 当组件挂载之后，useEffect 才会执行，如果 defer === true，就意味着我们希望组件挂载到 DOM 上再渲染
  // 因此这里可以用 useEffect 来进行操作
  React.useEffect((): void => {
    // 这里的 if (defer) 可以去掉，但是为了保持和上文的一致性，可以保留
    if (defer) {
      setMountedState(true);
    }
  }, [defer]);

  return <React.Fragment>{mountedState ? children : fallback}</React.Fragment>;
}
