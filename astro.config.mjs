import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Canonical site origin for tigerhillsunrise.com. Single source of truth used
// for canonical, og:url, JSON-LD urls, sitemap and absolute image URLs.
const site = 'https://tigerhillsunrise.com';

export default defineConfig({
  site,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // Emits xhtml:link alternates for the four language mirrors so the
      // sitemap carries the same hreflang cluster as the pages themselves.
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', ne: 'ne', bn: 'bn', ur: 'ur' }
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  build: {
    format: 'directory'
  }
});
