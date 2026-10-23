import assert from 'node:assert/strict';
import {
  isValidEmail,
  sanitizeText,
  checkPayloadSize,
  checkRateLimit,
  getCorsHeaders,
  sha256Buffer,
  hexToBytes,
  timingSafeEqual,
  verifyAdminAuth,
  ALLOWED_ORIGINS,
} from '../functions/security.ts';

async function runTests() {
  console.log('--- Starting Automated Security Hardening Tests ---');

  // Test 1: Email Validation & Header Injection Prevention
  console.log('Test 1: Email validation & header injection prevention...');
  assert.equal(isValidEmail('jane@example.com'), true);
  assert.equal(isValidEmail('developer.123+tag@sub.domain.co'), true);
  assert.equal(isValidEmail('attacker@evil.com\r\nBcc: victim@target.com'), false, 'Should reject CRLF header injection');
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail(''), false);
  assert.equal(isValidEmail(null), false);
  assert.equal(isValidEmail('a'.repeat(300) + '@example.com'), false, 'Should reject emails > 254 chars');
  console.log('✓ Email validation tests passed.');

  // Test 2: Text Sanitization & Null Byte Stripping
  console.log('Test 2: Text sanitization & null byte injection...');
  assert.equal(sanitizeText('  clean text  ', 2, 50), 'clean text');
  assert.equal(sanitizeText('text\0with\0nulls', 2, 50), 'textwithnulls');
  assert.equal(sanitizeText('a', 2, 50), null, 'Should reject text shorter than minLength');
  assert.equal(sanitizeText('a'.repeat(60), 2, 50), null, 'Should reject text exceeding maxLength');
  assert.equal(sanitizeText(null, 1, 10), null);
  console.log('✓ Text sanitization tests passed.');

  // Test 3: Payload Size Checks
  console.log('Test 3: Payload size limit verification...');
  const smallReq = new Request('https://example.com/api/test', {
    headers: { 'Content-Length': '1024' },
  });
  assert.equal(checkPayloadSize(smallReq, 16 * 1024), true);

  const oversizedReq = new Request('https://example.com/api/test', {
    headers: { 'Content-Length': '1048576' }, // 1 MB
  });
  assert.equal(checkPayloadSize(oversizedReq, 16 * 1024), false);
  console.log('✓ Payload size limit checks passed.');

  // Test 4: Rate Limiting
  console.log('Test 4: Sliding window rate limiting...');
  const testIp = `test-ip-${Date.now()}`;
  for (let i = 0; i < 3; i++) {
    const res = checkRateLimit(testIp, 'test_action', 3, 60);
    assert.equal(res.allowed, true);
  }
  const blocked = checkRateLimit(testIp, 'test_action', 3, 60);
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.retryAfter > 0);
  console.log('✓ Rate limiting tests passed.');

  // Test 5: CORS Origin Restriction
  console.log('Test 5: Origin-restricted CORS...');
  const allowedReq = new Request('https://example.com/api/test', {
    headers: { Origin: 'https://shreeharsha.online' },
  });
  const allowedHeaders = getCorsHeaders(allowedReq);
  assert.equal(allowedHeaders['Access-Control-Allow-Origin'], 'https://shreeharsha.online');

  const rogueReq = new Request('https://example.com/api/test', {
    headers: { Origin: 'https://malicious-phishing-site.com' },
  });
  const rogueHeaders = getCorsHeaders(rogueReq);
  assert.notEqual(rogueHeaders['Access-Control-Allow-Origin'], 'https://malicious-phishing-site.com');
  console.log('✓ CORS origin restriction tests passed.');

  // Test 6: Constant-Time Comparison
  console.log('Test 6: Constant-time byte equality...');
  const h1 = await sha256Buffer('secret-key-1');
  const h2 = await sha256Buffer('secret-key-1');
  const h3 = await sha256Buffer('secret-key-2');
  assert.equal(timingSafeEqual(h1, h2), true);
  assert.equal(timingSafeEqual(h1, h3), false);
  console.log('✓ Constant-time comparison tests passed.');

  // Test 7: Admin Authentication (Fail-Closed & Independent Site Credentials)
  console.log('Test 7: Admin authentication fail-closed and verification...');
  
  // 7a. Fail-closed when no secret is configured
  const emptyEnv = {};
  const noSecretReq = new Request('https://example.com/api/admin', {
    headers: { Authorization: 'Bearer some_password' },
  });
  const noSecretRes = await verifyAdminAuth(noSecretReq, emptyEnv, 'minecraft');
  assert.equal(noSecretRes.authorized, false, 'Must fail closed if env secrets are missing');

  // 7b. Reject when Authorization header is missing
  const envWithSecret = { MC_ADMIN_SECRET: 'test_mc_password_987' };
  const missingHeaderReq = new Request('https://example.com/api/admin');
  const missingHeaderRes = await verifyAdminAuth(missingHeaderReq, envWithSecret, 'minecraft');
  assert.equal(missingHeaderRes.authorized, false, 'Must reject requests without Authorization header');

  // 7c. Reject when password is wrong
  const wrongPassReq = new Request('https://example.com/api/admin', {
    headers: { Authorization: 'Bearer wrong_password' },
  });
  const wrongPassRes = await verifyAdminAuth(wrongPassReq, envWithSecret, 'minecraft');
  assert.equal(wrongPassRes.authorized, false, 'Must reject incorrect credentials');

  // 7d. Accept valid Bearer token for Minecraft site
  const correctPassReq = new Request('https://example.com/api/admin', {
    headers: { Authorization: 'Bearer test_mc_password_987' },
  });
  const correctPassRes = await verifyAdminAuth(correctPassReq, envWithSecret, 'minecraft');
  assert.equal(correctPassRes.authorized, true, 'Must authorize correct Minecraft credentials');

  // 7e. Independent credentials for Professional site
  const dualEnv = {
    MC_ADMIN_SECRET: 'mc_only_pass',
    PRO_ADMIN_SECRET: 'pro_only_pass',
  };
  const proWrongWithMcReq = new Request('https://example.com/api/admin', {
    headers: { Authorization: 'Bearer mc_only_pass' },
  });
  const proWrongRes = await verifyAdminAuth(proWrongWithMcReq, dualEnv, 'professional');
  assert.equal(proWrongRes.authorized, false, 'Minecraft password must not authenticate professional site');

  const proCorrectReq = new Request('https://example.com/api/admin', {
    headers: { Authorization: 'Bearer pro_only_pass' },
  });
  const proCorrectRes = await verifyAdminAuth(proCorrectReq, dualEnv, 'professional');
  assert.equal(proCorrectRes.authorized, true, 'Professional site must authenticate with its own credentials');

  // 7f. Pre-computed password hash verification
  const rawPw = 'ultra_secure_pass';
  const hashedBuf = await sha256Buffer(rawPw);
  const hashHex = Array.from(hashedBuf).map((b) => b.toString(16).padStart(2, '0')).join('');
  
  const hashEnv = { PRO_ADMIN_PASSWORD_HASH: hashHex };
  const hashReq = new Request('https://example.com/api/admin', {
    headers: { Authorization: `Bearer ${rawPw}` },
  });
  const hashRes = await verifyAdminAuth(hashReq, hashEnv, 'professional');
  assert.equal(hashRes.authorized, true, 'Must verify against pre-computed SHA-256 hash');

  // 7g. Robustness against quotes and newlines in environment variable
  const quotedEnv = { PRO_ADMIN_SECRET: '"my_quoted_secret"\r\n' };
  const unquotedReq = new Request('https://example.com/api/admin', {
    headers: { Authorization: 'Bearer my_quoted_secret' },
  });
  const quotedRes = await verifyAdminAuth(unquotedReq, quotedEnv, 'professional');
  assert.equal(quotedRes.authorized, true, 'Must accept clean password when env has accidental quotes or newlines');

  // 7h. Support for X-Admin-Token header
  const xTokenReq = new Request('https://example.com/api/admin', {
    headers: { 'X-Admin-Token': 'my_quoted_secret' },
  });
  const xTokenRes = await verifyAdminAuth(xTokenReq, quotedEnv, 'professional');
  assert.equal(xTokenRes.authorized, true, 'Must support X-Admin-Token header');

  // 7i. Graceful fallback when only MC_ADMIN_SECRET is set
  const mcOnlyEnv = { MC_ADMIN_SECRET: 'shared_backup_key' };
  const fallbackReq = new Request('https://example.com/api/admin', {
    headers: { Authorization: 'Bearer shared_backup_key' },
  });
  const fallbackRes = await verifyAdminAuth(fallbackReq, mcOnlyEnv, 'professional');
  assert.equal(fallbackRes.authorized, true, 'Must fall back gracefully when only one secret is configured');

  console.log('✓ Admin authentication fail-closed and independence tests passed.');

  console.log('--- ALL AUTOMATED SECURITY TESTS PASSED SUCCESSFULLY ---');
}

runTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
