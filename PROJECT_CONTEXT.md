# Project Context & Architecture Documentation: Shreeharsha's Portfolio Ecosystem

> **Document Purpose:** Complete technical context, architectural breakdown, recent progress, and pending action items for **Shreeharsha N. L.'s Portfolio Ecosystem**. This document is designed to give any AI assistant (like ChatGPT) or developer instant, 100% complete understanding of the codebase.

---

## 1. Project Overview & Two-Website Ecosystem

* **Owner / Developer:** Shreeharsha N. L.
* **Background:** Information Science & Engineering student at The National Institute of Engineering (NIE), Mysuru (Graduation: 2027).
* **Two-Website Architecture:**
  1. **Professional Portfolio:** `https://shreeharsha.online` (Live on Cloudflare Pages: `https://shreeharsha-pro.pages.dev`)
     * **Aesthetic & Audience:** Modern, clean, recruiter-friendly personal site designed for internships, software engineering placements, and clients.
     * **Design Language:** Editorial typography, neutral slate color scheme, restrained electric indigo accent, clean dark/light mode toggle, Lucide React icons, and zero Minecraft gamification.
  2. **Minecraft Edition Portfolio:** `https://minecraft.shreeharsha.online` (Live on Cloudflare Pages: `https://shreeharsha-portfolio.pages.dev`)
     * **Aesthetic & Audience:** Playful, retro-pixel interactive experience with dynamic biome skies, Web Audio API sound effects, diamond mining block, XP progression, 9-slot HUD hotbar, Community Ledger guestbook, global miner leaderboard, and operator admin dashboard at `/admin`.
* **Database & Cloudflare Infrastructure:**
  * Shared Cloudflare D1 SQL database: `portfolio-db` (UUID: `2c30e30a-033b-4fa4-a61e-83efb3490af8`).
  * Both sites record contact inquiries directly to `contact_messages`, enabling unified management from `/admin`.

---

## 2. Technology Stack & Infrastructure

| Layer | Technologies Used | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18, TypeScript | Strict type safety, functional components, hooks. |
| **Bundler & Tooling** | Vite 6, PostCSS, Autoprefixer | Multi-app build pipeline with independent output directories. |
| **Professional Styling** | Tailwind CSS 3, Inter font | Editorial hierarchy, slate neutrals, indigo brand accents, dark mode. |
| **Minecraft Styling** | Tailwind CSS 3, Pixelify Sans, Silkscreen | 3D beveled Minecraft borders, pixel fonts, text shadows, HUD layouts. |
| **Serverless Edge Backend** | Cloudflare Pages Functions | Independent TypeScript API functions per app (`functions/api/*` and `apps/professional/functions/api/*`). |
| **Database** | Cloudflare D1 (Serverless SQLite) | Globally distributed serverless SQL database (`portfolio-db`). |
| **Icons & Media** | Custom SVG Pixel Icons + Lucide React | Pixel items for Minecraft; Lucide icons for Professional site. |
| **Audio Engine** | Web Audio API (`src/utils/audio.ts`) | Programmatic Minecraft SFX (isolated to Minecraft edition). |
| **Hosting & CDN** | Cloudflare Pages | Two separate Cloudflare Pages projects (`shreeharsha-pro` and `shreeharsha-portfolio`). |

---

## 3. Directory Structure

