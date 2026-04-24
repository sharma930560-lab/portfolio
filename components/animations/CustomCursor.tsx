"use client"

import { useEffect, useState } from "react"
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"


const CustomCursor = () => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Simplified spring config — fewer springs = less CPU on scroll
  const springConfig = { damping: 25, stiffness: 400 }
  const trailConfig = { damping: 35, stiffness: 150 }

  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)
  
  const trailX = useSpring(cursorX, trailConfig)
  const trailY = useSpring(cursorY, trailConfig)

  // Single trail instead of 3 to reduce CPU
  const trails = [
    { x: trailX, y: trailY, color: "#CCFF00" },
  ]

  const dotX = useSpring(cursorX, { damping: 40, stiffness: 900 })
  const dotY = useSpring(cursorY, { damping: 40, stiffness: 900 })

  const [state, setState] = useState<"default" | "pointer" | "text" | "drag">("default")
  const [isVisible, setIsVisible] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const touchPointer = window.matchMedia("(pointer: coarse)").matches
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setIsEnabled(!touchPointer && !reducedMotion)
  }, [])

  useEffect(() => {
    if (!isEnabled) return

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)

      const t = e.target as HTMLElement
      const cursor = window.getComputedStyle(t).cursor
      const isDrag = t.closest(".scroll-row") || t.closest(".drag-target")
      
      if (isDrag) {
        setState("drag")
      } else if (cursor === "pointer" || t.tagName === "A" || t.tagName === "BUTTON" || t.closest("button") || t.closest("a")) {
        setState("pointer")
      } else if (cursor === "text" || t.tagName === "INPUT" || t.tagName === "TEXTAREA") {
        setState("text")
      } else {
        setState("default")
      }
    }

    const mouseDown = () => setState("drag")
    const mouseUp = () => setState("default")

    const hide = () => setIsVisible(false)
    const show = () => setIsVisible(true)

    // Passive listener so scroll is never blocked
    window.addEventListener("mousemove", move, { passive: true })
    window.addEventListener("mousedown", mouseDown, { passive: true })
    window.addEventListener("mouseup", mouseUp, { passive: true })
    document.addEventListener("mouseleave", hide)
    document.addEventListener("mouseenter", show)
    
    // Hide default cursor when custom cursor is active
    document.body.style.cursor = "none"

    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mousedown", mouseDown)
      window.removeEventListener("mouseup", mouseUp)
      document.removeEventListener("mouseleave", hide)
      document.removeEventListener("mouseenter", show)
      document.body.style.cursor = "auto"
    }
  }, [cursorX, cursorY, isVisible, isEnabled])

  const ringVariants = {
    default: { width: 36, height: 36, opacity: 0.4, borderColor: "rgba(204,255,0,0.2)" },
    pointer: { width: 64, height: 64, opacity: 1, borderColor: "rgba(204,255,0,0.8)", backgroundColor: "rgba(204,255,0,0.05)" },
    text: { width: 4, height: 24, opacity: 0.8, borderColor: "rgba(255,0,255,0.5)", backgroundColor: "rgba(255,0,255,0.5)" },
    drag: { width: 48, height: 48, opacity: 0.8, borderColor: "rgba(0,240,255,0.4)", scale: 0.8 },
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 pointer-events-none z-[99999]">
          {/* Trail Layer */}
          {trails.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute top-0 left-0 w-2 h-2 rounded-full hidden md:block"
              style={{
                translateX: pos.x,
                translateY: pos.y,
                x: "-50%",
                y: "-50%",
                background: pos.color,
                opacity: 0.35,
                filter: "blur(4px)",
                scale: 1.6,
                willChange: "transform",
              }}
            />
          ))}

          {/* Outer Ring */}
          <motion.div
            className="absolute top-0 left-0 hidden md:flex items-center justify-center rounded-full border border-white/20"
            style={{ 
                translateX: smoothX, 
                translateY: smoothY, 
                x: "-50%", 
                y: "-50%",
                boxShadow: state === "pointer" ? "0 0 20px rgba(63,177,255,0.3)" : "none",
                willChange: "transform",
            }}
            animate={ringVariants[state]}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />

          {/* Main Dot */}
          <motion.div
            className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-white hidden md:block"
            style={{
              translateX: dotX,
              translateY: dotY,
              x: "-50%",
              y: "-50%",
              boxShadow: "0 0 10px rgba(255,255,255,0.8)",
              willChange: "transform",
            }}
            animate={{ 
                scale: state === "pointer" ? 1.5 : state === "text" ? 0 : 1,
                opacity: state === "text" ? 0 : 1 
            }}
          />
        </div>
      )}
    </AnimatePresence>
  )
}

export default function CustomCursorWrapper() {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  if (pathname?.startsWith("/cv")) return null
  
  return <CustomCursor />
}
