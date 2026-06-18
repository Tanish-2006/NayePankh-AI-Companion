import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { api } from '@/lib/api'
import type { User } from '@/types'

interface AuthContextType {
  user: User | null
  loading: boolean
  isAdmin: boolean
  login: (username: string, password: string) => Promise<void>
  register: (data: { email: string; username: string; password: string; full_name: string }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.auth.me()
        .then((res) => setUser(res))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (username: string, password: string) => {
    const res = await api.auth.login({ username, password })
    localStorage.setItem('token', res.access_token)
    setUser(res.user)
  }

  const register = async (data: { email: string; username: string; password: string; full_name: string }) => {
    const res = await api.auth.register(data)
    localStorage.setItem('token', res.access_token)
    setUser(res.user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const isAdmin = user?.role === 'admin'

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
