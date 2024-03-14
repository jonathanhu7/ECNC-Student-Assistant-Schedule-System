import React from 'react'
import '@/app/ui/globals.css'
import { lxgwWenKai, robotoSlab } from '@/app/ui/fonts'
export const metadata = {
  title: 'ECNC 排班系统'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
      <html lang="zh-CN">
        <body className={ `${robotoSlab.className} ${lxgwWenKai.className}`}>{children}</body>
      </html>
  )
}
