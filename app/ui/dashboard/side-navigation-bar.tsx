import React from "react"; /* 声明 React 以防止 ESLint 报错 */
import ECNCLogo from "@/app/ui/dashboard/ecnc-logo"; /* 引入 Logo 组件 */
import NavigationLinks from "@/app/ui/dashboard/navigation-links";

export default function SideNavigationBar(): React.ReactElement {
  return (
    <div
      className="max-w-64 /* 设置导航栏宽度 */
      bg-white {/* 设置导航栏背景颜色 */}
      rounded-xl {/* 设置导航栏的圆角 */}
      h-full"
    >
      <ECNCLogo /> {/* logo */}
      {/* 分隔符 */}
      <hr
        className="max-w-48
          m-auto {/* 左右居中 */}
          mb-3
        "
      />
      {/* 各个导航项 */}
      <NavigationLinks />
    </div>
  );
}
