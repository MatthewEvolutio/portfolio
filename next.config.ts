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
  // Explicitly expose public runtime envs for client bundle
  env: {
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  },
  // Optional: silence workspace root warning
  turbopack: {
    root: __dirname,
  },
}

export default nextConfig
