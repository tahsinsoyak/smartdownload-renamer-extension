import path from "node:path";
import {
  background,
  ensureAssetDirectory,
  iconBuffer,
  roundedImage,
  screenshotDir,
  storyText,
  writeComposite,
} from "./shared.mjs";

const WIDTH = 1280;
const HEIGHT = 800;

const popupStories = [
  {
    filename: "screenshot-01-latest-download.png",
    source: "popup-light.png",
    kicker: "DOWNLOADS, MADE FINDABLE",
    title: "Know the filename.",
    title2: "Know the folder.",
    body: "See the clean name, original name, saved location,",
    body2: "source, size, and file type in one calm view.",
    proof: "Everything important, immediately visible",
  },
  {
    filename: "screenshot-02-turkish-dark.png",
    source: "popup-dark-tr.png",
    kicker: "ENGLISH + TÜRKÇE",
    title: "Comfortable in",
    title2: "your language.",
    body: "Switch the entire interface without changing your",
    body2: "filename templates or trusted naming behavior.",
    proof: "Localized light and dark themes",
  },
];

const optionsStories = [
  {
    filename: "screenshot-03-smart-settings.png",
    source: "options-general.png",
    kicker: "CLEAR, SAFE CONTROL",
    title: "Renaming that fits",
    title2: "the way you work.",
    body: "Choose conflict handling, protect applications,",
    body2: "set language, and preview the result instantly.",
    proof: "Settings stay in this browser",
  },
  {
    filename: "screenshot-04-domain-rules.png",
    source: "options-domains-dark.png",
    kicker: "WEBSITE-SPECIFIC RULES",
    title: "Familiar sources.",
    title2: "Predictable names.",
    body: "Teach the extension how Amazon, Udemy, GitHub,",
    body2: "and the sites you trust should appear in filenames.",
    proof: "No access to page contents required",
  },
  {
    filename: "screenshot-05-local-history.png",
    source: "options-history.png",
    kicker: "PRIVATE DOWNLOAD HISTORY",
    title: "Find every renamed",
    title2: "file again.",
    body: "Search the final name, original name, source,",
    body2: "status, and saved location—all stored locally.",
    proof: "No account, analytics, or backend",
  },
];

async function renderPopupStory(story) {
  const screenshot = await roundedImage(path.join(screenshotDir, story.source), 420, story.source.includes("extension") ? 492 : 600, 22, "cover");
  const icon = await iconBuffer(56);
  const screenshotHeight = story.source.includes("extension") ? 492 : 600;
  const screenshotTop = Math.round((HEIGHT - screenshotHeight) / 2);
  const svg = `
    ${background(WIDTH, HEIGHT)}
    ${storyText(story)}
    <rect x="760" y="${screenshotTop}" width="420" height="${screenshotHeight}" rx="22" fill="#fff" filter="url(#panel-shadow)"/>
    <text x="134" y="740" fill="#9EB2CC" font-family="Segoe UI, Arial, sans-serif" font-size="13">Smart Download Renamer</text>
  `;
  await writeComposite(story.filename, WIDTH, HEIGHT, svg, [
    { input: screenshot, left: 760, top: screenshotTop },
    { input: icon, left: 66, top: 704 },
  ]);
}

async function renderOptionsStory(story) {
  const screenshot = await roundedImage(path.join(screenshotDir, story.source), 720, 492, 19, "cover");
  const icon = await iconBuffer(52);
  const svg = `
    ${background(WIDTH, HEIGHT)}
    ${storyText({ ...story, x: 62, y: 108 })}
    <rect x="510" y="144" width="720" height="492" rx="19" fill="#fff" filter="url(#panel-shadow)"/>
    <rect x="509.5" y="143.5" width="721" height="493" rx="19.5" fill="none" stroke="#FFFFFF" stroke-opacity=".22"/>
    <text x="118" y="747" fill="#9EB2CC" font-family="Segoe UI, Arial, sans-serif" font-size="13">Smart Download Renamer</text>
  `;
  await writeComposite(story.filename, WIDTH, HEIGHT, svg, [
    { input: screenshot, left: 510, top: 144 },
    { input: icon, left: 54, top: 712 },
  ]);
}

await ensureAssetDirectory();
for (const story of popupStories) await renderPopupStory(story);
for (const story of optionsStories) await renderOptionsStory(story);

console.log("Generated five Chrome Web Store screenshots.");
