# react-find docs worker

Marketing and documentation site for `react-find`, deployed on Cloudflare Workers with static assets plus a small Worker entry for dynamic `sitemap.xml`.

## Commands

```bash
pnpm install
pnpm --filter react-find-docs-worker preview:static
pnpm --filter react-find-docs-worker dev
pnpm --filter react-find-docs-worker deploy
```

## Local preview

- Open `public/index.html` directly in a browser for a fast visual check.
- Run `pnpm --filter react-find-docs-worker preview:static` for a simple local static server at `http://127.0.0.1:4173`.
- Run `pnpm --filter react-find-docs-worker dev` to preview the Worker version with Cloudflare routing.

## Files

- `public/index.html`: static docs page markup
- `public/styles.css`: design tokens, layout, motion, and responsive styles
- `public/app.js`: bilingual copy, language switch, search, tabs, copy actions
- `src/index.js`: Worker entry and dynamic `sitemap.xml`
- `wrangler.jsonc`: Cloudflare Workers deployment config with static assets binding

## Notes

- Update `name` in `wrangler.jsonc` if `react-find-docs` is already taken in your Cloudflare account.
- The page supports English and Chinese switching and stores the selected language in `localStorage`.
