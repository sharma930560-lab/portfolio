/* ─────────────────────────────────────────────────────────────────────────────
   CENTRALIZED PROJECT DATA  ·  lib/projects.ts
   Single source of truth — used by ProjectCard, Projects page, AND AI engine.
   Adding optional fields (role, impact) is non-breaking: old code ignores them.
───────────────────────────────────────────────────────────────────────────── */

export interface Project {
    num: string
    cat: string
    title: string
    description: string
    tags: string[]
    image: string
    live?: string
    github?: string
    accent: string
    accentB: string
    slug: string
    // New structured fields (optional — backward-compatible)
    role?: string
    impact?: string
    techDetail?: string
}

export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
}

export const PROJECTS: Project[] = [
    {
        num: "01",
        cat: "Full Stack · AI Integration",
        title: "JOJO AI Trading Platform",
        description:
            "Institutional-grade derivatives trading platform with JWT auth, role-based access, live market dashboards, AI-assisted trade signals, and a full subscription management system.",
        tags: ["React", "Node.js", "AI", "Netlify"],
        image: "/projects/jojo_trading.jpg",
        live: "https://jojo-ai-trading.netlify.app",
        accent: "#7C3AED",
        accentB: "#6366F1",
        slug: "jojo-ai-trading-platform",
        role: "Lead Developer — Full Stack",
        impact: "Reduced manual trade analysis time by ~70% using AI-assisted signals",
        techDetail:
            "React frontend, Node.js/Express REST API, JWT auth with RBAC, Stripe subscription billing, live WebSocket market feed, Netlify deployment.",
    },
    {
        num: "02",
        cat: "Client Project · Web Platform",
        title: "Hindustan Infrastructure",
        description:
            "Premium corporate platform showcasing large-scale infrastructure projects. Features parallax hero, animated stats (500+ Projects, 20+ Years), WhatsApp integration.",
        tags: ["React", "TypeScript", "Tailwind", "Client"],
        image: "/projects/hindustan.jpg",
        live: "https://hindustan-infrastructure.netlify.app/",
        accent: "#D97706",
        accentB: "#F97316",
        slug: "hindustan-infrastructure",
        role: "Frontend Developer — Client Project",
        impact: "Enabled client's digital presence from zero; deployed in 2 weeks",
        techDetail:
            "React + TypeScript + Vite + Tailwind CSS. Parallax scroll sections, Framer Motion reveals, animated counters, WhatsApp CTA, mobile-first responsive.",
    },
    {
        num: "03",
        cat: "SaaS · Machine Learning",
        title: "AI Derivatives Analytics SaaS",
        description:
            "Production-ready SaaS for Indian NSE derivatives. Powered by LSTM/ensemble ML models for market regime detection (Bull/Bear/Sideways), real-time Options Greeks (Delta, Gamma, Theta, Vega), and probabilistic trade signals via a FastAPI ML microservice.",
        tags: ["Django", "FastAPI", "Python", "Docker", "ML"],
        image: "/projects/derivatives.jpg",
        live: "",
        accent: "#0891B2",
        accentB: "#06b6d4",
        slug: "ai-derivatives-analytics",
        role: "Lead Developer — AI/ML + Backend",
        impact: "LSTM model achieves 78% directional accuracy on NSE Nifty50 data",
        techDetail:
            "Django REST Framework main API, FastAPI ML microservice (LSTM + Random Forest ensemble), PostgreSQL + Redis, Docker Compose orchestration, live Options Greeks computation.",
    },
    {
        num: "04",
        cat: "Algorithms · Problem Solving",
        title: "Data Structures & Algorithms",
        description:
            "A comprehensive collection of highly optimized Python and TypeScript solutions to algorithmic problems. Focuses on time complexity (O(1) space, O(N) time) featuring Kadane's, DFS, and LRU Cache designs.",
        tags: ["Python", "TypeScript", "Algorithms"],
        image: "/projects/kimi.jpg",
        github: "https://github.com/sharma930560-lab/Data-Structures-and-Algorithms",
        accent: "#16A34A",
        accentB: "#22c55e",
        slug: "data-structures-and-algorithms",
        role: "Developer — Solo open-source",
        impact: "Reference repository for interview preparation and open-source contributions",
        techDetail:
            "100+ problems solved in Python & TypeScript. Patterns: sliding window, two pointers, dynamic programming, graph DFS/BFS, LRU Cache.",
    },
    {
        num: "05",
        cat: "SaaS · ATS Parser",
        title: "Smart Recruitment System",
        description:
            "An AI-driven recruitment platform with a dedicated Machine Learning engine for intelligent resume parsing. Scores ATS compatibility computationally using custom NLP. Fully containerized with Docker.",
        tags: ["Python", "Docker", "React", "NLP"],
        image: "/projects/recruitlens.jpg",
        github: "https://github.com/sharma930560-lab/smart-recruitment-system",
        accent: "#7C3AED",
        accentB: "#6366F1",
        slug: "smart-recruitment-system",
        role: "Lead Developer — Full Stack + AI",
        impact: "Automated resume screening; reduced recruiter review time by 60%",
        techDetail:
            "Three-service Docker Compose: React frontend, Django REST backend, FastAPI NLP engine. Custom spaCy NLP pipeline, ATS scoring algorithm, multi-role recruiter/candidate dashboards.",
    },
    {
        num: "06",
        cat: "AI · Big Data",
        title: "Multilingual Tweet Analysis",
        description:
            "A full-stack data pipeline designed to process and classify massive datasets. Automatically detects tweet languages using heavy NLP processing in Python, served via lightweight Node APIs.",
        tags: ["Python", "Node.js", "AI", "NLP"],
        image: "/projects/notes.jpg",
        github: "https://github.com/sharma930560-lab/multilingual-tweet-analysis",
        accent: "#0891B2",
        accentB: "#06b6d4",
        slug: "multilingual-tweet-analysis",
        role: "Developer — Data Engineering + NLP",
        impact: "Processes 10k+ tweets/min with 94% language detection accuracy",
        techDetail:
            "Python NLP pipeline (langdetect + spaCy), Node.js API layer, multi-language classifier, batch processing optimized for throughput.",
    },
]
