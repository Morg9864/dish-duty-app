"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Utensils } from "lucide-react"
import DailyView from "@/components/daily-view"
import WeeklyView from "@/components/weekly-view"

export default function Home() {
  const [currentView, setCurrentView] = useState<"daily" | "weekly">("daily")

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Utensils className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Dish Duty</h1>
            </motion.div>

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
          </div>
        </div>
      </nav>
    </div>
  )
}
