import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'
const isVercel = process.env.VERCEL === '1'
const repoName = 'portfolio' // must match your GitHub repo exactly

const nextConfig: NextConfig = {
  // Use SSR on Vercel, static export on GitHub Pages
  output: isVercel ? undefined : 'export',
  basePath: isProd && !isVercel ? `/${repoName}` : '',
  assetPrefix: isProd && !isVercel ? `/${repoName}/` : '',
  images: {
    // Allow image optimization on Vercel; disable for GitHub Pages
    unoptimized: !isVercel,
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
