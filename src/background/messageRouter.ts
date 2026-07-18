import { clearHistory, getHistory } from "../shared/lib/storage";

export function registerMessageRouter() {
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type === "GET_HISTORY") {
      getHistory().then((history) => sendResponse({ history }));
      return true;
    }

    if (message?.type === "CLEAR_HISTORY") {
      clearHistory().then(() => sendResponse({ ok: true }));
      return true;
    }

    if (message?.type === "OPEN_DOWNLOADS") {
      chrome.tabs.create({ url: "chrome://downloads/" });
      sendResponse({ ok: true });
      return false;
    }

    if (message?.type === "OPEN_FILE" && Number.isInteger(message.downloadId)) {
      chrome.downloads.open(message.downloadId);
      sendResponse({ ok: true });
      return false;
    }

    if (message?.type === "SHOW_IN_FOLDER") {
      if (Number.isInteger(message.downloadId)) {
        chrome.downloads.show(message.downloadId);
      } else {
        chrome.downloads.showDefaultFolder();
      }
      sendResponse({ ok: true });
      return false;
    }

    return false;
  });
}
