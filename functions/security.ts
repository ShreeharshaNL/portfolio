import type { Env } from './types';

// Allowed origins for CORS (Minecraft portfolio, Professional portfolio, Cloudflare Pages previews, local development)
export const ALLOWED_ORIGINS = [
  'https://shreeharsha.online',
  'https://minecraft.shreeharsha.online',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  'http://127.0.0.1:8788',
  'http://localhost:8788',
];

export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  // Support any Cloudflare Pages deployment preview (*.pages.dev)
  if (/^https:\/\/[a-zA-Z0-9-._]+\.pages\.dev$/.test(origin)) return true;
  return false;
}

/**
 * Generate safe, origin-restricted CORS headers
 */
export function getCorsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin');
  let matchedOrigin = 'https://shreeharsha.online';

  if (origin && isAllowedOrigin(origin)) {
    matchedOrigin = origin;
  }

  return {
    'Access-Control-Allow-Origin': matchedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Token',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
    'Content-Type': 'application/json',
  };
}

/**
 * Handle OPTIONS preflight requests safely
 */
export function handleOptions(request: Request): Response {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
}

/**
 * Constant-time byte comparison preventing timing attacks
 */
export function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) {
    return false;
  }
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

/**
 * Compute SHA-256 hash of a string returning 32-byte Uint8Array
 */
export async function sha256Buffer(data: string): Promise<Uint8Array> {
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
  return new Uint8Array(hashBuffer);
}

/**
 * Convert hex string to Uint8Array
 */
