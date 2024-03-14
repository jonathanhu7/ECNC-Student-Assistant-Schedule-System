import React from 'react'
import '@/app/ui/globals.css'
import { lxgwBright } from '@/app/ui/fonts'
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
        <body className={ `${lxgwBright.className}`}>{children}</body>
      </html>
  )
}
