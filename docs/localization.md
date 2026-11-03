# Localization

English is the canonical fallback language.

## Supported languages

- English (`en`)
- Turkish (`tr`)
- Spanish (`es`)
- German (`de`)
- French (`fr`)
- Brazilian Portuguese (`pt-BR`; Chrome locale `pt_BR`)

Chrome manifest metadata is stored in `public/_locales`. The popup and options interface use the typed catalog in `src/shared/locales`.

The first time the extension runs, it uses Chrome's interface language when supported and otherwise falls back to English. Users can change the interface language from **Settings > General > Interface language**. The selection is saved only in `chrome.storage.local`.

Interface language and filename behavior are intentionally separate. Changing the interface language translates labels, help text, dates, relative times, file sizes, statuses, and document-type labels shown in the UI. It does not silently alter an existing filename template or stored rename history.

## Add another language

1. Add the language code and metadata to `src/shared/locales/catalog.ts`.
2. Create a locale file with `createLocale({ ... })`, translating from `src/shared/locales/en.ts`.
3. Register the locale in `src/shared/locales/index.ts`.
4. Add `public/_locales/<chrome_locale>/messages.json` for Chrome's localized name and description.
5. Add locale tests and run `npm run release:check`.

Chrome Web Store listing translations are managed separately from the extension interface.

New user-facing text must be added to English first. Missing translations automatically fall back to readable English copy.
