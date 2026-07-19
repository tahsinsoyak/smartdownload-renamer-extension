# Permission justifications

Paste these explanations into the Chrome Web Store Developer Dashboard.

## `downloads`

Required for the extension's single purpose. It observes new downloads, reads Chrome-provided download metadata, suggests a clearer filename before saving, tracks completion, and reveals a completed download in its folder. It does not read downloaded file contents.

## `downloads.open`

Allows the user to open a completed download only after explicitly selecting **Open file** in the popup or History page. The extension never opens files automatically.

## `storage`

Stores the user's settings, filename template, website rules, interface language, theme, and rename history locally in `chrome.storage.local`. The extension has no server and does not transmit this data.

## Host permissions

None requested.

The extension does not request access to all websites or inject content scripts into pages.

## Remote code

Select: `No, I am not using remote code.`

All executable JavaScript and font files are bundled inside the uploaded extension ZIP. The extension does not download or execute remote scripts, remote WebAssembly, or string-evaluated code.
