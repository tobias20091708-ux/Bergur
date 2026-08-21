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
  **`--accent` (`#2d5f8a`) fails WCAG AA as a text color on `--background`**
  (~2.7:1) — it exists for fills only (buttons, borders). Use
  `--accent-text` (`#7fb2db`, ~8:1) / `text-accent-text` for any text use:
  eyebrows, inline links, small labels. Don't reintroduce `text-accent` on
  small/thin text — a full sitewide pass fixed this once already.
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
- Anchor navigation: `section[id]` has `scroll-margin-top: var(--header-height)`
  and `html` has `scroll-behavior: smooth` (guarded by
  `prefers-reduced-motion`) — required once `Header` became `sticky`, or
  every `#anchor` link lands underneath it. If the header's height changes,
  update `--header-height` in `globals.css` to match.

## Section order (`src/app/page.tsx`)

Header → Hero → EventBar → About → FaroeDivider → Foredrag (benefit boxes +
3 full-viewport talk pages) → FaroeDivider → HeinesenProject → Books →
Booking → Footer.

`Intro.tsx` and `SubNav.tsx` were removed — they duplicated `Header`'s
navigation and the credibility facts now live directly in `Hero` (as a
facts row, sourced from the same `introBadges` Sanity field `Intro` used
to consume). `Header` itself is the single sticky nav now: transparent
over the hero, solid on scroll, active-section highlighting via
`IntersectionObserver`, and a mobile hamburger menu — all client-side
(`useSyncExternalStore`, same convention as `CursorSpotlight`/`Countdown`).

**SocialProof is currently NOT rendered** (commented out of `page.tsx`) —
see "Placeholder content" below.

### Talk → booking topic prefill

`src/lib/topicStore.ts` is a tiny module-level `useSyncExternalStore`
store (`setTopic`/`subscribe`/`getSnapshot`) — clicking a `TalkCTA`
(Foredrag talks, and the Heinesen-hulen "Book foredrag" CTA) calls
`setTopic(slug)` before the anchor jumps to `#book`; `Booking.tsx` reads it
via `useSyncExternalStore` and uses it as the controlled `<select>` value
(with a local override once the visitor changes it manually). Chosen over
`?topic=slug#book` (full page reload for a same-page link) or
`useSearchParams` (forces a Suspense boundary / de-opts the page from
static rendering) — see CLAUDE.md history / the SEO section below for why
static rendering matters here. Slugs must match the `<option value>`s in
`Booking.tsx` exactly: `kolde-oer-blev-cool`, `to-kulturikoner`,
`verdens-mest-oversete-forfatter`, `heinesen-hulen`.

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
- **SSR-safe browser feature detection / external state** (WebGL support,
  `pointer: fine`, scroll position, `IntersectionObserver` results, the
  topic-prefill store, etc.) uses `useSyncExternalStore` with a
  `getServerSnapshot` returning the safe default, not `useState` + setState
  in a `useEffect` (that trips `react-hooks/set-state-in-effect`). Give
  `subscribe` an explicit `setTimeout(callback, 0)` kick where there's no
  natural event to resync on, so the real client value is guaranteed to
  apply after mount. `Header`'s scroll/active-section hooks and
  `topicStore` both follow this pattern — copy them rather than reaching
  for `useEffect` + `useState` for anything else "browser-only."
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
  actually play. **`resize_window` in this tool has not reliably changed
  the actual rendered viewport in every session** (confirmed once via
  `window.innerWidth` staying at the desktop value after a "successful"
  resize to 390px) — verify with a `javascript_tool` read of
  `window.innerWidth` after resizing before trusting a "mobile" screenshot;
  if it didn't take effect, say so rather than presenting a desktop
  screenshot as mobile verification.
- **The `bis_skin_checked`/`bis_register` hydration-mismatch warning and a
  `"Cannot read properties of undefined (reading 'M_ID')"` runtime error
  from a `chrome-extension://` stack frame are both known false positives**
  from a Bitdefender-style browser extension injecting attributes into the
  DOM before React hydrates — not app bugs. Confirm the stack trace/diff
  points at a `chrome-extension://` origin (or a `bis_*` attribute) before
  spending time chasing either.

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
- The "Download foredragsbeskrivelse (PDF)" link in `Foredrag.tsx` was
  **removed** (was `href="#"`, a dead link, and no PDF asset exists). Add
  it back only once a real PDF exists — don't ship a dead/fake download
  link again.
