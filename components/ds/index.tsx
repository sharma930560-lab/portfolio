/*
  DS COMPONENTS  ·  components/ds/index.tsx
  VERSION: ACID GRAPHIC / TECHNO-SURREALISM
  Strictly hard edges, high contrast, experimental typography.
*/

"use client"

import * as React from "react"
import { motion } from "framer-motion"

/* ─────────────────────────────────────────────────────────────────────────────
   TYPOGRAPHY HELPERS
   Chromatic Aberration & Stretched Styles
─────────────────────────────────────────────────────────────────────────────── */

export function ChromaticText({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    return (
        <span className={`text-chromatic ${className}`}>
            {children}
        </span>
    )
}

export function OutlineText({ children }: { children: React.ReactNode }) {
    return (
        <span className="text-stroke-acid" style={{ fontStyle: "italic" }}>
            {children}
        </span>
    )
}

/* ─────────────────────────────────────────────────────────────────────────────
   BUTTON  —  Acid Hard Edge style
─────────────────────────────────────────────────────────────────────────────── */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "black" | "outline" | "chrome"
    size?: "sm" | "md" | "lg"
    as?: any
    href?: string
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    target?: string
    rel?: string
}

export function Button({
    children, variant = "primary", size = "md", as: Tag = "button",
    href, leftIcon, rightIcon, target, rel, disabled, style = {}, className, ...rest
}: ButtonProps) {
    const [hovered, setHovered] = React.useState(false)

    const isOutline = variant === "outline" || variant === "secondary"
    const isBlack   = variant === "black"
    const isChrome  = variant === "chrome"

    const padding = size === "sm"  ? "0.4rem 1rem"
                  : size === "lg"  ? "1rem 2.5rem"
                  : "0.75rem 2rem"

    const fontSize = size === "sm" ? "clamp(0.7rem, 1.2vw, 0.85rem)" : size === "lg" ? "clamp(0.9rem, 2vw, 1.2rem)" : "clamp(0.8rem, 1.5vw, 1rem)"

    const s: React.CSSProperties = {
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "12px",
        padding: "10px 16px",
        minHeight: "44px",
        minWidth: "fit-content",
        background: isOutline ? "transparent" : isBlack ? "#0a0a0a" : isChrome ? "linear-gradient(135deg, #FFFFFF 0%, #C0C0C0 50%, #FFFFFF 100%)" : "var(--acid-green)",
        color: isOutline ? "#fff" : isChrome ? "#000" : "#000",
        border: isOutline ? "1px solid var(--acid-green)" : "none",
        borderRadius: "0",
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        cursor: disabled ? "not-allowed" : "pointer",
        textDecoration: "none",
        boxShadow: hovered && !disabled && !isChrome
            ? `4px -4px 0px var(--hyper-pink)`
            : hovered && !disabled && isChrome
            ? `4px -4px 0px var(--hyper-pink), inset 0 0 10px rgba(255, 255, 255, 0.8)`
            : isChrome ? "inset 0 0 10px rgba(255, 255, 255, 0.8), 0 0 5px rgba(255, 255, 255, 0.2)" : "none",
        transform: hovered && !disabled ? "translate(-2px, 2px)" : "none",
        transition: "all 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67)",
        opacity: disabled ? 0.5 : 1,
        ...style,
    } as React.CSSProperties

    const content = <>{leftIcon}<span>{children}</span>{rightIcon}</>

    if (Tag === "a" && href) {
        return (
            <a href={href} style={s} className={`glitch-hover ${className}`} target={target} rel={rel}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}>
                {content}
            </a>
        )
    }

    return (
        <button {...rest} disabled={disabled} style={s} className={`glitch-hover ${className}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            {content}
        </button>
    )
}

/* ─────────────────────────────────────────────────────────────────────────────
   CARD  —  Acid Slab
─────────────────────────────────────────────────────────────────────────────── */

interface CardProps {
    children: React.ReactNode
    bg?: string
    shadow?: "sm" | "md" | "lg" | "inverse"
    hover?: boolean
    style?: React.CSSProperties
    className?: string
    onClick?: () => void
    as?: "div" | "a" | "article"
    href?: string
}

export function Card({
    children, bg = "var(--bg-secondary)", shadow = "lg",
    hover = true, style = {}, className, onClick, as: Tag = "div", href,
}: CardProps) {
    const [hovered, setHovered] = React.useState(false)
    const [rotate, setRotate] = React.useState({ x: 0, y: 0 })
    const cardRef = React.useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!hover || !cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = (y - centerY) / 20
        const rotateY = (centerX - x) / 20
        setRotate({ x: rotateX, y: rotateY })
    }

    const handleMouseLeave = () => {
        setHovered(false)
        setRotate({ x: 0, y: 0 })
    }

    const s: React.CSSProperties = {
        background: bg,
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "0",
        boxShadow: hover && hovered ? "-8px 8px 0px var(--acid-green)" : "none",
        borderColor: hover && hovered ? "var(--acid-green)" : "rgba(255,255,255,0.05)",
        transition: hovered ? "none" : "all 0.5s ease-out",
        position: "relative",
        overflow: "hidden",
        transformStyle: "preserve-3d",
        transform: hover && hovered 
            ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(10px)` 
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
        ...style,
    }

    const interactiveProps = {
        style: s, 
        className: `interactive-card ${className || ""}`, 
        onClick,
        onMouseEnter: () => setHovered(true),
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
    }
    
    const blobBackground = (
        <div 
            className="absolute inset-0 z-0 pointer-events-none opacity-20 transition-opacity duration-500"
            style={{ opacity: hovered && hover ? 0.4 : 0.1 }}
        >
            <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-acid-green mix-blend-overlay blur-[80px] rounded-full animate-pulse" />
        </div>
    )

    const contentWrapper = (
        <div className="relative z-10 h-full" style={{ transform: "translateZ(20px)" }}>
            {children}
        </div>
    )

    if (Tag === "a" && href) {
        return (
            <a href={href} {...interactiveProps} ref={cardRef as any} style={{ ...s, textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                {blobBackground}
                {contentWrapper}
            </a>
        )
    }
    
    return (
        <div {...interactiveProps} ref={cardRef}>
            {blobBackground}
            {contentWrapper}
        </div>
    )
}

/* ─────────────────────────────────────────────────────────────────────────────
   BADGE  —  Acid Tag
─────────────────────────────────────────────────────────────────────────────── */

interface BadgeProps {
    children: React.ReactNode
    variant?: "volt" | "dark" | "white"
    rotated?: boolean
    style?: React.CSSProperties
    className?: string
    dot?: boolean
}

export function Badge({ children, variant = "volt", rotated, style = {}, className, dot }: BadgeProps) {
    return (
        <span className={className} style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "0.25rem 0.75rem",
            background: variant === "dark" ? "#000" : "rgba(204, 255, 0, 0.1)",
            color: variant === "white" ? "#fff" : "var(--acid-green)",
            border: "1px solid var(--acid-green)",
            borderRadius: "0",
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700, fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            transform: rotated ? "rotate(-3deg)" : "none",
            ...style,
        }}>
            {dot && (
                <span style={{
                    width: "4px", height: "4px",
                    background: "var(--acid-green)",
                    borderRadius: "0",
                    display: "inline-block",
                    animation: "glitch 0.2s infinite",
                }} />
            )}
            {children}
        </span>
    )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION WRAPPERS
   Grid background & strict separators
─────────────────────────────────────────────────────────────────────────────── */

interface SectionProps {
    children: React.ReactNode
    bg?: string
    bordered?: boolean
    style?: React.CSSProperties
    id?: string
    InnerClassName?: string
}

export function Section({ children, bg = "#000", bordered = true, style = {}, id, InnerClassName }: SectionProps) {
    return (
        <section id={id} className="bg-grid-acid" style={{
            background: bg,
            borderBottom: bordered ? "1px solid var(--border)" : undefined,
            position: "relative",
            overflow: "hidden",
            ...style,
        }}>
            <div className={InnerClassName}>
                {children}
            </div>
        </section>
    )
}

export function SectionInner({ children, style = {}, className }: { children: React.ReactNode, style?: React.CSSProperties, className?: string }) {
    return (
        <div className={className} style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "3rem 1rem",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            ...style,
        }}>
            {children}
        </div>
    )
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE HEADER
   Aggressive Display Typography
