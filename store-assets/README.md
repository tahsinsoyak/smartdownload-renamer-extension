# Chrome Web Store asset pack

Upload the screenshots in this order:

1. `screenshot-01-latest-download.png` — clean filename, original filename, saved folder, and file details.
2. `screenshot-02-turkish-dark.png` — Turkish localization and dark theme.
3. `screenshot-03-smart-settings.png` — automatic renaming, safety controls, language, and live preview.
4. `screenshot-04-domain-rules.png` — website-specific naming rules.
5. `screenshot-05-local-history.png` — searchable, on-device rename history.

Promotional files:

- `promo-tile-small.png` — required 440 × 280 tile.
- `promo-tile-marquee.png` — optional 1400 × 560 marquee.

Icon files:

- `icon-128.png` — Store upload icon.
- `icon-master-512.png` — high-resolution marketing master.
- `icon-construction.png` — design rationale and component guide; do not upload as a Store screenshot.

All Store screenshots and promotional tiles are opaque PNG files with validated dimensions. Run `npm run store:validate` before packaging a release.
