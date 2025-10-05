import { NextResponse } from 'next/server';
import { getAllLands } from '@/lib/lands';
import * as Sentry from '@sentry/nextjs';

export async function GET() {
  try {
    const result = await getAllLands();

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, lands: result.lands });
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch lands' },
      { status: 500 }
    );
  }
}
