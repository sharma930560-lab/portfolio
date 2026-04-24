/* ─────────────────────────────────────────────────────────────────────────────
   AI ENGINE  ·  lib/aiEngine.ts
   Pure-frontend AI assistant — no backend, no API calls.
   Uses project data + portfolio knowledge as the knowledge base.
   Handles: project queries, skill queries, navigation suggestions.
───────────────────────────────────────────────────────────────────────────── */

import { PROJECTS, Project } from "./projects"
import portfolioData from "./portfolioData.json"

export interface AIMessage {
    id: string
    role: "user" | "assistant"
    content: string
    links?: { label: string; href: string }[]
    projectCards?: Project[]
    timestamp: number
}

export interface AIResponse {
    content: string
    links?: { label: string; href: string }[]
    projectCards?: Project[]
    action?: { type: "scroll"; target: string } | { type: "navigate"; href: string }
}

/* ─── Intent detection ─── */
type Intent =
    | "greeting"
    | "skill_query"
    | "project_query"
    | "best_project"
    | "contact"
    | "about"
    | "education"
    | "navigation"
    | "services"
    | "unknown"

function detectIntent(input: string): Intent {
    const q = input.toLowerCase().trim()

    if (/^(hi|hello|hey|yo|sup|good (morning|evening|afternoon))/.test(q)) return "greeting"

    if (/\b(best|top|flagship|most impressive|show me|highlight)\b.*\bproject/.test(q)
        || /\bproject.*(best|top|flagship)/.test(q)) return "best_project"

    if (/\b(contact|email|call|phone|hire|reach|whatsapp|linkedin)\b/.test(q)) return "contact"

    if (/\b(about|who|background|bio|story|yourself|experience)\b/.test(q)) return "about"

    if (/\b(education|degree|university|college|mca|bca|study|academic)\b/.test(q)) return "education"

    if (/\b(service|offer|what do you do|speciali|help with|build for)\b/.test(q)) return "services"

    if (/\b(nav|go to|take me|show me|open|where is)\b/.test(q)) return "navigation"

    // Skill / tech query — check if input matches any known tech
    const allTech = [
        ...portfolioData.skills.frontend,
        ...portfolioData.skills.backend,
        ...portfolioData.skills.database,
        ...portfolioData.skills.devops,
        ...portfolioData.skills.ai_ml,
    ]
    if (allTech.some(t => q.includes(t.toLowerCase()))) return "skill_query"

    // Project name mention
    if (PROJECTS.some(p => q.includes(p.title.toLowerCase().slice(0, 6)))) return "project_query"

    return "unknown"
}

/* ─── Find projects by tech stack ─── */
function findProjectsByTech(tech: string): Project[] {
    const q = tech.toLowerCase()
    return PROJECTS.filter(p =>
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        (p.techDetail && p.techDetail.toLowerCase().includes(q))
    )
}

/* ─── Find mentioned project ─── */
function findProject(input: string): Project | undefined {
    const q = input.toLowerCase()
    return PROJECTS.find(p =>
        q.includes(p.title.toLowerCase().slice(0, 8)) ||
        q.includes(p.slug.slice(0, 8))
    )
}

/* ─── Quick actions shown alongside responses ─── */
const QUICK_ACTIONS = [
    "Show best project",
    "What can you do with React?",
    "How to contact Paras?",
    "Tell me about the trading platform",
    "What AI skills do you have?",
]

export function getQuickActions(): string[] {
    return QUICK_ACTIONS
}

