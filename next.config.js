/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['1.bp.blogspot.com', '2.bp.blogspot.com', '3.bp.blogspot.com', '4.bp.blogspot.com', 't.pimg.jp'],
  },
};

module.exports = nextConfig;
