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
- Body-copy readability (2026-10): Tailwind's `--leading-relaxed` token is
  overridden to `1.75` in `globals.css`'s `@theme inline` block (was the
  default 1.625) — this bumps every existing `leading-relaxed` use
  site-wide to meet a ≥1.7 line-height minimum on dark background, so
  don't also hand-roll `leading-[1.7]` where `leading-relaxed` already
  applies. Long body paragraphs additionally get `max-w-[68ch]` to cap
  line length for readability.
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

Header → Hero → EventBar → About → SocialProof → FaroeDivider → Foredrag
(benefit boxes + featured talk + 3 talk cards + topic list) →
FaroeDivider → HeinesenProject → Books → Booking → Footer.

**2026-10 CRO pass — three earlier decisions deliberately reversed** (the
user supplied a detailed Danish conversion-optimization brief and asked
for exactly these changes; recorded here so a later session doesn't
"fix" them back):
- **Foredrag is no longer 3 full-viewport cinematic talk pages.** It's now
  a benefits strip + a featured card ("Det kulturelle rigsfællesskab",
  accent border + "Nyt" badge) + the 3 existing talks as comparable
  `sm:grid-cols-3` cards (thumbnail, 1–2 sentence teaser, native
  `<details>` "Læs mere" for the full paragraphs, duration + audience
  tags, "Forespørg" CTA) + an "Alle foredragsemner" tag list. The
  "Competitive reference" section below previously said the user wanted
  to *keep* the cinematic version — that preference is superseded by this
  brief. If asked to go cinematic again, confirm with the user first;
  don't silently pick one.
- **Bracketed placeholder content is back, deliberately, in three
  places**: `SocialProof` testimonials (quote text itself is bracketed,
  not just name/org), the price line above the Foredrag cards ("Fra
  `[X.000]` kr."), and `EventBar`'s November/December slots. The
  "Placeholder content" section below previously said never to ship
  bracketed text live again — the user's brief explicitly asked for
  `[brackets]` as the marker for missing data this time, so follow that
  instead. Swap in real values as they're collected; don't remove the
  bracket convention without asking.
- **`SocialProof` is rendered again**, directly after `About`, fed by
  `getTestimonials()` with the bracketed defaults as fallback when Sanity
  has nothing. Star rating (★★★★★) was dropped — it implied real reviews
  next to text that says `[Indsæt citat...]`.

`Intro.tsx` and `SubNav.tsx` were removed — they duplicated `Header`'s
navigation and the credibility facts now live directly in `Hero` (as a
facts row, sourced from the same `introBadges` Sanity field `Intro` used
to consume). `Header` itself is the single nav now: transparent over the
hero, solid on scroll, active-section highlighting via
`IntersectionObserver`, and a mobile hamburger menu — all client-side
(`useSyncExternalStore`, same convention as `CursorSpotlight`/`topicStore`).

**2026-10 header/hero layout pass** (user asked to see it visualized as an
Artifact mockup first, then said "fortsæt" to build it in): `Header`'s nav
is deliberately down to 3 items — `LINKS` now holds only `Om Bergur` and
`Bøger` (bold, `text-[17px]`), plus a separate filled `Kontakt` button
(`href="#book"`, not part of `LINKS`/`LINK_IDS`). `Foredrag` and
`Heinesen-hulen` were dropped from the nav bar itself — both sections
still exist and are still reachable (scrolling, `Hero`'s "Se foredrag"
CTA, `TalkCTA`s) — only the top-nav entries were removed. If asked to put
them back in the header, that's additive and fine; don't reinterpret it
as a sign the sections themselves should return to nav-less obscurity or
vice versa without asking which is meant.
`Hero` is left-aligned now (was centered): eyebrow → `h1` tagline (same
serif italic as before) → a bold sans subheading stating what he does
(talks + books) → a smaller/lighter supporting paragraph → the facts row
as pill badges (`rounded-full border bg-white/10`, was a plain
dot-separated list) → the two CTAs, all inside a `max-w-xl` block sitting
left within the same `max-w-6xl` container the rest of the page uses, so
it lines up with `Header`'s and other sections' left edge. `HeroPortrait`
is **not rendered in `Hero` any more** — removed "for now" per the user,
not deleted (`HeroPortrait.tsx` still exists, orphaned, for when the
portrait comes back; don't delete the file on sight of it being unused).

- **`Header` is `position: fixed`, not `sticky`.** `sticky` is in normal
  flow — it pushes `Hero` down by the header's height, so the "transparent
  over hero" look breaks: you get a solid dark band at the top instead of
  the hero photo showing through. `fixed` removes it from flow so `Hero`
  starts at the true top of the page and the header floats over it; the
  `scrolled`-state background swap still works the same way. If `Header`
  ever needs to reserve real layout space again, that's a deliberate
  trade-off to re-discuss, not a silent revert to `sticky`.
- `useActiveSection`'s `ids` array must be a **stable reference**
  (`LINK_IDS`, hoisted to module scope) — passing `LINKS.map(l => l.id)`
  inline recreates the array every render, which resets the
  `useSyncExternalStore` subscription (and re-creates the
  `IntersectionObserver`) on every render instead of once on mount.
- `Hero`'s content layer is `absolute inset-0` (not a normal-flow child
  with its own `min-h-screen` + large padding) so it's always exactly the
  section's height — nesting two independent `min-h-screen`s (section +
  inner flex div) plus padding made the content taller than the viewport,
  clipping the CTAs and scroll cue below the fold on real screen heights.
  As of the 2026-10 layout pass the content block is left-aligned, not
  centered (`flex items-center` for vertical centering only, content sits
  in a `max-w-xl` block inside a `mx-auto max-w-6xl` wrapper rather than a
  centered `items-center` column) — the scroll cue `<a>` stays a separate
  absolutely-positioned sibling so it's still centered at the bottom
  regardless of the content's alignment. If you add content to the hero,
  check it still fits at ~800px viewport height before shipping.

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
static rendering matters here.

