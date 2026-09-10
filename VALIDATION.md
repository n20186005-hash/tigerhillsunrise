# Validation status

## Completed locally

- `package.json` JSON syntax checked.
- Exact dependency versions checked: no `latest`, `*`, caret or tilde dependency ranges.
- `packageManager`, `engines.node`, `.node-version` are pinned.
- No `pnpm-workspace.yaml` is present.
- Source grep checked for the prohibited placeholder hostnames and browser-extension URL scheme requested in the specification.
- `astro.config.mjs` has one `site` source and keeps it unset by default.
- Sitemap integration is conditional on `site` being present.
- Canonical, `og:url`, social-card absolute URL and JSON-LD URL derive from `Astro.site` and are omitted when it is unset.
- Google Maps embed locale is set to Nepali / India (`ne`, `in`).
- GA4 loads only after explicit analytics consent.

## Could not be executed in this runtime

The execution environment cannot resolve `registry.npmjs.org`. Corepack fails while fetching the pinned pnpm package with `getaddrinfo EAI_AGAIN registry.npmjs.org`. The runtime also provides Node 22.16.0 while the project intentionally pins Node 24.21.0.

Because dependencies cannot be downloaded here, a truthful synchronized `pnpm-lock.yaml` cannot be generated and these commands cannot be honestly claimed as passed in this runtime:

```bash
rm -rf node_modules
CI=1 corepack pnpm install --frozen-lockfile
pnpm check
pnpm build
```

No fabricated lockfile or false passing status has been added. In a normal connected Node 24.21.0 environment, generate and commit the lockfile once with `corepack pnpm install`, then rerun the required clean CI sequence above.
