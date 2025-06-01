# Guide : Ajouter des notifications push web à un projet Next.js

Ce guide explique comment mettre en place un système de notifications push web minimaliste dans Next.js, avec seulement deux boutons :
- **S'abonner aux notifications**
- **Envoyer une notification**

---

## 1. Générer les clés VAPID

Dans un terminal :
```bash
npx web-push generate-vapid-keys
```
Copiez la clé publique et la clé privée générées.

---

## 2. Ajouter les variables d'environnement

Dans `.env.local` :
```
NEXT_PUBLIC_VAPID_PUBLIC_KEY=VOTRE_CLE_PUBLIQUE
VAPID_PRIVATE_KEY=VOTRE_CLE_PRIVEE
```

---

## 3. Installer les dépendances

```bash
pnpm install web-push
```

---

## 4. Créer le service worker

Dans `public/sw.js` :
```js
self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || '/icon-192x192.png',
      badge: '/badge.png',
      vibrate: [200, 100, 200],
      actions: [
        {
          action: 'unsubscribe',
          title: 'Se désabonner',
          icon: '/unsubscribe.png'
        },
        {
          action: 'open',
          title: 'Ouvrir',
          icon: '/open.png'
        }
      ],
      data: {
        url: data.url || '/',
      }
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  if (event.action === 'unsubscribe') {
    // Gérer le désabonnement ici
  } else {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});
```

---

## 5. Créer la logique serveur

Dans `src/lib/notifications.ts` :
```ts
import webpush from 'web-push'
import type { PushSubscription as WebPushSubscription } from 'web-push'

webpush.setVapidDetails(
  'mailto:ton.email@domaine.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

let subscription: WebPushSubscription | null = null

export function subscribeUser(sub: WebPushSubscription) {
  subscription = sub
  return { success: true }
}

export async function sendNotification(message: string) {
  if (!subscription) throw new Error('No subscription available')
  const payload = JSON.stringify({
    title: 'Test Notification',
    body: message,
    icon: '/icon-192x192.png',
    url: 'https://votre-site.com/',
  })
  await webpush.sendNotification(subscription, payload)
  return { success: true }
}
```

---

## 6. Créer l'API route

Dans `src/app/api/push/route.ts` :
```ts
import { NextRequest, NextResponse } from 'next/server'
import { sendNotification, subscribeUser } from '@/lib/notifications'

export async function POST(req: NextRequest) {
  const { message, sub } = await req.json()
  if (sub) subscribeUser(sub)
  try {
    await sendNotification(message)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
```

---

## 7. Créer le composant React minimal

Dans `src/app/page.tsx` (ou un composant dédié) :
```tsx
'use client'
import { useState, useEffect } from 'react'

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

export default function PushDemo() {
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [message, setMessage] = useState('')

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
    const registration = await navigator.serviceWorker.ready
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    })
    setSubscription(sub)
    const serializedSub = JSON.parse(JSON.stringify(sub))
    await fetch('/api/push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sub: serializedSub }),
    })
  }

  async function sendTestNotification() {
    if (subscription) {
      await fetch('/api/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })
      setMessage('')
    }
  }

  return (
    <div className="space-y-4">
      <button onClick={subscribeToPush} className="px-4 py-2 bg-green-600 text-white rounded-md">
        S'abonner aux notifications
      </button>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Message de notification"
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="px-2 py-1 border rounded"
        />
        <button onClick={sendTestNotification} className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Envoyer une notification
        </button>
      </div>
    </div>
  )
}
```

---

## 8. Points importants

- **HTTPS obligatoire** (sauf en local sur `localhost`).
- Les notifications ne fonctionnent que si l'utilisateur accepte les permissions.
- Les images, actions, etc. sont mieux supportées sur Android/Chrome que sur iOS/Safari.
- Pour la production, stockez les souscriptions en base de données.

---

## 9. Ressources utiles
- [MDN Web Push API](https://developer.mozilla.org/fr/docs/Web/API/Push_API)
- [web-push (npm)](https://www.npmjs.com/package/web-push)
- [Google Web Fundamentals - Push Notifications](https://web.dev/push-notifications/) 