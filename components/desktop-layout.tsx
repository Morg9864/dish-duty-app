import { ReactNode } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Bell, Calendar, Utensils } from "lucide-react"
import { Toaster } from "react-hot-toast"

interface DesktopLayoutProps {
  currentView: "daily" | "weekly"
  setCurrentView: (view: "daily" | "weekly") => void
  subscribeToPush: () => void
  children?: ReactNode
}

export default function DesktopLayout({
  currentView,
  setCurrentView,
  subscribeToPush,
  children,
}: DesktopLayoutProps) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Toaster />
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r flex flex-col items-center py-10 px-6 gap-10 shadow-md">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mb-2">
            <Image src="dish-duty-logo.png" alt="Dish Duty" width={80} height={80} className="bg-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 text-center">À qui le tour&nbsp;?</h1>
        </div>
        <div className="flex flex-col gap-4 w-full items-center">
          <button
            onClick={subscribeToPush}
            className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium"
            title="S'abonner aux notifications"
          >
            <Bell className="w-6 h-6" /> Notifications
          </button>
        </div>
        <nav className="flex flex-col gap-4 w-full mt-8">
          <motion.button
            onClick={() => setCurrentView("daily")}
            className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-colors text-lg font-semibold w-full justify-start ${
              currentView === "daily" ? "text-primary bg-primary/10" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Utensils className="w-6 h-6" /> Aujourd'hui
          </motion.button>
          <motion.button
            onClick={() => setCurrentView("weekly")}
            className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-colors text-lg font-semibold w-full justify-start ${
              currentView === "weekly" ? "text-primary bg-primary/10" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Calendar className="w-6 h-6" /> Semaine
          </motion.button>
        </nav>
        <div className="flex-1" />
        <div className="text-xs text-gray-400 text-center">Dish Duty App © {new Date().getFullYear()}</div>
      </aside>
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-12 overflow-y-auto">
        <div className="w-full max-w-2xl">
          {children}
        </div>
      </main>
    </div>
  )
} 