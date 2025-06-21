import { z } from 'zod';
import { APIError, ValidationError } from './errors';
import type { CryptoPrice } from '../types';

const coinSchema = z.object({
  id: z.string().min(1),
  vs_currency: z.string().min(1),
});

interface FetchOptions extends RequestInit {
  timeoutMs?: number;
  retries?: number;
}

export async function fetchWithRetry<T = unknown>(
  url: string,
  options: FetchOptions = {},
): Promise<T> {
  const { timeoutMs = 5000, retries = 2, ...init } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...init, signal: controller.signal });
    clearTimeout(id);
    if (!response.ok) {
      throw new APIError(`Request failed with status ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (err) {
    clearTimeout(id);
    if (retries > 0) {
      return fetchWithRetry(url, { ...options, retries: retries - 1 });
    }
    if (err instanceof APIError) throw err;
    throw new APIError('Network request failed', { cause: err });
  }
}

export async function getCryptoPrice(params: {
  id: string;
  vs_currency: string;
}): Promise<CryptoPrice> {
  const parsed = coinSchema.safeParse(params);
  if (!parsed.success) {
    throw new ValidationError('Invalid parameters');
  }
  const apiKey = process.env.COINGECKO_API_KEY;
  const query = new URLSearchParams({
    ids: parsed.data.id,
    vs_currencies: parsed.data.vs_currency,
    x_cg_pro_api_key: apiKey || '',
  }).toString();
  const url = `https://api.coingecko.com/api/v3/simple/price?${query}`;
  const data = await fetchWithRetry<Record<string, Record<string, number>>>(
    url,
    { timeoutMs: 7000, retries: 3 },
  );
  const price = data[parsed.data.id]?.[parsed.data.vs_currency];
  if (typeof price !== 'number') {
    throw new APIError('Price data not found');
  }
  return {
    id: parsed.data.id,
    vs_currency: parsed.data.vs_currency,
    price,
  };
}
