/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['images.pexels.com']
  },
  // Remove output: 'export' to enable API routes
  // Environment variables are automatically loaded from .env files
};

module.exports = nextConfig;