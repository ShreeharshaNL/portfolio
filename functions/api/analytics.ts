import type { Env } from '../types';
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

const ALLOWED_EVENT_TYPES = [
  'page_view',
  'biome_switch',
  'theme_selection',
  'project_click',
  'mining_event',
  'hotbar_click',
  'contact_interaction',
];

// POST: Record telemetry event
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const corsHeaders = getCorsHeaders(request);
  const clientIp = request.headers.get('cf-connecting-ip') || 'unknown';

  if (!checkPayloadSize(request, 4 * 1024)) {
    return new Response(JSON.stringify({ error: 'Payload too large' }), {
      status: 413,
      headers: corsHeaders,
    });
  }

  // Rate limiting: max 60 telemetry events per minute per IP
  const rateCheck = checkRateLimit(clientIp, 'analytics_post', 60, 60);
  if (!rateCheck.allowed) {
    return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
      status: 429,
      headers: corsHeaders,
    });
  }

  try {
    const body = (await request.json()) as { event_type?: string; event_value?: string };

    const rawEventType = typeof body.event_type === 'string' ? body.event_type.trim() : '';
    const event_type = ALLOWED_EVENT_TYPES.includes(rawEventType) ? rawEventType : null;
    const event_value = sanitizeText(body.event_value || '', 0, 100) || '';

    if (!event_type) {
      return new Response(JSON.stringify({ error: 'Invalid event_type' }), {
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

// GET: Summary of public metrics
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const corsHeaders = getCorsHeaders(request);
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
      `SELECT COUNT(*) as count FROM analytics_events WHERE event_type IN ('biome_switch', 'theme_selection')`
    ).first<{ count: number }>();

    const projectClicks = await db.prepare(
      `SELECT COUNT(*) as count FROM analytics_events WHERE event_type = 'project_click'`
    ).first<{ count: number }>();

    return new Response(
      JSON.stringify({
        totalViews: totalViews?.count || 0,
        biomeSwitches: biomeSwitches?.count || 0,
        projectClicks: projectClicks?.count || 0,
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    console.error('Analytics GET error:', err);
    return new Response(JSON.stringify({ error: 'Failed to retrieve analytics' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
};
