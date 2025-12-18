import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getClientIp, getLocation } from '@/lib/analytics-server';
import { UAParser } from 'ua-parser-js';

export async function POST(request: Request) {
  try {
    const { visitorId, sessionId, path, referrer } = await request.json();
    
    if (!visitorId || !sessionId) {
      return NextResponse.json({ error: 'Missing visitorId or sessionId' }, { status: 400 });
    }

    const headersList = request.headers;
    const userAgent = headersList.get('user-agent') || '';
    const ip = await getClientIp();

    const parser = new UAParser(userAgent);
    const browser = parser.getBrowser().name || 'Unknown';
    const os = parser.getOS().name || 'Unknown';
    const deviceType = parser.getDevice().type || 'desktop';

    // GeoIP
    const location = await getLocation(ip);

    // 1. Ensure Visitor Exists
    let visitor = await prisma.visitor.findUnique({
      where: { id: visitorId },
    });

    if (!visitor) {
      visitor = await prisma.visitor.create({
        data: {
          id: visitorId,
          browser,
          os,
          device: deviceType,
          country: location?.country,
          region: location?.region,
          city: location?.city,
        },
      });
    }

    // 2. Ensure Session Exists
    let session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      session = await prisma.session.create({
        data: {
          id: sessionId,
          visitorId: visitor.id,
          referrer,
          duration: 0,
        },
      });
    }

    // 3. Create Page View
    const pageView = await prisma.pageView.create({
      data: {
        sessionId: session.id,
        path,
      },
    });

    return NextResponse.json({ success: true, pageViewId: pageView.id });
  } catch (error) {
    console.error('Analytics Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
