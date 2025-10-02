// src/api/api.js
// Central place to define base URL and endpoints used by thunks.
// Use REACT_APP_API_URL to override for different environments (json-server, staging, prod).

const BASE = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Export the endpoint paths (convenience)
export const endpoints = {
  categories: `${BASE}/categories`,
  products: `${BASE}/products`,
  cart: `${BASE}/cart`,
};

// Small fetch helper that throws on non-2xx and returns parsed json
export async function apiFetch(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const tryJson = await safeParseJson(res);
    const message = tryJson?.message || `${res.status} ${res.statusText}`;
    const err = new Error(message);
    err.status = res.status;
    err.body = tryJson;
    throw err;
  }
  // Some endpoints return 204 No Content (DELETE). Handle that.
  if (res.status === 204) return null;
  return res.json();
}

async function safeParseJson(res) {
  try {
    return await res.json();
  } catch (e) {
    return null;
  }
}
