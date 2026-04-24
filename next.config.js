const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    images: {
        unoptimized: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = withMDX(nextConfig);
