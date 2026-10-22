import type { Env, ContactMessagePayload } from '../types';

// Helper for CORS and JSON headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { headers: corsHeaders });
};

// POST: Save contact submission and optionally dispatch email
export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const body = (await request.json()) as Partial<ContactMessagePayload>;

    const name = (body.name || '').trim();
    const email = (body.email || '').trim();
    const subject = (body.subject || '').trim() || 'Software Opportunity / Project Inquiry';
    const message = (body.message || '').trim();

    // Validation
    if (!name || name.length < 2) {
      return new Response(
        JSON.stringify({ error: 'Please enter your name (at least 2 characters).' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Please provide a valid email address.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!message || message.length < 5) {
      return new Response(
        JSON.stringify({ error: 'Message content must be at least 5 characters long.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const id = crypto.randomUUID();
    const clientIp = request.headers.get('cf-connecting-ip') || 'unknown';
    
    // Hash IP for basic rate limiting/privacy
    const encoder = new TextEncoder();
    const ipData = encoder.encode(clientIp);
    const hashBuffer = await crypto.subtle.digest('SHA-256', ipData);
    const ipHash = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .slice(0, 16);

    // Save to Cloudflare D1 if binding exists
    const db = env.DB || (env as any).portfolio_db;
    if (db) {
      await db.prepare(
        `INSERT INTO contact_messages (id, name, email, subject, message, ip_hash, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, 'unread', datetime('now'))`
      )
        .bind(id, name, email, subject, message, ipHash)
        .run();
    }

    // Optional email dispatch via Resend if RESEND_API_KEY is configured
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
                <small style="color: #71717a;">Recorded with ID: ${id} · IP Hash: ${ipHash}</small>
              </div>
            `,
          }),
        });
      } catch (emailErr) {
        // Log but don't fail the submission if email forwarder hits an issue
        console.error('Failed to forward email notification via Resend:', emailErr);
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
      JSON.stringify({ error: 'Server error processing your transmission. Please try again or use the direct mail button.' }),
      { status: 500, headers: corsHeaders }
    );
  }
};

// GET: Retrieve recent messages (secured via admin secret if configured)
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret') || request.headers.get('Authorization')?.replace('Bearer ', '');

  if (env.ADMIN_SECRET && secret !== env.ADMIN_SECRET) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
  }

  const db = env.DB || (env as any).portfolio_db;
  if (!db) {
    return new Response(
      JSON.stringify({
        messages: [
          {
            id: 'mock-1',
            name: 'Demo Visitor',
            email: 'visitor@example.com',
            subject: 'Recruitment Inquiry',
            message: 'Hello Shreeharsha! Love the portfolio.',
            created_at: new Date().toISOString(),
          },
        ],
        source: 'local-mock',
      }),
      { status: 200, headers: corsHeaders }
    );
  }

  const { results } = await db.prepare(
    `SELECT id, name, email, subject, message, status, created_at 
     FROM contact_messages 
     ORDER BY created_at DESC 
     LIMIT 50`
  ).all();

  return new Response(JSON.stringify({ messages: results || [], source: 'd1-database' }), {
    status: 200,
    headers: corsHeaders,
  });
};
