/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap'],
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'Shadows Gaming Studio',
  },
};

module.exports = nextConfig;
