import type { Env, ContactMessagePayload } from '../types';
import {
  getCorsHeaders,
  handleOptions,
  verifyAdminAuth,
  checkRateLimit,
  checkPayloadSize,
  isValidEmail,
  sanitizeText,
} from '../security';

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return handleOptions(context.request);
};

// POST: Save contact submission and optionally dispatch email
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const corsHeaders = getCorsHeaders(request);
  const clientIp = request.headers.get('cf-connecting-ip') || 'unknown';

  // 1. Payload size check (Max 16 KB)
  if (!checkPayloadSize(request, 16 * 1024)) {
    return new Response(
      JSON.stringify({ error: 'Payload exceeds size limit.' }),
      { status: 413, headers: corsHeaders }
    );
  }

  // 2. Rate limiting: max 5 submissions per 10 minutes per IP
  const rateCheck = checkRateLimit(clientIp, 'contact_submit', 5, 600);
  if (!rateCheck.allowed) {
    return new Response(
      JSON.stringify({ error: `Too many submissions. Please wait ${rateCheck.retryAfter}s before sending another inquiry.` }),
      { status: 429, headers: { ...corsHeaders, 'Retry-After': String(rateCheck.retryAfter) } }
    );
  }

  try {
    const body = (await request.json()) as Partial<ContactMessagePayload>;

    // 3. Honeypot check: If bot fills hidden _gotcha field, silently accept without storing
    if (body._gotcha && body._gotcha.trim().length > 0) {
      return new Response(
        JSON.stringify({ success: true, message: 'Inquiry received.' }),
        { status: 200, headers: corsHeaders }
      );
    }

    // 4. Strict input sanitization and length validation
    const name = sanitizeText(body.name, 2, 80);
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const rawSubject = sanitizeText(body.subject, 0, 150);
    const subject = rawSubject || 'Software Opportunity / Project Inquiry';
    const message = sanitizeText(body.message, 5, 3000);

    if (!name) {
      return new Response(
        JSON.stringify({ error: 'Please enter a valid name (2 to 80 characters).' }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: 'Please provide a valid email address.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message must be between 5 and 3000 characters.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const id = crypto.randomUUID();

    // Hash client IP for privacy preservation
    const encoder = new TextEncoder();
    const ipData = encoder.encode(clientIp);
    const hashBuffer = await crypto.subtle.digest('SHA-256', ipData);
    const ipHash = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .slice(0, 16);

    // Save to Cloudflare D1 via parameterized statement
    const db = env.DB || (env as any).portfolio_db;
    if (db) {
      await db.prepare(
        `INSERT INTO contact_messages (id, name, email, subject, message, ip_hash, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, 'unread', datetime('now'))`
      )
        .bind(id, name, email, subject, message, ipHash)
        .run();
    }

    // Optional email dispatch via Resend
    if (env.RESEND_API_KEY) {
      try {
        const targetEmail = env.NOTIFICATION_EMAIL || 'shreeharsha2027@gmail.com';
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: [targetEmail],
            reply_to: email,
            subject: `[Portfolio] ${subject} (from ${name})`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 2px solid #000; background: #181b24; color: #fff;">
                <h2 style="color: #4dedf4; margin-top: 0;">✦ New Transmission Received</h2>
                <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <hr style="border: 1px solid #333; margin: 16px 0;" />
                <p style="white-space: pre-wrap; color: #e4e4e7;">${message}</p>
                <hr style="border: 1px solid #333; margin: 16px 0;" />
                <small style="color: #71717a;">Recorded ID: ${id}</small>
              </div>
            `,
          }),
        });
      } catch (emailErr) {
        console.error('Failed to dispatch notification email:', emailErr);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Transmission successfully delivered and logged to database ledger!',
        id,
      }),
      { status: 201, headers: corsHeaders }
    );
  } catch (err: any) {
    console.error('Contact API Error:', err);
    return new Response(
      JSON.stringify({ error: 'Server error processing your transmission. Please try again or email directly.' }),
      { status: 500, headers: corsHeaders }
    );
  }
};

// GET: Retrieve recent messages — STRICT FAIL-CLOSED AUTHENTICATION
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const corsHeaders = getCorsHeaders(request);

  // Authenticate caller (never fail open!)
  const auth = await verifyAdminAuth(request, env, 'minecraft');
  if (!auth.authorized) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized: Valid Admin Authorization required' }),
      { status: 401, headers: corsHeaders }
    );
  }

  const db = env.DB || (env as any).portfolio_db;
  if (!db) {
    return new Response(
      JSON.stringify({ messages: [], source: 'local-mock' }),
      { status: 200, headers: corsHeaders }
    );
  }

  try {
    const { results } = await db.prepare(
      `SELECT id, name, email, subject, message, status, created_at 
       FROM contact_messages 
       ORDER BY created_at DESC 
       LIMIT 50`
    ).all();

    return new Response(
      JSON.stringify({ messages: results || [], source: 'd1-database' }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    console.error('Contact GET error:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to retrieve messages' }),
      { status: 500, headers: corsHeaders }
    );
  }
};
