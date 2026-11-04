# Tiger Hill Sunrise Guide / टाइगर हिल सूर्योदय मार्गदर्शिका

Independent, nonofficial, nonprofit educational travel information for the Tiger Hill Observatory sunrise viewpoint in Darjeeling. English-first Astro/Tailwind/TypeScript site: forty English guides under five hubs (sunrise and viewing; getting there and tickets; nearby places and culture; itineraries, food and stay; practical questions) plus a shared home page, each mirrored 1:1 in Nepali, Bengali and Urdu with a complete hreflang cluster. No booking, weather, or operator service.

Use Node 24.21.0 and pnpm 10.34.5 as pinned.

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm exec wrangler deploy --dry-run
```

English (the default locale) is served from the root with no prefix; the other three languages use a `/{lang}/` prefix. Default Wrangler config targets `tigerhillsunrise`. The Worker handles canonical HTTP/www redirects before assets, localized true404 and empty HEAD responses. Every page ships per-language canonical URLs, hreflang alternates with `x-default` and JSON-LD (Organization, WebSite, TouristAttraction, WebPage, BreadcrumbList, Article, FAQPage). Urdu renders right-to-left.

Original four historical Commons photographs remain unchanged; see public/CREDITS.txt. Current public place snapshots are visibly attributed and do not establish operator access rules.
