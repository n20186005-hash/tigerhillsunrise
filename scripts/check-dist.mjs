// One-off build verification — read dist artifacts and print key SEO/PWA facts.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(process.cwd());
const read = (p) => readFileSync(resolve(root, p), 'utf8');

const html = read('dist/index.html');

const headMatches = html.match(/<title>[\s\S]*?<\/title>|<meta name="description"[^>]*>|<link rel="canonical"[^>]*>|<meta property="og:[^>]+>|<meta name="twitter:[^>]+>|<link rel="alternate"[^>]+>/g) || [];
console.log('--- TDK / canonical / OG ---');
[...new Set(headMatches)].forEach((m) => console.log(m));

console.log('\n--- H1 / first H2s ---');
const hs = html.match(/<h[12][^>]*>[\s\S]*?<\/h[12]>/g) || [];
hs.slice(0, 14).forEach((m) => console.log(m.replace(/\s+/g, ' ').trim()));

console.log('\n--- JSON-LD blocks ---');
const ldRe = /<script is:inline type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
let m, idx = 0;
while ((m = ldRe.exec(html))) {
  try {
    const j = JSON.parse(m[1]);
    if (j['@graph']) {
      console.log(`block ${++idx}: @graph nodes ->`, j['@graph'].map((n) => n['@type']).join(', '));
      const a = j['@graph'].find((n) => n['@id'] && n['@id'].includes('#attraction'));
      if (a) {
        console.log('  attraction name:', a.name);
        console.log('  attraction @id :', a['@id']);
        console.log('  sameAs         :', a.sameAs);
        console.log('  hasMap         :', a.hasMap);
        console.log('  image          :', a.image);
        console.log('  address        :', JSON.stringify(a.address));
        console.log('  geo            :', JSON.stringify(a.geo));
        console.log('  touristType    :', a.touristType);
        console.log('  isAccessible   :', a.isAccessibleForFree);
        console.log('  hours          :', JSON.stringify(a.openingHoursSpecification));
        console.log('  rating         :', JSON.stringify(a.aggregateRating));
      }
      const faq = j['@graph'].find((n) => n['@type'] === 'FAQPage');
      if (faq) console.log('  FAQPage count  :', faq.mainEntity.length);
      const org = j['@graph'].find((n) => n['@type'] === 'Organization');
      if (org) console.log('  Organization   :', org['@id'], 'logo', org.logo && org.logo.url);
      const wp = j['@graph'].find((n) => n['@type'] === 'WebPage');
      if (wp) console.log('  WebPage        :', wp['@id'], 'dateModified', wp.dateModified, 'datePublished', wp.datePublished);
      const bc = j['@graph'].find((n) => n['@type'] === 'BreadcrumbList');
      if (bc) console.log('  BreadcrumbList :', bc.itemListElement.length, 'items');
    } else if (j['@type']) {
      console.log(`block ${++idx}: @type ${j['@type']}`);
    }
  } catch (e) {
    console.log('LD parse error block', idx + 1, e.message);
  }
}

console.log('\n--- sitemap-index.xml ---');
console.log(read('dist/sitemap-index.xml'));
console.log('--- sitemap-0.xml ---');
console.log(read('dist/sitemap-0.xml'));
console.log('--- robots.txt ---');
console.log(read('dist/robots.txt'));
console.log('--- site.webmanifest ---');
console.log(read('dist/site.webmanifest'));
console.log('--- sw.js head ---');
console.log(read('dist/sw.js').split('\n').slice(0, 8).join('\n'));
console.log('--- service worker registration present in HTML ---',
  /serviceWorker\.register\(['"]?\/sw\.js/.test(html));
console.log('--- file sizes ---');
for (const f of ['dist/index.html', 'dist/sw.js', 'dist/site.webmanifest', 'dist/sitemap-index.xml', 'dist/robots.txt', 'dist/icons/icon-192.png', 'dist/icons/icon-512.png', 'dist/icons/icon-512-maskable.png', 'dist/images/tiger-hill-kanchenjunga-dawn.jpg']) {
  console.log(f, readFileSync(resolve(root, f)).length, 'bytes');
}
