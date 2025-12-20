import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Image optimization settings - Vercel optimizes automatically
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.logo.dev',
      },
    ],
  },
};

export default nextConfig;
