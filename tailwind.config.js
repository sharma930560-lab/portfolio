/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: { "2xl": "1400px" },
        },
        extend: {
            colors: {
                border:     "hsl(var(--border))",
                input:      "hsl(var(--input))",
                ring:       "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT:    "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT:    "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT:    "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT:    "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT:    "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT:    "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT:    "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                /* Acid Graphic Tokens */
                acid: {
                    green: "#CCFF00",
                    pink:  "#FF00FF",
                    cyan:  "#00F0FF",
                    black: "#000000",
                    dark:  "#0A0A0A",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans:    ["Inter", "system-ui", "sans-serif"],
                serif:   ["Playfair Display", "Georgia", "serif"],
                mono:    ["JetBrains Mono", "monospace"],
                syne:    ["Syne", "sans-serif"],
                cabinet: ["Cabinet Grotesk", "sans-serif"],
                satoshi: ["Satoshi", "sans-serif"],
            },
            boxShadow: {
                "glow-sm":  "0 0 20px rgba(139,92,246,0.15)",
                "glow-md":  "0 0 40px rgba(139,92,246,0.25)",
                "glow-lg":  "0 0 60px rgba(139,92,246,0.35)",
                "hard-sm":  "4px 4px 0px 0px #000000",
                "hard-md":  "8px 8px 0px 0px #000000",
                "acid-sm":  "2px 2px 0px 0px #CCFF00",
                "acid-md":  "4px 4px 0px 0px #CCFF00",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
                marquee: {
                    "0%":   { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-50%)" },
                },
                "push-press": {
                    "0%":   { transform: "translate(0, 0)" },
                    "50%":  { transform: "translate(4px, 4px)" },
                    "100%": { transform: "translate(0, 0)" },
                },
                "glitch": {
                    "0%":   { transform: "translate(0)" },
                    "20%":  { transform: "translate(-2px, 2px)" },
                    "40%":  { transform: "translate(-2px, -2px)" },
                    "60%":  { transform: "translate(2px, 2px)" },
                    "80%":  { transform: "translate(2px, -2px)" },
                    "100%": { transform: "translate(0)" },
                }
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up":   "accordion-up 0.2s ease-out",
                marquee:          "marquee 30s linear infinite",
                glitch:           "glitch 0.2s ease-in-out infinite",
            },
        },
    },
    plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography"), require("@tailwindcss/forms")],
}
