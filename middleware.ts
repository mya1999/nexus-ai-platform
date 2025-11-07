import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const RATE_LIMIT_REQUESTS = 60;
const RATE_LIMIT_WINDOW = 60; // seconds

// Simple in-memory rate limiter
const rateLimitMap = new Map();

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers
  const headers = response.headers;

  headers.set('X-DNS-Prefetch-Control', 'on');
  headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Basic rate limiting
  const ip = request.ip ?? 'anonymous';
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - RATE_LIMIT_WINDOW;

  const requestTimes = rateLimitMap.get(ip) ?? [];
  const recentRequests = requestTimes.filter((time: number) => time > windowStart);

  if (recentRequests.length >= RATE_LIMIT_REQUESTS) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': `${RATE_LIMIT_WINDOW}`,
      },
    });
  }

  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);

  // Bot protection
  const userAgent = request.headers.get('user-agent') ?? '';
  if (userAgent.toLowerCase().includes('bot') && !userAgent.includes('googlebot')) {
    return new NextResponse('Not allowed', { status: 403 });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};
