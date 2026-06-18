import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Heart, User, LogOut, LayoutDashboard, Shield } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/programs', label: 'Programs' },
  { href: '/events', label: 'Events' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/opportunities', label: 'Opportunities' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const { user, logout, isAdmin } = useAuth()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-brand-navy">
              Naye<span className="text-primary-600">Pankh</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  pathname === link.href
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/ai-assistant"
                  className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                >
                  AI Assistant
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="p-2 rounded-lg text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-all"
                    title="Admin Panel"
                  >
                    <Shield className="w-5 h-5" />
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all"
                >
                  <LayoutDashboard className="w-5 h-5" />
                </Link>
                <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 rounded-full">
                    <User className="w-4 h-4 text-primary-600" />
                    <span className="text-sm font-medium text-primary-700">{user.full_name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 bg-primary-600 text-white text-sm font-medium rounded-full hover:bg-primary-700 transition-all shadow-sm"
                >
                  Join Us
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-100 bg-white"
          >
            <div className="section-container py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'block px-4 py-3 rounded-lg text-sm font-medium transition-all',
                    pathname === link.href
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    to="/ai-assistant"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-lg text-sm font-medium text-primary-600 hover:bg-primary-50"
                  >
                    AI Assistant
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-lg text-sm font-medium text-primary-600 hover:bg-primary-50"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { logout(); setMobileOpen(false) }}
                    className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <div className="flex gap-2 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center px-4 py-3 rounded-lg text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center px-4 py-3 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700"
                  >
                    Join Us
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
