import React from "react";
import { createRoot } from "react-dom/client";
import "../shared/styles.css";
import { PopupApp } from "./PopupApp";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PopupApp />
  </React.StrictMode>
);