Topic slugs and their Danish labels live in one place,
`src/lib/topics.ts` (`TOPIC_LABELS`) — imported by `Booking.tsx` (dropdown
+ mailto/API subject line) and `src/app/api/booking/route.ts` (email body).
`Foredrag.tsx`'s `TalkCTA` slugs and `HeinesenProject.tsx`'s are plain
string literals that must match these keys exactly; a slug added to one
place must be added to all three. Current slugs:
`det-kulturelle-rigsfaellesskab`, `kolde-oer-blev-cool`,
`to-kulturikoner`, `verdens-mest-oversete-forfatter`, `heinesen-hulen`.

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
  (`Countdown.tsx`, an earlier example of this pattern, was deleted in the
  2026-10 CRO pass — it counted down to a hardcoded date that had already
  passed, which silently rendered as an empty `()` in `EventBar`. If you
  need a countdown again, compute the target date dynamically or source it
  from Sanity, not a hardcoded literal.)
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

- **Testimonials**: `SocialProof.tsx` is rendered again (directly after
  `About`), deliberately showing bracketed placeholder quotes — see the
  "2026-10 CRO pass" note under Section order above for why this reverses
  an earlier decision. Content lives in `DEFAULT_TESTIMONIALS` in
  `SocialProof.tsx`, used as a fallback when `getTestimonials()` returns
  nothing from Sanity. Swap in real quotes/names/orgs (the `testimonial`
  schema now has a `role` field too) as they're collected, keeping the
  `[bracket]` convention for whatever's still missing.
- **Foredrag price line** ("Fra `[X.000]` kr. ekskl. moms og transport",
  above the talk cards in `Foredrag.tsx`) and **EventBar's
  November/December slots** are bracketed placeholders — same CRO-brief
  convention. Swap in real figures/bookings as they're confirmed.
