import webpush from 'web-push'
import type { PushSubscription as WebPushSubscription } from 'web-push'
import mongoose from 'mongoose'
import Subscription from './models/Subscription'

const MONGO_URI = process.env.MONGO_URI!

if (!mongoose.connection.readyState) {
  mongoose.connect(MONGO_URI, { dbName: 'data' })
}

console.log('VAPID PUBLIC:', process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY)
console.log('VAPID PRIVATE:', process.env.VAPID_PRIVATE_KEY)

webpush.setVapidDetails(
  'mailto:ton.email@domaine.com',
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
  const payload = JSON.stringify({
    title: 'Test Notification',
    body: message
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