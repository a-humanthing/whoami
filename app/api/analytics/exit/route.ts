import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { sessionId, duration, pageViewId } = await request.json();

    if (!sessionId || duration === undefined) {
      return NextResponse.json({ error: 'Missing sessionId or duration' }, { status: 400 });
    }

    // Update Session
    await prisma.session.update({
      where: { id: sessionId },
      data: {
        duration: { increment: duration },
        endedAt: new Date(),
      },
    });

    // Update PageView if ID is provided
    if (pageViewId) {
       await prisma.pageView.update({
         where: { id: pageViewId },
         data: {
           timeSpent: duration,
         },
       });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics Exit Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
