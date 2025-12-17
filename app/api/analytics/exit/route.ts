import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { sessionId, duration } = await request.json();

    if (!sessionId || duration === undefined) {
      return NextResponse.json({ error: 'Missing sessionId or duration' }, { status: 400 });
    }

    await prisma.session.update({
      where: { id: sessionId },
      data: {
        duration: { increment: duration }, // Basic accumulation
        endedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics Exit Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
