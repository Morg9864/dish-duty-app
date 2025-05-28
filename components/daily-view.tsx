"use client"

import { motion } from "framer-motion"
import { User, CalendarIcon, Droplet, House, Utensils } from "lucide-react"
import { getDishPerson, formatDate, getDayName } from "@/lib/utils"

const phrasesMotivantes = [
  "Une cuisine propre, c'est un foyer heureux 🏠",
  "La propreté est la moitié de la santé ✨",
  "Une vaisselle propre, une conscience tranquille 🧼",
  "Chaque assiette lavée est une victoire 🏆",
  "La propreté est le reflet de l'harmonie 🌟",
  "Une cuisine rangée, une vie organisée 📦",
  "La vaisselle propre, c'est l'amour en action ❤️",
  "Chaque jour sa vaisselle, chaque jour sa joie 😊",
  "Une cuisine propre, des repas plus savoureux 🍽️",
  "La propreté est une forme de respect 🎯",
  "Une vaisselle propre, un esprit serein 🧘‍♂️",
  "Chaque assiette lavée est un pas vers l'harmonie 🌈",
  "La propreté est une source de bien-être 🌸",
  "Une cuisine propre, des invités ravis 👥",
  "La vaisselle propre, c'est la vie en rose 🌹"
]

export default function DailyView() {
  const today = new Date()
  const person = getDishPerson(today)
  const dayName = getDayName(today)
  const formattedDate = formatDate(today)
  const phraseAleatoire = phrasesMotivantes[Math.floor(Math.random() * phrasesMotivantes.length)]

  const personColors = {
    Morgan: "from-purple-500 to-purple-600",
    Bryan: "from-blue-500 to-blue-600",
    Dylan: "from-orange-500 to-orange-600",
    Maman: "from-pink-500 to-pink-600",
  }

  return (
    <div className="space-y-6">
      {/* Date Card */}
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <CalendarIcon className="w-5 h-5 text-primary" />
          </div>
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Aujourd'hui</span>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">{dayName}</h2>
        <p className="text-gray-600">{formattedDate}</p>
      </motion.div>

      {/* Person Card */}
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="text-center">
          <motion.div
            className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${personColors[person as keyof typeof personColors]} flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <User className="w-12 h-12 text-white drop-shadow-lg" />
          </motion.div>

          <motion.h3
            className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {person}
          </motion.h3>

          <motion.div
            className="flex items-center justify-center gap-2 text-primary bg-primary/10 px-4 py-2 rounded-full w-fit mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Utensils className="w-5 h-5" />
            <span className="font-medium">C'est ton tour !</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Motivation Card */}
      <motion.div
        className="bg-gradient-to-br from-primary to-green-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="text-center">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
            className="bg-white/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center"
          >
            <Utensils className="w-8 h-8 drop-shadow-lg" />
          </motion.div>
          <h4 className="text-xl font-semibold mb-3">Merci pour ton aide !</h4>
          <p className="text-green-100 text-sm leading-relaxed">{phraseAleatoire}</p>
        </div>
      </motion.div>
    </div>
  )
}
