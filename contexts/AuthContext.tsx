'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { authApi, tokenStorage, User } from '@/lib/api'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signup: (username: string, email: string, password: string, fullName: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const tokens = tokenStorage.get()
      if (tokens.accessToken) {
        // Try to fetch user profile
        const response = await authApi.getProfile()
        setUser(response.data.user)
      }
    } catch (error) {
      // Token might be invalid, clear it
      tokenStorage.clear()
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (username: string, email: string, password: string, fullName: string) => {
    try {
      const response = await authApi.signup({ username, email, password, fullName })
      
      // Store tokens
      tokenStorage.set(response.data.accessToken, response.data.refreshToken)
      
      // Set user
      setUser(response.data.user)
      
      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error: any) {
      throw error
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password })
      
      // Store tokens
      tokenStorage.set(response.data.accessToken, response.data.refreshToken)
      
      // Set user
      setUser(response.data.user)
      
      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error: any) {
      throw error
    }
  }

  const logout = async () => {
    try {
      const tokens = tokenStorage.get()
      if (tokens.refreshToken) {
        await authApi.logout(tokens.refreshToken)
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear tokens and user regardless of API call result
      tokenStorage.clear()
      setUser(null)
      router.push('/auth')
    }
  }

  const refreshUser = async () => {
    try {
      const response = await authApi.getProfile()
      setUser(response.data.user)
    } catch (error) {
      console.error('Failed to refresh user:', error)
      logout()
    }
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signup,
    login,
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

