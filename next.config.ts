import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-lostark.game.onstove.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.lostark.co.kr',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
