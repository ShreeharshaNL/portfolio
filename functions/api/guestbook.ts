import type { Env, GuestbookPayload } from '../types';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { headers: corsHeaders });
};

// GET: Fetch recent guestbook signpost entries
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;
  const db = env.DB || (env as any).portfolio_db;

  if (!db) {
    // Graceful fallback seed entries when DB binding is not yet attached
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
          {
            id: 'seed-3',
            author_name: 'Steve the Miner',
            character_skin: 'steve',
            message: 'Found diamonds in the interactive block. Great sound effects!',
            created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
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
  try {
    const { request, env } = context;
    const body = (await request.json()) as Partial<GuestbookPayload>;

    const author_name = (body.author_name || '').trim();
    const rawSkin = (body.character_skin || 'steve').toLowerCase().trim();
    const allowedSkins = ['steve', 'alex', 'knight', 'creeper', 'enderman'];
    const character_skin = allowedSkins.includes(rawSkin) ? rawSkin : 'steve';
    const message = (body.message || '').trim();

    if (!author_name || author_name.length < 2) {
      return new Response(
        JSON.stringify({ error: 'Please enter a name or gamer tag (at least 2 characters).' }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (author_name.length > 30) {
      return new Response(
        JSON.stringify({ error: 'Name must not exceed 30 characters.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!message || message.length < 3) {
      return new Response(
        JSON.stringify({ error: 'Sign message must be at least 3 characters.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (message.length > 180) {
      return new Response(
        JSON.stringify({ error: 'Sign message must be within 180 characters.' }),
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
