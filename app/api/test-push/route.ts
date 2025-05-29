import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import webPush from 'web-push';

const SUBS_FILE = path.join(process.cwd(), 'subscriptions.json');

webPush.setVapidDetails(
  'mailto:ton@email.com',
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  let subs = [];
  try {
    subs = JSON.parse(fs.readFileSync(SUBS_FILE, 'utf-8'));
  } catch {}
  for (const sub of subs) {
    await webPush.sendNotification(sub.subscription, JSON.stringify({
      title: `C'est au tour de ${name} de faire la vaisselle aujourd'hui !`,
      body: `Merci de ta participation !`,
    }));
  }
  return NextResponse.json({ ok: true, sent: subs.length });
} 