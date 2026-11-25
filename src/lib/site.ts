/**
 * The site's canonical origin — the one host Google is told is the real
 * one. Chosen by the user (2026-11): the apex `nordiskforedrag.dk`, not
 * `www.` and not the legacy `bergur.vercel.app` alias.
 *
 * Several hostnames serve identical content (apex, www, bergur.vercel.app
 * and the per-deployment preview URLs), so every absolute URL the site
 * emits — canonical, sitemap, robots' sitemap line, OG/Twitter images and
 * the JSON-LD `url`/`@id`/`image` — must resolve against this one value
 * regardless of which alias served the request. Keep it here, imported by
 * `layout.tsx`, `sitemap.ts` and `robots.ts`, rather than hardcoded in
 * each, so the three can't drift apart again.
 */
export const SITE_URL = "https://nordiskforedrag.dk";
