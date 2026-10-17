const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Shared API Client for Licentra Frontend
 * Automatically prefixes requests with VITE_API_BASE_URL
 * Handles standard JSON response envelopes
 */
export const apiClient = {
  baseUrl: API_BASE_URL,

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    let body = options.body;
    if (body && typeof body === 'object' && !(body instanceof FormData)) {
      body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        body,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || (data && data.success === false)) {
        const errorMessage =
          data?.error?.message ||
          data?.message ||
          `HTTP error! status: ${response.status}`;

        const error = new Error(errorMessage);
        error.status = response.status;
        error.code = data?.error?.code || (response.status === 404 ? 'RESOURCE_NOT_FOUND' : 'API_ERROR');
        error.details = data?.error?.details || [];
        error.meta = data?.meta || null;
        error.data = data;
        error.response = data;
        throw error;
      }

      return data;
    } catch (err) {
      console.error(`[API Error] ${options.method || 'GET'} ${url}:`, err);
      throw err;
    }
  },

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  },

  post(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  put(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  patch(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  },

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  },
};

export default apiClient;
