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

export function getLocation(ip: string) {
  // GeoIP-lite fails in Next.js Server Components build due to data file bundling
  // Returning null/unknown for now to unblock build.
  // Future improvement: Use an external API or a compatible DB.
  return {
    country: 'Unknown',
    region: 'Unknown',
    city: 'Unknown'
  };
}

export async function getClientIp() {
    const header = await headers();
    const forwardedFor = header.get('x-forwarded-for');
    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim();
    }
    return '127.0.0.1';
}
