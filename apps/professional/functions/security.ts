import type { Env } from './types';

export const ALLOWED_ORIGINS = [
  'https://shreeharsha.online',
  'https://minecraft.shreeharsha.online',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  'http://127.0.0.1:8788',
  'http://localhost:8788',
];

export function getCorsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin');
  let matchedOrigin = 'https://shreeharsha.online';

  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    matchedOrigin = origin;
  }

  return {
    'Access-Control-Allow-Origin': matchedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
    'Content-Type': 'application/json',
  };
}

export function handleOptions(request: Request): Response {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
}

export function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  const gCrypto = globalThis.crypto as any;
  if (typeof gCrypto?.timingSafeEqual === 'function') {
    return gCrypto.timingSafeEqual(a, b);
  }
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}

export async function sha256Buffer(data: string): Promise<Uint8Array> {
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
  return new Uint8Array(hashBuffer);
}

export function hexToBytes(hex: string): Uint8Array {
  const cleanHex = hex.trim().toLowerCase();
  if (cleanHex.length % 2 !== 0) return new Uint8Array(0);
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = parseInt(cleanHex.slice(i, i + 2), 16);
  }
  return bytes;
}

export async function verifyAdminAuth(
  request: Request,
  env: Env
): Promise<{ authorized: boolean; reason?: string }> {
  const authHeader = request.headers.get('Authorization') || '';
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match || !match[1]) {
    return { authorized: false, reason: 'Missing Authorization header' };
  }

  const presentedToken = match[1].trim();
  if (!presentedToken) {
    return { authorized: false, reason: 'Empty token' };
  }

  const presentedHash = await sha256Buffer(presentedToken);

  // Check pre-computed PRO_ADMIN_PASSWORD_HASH
  if (env.PRO_ADMIN_PASSWORD_HASH && env.PRO_ADMIN_PASSWORD_HASH.trim()) {
    const expectedHashBytes = hexToBytes(env.PRO_ADMIN_PASSWORD_HASH);
    if (expectedHashBytes.length === 32 && timingSafeEqual(presentedHash, expectedHashBytes)) {
      return { authorized: true };
    }
  }

  // Check PRO_ADMIN_SECRET or fallback ADMIN_SECRET
  const targetSecret = env.PRO_ADMIN_SECRET || env.ADMIN_SECRET;
  if (!targetSecret || !targetSecret.trim()) {
    console.error('[Security Warning] Professional admin authentication attempted without configured secret.');
    return { authorized: false, reason: 'Admin authentication is not configured on server' };
  }

  const expectedHash = await sha256Buffer(targetSecret.trim());
  if (timingSafeEqual(presentedHash, expectedHash)) {
    return { authorized: true };
  }

  return { authorized: false, reason: 'Invalid credentials' };
}

interface RateLimitBucket {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitBucket>();

export function checkRateLimit(
  ip: string,
  action: string,
  maxRequests: number,
  windowSeconds: number
): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const key = `${action}:${ip || 'unknown'}`;
  const bucket = rateLimitMap.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return { allowed: true };
  }

  if (bucket.count >= maxRequests) {
    const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  bucket.count += 1;
  return { allowed: true };
}

export function checkPayloadSize(request: Request, maxBytes = 32 * 1024): boolean {
  const contentLength = request.headers.get('Content-Length');
  if (contentLength && parseInt(contentLength, 10) > maxBytes) {
    return false;
  }
  return true;
}

export function isValidEmail(email: unknown): boolean {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length > 254 || trimmed.length < 5) return false;
  if (/[\r\n\t]/.test(trimmed)) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
}

export function sanitizeText(val: unknown, minLength: number, maxLength: number): string | null {
  if (typeof val !== 'string') return null;
  const cleaned = val.replace(/\0/g, '').trim();
  if (cleaned.length < minLength || cleaned.length > maxLength) return null;
  return cleaned;
}
