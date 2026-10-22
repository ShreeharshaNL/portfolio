import { onRequestGet as __api_admin_ts_onRequestGet } from "/home/shnl/Projects/Portfolio-web/functions/api/admin.ts"
import { onRequestOptions as __api_admin_ts_onRequestOptions } from "/home/shnl/Projects/Portfolio-web/functions/api/admin.ts"
import { onRequestPost as __api_admin_ts_onRequestPost } from "/home/shnl/Projects/Portfolio-web/functions/api/admin.ts"
import { onRequestGet as __api_analytics_ts_onRequestGet } from "/home/shnl/Projects/Portfolio-web/functions/api/analytics.ts"
import { onRequestOptions as __api_analytics_ts_onRequestOptions } from "/home/shnl/Projects/Portfolio-web/functions/api/analytics.ts"
import { onRequestPost as __api_analytics_ts_onRequestPost } from "/home/shnl/Projects/Portfolio-web/functions/api/analytics.ts"
import { onRequestGet as __api_contact_ts_onRequestGet } from "/home/shnl/Projects/Portfolio-web/functions/api/contact.ts"
import { onRequestOptions as __api_contact_ts_onRequestOptions } from "/home/shnl/Projects/Portfolio-web/functions/api/contact.ts"
import { onRequestPost as __api_contact_ts_onRequestPost } from "/home/shnl/Projects/Portfolio-web/functions/api/contact.ts"
import { onRequestGet as __api_guestbook_ts_onRequestGet } from "/home/shnl/Projects/Portfolio-web/functions/api/guestbook.ts"
import { onRequestOptions as __api_guestbook_ts_onRequestOptions } from "/home/shnl/Projects/Portfolio-web/functions/api/guestbook.ts"
import { onRequestPost as __api_guestbook_ts_onRequestPost } from "/home/shnl/Projects/Portfolio-web/functions/api/guestbook.ts"
import { onRequestGet as __api_leaderboard_ts_onRequestGet } from "/home/shnl/Projects/Portfolio-web/functions/api/leaderboard.ts"
import { onRequestOptions as __api_leaderboard_ts_onRequestOptions } from "/home/shnl/Projects/Portfolio-web/functions/api/leaderboard.ts"
import { onRequestPost as __api_leaderboard_ts_onRequestPost } from "/home/shnl/Projects/Portfolio-web/functions/api/leaderboard.ts"

export const routes = [
    {
      routePath: "/api/admin",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_admin_ts_onRequestGet],
    },
  {
      routePath: "/api/admin",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_admin_ts_onRequestOptions],
    },
  {
      routePath: "/api/admin",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_ts_onRequestPost],
    },
  {
      routePath: "/api/analytics",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_analytics_ts_onRequestGet],
    },
  {
      routePath: "/api/analytics",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_analytics_ts_onRequestOptions],
    },
  {
      routePath: "/api/analytics",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_analytics_ts_onRequestPost],
    },
  {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_contact_ts_onRequestGet],
    },
  {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_contact_ts_onRequestOptions],
    },
  {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_contact_ts_onRequestPost],
    },
  {
      routePath: "/api/guestbook",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_guestbook_ts_onRequestGet],
    },
  {
      routePath: "/api/guestbook",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_guestbook_ts_onRequestOptions],
    },
  {
      routePath: "/api/guestbook",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_guestbook_ts_onRequestPost],
    },
  {
      routePath: "/api/leaderboard",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_leaderboard_ts_onRequestGet],
    },
  {
      routePath: "/api/leaderboard",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_leaderboard_ts_onRequestOptions],
    },
  {
      routePath: "/api/leaderboard",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_leaderboard_ts_onRequestPost],
    },
  ]