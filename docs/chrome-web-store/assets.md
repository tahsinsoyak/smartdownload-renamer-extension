# Store asset workflow

The Store asset pack is generated from the real production extension screenshots. The presentation frames use the same cobalt palette, typography, icon, and product claims as the shipped UI.

## Generate everything

```powershell
npm run store:generate
```

This command builds the extension, captures deterministic English and Turkish product screenshots, and creates the five Store screenshots, two promotional tiles, and icon handoff files in `store-assets/`.

## Generate one asset group

```powershell
npm run store:screenshots
npm run store:promo
```

Use these commands when the source UI screenshots or promotional artwork changed independently.

## Validate every asset

```powershell
npm run store:validate
```

Validation checks file presence, PNG format, exact dimensions, and opacity requirements. `npm run release:check` also runs this validation.

## Store upload set

- `icon-128.png` — 128 × 128 Store icon.
- `screenshot-01-latest-download.png` through `screenshot-05-local-history.png` — five 1280 × 800 screenshots.
- `promo-tile-small.png` — required 440 × 280 promotional tile.
- `promo-tile-marquee.png` — optional 1400 × 560 marquee.

`icon-master-512.png` and `icon-construction.png` are brand handoff files, not Store upload requirements.

Only deterministic sample filenames, domains, and folders appear in the screenshots. No browser profile, account, private URL, or real local path is shown.

Official image guidance: `https://developer.chrome.com/docs/webstore/images`
