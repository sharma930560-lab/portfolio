/*
  NAVBAR  ·  components/Navbar.tsx
  REDESIGN: ACID GRAPHIC / TECHNO-SURREALISM
  Strictly black, acid green, hyper pink. Aggressive typography.
  Brutalist logos and high-contrast links.
*/

"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Download, ArrowUpRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ds/index"
import Magnetic from "@/components/animations/Magnetic"

const navLinks = [
    { href: "/",         label: "Home" },
    { href: "/projects", label: "Work" },
    { href: "/skills",   label: "Stack" },
    { href: "/about",    label: "About" },
    { href: "/contact",  label: "Contact" },
]

export default function Navbar() {
    const [open, setOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const pathname = usePathname()

    React.useEffect(() => { setOpen(false) }, [pathname])

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        const handleResize = () => { if (window.innerWidth >= 1024) setOpen(false) }
        window.addEventListener("scroll", handleScroll)
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    if (pathname?.startsWith("/cv")) return null

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-[100] h-[72px] transition-all duration-300 flex items-center border-b ${
                scrolled 
                ? "bg-black/90 backdrop-blur-xl border-[#CCFF00]/20" 
                : "bg-transparent border-transparent"
            }`}>
                <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full flex items-center justify-between">
                    {/* Logo: Brutalist Acid */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 bg-black border-2 border-[#CCFF00] flex items-center justify-center font-black text-[#CCFF00] overflow-hidden group-hover:bg-[#CCFF00] group-hover:text-black transition-all rotate-3 group-hover:rotate-0">
                           <span className="relative z-10 text-xl italic tracking-tighter">PS</span>
                           <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-white text-base sm:text-lg uppercase leading-none group-hover:text-[#CCFF00] transition-colors">
                                Paras.Sharma
                            </span>
                            <span className="font-mono text-[9px] text-[#FF00FF] tracking-[0.16em] font-bold mt-1 opacity-80 group-hover:opacity-100 transition-opacity break-words">
                                PROTOCOL_SYSTEM_V.4
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <Magnetic key={link.href} strength={0.3}>
                                <Link
                                    href={link.href}
                                    className={`px-4 py-2 font-mono text-[11px] font-black uppercase tracking-widest transition-all relative group h-full flex items-center ${
                                        pathname === link.href 
                                        ? "text-[#CCFF00]" 
                                        : "text-white/40 hover:text-white"
                                    }`}
                                >
                                    <span className="relative z-10">{link.label}</span>
                                    
                                    {pathname === link.href && (
                                        <motion.div
                                            layoutId="nav-glow"
                                            className="absolute inset-0 bg-[#CCFF00]/5 border-t border-[#CCFF00]/30"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        />
                                    )}
                                    
                                    {/* Hover Indicator */}
                                    <div className="absolute -bottom-1 left-4 right-4 h-[2px] bg-[#FF00FF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left shadow-[0_0_10px_#FF00FF]" />
                                </Link>
                            </Magnetic>
                        ))}
                    </nav>

                    <div className="hidden lg:flex items-center gap-4">
                        <Button
                            href="/cv"
                            as="a"
                            variant="outline"
                            size="sm"
                            leftIcon={<Download size={13} strokeWidth={3} />}
                        >
                            Fetch_Resume
                        </Button>

                        <Button
                            href="/contact"
                            as="a"
                            variant="chrome"
                            size="sm"
                            rightIcon={<ArrowUpRight size={14} strokeWidth={3} />}
                        >
                            Init_Handshake
                        </Button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setOpen(v => !v)}
                        className="lg:hidden w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 text-white hover:bg-[#CCFF00] hover:text-black hover:border-[#CCFF00] transition-all group"
                    >
                        {open ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* SPACER */}
            <div className="h-[72px]" />

            {/* MOBILE OVERLAY */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[110] bg-black border-l border-[#CCFF00]/30 overflow-y-auto overflow-x-hidden"
                    >
                        {/* Background Noise/Grid */}
                        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(204,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(204,255,0,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
                        
                        <div className="relative z-10 h-full flex flex-col p-8 pt-24">
                            <button
                                onClick={() => setOpen(false)}
                                className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center border border-[#FF00FF] text-[#FF00FF]"
                            >
                                <X size={24} />
                            </button>

                            <div className="mb-12">
                                <span className="font-mono text-[10px] text-[#FF00FF] tracking-[0.4em] mb-2 block font-black">NAV_ROOT</span>
                                <nav className="flex flex-col gap-2">
                                    {navLinks.map((link, i) => (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <Link
                                                href={link.href}
                                                className={`text-[clamp(2rem,14vw,3rem)] font-black uppercase transition-all hover:translate-x-4 leading-tight break-words ${
                                                    pathname === link.href ? "text-[#CCFF00]" : "text-white/30 hover:text-white"
                                                }`}
                                            >
                                                {link.label}.
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>
                            </div>

                                <Button
                                    href="/cv"
                                    as="a"
                                    variant="outline"
                                    size="lg"
                                    className="w-full flex justify-between uppercase italic"
                                    rightIcon={<Download size={18} />}
                                >
                                    Fetch_Resume
                                </Button>
                                <Button
                                    href="/contact"
                                    as="a"
                                    variant="chrome"
                                    size="lg"
                                    className="w-full flex justify-between uppercase italic"
                                    rightIcon={<ArrowUpRight size={18} />}
                                >
                                    Init_Handshake
                                </Button>

                                <div className="mt-auto flex justify-between items-center opacity-30 pb-4">
                                    <div className="font-mono text-[8px] uppercase tracking-widest text-white">
                                        SECURE_CONNECTION_STABLE
                                    </div>
                                    <ShieldCheck size={16} className="text-[#CCFF00]" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
        </>
    )
}
