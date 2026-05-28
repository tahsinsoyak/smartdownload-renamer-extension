import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./popup.html", "./options.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#FFFFFF",
        "surface-hover": "#FAFAFA",
        "bg-subtle": "#F5F5F4",
        "border-light": "#F0F0EE",
        ink: "#1C1917",
        muted: "#A8A29E",
        "muted-dark": "#78716C",
        accent: "#0D9488",
        "accent-soft": "#F0FDF9",
        "accent-dark": "#0F766E",
        night: "#0C0A09",
        panel: "#1C1917",
        lift: "#292524",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)",
        "card-hover": "0 4px 12px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.03)",
        ring: "0 0 0 2px rgba(13, 148, 136, 0.15)",
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
