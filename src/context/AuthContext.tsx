import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '../lib/supabase'
import { signIn as apiSignIn, signUp as apiSignUp, signOut as apiSignOut } from '../lib/api'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing user session on mount
    const savedUser = localStorage.getItem('solutionsonar_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem('solutionsonar_user')
      }
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const result = await apiSignIn(email, password)
      if (result.success) {
        setUser(result.user)
        localStorage.setItem('solutionsonar_user', JSON.stringify(result.user))
      }
    } catch (error: any) {
      throw new Error(error.message || 'Login failed')
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const result = await apiSignUp(email, password)
      if (result.success) {
        setUser(result.user)
        localStorage.setItem('solutionsonar_user', JSON.stringify(result.user))
      }
    } catch (error: any) {
      throw new Error(error.message || 'Signup failed')
    }
  }

  const signOut = async () => {
    try {
      await apiSignOut()
      setUser(null)
      localStorage.removeItem('solutionsonar_user')
    } catch (error) {
      // Even if API call fails, clear local state
      setUser(null)
      localStorage.removeItem('solutionsonar_user')
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}