import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { name, email, message, visitorId } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Connect to visitor if ID is provided and valid
    // We use a try-catch for the connection in case visitor doesn't exist
    // to avoid failing the whole request
    let visitorConnect = undefined;
    if (visitorId) {
        const visitorExists = await prisma.visitor.count({ where: { id: visitorId } });
        if (visitorExists) {
            visitorConnect = { connect: { id: visitorId } };
        }
    }

    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        message,
        visitor: visitorConnect,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact Submission Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