export function hexToBytes(hex: string): Uint8Array {
  const cleanHex = hex.trim().toLowerCase();
  if (cleanHex.length % 2 !== 0) return new Uint8Array(0);
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = parseInt(cleanHex.slice(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Normalize and expand raw secret into all likely candidate interpretations:
 * - Direct value
 * - Trimmed of leading/trailing whitespace
 * - Stripped of CRLF/tabs
 * - Stripped of accidental surrounding single or double quotes
 */
export function expandSecretCandidates(raw: unknown): string[] {
  if (typeof raw !== 'string') return [];
  const trimmed = raw.trim();
  if (!trimmed) return [];

  const strippedNewlines = trimmed.replace(/[\r\n\t]/g, '');
  const strippedQuotes = strippedNewlines.replace(/^["']|["']$/g, '').trim();

  return Array.from(new Set([raw, trimmed, strippedNewlines, strippedQuotes])).filter(
    (s) => s.length > 0
  );
}

export function expandHashCandidates(raw: unknown): string[] {
  if (typeof raw !== 'string') return [];
  const trimmed = raw.trim().toLowerCase();
  if (!trimmed) return [];

  const strippedQuotes = trimmed.replace(/^["']|["']$/g, '').trim();
  return Array.from(new Set([trimmed, strippedQuotes])).filter(
    (h) => h.length === 64 && /^[0-9a-f]{64}$/.test(h)
  );
}

/**
 * Verify administrative authorization header
 * Fails closed if no secret is configured or token does not match
 */
export async function verifyAdminAuth(
  request: Request,
  env: Env,
  site?: 'minecraft' | 'professional'
): Promise<{ authorized: boolean; reason?: string }> {
  // Extract token from Authorization: Bearer <token> or X-Admin-Token: <token>
  const authHeader = request.headers.get('Authorization') || request.headers.get('X-Admin-Token') || '';
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  const rawToken = match ? match[1] : authHeader;

  const candidateTokens = expandSecretCandidates(rawToken);
  if (candidateTokens.length === 0) {
    return { authorized: false, reason: 'Missing or empty authorization token' };
  }

  // Determine secret candidates based on requested site and environment availability
  let rawHashCandidates: unknown[] = [];
  let rawSecretCandidates: unknown[] = [];

  if (site === 'minecraft') {
    // If Minecraft credentials exist, strictly use them; otherwise fallback if only PRO is set
    const hasMcHash = typeof env.MC_ADMIN_PASSWORD_HASH === 'string' && env.MC_ADMIN_PASSWORD_HASH.trim().length > 0;
    const hasMcSecret = typeof env.MC_ADMIN_SECRET === 'string' && env.MC_ADMIN_SECRET.trim().length > 0;
    const hasAdminSecret = typeof env.ADMIN_SECRET === 'string' && env.ADMIN_SECRET.trim().length > 0;

    if (hasMcHash || hasMcSecret || hasAdminSecret) {
      rawHashCandidates = [env.MC_ADMIN_PASSWORD_HASH];
      rawSecretCandidates = [env.MC_ADMIN_SECRET, env.ADMIN_SECRET];
    } else {
      // Fallback if user only configured PRO_ADMIN_SECRET on this Cloudflare deployment
      rawHashCandidates = [env.PRO_ADMIN_PASSWORD_HASH];
      rawSecretCandidates = [env.PRO_ADMIN_SECRET];
    }
  } else if (site === 'professional') {
    // If Professional credentials exist, strictly use them; otherwise fallback if only MC is set
    const hasProHash = typeof env.PRO_ADMIN_PASSWORD_HASH === 'string' && env.PRO_ADMIN_PASSWORD_HASH.trim().length > 0;
    const hasProSecret = typeof env.PRO_ADMIN_SECRET === 'string' && env.PRO_ADMIN_SECRET.trim().length > 0;
    const hasAdminSecret = typeof env.ADMIN_SECRET === 'string' && env.ADMIN_SECRET.trim().length > 0;

    if (hasProHash || hasProSecret || hasAdminSecret) {
      rawHashCandidates = [env.PRO_ADMIN_PASSWORD_HASH];
      rawSecretCandidates = [env.PRO_ADMIN_SECRET, env.ADMIN_SECRET];
    } else {
      // Fallback if user only configured MC_ADMIN_SECRET on this Cloudflare deployment
      rawHashCandidates = [env.MC_ADMIN_PASSWORD_HASH];
      rawSecretCandidates = [env.MC_ADMIN_SECRET];
    }
  } else {
    // Neither specified: check any valid admin credentials
    rawHashCandidates = [env.PRO_ADMIN_PASSWORD_HASH, env.MC_ADMIN_PASSWORD_HASH];
    rawSecretCandidates = [env.PRO_ADMIN_SECRET, env.MC_ADMIN_SECRET, env.ADMIN_SECRET];
  }

  const validHashes = rawHashCandidates.flatMap(expandHashCandidates);
  const validSecrets = rawSecretCandidates.flatMap(expandSecretCandidates);

  if (validHashes.length === 0 && validSecrets.length === 0) {
    // FAIL CLOSED: No password configured in environment
    console.error(`[Security Warning] Admin authentication attempted but no secret is configured in environment.`);
    return { authorized: false, reason: 'Admin authentication is not configured on server' };
  }

  // Pre-calculate sha256 of candidate tokens presented by the user
  const tokenHashes = await Promise.all(candidateTokens.map((t) => sha256Buffer(t)));

  // 1. Verify against pre-computed password hashes
  for (const targetHashHex of validHashes) {
    const expectedHashBytes = hexToBytes(targetHashHex);
    if (expectedHashBytes.length === 32) {
      for (const tokenHash of tokenHashes) {
        if (timingSafeEqual(tokenHash, expectedHashBytes)) {
          return { authorized: true };
        }
      }
    }
  }

  // 2. Verify against plain secrets using constant-time comparison
  for (const secret of validSecrets) {
    const expectedHash = await sha256Buffer(secret);
    for (const tokenHash of tokenHashes) {
      if (timingSafeEqual(tokenHash, expectedHash)) {
        return { authorized: true };
      }
    }
  }

  return { authorized: false, reason: 'Invalid credentials' };
}

/**
 * In-memory sliding window rate limiter
 */
interface RateLimitBucket {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitBucket>();

// Clean up stale buckets periodically
let lastCleanup = Date.now();
function cleanupStaleBuckets() {
  const now = Date.now();
  if (now - lastCleanup > 60000) {
    lastCleanup = now;
    for (const [key, bucket] of rateLimitMap.entries()) {
      if (bucket.resetAt <= now) {
        rateLimitMap.delete(key);
      }
    }
  }
}

export function checkRateLimit(
  ip: string,
  action: string,
  maxRequests: number,
  windowSeconds: number
): { allowed: boolean; retryAfter?: number } {
  cleanupStaleBuckets();
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

/**
 * Validate maximum request body size
 */
export function checkPayloadSize(request: Request, maxBytes = 32 * 1024): boolean {
  const contentLength = request.headers.get('Content-Length');
  if (contentLength && parseInt(contentLength, 10) > maxBytes) {
    return false;
  }
  return true;
}

/**
 * Strict email validation preventing header injection and ReDoS
 */
export function isValidEmail(email: unknown): boolean {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length > 254 || trimmed.length < 5) return false;
  if (/[\r\n\t]/.test(trimmed)) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
}

/**
 * Sanitize text input: strip null bytes, trim, enforce length limits
 */
export function sanitizeText(val: unknown, minLength: number, maxLength: number): string | null {
  if (typeof val !== 'string') return null;
  const cleaned = val.replace(/\0/g, '').trim();
  if (cleaned.length < minLength || cleaned.length > maxLength) return null;
  return cleaned;
}
