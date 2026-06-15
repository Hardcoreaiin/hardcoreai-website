/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow local public/ images (default) and future remote sources
    domains: [],
    unoptimized: false,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/api/:path*', // Proxy to FastAPI
      },
    ]
  },
}

module.exports = nextConfig
