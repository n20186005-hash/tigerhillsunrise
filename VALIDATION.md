# Verification

Run `pnpm check`, `pnpm build` and default `pnpm exec wrangler deploy --dry-run` with the pinned runtime. Inspect the actual generated homepage/error and referenced resources. Local source/build results do not establish production status, domain redirects or browser layout; those require separate native HTTP and browser checks against the frozen release.
