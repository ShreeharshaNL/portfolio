# Shreeharsha N. L. — Developer Portfolio

A personal developer portfolio website for **Shreeharsha N. L.**, an Information Science and Engineering student at **The National Institute of Engineering (NIE), Mysuru**.

Built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

---

## 🎨 Design & Features

* **Authentic Omarchy Background Wallpapers:** Features high-resolution dark wallpapers from Omarchy themes (including Matte Black's *Ship at Sea*, Last Horizon's *New Horizons*, Solitude's *Mountain Ether*, and Kanagawa Wave).
* **Live Wallpaper Switcher:** Visitors can toggle between 5 authentic Omarchy backgrounds directly from the navigation bar.
* **Interactive Cursor Spotlight:** Hardware-accelerated radial spotlight that tracks your cursor smoothly over the wallpaper and architectural grid.
* **Clickable Project Showcase with UI Photos:**
  * **[LegalLens](https://github.com/ShreeharshaNL):** AI-powered statutory legal mapping system with structured legal query UI preview.
  * **[LabelWise](https://github.com/ShreeharshaNL):** Google Vision OCR packaged food additive scanner featuring your **NeoNexus 36.1 Winner** hackathon award.
  * **[Student Freelancing Platform](https://github.com/ShreeharshaNL):** Peer student matchmaking & project portal dashboard preview.
  * Clicking any card or its photo redirects straight to your GitHub profile (or your live project URLs once provided).
* **Bento Highlight Metrics:** Quick-glance cards summarizing your degree, hackathon honors, technical specialization, and location.
* **Verified Social & Contact Channels:**
  * **Email:** `shreeharsha2027@gmail.com`
  * **LinkedIn:** [linkedin.com/in/shreeharsha-n-l-273101239](https://www.linkedin.com/in/shreeharsha-n-l-273101239)
  * **GitHub:** [github.com/ShreeharshaNL](https://github.com/ShreeharshaNL)

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start local dev server (http://localhost:3000)
npm run dev

# 3. Build for production (outputs to dist/)
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 💾 Database & Cloudflare D1 Backend

The portfolio includes a serverless edge backend powered by **Cloudflare Pages Functions** and **Cloudflare D1** (Serverless SQLite).

* **Direct Contact Transmission API:** [`functions/api/contact.ts`](file:///home/shnl/Projects/Portfolio-web/functions/api/contact.ts) — validates, logs messages to `contact_messages` table, and optionally forwards notification emails via Resend.
* **Visitor Signpost (Guestbook):** [`functions/api/guestbook.ts`](file:///home/shnl/Projects/Portfolio-web/functions/api/guestbook.ts) — allows visitors to sign notes with custom Minecraft avatars stored in `guestbook_entries`.
* **Global Miner Leaderboard:** [`functions/api/leaderboard.ts`](file:///home/shnl/Projects/Portfolio-web/functions/api/leaderboard.ts) — syncs and ranks visitor mining stats in `miner_stats`.
* **Database Schema:** [`d1/schema.sql`](file:///home/shnl/Projects/Portfolio-web/d1/schema.sql)

### Setup Cloudflare D1 in 2 Minutes:

```bash
# 1. Login to Cloudflare Wrangler
npx wrangler login

# 2. Create the D1 Database
npx wrangler d1 create portfolio-db
# Copy the output database_id into wrangler.jsonc

# 3. Apply the SQL Schema locally or remotely
npm run d1:migrate:local
# or deploy to Cloudflare production:
npm run d1:migrate:remote

# 4. Deploy Pages with Functions & D1
npx wrangler pages deploy dist
```

*(Note: During local Vite development `npm run dev`, a graceful client fallback automatically mirrors the D1 ledger in browser storage so features function out of the box without setup).*

---

## ⚙️ Updating Information

All personal details, project descriptions, and links are located in:
👉 [`src/config/portfolio.ts`](file:///home/shnl/Projects/Portfolio-web/src/config/portfolio.ts)
