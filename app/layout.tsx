import type { Metadata } from 'next'
import './globals.css'
import Script from "next/script";
import OneSignalProvider from "../hooks/OneSignalProvider";

export const metadata: Metadata = {
  title: 'Dish Duty',
  description: 'Dish Duty',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
          strategy="afterInteractive"
          async
        />
      </head>
      <body>
        <OneSignalProvider>{children}</OneSignalProvider>
      </body>
    </html>
  )
}
