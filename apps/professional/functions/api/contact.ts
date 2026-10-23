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

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const corsHeaders = getCorsHeaders(request);
  const clientIp = request.headers.get('cf-connecting-ip') || 'unknown';

  if (!checkPayloadSize(request, 16 * 1024)) {
    return new Response(
      JSON.stringify({ error: 'Payload exceeds size limit.' }),
      { status: 413, headers: corsHeaders }
    );
  }

  const rateCheck = checkRateLimit(clientIp, 'pro_contact_submit', 5, 600);
  if (!rateCheck.allowed) {
    return new Response(
      JSON.stringify({ error: `Too many submissions. Please wait ${rateCheck.retryAfter}s.` }),
      { status: 429, headers: { ...corsHeaders, 'Retry-After': String(rateCheck.retryAfter) } }
    );
  }

  try {
    const body = (await request.json()) as Partial<ContactMessagePayload>;

    // Honeypot check
    if (body._gotcha && body._gotcha.trim().length > 0) {
      return new Response(
        JSON.stringify({ success: true, message: 'Inquiry received.' }),
        { status: 200, headers: corsHeaders }
      );
    }

    const name = sanitizeText(body.name, 2, 80);
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const rawSubject = sanitizeText(body.subject, 0, 150);
    const subject = rawSubject || 'Professional Portfolio Inquiry';
    const message = sanitizeText(body.message, 5, 3000);

    if (!name) {
      return new Response(
        JSON.stringify({ error: 'Please enter your name (2 to 80 characters).' }),
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

    // Hash client IP
    const encoder = new TextEncoder();
    const ipData = encoder.encode(clientIp);
    const hashBuffer = await crypto.subtle.digest('SHA-256', ipData);
    const ipHash = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .slice(0, 16);

    const db = env.DB || (env as any).portfolio_db;
    if (db) {
      await db.prepare(
        `INSERT INTO contact_messages (id, name, email, subject, message, ip_hash, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, 'unread', datetime('now'))`
      )
        .bind(id, name, email, `[Professional] ${subject}`, message, ipHash)
        .run();
    }

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
            from: 'Professional Portfolio <onboarding@resend.dev>',
            to: [targetEmail],
            reply_to: email,
            subject: `[Portfolio Inquiry] ${subject} (from ${name})`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background: #ffffff; color: #0f172a;">
                <h2 style="color: #4f46e5; margin-top: 0; font-size: 20px;">New Inquiry Received</h2>
                <p style="margin: 4px 0;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p style="margin: 4px 0;"><strong>Subject:</strong> ${subject}</p>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
                <p style="white-space: pre-wrap; color: #334155; line-height: 1.6;">${message}</p>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
                <small style="color: #94a3b8;">Recorded ID: ${id} · Source: shreeharsha.online</small>
              </div>
            `,
          }),
        });
      } catch (emailErr) {
        console.error('Email dispatch notification error:', emailErr);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Your inquiry has been received. Thank you for reaching out!',
        id,
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    console.error('Contact handler error:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to process inquiry. Please try again later.' }),
      { status: 500, headers: corsHeaders }
    );
  }
};

// GET: Retrieve recent messages — STRICT FAIL-CLOSED AUTHENTICATION
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const corsHeaders = getCorsHeaders(request);

  const auth = await verifyAdminAuth(request, env);
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
