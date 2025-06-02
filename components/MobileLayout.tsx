import { ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Bell, Calendar, Utensils } from "lucide-react"
import { Toaster } from "react-hot-toast"

interface MobileLayoutProps {
  currentView: "daily" | "weekly"
  setCurrentView: (view: "daily" | "weekly") => void
  subscribeToPush: () => void
  children?: ReactNode
}

export default function MobileLayout({
  currentView,
  setCurrentView,
  subscribeToPush,
  children,
}: MobileLayoutProps) {
  return (
    <>
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
                <Image src="dish-duty-logo.png" alt="Dish Duty" width={48} height={48} className="bg-white" />
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
        {children}
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
    </>
  )
} 