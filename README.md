# Bav Store Theme

Custom Salla theme (Twilight engine) for Bav Store, a digital services store: game top-ups and ready-made digital files.

Built on top of [Theme Raed](https://github.com/SallaApp/theme-raed) (MIT).

## Requirements

- Node.js 22.18+ (or 24.11+)
- pnpm

## Development

```bash
pnpm install
pnpm run development   # build once
pnpm run watch         # rebuild on change
pnpm run production    # production build (output goes to public/)
```

Preview on a demo store from the Salla Partners portal, or with the Salla CLI:

```bash
salla theme preview
```

Compiled assets in `public/` are committed, so run `pnpm run production` before every push.
