import { NextResponse } from 'next/server';
import { db } from '@/lib/storage';

export async function GET() {
  try {
    const images = db.getImages();
    return NextResponse.json({ success: true, data: images });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { originalPath, customUrl } = await req.json();
    if (!originalPath || !customUrl) {
      return NextResponse.json({ success: false, error: 'Missing parameters' }, { status: 400 });
    }
    const updated = db.setCustomImage(originalPath, customUrl);
    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
