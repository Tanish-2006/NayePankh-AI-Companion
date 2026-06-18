import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import {
  Users, Target, CalendarDays, BookOpen, Heart,
  TrendingUp, Activity
} from 'lucide-react'
import type { DashboardData } from '@/types'

const statCards: { label: string; key: 'total_users' | 'total_volunteers' | 'active_events' | 'published_opportunities' | 'published_stories'; icon: any; color: string }[] = [
  { label: 'Total Users', key: 'total_users', icon: Users, color: 'bg-blue-500' },
  { label: 'Volunteers', key: 'total_volunteers', icon: Heart, color: 'bg-green-500' },
  { label: 'Active Events', key: 'active_events', icon: CalendarDays, color: 'bg-purple-500' },
  { label: 'Opportunities', key: 'published_opportunities', icon: Target, color: 'bg-warm-500' },
  { label: 'Stories', key: 'published_stories', icon: BookOpen, color: 'bg-pink-500' },
]

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.admin.dashboard()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of NayePankh Foundation platform</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map(({ label, key, icon: Icon, color }) => (
          <div key={key} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${color} bg-opacity-10 flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-3xl font-display font-bold text-gray-900">
              {data ? data[key] as number : 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-primary-600" />
            <h2 className="font-display font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="space-y-3">
            {data?.recent_activity?.length ? (
              data.recent_activity.map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700">{item.message}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item.timestamp ? new Date(item.timestamp).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      }) : ''}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No recent activity</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-brand-coral" />
            <h2 className="font-display font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'New Opportunity', href: '/admin/opportunities', desc: 'Create scholarships, internships & more' },
              { label: 'Create Event', href: '/admin/events', desc: 'Add a new NGO event' },
              { label: 'Add Story', href: '/admin/stories', desc: 'Share an impact story' },
              { label: 'View Volunteers', href: '/admin/volunteers', desc: 'Manage volunteer database' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="p-4 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50/50 transition-all"
              >
                <p className="font-medium text-sm text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
