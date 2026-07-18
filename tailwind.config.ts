import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./popup.html", "./options.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#FFFFFF",
        "surface-hover": "#F8FAFD",
        "bg-subtle": "#F3F6FB",
        "border-light": "#DCE4F0",
        ink: "#0B1730",
        muted: "#91A0B7",
        "muted-dark": "#526079",
        accent: "#2563EB",
        "accent-soft": "#E8EFFF",
        "accent-dark": "#1D4ED8",
        night: "#07111F",
        panel: "#0E1B2F",
        lift: "#23324A",
      },
      boxShadow: {
        card: "0 12px 30px rgba(21, 47, 91, 0.07), 0 1px 3px rgba(21, 47, 91, 0.05)",
        "card-hover": "0 16px 36px rgba(21, 47, 91, 0.11), 0 2px 5px rgba(21, 47, 91, 0.06)",
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
