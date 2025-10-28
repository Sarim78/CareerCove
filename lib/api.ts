const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  errors?: Array<{ field: string; message: string }>
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    const token = this.getAccessToken()
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    return headers
  }

  private getAccessToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken")
    }
    return null
  }

  private getRefreshToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("refreshToken")
    }
    return null
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
    }
  }

  private clearTokens(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    }
  }

  private async refreshAccessToken(): Promise<boolean> {
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) return false

    try {
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      })

      if (response.ok) {
        const data: ApiResponse = await response.json()
        if (data.success && data.data) {
          this.setTokens(data.data.accessToken, data.data.refreshToken)
          return true
        }
      }
    } catch (error) {
      console.error("Token refresh failed:", error)
    }

    this.clearTokens()
    return false
  }

  async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: this.getHeaders(),
      })

      // If unauthorized and we have a refresh token, try to refresh
      if (response.status === 401) {
        const refreshed = await this.refreshAccessToken()
        if (refreshed) {
          // Retry the original request with new token
          const retryResponse = await fetch(`${this.baseURL}${endpoint}`, {
            ...options,
            headers: this.getHeaders(),
          })
          return await retryResponse.json()
        }
      }

      const data: ApiResponse<T> = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Request failed")
      }

      return data
    } catch (error) {
      console.error("API request error:", error)
      throw error
    }
  }

  // Authentication methods
  async register(email: string, password: string, fullName: string) {
    const response = await this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, fullName }),
    })

    if (response.success && response.data) {
      this.setTokens(response.data.accessToken, response.data.refreshToken)
    }

    return response
  }

  async login(email: string, password: string) {
    const response = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })

    if (response.success && response.data) {
      this.setTokens(response.data.accessToken, response.data.refreshToken)
    }

    return response
  }

  async logout() {
    const refreshToken = this.getRefreshToken()
    await this.request("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    })
    this.clearTokens()
  }

  async getProfile() {
    return await this.request("/auth/profile")
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken()
  }
}

export const api = new ApiClient(API_URL)
