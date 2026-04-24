"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Sparkles, Code2, Rocket, Brain } from "lucide-react"

interface CaseStudyClientProps {
    slug: string;
}

export default function CaseStudyClient({ slug }: CaseStudyClientProps) {
    const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")

    return (
        <div className="min-h-screen bg-background py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
                <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-12 group">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Portfolio
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <Sparkles className="h-6 w-6" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">Case Study</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
                        {title}
                    </h1>

                    <div className="glass-card p-8 sm:p-12 mb-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Rocket className="h-32 w-32" />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Brain className="h-6 w-6 text-primary" />
                                Engineering Deep Dive
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                I&apos;m currently documenting the architectural complexities and technical breakthroughs for <strong>{title}</strong>.
                                This case study will reveal the full development process, from initial strategy to production-grade deployment.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <h3 className="font-bold mb-2 flex items-center gap-2">
                                        <Code2 className="h-4 w-4 text-primary" />
                                        Core Technologies
                                    </h3>
                                    <p className="text-sm text-muted-foreground">Architecting scalable solutions with modern framework ecosystems.</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <h3 className="font-bold mb-2 flex items-center gap-2">
                                        <Rocket className="h-4 w-4 text-primary" />
                                        Key Impact
                                    </h3>
                                    <p className="text-sm text-muted-foreground">Delivering measurable results through intelligent automation pipelines.</p>
                                </div>
                            </div>

                            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold animate-pulse">
                                <div className="h-2 w-2 rounded-full bg-primary" />
                                Documentation in Progress
                            </div>
                        </div>
                    </div>

                    <div className="text-center py-12">
                        <p className="text-muted-foreground mb-8">Want to learn more about this project right now?</p>
                        <Link href="/contact" className="inline-flex h-12 items-center justify-center px-8 rounded-lg bg-primary text-white font-bold glow-blue transition-opacity hover:opacity-90">
                            Contact for Project Details
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
