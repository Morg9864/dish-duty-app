import { NextRequest, NextResponse } from 'next/server'
import { sendNotification, subscribeUser } from '@/lib/notifications'

export async function POST(req: NextRequest) {
  const { message, sub } = await req.json()
  if (sub) await subscribeUser(sub)
  if (message) {
    try {
      await sendNotification(message)
      return NextResponse.json({ success: true })
    } catch (error) {
      return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
  }
  // Si pas de message, on ne fait qu'abonner, pas de notif
  return NextResponse.json({ success: true })
} 