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
- Fonts are **deliberately plain**: `Times New Roman`/Calibri system stacks,
  not a designed Google Font. This was an explicit user request — the site
  should not visually read as "AI/agency-made." Don't reintroduce a custom
  webfont without asking first.
- Copy tone: literary, human, restrained. No emoji, no marketing buzzwords
  ("transformativ," "unik oplevelse"), no superlatives. Em dashes over
  hyphens. Read like the back of a good book, not a SaaS landing page.
- Faroese flag colors (`--faroe-gradient` in globals.css: white/blue/red/
  blue/white) are used ONLY as thin accents — section dividers, a hero edge
  strip, the scroll-progress bar, the booking submit button, footer top
  border. Never as a large fill. Treat it as a hint, not a flag.
- Buttons: `rounded-md` (flat-ish corners), never fully round. Sections use
  generous padding (`py-32`, ~128px) — the design should "breathe."

## Section order (`src/app/page.tsx`)

Header → Hero → EventBar → Intro (trust bar + keyword crossfade) → About →
FaroeDivider → Foredrag (benefit boxes + 3 full-viewport talk pages) →
FaroeDivider → HeinesenProject → Books (3D covers) → SocialProof →
Booking → Footer.

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
  apply after mount — don't rely solely on React's implicit post-hydration
  resync, it wasn't reliably observed in this project's environment.
- The original 3D animated-ocean hero background (`three/Ocean*.tsx`) was
  removed after repeated rounds of being unable to verify it actually
  rendered (no browser tooling available in that session) and user reports
  that the hero just looked like a flat dark gradient. Replaced with a real
  `<video>` (`public/hero-video.mp4`) — reliable, no WebGL dependency. Don't
  re-add a canvas-based hero background without a way to visually verify it.
- No browser automation is available in this environment — changes are
  verified via `tsc --noEmit`, `eslint`, and `next dev` + `curl`/grep on the
  rendered HTML, never an actual screenshot. Say so if asked to confirm
  something visual; don't claim to have seen it render.

## Placeholder content still needing real material

- Testimonials (`SocialProof.tsx`) are bracketed placeholders — no
  fabricated quotes attributed to real people/orgs.
- Talk price (`Booking.tsx`, `[XX.000 kr.]`) and the "Download
  foredragsbeskrivelse (PDF)" link (`Foredrag.tsx`, currently `href="#"`)
  need real values/assets before launch.
- Footer email is displayed as-is; confirm the domain is actually live
  before treating it as a working contact address.

@AGENTS.md
