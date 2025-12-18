import crypto from 'crypto';
import { headers } from 'next/headers';

/**
 * Anonymizes an IP address by hashing it with a daily rotating salt.
 * This allows distinguishing unique visitors for a day without permanently storing the IP.
 */
export function anonymizeIp(ip: string): string {
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const salt = process.env.ANALYTICS_SALT || 'default-salt'; 
  return crypto.createHash('sha256').update(`${ip}-${date}-${salt}`).digest('hex');
}

export async function getLocation(ip: string) {
  try {
    const res = await fetch(`https://ipinfo.io/${ip}/json`);
    const data = await res.json();
    return {
      country: data.country || 'Unknown',
      region: data.region || 'Unknown',
      city: data.city || 'Unknown'
    };
  } catch (error) {
    console.error('GeoIP Lookup Error:', error);
    return {
      country: 'Unknown',
      region: 'Unknown',
      city: 'Unknown'
    };
  }
}

export async function getClientIp() {
    const header = await headers();
    const forwardedFor = header.get('x-forwarded-for');
    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim();
    }
    return '127.0.0.1';
}
