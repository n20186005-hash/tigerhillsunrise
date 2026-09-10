import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// साइटको वास्तविक डोमेन तय भएपछि यही एक ठाउँमा मात्र राख्नुहोस्।
// डोमेन नहुँदा undefined नै राख्नुहोस्; canonical/OG URL र sitemap स्वतः सुरक्षित रूपमा हट्छन्।
const site = undefined;

export default defineConfig({
  site,
  integrations: site ? [sitemap()] : [],
  vite: {
    plugins: [tailwindcss()]
  },
  build: {
    format: 'directory'
  }
});
