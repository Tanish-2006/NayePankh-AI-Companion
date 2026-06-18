import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/hooks/useAuth'
import Layout from '@/components/layout/Layout'
import AdminLayout from '@/components/layout/AdminLayout'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Programs from '@/pages/Programs'
import Events from '@/pages/Events'
import Volunteer from '@/pages/Volunteer'
import AIChat from '@/pages/AIChat'
import OpportunityFinder from '@/pages/OpportunityFinder'
import Contact from '@/pages/Contact'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Dashboard from '@/pages/Dashboard'
import StoryGenerator from '@/pages/StoryGenerator'
import AdminDashboard from '@/pages/admin/Dashboard'
import AdminOpportunities from '@/pages/admin/Opportunities'
import AdminEvents from '@/pages/admin/Events'
import AdminStories from '@/pages/admin/Stories'
import AdminVolunteers from '@/pages/admin/Volunteers'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    )
  }
  if (!user) return <Navigate to="/login" />
  return <>{children}</>
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    )
  }
  if (!user) return <Navigate to="/login" />
  if (!isAdmin) return <Navigate to="/dashboard" />
  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="programs" element={<Programs />} />
        <Route path="events" element={<Events />} />
        <Route path="volunteer" element={<Volunteer />} />
        <Route path="ai-assistant" element={<ProtectedRoute><AIChat /></ProtectedRoute>} />
        <Route path="scholarship-finder" element={<Navigate to="/opportunities" replace />} />
        <Route path="opportunities" element={<OpportunityFinder />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="story-generator" element={<ProtectedRoute><StoryGenerator /></ProtectedRoute>} />
      </Route>
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="opportunities" element={<AdminOpportunities />} />
        <Route path="events" element={<AdminEvents />} />
        <Route path="stories" element={<AdminStories />} />
        <Route path="volunteers" element={<AdminVolunteers />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
