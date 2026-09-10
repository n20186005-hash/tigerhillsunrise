// Verify JSON-LD in built index.html
import { readFileSync } from 'node:fs';
const h = readFileSync('dist/index.html', 'utf8');
const re = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
const blocks = [];
let m;
while ((m = re.exec(h))) blocks.push(m[1]);
console.log('ld script blocks found:', blocks.length);
if (!blocks.length) {
  // dump a chunk around "ld+json" to debug
  const i = h.indexOf('application/ld+json');
  console.log('first occurrence index:', i);
  console.log(h.substring(Math.max(0, i - 200), i + 200));
  process.exit(1);
}
const j = JSON.parse(blocks[0]);
console.log('parsed OK, @graph nodes:', j['@graph'].length);
j['@graph'].forEach((n) => console.log(' -', n['@type'], n['@id'] || ''));
const a = j['@graph'].find((n) => n['@id'] && n['@id'].includes('#attraction'));
if (a) {
  console.log('\nATTRACTION:');
  console.log('  name              :', a.name);
  console.log('  @id               :', a['@id']);
  console.log('  sameAs            :', a.sameAs);
  console.log('  hasMap            :', a.hasMap);
  console.log('  image             :', a.image);
  console.log('  address           :', JSON.stringify(a.address));
  console.log('  geo               :', JSON.stringify(a.geo));
  console.log('  touristType       :', a.touristType);
  console.log('  isAccessibleForFree:', a.isAccessibleForFree);
  console.log('  hours             :', JSON.stringify(a.openingHoursSpecification));
  console.log('  rating            :', JSON.stringify(a.aggregateRating));
  console.log('  containedInPlace  :', JSON.stringify(a.containedInPlace));
  console.log('  telephone         :', a.telephone);
  console.log('  alternateName     :', a.alternateName);
}
const f = j['@graph'].find((n) => n['@type'] === 'FAQPage');
console.log('\nFAQ count:', f ? f.mainEntity.length : 'none');
const o = j['@graph'].find((n) => n['@type'] === 'Organization');
console.log('Organization:', o ? o['@id'] : 'none', '| logo', o && o.logo && o.logo.url);
const w = j['@graph'].find((n) => n['@type'] === 'WebPage');
console.log('WebPage:', w ? w['@id'] : 'none', '| dateModified', w && w.dateModified, '| datePublished', w && w.datePublished, '| primaryImageOfPage', w && w.primaryImageOfPage && w.primaryImageOfPage.url);
const b = j['@graph'].find((n) => n['@type'] === 'BreadcrumbList');
console.log('BreadcrumbList:', b ? b.itemListElement.length + ' items' : 'none');
if (b) b.itemListElement.forEach((it) => console.log('   ', it.position, it.name, '->', it.item));
