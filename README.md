# Tiger Hill Observatory / Sunrise Viewpoint

दार्जिलिङको टाइगर हिलका लागि बनाइएको एक-पृष्ठीय Astro + Tailwind CSS + TypeScript साइट। सामग्री स्थानीय रूपमा प्रयोग हुने नेपाली भाषामा छ।

## Stack

- Astro 7.3.2
- Tailwind CSS 4.3.3 via `@tailwindcss/vite`
- TypeScript 6.0.3
- `@astrojs/check` 0.9.10
- pnpm 10.34.5
- Node.js 24.21.0
- Cloudflare Workers static assets via Wrangler 4.129.1

## Domain configuration

डोमेनको एक मात्र स्रोत `astro.config.mjs` को `site` constant हो। अहिले `undefined` छ। डोमेन तय भएपछि यही एक ठाउँमा वास्तविक HTTPS URL राख्नुहोस्।

- `site` खाली हुँदा build सामान्य रूपमा चल्ने गरी डिजाइन गरिएको छ।
- canonical, `og:url`, social image absolute URL र JSON-LD `url` स्वतः omit हुन्छन्।
- `@astrojs/sitemap` पनि `site` उपलब्ध हुँदा मात्र enable हुन्छ।
- placeholder domain प्रयोग गरिएको छैन।

## Run

```bash
corepack enable
CI=1 corepack pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm deploy
```

## Images

साइटले वास्तविक Wikimedia Commons फोटो प्रयोग गर्छ। यस build वातावरणमा बाह्य binary download उपलब्ध नभएकाले फोटो फाइल स्थानीय JPG का रूपमा ल्याउन सकिएन। URL, इच्छित स्थानीय filename र license `public/images/README.md` मा छन्।

## Content notes

सवारी प्रवेश, coupon/cut-off, पार्किङ र शुल्क समयसँगै बदलिन सक्छन्। साइटमा तिनलाई परिवर्तनशील जानकारीका रूपमा प्रस्तुत गरिएको छ र यात्राअघि स्थानीय पुष्टि गर्न भनिएको छ।
