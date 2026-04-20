const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 15+ / React canary: add experimental.viewTransition here for the View Transitions API (not available in 14.2.x).
  experimental: {},
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
