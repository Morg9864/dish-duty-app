import { NextRequest, NextResponse } from 'next/server'
import Subscription from '@/lib/models/Subscription'
import mongoose from 'mongoose'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const MONGO_URI = process.env.MONGO_URI!

function checkAuth(req: NextRequest) {
  const pwd = req.headers.get('x-admin-password')
  return pwd && pwd === ADMIN_PASSWORD
}

async function ensureDBConnection() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO_URI, {
      dbName: 'data',
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
  }
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await ensureDBConnection()
    const subs = await Subscription.find().lean()
    return NextResponse.json(subs)
  } catch (error) {
    console.error('Erreur lors de la récupération des souscriptions:', error)
    return NextResponse.json(
      { error: 'Erreur de base de données' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { endpoint } = await req.json()
    if (!endpoint) {
      return NextResponse.json({ error: 'Missing endpoint' }, { status: 400 })
    }

    await ensureDBConnection()
    await Subscription.deleteOne({ endpoint })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur lors de la suppression de la souscription:', error)
    return NextResponse.json(
      { error: 'Erreur de base de données' },
      { status: 500 }
    )
  }
} 