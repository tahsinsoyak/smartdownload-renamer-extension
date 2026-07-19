import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./popup.html", "./options.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#FFFFFF",
        "surface-hover": "#F8FAFF",
        "bg-subtle": "#F1F4FA",
        "border-light": "#DBE3F0",
        ink: "#101C34",
        muted: "#94A3B8",
        "muted-dark": "#64748B",
        accent: "#2563EB",
        "accent-soft": "#E8EFFF",
        "accent-dark": "#1D4ED8",
        night: "#081426",
        panel: "#111F35",
        lift: "#1B2B45",
      },
      boxShadow: {
        card: "0 8px 24px rgba(23, 55, 112, 0.06), 0 1px 2px rgba(23, 55, 112, 0.04)",
        "card-hover": "0 12px 30px rgba(23, 55, 112, 0.10), 0 2px 4px rgba(23, 55, 112, 0.05)",
        ring: "0 0 0 3px rgba(37, 99, 235, 0.15)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        rise: "rise 200ms ease-out both",
        fadeIn: "fadeIn 150ms ease-out both",
      },
    },
  },
  plugins: [],
} satisfies Config;
