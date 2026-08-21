# Workflow

**Update this file before every `git commit`** — keep the sections below current
so a fresh session (or a compacted one) can pick up the project without
re-deriving it from the diff history.

# Project

Marketing/booking site for Bergur Rønne Moberg — a Faroese literature scholar
(lektor, Københavns Universitet) and public speaker. One-page Next.js site,
deployed on Vercel (project `bergur`, team `tobias-projects8`), auto-deploys
from `main` via the GitHub integration — every push goes live within ~30s,
no manual deploy step.

Stack: Next.js 16 (App Router, Turbopack), Tailwind CSS v4, Sanity CMS
(`next-sanity`, optional — every section falls back to a hardcoded default
if Sanity has no content or isn't configured), Framer Motion for scroll/mount
animations, React Three Fiber + drei for the 3D book covers.

## Design system

- Colors (see `src/app/globals.css` `:root`): navy background `#0a1628`,
  cream text `#f5f0eb`, muted blue accent `#2d5f8a`. Warm, not cold-tech.
- Fonts: Fraunces (serif, headings, italic) + Inter (sans, body), loaded via
  `next/font/google` in `layout.tsx`. Was briefly a plain `Times New Roman`/
  Calibri system stack to deliberately avoid an "AI/agency-made" look — that
  constraint was explicitly relaxed later in favor of a more confident,
  premium feel (competitor comparison showed plain system fonts read as
  less authoritative). If asked to make it look hand-made/non-AI again,
  revisit this trade-off with the user rather than silently reverting.
- Copy tone: literary, human, restrained. No emoji, no marketing buzzwords
  ("transformativ," "unik oplevelse"), no superlatives. Em dashes over
  hyphens. Read like the back of a good book, not a SaaS landing page.
- Faroese flag colors (`--faroe-gradient` in globals.css: white/blue/red/
  blue/white) are used ONLY as thin accents — section dividers, a hero edge
  strip, the scroll-progress bar, the booking submit button, footer top
  border. Never as a large fill. Treat it as a hint, not a flag.
- Buttons: `rounded-md` (flat-ish corners), never fully round. Sections use
  generous padding (`py-32`, ~128px) — the design should "breathe."
- **No autoplay `<video>` backgrounds anywhere on the site.** Use static
  images with the `.ken-burns` CSS class (globals.css — slow infinite-
  alternate scale, no JS/decode dependency) for subtle motion instead. See
  "Known gotchas" below for why.

## Section order (`src/app/page.tsx`)

Header → Hero → EventBar → Intro (trust bar + sticky `SubNav`) → About →
FaroeDivider → Foredrag (benefit boxes + 3 full-viewport talk pages) →
FaroeDivider → HeinesenProject → Books (3D covers) → Booking → Footer.

`SubNav` (`src/components/SubNav.tsx`) is a `position: sticky` link bar
(Om Bergur / Foredrag / Heinesen-hulen / Bøger) that stays pinned while
scrolling — it replaced an earlier passive single-word crossfade
(`KeywordCycle.tsx`, now deleted) that was purely decorative. Modeled on
naujalynge.dk's sticky topic nav, which is functional wayfinding, not
just ambience.

**SocialProof is currently NOT rendered** (commented out of `page.tsx`) —
see "Placeholder content" below.

## Known gotchas (learned the hard way — see commit history)

- **R3F multi-material meshes**: giving a `<mesh>` several bare
  `<meshStandardMaterial>` children does NOT create a material array — each
  one silently overwrites `mesh.material`, so only the last applies. Use
  `attach="material-0"` through `"material-5"` explicitly (see
  `three/BookCover.tsx`). This is what caused the book covers to render
  solid black.
- **Mutating a hook's return value** (e.g. `texture.colorSpace = ...` on a
  `useTexture()` result) is blocked by this project's eslint
  (`react-hooks/immutability`), even inside a `useEffect`. Clone the object
  in a `useMemo` and mutate the clone instead.
- **SSR-safe browser feature detection** (WebGL support, `pointer: fine`,
  etc.) uses `useSyncExternalStore` with a `getServerSnapshot` returning the
  safe default, not `useState` + `setState` in a `useEffect` (that trips
  `react-hooks/set-state-in-effect`). Give `subscribe` an explicit
  `setTimeout(callback, 0)` kick so the real client value is guaranteed to
  apply after mount.
- **Autoplay `<video>` backgrounds are unreliable in this deployment and
  must not be reintroduced.** Two separate dynamic hero-background attempts
  failed silently: first a WebGL ocean shader, then a real `<video>`. Once
  browser automation became available, this was confirmed directly — a
  live-page JS check showed `video.readyState: 0`, `paused: true`, and the
  video never issued a network request at all, on all three `<video>`
  elements the page had (hero + two Foredrag talks). Server-side was
  provably correct (proper `Accept-Ranges`, 206 on range requests, standard
  H.264 High-profile encode) — this is a client-side autoplay failure, not
  a hosting/encoding issue, and it matched the user's own independent
  real-browser report. All three were replaced with static images + the
  `.ken-burns` CSS zoom. If motion is wanted again, it must be verified to
  actually render (screenshot it, don't assume) before shipping — see next
  point.
- **Browser automation (claude-in-chrome) may or may not be connected in
  any given session** — check before claiming to have visually verified
  something. When it's not connected, verify via `tsc --noEmit`, `eslint`,
  and `next dev` + `curl`/grep on rendered HTML, and say explicitly that
  visual/interactive behavior wasn't confirmed. When it IS connected, prefer
  it over guessing — a real buyer-journey walkthrough (see the audit that
  produced the video-autoplay finding above) catches things static analysis
  cannot, e.g. `<video>` elements that render correct markup but never
  actually play.

## Placeholder content still needing real material

- **Testimonials**: `SocialProof.tsx` still exists but is intentionally not
  rendered in `page.tsx` (was showing raw `"[Indsæt citat fra arrangør
  her]"` bracket placeholders live to real visitors — a live buyer-journey
  audit flagged this as the single most trust-damaging thing on the site).
  Re-enable by importing and rendering `<SocialProof testimonials={...} />`
  again once real quotes with names/orgs are available. Don't ship
  bracketed placeholder text live again for any section.
- Booking price now reads "Kontakt for pris og tilgængelighed" (was a
  literal `[XX.000 kr.]` bracket) — matches the category norm (the
  competitor site doesn't list a number either). Swap in a real number in
  `Booking.tsx` if/when the user wants pricing shown publicly.
- The "Download foredragsbeskrivelse (PDF)" link (`Foredrag.tsx`, currently
  `href="#"`) needs a real asset.
- Footer email is displayed as-is; confirm the domain is actually live
  before treating it as a working contact address.

## Competitive reference

naujalynge.dk (Nauja Lynge — Greenland/Arctic speaker, same "Nordic
identity public speaker" niche) is the explicit design reference for this
site and is worth re-checking when making structural decisions. Patterns
borrowed from it: sticky topic nav (see `SubNav` above), static hero
photography over video/WebGL. Patterns considered and explicitly rejected
by the user: switching the full-viewport cinematic Foredrag section to a
compact scannable grid (naujalynge's approach) — user wants to keep the
cinematic version.

@AGENTS.md