─────────────────────────────────────────────────────────────────────────────── */

interface PageHeaderProps {
    badge?: string
    title: React.ReactNode
    subtitle?: string
    children?: React.ReactNode
}

export function PageHeader({ badge, title, subtitle, children }: PageHeaderProps) {
    return (
        <div className="bg-grid-acid" style={{
            background: "#000",
            borderBottom: "1px solid var(--acid-green)",
            paddingTop: "6rem",
            paddingBottom: "6rem",
            position: "relative",
            overflow: "hidden",
        }}>
            <div className="scanline" />
            
            <SectionInner style={{ position: "relative", zIndex: 1, paddingTop: "2rem", paddingBottom: "2rem" }}>
                <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                    {badge && (
                        <div style={{ marginBottom: "2rem" }}>
                            <Badge variant="volt" dot>{badge}</Badge>
                        </div>
                    )}
                    <h1 className="text-acid-display text-chromatic" style={{ marginBottom: "2rem" }}>
                        {title}
                    </h1>
                    {subtitle && (
                        <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "1.25rem",
                            color: "var(--text-secondary)",
                            maxWidth: "700px",
                            lineHeight: 1.6,
                            borderLeft: "2px solid var(--acid-green)",
                            paddingLeft: "1.5rem",
                            marginBottom: "2rem"
                        }}>
                            {subtitle}
                        </p>
                    )}
                    {children}
                </motion.div>
            </SectionInner>
        </div>
    )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION HEADER
