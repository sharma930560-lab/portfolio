"use client"

import { useEffect, useRef } from "react"

/* Pure CSS/Canvas animated starfield — no Three.js */
export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let raf: number
        const stars: { x: number; y: number; r: number; vx: number; vy: number; color: string }[] = []
        const colors = ["#CCFF00", "#FF00FF", "#00F0FF", "#FFFFFF"]

        function resize() {
            canvas!.width = window.innerWidth
            canvas!.height = window.innerHeight
        }
        resize()
        window.addEventListener("resize", resize)

        // Seed stars
        for (let i = 0; i < 120; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.5 + 0.3,
                vx: (Math.random() - 0.5) * 0.15,
                vy: (Math.random() - 0.5) * 0.15,
                color: colors[Math.floor(Math.random() * colors.length)],
            })
        }

        function draw() {
            if (!ctx || !canvas) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            for (const s of stars) {
                // Move
                s.x += s.vx
                s.y += s.vy
                if (s.x < 0) s.x = canvas.width
                if (s.x > canvas.width) s.x = 0
                if (s.y < 0) s.y = canvas.height
                if (s.y > canvas.height) s.y = 0

                // Draw glow dot
                const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3)
                grd.addColorStop(0, s.color + "cc")
                grd.addColorStop(1, s.color + "00")
                ctx.beginPath()
                ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2)
                ctx.fillStyle = grd
                ctx.fill()
            }

            raf = requestAnimationFrame(draw)
        }

        draw()

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener("resize", resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: -1, opacity: 0.6 }}
        />
    )
}
