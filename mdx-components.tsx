import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>,
        p: ({ children }) => <p className="text-base leading-relaxed mb-4 text-muted-foreground">{children}</p>,
        ...components,
    }
}
