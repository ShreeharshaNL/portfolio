import type { Env, GuestbookPayload } from '../types';
import {
  getCorsHeaders,
  handleOptions,
  checkRateLimit,
  checkPayloadSize,
  sanitizeText,
} from '../security';

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return handleOptions(context.request);
};

// GET: Fetch recent approved guestbook signpost entries
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const corsHeaders = getCorsHeaders(request);
  const db = env.DB || (env as any).portfolio_db;

  if (!db) {
    return new Response(
      JSON.stringify({
        entries: [
          {
            id: 'seed-1',
            author_name: 'Shreeharsha (Developer)',
            character_skin: 'creeper',
            message: 'Welcome to my Minecraft-themed portfolio! Leave a sign or connect anytime.',
            created_at: new Date().toISOString(),
          },
          {
            id: 'seed-2',
            author_name: 'Alex the Explorer',
            character_skin: 'alex',
            message: 'The pixel HUD and biome switcher are incredible. Super clean layout!',
            created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
          },
        ],
        source: 'local-fallback',
      }),
      { status: 200, headers: corsHeaders }
    );
  }

  try {
    const { results } = await db.prepare(
      `SELECT id, author_name, character_skin, message, created_at 
       FROM guestbook_entries 
       WHERE is_approved = 1 
       ORDER BY created_at DESC 
       LIMIT 30`
    ).all();

    return new Response(
      JSON.stringify({ entries: results || [], source: 'd1-database' }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    console.error('Guestbook GET error:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to retrieve guestbook entries', entries: [] }),
      { status: 500, headers: corsHeaders }
    );
  }
};

// POST: Sign the guestbook
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const corsHeaders = getCorsHeaders(request);
  const clientIp = request.headers.get('cf-connecting-ip') || 'unknown';

  if (!checkPayloadSize(request, 8 * 1024)) {
    return new Response(
      JSON.stringify({ error: 'Payload size limit exceeded' }),
      { status: 413, headers: corsHeaders }
    );
  }

  // Rate limiting: max 5 signs per 10 minutes per IP
  const rateCheck = checkRateLimit(clientIp, 'guestbook_post', 5, 600);
  if (!rateCheck.allowed) {
    return new Response(
      JSON.stringify({ error: `You are posting signs too quickly. Please wait ${rateCheck.retryAfter}s.` }),
      { status: 429, headers: { ...corsHeaders, 'Retry-After': String(rateCheck.retryAfter) } }
    );
  }

  try {
    const body = (await request.json()) as Partial<GuestbookPayload>;

    // Honeypot check
    if (body._gotcha && body._gotcha.trim().length > 0) {
      return new Response(
        JSON.stringify({ success: true, message: 'Signpost placed.' }),
        { status: 200, headers: corsHeaders }
      );
    }

    const author_name = sanitizeText(body.author_name, 2, 30);
    const message = sanitizeText(body.message, 3, 180);

    const rawSkin = typeof body.character_skin === 'string' ? body.character_skin.toLowerCase().trim() : 'steve';
    const allowedSkins = ['steve', 'alex', 'knight', 'creeper', 'enderman'];
    const character_skin = allowedSkins.includes(rawSkin) ? rawSkin : 'steve';

    if (!author_name) {
      return new Response(
        JSON.stringify({ error: 'Author name must be between 2 and 30 characters.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Sign message must be between 3 and 180 characters.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const id = crypto.randomUUID();
    const newEntry = {
      id,
      author_name,
      character_skin,
      message,
      created_at: new Date().toISOString(),
    };

    const db = env.DB || (env as any).portfolio_db;
    if (db) {
      await db.prepare(
        `INSERT INTO guestbook_entries (id, author_name, character_skin, message, is_approved, created_at)
         VALUES (?, ?, ?, ?, 1, datetime('now'))`
      )
        .bind(id, author_name, character_skin, message)
        .run();
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Signpost placed successfully! Your note is now visible.',
        entry: newEntry,
      }),
      { status: 201, headers: corsHeaders }
    );
  } catch (err: any) {
    console.error('Guestbook POST error:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to record your signpost note. Please try again.' }),
      { status: 500, headers: corsHeaders }
    );
  }
};