```
Portfolio-web/
├── apps/
│   └── professional/              # Dedicated Professional Portfolio Application
│       ├── index.html             # Clean SEO metadata (Title: Shreeharsha N. L. | Software Developer)
│       ├── vite.config.ts         # Independent Vite config (port 3001, builds to apps/professional/dist)
│       ├── tsconfig.json          # Independent TypeScript configuration
│       ├── tailwind.config.js     # Professional design tokens (brand indigo, neutral slates)
│       ├── postcss.config.js      # PostCSS configuration
│       ├── wrangler.jsonc         # Cloudflare Pages project binding ("shreeharsha-pro")
│       ├── functions/             # Professional edge API routes
│       │   └── api/
│       │       └── contact.ts     # Same-origin inquiry handler writing to D1 database
│       ├── public/                # Professional static assets (favicon.svg, robots.txt, sitemap.xml, images/)
│       └── src/
│           ├── components/        # Professional UI components
│           │   ├── Navbar.tsx     # Sticky navigation with mobile drawer & active spy
│           │   ├── Hero.tsx       # 2-col editorial hero with verified technical profile card
│           │   ├── About.tsx      # Authentic bio, engineering tenets, CGPA & academic standing
│           │   ├── FeaturedProjects.tsx # Data-driven project showcase
│           │   ├── ProjectCard.tsx# Clean responsive project card with highlights & links
│           │   ├── Skills.tsx     # Categorized skill chips with Lucide category icons
│           │   ├── Education.tsx  # NIE Mysuru BE ISE details + NeoNexus 36.1 award spotlight
│           │   ├── Contact.tsx    # Direct contact channels + D1 database dispatch form
│           │   ├── Footer.tsx     # Clean footer with subtle cross-link to Minecraft edition
│           │   ├── ThemeToggle.tsx# Smooth light/dark mode switch with localStorage persistence
│           │   └── Icons.tsx      # SVG icons for GitHub and LinkedIn
│           ├── config/
│           │   └── portfolio.ts   # Centralized verified data (projects, skills, education)
│           ├── styles/
│           │   └── index.css      # Modern Tailwind styling & focus rings
│           ├── types/
│           │   └── index.ts       # TypeScript data interfaces
│           ├── App.tsx            # Main layout wrapper
│           └── main.tsx           # React entry point
├── d1/
│   └── schema.sql                 # Cloudflare D1 database schema & seed migrations
├── functions/                     # Minecraft Cloudflare Pages Functions (Edge Serverless API)
│   ├── types.ts                   # Edge types, payloads, and Env bindings (D1 DB, secrets)
│   └── api/
│       ├── contact.ts             # POST/GET contact transmission API (logs to D1)
│       ├── guestbook.ts           # POST/GET visitor signpost notes (logs to D1)
│       ├── leaderboard.ts         # POST/GET global diamond mining rankings (logs to D1)
│       ├── analytics.ts           # POST/GET telemetry & theme usage analytics
│       └── admin.ts               # GET/POST private operator dashboard & moderation
├── public/                        # Minecraft static assets (images, pixel favicon)
├── src/                           # Minecraft Edition Source Code (100% Preserved)
│   ├── components/                # Minecraft React UI Components
│   │   ├── AdminPage.tsx          # Dedicated /admin security login & dashboard
│   │   ├── CommunityLedger.tsx    # Visitor Signpost (Guestbook) & Miner Leaderboard
│   │   ├── Contact.tsx            # Contact channels & direct database dispatch form
│   │   ├── Education.tsx          # Academics & hackathon credentials
│   │   ├── Footer.tsx             # Clean Minecraft footer with coordinates & links
│   │   ├── Hero.tsx               # Responsive hero, title, splash text, action buttons, mining block
│   │   ├── HighlightMetrics.tsx   # 2x2 responsive technical highlights grid
│   │   ├── InventoryModal.tsx     # Player character vault, gear inspection & achievements
│   │   ├── BiomeModal.tsx         # Minecraft background atmosphere switcher
│   │   ├── MinecraftBackground.tsx# Dynamic animated skies, clouds, sun/moon per biome
│   │   ├── MinecraftHotbar.tsx    # Docked 9-slot HUD hotbar with health & food stats
│   │   ├── MinecraftIcons.tsx     # 16x16 crisp-edge pixel SVG icons
│   │   ├── MineableBlock.tsx      # Interactive 3D diamond ore block with break particles
│   │   ├── Navbar.tsx             # Responsive header with mobile drawer
│   │   ├── ProjectCard.tsx        # Project preview cards with redirects & tags
│   │   ├── ProjectGrid.tsx        # Projects showcase container
│   │   └── Skills.tsx             # Grouped technical skill toolbox
│   ├── config/
│   │   └── portfolio.ts           # Personal information, project details, skills data
│   ├── context/
│   │   ├── GameContext.tsx        # XP, Level, Diamonds mined, sound mute, achievements
│   │   └── ThemeContext.tsx       # Day/Night mode, active biome, theme telemetry
│   ├── services/
│   │   └── api.ts                 # Client API client with graceful local storage fallback
│   ├── styles/
│   │   └── index.css              # Custom Minecraft button styles, animations, scrollbars
│   ├── types/
│   │   └── index.ts               # Core TypeScript data interfaces
│   ├── App.tsx                    # Root component with /admin SPA route detection
│   └── main.tsx                   # React DOM entry point
├── package.json                   # Dependencies & npm scripts
├── wrangler.jsonc                 # Cloudflare Pages & D1 binding configuration
├── tailwind.config.js             # Tailwind design tokens & font families
└── tsconfig.json                  # TypeScript compiler options
```

