import dynamic from "next/dynamic"
import React from "react"

export interface BlogPost {
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    slug: string;
    category: string;
    component: React.ComponentType;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        title: "Stop Over-Engineering Every Project",
        excerpt: "A raw talk about why simple code beats complex abstractions every time, and why I deleted 800 lines of WebGL.",
        date: "Apr 13, 2026",
        readTime: "5 min read",
        slug: "over-engineering",
        category: "Engineering",
        component: dynamic(() => import("@/content/blog/over-engineering.mdx"))
    },
    {
        title: "The Brutal Truth About Being an MCA Student in 2026",
        excerpt: "A personal reflection on Galgotias University life, the grind of the 4th semester, and balancing projects with academics.",
        date: "Apr 12, 2026",
        readTime: "6 min read",
        slug: "mca-life-2026",
        category: "Life",
        component: dynamic(() => import("@/content/blog/mca-life-2026.mdx"))
    },
    {
        title: "The Future of 3D Web Interfaces in 2026",
        excerpt: "Exploring the convergence of WebGL, AI-driven layouts, and institutional-grade frontend architectures.",
        date: "Feb 23, 2026",
        readTime: "8 min read",
        slug: "future-of-3d-web",
        category: "Architecture",
        component: dynamic(() => import("@/content/blog/future-of-3d-web.mdx"))
    },
    {
        title: "FAANG-Level Performance Optimization",
        excerpt: "Deep dive into bundle splitting strategies, edge caching, and Zero-CLS rendering patterns.",
        date: "Feb 15, 2026",
        readTime: "12 min read",
        slug: "performance-optimization",
        category: "Engineering",
        component: dynamic(() => import("@/content/blog/performance-optimization.mdx"))
    }
];
