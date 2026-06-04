import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

export function ProtectedRoute() {
  const location = useLocation()
  const accessToken = useAuthStore((state) => state.accessToken)

  if (!accessToken) return <Navigate to="/auth/login" replace state={{ from: location.pathname }} />
  return <Outlet />
}

export function PublicOnlyRoute() {
  const accessToken = useAuthStore((state) => state.accessToken)

  if (accessToken) return <Navigate to="/" replace />
  return <Outlet />
}