- **`Booking.tsx` now has a real backend**: `src/app/api/booking/route.ts`
  sends the enquiry via the Resend REST API (plain `fetch`, no SDK
  dependency) to `kontakt@bergurmoberg.dk` with `reply_to` set to the
  visitor's email, and includes a hidden honeypot field
  (`website`) to filter bots. **This requires a `RESEND_API_KEY`
  environment variable in Vercel, which is not set yet** — until it is,
  the route returns 503 and the client falls back to the old
  `mailto:` flow (opens the visitor's mail client, shows which happened
  honestly rather than claiming success either way). To finish wiring
  this up: create a Resend account, verify the sending domain
  (`bergurmoberg.dk` — confirm it's actually live first, see Footer note
  below), add `RESEND_API_KEY` (and optionally `RESEND_FROM_EMAIL`, which
  defaults to `booking@bergurmoberg.dk`) to the `bergur` Vercel project's
  environment variables, then redeploy. Don't reintroduce a fake "we got
  it" success message for either path — the success panel only shows
  after a real 2xx from `/api/booking`.
- The "Download foredragsbeskrivelse (PDF)" link in `Foredrag.tsx` was
  **removed** (was `href="#"`, a dead link, and no PDF asset exists) — each
  talk has a single `TalkCTA` ("Forespørg på dette foredrag") instead of a
  second dead/redundant link. Add a PDF CTA back only once a real PDF
  exists per talk.
- **Heinesen-hulen rendering**: `HeinesenProject.tsx` has an explicit
  `TODO` comment marking where the real architectural rendering from
  Henning Larsen Arkitekter goes once available. Until then it shows an
  editorial placeholder (icon + "Visualisering kommer snart") over an
  atmospheric photo of Risin og Kellingin, the actual Faroese sea stacks
  off Eysturoy (`/foredrag/verdens-mest-oversete.jpg`) — that photo is
  real scenery, not a stand-in for the rendering; don't let it be mistaken
  for one in copy.
- **Pressekit**: `Booking.tsx` shows a disabled "Download pressekit
  (billeder + CV) — Kommer snart" button (not a dead `href="#"` link —
  that pattern was removed once already, see the Foredragsbeskrivelse
  note below). Wire it to a real PDF once one exists.
- **"Se Bergur fortælle" video**: `Booking.tsx` shows a static
  "Video kommer snart" placeholder box above the form — no `<video>`
  element, no autoplay (see "No autoplay `<video>` backgrounds" in the
  design system section above for why). Replace with a real YouTube/Vimeo
  embed once footage exists.
- **Books**: "Ultraminor World Literatures" and "Resten i Vesten" have no
  cover art or purchase link, so they're not rendered — `TYPOGRAPHIC_BOOKS`
  in `Books.tsx` still holds their data (title + role, no image/buyUrl)
  but the section that rendered them as typographic cards was removed in
  the 2026-10 CRO pass ("hide empty book slots" was explicit in the
  brief). Swap in a real cover + `buyUrl`, move them into `BOOKS` (the
  3D-cover list), and re-add the render block once available; don't
  invent a publisher or link in the meantime.
  **Also unresolved**: `About.tsx`'s `DEFAULT_FACTS` credits David
  Damrosch as co-author of *Ultraminor World Literatures* (2022);
  `TYPOGRAPHIC_BOOKS` (before it was hidden) credited him on *Resten i
  Vesten* instead. One of these is wrong — confirm with the user which
  book he actually co-authored before either is shown/changed again.
- Footer email is displayed as-is (also a clickable `mailto:` link).
  **Confirmed 2026-10: `bergurmoberg.dk` has no MX, A, or NS records at
  all** (`dig MX/A/NS bergurmoberg.dk` all return empty) — the domain
  currently cannot receive mail by any path, `mailto:` or the
  `/api/booking` Resend route alike. This has to be fixed (register/point
  DNS, or use a different contact address) before the booking form can
  actually deliver enquiries anywhere.

## SEO

- **This site has exactly two routes: `/` and `/studio/[[...tool]]`.** No
  `/om-bergur`, `/foredrag`, `/heinesen-hulen`, `/boger`, or `/kontakt` —
  those are anchor sections (`#om-bergur` etc.) within the single page, not
  separate routes. An SEO brief assumed these were 5 real pages and that
  their 404s were "broken links to fix" — they weren't broken links, the
  brief's premise was just wrong. If a future brief/tool assumes a
  multi-page structure, check this before implementing anything against it.
  (Re-confirmed: a second SEO pass in 2026 kept the one-page architecture
  deliberately and only improved metadata/content depth within it.)
