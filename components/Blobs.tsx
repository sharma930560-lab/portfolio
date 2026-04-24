/*
  BLOBS COMPONENT  ·  components/Blobs.tsx
  Techno-Surrealism background elements.
  Slow, organic movement with acid/pink blurs.
*/

"use client"

import { motion } from "framer-motion"

export default function Blobs() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Acid Blob */}
            <motion.div
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -50, 100, 0],
                    scale: [1, 1.2, 0.9, 1],
                    rotate: [0, 90, -90, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-acid-green opacity-[0.03] blur-[120px] rounded-full"
            />

            {/* Hyper Pink Blob */}
            <motion.div
                animate={{
                    x: [0, -100, 50, 0],
                    y: [0, 100, -50, 0],
                    scale: [1, 1.1, 0.8, 1],
                    rotate: [0, -90, 90, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-hyper-pink opacity-[0.03] blur-[150px] rounded-full"
            />

             {/* Cyan Blob */}
             <motion.div
                animate={{
                    x: [0, 50, -50, 0],
                    y: [0, -100, 50, 0],
                    scale: [1, 0.9, 1.1, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute top-[40%] right-[30%] w-[300px] h-[300px] bg-cyan opacity-[0.02] blur-[100px] rounded-full"
            />
        </div>
    )
}
