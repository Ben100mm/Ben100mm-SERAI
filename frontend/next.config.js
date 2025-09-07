/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'images.unsplash.com'],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Bundle analyzer
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Tree shaking for lucide-react
      config.resolve.alias = {
        ...config.resolve.alias,
        'lucide-react': 'lucide-react/dist/esm/icons',
      };
    }
    return config;
  },
  // Compression
  compress: true,
  // Bundle splitting - webpack5 is default in Next.js 12+
  // Optimize imports
  swcMinify: true,
}

module.exports = nextConfig
