import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { Search, Mail, Phone, MapPin, Clock, Download } from 'lucide-react'
import type { AdminVolunteer } from '@/types'

export default function AdminVolunteers() {
  const [items, setItems] = useState<AdminVolunteer[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [skillFilter, setSkillFilter] = useState('')
  const [selected, setSelected] = useState<AdminVolunteer | null>(null)

  useEffect(() => {
    const timer = setTimeout(load, 300)
    return () => clearTimeout(timer)
  }, [search, skillFilter])

  async function load() {
    setLoading(true)
    try {
      const params: any = {}
      if (search) params.search = search
      if (skillFilter) params.skill = skillFilter
      const data = await api.admin.volunteers.list(params)
      setItems(data)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  function exportCSV() {
    const headers = ['Name', 'Email', 'Phone', 'Location', 'Skills', 'Hours', 'Availability']
    const rows = items.map(v => [
      v.user_name, v.user_email, v.phone, v.location,
      v.skills.join('; '), v.hours_contributed.toString(), v.availability
    ])
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'volunteers.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Volunteer Management</h1>
          <p className="text-gray-500 mt-1">View and manage volunteer profiles</p>
        </div>
        <button onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, location..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
          />
        </div>
        <input
          value={skillFilter} onChange={e => setSkillFilter(e.target.value)}
          placeholder="Filter by skill..."
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 w-48"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-gray-400">No volunteers found</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(v => (
            <div
              key={v.id}
              onClick={() => setSelected(v)}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 cursor-pointer hover:border-primary-200 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">
                  {v.user_name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{v.user_name}</p>
                  <p className="text-xs text-gray-400 truncate">{v.user_email}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-500">
                {v.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" /> {v.location}
                  </div>
                )}
                {v.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" /> {v.phone}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" /> {v.hours_contributed}h contributed
                </div>
                {v.availability && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" /> {v.availability}
                  </div>
                )}
              </div>

              {v.skills?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {v.skills.slice(0, 4).map(s => (
                    <span key={s} className="px-2 py-0.5 bg-primary-50 text-primary-700 text-xs rounded-lg">{s}</span>
                  ))}
                  {v.skills.length > 4 && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-lg">+{v.skills.length - 4}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) setSelected(null) }}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg">
                  {selected.user_name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-display font-bold">{selected.user_name}</h2>
                  <p className="text-sm text-gray-500">{selected.user_email}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400">Phone</p>
                  <p className="text-sm font-medium">{selected.phone || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="text-sm font-medium">{selected.location || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Availability</p>
                  <p className="text-sm font-medium">{selected.availability || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Hours Contributed</p>
                  <p className="text-sm font-medium">{selected.hours_contributed}h</p>
                </div>
              </div>

              {selected.skills?.length > 0 && (
                <div>
                  <p className="text-xs text-gray-400 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.skills.map(s => (
                      <span key={s} className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-lg">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {selected.interests?.length > 0 && (
                <div>
                  <p className="text-xs text-gray-400 mb-2">Interests</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.interests.map(i => (
                      <span key={i} className="px-3 py-1 bg-warm-50 text-warm-700 text-sm rounded-lg">{i}</span>
                    ))}
                  </div>
                </div>
              )}

              {selected.bio && (
                <div>
                  <p className="text-xs text-gray-400 mb-1">Bio</p>
                  <p className="text-sm text-gray-600">{selected.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
