import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { BarChart3, Briefcase, ChevronLeft, ChevronRight, Home, LineChart, LogOut, Menu } from 'lucide-react'
import Avatar from '../components/ui/Avatar'
import Button from '../components/ui/Button'
import Drawer from '../components/ui/Drawer'
import { useAuthStore } from '../store/useAuthStore'
import { logout } from '../features/auth/authApi'

const navItems = [
  { label: 'Dashboard', path: '/', icon: Home },
  { label: 'Portfolio', path: '/portfolio', icon: Briefcase },
  { label: 'Markets', path: '/markets', icon: LineChart },
  { label: 'Transactions', path: '/transactions', icon: BarChart3 },
]

function Navigation({ collapsed = false, onNavigate }: { collapsed?: boolean; onNavigate?: () => void }) {
  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition ${
                isActive ? 'bg-primary text-black' : 'text-muted hover:bg-white/5 hover:text-text'
              }`
            }
          >
            <Icon size={18} />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        )
      })}
    </nav>
  )
}

export default function AppShell() {
  const [collapsed, setCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const user = useAuthStore((state) => state.user)
  const clearAuth = useAuthStore((state) => state.clear)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
    } finally {
      clearAuth()
      navigate('/auth/login', { replace: true })
    }
  }

  return (
    <div className="min-h-screen bg-bg text-text">
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className="mb-6 text-lg font-bold">Crypto Portfolio</div>
        <Navigation onNavigate={() => setDrawerOpen(false)} />

      </Drawer>

      <aside className={`fixed inset-y-0 left-0 hidden border-r border-white/10 bg-surface p-4 transition-all lg:block ${collapsed ? 'w-20' : 'w-64'}`}>
        <div className="mb-6 flex h-10 items-center justify-between">
          {!collapsed && <span className="text-lg font-bold">Crypto Portfolio</span>}

          <Button variant="ghost" size="sm" onClick={() => setCollapsed((value) => !value)} aria-label="Toggle navigation">
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>
        <Navigation collapsed={collapsed} />
      </aside>

      <div className={`transition-all ${collapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-bg/95 px-4 backdrop-blur md:px-6">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setDrawerOpen(true)} aria-label="Open navigation">
            <Menu size={20} />
          </Button>
          <div>
            <p className="text-sm text-muted">Portfolio Management</p>
            <h1 className="text-base font-semibold">Crypto command center</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted sm:inline">{user?.username ?? 'Guest'}</span>
            <Avatar name={user?.username ?? 'Guest'} />
            <Button variant="ghost" size="sm" onClick={handleLogout} aria-label="Log out">
              <LogOut size={18} />
            </Button>
          </div>
        </header>
        <main className="p-4 md:p-6"><Outlet /></main>
      </div>
    </div>
  )
}
