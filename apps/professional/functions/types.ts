export interface Env {
  DB: D1Database;
  RESEND_API_KEY?: string;
  NOTIFICATION_EMAIL?: string;
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}
