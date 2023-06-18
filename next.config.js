/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['4.bp.blogspot.com'],
  },
};

module.exports = nextConfig;
