// Verify body structure of the built index.html
import { readFileSync } from 'node:fs';
const h = readFileSync('dist/index.html', 'utf8');

const ids = [...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
console.log('section/element ids:', [...new Set(ids)].join(', '));

const anchors = [...h.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
const missing = [...new Set(anchors)].filter((a) => !ids.includes(a));
console.log('anchor targets:', [...new Set(anchors)].join(', '));
console.log('missing anchor targets:', missing.length ? missing.join(', ') : 'NONE');

console.log('\nH1 count:', (h.match(/<h1[\s>]/g) || []).length);
console.log('H2 count:', (h.match(/<h2[\s>]/g) || []).length);
const h2s = [...h.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
console.log('H2 list:');
h2s.forEach((x) => console.log('  -', x));

console.log('\nimg count:', (h.match(/<img\s/g) || []).length);
console.log('imgs without alt:', (h.match(/<img(?![^>]*alt=)[^>]*>/g) || []).length);
const alts = [...h.matchAll(/<img[^>]*alt="([^"]*)"/g)].map((m) => m[1]);
console.log('img alts:');
alts.forEach((a) => console.log('  -', a));

console.log('\n<details> count:', (h.match(/<details/g) || []).length);
console.log('first <details> tag:', h.match(/<details[^>]*>/)?.[0]);
console.log('details open count:', (h.match(/<details[^>]*\sopen/g) || []).length);

console.log('\niframes:', (h.match(/<iframe[\s\S]*?>/g) || []).map((x) => x.replace(/\s+/g, ' ')).join('\n'));
console.log('iframe src matches user pb:', h.includes('0x39e42fcb31e0451b%3A0x4b9ef68840f1a28d'));

console.log('\nmaps share link occurrences:', (h.match(/maps\.app\.goo\.gl\/xpAf5Rx8gtBy7gkN9/g) || []).length);
console.log('govt outbound links:', (h.match(/rel="noopener noreferrer"/g) || []).length);
console.log('target=_blank without rel=noopener:',
  (h.match(/<a (?![^>]*rel="[^"]*noopener)[^>]*target="_blank"/g) || []).length);

console.log('\nlang attr:', h.match(/<html[^>]*>/)?.[0]);
console.log('GA id occurrences:', (h.match(/G-HXM22WWPKP/g) || []).length);
console.log('AdSense/placeholder residue:', /ca-pub-|adsbygoogle|example\.com|TODO|XXX/i.test(h));
console.log('ticker text present:', h.includes('पहिलो उज्यालो हिमालमा पर्छ।'));
