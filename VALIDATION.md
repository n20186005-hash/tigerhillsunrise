# Validation status

Last validated against `npm install` + `npx astro check` + `npm run build` on Windows / Node 24.14.0.

## Passed locally

- `package.json` JSON syntax OK.
- Exact dependency versions, no ranges.
- `astro.config.mjs` `site` = `https://tigerhillsunrise.com` (single source of truth).
- `npm install` (320 packages, 23s).
- `npx astro check` — 0 errors, 0 warnings, 0 hints.
- `npm run build` — completes in ~10s, generates `dist/index.html` (52 KB), `dist/sitemap-index.xml`, `dist/sitemap-0.xml`, copies `public/*` verbatim.
- Product checks (via `node scripts/check-dist.mjs` + `node scripts/check-ld.mjs`):
  - `<title>`, `<meta description>`, canonical, `hreflang ne + x-default`, full OG (title, description, url, site_name, locale ne_IN + en_IN/hi_IN alternates, image + image:alt + image:type/width/height + image:secure_url), Twitter card.
  - JSON-LD `application/ld+json` block (1) parses as `{ @context, @graph: [WebSite, Organization, WebPage, TouristAttraction, BreadcrumbList, FAQPage] }`.
  - TouristAttraction carries `@id https://tigerhillsunrise.com/#attraction`, name, 4 alternateName (incl. Devanagari), `image`, `isAccessibleForFree`, `publicAccess`, full PostalAddress (street / Darjeeling / West Bengal / 734102 / IN), `geo`, `hasMap`, 5-link sameAs (Maps, darjeeling.gov.in, incredibleindia.gov.in, wbtourism.gov.in, en.wikipedia.org), `openingHoursSpecification Mo–Su 03:00–17:00`, `aggregateRating 4.5 / 18,354 / bestRating 5`, `touristType Viewpoint, Observatory`, `containedInPlace Senchal Wildlife Sanctuary`, `telephone`.
  - FAQPage contains 8 questions matching the visible `<details>`.
  - Organization `@id #organization` with `logo ImageObject` 512×512.
  - WebPage `@id #webpage` with `datePublished` / `dateModified 2026-09-10`, `primaryImageOfPage`.
  - BreadcrumbList 3 items: Home → Darjeeling, West Bengal → Tiger Hill Observatory / Sunrise Viewpoint.
  - `sitemap-index.xml` + `sitemap-0.xml` (1 absolute URL).
  - `robots.txt` allows all and points at the sitemap.
  - `site.webmanifest` includes `name`, `short_name`, `description`, `id`, `start_url /`, `scope /`, `lang ne`, `display standalone`, `theme_color #10182d`, `background_color #f3eee5`, 6 icons (incl. 192/512/maskable).
  - `sw.js` present; `serviceWorker.register('/sw.js')` is present in the built HTML (skipped on localhost).
  - All four body photos have entity-bound `alt` text.
  - 4 entity-bound H2s (About / History & Significance / Location & How to Visit / Landmarks & Attractions Around) — the original poetic Nepali H2 lines are preserved as `.kicker-np` / `.kicker-np-dark` sublines.
  - `Sources & Further Reading` section with 6 official sources + CC photo attributions + last-updated stamp.
- `dist/` files: `index.html 52,303 B`, `sw.js 2,449 B`, `site.webmanifest 1,121 B`, `robots.txt 84 B`, `sitemap-index.xml 191 B`, `icon-192.png 2,127 B`, `icon-512.png 5,458 B`, `icon-512-maskable.png 4,963 B`, `tiger-hill-kanchenjunga-dawn.jpg 510,693 B`.

## Notes for the operator

- Domain must be **tigerhillsunrise.com** when DNS is wired. Change in **one** place: `astro.config.mjs → site`.
- The Google Maps embed URL is the same one Google returns for the place; the language pair is `ne / in` to match the page locale. Switch to `en / us` if you ever add English copy.
- Vehicle access rules, coupons and parking fees change — the page treats them as variable and defers to local confirmation.
- Wikimedian photographs are CC BY-SA 3.0/4.0; local copies must keep attribution (see `SOURCES.md`).
- The site is single-language. Add a second language by introducing a folder + locale switcher and re-running `npm run build`.
