// Tiger Hill Observatory / Sunrise Viewpoint — service worker.
// Strategy: network-first for HTML navigations with offline fallback to the
// cached root, cache-first for same-origin static assets, stale-while-revalidate
// for Google Fonts. Versioned cache name lets us drop old entries on deploy.

const CACHE_VERSION = 'ths-2026-09-10';
const SHELL_CACHE = `${CACHE_VERSION}-shell`;
const ASSET_CACHE = `${CACHE_VERSION}-assets`;

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/apple-touch-icon.png',
  '/logo.svg',
  '/social-card.svg',
  '/site.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-512-maskable.png',
  '/images/tiger-hill-kanchenjunga-dawn.jpg',
  '/images/tiger-hill-kanchenjunga-range.jpg',
  '/images/tiger-hill-sunrise.jpg',
  '/images/tiger-hill-viewpoint.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => !k.startsWith(CACHE_VERSION))
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // skip cross-origin (Maps, GA, etc.)

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(SHELL_CACHE).then((c) => c.put('/', copy));
          return res;
        })
        .catch(() =>
          caches.match('/').then((cached) => cached || caches.match('/index.html'))
        )
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(ASSET_CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
    })
  );
});
