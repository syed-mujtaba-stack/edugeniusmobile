import ENV from '../config/env';

const API_BASE_URL = ENV.API_URL || 'http://localhost:5000/api';

// Helper function to handle response
const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || 'Something went wrong');
    (error as any).status = response.status;
    throw error;
  }
  return data;
};

export const api = {
  // GET request
  get: async <T = any>(endpoint: string, options?: RequestInit): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    return handleResponse(response);
  },

  // POST request
  post: async <T = any>(
    endpoint: string,
    data: any,
    options?: RequestInit
  ): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });
    return handleResponse(response);
  },

  // PUT request
  put: async <T = any>(
    endpoint: string,
    data: any,
    options?: RequestInit
  ): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });
    return handleResponse(response);
  },

  // DELETE request
  delete: async <T = any>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });
    return handleResponse(response);
  },

  // PATCH request
  patch: async <T = any>(
    endpoint: string,
    data: any,
    options?: RequestInit
  ): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });
    return handleResponse(response);
  },
};

export default api;