/// <reference types="@cloudflare/workers-types" />

export interface Env {
  DB?: D1Database;
  RESEND_API_KEY?: string;
  NOTIFICATION_EMAIL?: string;
  ADMIN_SECRET?: string;
  MC_ADMIN_SECRET?: string;
  MC_ADMIN_PASSWORD_HASH?: string;
  PRO_ADMIN_SECRET?: string;
  PRO_ADMIN_PASSWORD_HASH?: string;
  ENVIRONMENT?: string;
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
  _gotcha?: string;
}
