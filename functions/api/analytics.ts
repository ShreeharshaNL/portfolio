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

// POST: Record telemetry event
export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const body = (await request.json()) as { event_type?: string; event_value?: string };

    const event_type = (body.event_type || '').trim();
    const event_value = (body.event_value || '').trim();

    if (!event_type) {
      return new Response(JSON.stringify({ error: 'event_type is required' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const id = crypto.randomUUID();
    const db = env.DB || (env as any).portfolio_db;

    if (db) {
      await db.prepare(
        `INSERT INTO analytics_events (id, event_type, event_value, created_at)
         VALUES (?, ?, ?, datetime('now'))`
      )
        .bind(id, event_type, event_value)
        .run();
    }

    return new Response(JSON.stringify({ success: true, id }), {
      status: 201,
      headers: corsHeaders,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Failed to record event' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
};

// GET: Summary of metrics
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;
  const db = env.DB || (env as any).portfolio_db;

  if (!db) {
    return new Response(
      JSON.stringify({
        totalViews: 42,
        biomeSwitches: 14,
        projectClicks: 18,
        events: [],
      }),
      { status: 200, headers: corsHeaders }
    );
  }

  try {
    const totalViews = await db.prepare(
      `SELECT COUNT(*) as count FROM analytics_events WHERE event_type = 'page_view'`
    ).first<{ count: number }>();

    const biomeSwitches = await db.prepare(
      `SELECT COUNT(*) as count FROM analytics_events WHERE event_type = 'biome_switch'`
    ).first<{ count: number }>();

    const projectClicks = await db.prepare(
      `SELECT COUNT(*) as count FROM analytics_events WHERE event_type = 'project_click'`
    ).first<{ count: number }>();

    const recentEvents = await db.prepare(
      `SELECT event_type, event_value, created_at FROM analytics_events ORDER BY created_at DESC LIMIT 20`
    ).all();

    return new Response(
      JSON.stringify({
        totalViews: totalViews?.count || 0,
        biomeSwitches: biomeSwitches?.count || 0,
        projectClicks: projectClicks?.count || 0,
        recentEvents: recentEvents.results || [],
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Failed to retrieve analytics' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
};
