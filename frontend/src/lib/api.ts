const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001/api';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Array<{ field: string; message: string }>;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: { email: string; password: string }) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async socialLogin(socialData: {
    provider: 'google' | 'facebook' | 'apple';
    providerId: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  }) {
    return this.request('/auth/social', {
      method: 'POST',
      body: JSON.stringify(socialData),
    });
  }

  async getMe() {
    return this.request('/auth/me');
  }

  async refreshToken(refreshToken: string) {
    return this.request('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }

  async logout(refreshToken?: string) {
    return this.request('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }

  // Property endpoints
  async getProperties(params?: {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
    category?: string;
    city?: string;
    state?: string;
    country?: string;
    minPrice?: number;
    maxPrice?: number;
    minGuests?: number;
    amenities?: string[];
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const searchParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            searchParams.append(key, value.join(','));
          } else {
            searchParams.append(key, value.toString());
          }
        }
      });
    }

    return this.request(`/properties?${searchParams.toString()}`);
  }

  async getProperty(id: string) {
    return this.request(`/properties/${id}`);
  }

  async checkAvailability(id: string, params: {
    checkIn: string;
    checkOut: string;
    guests?: number;
  }) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    return this.request(`/properties/${id}/availability?${searchParams.toString()}`);
  }

  // Search endpoints
  async globalSearch(params?: {
    q?: string;
    type?: 'properties' | 'experiences' | 'services' | 'routes';
    location?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    priceMin?: number;
    priceMax?: number;
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }

    return this.request(`/search?${searchParams.toString()}`);
  }

  async getSearchSuggestions(query: string, limit?: number) {
    const searchParams = new URLSearchParams({ q: query });
    if (limit) searchParams.append('limit', limit.toString());

    return this.request(`/search/suggestions?${searchParams.toString()}`);
  }

  async getPopularDestinations(limit?: number) {
    const searchParams = new URLSearchParams();
    if (limit) searchParams.append('limit', limit.toString());

    return this.request(`/search/popular-destinations?${searchParams.toString()}`);
  }

  // User endpoints
  async updateProfile(userData: Partial<{
    firstName: string;
    lastName: string;
    phone: string;
    avatar: string;
  }>) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export types for use in components
export type { ApiResponse, PaginationInfo };
