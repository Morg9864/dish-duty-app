// Planning fixe de la vaisselle
const dishSchedule = {
  1: "Dylan", // Lundi
  2: "Morgan", // Mardi
  3: "Bryan", // Mercredi
  4: "Dylan", // Jeudi
  5: "Maman", // Vendredi
  6: "Morgan", // Samedi
  0: "Bryan", // Dimanche
}

export function getDishPerson(date: Date): string {
  const dayOfWeek = date.getDay()
  return dishSchedule[dayOfWeek as keyof typeof dishSchedule]
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function getDayName(date: Date): string {
  return date.toLocaleDateString("fr-FR", { weekday: "long" })
}

export function getWeekDays(): Date[] {
  const today = new Date()
  const currentDay = today.getDay()
  const monday = new Date(today)

  // Calculer le lundi de cette semaine
  const daysToMonday = currentDay === 0 ? -6 : 1 - currentDay
  monday.setDate(today.getDate() + daysToMonday)

  const weekDays: Date[] = []
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday)
    day.setDate(monday.getDate() + i)
    weekDays.push(day)
  }

  return weekDays
}

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
