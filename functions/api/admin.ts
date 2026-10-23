import type { Env } from '../types';
import { getCorsHeaders, handleOptions, verifyAdminAuth, checkRateLimit } from '../security';

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return handleOptions(context.request);
};

// GET: Load admin dashboard data (Messages, Guestbook moderation, Analytics)
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const corsHeaders = getCorsHeaders(request);
  const clientIp = request.headers.get('cf-connecting-ip') || 'unknown';

  // Rate limit admin attempts: max 20 per minute per IP
  const rateCheck = checkRateLimit(clientIp, 'admin_get', 20, 60);
  if (!rateCheck.allowed) {
    return new Response(
      JSON.stringify({ error: `Too many requests. Please wait ${rateCheck.retryAfter}s.` }),
      { status: 429, headers: { ...corsHeaders, 'Retry-After': String(rateCheck.retryAfter) } }
    );
  }

  const auth = await verifyAdminAuth(request, env, 'minecraft');
  if (!auth.authorized) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized: Invalid Admin Credentials' }),
      { status: 401, headers: corsHeaders }
    );
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
          themeStats: [],
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

    const themeRanking = await db.prepare(
      `SELECT event_value as theme, COUNT(*) as count 
       FROM analytics_events 
       WHERE event_type IN ('theme_selection', 'biome_switch') AND event_value != ''
       GROUP BY event_value 
       ORDER BY count DESC`
    ).all<{ theme: string; count: number }>();

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
    console.error('Admin GET error:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to retrieve administrative data' }),
      { status: 500, headers: corsHeaders }
    );
  }
};

// POST: Execute admin moderation actions
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const corsHeaders = getCorsHeaders(request);
  const clientIp = request.headers.get('cf-connecting-ip') || 'unknown';

  const rateCheck = checkRateLimit(clientIp, 'admin_post', 30, 60);
  if (!rateCheck.allowed) {
    return new Response(
      JSON.stringify({ error: `Too many requests. Please wait ${rateCheck.retryAfter}s.` }),
      { status: 429, headers: { ...corsHeaders, 'Retry-After': String(rateCheck.retryAfter) } }
    );
  }

  const auth = await verifyAdminAuth(request, env, 'minecraft');
  if (!auth.authorized) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized: Invalid Admin Credentials' }),
      { status: 401, headers: corsHeaders }
    );
  }

  const db = env.DB || (env as any).portfolio_db;
  if (!db) {
    return new Response(
      JSON.stringify({ success: true, message: 'Action registered (local fallback mode)' }),
      { status: 200, headers: corsHeaders }
    );
  }

  try {
    const body = (await request.json()) as { action?: string; id?: string };
    const { action, id } = body;

    // Strict validation of action and id format
    if (!action || !id || typeof id !== 'string' || id.length > 64) {
      return new Response(
        JSON.stringify({ error: 'Invalid moderation payload' }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (action === 'delete_message') {
      await db.prepare(`DELETE FROM contact_messages WHERE id = ?`).bind(id).run();
      return new Response(JSON.stringify({ success: true, message: 'Message deleted' }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    if (action === 'delete_guestbook') {
      await db.prepare(`DELETE FROM guestbook_entries WHERE id = ?`).bind(id).run();
      return new Response(JSON.stringify({ success: true, message: 'Guestbook entry deleted' }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    if (action === 'toggle_guestbook') {
      await db.prepare(`UPDATE guestbook_entries SET is_approved = 1 - is_approved WHERE id = ?`).bind(id).run();
      return new Response(JSON.stringify({ success: true, message: 'Guestbook approval toggled' }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    return new Response(
      JSON.stringify({ error: 'Unknown moderation action' }),
      { status: 400, headers: corsHeaders }
    );
  } catch (err: any) {
    console.error('Admin POST error:', err);
    return new Response(
      JSON.stringify({ error: 'Admin action failed' }),
      { status: 500, headers: corsHeaders }
    );
  }
};
