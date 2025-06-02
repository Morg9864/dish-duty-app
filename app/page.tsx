"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Utensils, Bell } from "lucide-react"
import DailyView from "@/components/daily-view"
import WeeklyView from "@/components/weekly-view"
import Image from "next/image"
import { Toaster, toast } from 'react-hot-toast'

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

  async function sendNotifVaisselle() {
    if (subscription) {
      await fetch('/api/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: "À ton tour de faire la vaisselle" }),
      })
    } else {
      alert("Abonne-toi d'abord aux notifications !")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster />
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Image src="dish-duty-logo.png" alt="Dish Duty" width={48} height={48} className="bg-white"/>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">À qui le tour ?</h1>
            </motion.div>
            <button
              onClick={subscribeToPush}
              className="ml-4 p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors flex items-center justify-center"
              title="S'abonner aux notifications"
            >
              <Bell className="w-6 h-6" />
            </button>
            <motion.button
              onClick={() => setCurrentView(currentView === "daily" ? "weekly" : "daily")}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-md mx-auto w-full px-4 py-6">
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
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-100">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex justify-center gap-8">
            <motion.button
              onClick={() => setCurrentView("daily")}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                currentView === "daily" ? "text-primary bg-primary/10" : "text-gray-500 hover:text-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Utensils className="w-5 h-5" />
              <span className="text-xs font-medium">Aujourd'hui</span>
            </motion.button>

            <motion.button
              onClick={() => setCurrentView("weekly")}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                currentView === "weekly" ? "text-primary bg-primary/10" : "text-gray-500 hover:text-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-5 h-5" />
              <span className="text-xs font-medium">Semaine</span>
            </motion.button>

            <motion.button
              onClick={sendNotifVaisselle}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors bg-blue-600 text-white hover:bg-blue-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xs font-medium">Test notif</span>
            </motion.button>
          </div>
        </div>
      </nav>
    </div>
  )
}
