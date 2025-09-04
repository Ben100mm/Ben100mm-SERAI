/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'images.unsplash.com'],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
