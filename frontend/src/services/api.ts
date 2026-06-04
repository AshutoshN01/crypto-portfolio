import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { useAuthStore } from '../store/useAuthStore'

export type ApiSuccess<T> = { status: 'success'; data: T }
export type ApiError = { status: 'error'; error: { code: string; message: string } }
export type ApiResponse<T> = ApiSuccess<T> | ApiError

type RetryableRequest = AxiosRequestConfig & { _retry?: boolean }

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:4000/api/v1',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as RetryableRequest | undefined

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const response = await api.post<ApiSuccess<{ accessToken: string; user: NonNullable<ReturnType<typeof useAuthStore.getState>['user']> }>>('/auth/refresh')
        useAuthStore.getState().setSession(response.data.data)
        return api(originalRequest)
      } catch (refreshError) {
        useAuthStore.getState().clear()
        return Promise.reject(refreshError)
      }
    }

    const normalized = error.response?.data ?? {
      status: 'error',
      error: { code: 'NETWORK_ERROR', message: error.message }
    }

    return Promise.reject(normalized)
  }
)

export default api
