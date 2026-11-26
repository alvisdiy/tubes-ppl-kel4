import axios from 'axios';

const BASE_URL =
  import.meta.env.VITE_AIC_API_BASE_URL || 'https://api.artic.edu/api/v1';
const USER_AGENT =
  import.meta.env.VITE_AIC_USER_AGENT || 'ARTORA (artora@example.com)';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'AIC-User-Agent': USER_AGENT,
  },
});

// Lightweight in-memory cache to respect AIC API rate limits (60 req/min)
const responseCache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000;

function buildCacheKey(url, params) {
  const sortedParams = params
    ? Object.keys(params)
        .sort()
        .map((k) => `${k}=${params[k]}`)
        .join('&')
    : '';
  return `${url}?${sortedParams}`;
}

/**
 * Performs a cached GET request against the Art Institute of Chicago API.
 *
 * @param {string} url
 * @param {object} [params]
 * @param {AbortSignal} [signal]
 */
export async function apiGet(url, params = {}, signal) {
  const key = buildCacheKey(url, params);
  const cached = responseCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  try {
    const response = await apiClient.get(url, { params, signal });
    responseCache.set(key, {
      timestamp: Date.now(),
      data: response.data,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error) || error.name === 'CanceledError') {
      throw error;
    }
    throw normalizeApiError(error);
  }
}

export function normalizeApiError(error) {
  if (error.response) {
    const status = error.response.status;
    if (status === 429) {
      return new Error(
        'Museum archive rate limit reached. Please wait a moment and try again.'
      );
    }
    if (status === 404) {
      return new Error('The requested record could not be found in the archive.');
    }
    return new Error(
      error.response.data?.detail ||
        `Archive request failed with status ${status}.`
    );
  }
  if (error.request) {
    return new Error(
      'Unable to reach the Art Institute of Chicago API. Please check your connection.'
    );
  }
  return new Error(error.message || 'An unexpected error occurred.');
}

export default apiClient;
