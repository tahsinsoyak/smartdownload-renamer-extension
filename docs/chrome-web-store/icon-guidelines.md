# Icon guidelines

## Concept

The icon combines four recognizable parts:

1. **Cobalt rounded foundation** — gives the extension a dependable productivity identity and strong Chrome-toolbar contrast.
2. **White file sheet** — identifies the object the extension organizes.
3. **Downward arrow** — communicates downloading even at small sizes.
4. **Gold and light-blue sparkles** — suggest intelligent filename cleanup without using a generic robot or chat symbol.

## Master geometry

- Source: `public/icon.svg`
- View box: 128 × 128
- Outer inset: 4 px
- Outer corner radius: 30 px
- Primary color: `#2563EB`
- Fold color: `#BFDBFE`
- Intelligence accent: `#FBBF24`
- Secondary sparkle: `#93C5FD`

## Export files

- `public/icons/icon16.png` — extension toolbar.
- `public/icons/icon32.png` — Windows and high-density toolbar contexts.
- `public/icons/icon48.png` — extension management page.
- `public/icons/icon128.png` — packaged extension and Store source.
- `store-assets/icon-128.png` — validated Store upload copy.
- `store-assets/icon-master-512.png` — large review and marketing master.
- `store-assets/icon-construction.png` — visual design handoff.

## Usage rules

- Keep the silhouette, colors, spacing, arrow, and two sparkles unchanged.
- Do not add text inside the icon.
- Do not add extra sparkles, gradients, drop shadows, outlines, or AI robot imagery.
- Do not place the icon directly on a similar cobalt surface without a white or pale-blue container.
- At 16 px, judge recognition by the file-and-arrow silhouette rather than small decorative detail.

Regenerate packaged icons with `npm run icons`. Regenerate Store icon files with `npm run store:promo`.