---

## 4. Everything Completed in This Project

### A. UI Refinements & Content Cleanup
1. **Removed Top NeoNexus & ISE Banner:** Removed the top Minecraft badge from the Hero section that displayed `"Information Science & Engineering · NIE Mysuru • NEONEXUS 2026 WINNER"`.
2. **Cleaned Hero Splashes:** Removed hackathon/degree splashes (`Winner — NeoNexus 2026!` and `B.E. ISE · NIE Mysuru!`) from the bouncing yellow splash text pool.
3. **Cleaned Highlight Metrics:** Replaced redundant top cards with clean technical metrics:
   * *Discipline:* Software & Systems
   * *Engineering Craft:* Full-Stack & Cloud
   * *Specialization:* Full-Stack & AI
   * *Spawn Biome:* Karkala, Karnataka · NIE Mysuru
4. **Cleaned Typography Across Components:**
   * Changed `Cumulative GPA (ISE):` to `Cumulative CGPA: 8.66 / 10.0` in [`Education.tsx`](src/components/Education.tsx).
   * Updated profile text in [`InventoryModal.tsx`](src/components/InventoryModal.tsx) to `B.E. Info Science · NIE Mysuru`.
   * Updated Hotbar slot 5 lore in [`MinecraftHotbar.tsx`](src/components/MinecraftHotbar.tsx) to `Engineering Academics & Standing`.
   * Updated SEO metadata in [`index.html`](index.html).

### B. Comprehensive Mobile & Cross-Device Responsiveness Fixes
1. **Hero Splash Text Overlap:**
   * *Issue:* The bouncing splash text was floating with `-top-4 -right-4` and overlapping directly over `"Shreeharsha"` on screens $< 640\text{px}$.
   * *Fix:* Positioned as a dedicated Minecraft banner below the heading on mobile, while retaining the angled bounce on desktop (`sm:inline-block`).
2. **Top Navigation Bar Clutter:**
   * *Issue:* 6–7 icon buttons were cramped in a single row against the brand logo on small mobile viewports ($320\text{px}$–$390\text{px}$).
   * *Fix:* Retained only Theme Toggle, Sound Toggle, and Hamburger on mobile headers. Biome Selector, Character Vault, LinkedIn, and GitHub were organized neatly into the collapsible mobile drawer.
3. **Bottom Hotbar Overflow & Occlusion:**
   * *Issue:* The 9-slot fixed hotbar was $365\text{px}+$ wide, causing horizontal scrolling on small phones and blocking footer/contact links.
   * *Fix:* Scaled slots responsively (`w-7` to `w-11`), scaled icon sizes, reduced hearts/food drumsticks to 5 on mobile ($< 640\text{px}$) and 10 on desktop, auto-hide hotbar when modals are open, and increased footer padding (`pb-36 sm:pb-40`).
4. **Highlight Metrics Stacking:**
   * Converted 4 tall stacked cards into an elegant, compact 2x2 grid on mobile devices.
5. **Inventory Modal Mobile Layout:**
   * Restructured the modal header into a responsive 2-row layout: Row 1 holds the Vault title and close button; Row 2 holds full-width tabs so elements never clip or smash together.
6. **Contact Form Truncation & Stacking:**
   * Added `min-w-0` and `flex-1 truncate` to email copy containers and made action buttons stack cleanly (`w-full sm:w-auto`).
7. **Project Card Badges:**
   * Added `flex-wrap` and `shrink-0` to badges so long project titles wrap gracefully without colliding.

