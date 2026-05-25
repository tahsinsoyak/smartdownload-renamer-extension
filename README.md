# Smart Download Renamer

**Name your downloads beautifully.**

Smart Download Renamer is a free, local-only Chrome extension that turns messy downloads like `document.pdf`, `invoice(3).pdf`, `download.pdf`, and `receipt.pdf` into clean, searchable filenames.

Example output:

- `2026-05-26_Trendyol_Invoice.pdf`
- `2026-05-26_Bootcamp_Certificate.pdf`
- `2026-05-26_Bank_Receipt.pdf`
- `2026-05-26_University_Transcript.pdf`
- `2026-05-26_GitHub_Download.pdf`

## Product Plan

### Problem

Downloads folders become hard to search because many websites use generic names such as `document.pdf`, `file.pdf`, `download.pdf`, `unknown.pdf`, or duplicate names like `invoice(3).pdf`.

### Solution

The extension listens for downloads and suggests a cleaner filename before the file completes. It uses only local download metadata:

- Download date
- Source domain
- Original filename
- File extension and MIME type
- URL keywords
- User-defined domain rules

No external AI, backend, login, cloud sync, analytics, ads, affiliate logic, or paywall.

### Core MVP

- Manifest V3 Chrome extension
- `chrome.downloads.onDeterminingFilename` integration
- Local rule-based filename suggestion engine
- Source detection from domain
- Document type classification
- Filename sanitization and extension preservation
- Dangerous executable skip rules
- Popup UI with toggle, status, preview, and recent renames
- Options page with templates, domain rules, history, privacy, and data controls
- `chrome.storage.local` settings and history
- Unit tests for filename logic

## Privacy Model

Smart Download Renamer works locally in your browser. It uses download metadata only to suggest cleaner filenames. Your filenames, URLs, and rules are not sent to any server.

Stored locally:

- User settings
- Domain rules
- Recent rename records
- Theme preference

Not stored or collected:

- File contents
- Downloaded files
- Sensitive document text
- Browsing history
- Cookies
- Account data
- Analytics events

## Permissions

- `downloads`: needed to detect downloads and suggest filenames.
- `storage`: needed to save local settings, naming rules, theme preference, and recent rename history.

The MVP intentionally avoids `history`, `cookies`, `webRequest`, `identity`, broad host permissions, content scripts, and remote code.

## Naming Formats

Default:

```text
{date}_{source}_{type}.{ext}
```

Included presets:

```text
{date}_{source}_{type}.{ext}
{source}_{date}_{type}.{ext}
{type}_{source}_{date}.{ext}
{date}/{source}_{type}.{ext}
{source}/{date}_{type}.{ext}
{date}_{source}_{type}_{original}.{ext}
```

Variables:

- `{date}`
- `{source}`
- `{type}`
- `{original}`
- `{ext}`

## Document Categories

Supported categories include invoice, receipt, certificate, bank receipt, report, statement, ticket, contract, form, transcript, presentation, image, archive, document, download, and other.

## Safety Rules

- Preserve the original file extension.
- Sanitize invalid filename characters.
- Limit filenames to a configurable maximum length.
- Skip executable files by default: `.exe`, `.msi`, `.bat`, `.cmd`, `.ps1`, `.sh`, `.app`, `.dmg`, `.pkg`.
- Skip already descriptive filenames when enabled.
- Allow domain and keyword ignore rules.
- Use Chrome conflict handling to avoid overwriting existing files.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- Vitest
- Chrome Manifest V3

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Vite serves the popup and options page for UI development. Chrome extension APIs are only available when loaded as an unpacked extension.

## Test

```bash
npm run test
```

## Build

```bash
npm run build
```

The production extension is generated in `dist/`.

## Package

```bash
npm run zip
```

The Chrome Web Store upload ZIP is generated at:

```text
release/smart-download-renamer.zip
```

## Load Unpacked In Chrome

1. Run `npm run build`.
2. Open `chrome://extensions`.
3. Enable Developer mode.
4. Click Load unpacked.
5. Select the `dist/` folder.
6. Download a test PDF from a known source and verify the suggested filename.

## Chrome Web Store Listing Draft

Name:

```text
Smart Download Renamer
```

Short description:

```text
Automatically rename messy downloads into clean, searchable filenames.
```

Single purpose:

```text
Automatically suggest cleaner filenames for downloads.
```

Long description:

```text
Smart Download Renamer helps keep your Downloads folder organized by suggesting clean filenames for downloaded files. Instead of document.pdf, download.pdf, or invoice(3).pdf, your files can be saved with names like 2026-05-26_Trendyol_Invoice.pdf or 2026-05-26_Bootcamp_Certificate.pdf. The extension works locally, requires no account, and does not send your download data to a server.
```

Permission explanation:

- `downloads`: needed to detect downloads and suggest filenames.
- `storage`: needed to save local settings, naming rules, and recent rename history.

Compliance notes:

- One clear purpose
- No login
- No backend
- No hidden data collection
- No ads
- No affiliate tracking
- No broad page access
- Minimal permissions
- No remote code

## Roadmap

### Phase 1: MVP

- Manifest V3 setup
- Downloads listener
- Filename suggestion engine
- Popup UI
- Local settings
- Recent rename history
- Options page
- Tests

### Phase 2: Polish

- Editable category keyword lists
- Import/export settings
- Better skip rules
- More source-specific rules
- Manual undo guidance where Chrome APIs allow it
- Store screenshots for Web Store listing

### Phase 3: Future

- Optional manual review before rename
- Optional current page title extraction
- Optional context menu
- Optional Edge support
- Optional Firefox support
- Optional Turkish UI
- Optional smart folder organization
- Optional local-only AI later

