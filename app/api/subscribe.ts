import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SUBS_FILE = path.join(process.cwd(), 'subscriptions.json');

function readSubs() {
  try {
    return JSON.parse(fs.readFileSync(SUBS_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function writeSubs(subs: any[]) {
  fs.writeFileSync(SUBS_FILE, JSON.stringify(subs, null, 2));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const subs = readSubs();
  subs.push(body);
  writeSubs(subs);
  return NextResponse.json({ ok: true });
} 