- **Heinesen-hulen rendering**: `HeinesenProject.tsx` has an explicit
  `TODO` comment marking where the real architectural rendering from
  Henning Larsen Arkitekter goes once available. Until then it shows an
  editorial placeholder (icon + label) over an atmospheric photo of the
  actual Faroese sea cliffs (`/foredrag/verdens-mest-oversete.jpg`) — that
  photo is real scenery, not a stand-in for the rendering; don't let it be
  mistaken for one in copy.
- **Books**: "Ultraminor World Literatures" and "Resten i Vesten" are
  shown as typographic cards (title + role only, no cover image, no buy
  link) because no cover art or purchase link exists for them yet — see
  `TYPOGRAPHIC_BOOKS` in `Books.tsx`. Swap in a real cover + `buyUrl` and
  move them into `BOOKS` (the 3D-cover list) once available; don't invent
  a publisher or link in the meantime.
- Footer email is displayed as-is; confirm the domain is actually live
  before treating it as a working contact address.

## SEO

- **This site has exactly two routes: `/` and `/studio/[[...tool]]`.** No
  `/om-bergur`, `/foredrag`, `/heinesen-hulen`, `/boger`, or `/kontakt` —
  those are anchor sections (`#om-bergur` etc.) within the single page, not
  separate routes. An SEO brief assumed these were 5 real pages and that
  their 404s were "broken links to fix" — they weren't broken links, the
  brief's premise was just wrong. If a future brief/tool assumes a
  multi-page structure, check this before implementing anything against it.
- `src/app/robots.ts` and `src/app/sitemap.ts` use Next's native Metadata
  API routes (not the `next-sitemap` package — unnecessary dependency for
  a single real URL). `/studio` is disallowed in robots.txt and already
  has `robots: { index: false, follow: false }` in its own layout metadata.
- `layout.tsx` sets `metadataBase`, `alternates.canonical`, and `openGraph`.
  The canonical tag also covers a real duplicate-content issue: three
  Vercel domains (`bergur.vercel.app`,
  `bergur-tobias-projects8.vercel.app`,
  `bergur-git-main-tobias-projects8.vercel.app`) all serve identical
  content — canonical always points at the primary domain regardless of
  which alias served the request.
- **All images use `next/image`**, not raw `<img>` — this was the actual
  Core Web Vitals fix, not 3D loading (the 3D book covers were already
  lazy/deferred/below-fold and not a plausible LCP cause). The site's
  images were up to 1.8MB unoptimized JPEGs; `next/image` cuts real
  transferred bytes by ~89% via responsive `srcset` + automatic
  AVIF/WebP — verified directly (996KB → 105KB, 1.5MB → 168KB at typical
  render widths). `HeroPortrait.tsx` combines this with Framer Motion by
  animating a wrapping `motion.div` rather than trying to animate the
  `Image` component directly. When adding new images, always use
  `next/image` (`fill` + a `relative`+sized parent for cover-style
  backgrounds) from the start.
- **The page stays server-rendered where the copy/SEO text lives.**
  `Header`, `TalkCTA`, and `Booking` are `"use client"` because they need
  real interactivity (scroll state, topic store, form state), but `Hero`,
  `About`, `Foredrag`, `HeinesenProject`, and `Books` stay server
  components so their copy ships in the initial HTML — only client *leaves*
  (`TalkCTA`, `HeroPortrait`) are extracted where interactivity is
  actually needed. Don't convert a whole content section to `"use client"`
  just to add one interactive CTA inside it.

## Competitive reference

naujalynge.dk (Nauja Lynge — Greenland/Arctic speaker, same "Nordic
identity public speaker" niche) is the explicit design reference for this
site and is worth re-checking when making structural decisions. Patterns
borrowed from it: a sticky nav bar, static hero photography over
video/WebGL, scroll-spy active-link highlighting. Patterns considered and
explicitly rejected by the user: switching the full-viewport cinematic
Foredrag section to a compact scannable grid (naujalynge's approach) — user
wants to keep the cinematic version.

@AGENTS.md
