"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Terminal, MessageSquare } from "lucide-react"

interface BlogClientProps {
    slug: string;
    content: React.ReactNode;
    title: string;
    date: string;
    readTime: string;
    category: string;
}

export default function BlogClient({ slug, content, title, date, readTime, category }: BlogClientProps) {
    return (
        <div id={slug} className="min-h-screen bg-black py-24 relative overflow-hidden selection:bg-primary/30 selection:text-white">
            {/* Background effects */}
            <div className="absolute inset-0 cyber-grid opacity-[0.05] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
                <Link href="/blog" className="h-10 px-4 rounded border border-white/5 bg-[#080808] text-white/40 text-[10px] font-black uppercase tracking-[0.3em] font-mono hover:text-primary hover:border-primary/40 transition-all flex items-center gap-2 mb-16 group w-fit">
                    <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                    EXIT_TO_LIST
                </Link>

                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex flex-wrap items-center gap-6 mb-10 font-mono">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary border border-primary/20 px-3 py-1 rounded bg-primary/5">
                            {category}
                        </span>
                        <div className="flex items-center text-[10px] text-white/20 font-black uppercase tracking-[0.2em]">
                            <Calendar className="mr-2 h-3.5 w-3.5 text-primary/40" />
                            {date}
                        </div>
                        <div className="flex items-center text-[10px] text-white/20 font-black uppercase tracking-[0.2em]">
                            <Clock className="mr-2 h-3.5 w-3.5 text-primary/40" />
                            {readTime}
                        </div>
                    </div>

                    <h1 className="text-4xl sm:text-7xl font-black italic tracking-tighter mb-12 leading-none uppercase text-white">
                        {title}
                    </h1>

                    <div className="bg-[#080808] border border-white/5 p-8 sm:p-14 mb-16 relative overflow-hidden prose prose-invert prose-primary max-w-none group hover:border-white/10 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <Terminal className="h-24 w-24 text-primary" />
                        </div>
                        <div className="relative z-10 font-mono text-white/60 leading-relaxed uppercase text-sm">
                            {content}
                        </div>
                    </div>

                    <div className="bg-[#080808] border border-white/5 p-12 text-center rounded-sm relative overflow-hidden">
                        <div className="absolute inset-0 dot-grid opacity-[0.03] pointer-events-none" />
                        <div className="relative z-10">
                            <h3 className="text-white text-[12px] font-black uppercase tracking-[0.4em] mb-4 font-mono">PROTOCOL_INITIATED</h3>
                            <p className="text-white/40 mb-10 text-[13px] font-mono uppercase tracking-tight max-w-md mx-auto">Interest in deep-dive technical consultations or architectural reviews?</p>
                            <Link href="/contact" className="h-12 px-10 rounded bg-primary text-white text-[10px] font-black uppercase tracking-[0.4em] font-mono hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all inline-flex items-center gap-3">
                                <MessageSquare className="h-4 w-4" /> OPEN_COMMS
                            </Link>
                        </div>
                    </div>
                </motion.article>
            </div>
        </div>
    )
}
