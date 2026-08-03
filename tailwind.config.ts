import type { Config } from "tailwindcss";

/**
 * VSC — Daylight Growth
 *
 * Colour names describe MEANING, not appearance. `growth` is the primary
 * signal whatever hue it holds; `ink` is type whatever tone it holds.
 * Renaming a hex should never require renaming a class.
 *
 * Every text-capable token here clears WCAG AA (4.5:1) on `canvas`.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // --- Paper ---------------------------------------------------
        canvas: {
          DEFAULT: "#FBFAF6",
          sunk: "#F2F0E9",
          deep: "#E9E6DC",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          warm: "#FDFCF9",
        },

        // --- Ink -----------------------------------------------------
        ink: {
          DEFAULT: "#161D18", // 16.44:1
          soft: "#3D4741", //  9.24:1
          muted: "#5B655E", //  5.80:1
          faint: "#6B756E", //  4.58:1
        },

        // --- Signal --------------------------------------------------
        growth: {
          DEFAULT: "#0F7A40", //  5.18:1 on canvas / 5.41:1 white on it
          deep: "#0B6435", //  6.96:1 on canvas / 7.27:1 white on it
          tint: "#E4F2E8",
          wash: "#F1F8F3",
        },
        sprout: "#3FCB74", // GRAPHIC ONLY — never text
        clay: {
          DEFAULT: "#A34524", //  5.86:1
          tint: "#FAEDE6",
          bright: "#C4623C", // GRAPHIC ONLY
        },
        sky: {
          DEFAULT: "#1D4ED8", //  6.42:1 — diagrams and data series only
          tint: "#E8EEFC",
        },

        // --- Structure -----------------------------------------------
        rule: {
          DEFAULT: "#E4E1D8",
          strong: "#CFCBBE",
        },

        // --- Deprecated aliases --------------------------------------
        // Kept so pages not yet re-composed stay coherent. Do not use in
        // new work; delete once every page is on the tokens above.
        "accent-gold": "#0F7A40",
        "accent-gold-light": "#0B6435",
        "bg-primary": "#FBFAF6",
        "bg-deep-charcoal": "#FBFAF6",
        "bg-paper-navy": "#F2F0E9",
        "bg-reading-slate": "#E9E6DC",
        "surface-editorial": "#FDFCF9",
        "bg-card": "#FFFFFF",
        "border-vsc": "#E4E1D8",
        "text-primary": "#161D18",
        "text-secondary": "#3D4741",
        "text-muted": "#5B655E",
        "text-slate-muted": "#5B655E",
        success: "#0F7A40",
        loss: "#A34524",

        // shadcn bridge
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
      },

      fontFamily: {
        // Headlines. Humanist grotesque with real character.
        display: ["var(--font-display-next)", "Bricolage Grotesque", "system-ui", "sans-serif"],
        // Everything else. Chosen for reading, not for looking expensive.
        ui: ["var(--font-ui-next)", "Instrument Sans", "system-ui", "sans-serif"],
        sans: ["var(--font-ui-next)", "Instrument Sans", "system-ui", "sans-serif"],
        // Figures only — never labels, never body copy.
        mono: ["var(--font-mono-next)", "Geist Mono", "ui-monospace", "monospace"],
      },

      fontSize: {
        // Reading-first scale. Body sits at 17px, not 13px.
        "step--1": ["15px", { lineHeight: "1.6", letterSpacing: "0" }],
        "step-0": ["17px", { lineHeight: "1.65", letterSpacing: "-0.005em" }],
        "step-1": ["19px", { lineHeight: "1.6", letterSpacing: "-0.01em" }],
        "step-2": ["clamp(22px, 2.2vw, 30px)", { lineHeight: "1.18", letterSpacing: "-0.02em" }],
        "step-3": ["clamp(30px, 3.8vw, 50px)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "step-4": ["clamp(40px, 5.6vw, 76px)", { lineHeight: "1.06", letterSpacing: "-0.03em" }],
      },

      maxWidth: {
        measure: "68ch",
        "measure-tight": "54ch",
      },

      spacing: {
        "vsc-xs": "4px",
        "vsc-sm": "8px",
        "vsc-md": "16px",
        "vsc-lg": "24px",
        "vsc-xl": "32px",
        "vsc-xxl": "48px",
        "vsc-section": "clamp(72px, 9vw, 128px)",
      },

      borderRadius: {
        "vsc-sm": "6px",
        "vsc-md": "10px",
        "vsc-lg": "14px",
        "vsc-xl": "20px",
      },

      // Warm-tinted elevation. A neutral shadow on warm paper reads dirty.
      boxShadow: {
        "lift-1": "0 1px 2px rgba(38,34,24,0.05), 0 2px 6px rgba(38,34,24,0.04)",
        "lift-2": "0 2px 4px rgba(38,34,24,0.05), 0 8px 20px rgba(38,34,24,0.06)",
        "lift-3": "0 4px 8px rgba(38,34,24,0.05), 0 18px 44px rgba(38,34,24,0.08)",
        "lift-growth": "0 6px 16px rgba(15,122,64,0.16), 0 2px 4px rgba(15,122,64,0.10)",
        // deprecated aliases
        "card-hover": "0 4px 8px rgba(38,34,24,0.05), 0 18px 44px rgba(38,34,24,0.08)",
        "gold-glow": "0 6px 16px rgba(15,122,64,0.16), 0 2px 4px rgba(15,122,64,0.10)",
      },

      transitionTimingFunction: {
        physical: "cubic-bezier(0.22, 1, 0.36, 1)",
        swift: "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      zIndex: {
        back: "-1",
        base: "1",
        nav: "100",
        drawer: "200",
        modal: "300",
      },
    },
  },
  plugins: [],
};

export default config;
