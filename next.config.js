// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com', // Replace with your remote hostnames
        port: '',
        pathname: '/path/to/images/**', // Adjust path as needed
      },
    ],
  },
  webpack: (config) => {
    // Optimization settings
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...config.optimization.splitChunks,
        chunks: 'all',
      },
    };
    return config;
  },
  experimental: {
    optimizePackageImports: ['three'],
  },
};

module.exports = nextConfig;