### C. Serverless Edge Backend & Database (Cloudflare D1)
1. **D1 Relational SQL Schema ([`d1/schema.sql`](d1/schema.sql)):**
   * Database name: `portfolio-db`
   * Cloudflare Database UUID: `2c30e30a-033b-4fa4-a61e-83efb3490af8`
   * Tables:
     * `contact_messages`: Stores direct inquiries (`id`, `name`, `email`, `subject`, `message`, `ip_hash`, `status`, `created_at`).
     * `guestbook_entries`: Stores visitor signatures (`id`, `author_name`, `character_skin`, `message`, `is_approved`, `created_at`).
     * `miner_stats`: Stores global player diamond mining and XP leaderboards (`id`, `player_name`, `diamonds_mined`, `xp`, `level`, `last_active`).
     * `analytics_events`: Privacy-first telemetry (`id`, `event_type`, `event_value`, `created_at`).
2. **Serverless Edge Endpoints ([`functions/api/`](functions/api/)):**
   * `POST /api/contact`: Validates input, logs message to D1, and optionally forwards an email notification if `RESEND_API_KEY` is present.
   * `GET & POST /api/guestbook`: Fetches recent approved notes and records new visitor signatures.
   * `GET & POST /api/leaderboard`: Returns top 10 miners and updates player diamond stats (`upsert`).
   * `GET & POST /api/analytics`: Logs page impressions, theme selections, project clicks, and returns aggregated counts.
   * `GET & POST /api/admin`: Authenticates admin requests, delivers inbox/guestbook/telemetry data, and executes moderation actions (delete messages, toggle visibility, delete guestbook notes).
3. **Client API Service with Fallback ([`src/services/api.ts`](src/services/api.ts)):**
   * Calls `/api/*` when deployed on Cloudflare.
   * During local development (`npm run dev`) before D1 is bound, gracefully falls back to browser storage so all features function offline without 404 errors.

