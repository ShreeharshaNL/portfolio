import type { Env } from '../types';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { headers: corsHeaders });
};

const verifyAdmin = (request: Request, env: Env) => {
  const defaultSecret = 'shnl2005';
  const adminSecret = env.ADMIN_SECRET || defaultSecret;
  const headerSecret = request.headers.get('Authorization')?.replace('Bearer ', '') || '';
  const url = new URL(request.url);
  const paramSecret = url.searchParams.get('secret') || '';

  return headerSecret === adminSecret || paramSecret === adminSecret;
};

// GET: Load admin dashboard data (Messages, Guestbook moderation, Analytics with Theme Popularity)
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!verifyAdmin(request, env)) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Invalid Admin Password' }), {
      status: 401,
      headers: corsHeaders,
    });
  }

  const db = env.DB || (env as any).portfolio_db;

  if (!db) {
    return new Response(
      JSON.stringify({
        messages: [],
        guestbook: [],
        analytics: {
          totalViews: 0,
          biomeSwitches: 0,
          projectClicks: 0,
          themeStats: [
            { theme: 'overworld-night', count: 12 },
            { theme: 'cherry-grove', count: 8 },
            { theme: 'overworld-day', count: 6 },
            { theme: 'nether', count: 4 },
            { theme: 'the-end', count: 3 },
            { theme: 'snowy-tundra', count: 2 },
          ],
          projectStats: [],
        },
        source: 'local-fallback',
      }),
      { status: 200, headers: corsHeaders }
    );
  }

  try {
    const messages = await db.prepare(
      `SELECT id, name, email, subject, message, status, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 50`
    ).all();

    const guestbook = await db.prepare(
      `SELECT id, author_name, character_skin, message, is_approved, created_at FROM guestbook_entries ORDER BY created_at DESC LIMIT 50`
    ).all();

    const totalViews = await db.prepare(
      `SELECT COUNT(*) as count FROM analytics_events WHERE event_type = 'page_view'`
    ).first<{ count: number }>();

    const biomeSwitches = await db.prepare(
      `SELECT COUNT(*) as count FROM analytics_events WHERE event_type IN ('biome_switch', 'theme_selection')`
    ).first<{ count: number }>();

    const projectClicks = await db.prepare(
      `SELECT COUNT(*) as count FROM analytics_events WHERE event_type = 'project_click'`
    ).first<{ count: number }>();

    // Detailed Theme / Biome Popularity Ranking
    const themeRanking = await db.prepare(
      `SELECT event_value as theme, COUNT(*) as count 
       FROM analytics_events 
       WHERE event_type IN ('theme_selection', 'biome_switch') AND event_value != ''
       GROUP BY event_value 
       ORDER BY count DESC`
    ).all<{ theme: string; count: number }>();

    // Top Clicked Projects
    const projectRanking = await db.prepare(
      `SELECT event_value as project, COUNT(*) as count 
       FROM analytics_events 
       WHERE event_type = 'project_click' AND event_value != ''
       GROUP BY event_value 
       ORDER BY count DESC`
    ).all<{ project: string; count: number }>();

    return new Response(
      JSON.stringify({
        messages: messages.results || [],
        guestbook: guestbook.results || [],
        analytics: {
          totalViews: totalViews?.count || 0,
          biomeSwitches: biomeSwitches?.count || 0,
          projectClicks: projectClicks?.count || 0,
          themeStats: themeRanking.results || [],
          projectStats: projectRanking.results || [],
        },
        source: 'd1-database',
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Failed to retrieve admin data' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
};

// POST: Execute admin moderation actions
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!verifyAdmin(request, env)) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Invalid Admin PIN' }), {
      status: 401,
      headers: corsHeaders,
    });
  }

  const db = env.DB || (env as any).portfolio_db;
  if (!db) {
    return new Response(JSON.stringify({ success: true, message: 'Simulated admin action in local mode' }), {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const body = (await request.json()) as { action?: string; id?: string };
    const { action, id } = body;

    if (action === 'delete_message' && id) {
      await db.prepare(`DELETE FROM contact_messages WHERE id = ?`).bind(id).run();
      return new Response(JSON.stringify({ success: true, message: 'Message deleted' }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    if (action === 'delete_guestbook' && id) {
      await db.prepare(`DELETE FROM guestbook_entries WHERE id = ?`).bind(id).run();
      return new Response(JSON.stringify({ success: true, message: 'Guestbook entry deleted' }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    if (action === 'toggle_guestbook' && id) {
      await db.prepare(`UPDATE guestbook_entries SET is_approved = 1 - is_approved WHERE id = ?`).bind(id).run();
      return new Response(JSON.stringify({ success: true, message: 'Guestbook approval toggled' }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify({ error: 'Unknown admin action' }), {
      status: 400,
      headers: corsHeaders,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Admin action failed' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
};
