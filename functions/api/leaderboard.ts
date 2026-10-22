import type { Env, MinerLeaderboardPayload } from '../types';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { headers: corsHeaders });
};

// GET: Fetch top miners
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;
  const db = env.DB || (env as any).portfolio_db;

  if (!db) {
    return new Response(
      JSON.stringify({
        leaderboard: [
          { id: '1', player_name: 'Shreeharsha (Dev)', diamonds_mined: 42, xp: 420, level: 42 },
          { id: '2', player_name: 'DiamondHunter', diamonds_mined: 24, xp: 240, level: 24 },
          { id: '3', player_name: 'NetherWalker', diamonds_mined: 16, xp: 160, level: 16 },
          { id: '4', player_name: 'PixelCrafter', diamonds_mined: 9, xp: 90, level: 9 },
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
  try {
    const { request, env } = context;
    const body = (await request.json()) as Partial<MinerLeaderboardPayload>;

    const player_name = (body.player_name || '').trim();
    const diamonds_mined = Math.max(0, parseInt(String(body.diamonds_mined || 0), 10));
    const xp = Math.max(0, parseInt(String(body.xp || 0), 10));
    const level = Math.max(1, parseInt(String(body.level || 1), 10));

    if (!player_name || player_name.length < 2) {
      return new Response(
        JSON.stringify({ error: 'Please enter a valid miner name (at least 2 characters).' }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (player_name.length > 20) {
      return new Response(
        JSON.stringify({ error: 'Miner name must be within 20 characters.' }),
        { status: 400, headers: corsHeaders }
      );
    }

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
