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

    return false;
  });
}
