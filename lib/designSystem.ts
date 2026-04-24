/*
  DESIGN SYSTEM TOKENS  ·  lib/designSystem.ts
  Updated to elegant dark system matching aayushbharti.in
*/

export const DS = {
    /* ── Colors ── */
    color: {
        primary:     "#8b5cf6",   // Purple Accent
        bg:          "#0a0a0a",   // Deep Dark
        accent:      "#8b5cf6",   // Purple
        black:       "#0a0a0a",
        white:       "#f5f5f5",
        surface:     "#111111",   // Card surface
        surfaceDark: "#0a0a0a",
        muted:       "rgba(245, 245, 245, 0.4)",
        mutedLight:  "rgba(255, 255, 255, 0.6)",
    },

    /* ── Typography ── */
    font: {
        heading: "'Playfair Display', Georgia, serif",
        body:    "'Inter', system-ui, sans-serif",
        mono:    "'JetBrains Mono', monospace",
    },

    /* ── Borders ── */
    border: {
        standard: "1px solid rgba(255,255,255,0.08)",
        thick:    "1px solid rgba(255,255,255,0.12)",
    },

    /* ── Shadows (soft glows) ── */
    shadow: {
        sm:      "0 0 20px rgba(139,92,246,0.15)",
        md:      "0 0 30px rgba(139,92,246,0.2)",
        lg:      "0 0 50px rgba(139,92,246,0.25)",
        xl:      "0 0 80px rgba(139,92,246,0.3)",
        inverse: "0 4px 24px rgba(0,0,0,0.5)",
        none:    "none",
    },

    /* ── Border radius ── */
    radius: {
        none: "12px",
        sm:   "8px",
        md:   "12px",
        lg:   "16px",
    },

    /* ── Spacing (8-point grid) ── */
    space: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
        "4xl": "80px",
    },

    /* ── Transitions ── */
    transition: {
        fast: "all 0.2s ease",
        base: "all 0.3s ease",
    },

    /* ── Hover lift ── */
    lift: {
        transform: "translateY(-2px)",
        boxShadow: "0 0 40px rgba(139,92,246,0.3)",
    },
} as const
