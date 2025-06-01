import webpush from 'web-push'
import type { PushSubscription as WebPushSubscription } from 'web-push'
import fs from 'fs'
import path from 'path'

console.log('VAPID PUBLIC:', process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY)
console.log('VAPID PRIVATE:', process.env.VAPID_PRIVATE_KEY)

webpush.setVapidDetails(
  'mailto:ton.email@domaine.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

const SUBS_FILE = path.join(process.cwd(), 'lib', 'subscriptions.json')

function readSubscriptions(): WebPushSubscription[] {
  try {
    const data = fs.readFileSync(SUBS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

function writeSubscriptions(subs: WebPushSubscription[]) {
  fs.writeFileSync(SUBS_FILE, JSON.stringify(subs, null, 2), 'utf-8')
}

export function subscribeUser(sub: WebPushSubscription) {
  const subs = readSubscriptions()
  // On évite les doublons (même endpoint)
  if (!subs.find(s => s.endpoint === sub.endpoint)) {
    subs.push(sub)
    writeSubscriptions(subs)
  }
  return { success: true }
}

export async function sendNotification(message: string) {
  const subs = readSubscriptions()
  console.log('Envoi notification à', subs.length, 'abonnés');
  // consolelog le endpoint de chaque souscription
  subs.forEach(sub => {
    console.log('Endpoint:', sub.endpoint)
  })
  const payload = JSON.stringify({
    title: 'Test Notification',
    body: message
  })
  console.log('Payload envoyé :', payload)
  const results = await Promise.allSettled(
    subs.map(sub =>
      webpush.sendNotification(sub, payload).catch(e => {
        console.error('Erreur webpush:', e)
        throw e
      })
    )
  )
  // Nettoyage des souscriptions invalides
  const validSubs = subs.filter((_, i) => {
    const r = results[i]
    return !(r.status === 'rejected' && String(r.reason).includes('410'))
  })
  if (validSubs.length !== subs.length) {
    writeSubscriptions(validSubs)
  }
  return { success: true, sent: validSubs.length }
} 