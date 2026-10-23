"use client"

import * as React from "react"

/* ------------------------------------------------------------------ types */

export type MascotPortfolioHeroProps = {
  /**
   * Height of the hero on desktop.
   */
  height?: string
  /** Floor for the height on desktop. */
  minHeight?: string

  /* ---- top rule ---- */
  /** Clean primary headline (e.g. "Hi, I'm Shreeharsha.") */
  headline?: string
  /** Clean concise supporting description */
  description?: string
  /** Set in the green half of the index pill, top left. */
  index?: string
  /** Set beside the index, inside the same pill. */
  discipline?: string
  /** The bold line beside the pill. */
  tagline?: string
  /** Centre-right, set inside braces: `{ first / second }`. */
  collection?: [string, string]
  /** Top right, two lines beside the green dot. */
  reel?: [string, string]

  /* ---- editorial fallback headline ---- */
  year?: string
  initials?: string
  badge?: string
  line2?: string
  line3?: string
  word?: string
  verticalTag?: string
  bracketed?: string

  /* ---- pill and services ---- */
  seekingLabel?: string
  seeking?: string
  href?: string
  services?: string[]

  /* ---- interactive emoji & greetings ---- */
  emojis?: string[]
  greetings?: string[]

  /* Backward compatibility no-ops */
  skin?: string
  beanie?: string
  shirt?: string
  tag?: string

  /* ---- palette ---- */
  accent?: string
  paper?: string
  ink?: string
  className?: string
}

const SANS_STACK =
  '"Inter","Helvetica Neue",Helvetica,Arial,system-ui,sans-serif'
const DISPLAY_STACK =
  '"Archivo Black","Arial Black","Helvetica Neue",Helvetica,Arial,system-ui,sans-serif'

/* --------------------------------------------------------------- the gaze & parallax */

export function aim(px: number, py: number, cx: number, cy: number, rx: number, ry: number) {
  const sat = (v: number) => v / Math.sqrt(1 + v * v)
  return [sat((px - cx) / rx), sat((py - cy) / ry)]
}

export function approach(cur: number, target: number, dt: number, rate: number) {
  return target + (cur - target) * Math.exp(-rate * dt)
}

/* ------------------------------------------------------------------- room */

function room() {
  const vx = 500
  const vy = 430
  const x0 = 140
  const x1 = 860
  const y0 = 120
  const y1 = 740
  const out = (x: number, y: number) => {
    const dx = x - vx
    const dy = y - vy
    const kx = dx > 0 ? (1000 - vx) / dx : -vx / dx
    const ky = dy > 0 ? (1000 - vy) / dy : -vy / dy
    const k = Math.min(kx, ky)
    return [x, y, vx + dx * k, vy + dy * k]
  }

  const back: number[][] = []
  const rays: number[][] = []
  const cols = 12
  const rows = 9
  for (let i = 0; i <= cols; i++) {
    const x = x0 + ((x1 - x0) * i) / cols
    back.push([x, y0, x, y1])
    rays.push(out(x, y0), out(x, y1))
  }
  for (let j = 0; j <= rows; j++) {
    const y = y0 + ((y1 - y0) * j) / rows
    back.push([x0, y, x1, y])
    rays.push(out(x0, y), out(x1, y))
  }
  const depth = [1.07, 1.16, 1.28, 1.45, 1.7].map((s) => {
    const l = vx + (x0 - vx) * s
    const r = vx + (x1 - vx) * s
    const t = vy + (y0 - vy) * s
    const b = vy + (y1 - vy) * s
    return "M" + l + " " + t + "H" + r + "V" + b + "H" + l + "Z"
  })
  return { back, rays, depth }
}

const ROOM = room()

/* ----------------------------------------------------------------- styles */

