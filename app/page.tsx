"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Utensils, Bell } from "lucide-react"
import DailyView from "@/components/daily-view"
import WeeklyView from "@/components/weekly-view"
import Image from "next/image"
import { Toaster, toast } from 'react-hot-toast'
import MobileLayout from "@/components/MobileLayout"
import DesktopLayout from "@/components/DesktopLayout"
import { useIsMobile } from "@/hooks/use-mobile"

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export default function Home() {
  const [currentView, setCurrentView] = useState<"daily" | "weekly">("daily")
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)

  const isMobile = useIsMobile()

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      }).then(async (registration) => {
        const sub = await registration.pushManager.getSubscription()
        setSubscription(sub)
      })
    }
  }, [])

  async function subscribeToPush() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      const registration = await navigator.serviceWorker.ready
      const existingSub = await registration.pushManager.getSubscription()
      if (existingSub) {
        await existingSub.unsubscribe()
      }
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      })
      const serializedSub = JSON.parse(JSON.stringify(sub))
      await fetch('/api/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sub: serializedSub }),
      })
      toast.success("Vous êtes maintenant abonné aux notifications push !")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster />
      {isMobile ? (
        <MobileLayout
          currentView={currentView}
          setCurrentView={setCurrentView}
          subscribeToPush={subscribeToPush}
        >
          <AnimatePresence mode="wait">
            {currentView === "daily" ? (
              <motion.div
                key="daily"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DailyView />
              </motion.div>
            ) : (
              <motion.div
                key="weekly"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <WeeklyView />
              </motion.div>
            )}
          </AnimatePresence>
        </MobileLayout>
      ) : (
        <DesktopLayout
          currentView={currentView}
          setCurrentView={setCurrentView}
          subscribeToPush={subscribeToPush}
        >
          <AnimatePresence mode="wait">
            {currentView === "daily" ? (
              <motion.div
                key="daily"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DailyView />
              </motion.div>
            ) : (
              <motion.div
                key="weekly"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <WeeklyView />
              </motion.div>
            )}
          </AnimatePresence>
        </DesktopLayout>
      )}
    </div>
  )
}
