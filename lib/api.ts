/**
 * API Client for CareerCove Backend
 * Handles all API calls to the backend server
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// Types
export interface SignupData {
  username: string
  email: string
  password: string
  fullName: string
}

export interface LoginData {
  email: string
  password: string
}

export interface User {
  id: string
  username: string
  email: string
  fullName: string
  status?: string
  createdAt?: string
  lastLogin?: string
}

export interface AuthResponse {
  success: boolean
  message: string
  data: {
    user: User
    accessToken: string
    refreshToken: string
  }
}

export interface ApiError {
  success: false
  message: string
  errors?: Array<{ field: string; message: string }>
}

// Generic API request handler
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  // Get auth token from localStorage if available
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const config: RequestInit = {
    ...options,
    headers,
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw {
        success: false,
        message: data.message || 'An error occurred',
        errors: data.errors,
        status: response.status,
      } as ApiError
    }

    return data as T
  } catch (error) {
    if (error instanceof TypeError) {
      throw {
        success: false,
        message: 'Network error. Please check your connection.',
        status: 0,
      } as ApiError
    }
    throw error
  }
}

// Authentication API
export const authApi = {
  // Signup
  signup: async (data: SignupData): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  // Login
  login: async (data: LoginData): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  // Get user profile
  getProfile: async (): Promise<{ success: boolean; data: { user: User } }> => {
    return apiRequest('/auth/profile')
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<{ success: boolean; data: { accessToken: string } }> => {
    return apiRequest('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    })
  },

  // Logout
  logout: async (refreshToken: string): Promise<{ success: boolean; message: string }> => {
    return apiRequest('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    })
  },
}

// Helper to store tokens
export const tokenStorage = {
  set: (accessToken: string, refreshToken: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    }
  },

  get: () => {
    if (typeof window !== 'undefined') {
      return {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
      }
    }
    return { accessToken: null, refreshToken: null }
  },

  clear: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  },
}

