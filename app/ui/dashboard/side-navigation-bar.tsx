import ECNCLogo from "@/app/ui/dashboard/ecnc-logo"; /* 引入 Logo 组件 */
import React from "react"; /* 声明 React 以防止 ESLint 报错 */

export default function SideNavigationBar(): React.ReactElement {
  return (
    <div
      className="max-w-56 /* 设置导航栏宽度 */
      bg-white {/* 设置导航栏背景颜色 */}
      rounded-xl {/* 设置导航栏的圆角 */}
      h-full"
    >
      <ECNCLogo /> {/* logo */}
      {/* 分隔符 */}
      <hr
        className="max-w-48 /* 分隔符宽度 */
        m-auto {/* 左右居中 */}
        border-none {/* 分隔符不要用边框来表示 */}
        bg-black/10 {/* 分隔符颜色 */}
        h-0.5 {/* 分隔符高度 */}"
      />
    </div>
  );
}
