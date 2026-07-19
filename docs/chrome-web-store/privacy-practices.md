# Privacy practices answers

Use these answers as a truthful guide for the Chrome Web Store Privacy practices tab. Re-check the dashboard wording before submission because Google can update the form.

## Single purpose

Automatically suggest clearer filenames for downloads and show users the final filename and saved location.

## Data categories handled

Disclose categories that cover the metadata supplied by Chrome even though processing and storage remain local:

- **Web history or browsing activity:** download URL, final URL, referrer, and source domain are processed to detect the source of a download. This information is not retained as a general browsing history.
- **Website content:** the download filename, MIME type, and related metadata supplied by the download source are processed to classify the file and suggest a filename.
- **User-provided content or form data, if the dashboard offers an applicable category:** filename templates, website rules, settings, and search text are used only for extension features and stored locally.

The extension does not read downloaded file contents. It does not handle authentication information, personal communications, health information, payment information, precise location, or financial account data.

For every applicable selected category, state:

- Data is used only for automatic download renaming, download details, history, and user-requested file actions.
- Data is processed locally and is not transmitted to the developer or third parties.
- Data is not sold, used for advertising, or used for creditworthiness or lending.
- Humans cannot read the data because it is never transmitted to the developer.

## Certifications

Certify all applicable Limited Use statements. The extension:

- Does not sell or transfer user data to third parties.
- Does not use or transfer user data for purposes unrelated to its single purpose.
- Does not use user data for personalized advertising.
- Does not use user data for creditworthiness or lending.
- Does not allow humans to read user data.

## Privacy policy URL

After the policy is merged into the public `main` branch, use:

`https://github.com/tahsinsoyak/smartdownload-renamer-extension/blob/main/docs/privacy-policy.md`

## In-product disclosure

The options page includes an About section explaining the metadata handled, permissions used, data not collected or transmitted, local storage, and deletion controls.
