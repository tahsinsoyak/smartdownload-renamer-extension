# Submission checklist

## Developer account

- Add and verify a monitored contact email.
- Choose trader or non-trader status based on the real legal and commercial context.
- Use truthful publisher identity and address information where Google requires it.
- Enable review and publication notifications.

## Public documentation

- Merge the privacy policy and support documentation into public `main`.
- Open the privacy-policy URL in a logged-out browser window and confirm it is publicly readable.
- Confirm the support URL reaches the repository issue tracker.
- Confirm every privacy statement matches the shipped package.

## Extension package

- Run `npm run release:check`.
- Load `dist` unpacked in `chrome://extensions`.
- Test automatic renaming, skipped downloads, Open file, Show in folder, History, clear-data controls, theme, English, and Turkish.
- Run `npm run zip` only after the final build.
- Confirm `manifest.json` is at the ZIP root.
- Compute and record the SHA-256 hash only after the final ZIP is created.

## Store listing

- Paste the English and Turkish listing copy from `listings`.
- Select Productivity as the primary category.
- Add the homepage, support, and privacy-policy URLs from `listing.md`.
- Upload the 128 × 128 icon, at least one 1280 × 800 screenshot, and the 440 × 280 small promotional tile.
- Paste permission explanations from `permission-justifications.md`.
- Complete data disclosures from `privacy-practices.md`.
- Select **No remote code**.
- Add the no-login reviewer instructions from `listing.md`; leave username and password blank.

## Final review

- Confirm all listing claims match the version being uploaded.
- Verify the Patreon link is voluntary and does not unlock features.
- Preview both localized listings and check Turkish characters and layout.
- Confirm the extension requests only `downloads`, `downloads.open`, and `storage`.
- Submit only after the dashboard reports no missing required fields.
- Decide whether an approved release should publish automatically or wait for manual publication.

The Chrome Web Store upload and final submission are account-holder actions and are not completed by repository changes alone.
