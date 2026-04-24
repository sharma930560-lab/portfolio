/*
  FOOTER  ·  components/Footer.tsx
  Minimal dark footer — aayushbharti.in aesthetic
*/

"use client"

import * as React from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, ArrowUpRight, Twitter } from "lucide-react"
import Magnetic from "@/components/animations/Magnetic"

const FOOT_GENERAL = [
    { label: "Home",     href: "/" },
    { label: "Work",     href: "/projects" },
    { label: "Stack",    href: "/skills" },
    { label: "About",    href: "/about" },
    { label: "Contact",  href: "/contact" },
    { label: "CV",       href: "/cv" },
]

const FOOT_CONNECT = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/paras-sharma-dev007", icon: <Linkedin size={14} /> },
    { label: "Twitter",  href: "#",  icon: <Twitter size={14} /> },
    { label: "Email",    href: "mailto:ps9110831@gmail.com", icon: <Mail size={14} /> },
]

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/5 py-24 text-white pb-12 relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-acid-green/5 blur-[120px] rounded-full -mr-64 -mb-64 pointer-events-none" />
            
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">

                {/* Top row: branding + cols */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">

                    {/* Branding */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-black border-2 border-acid-pink flex items-center justify-center font-syne font-black text-acid-pink text-xl italic">
                                PS
                            </div>
                            <div className="flex flex-col">
                                <span className="font-syne font-black text-white text-2xl tracking-tighter uppercase leading-none italic">
                                    Paras Sharma
                                </span>
                                <span className="font-mono text-[9px] text-acid-green tracking-[0.4em] font-bold mt-1 opacity-60">
                                    ENGINEER_PROTOCOL_V4
                                </span>
                            </div>
                        </div>
                        <p className="font-mono text-sm leading-relaxed text-white/40 max-w-[360px] uppercase tracking-tighter">
                            Full-Stack Engineer & AI Systems Architect. Building high-performance autonomous systems and premium digital interfaces.
                        </p>
                        <div className="mt-8 flex items-center font-mono text-[10px] uppercase text-acid-green tracking-[0.3em] font-black gap-3 bg-white/5 w-fit px-4 py-2 border border-white/5">
                            <div className="w-2 h-2 bg-acid-green shadow-[0_0_10px_var(--acid-green)] animate-pulse" />
                            STATUS: NODE_ACTIVE
                        </div>
                    </div>

                    {/* General links */}
                    <div>
                        <p className="font-mono text-[10px] font-black uppercase text-acid-pink tracking-[0.4em] mb-8 border-b border-white/5 pb-2 w-fit">
                            NAV_MAP
                        </p>
                        <ul className="flex flex-col gap-4">
                            {FOOT_GENERAL.map((item) => (
                                <li key={item.label}>
                                    <Magnetic strength={0.2}>
                                        <Link
                                            href={item.href}
                                            className="font-mono text-[11px] text-white/40 hover:text-acid-green transition-all inline-flex items-center gap-2 uppercase font-bold tracking-widest group"
                                        >
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">0x</span>
                                            {item.label}
                                        </Link>
                                    </Magnetic>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect links */}
                    <div>
                        <p className="font-mono text-[10px] font-black uppercase text-acid-pink tracking-[0.4em] mb-8 border-b border-white/5 pb-2 w-fit">
                            CONNECT_PROT
                        </p>
                        <ul className="flex flex-col gap-4">
                            {FOOT_CONNECT.map((item) => (
                                <li key={item.label}>
                                    <Magnetic strength={0.2}>
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-mono text-[11px] text-white/40 hover:text-cyan hover:drop-shadow-[0_0_10px_var(--cyan)] transition-all inline-flex items-center gap-3 uppercase font-bold tracking-widest group"
                                        >
                                            <span className="text-white/20 group-hover:text-cyan transition-colors">{item.icon}</span>
                                            {item.label}
                                            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all translate-x-[-4px] group-hover:translate-x-0" />
                                        </a>
                                    </Magnetic>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30">
                    <p className="font-mono text-[9px] text-white tracking-[0.2em] uppercase font-bold">
                        © 2026 Paras Sharma // ALL_RIGHTS_RESERVED
                    </p>
                    <div className="flex gap-8">
                        <p className="font-mono text-[9px] text-white tracking-[0.2em] uppercase font-bold">
                            ENCRYPTED_SSL
                        </p>
                        <p className="font-mono text-[9px] text-white tracking-[0.2em] uppercase font-bold">
                            UP_IN_THE_CLOUD
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
