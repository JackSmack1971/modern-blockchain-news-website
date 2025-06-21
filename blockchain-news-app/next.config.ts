import type { NextConfig } from 'next'
import type { Header, Redirect, Rewrite } from 'next/dist/lib/load-custom-routes'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    // @ts-expect-error - logging is non-standard in Next.js config
    logging: {
      level: 'verbose',
    },
    serverComponentsExternalPackages: ['@prisma/client'],
    typedRoutes: true,
  },
  compress: true,
  poweredByHeader: false,

  images: {
    formats: ['image/webp', 'image/avif'],
    domains: [
      'images.ctfassets.net',
      'cdn.coingecko.com',
      'assets.coingecko.com',
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async redirects(): Promise<Redirect[]> {
    return [
      {
        source: '/admin',
        destination: '/api/auth/signin',
        permanent: false,
        has: [
          {
            type: 'cookie',
            key: 'next-auth.session-token',
            value: undefined,
          },
        ],
      },
    ]
  },

  async rewrites(): Promise<Rewrite[]> {
    return [
      {
        source: '/api/crypto/:path*',
        destination: 'https://api.coingecko.com/api/v3/:path*',
      },
      {
        source: '/api/content/:path*',
        destination: `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/:path*`,
      },
    ]
  },

  async headers(): Promise<Header[]> {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://api.coingecko.com https://cdn.contentful.com https://vitals.vercel-insights.com",
              "media-src 'self' https:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              'block-all-mixed-content',
              'upgrade-insecure-requests',
            ].join('; '),
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: [
              'camera=()',
              'microphone=()',
              'geolocation=()',
              'interest-cohort=()',
              'payment=()',
              'usb=()',
            ].join(', '),
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'credentialless',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'production' ? 'https://yourdomain.com' : 'http://localhost:3000',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
          {
            key: 'Access-Control-Max-Age',
            value: '86400',
          },
        ],
      },
    ]
  },

  webpack: (config, { isServer }) => {
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    }

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }

    return config
  },

  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  output: 'standalone',

  // @ts-ignore - logging is non-standard in Next.js config
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