const CSS = `
.mph-root{position:relative;width:100%;background:var(--mph-paper);color:var(--mph-ink);font-family:var(--mph-sans);-webkit-font-smoothing:antialiased;}
.mph-room{position:absolute;inset:0;width:100%;height:100%;display:block;color:var(--mph-ink);pointer-events:none;}
.mph-room line,.mph-room path{vector-effect:non-scaling-stroke;}

/* Waving Hand Emoji Animation */
.mph-wave-emoji{display:inline-block;margin-left:.25em;transform-origin:70% 70%;animation:mph-wave 2.2s infinite ease-in-out;user-select:none;}
@keyframes mph-wave{0%{transform:rotate(0deg);}15%{transform:rotate(14deg);}30%{transform:rotate(-8deg);}45%{transform:rotate(14deg);}60%{transform:rotate(-4deg);}75%{transform:rotate(10deg);}100%{transform:rotate(0deg);}}
@keyframes mph-pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.4;transform:scale(.85);}}
@keyframes mph-wiggle{0%{transform:rotate(0);}25%{transform:rotate(-14deg) scale(1.1);}55%{transform:rotate(9deg) scale(1.15);}80%{transform:rotate(-4deg);}100%{transform:rotate(0) scale(1);}}

/* Shared Emoji Card Styles */
.mph-emoji-stage{position:relative;width:100%;}
.mph-emoji-card{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;background:var(--mph-surface, #ffffff);border:2px solid var(--mph-ink);border-radius:1.5rem;box-shadow:4px 4px 0px 0px var(--mph-ink);cursor:pointer;outline:none;transition:box-shadow .25s cubic-bezier(.3,1.4,.5,1),border-color .2s;transform-style:preserve-3d;will-change:transform;-webkit-tap-highlight-color:transparent;}
.mph-emoji-card:hover{box-shadow:6px 6px 0px 0px var(--mph-accent);}
.mph-emoji-card:focus-visible{outline:2px dashed var(--mph-accent);outline-offset:4px;}

.mph-emoji-status{display:inline-flex;align-items:center;gap:.5em;background:var(--mph-paper);border:1.5px solid var(--mph-ink);padding:.25em .8em;border-radius:999px;font-size:.8rem;font-weight:800;letter-spacing:.03em;text-transform:uppercase;color:var(--mph-ink);}
.mph-live-dot{width:.6em;height:.6em;border-radius:50%;background:var(--mph-accent);box-shadow:0 0 .5em var(--mph-accent);animation:mph-pulse 1.8s infinite ease-in-out;}

.mph-emoji-wrap{display:flex;align-items:center;justify-content:center;border-radius:50%;background:var(--mph-paper);border:2px solid var(--mph-ink);transform-style:preserve-3d;transition:transform .15s ease-out;}
.mph-main-emoji{line-height:1;display:block;user-select:none;}
.mph-happy .mph-emoji-wrap{animation:mph-wiggle .8s cubic-bezier(.3,1.6,.5,1);}

.mph-emoji-meta{display:flex;flex-direction:column;align-items:center;gap:.25em;}
.mph-emoji-role{font-family:var(--mph-display);font-size:1rem;font-weight:900;letter-spacing:-.01em;color:var(--mph-ink);text-transform:uppercase;}
.mph-emoji-hint{font-size:.75rem;font-weight:700;color:var(--mph-ink);opacity:.65;}

.mph-bubble{position:absolute;background:var(--mph-surface, #ffffff);color:var(--mph-ink);border:2px solid var(--mph-ink);border-radius:1rem;font-weight:800;line-height:1.3;box-shadow:3px 3px 0px 0px var(--mph-accent);opacity:0;pointer-events:none;z-index:30;transition:transform .35s cubic-bezier(.3,1.6,.5,1),opacity .2s;}
.mph-bubble[data-on="true"]{opacity:1;}

/* -------------------------------------------------------------
   DESKTOP / LAPTOP LAYOUT (@media min-width: 1024px)
   ------------------------------------------------------------- */
@media (min-width: 1024px) {
  .mph-root {
    height: var(--mph-height, calc(100svh - 4rem));
    min-height: var(--mph-min-height, 620px);
    overflow: hidden;
  }
  .mph-stage {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: min(92vw, 1300px);
    height: 82%;
    max-height: 720px;
  }

  .mph-top {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.85rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: .02em;
  }
  .mph-index {
    display: inline-flex;
    align-items: center;
    gap: .75em;
    border: 1.5px solid var(--mph-ink);
    border-radius: 999px;
    padding: .15em .8em .15em .15em;
    font-size: .85em;
  }
  .mph-index b {
    background: var(--mph-accent);
    color: var(--mph-ink);
    border-radius: 999px;
    padding: .25em 1em;
    font-weight: 800;
  }
  .mph-tagline {
    font-size: 1em;
    font-weight: 900;
  }
  .mph-brace {
    font-size: 1.1em;
    font-weight: 700;
    letter-spacing: .04em;
  }
  .mph-reel {
    display: flex;
    align-items: center;
    gap: .75em;
    font-size: .8em;
    text-align: right;
  }
  .mph-reel i {
    display: block;
    width: 1.6em;
    height: 1.6em;
    border-radius: 50%;
    background: var(--mph-accent);
    border: 1.5px solid var(--mph-ink);
    flex: none;
  }

  .mph-clean-box {
    position: absolute;
    left: 0;
    top: 18%;
    max-width: 58%;
    z-index: 10;
  }
  .mph-clean-h1 {
    font-family: var(--mph-display);
    font-weight: 900;
    font-size: clamp(2.8rem, 4.2vw, 4.5rem);
    line-height: 1.05;
    letter-spacing: -.03em;
    color: var(--mph-ink);
    margin: 0 0 .4em 0;
  }
  .mph-clean-desc {
    font-family: var(--mph-sans);
    font-size: clamp(1rem, 1.2vw, 1.2rem);
    font-weight: 500;
    line-height: 1.65;
    color: var(--mph-ink);
    opacity: .85;
    margin: 0 0 1.5em 0;
    max-width: 32rem;
  }
  .mph-clean-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .mph-clean-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: .5em;
    padding: .75em 1.6em;
    border-radius: 999px;
    background: var(--mph-accent);
    color: var(--mph-ink);
    border: 2px solid var(--mph-ink);
    font-size: .95rem;
    font-weight: 800;
    text-decoration: none;
    box-shadow: 3px 3px 0 var(--mph-ink);
    transition: transform .2s, box-shadow .2s;
  }
  .mph-clean-btn-primary:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0 var(--mph-ink);
  }
  .mph-clean-btn-secondary {
    display: inline-flex;
    align-items: center;
    padding: .75em 1.6em;
    border-radius: 999px;
    background: var(--mph-surface, #fff);
    color: var(--mph-ink);
    border: 2px solid var(--mph-ink);
    font-size: .95rem;
    font-weight: 800;
    text-decoration: none;
    box-shadow: 3px 3px 0 var(--mph-ink);
    transition: transform .2s, box-shadow .2s;
  }
  .mph-clean-btn-secondary:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0 var(--mph-accent);
  }

  .mph-desktop-emoji-slot {
    position: absolute;
    right: 2%;
    top: 20%;
    width: 280px;
    z-index: 20;
  }
  .mph-mobile-emoji-slot {
    display: none;
  }

  .mph-emoji-card {
    padding: 1.75rem 1.5rem;
  }
  .mph-emoji-wrap {
    width: 5.5rem;
    height: 5.5rem;
    margin: 1.25rem 0 .75rem 0;
  }
  .mph-main-emoji {
    font-size: 3.2rem;
  }

  .mph-bubble {
    left: -15%;
    top: -3.5rem;
    min-width: 14rem;
    max-width: 20rem;
    padding: .7rem 1.1rem;
    font-size: .85rem;
    transform-origin: 20% 100%;
    transform: scale(0) rotate(-4deg);
  }
  .mph-bubble[data-on="true"] {
    transform: scale(1) rotate(-2deg);
  }
  .mph-bubble::after {
    content: "";
    position: absolute;
    bottom: -.45em;
    left: 1.5em;
    width: 0;
    height: 0;
    border-left: .45em solid transparent;
    border-right: .45em solid transparent;
    border-top: .45em solid var(--mph-ink);
  }

  .mph-services {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: .95rem;
    font-weight: 800;
  }
  .mph-services li {
    position: relative;
    cursor: default;
    padding-bottom: .25em;
  }
  .mph-services li::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: .18em;
    background: var(--mph-accent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform .35s cubic-bezier(.6,0,.2,1);
  }
  .mph-services li:hover::after {
    transform: scaleX(1);
  }
}

/* -------------------------------------------------------------
   MOBILE & TABLET LAYOUT (@media max-width: 1023px)
   ------------------------------------------------------------- */
@media (max-width: 1023px) {
  .mph-root {
    height: auto !important;
    min-height: auto !important;
    overflow: visible !important;
    padding: 1.25rem 1rem 3rem 1rem;
  }

  .mph-stage {
    position: relative !important;
    left: auto !important;
    top: auto !important;
    transform: none !important;
    width: 100% !important;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .mph-top {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: .6rem;
    font-size: .8rem;
    font-weight: 800;
    text-transform: uppercase;
  }
  .mph-index {
    display: inline-flex;
    align-items: center;
    gap: .5em;
    border: 1.5px solid var(--mph-ink);
    border-radius: 999px;
    padding: .15em .75em .15em .15em;
    font-size: .85em;
  }
  .mph-index b {
    background: var(--mph-accent);
    color: var(--mph-ink);
    border-radius: 999px;
    padding: .2em .8em;
    font-weight: 800;
  }
  .mph-tagline, .mph-brace {
    display: none;
  }
  .mph-reel {
    display: flex;
    align-items: center;
    gap: .5em;
    font-size: .75em;
  }
  .mph-reel i {
    width: 1.4em;
    height: 1.4em;
    border-radius: 50%;
    background: var(--mph-accent);
    border: 1.5px solid var(--mph-ink);
  }

  .mph-clean-box {
    position: relative;
    left: auto;
    top: auto;
    max-width: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }
  .mph-clean-h1 {
    font-family: var(--mph-display);
    font-weight: 900;
    font-size: clamp(2.2rem, 8.5vw, 3.4rem);
    line-height: 1.08;
    letter-spacing: -.03em;
    color: var(--mph-ink);
    margin: 0;
  }
  .mph-clean-desc {
    font-family: var(--mph-sans);
    font-size: clamp(.92rem, 3.8vw, 1.05rem);
    font-weight: 500;
    line-height: 1.6;
    color: var(--mph-ink);
    opacity: .85;
    margin: 0;
  }
  .mph-clean-actions {
    display: flex;
    flex-wrap: wrap;
    gap: .75rem;
    margin-top: .25rem;
  }
  .mph-clean-btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .5em;
    padding: .75em 1.5em;
    border-radius: 999px;
    background: var(--mph-accent);
    color: var(--mph-ink);
    border: 2px solid var(--mph-ink);
    font-size: .9rem;
    font-weight: 800;
    text-decoration: none;
    box-shadow: 3px 3px 0 var(--mph-ink);
  }
  .mph-clean-btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: .75em 1.5em;
    border-radius: 999px;
    background: var(--mph-surface, #fff);
    color: var(--mph-ink);
    border: 2px solid var(--mph-ink);
    font-size: .9rem;
    font-weight: 800;
    text-decoration: none;
    box-shadow: 3px 3px 0 var(--mph-ink);
  }

  .mph-desktop-emoji-slot {
    display: none;
  }
  .mph-mobile-emoji-slot {
    display: block;
    width: 100%;
    margin-top: 1rem;
  }

  .mph-emoji-stage {
    position: relative;
    width: 100%;
  }
  .mph-emoji-card {
    padding: 1.25rem 1.25rem;
    border-radius: 1.25rem;
  }
  .mph-emoji-wrap {
    width: 4.8rem;
    height: 4.8rem;
    margin: 1rem 0 .6rem 0;
  }
  .mph-main-emoji {
    font-size: 2.8rem;
  }

  .mph-bubble {
    left: 5%;
    right: 5%;
    top: -3.2rem;
    margin: 0 auto;
    padding: .6rem 1rem;
    font-size: .8rem;
    text-align: center;
    transform-origin: 50% 100%;
    transform: scale(0) translateY(10px);
  }
  .mph-bubble[data-on="true"] {
    transform: scale(1) translateY(0);
  }

  .mph-services {
    position: relative;
    left: auto;
    right: auto;
    bottom: auto;
    top: auto;
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    margin: .5rem 0 0 0;
    padding: 0;
    list-style: none;
  }
  .mph-services li {
    font-size: .75rem;
    font-weight: 700;
    padding: .35rem .85rem;
    border-radius: 999px;
    border: 1.5px solid var(--mph-ink);
    background: var(--mph-surface, #fff);
  }
  .mph-services li::after {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce){
  .mph-root *,.mph-root *::after{animation:none!important;transition:none!important;}
}
`

