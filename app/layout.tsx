import React from "react";
import '@/app/ui/globals.css'
export const metadata = {
    title: 'ECNC 排班系统'
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh-CN">
            <body>{children}</body>
        </html>
    )
}