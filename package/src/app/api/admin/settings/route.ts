import { NextResponse } from 'next/server';
import { db } from '@/lib/storage';

export async function GET() {
  try {
    const settings = db.getSettings();
    return NextResponse.json({ success: true, data: settings });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    db.saveSettings(body);
    return NextResponse.json({ success: true, data: body });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
