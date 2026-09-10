import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Canonical site origin for tigerhillsunrise.com. Single source of truth used
// for canonical, og:url, JSON-LD urls, sitemap and absolute image URLs.
const site = 'https://tigerhillsunrise.com';

export default defineConfig({
  site,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  },
  build: {
    format: 'directory'
  }
});
