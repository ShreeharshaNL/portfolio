/// <reference types="@cloudflare/workers-types" />

export interface Env {
  DB?: D1Database;
  RESEND_API_KEY?: string;
  ADMIN_SECRET?: string;
  NOTIFICATION_EMAIL?: string;
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface GuestbookPayload {
  author_name: string;
  character_skin?: string;
  message: string;
}

export interface MinerLeaderboardPayload {
  player_name: string;
  diamonds_mined: number;
  xp: number;
  level: number;
}
