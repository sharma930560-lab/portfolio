import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ExternalLink, Github } from "lucide-react"
import type { Project } from "@/lib/projects"
import * as DS from "@/components/ds/index"

interface ProjectCardProps {
    project: Project
    variant?: "home" | "archive"
}

export function ProjectCard({ project, variant = "archive" }: ProjectCardProps) {
    const isHome = variant === "home"
    const tagsToShow = isHome ? project.tags.slice(0, 3) : project.tags

    return (
        <DS.Card className="project-card flex flex-col h-full overflow-hidden border-2 sm:border-4 border-white/10 hover:border-acid-green transition-all duration-300">
            {/* ── Image Block ── */}
            <div className="project-card-media relative border-b-2 sm:border-b-4 border-white/10 group-hover:border-acid-green aspect-[16/9] w-full overflow-hidden bg-black">
                {project.image ? (
                    <Image
                        src={project.image} 
                        alt={project.title} 
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500 opacity-60 group-hover:opacity-100"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5" />
                )}
                
                {/* Glitch Overlay Effect */}
                <div className="absolute inset-0 bg-acid-green/10 opacity-0 group-hover:opacity-100 mix-blend-overlay pointer-events-none transition-opacity" />
                
                {/* Floating Elements */}
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 max-w-[70%]">
                    <DS.Badge variant="volt">{project.cat}</DS.Badge>
                </div>
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-chrome text-black font-mono font-bold text-[8px] sm:text-[10px] px-2 py-1 z-10">
                    NO_{project.num}
                </div>
            </div>

            {/* ── Content Block ── */}
            <div className="project-card-body p-4 sm:p-6 flex flex-col flex-1 relative z-10">
                <h3 className="project-card-title text-acid-headline mb-3 sm:mb-4 text-white leading-tight uppercase group-hover:text-acid-green transition-colors">
                    {project.title}
                </h3>
                
                {/* Role & Impact */}
                <div className="project-card-meta flex flex-col gap-2 mb-4 sm:mb-6">
                    {project.role && (
                        <div className="project-card-info bg-white/5 text-white/80 p-2.5 sm:p-3 border border-white/10 group-hover:border-acid-green/30 transition-colors">
                            <span className="mono text-[9px] sm:text-[10px] font-bold text-acid-green mr-2 uppercase tracking-widest">Role:</span>
                            <span className="text-[10px] sm:text-xs uppercase font-bold break-words">{project.role}</span>
                        </div>
                    )}
                    {project.impact && (
                        <div className="project-card-info bg-acid-green/5 text-acid-green p-2.5 sm:p-3 border border-acid-green/20">
                            <span className="mono text-[9px] sm:text-[10px] font-bold mr-2 text-acid-green/50 uppercase tracking-widest">Impact:</span>
                            <span className="text-[10px] sm:text-xs uppercase font-bold break-words">{project.impact}</span>
                        </div>
                    )}
                </div>

                <p className="project-card-description font-medium text-white/40 mb-5 sm:mb-8 text-[0.72rem] sm:text-[0.8rem] leading-relaxed flex-1 group-hover:text-white/70 transition-colors mono">
                    {project.description}
                </p>

                <div className="project-card-tags flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6 mt-auto">
                    {tagsToShow.map(t => (
                        <DS.Badge key={t} variant="dark" className="text-[8px] border-white/10 text-white/40">{t}</DS.Badge>
                    ))}
                </div>

                {isHome ? (
                    <div className="pt-3 sm:pt-4 border-t border-white/10 mt-auto group-hover:border-acid-green">
                        <DS.Button as="a" href={`/projects/${project.slug}`} variant="black" size="sm" rightIcon={<ArrowRight size={14} />}>
                            VIEW_ARCHIVE
                        </DS.Button>
                    </div>
                ) : (
                    <div className="flex gap-4 pt-4 sm:pt-6 border-t border-white/10 mt-auto group-hover:border-acid-green">
                        {project.live && (
                            <Link href={project.live} target="_blank" className="mono text-[10px] font-bold flex items-center gap-2 text-white/60 hover:text-acid-pink transition-colors">
                                PROD_LNK <ExternalLink size={12} />
                            </Link>
                        )}

                    </div>
                )}
            </div>
        </DS.Card>
    )
}
