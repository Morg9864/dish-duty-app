"use client"

import { motion } from "framer-motion"
import { CalendarIcon } from "lucide-react"
import { getDishPerson, getWeekDays, getDayName } from "../lib/utils"

export default function WeeklyView() {
  const weekDays = getWeekDays()

  const personColors = {
    Morgan: "bg-purple-500",
    Bryan: "bg-blue-500",
    Dylan: "bg-orange-500",
    Maman: "bg-pink-500",
  }

  const today = new Date()
  const todayStr = today.toDateString()

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <CalendarIcon className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Planning de la semaine</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Qui fait quoi ?</h2>
      </motion.div>

      {/* Week Schedule */}
      <div className="space-y-3">
        {weekDays.map((date, index) => {
          const person = getDishPerson(date)
          const dayName = getDayName(date)
          const isToday = date.toDateString() === todayStr

          return (
            <motion.div
              key={date.toISOString()}
              className={`bg-white rounded-xl p-4 shadow-sm border transition-all ${
                isToday ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-gray-100 hover:border-gray-200"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${personColors[person as keyof typeof personColors]}`} />
                  <div>
                    <h3 className={`font-semibold ${isToday ? "text-primary" : "text-gray-900"}`}>{dayName}</h3>
                    <p className="text-sm text-gray-500">
                      {date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`font-medium ${isToday ? "text-primary" : "text-gray-700"}`}>{person}</span>
                  {isToday && (
                    <motion.div
                      className="w-2 h-2 bg-primary rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Legend */}
      <motion.div
        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h4 className="font-semibold text-gray-900 mb-3 text-center">Légende</h4>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(personColors).map(([person, color]) => (
            <div key={person} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${color}`} />
              <span className="text-sm text-gray-600">{person}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
