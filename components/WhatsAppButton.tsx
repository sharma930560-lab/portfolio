"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
    const waUrl = "https://wa.me/919305601506?text=Hello%20Paras%2C%20I%20want%20to%20discuss%20a%20project"

    return (
        <motion.a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="fixed bottom-6 left-6 z-[100] print:hidden"
            style={{
                width: "52px",
                height: "52px",
                background: "#25D366",
                border: "2px solid #000",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "4px 4px 0 #000",
                textDecoration: "none",
                transition: "all 0.15s cubic-bezier(0.175,0.885,0.32,1.275)",
            }}
            whileHover={{ scale: 1, x: 4, y: 4, boxShadow: "0px 0px 0px #000" }}
            whileTap={{ scale: 0.95 }}
        >
            <MessageCircle size={22} color="#fff" fill="#fff" />
        </motion.a>
    )
}
