import webpush from 'web-push'
import type { PushSubscription as WebPushSubscription } from 'web-push'
import mongoose from 'mongoose'
import Subscription from './models/Subscription'
import { getDishPerson } from './utils'

const MONGO_URI = process.env.MONGO_URI!

// Configuration de la connexion MongoDB
mongoose.set('strictQuery', true)

// Fonction pour établir la connexion
async function connectDB() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGO_URI, {
        dbName: 'data',
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      })
      console.log('MongoDB connecté avec succès')
    }
  } catch (error) {
    console.error('Erreur de connexion MongoDB:', error)
    throw error
  }
}

// Connexion initiale
connectDB()

webpush.setVapidDetails(
  'mailto:morgan.phemba@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

export async function subscribeUser(sub: WebPushSubscription) {
  // Upsert la souscription (évite les doublons)
  await Subscription.updateOne(
    { endpoint: sub.endpoint },
    { $set: sub },
    { upsert: true }
  )
  return { success: true }
}

export async function sendNotification(message: string) {
  const subs = await Subscription.find().lean()
  console.log('Envoi notification à', subs.length, 'abonnés');
  subs.forEach(sub => {
    console.log('Endpoint:', sub.endpoint)
  })
  const person = getDishPerson(new Date())
  const payload = JSON.stringify({
    title: 'Il est l\'heure de faire la vaisselle',
    body: `C'est au tour de ${person} de faire la vaisselle`
  })
  console.log('Payload envoyé :', payload)
  const results = await Promise.allSettled(
    subs.map(({ endpoint, keys, expirationTime }) =>
      webpush.sendNotification({ endpoint, keys, expirationTime }, payload).catch(e => {
        console.error('Erreur webpush:', e)
        throw e
      })
    )
  )
  // Nettoyage des souscriptions invalides (optionnel)
  // TODO: supprimer les souscriptions en erreur 410 si besoin
  return { success: true, sent: subs.length }
} 