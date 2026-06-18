import { useState } from 'react'
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom'
import {
  LayoutDashboard, Target, CalendarDays, BookOpen, Users,
  ChevronLeft, LogOut, Heart, Menu, X
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

const sidebarLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/opportunities', label: 'Opportunities', icon: Target },
  { href: '/admin/events', label: 'Events', icon: CalendarDays },
  { href: '/admin/stories', label: 'Stories', icon: BookOpen },
  { href: '/admin/volunteers', label: 'Volunteers', icon: Users },
]

export default function AdminLayout() {
  const { pathname } = useLocation()
  const { user, isAdmin, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!user || !isAdmin) return <Navigate to="/login" />

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-brand-navy text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-brand-coral" />
            <span className="font-display font-bold">NayePankh Admin</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {sidebarLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              to={href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href))
                  ? 'bg-white/10 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-sm font-bold">
              {user.full_name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.full_name}</p>
              <p className="text-xs text-white/50">Administrator</p>
            </div>
            <button onClick={logout} className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 h-16 flex items-center px-4 lg:px-8">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 mr-3">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
              View Site
            </Link>
            <ChevronLeft className="w-3 h-3 text-gray-300" />
            <span className="text-sm text-gray-700 font-medium">Admin Panel</span>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
