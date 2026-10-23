import type { Env, MinerLeaderboardPayload } from '../types';
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

// GET: Fetch top miners
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const corsHeaders = getCorsHeaders(request);
  const db = env.DB || (env as any).portfolio_db;

  if (!db) {
    return new Response(
      JSON.stringify({
        leaderboard: [
          { id: '1', player_name: 'Shreeharsha (Dev)', diamonds_mined: 42, xp: 420, level: 42 },
          { id: '2', player_name: 'DiamondHunter', diamonds_mined: 24, xp: 240, level: 24 },
          { id: '3', player_name: 'NetherWalker', diamonds_mined: 16, xp: 160, level: 16 },
        ],
        source: 'local-fallback',
      }),
      { status: 200, headers: corsHeaders }
    );
  }

  try {
    const { results } = await db.prepare(
      `SELECT id, player_name, diamonds_mined, xp, level, last_active 
       FROM miner_stats 
       ORDER BY diamonds_mined DESC, xp DESC 
       LIMIT 10`
    ).all();

    return new Response(
      JSON.stringify({ leaderboard: results || [], source: 'd1-database' }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    console.error('Leaderboard GET error:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to retrieve miner leaderboard', leaderboard: [] }),
      { status: 500, headers: corsHeaders }
    );
  }
};

// POST: Sync/Record player mining stats
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const corsHeaders = getCorsHeaders(request);
  const clientIp = request.headers.get('cf-connecting-ip') || 'unknown';

  if (!checkPayloadSize(request, 4 * 1024)) {
    return new Response(JSON.stringify({ error: 'Payload size limit exceeded' }), {
      status: 413,
      headers: corsHeaders,
    });
  }

  // Rate limiting: max 30 leaderboard syncs per minute per IP
  const rateCheck = checkRateLimit(clientIp, 'leaderboard_sync', 30, 60);
  if (!rateCheck.allowed) {
    return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
      status: 429,
      headers: corsHeaders,
    });
  }

  try {
    const body = (await request.json()) as Partial<MinerLeaderboardPayload>;

    const player_name = sanitizeText(body.player_name, 2, 20);
    if (!player_name) {
      return new Response(
        JSON.stringify({ error: 'Miner name must be between 2 and 20 characters.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Clamp numeric values to prevent overflow
    const diamonds_mined = Math.min(1000000, Math.max(0, parseInt(String(body.diamonds_mined || 0), 10) || 0));
    const xp = Math.min(10000000, Math.max(0, parseInt(String(body.xp || 0), 10) || 0));
    const level = Math.min(10000, Math.max(1, parseInt(String(body.level || 1), 10) || 1));

    const id = crypto.randomUUID();
    const db = env.DB || (env as any).portfolio_db;

    if (db) {
      await db.prepare(
        `INSERT INTO miner_stats (id, player_name, diamonds_mined, xp, level, last_active)
         VALUES (?, ?, ?, ?, ?, datetime('now'))
         ON CONFLICT(player_name) DO UPDATE SET
           diamonds_mined = MAX(miner_stats.diamonds_mined, excluded.diamonds_mined),
           xp = MAX(miner_stats.xp, excluded.xp),
           level = MAX(miner_stats.level, excluded.level),
           last_active = datetime('now')`
      )
        .bind(id, player_name, diamonds_mined, xp, level)
        .run();
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Mining stats registered for ${player_name}!`,
        miner: { player_name, diamonds_mined, xp, level },
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    console.error('Leaderboard POST error:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to update leaderboard.' }),
      { status: 500, headers: corsHeaders }
    );
  }
};
