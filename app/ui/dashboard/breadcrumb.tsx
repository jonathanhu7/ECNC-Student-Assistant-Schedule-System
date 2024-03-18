"use client";

import React from "react";
import { links } from "@/app/config/linksConfig";
import { usePathname } from "next/navigation";

export default function Breadcrumb(): React.ReactNode {
  const pathname = usePathname();
  // 查找与当前路径匹配的连接对象并赋值给 breadcrumbName
  const currentLink = links.find((link) => pathname === link.href);
  const breadcrumbName = currentLink != null ? currentLink.name : "未知页面";

  return (
    <div className="text-xl text-gray-600 ml-5 mt-3">{breadcrumbName}</div>
  );
}
