import { describe, it, expect } from 'vitest';
import config from '../../next.config';

// Helper to unwrap async results
async function getConfigValue<T>(val: T | Promise<T>): Promise<T> {
  return await (val as Promise<T>);
}

describe('next.config.ts', () => {
  it('includes crypto logo remote patterns', () => {
    const patterns = config.images?.remotePatterns || [];
    expect(patterns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ hostname: 'assets.coingecko.com' }),
        expect.objectContaining({ hostname: 's2.coinmarketcap.com' }),
        expect.objectContaining({ hostname: 'cryptologos.cc' }),
      ]),
    );
  });

  it('provides security headers', async () => {
    const headers = await getConfigValue(
      config.headers?.() ?? Promise.resolve([]),
    );
    expect(headers[0].headers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: 'Content-Security-Policy' }),
        expect.objectContaining({ key: 'X-Content-Type-Options' }),
      ]),
    );
  });

  it('rewrites crypto API routes', async () => {
    const rewrites = await getConfigValue(config.rewrites?.());
    expect(rewrites).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          destination: 'https://api.coingecko.com/:path*',
        }),
        expect.objectContaining({
          destination: 'https://pro-api.coinmarketcap.com/:path*',
        }),
      ]),
    );
  });
});
