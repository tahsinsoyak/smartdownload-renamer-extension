import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./popup.html", "./options.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        muted: "#64748B",
        line: "#E2E8F0",
        cloud: "#F8FAFC",
        night: "#020617",
        panel: "#0F172A",
        lift: "#1E293B",
        accent: "#2563EB"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 23, 42, 0.10)",
        glow: "0 18px 50px rgba(37, 99, 235, 0.18)"
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        check: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        }
      },
      animation: {
        rise: "rise 260ms ease-out both",
        check: "check 180ms ease-out both"
      }
    }
  },
  plugins: []
} satisfies Config;
