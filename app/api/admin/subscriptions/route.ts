import { NextRequest, NextResponse } from 'next/server'
import Subscription from '@/lib/models/Subscription'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

function checkAuth(req: NextRequest) {
  const pwd = req.headers.get('x-admin-password')
  return pwd && pwd === ADMIN_PASSWORD
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const subs = await Subscription.find().lean()
  return NextResponse.json(subs)
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { endpoint } = await req.json()
  if (!endpoint) return NextResponse.json({ error: 'Missing endpoint' }, { status: 400 })
  await Subscription.deleteOne({ endpoint })
  return NextResponse.json({ success: true })
} 