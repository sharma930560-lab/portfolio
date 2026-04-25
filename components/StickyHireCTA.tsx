"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Magnetic from "@/components/animations/Magnetic"

export default function StickyHireCTA() {
    const [visible, setVisible] = useState(false)
    const [compact, setCompact] = useState(false)

    useEffect(() => {
        const syncViewport = () => setCompact(window.innerWidth < 768)
        syncViewport()
        window.addEventListener("resize", syncViewport)
        return () => window.removeEventListener("resize", syncViewport)
    }, [])

    useEffect(() => {
        const handler = () => setVisible(window.scrollY > 300)
        window.addEventListener("scroll", handler, { passive: true })
        return () => window.removeEventListener("scroll", handler)
    }, [])

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 80 }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    style={{
                        position: "fixed",
                        right: compact ? 16 : 0,
                        bottom: compact ? 16 : "auto",
                        top: compact ? "auto" : "50%",
                        transform: compact ? "none" : "translateY(-50%)",
                        zIndex: 90,
                    }}
                    className="print:hidden"
                >
                    <Magnetic strength={0.4}>
                        <Link
                            href="/contact"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: compact ? "12px 14px" : "14px 20px 14px 24px",
                                background: "var(--acid-green)",
                                color: "#000",
                                border: "2px solid #000",
                                borderRight: compact ? "2px solid #000" : "none",
                                borderRadius: "0",
                                fontFamily: "'Syne', sans-serif",
                                fontWeight: 800,
                                fontSize: "0.75rem",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                textDecoration: "none",
                                boxShadow: compact ? "-4px 4px 0px 0px var(--hyper-pink)" : "-6px 6px 0px 0px var(--hyper-pink)",
                                transition: "all 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67)",
                            }}
                            className="group"
                        >
                            {/* Pulsing dot - Acid Green */}
                            <span style={{ position: "relative", display: "flex", width: "10px", height: "10px", flexShrink: 0 }}>
                                <span style={{
                                    position: "absolute",
                                    display: "inline-flex",
                                    width: "100%", height: "100%",
                                    borderRadius: "0",
                                    background: "#000",
                                    opacity: 0.75,
                                    animation: "ping 1.5s ease-in-out infinite",
                                }} />
                                <span style={{
                                    position: "relative",
                                    display: "inline-flex",
                                    width: "10px", height: "100%",
                                    borderRadius: "0",
                                    background: "#000",
                                }} />
                            </span>
                            <span className="hidden sm:inline">Ready_to_Build?</span>
                            <ArrowRight size={14} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Magnetic>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
