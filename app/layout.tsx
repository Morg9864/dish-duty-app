import type { Metadata } from 'next'
import './globals.css'
import Script from "next/script";

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
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          strategy="afterInteractive"
          defer
        />
        <Script id="onesignal-init" strategy="afterInteractive">
          {`
            window.OneSignalDeferred = window.OneSignalDeferred || [];
            OneSignalDeferred.push(async function(OneSignal) {
              await OneSignal.init({
                appId: "04045773-448f-4890-9939-acfc6aa5e621",
                safari_web_id: "web.onesignal.auto.052f5ca9-1683-44c8-8c04-d88e94620413",
                notifyButton: {
                  enable: true,
                },
              });
            });
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