- `src/app/robots.ts` and `src/app/sitemap.ts` use Next's native Metadata
  API routes (not the `next-sitemap` package — unnecessary dependency for
  a single real URL). `/studio` is disallowed in robots.txt and already
  has `robots: { index: false, follow: false }` in its own layout metadata.
- `layout.tsx` sets `metadataBase`, `alternates.canonical`, `openGraph`,
  `twitter` (card `summary_large_image`), and a `ProfilePage` + `Person`
  JSON-LD block (rendered as an inline `<script type="application/ld+json">`
  in the body). The JSON-LD only states facts that are verifiable and
  correspond to visible page content/links: KU affiliation, `knowsAbout`
  topics (William Heinesen, Jørgen-Frantz Jacobsen, færøsk/nordisk
  litteratur), and `sameAs` limited to the KU research profile and Danske
  Taler page. Don't add unverified facts (ORCID, exact current title,
  grants) to the JSON-LD — link to the KU profile instead when unsure.
- **OG/Twitter share image**: `public/og/bergur-roenne-moberg.jpg`
  (1200×630, generated by `scripts/gen_og_image.py` from the existing sea
  background + headshot photos via Pillow). Regenerate with that script if
  copy or photos change; don't hand-edit the JPEG. Referenced as an
  absolute-resolving path (`/og/bergur-roenne-moberg.jpg`) via
  `metadataBase` in both `openGraph.images` and `twitter.images`.
- The canonical tag also covers a real duplicate-content issue: three
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
  render widths). `HeroPortrait.tsx` combined this with Framer Motion by
  animating a wrapping `motion.div` rather than trying to animate the
  `Image` component directly (mount delay `0`, to help LCP) — it's not
  currently rendered (see the 2026-10 header/hero layout pass under
  Section order above) but the technique is worth reusing if/when a
  portrait image returns anywhere on the page.
  When adding new images, always use `next/image` (`fill` + a
  `relative`+sized parent for cover-style backgrounds) from the start.
- `globals.css` has a global `prefers-reduced-motion: reduce` rule
  (collapses all animation/transition durations to ~0 and disables smooth
  scroll) in addition to the existing `.ken-burns`-specific override —
  covers Framer Motion transitions too, not just the CSS keyframe.
- **The page stays server-rendered where the copy/SEO text lives.**
  `Header`, `TalkCTA`, and `Booking` are `"use client"` because they need
  real interactivity (scroll state, topic store, form state), but `Hero`,
  `About`, `Foredrag`, `HeinesenProject`, and `Books` stay server
  components so their copy ships in the initial HTML — only client *leaves*
  (`TalkCTA`; `HeroPortrait` when it's in use) are extracted where
  interactivity is actually needed. Don't convert a whole content section
  to `"use client"` just to add one interactive CTA inside it.

## Competitive reference

naujalynge.dk (Nauja Lynge — Greenland/Arctic speaker, same "Nordic
identity public speaker" niche) is the explicit design reference for this
site and is worth re-checking when making structural decisions. Patterns
borrowed from it: a sticky nav bar, static hero photography over
video/WebGL, scroll-spy active-link highlighting, and — as of the 2026-10
CRO pass — the compact, side-by-side-comparable Foredrag card layout.

**Superseded:** an earlier session recorded that the user had explicitly
rejected switching the full-viewport cinematic Foredrag section to a
compact scannable grid, wanting to keep the cinematic version. A detailed
2026-10 conversion-optimization brief reversed that explicitly and asked
for exactly the compact-card layout naujalynge uses (comparable cards:
title, 1–2 sentence teaser, duration, audience tag, "Forespørg" CTA) —
see `Foredrag.tsx` and the Section order note above. If a future session
is tempted to "restore" the cinematic version citing this file's history,
confirm with the user first — this is the second reversal on this exact
question.

@AGENTS.md
