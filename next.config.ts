import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'
const repoName = 'portfolio' // 👈 must match your GitHub repo exactly

const nextConfig: NextConfig = {
  output: 'export',            // ⬅️ NEW: replaces `next export`
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  images: {
    unoptimized: true,         // GitHub Pages can't run Next image optimizer
  },
  // Optional: silence workspace root warning
  turbopack: {
    root: __dirname,
  },
}

export default nextConfig
