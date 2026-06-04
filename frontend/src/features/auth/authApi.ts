import api, { ApiSuccess } from '../../services/api'
import { User } from '../../store/useAuthStore'

export interface AuthSession {
  accessToken: string
  user: NonNullable<User>
}

export async function login(input: { identifier: string; password: string }) {
  const response = await api.post<ApiSuccess<AuthSession>>('/auth/login', input)
  return response.data.data
}

export async function register(input: { email: string; username: string; password: string }) {
  const response = await api.post<ApiSuccess<AuthSession>>('/auth/register', input)
  return response.data.data
}

export async function currentUser() {
  const response = await api.get<ApiSuccess<{ user: NonNullable<User> }>>('/auth/me')
  return response.data.data.user
}

export async function logout() {
  await api.post('/auth/logout')
}
