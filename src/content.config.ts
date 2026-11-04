import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { LANGS } from './lib/i18n';

// Every guide exists once per language. The `slug` field is the shared
// language-neutral key that links the four mirrors together (and builds the
// hreflang cluster); the file path only groups files by language.
//
// The glob loader would normally use a frontmatter `slug` as the entry id,
// which would collide across the four languages. The path-based `generateId`
// below keeps ids unique (`en/sunrise-time`, `ne/sunrise-time`, …) while the
// `slug` data field stays free for building hreflang clusters.
const pages = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/pages',
    generateId: ({ entry }) => entry.replace(/\.md$/, '')
  }),
  schema: z.object({
    slug: z.string(),
    lang: z.enum(LANGS),
    group: z.enum(['sunrise', 'practical', 'nearby', 'itinerary', 'faq']),
    priority: z.enum(['P0', 'P1', 'P2']),
    order: z.number(),
    title: z.string(),
    description: z.string(),
    h1: z.string(),
    kicker: z.string(),
    lede: z.string(),
    updated: z.string(),
    checked: z.string(),
    image: z.enum(['dawn', 'sunrise', 'viewpoint', 'range']).optional(),
    quickfacts: z.array(z.object({ k: z.string(), v: z.string() })).default([]),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    sources: z.array(z.object({ label: z.string(), url: z.string(), note: z.string().default('') })).default([]),
    related: z.array(z.string()).default([]),
    gallery: z.boolean().default(false),
    map: z.boolean().default(false),
    guidesIndex: z.boolean().default(false)
  })
});

export const collections = { pages };
