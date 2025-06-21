import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from 'vitest';
import { getCryptoPrice, fetchWithRetry } from '../lib';
import { APIError, ValidationError } from '../lib';

const SUCCESS_RESPONSE = { bitcoin: { usd: 50000 } };

describe('getCryptoPrice', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns price for valid params', async () => {
    (fetch as unknown as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => SUCCESS_RESPONSE,
    });
    const result = await getCryptoPrice({ id: 'bitcoin', vs_currency: 'usd' });
    expect(result).toEqual({
      id: 'bitcoin',
      vs_currency: 'usd',
      price: 50000,
    });
  });

  it('throws validation error for invalid params', async () => {
    await expect(
      getCryptoPrice({ id: '', vs_currency: '' }),
    ).rejects.toBeInstanceOf(ValidationError);
  });

  it('retries on failure and throws after max retries', async () => {
    (fetch as unknown as Mock).mockRejectedValue(new Error('fail'));
    await expect(fetchWithRetry('http://test')).rejects.toBeInstanceOf(
      APIError,
    );
    expect(fetch as unknown as Mock).toHaveBeenCalledTimes(3); // initial + 2 retries
  });
});
