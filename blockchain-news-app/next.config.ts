import type { NextConfig } from 'next';
import type { Header, Rewrite } from 'next/dist/lib/load-custom-routes';

/**
 * Next.js configuration for the Blockchain News website.
 * - Allows images from common crypto logo sources.
 * - Adds security headers for all routes.
 * - Provides API rewrites for external crypto data providers.
 */
const nextConfig: NextConfig = {
  /**
   * Remote patterns define external hosts that can serve images.
   * This is required for displaying cryptocurrency logos.
   */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
        pathname: '/coins/images/**',
      },
      {
        protocol: 'https',
        hostname: 's2.coinmarketcap.com',
        pathname: '/static/img/coins/**',
      },
      {
        protocol: 'https',
        hostname: 'cryptologos.cc',
        pathname: '/logos/**',
      },
    ],
  },

  /**
   * Security headers applied to every route.
   * Adjust policies as needed for the deployment environment.
   */
  async headers(): Promise<Header[]> {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; img-src 'self' https:; script-src 'self'; style-src 'self' 'unsafe-inline'",
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },

  /**
   * Rewrites proxy API requests to external services so API keys remain secret.
   */
  async rewrites(): Promise<Rewrite[]> {
    return [
      {
        source: '/api/coingecko/:path*',
        destination: 'https://api.coingecko.com/:path*',
      },
      {
        source: '/api/coinmarketcap/:path*',
        destination: 'https://pro-api.coinmarketcap.com/:path*',
      },
    ];
  },
};

export default nextConfig;