### D. New Frontend Features
1. **Community Ledger Section ([`src/components/CommunityLedger.tsx`](src/components/CommunityLedger.tsx)):**
   * **Visitor Signpost (Guestbook):** Visitors select a Minecraft avatar (Steve, Alex, Diamond Knight, Creeper, Enderman), write a note, and carve a wooden sign.
   * **Global Miner Leaderboard:** Displays top 10 diamond miners (#1 Gold, #2 Silver, #3 Bronze). Visitors can register their gamer tag to sync their mined diamonds and XP to the server.
2. **Direct Contact Transmission Form ([`src/components/Contact.tsx`](src/components/Contact.tsx)):**
   * Sends transmissions directly to the Cloudflare D1 database with real-time validation, loading indicator, and green confirmation banner.
   * Retains direct Gmail and Mail App buttons as fallbacks.
3. **Dedicated Admin Portal ([`src/components/AdminPage.tsx`](src/components/AdminPage.tsx)):**
   * Accessed strictly via URL: **`/admin`** (all keyboard shortcuts and footer buttons were removed).
   * **Security Login:** Secured with custom password (password is completely hidden, no hints shown in UI).
   * **Theme & Biome Popularity Tracker:** Shows which theme visitors use the most with rankings, selection counts, and progress bars across all 6 biomes.
   * **Visitor Traffic & Project Clicks:** Total page views, biome switch counts, and click-through counts per project.
   * **Transmission Inbox:** Displays all incoming contact messages with one-click deletion.
   * **Signpost Moderation:** Hide or permanently delete guestbook entries.

---

## 5. Verification & Live Deployment State

1. **Local Build:** `npm run build` runs `tsc && vite build` and completes with **0 errors**.
2. **Cloudflare D1 Remote Database:**
   * Successfully migrated with `d1/schema.sql`.
   * Real user data verified live in production (contact messages and guestbook notes).
3. **Cloudflare Pages Deployment:**
   * Project name: `shreeharsha-portfolio`
   * Production URL: `https://shreeharsha-portfolio.pages.dev`
   * `/admin` route tested and verified working with custom password authentication.

---

## 6. Cloudflare Deployment & Two-Website Domain Mapping

### A. Live Cloudflare Pages Projects
1. **Professional Developer Portfolio:**
   * Pages Project: `shreeharsha-pro`
   * Cloudflare Preview URL: `https://shreeharsha-pro.pages.dev`
   * Target Production Domain: `https://shreeharsha.online`
2. **Minecraft Edition Portfolio:**
   * Pages Project: `shreeharsha-portfolio`
   * Cloudflare Preview URL: `https://shreeharsha-portfolio.pages.dev`
   * Target Production Subdomain: `https://minecraft.shreeharsha.online`
   * Admin Portal: `https://minecraft.shreeharsha.online/admin`

---

### B. Custom Domain Configuration (Cloudflare Dashboard Steps)
Follow these exact, safe steps in the Cloudflare Dashboard to complete the domain cutover without downtime:

1. **Configure the Minecraft Portfolio on `minecraft.shreeharsha.online`:**
   * In Cloudflare Dashboard, go to **Workers & Pages**.
   * Click on project **`shreeharsha-portfolio`**.
   * Select the **Custom domains** tab.
   * If `shreeharsha.online` is listed, click its three dots `...` and choose **Remove domain** (this frees the root domain for the professional site).
   * Click **Set up a domain** → Enter `minecraft.shreeharsha.online`.
   * Click **Continue** → **Activate domain**. Cloudflare will automatically provision the DNS CNAME record and SSL certificate.
   * *Result:* The Minecraft portfolio, guestbook, mining game, and `/admin` will be served at `https://minecraft.shreeharsha.online`.

2. **Configure the Professional Portfolio on `shreeharsha.online`:**
   * In Cloudflare Dashboard, go to **Workers & Pages**.
   * Click on project **`shreeharsha-pro`**.
   * Select the **Custom domains** tab.
   * Click **Set up a domain** → Enter `shreeharsha.online`.
   * Click **Continue** → **Activate domain**.
   * *(Optional)* Click **Set up a domain** again → Enter `www.shreeharsha.online`.
   * *Result:* The professional, recruiter-ready developer portfolio will be served at `https://shreeharsha.online`.

---

### C. Git Synchronization (`main` branch)
* The repository is on branch `main`. No secondary branches (such as `dev`) have been created.
* Commands to sync all verified work to GitHub:
  ```bash
  git add .
  git commit -m "feat: complete two-website ecosystem (professional at shreeharsha.online, minecraft at minecraft.shreeharsha.online)"
  git push origin main
  ```

---

## 7. Command Reference

### Local Development
```bash
# Run Minecraft Edition locally (port 3000)
npm run dev
# or
npm run dev:mc

# Run Professional Edition locally (port 3001)
npm run dev:pro
```

### Production Builds
```bash
# Build Minecraft Edition to ./dist
npm run build:mc

# Build Professional Edition to ./apps/professional/dist
npm run build:pro

# Build and typecheck both applications sequentially
npm run build:all
```

### Preview Builds
```bash
# Preview Minecraft Edition production bundle
npm run preview:mc

# Preview Professional Edition production bundle
npm run preview:pro
```

### Edge Deployments
```bash
# Deploy Minecraft Edition to Cloudflare Pages (shreeharsha-portfolio)
npm run pages:deploy:mc

# Deploy Professional Edition to Cloudflare Pages (shreeharsha-pro)
npm run pages:deploy:pro
```

### Remote D1 Database Queries
```bash
# Query contact inquiries from both websites
npx wrangler d1 execute portfolio-db --remote --command="SELECT id, name, email, subject, status, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 10;"

# Query Minecraft signpost entries
npx wrangler d1 execute portfolio-db --remote --command="SELECT * FROM guestbook_entries ORDER BY created_at DESC LIMIT 10;"

# Query Minecraft mining leaderboards
npx wrangler d1 execute portfolio-db --remote --command="SELECT * FROM miner_stats ORDER BY diamonds_mined DESC LIMIT 10;"
```

---

## 8. Professional Web Architecture & Client Delivery Guide (For Local Businesses & Freelancing)

This section serves as a practical, professional blueprint for how modern production websites are built, hosted, and delivered to local business clients (e.g., clinics, salons, restaurants, fitness studios, consulting firms).

### A. Modern Architecture vs. Legacy Hosting
| Feature | Traditional Hosting (cPanel / PHP / WordPress) | Modern Edge Stack (Vite / React / Cloudflare Pages / D1) |
| :--- | :--- | :--- |
| **Hosting Cost** | $10 – $35 / month per client | **$0 / month** (Generous free tier on Cloudflare / Vercel) |
| **Speed & CDN** | Hosted on a single origin server in one city | Replicated across 300+ global edge data centers (<50ms response) |
| **Maintenance** | Frequent PHP updates, plugin security vulnerabilities | Zero server maintenance, immune to traditional server exploits |
| **SSL Certificates** | Requires manual setup or paid certs | 100% automated, auto-renewing SSL/TLS |
| **Database** | Heavy MySQL server requiring RAM & backups | Serverless Edge SQL (D1 / SQLite) with automated edge replication |

---

### B. End-to-End Client Project Lifecycle (From Contract to Delivery)

#### 1. Discovery & Requirement Scoping
* **Client Interview:** Understand their business goals (e.g. generating phone calls, booking appointments, capturing email leads, displaying restaurant menus).
* **Asset Checklist:** Collect high-res logos, brand color codes, real photos of the establishment/team, business hours, Google Maps location, and FAQs.
* **Pricing & Payment Model:**
  * Standard milestone: **50% deposit upfront** before starting work, **50% upon final delivery** before domain launch.
  * Never transfer final DNS or admin master keys before the final invoice is cleared.

#### 2. Design System & Prototyping
* Use Tailwind CSS for a consistent responsive grid, typography scale, and color hierarchy.
* Build mobile-first: Over 70% of local business traffic comes from smartphones. Ensure buttons have minimum 44px tap targets and phone numbers use `tel:+1...` clickable links.

#### 3. Development & Edge Backend
* **Frontend:** Fast single-page application or static site generator (Vite + React / Astro).
* **Backend Form Handling:** Form submissions should never rely on unreliable `mailto:` links. Use Cloudflare Pages Functions (`/api/contact`) to:
  1. Save inquiries in an edge database (D1) so leads are never lost.
  2. Send instant email notifications to the owner's personal email using transactional email APIs like Resend or SendGrid.
* **Lead Capture & Security:** Add Cloudflare Turnstile to block spam bots without annoying CAPTCHAs.

#### 4. Staging & Client Demo Workflow
* **Previewing Before Launch:**
  * During development, deploy to a staging URL (e.g. `https://preview.client-business.pages.dev` or use Wrangler's `--branch=staging` flag).
  * Share this private preview link with the client for feedback, revisions, and final sign-off.
  * The client's live existing website (if they have one) remains unaffected.

#### 5. Domain, DNS & SSL Setup (The Golden Rule)
* **Domain Ownership Rule:** **The client must always purchase and own the domain name on their own account** (Namecheap, GoDaddy, Google Domains, Cloudflare Registrar). You should never hold a client's domain hostage under your personal card.
* **DNS Delegation:**
  * Have the client invite you as an administrator to their Cloudflare account or registrar, OR
  * Provide them with simple CNAME records pointing to your Cloudflare Pages deployment (`client-business.pages.dev`).
* Cloudflare automatically provisions free, secure HTTPS SSL certificates within minutes.

#### 6. Client Handoff & Training
* Provide the client with:
  * Their **Admin Portal URL** (`/admin`) and secure login credentials to view incoming customer leads and inquiries.
  * A 3-minute screen recording (using Loom or similar) demonstrating how their contact form works, how to log in, and how to view customer messages.
  * Formal project completion sign-off document.

---

### C. The Recurring Revenue Model (Monthly Retainers)
Instead of only charging a one-time development fee, professional agencies offer a **Website Care & Growth Retainer** ($50 – $200 / month):
1. **Managed Edge Hosting & Domain Monitoring:** Guaranteeing 99.99% uptime and SSL certificate renewal.
2. **Content Updates:** Up to 1–2 hours per month for menu edits, staff updates, seasonal promos, or price changes.
3. **Monthly Analytics Summary:** Sending the client a monthly snapshot of how many visitors visited their site and how many leads were captured.
4. **Local SEO & Google Business Profile Optimization:** Keeping their Google Maps listing aligned with their website.
* Since Cloudflare Pages and D1 have virtually zero monthly operational costs for small sites, retainer revenue has near 95%+ profit margins.
