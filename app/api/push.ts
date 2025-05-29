import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import webPush from 'web-push';

const SUBS_FILE = path.join(process.cwd(), 'subscriptions.json');

webPush.setVapidDetails(
  'mailto:ton@email.com',
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

const namesForDay = {
  0: 'Bryan',
  1: 'Dylan',
  2: 'Morgan',
  3: 'Bryan',
  4: 'Maman',
  5: 'Morgan',
  6: 'Dylan',
};

export async function POST() {
  const today = new Date().getDay();
  const targetName = namesForDay[today as keyof typeof namesForDay];
  let subs = [];
  try {
    subs = JSON.parse(fs.readFileSync(SUBS_FILE, 'utf-8'));
  } catch {}
  const filtered = subs.filter((s: any) => s.name === targetName);
  for (const sub of filtered) {
    await webPush.sendNotification(sub.subscription, JSON.stringify({
      title: `C'est ton tour !`,
      body: `C'est à toi de faire la vaisselle aujourd'hui !`,
    }));
  }
  return NextResponse.json({ ok: true, sent: filtered.length });
} 