/* ------------------------------------------------------------- component */

const DEFAULT_SERVICES = [
  "Full-Stack Web Development",
  "Applied AI & Computer Vision",
  "FastAPI & Node.js Backend",
  "Cloudflare Edge Infrastructure",
]

const DEFAULT_EMOJIS = ["👨‍💻", "👋", "🚀", "⚡", "🤖", "✨"]

const DEFAULT_GREETINGS = [
  "Hi, I'm Shreeharsha N. L.!",
  "B.E. Information Science @ NIE Mysuru.",
  "Winner of NeoNexus 36.1 Hackathon at BITM Ballari!",
  "Building practical software & AI systems.",
  "Check out my projects below ↓",
  "Okay, you can stop poking me :)",
]

export default function MascotPortfolioHero({
  height = "calc(100svh - 4rem)",
  minHeight = "620px",
  headline,
  description,
  index = "08/27",
  discipline = "Full-Stack & AI",
  tagline = "NIE Mysuru · CGPA 8.65",
  collection = ["NeoNexus", "Winner"],
  reel = ["NIE Mysuru @ 2027", "Information Science"],
  href,
  services = DEFAULT_SERVICES,
  emojis = DEFAULT_EMOJIS,
  greetings = DEFAULT_GREETINGS,
  accent = "#5fb57a",
  paper = "#ebebea",
  ink = "#111111",
  className,
}: MascotPortfolioHeroProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const cardRef = React.useRef<HTMLButtonElement>(null)
  const mobileCardRef = React.useRef<HTMLButtonElement>(null)
  const emojiRef = React.useRef<HTMLDivElement>(null)
  const mobileEmojiRef = React.useRef<HTMLDivElement>(null)

  const [happy, setHappy] = React.useState(false)
  const [said, setSaid] = React.useState(0)
  const [emojiIndex, setEmojiIndex] = React.useState(0)
  const happyTimer = React.useRef<number | undefined>(undefined)

  const poke = () => {
    setSaid((n) => (n + 1) % Math.max(1, greetings.length))
    setEmojiIndex((i) => (i + 1) % Math.max(1, emojis.length))
    setHappy(true)
    window.clearTimeout(happyTimer.current)
    happyTimer.current = window.setTimeout(() => setHappy(false), 2400)
  }

  React.useEffect(() => () => window.clearTimeout(happyTimer.current), [])

  /* Real-time smooth mouse-tracking parallax */
  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    let still = mq.matches
    const onMq = () => (still = mq.matches)
    mq.addEventListener("change", onMq)

    let px = 0
    let py = 0
    let lastMove = -1e9
    let gx = 0
    let gy = 0
    let near = 0
    let prev = performance.now()
    let raf = 0
    let visible = true

    const onMove = (e: PointerEvent) => {
      px = e.clientX
      py = e.clientY
      lastMove = performance.now()
    }
    const onLeave = () => (lastMove = -1e9)
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    window.addEventListener("blur", onLeave)

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (!visible) return
      const dt = Math.min(0.05, (now - prev) / 1000)
      prev = now

      const isMobile = window.innerWidth < 1024
      const targetEl = isMobile ? mobileCardRef.current : cardRef.current
      if (!targetEl) return

      const r = targetEl.getBoundingClientRect()
      const cx = r.left + r.width * 0.5
      const cy = r.top + r.height * 0.5
      let tx = 0
      let ty = 0
      let tn = 0
      const idle = now - lastMove > 3500
      if (!idle) {
        const reach = Math.max(innerWidth, innerHeight)
        ;[tx, ty] = aim(px, py, cx, cy, reach * 0.35, reach * 0.3)
        const dist = Math.hypot(px - cx, py - cy)
        tn = Math.max(0, 1 - dist / (r.width * 1.5))
      } else if (!still) {
        const t = now / 1000
        tx = Math.sin(t * 0.6) * 0.4
        ty = Math.cos(t * 0.5) * 0.25
      }

      const rate = still ? 30 : 8
      gx = approach(gx, tx, dt, rate)
      gy = approach(gy, ty, dt, rate)
      near = approach(near, tn, dt, 8)

      const breathe = still ? 0 : Math.sin(now / 550) * 2.5

      // Apply 3D perspective to card and inner emoji
      const applyCardTransform = (el: HTMLButtonElement | null, eEl: HTMLDivElement | null) => {
        if (!el) return
        const rotY = (gx * 14).toFixed(2)
        const rotX = (-gy * 12).toFixed(2)
        const transX = (gx * 8).toFixed(2)
        const transY = (gy * 6 + breathe * 0.6).toFixed(2)
        el.style.transform = `perspective(800px) rotateY(${rotY}deg) rotateX(${rotX}deg) translate3d(${transX}px, ${transY}px, 0)`

        if (eEl) {
          const eRot = (gx * 16).toFixed(2)
          const eX = (gx * 14).toFixed(2)
          const eY = (gy * 12).toFixed(2)
          const eScale = (1 + near * 0.12).toFixed(3)
          eEl.style.transform = `translate3d(${eX}px, ${eY}px, 20px) rotate(${eRot}deg) scale(${eScale})`
        }
      }

      if (isMobile) {
        applyCardTransform(mobileCardRef.current, mobileEmojiRef.current)
      } else {
        applyCardTransform(cardRef.current, emojiRef.current)
      }
    }
    raf = requestAnimationFrame(frame)

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      prev = performance.now()
    })
    io.observe(root)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      mq.removeEventListener("change", onMq)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      window.removeEventListener("blur", onLeave)
    }
  }, [])

  const greeting = greetings[said % greetings.length]
  const currentEmoji = emojis[emojiIndex % emojis.length]

  const vars = {
    "--mph-accent": accent,
    "--mph-paper": paper,
    "--mph-ink": ink,
    "--mph-surface": paper === "#0b0c10" || paper === "#0a0c10" || paper === "#0c0d12" ? "#15171f" : "#ffffff",
    "--mph-sans": SANS_STACK,
    "--mph-display": DISPLAY_STACK,
    "--mph-height": height,
    "--mph-min-height": minHeight,
  } as React.CSSProperties

  const renderEmojiCard = (
    cRef: React.RefObject<HTMLButtonElement>,
    eRef: React.RefObject<HTMLDivElement>
  ) => (
    <div className="mph-emoji-stage">
      <div className="mph-bubble" data-on={happy ? "true" : "false"} aria-live="polite">
        <span>{greeting}</span>
      </div>

      <button
        ref={cRef}
        type="button"
        className={"mph-emoji-card" + (happy ? " mph-happy" : "")}
        onClick={poke}
        aria-label="Click to poke developer emoji for a greeting"
      >
        <div className="mph-emoji-status">
          <span className="mph-live-dot" aria-hidden="true" />
          <span className="mph-status-text">NIE Mysuru &apos;27</span>
        </div>

        <div ref={eRef} className="mph-emoji-wrap">
          <span className="mph-main-emoji" role="img" aria-label="Interactive developer emoji">
            {currentEmoji}
          </span>
        </div>

        <div className="mph-emoji-meta">
          <span className="mph-emoji-role">Full-Stack &amp; AI</span>
          <span className="mph-emoji-hint">Click to poke me! ✨</span>
        </div>
      </button>
    </div>
  )

  return (
    <div ref={rootRef} className={"mph-root" + (className ? " " + className : "")} style={vars}>
      <style>{CSS}</style>

      {/* Background Architectural Grid Lines */}
      <svg className="mph-room" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.13">
          {ROOM.back.map((s, i) => (
            <line key={"b" + i} x1={s[0]} y1={s[1]} x2={s[2]} y2={s[3]} />
          ))}
          {ROOM.rays.map((s, i) => (
            <line key={"r" + i} x1={s[0]} y1={s[1]} x2={s[2]} y2={s[3]} />
          ))}
          {ROOM.depth.map((d, i) => (
            <path key={"d" + i} d={d} />
          ))}
        </g>
      </svg>

      <div className="mph-stage">
        {/* Top Header Bar */}
        <header className="mph-top">
          <span className="mph-index">
            <b>{index}</b>
            <span>{discipline}</span>
          </span>
          <span className="mph-tagline">{tagline}</span>
          <span className="mph-brace">
            {"{"}
            {collection[0]}/{collection[1]}
            {"}"}
          </span>
          <span className="mph-reel">
            <i aria-hidden="true" />
            <span>
              {reel[0]}
              <br />
              {reel[1]}
            </span>
          </span>
        </header>

        {/* Clean Hero Layout (Left Column on Desktop) */}
        <div className="mph-clean-box">
          <h1 className="mph-clean-h1">
            <span>{headline ?? "Hi, I'm Shreeharsha."}</span>
            <span className="mph-wave-emoji" aria-hidden="true">👋</span>
          </h1>
          {description && <p className="mph-clean-desc">{description}</p>}
          <div className="mph-clean-actions">
            <a href={href ?? "#projects"} className="mph-clean-btn-primary">
              <span>View Projects</span>
              <span aria-hidden="true">→</span>
            </a>
            <a href="#contact" className="mph-clean-btn-secondary">
              <span>Get In Touch</span>
            </a>
          </div>

          {/* Mobile Natural Flow Emoji Card Slot */}
          <div className="mph-mobile-emoji-slot">
            {renderEmojiCard(mobileCardRef, mobileEmojiRef)}
          </div>
        </div>

        {/* Desktop Interactive Emoji Card Slot (Right Column on Desktop) */}
        <div className="mph-desktop-emoji-slot">
          {renderEmojiCard(cardRef, emojiRef)}
        </div>

        {/* Bottom Services Banner */}
        <ul className="mph-services">
          {services.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
