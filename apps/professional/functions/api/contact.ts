import type { Env, ContactMessagePayload } from '../types';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { headers: corsHeaders });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const body = (await request.json()) as Partial<ContactMessagePayload>;

    const name = (body.name || '').trim();
    const email = (body.email || '').trim();
    const subject = (body.subject || '').trim() || 'Professional Portfolio Inquiry';
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
        JSON.stringify({ error: 'Message must be at least 5 characters long.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const id = crypto.randomUUID();
    const clientIp = request.headers.get('cf-connecting-ip') || 'unknown';

    // Hash client IP for privacy/rate tracking
    const encoder = new TextEncoder();
    const ipData = encoder.encode(clientIp);
    const hashBuffer = await crypto.subtle.digest('SHA-256', ipData);
    const ipHash = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .slice(0, 16);

    // Save to Cloudflare D1
    const db = env.DB || (env as any).portfolio_db;
    if (db) {
      await db.prepare(
        `INSERT INTO contact_messages (id, name, email, subject, message, ip_hash, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, 'unread', datetime('now'))`
      )
        .bind(id, name, email, `[Professional] ${subject}`, message, ipHash)
        .run();
    }

    // Optional dispatch via Resend
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
        console.error('Email notification dispatch error:', emailErr);
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
      JSON.stringify({ error: 'Failed to process inquiry. Please try again later or email directly.' }),
      { status: 500, headers: corsHeaders }
    );
  }
};
