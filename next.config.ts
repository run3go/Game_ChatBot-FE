import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
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
      {
        protocol: 'https',
        hostname: 'static.inven.co.kr',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
