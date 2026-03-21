import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
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
