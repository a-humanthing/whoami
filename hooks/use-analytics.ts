"use client";

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const startTimeRef = useRef<number>(Date.now());
  const pageViewIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Initialize Visitor ID
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
      visitorId = uuidv4();
      localStorage.setItem('visitor_id', visitorId);
    }

    // Initialize Session ID
    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = uuidv4();
      sessionStorage.setItem('session_id', sessionId);
    }

    // Prepare Payload
    const fullPath = pathname + (searchParams.toString() ? '?' + searchParams.toString() : '');
    const referrer = document.referrer;

    // Send Visit Beacon
    const sendVisit = async () => {
      try {
        const response = await fetch('/api/analytics/visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            visitorId,
            sessionId,
            path: fullPath,
            referrer,
          }),
        });
        const data = await response.json();
        if (data.pageViewId) {
          pageViewIdRef.current = data.pageViewId;
        }
      } catch (err) {
        console.error('Failed to send analytics', err);
      }
    };

    sendVisit();

    // Handle Route Change / Unmount (Exit)
    const handleUnmount = async () => {
      const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const pageViewId = pageViewIdRef.current;
      
      try {
        // Use navigator.sendBeacon for reliability on unload
        const blob = new Blob([JSON.stringify({ sessionId, duration, pageViewId })], { type: 'application/json' });
        navigator.sendBeacon('/api/analytics/exit', blob);
      } catch (e) {
        // fallback fetch
         fetch('/api/analytics/exit', {
            method: 'POST',
            body: JSON.stringify({ sessionId, duration, pageViewId }),
            keepalive: true
         });
      }
    };

    return () => {
       handleUnmount();
       startTimeRef.current = Date.now(); // Reset timer for next page view
       pageViewIdRef.current = null; // Reset pageViewId
    };
  }, [pathname, searchParams]);
}