─────────────────────────────────────────────────────────────────────────────── */

interface SectionHeaderProps {
    badge?: string
    title: React.ReactNode
    subtitle?: React.ReactNode
    align?: "left" | "center"
}

export function SectionHeader({ badge, title, subtitle, align = "center" }: SectionHeaderProps) {
    return (
        <div style={{
            marginBottom: "4rem",
            textAlign: align,
            display: "flex",
            flexDirection: "column",
            alignItems: align === "center" ? "center" : "flex-start",
        }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                style={{ width: "100%", maxWidth: align === "center" ? "900px" : "auto" }}
            >
                {badge && (
                    <div style={{ marginBottom: "1rem" }}>
                        <p className="section-label" style={{ color: "var(--hyper-pink)" }}>// {badge}</p>
                    </div>
                )}
                <h2 className="text-acid-headline text-chromatic" style={{ marginBottom: "1rem" }}>
                    {title}
                </h2>
                {subtitle && (
                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "1.1rem",
                        color: "var(--text-muted)",
                        maxWidth: "600px",
                        margin: align === "center" ? "0 auto" : 0,
                        lineHeight: 1.6,
                    }}>
                        {subtitle}
                    </p>
                )}
                <div style={{ 
                    marginTop: "1.5rem", 
                    width: align === "center" ? "60px" : "100%", 
                    height: "4px", 
                    background: "var(--acid-green)",
                    margin: align === "center" ? "1.5rem auto 0" : "1.5rem 0 0" 
                }} />
            </motion.div>
        </div>
    )
}

/* ─────────────────────────────────────────────────────────────────────────────
   LAYOUT HELPERS
─────────────────────────────────────────────────────────────────────────────── */

export function Grid({ children, columns = 3, gap = "md", style = {} }: { children: React.ReactNode, columns?: 2|3|4, gap?: "sm"|"md"|"lg", style?: React.CSSProperties }) {
    const minWidth = columns === 4 ? "min(220px, 100%)" : columns === 3 ? "min(280px, 100%)" : "min(320px, 100%)"
    const gapValue = gap === "sm" ? "1rem" : gap === "lg" ? "2.5rem" : "1.5rem"
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}, 1fr))`,
            gap: gapValue,
            ...style,
        }}>
            {children}
        </div>
    )
}

export function DotPattern() {
    return <div className="bg-grid-acid" style={{ position: "absolute", inset: 0, opacity: 0.1, pointerEvents: "none" }} />
}

