"use client";
import { useEffect, useState } from "react";

const NAMES = ["Dylan", "Morgan", "Bryan", "Maman"];

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

export default function PushSubscribe() {
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  async function subscribe() {
    setLoading(true);
    if ("serviceWorker" in navigator && "PushManager" in window) {
      const reg = await navigator.serviceWorker.register("/sw.js");
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
      });
      await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify({ subscription: sub }),
        headers: { "Content-Type": "application/json" },
      });
      setSubscribed(true);
    }
    setLoading(false);
  }

  async function sendTest(name: string) {
    await fetch("/api/test-push", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json" },
    });
    alert(`Notification test envoyée à tous : ${name}`);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Activer les notifications push</h2>
      <button
        className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        onClick={subscribe}
        disabled={subscribed || loading}
      >
        {subscribed ? "Abonné !" : loading ? "Abonnement..." : "Activer les notifications"}
      </button>
      <div className="flex gap-2 flex-wrap">
        {NAMES.map(n => (
          <button
            key={n}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 border border-gray-300"
            onClick={() => sendTest(n)}
            type="button"
          >
            {`Envoie notif ${n}`}
          </button>
        ))}
      </div>
    </div>
  );
} 