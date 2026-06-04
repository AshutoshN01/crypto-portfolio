import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type User = { id: string; email: string; username?: string; roles: string[] } | null

interface AuthState {
  user: User
  accessToken: string | null
  setUser: (u: User) => void
  setAccessToken: (token: string | null) => void
  setSession: (session: { user: User; accessToken: string }) => void
  clear: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setUser: (user) => set({ user }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setSession: ({ user, accessToken }) => set({ user, accessToken }),
      clear: () => set({ user: null, accessToken: null })
    }),
    {
      name: 'cryptodashboard-auth',
      partialize: (state) => ({ user: state.user, accessToken: state.accessToken })
    }
  )
)