/* ─── Core response generator ─── */
export function generateResponse(input: string): AIResponse {
    const intent = detectIntent(input)
    const q = input.toLowerCase()

    switch (intent) {
        case "greeting":
            return {
                content: `Hey! 👋 I'm Paras's AI assistant. I can help you explore his projects, skills, and work.\n\nTry asking about a specific tech like "React" or "Python", or say "show best project".`,
            }

        case "best_project":
            return {
                content: `🏆 **JOJO AI Trading Platform** is the flagship project — an institutional-grade derivatives system with live AI trade signals, WebSocket market data, JWT auth, and Stripe subscriptions.\n\n**Impact:** Reduced manual trade analysis by ~70%.`,
                projectCards: [PROJECTS[0]],
                links: [
                    { label: "View Live →", href: "https://jojo-ai-trading.netlify.app" },
                    { label: "All Projects →", href: "/projects" },
                ],
            }

        case "skill_query": {
            // Find which tech was mentioned
            const allTech = [
                ...portfolioData.skills.frontend,
                ...portfolioData.skills.backend,
                ...portfolioData.skills.database,
                ...portfolioData.skills.devops,
                ...portfolioData.skills.ai_ml,
            ]
            const mentionedTech = allTech.find(t => q.includes(t.toLowerCase()))
            if (mentionedTech) {
                const matchedProjects = findProjectsByTech(mentionedTech)
                if (matchedProjects.length > 0) {
                    return {
                        content: `**${mentionedTech}** appears in ${matchedProjects.length} project${matchedProjects.length > 1 ? "s" : ""}:`,
                        projectCards: matchedProjects,
                    }
                } else {
                    return {
                        content: `Yes, Paras works with **${mentionedTech}** — it's part of his core stack. Check all projects to see it in action.`,
                        links: [{ label: "View Projects →", href: "/projects" }],
                    }
                }
            }
            return { content: "Could you clarify which technology you're asking about?" }
        }

        case "project_query": {
            const project = findProject(input)
            if (project) {
                return {
                    content: `**${project.title}**\n\n${project.description}\n\n**Role:** ${project.role ?? "Lead Developer"}\n**Impact:** ${project.impact ?? "Production deployed"}`,
                    projectCards: [project],
                    links: [
                        ...(project.live ? [{ label: "View Live →", href: project.live }] : []),
                        ...(project.github ? [{ label: "GitHub →", href: project.github }] : []),
                    ],
                }
            }
            return {
                content: `Here are all the projects I can tell you about:`,
                projectCards: PROJECTS,
            }
        }

        case "contact":
            return {
                content: `You can reach Paras through:\n\n📧 **Email:** ps9110831@gmail.com\n📞 **Phone:** +91-9305601506\n💬 **WhatsApp:** Instant chat\n🔗 **LinkedIn:** /in/paras-sharma-dev007`,
                links: [
                    { label: "Send a Message →", href: "/contact" },
                    { label: "WhatsApp →", href: "https://wa.me/919305601506" },
                    { label: "LinkedIn →", href: "https://www.linkedin.com/in/paras-sharma-dev007" },
                ],
            }

        case "about":
            return {
                content: `Paras is a **Full Stack Developer & AI Engineer** based in Shahjahanpur, UP (working globally).\n\nHe specializes in:\n• Institutional-grade trading platforms\n• AI-powered SaaS products\n• High-performance web systems\n\nCurrently pursuing **MCA at Galgotias University** (CGPA: 9.25).`,
                links: [{ label: "Full About Page →", href: "/about" }],
            }

        case "education":
            return {
                content: `🎓 **Education**\n\n**MCA** — Galgotias University, Greater Noida *(2024–2026, CGPA: 9.25)*\n**BCA** — Swami Sukhdevanand College, Shahjahanpur *(2021–2024)*`,
                links: [{ label: "Download CV →", href: "/cv" }],
            }

        case "services":
            return {
                content: `Paras offers **5 core services**:\n\n• **Full Stack Web Dev** — React/Next.js + Django/FastAPI\n• **AI & ML Integration** — ML models, NLP, agentic workflows\n• **SaaS Development** — auth, billing, dashboards, APIs\n• **Trading & Fintech** — derivatives analytics, live data systems\n• **Corporate Platforms** — premium sites with modern UX`,
                links: [{ label: "Start a Project →", href: "/contact" }],
            }

        case "navigation": {
            const navMap: Record<string, string> = {
                project: "/projects", work: "/projects", portfolio: "/projects",
                about: "/about", contact: "/contact", skills: "/about",
                cv: "/cv", home: "/",
            }
            const found = Object.entries(navMap).find(([k]) => q.includes(k))
            if (found) {
                return {
                    content: `Taking you to the **${found[0]}** section →`,
                    links: [{ label: `Go to ${found[0].charAt(0).toUpperCase() + found[0].slice(1)} →`, href: found[1] }],
                    action: { type: "navigate", href: found[1] },
                }
            }
            return {
                content: "Where would you like to go? You can say: *projects, about, contact, CV, home.*",
            }
        }

        default:
            return {
                content: `I'm not sure about that. Try asking:\n• "Show me the best project"\n• "What do you know about React?"\n• "How to contact Paras?"\n• "Tell me about the AI trading platform"`,
            }
    }
}

/* ─── Generate message ID ─── */
export function makeId(): string {
    return Math.random().toString(36).slice(2, 10)
}
