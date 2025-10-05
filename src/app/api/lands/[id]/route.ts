import { NextResponse } from 'next/server';
import { getLandById, updateLand, createLand } from '@/lib/lands';
import * as Sentry from '@sentry/nextjs';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await getLandById(id);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, land: result.land });
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch land' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const result = await updateLand(id, body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, land: result.land });
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json(
      { success: false, error: 'Failed to update land' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = await createLand(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, land: result.land });
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json(
      { success: false, error: 'Failed to create land' },
      { status: 500 }
    );
  }
}
