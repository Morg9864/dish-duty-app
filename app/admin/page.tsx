"use client"
import { useState } from "react"

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [isAuth, setIsAuth] = useState(false)
  const [subs, setSubs] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await fetch("/api/admin/subscriptions", {
      headers: { "x-admin-password": password }
    })
    if (res.status === 200) {
      setIsAuth(true)
      setSubs(await res.json())
    } else {
      setError("Mot de passe incorrect")
    }
    setLoading(false)
  }

  async function fetchSubs() {
    setLoading(true)
    const res = await fetch("/api/admin/subscriptions", {
      headers: { "x-admin-password": password }
    })
    if (res.status === 200) setSubs(await res.json())
    setLoading(false)
  }

  async function deleteSub(endpoint: string) {
    setLoading(true)
    await fetch("/api/admin/subscriptions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ endpoint })
    })
    await fetchSubs()
    setLoading(false)
    setConfirmDelete(null)
  }

  function logout() {
    setIsAuth(false)
    setPassword("")
    setSubs([])
    setError("")
  }

  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border border-blue-100">
          <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">Admin - Souscriptions Push</h1>
          <form onSubmit={login} className="space-y-4">
            <input
              type="password"
              placeholder="Mot de passe admin"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="px-3 py-2 border rounded w-full focus:ring-2 focus:ring-blue-300"
              autoFocus
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded w-full font-semibold shadow hover:bg-blue-700 transition-colors" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </button>
            {error && <div className="text-red-600 text-center">{error}</div>}
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center py-8">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl border border-blue-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-700">Admin - Souscriptions Push</h1>
            <p className="text-gray-500 mt-1">Bienvenue 👋, vous pouvez gérer les souscriptions push ici.</p>
          </div>
          <button onClick={logout} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-700 font-semibold">Déconnexion</button>
        </div>
        <button onClick={fetchSubs} className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 font-semibold">Rafraîchir</button>
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-50">
                <th className="p-2 border">Endpoint</th>
                <th className="p-2 border">p256dh</th>
                <th className="p-2 border">auth</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((sub) => (
                <tr key={sub.endpoint} className="hover:bg-blue-50 transition-colors">
                  <td className="p-2 border break-all text-xs max-w-xs">{sub.endpoint}</td>
                  <td className="p-2 border break-all text-xs max-w-xs">{sub.keys?.p256dh}</td>
                  <td className="p-2 border break-all text-xs max-w-xs">{sub.keys?.auth}</td>
                  <td className="p-2 border">
                    {confirmDelete === sub.endpoint ? (
                      <div className="flex flex-col gap-2">
                        <span className="text-sm text-red-600">Confirmer ?</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => deleteSub(sub.endpoint)}
                            className="px-2 py-1 bg-red-600 text-white rounded font-semibold"
                            disabled={loading}
                          >
                            Oui
                          </button>
                          <button
                            onClick={() => setConfirmDelete(null)}
                            className="px-2 py-1 bg-gray-300 text-gray-700 rounded font-semibold"
                          >
                            Non
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(sub.endpoint)}
                        className="px-2 py-1 bg-red-600 text-white rounded font-semibold hover:bg-red-700"
                        disabled={loading}
                      >
                        Supprimer
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {loading && <div className="mt-4 text-blue-600">Chargement...</div>}
      </div>
    </div>
  )
} 