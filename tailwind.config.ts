import type { Config } from "tailwindcss";

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
        "bg-primary": "#070A12",
        "bg-deep-charcoal": "#070A12",
        "bg-paper-navy": "#0D1220",
        "bg-reading-slate": "#111827",
        "surface-editorial": "#F5F3EE",
        "bg-card": "rgba(13, 18, 32, 0.6)",
        "border-vsc": "rgba(255, 255, 255, 0.08)",
        "accent-gold": "#C9A84C",
        "accent-gold-light": "#DFC784",
        "text-primary": "#FFFFFF",
        "text-secondary": "rgba(255, 255, 255, 0.7)",
        "text-muted": "rgba(255, 255, 255, 0.4)",
        "text-slate-muted": "#94A3B8",
        success: "#4ade80",
        loss: "#f87171",
        // shadcn variables mapped to VSC theme
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
        display: ["var(--font-display-next)", "Cormorant Garamond", "serif"],
        ui: [
          "var(--font-ui-next)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: ["var(--font-mono-next)", "DM Mono", "monospace"],
      },
      spacing: {
        "vsc-xs": "4px",
        "vsc-sm": "8px",
        "vsc-md": "16px",
        "vsc-lg": "24px",
        "vsc-xl": "32px",
        "vsc-xxl": "48px",
        "vsc-section": "120px",
      },
      borderRadius: {
        "vsc-sm": "4px",
        "vsc-md": "8px",
        "vsc-lg": "16px",
      },
      boxShadow: {
        "card-hover": "0 15px 30px rgba(0, 0, 0, 0.15)",
        "gold-glow": "0 4px 15px rgba(201, 168, 76, 0.2)",
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
