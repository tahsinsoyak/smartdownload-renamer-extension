import React from "react";
import { createRoot } from "react-dom/client";
import { applyStoredTheme } from "../shared/lib/theme";
import { useSettingsStore } from "../shared/store/useSettingsStore";
import "../shared/styles.css";
import { OptionsApp } from "./OptionsApp";

void applyStoredTheme().then((theme) => {
  useSettingsStore.setState({ theme });
  createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <OptionsApp />
    </React.StrictMode>,
  );
});
