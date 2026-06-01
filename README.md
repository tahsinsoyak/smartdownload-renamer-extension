# Smart Download Renamer

**Automatically rename messy downloads into clean, searchable filenames — 100% local, no account, no backend.**

[![Version](https://img.shields.io/badge/version-0.1.0-teal)](https://github.com/tahsinsoyak/smartdownload-renamer-extension/releases)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Manifest%20V3-blue)](https://developer.chrome.com/docs/extensions/mv3/)
[![Support](https://img.shields.io/badge/Support-Patreon-ff424d)](https://www.patreon.com/tahsinsoyak)

---

## Screenshots

| Popup | Popup Dark |
|-------|------------|
| ![Popup light](screenshots/1-popup-light.png) | ![Popup dark](screenshots/2-popup-dark.png) |

| Options — General | Options — History |
|-------------------|-------------------|
| ![Options general](screenshots/3-options-general.png) | ![Options history](screenshots/4-options-history.png) |

| Options — Domains (dark) |
|--------------------------|
| ![Options domains dark](screenshots/5-options-domains-dark.png) |

---

## What it does

Instead of `invoice(3).pdf`, `download.pdf`, or `document.pdf` you get:

```
2026-05-26_Amazon_Invoice.pdf
2026-05-26_Udemy_Certificate.pdf
2026-05-26_Bank_Receipt.pdf
2026-05-26_GitHub_Download.zip
```

The extension intercepts each download before it hits your folder, reads its URL and metadata locally, and suggests a clean filename automatically.

---

## Features

- **Automatic renaming** — triggers on every download with zero friction
- **Source detection** — reads the domain and maps it to a readable name (Amazon, Trendyol, GitHub, …)
- **Document classification** — detects invoices, receipts, certificates, transcripts, and 10+ other types from filename keywords
- **Custom templates** — `{date}_{source}_{type}.{ext}` and five built-in presets
- **Domain rules** — map any domain to a custom source name and default document type
- **Filename history** — see what was renamed, skipped, or failed with timestamps
- **Dark mode** — full light/dark support
- **Skip executables** — never touches `.exe`, `.dmg`, `.pkg` files
- **No account, no backend, no analytics** — everything runs in your browser

---

## Privacy

Smart Download Renamer works entirely locally. It uses Chrome download metadata only to suggest cleaner filenames. Nothing is sent to any server.

**Permissions used:**
- `downloads` — intercepts download filenames before saving
- `storage` — saves your settings, rules, and rename history locally

**Not collected:** file contents · cookies · browsing history · analytics · ads · any form of telemetry

---

## Install

### From source

```bash
git clone https://github.com/tahsinsoyak/smartdownload-renamer-extension.git
cd smartdownload-renamer-extension
npm install
npm run build
```

Then in Chrome:
1. Go to `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `dist/` folder

### From release

Download `smart-download-renamer.zip` from [Releases](https://github.com/tahsinsoyak/smartdownload-renamer-extension/releases), unzip it, and load the folder as an unpacked extension.

---

## Development

```bash
npm run dev       # Vite dev server for popup and options UI
npm run build     # Production build → dist/
npm run test      # Unit tests (Vitest)
npm run zip       # Build + package → release/smart-download-renamer.zip
npm run icons     # Regenerate PNG icons from public/icon.svg
```

---

## Filename template variables

| Variable | Example output |
|----------|----------------|
| `{date}` | `2026-05-26` |
| `{source}` | `Amazon` |
| `{type}` | `Invoice` |
| `{original}` | `invoice(3)` |
| `{ext}` | `pdf` |

Default template: `{date}_{source}_{type}.{ext}`

---

## Tech stack

React · TypeScript · Vite · Tailwind CSS · Zustand · Vitest · Chrome Manifest V3

---

## Support

If this extension saves you time, consider supporting it on Patreon:

[![Patreon](https://img.shields.io/badge/Support%20on-Patreon-ff424d?logo=patreon&logoColor=white)](https://www.patreon.com/tahsinsoyak)

---

## Roadmap

- [ ] Editable keyword lists per document type
- [ ] Import / export settings
- [ ] Manual review before rename
- [ ] Chrome Web Store listing
- [ ] Firefox / Edge support
