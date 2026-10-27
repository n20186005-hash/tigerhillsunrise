# Tiger Hill नेपाली यात्रा मार्गदर्शिका

Independent, nonofficial, nonprofit educational travel information. One Nepali homepage and a shared Nepali error page, built with the original exact Astro/Tailwind/TypeScript dependencies. No booking, weather, or operator service.

Use Node24.21.0 and pnpm10.34.5 as pinned.

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm exec wrangler deploy --dry-run
```

Default Wrangler config targets `tigerhillsunrise`. The Worker handles canonical HTTP/www redirects before assets, localized true404 and empty HEAD responses. Root homepage remains the only indexed content route; privacy and consent information are in-page sections.

Original four historical Commons photographs remain unchanged; see public/CREDITS.txt. Current public place snapshots are visibly attributed and do not establish operator access rules.
