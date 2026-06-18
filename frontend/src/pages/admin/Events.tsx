import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { Plus, Search, Edit3, Trash2, X, Check } from 'lucide-react'
import type { AdminEvent } from '@/types'

const statuses = ['draft', 'published', 'cancelled']

export default function AdminEvents() {
  const [items, setItems] = useState<AdminEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<AdminEvent | null>(null)
  const [filter, setFilter] = useState('')
  const [form, setForm] = useState({
    title: '', description: '', location: '', event_date: '',
    end_date: '', category: '', organizer: '', max_participants: 0,
    image_url: '', status: 'draft'
  })

  useEffect(() => { load() }, [filter])

  async function load() {
    setLoading(true)
    try {
      const data = await api.admin.events.list(filter || undefined)
      setItems(data)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  function resetForm() {
    setForm({ title: '', description: '', location: '', event_date: '', end_date: '', category: '', organizer: '', max_participants: 0, image_url: '', status: 'draft' })
    setEditing(null)
    setShowForm(false)
  }

  function openEdit(item: AdminEvent) {
    setForm({
      title: item.title, description: item.description, location: item.location,
      event_date: item.event_date ? item.event_date.slice(0, 16) : '',
      end_date: item.end_date ? item.end_date.slice(0, 16) : '',
      category: item.category, organizer: item.organizer, max_participants: item.max_participants,
      image_url: item.image_url, status: item.status
    })
    setEditing(item)
    setShowForm(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const payload = {
        ...form,
        event_date: new Date(form.event_date).toISOString(),
        end_date: form.end_date ? new Date(form.end_date).toISOString() : null,
        max_participants: Number(form.max_participants),
      }
      if (editing) {
        await api.admin.events.update(editing.id, payload)
      } else {
        await api.admin.events.create(payload)
      }
      resetForm()
      load()
    } catch (e) { console.error(e) }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this event?')) return
    try { await api.admin.events.delete(id); load() }
    catch (e) { console.error(e) }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Events Management</h1>
          <p className="text-gray-500 mt-1">Create and manage NGO events</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true) }}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700">
          <Plus className="w-4 h-4" /> New Event
        </button>
      </div>

      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {['', ...statuses].map(s => (
          <button key={s || 'all'} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${filter === s ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All'}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) resetForm() }}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold">{editing ? 'Edit Event' : 'New Event'}</h2>
              <button onClick={resetForm} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                  <input type="datetime-local" value={form.event_date} onChange={e => setForm({ ...form, event_date: e.target.value })} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input type="datetime-local" value={form.end_date} onChange={e => setForm({ ...form, end_date: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organizer</label>
                  <input value={form.organizer} onChange={e => setForm({ ...form, organizer: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
                  <input type="number" value={form.max_participants} onChange={e => setForm({ ...form, max_participants: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500">
                    {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={resetForm} className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl">Cancel</button>
                <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700">
                  <Check className="w-4 h-4" /> {editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-gray-400">No events found</div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-6 py-4 font-medium text-gray-500">Title</th>
                  <th className="text-left px-6 py-4 font-medium text-gray-500">Date</th>
                  <th className="text-left px-6 py-4 font-medium text-gray-500">Location</th>
                  <th className="text-left px-6 py-4 font-medium text-gray-500">Status</th>
                  <th className="text-right px-6 py-4 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {item.event_date ? new Date(item.event_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{item.location}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.status === 'published' ? 'bg-green-50 text-green-700' :
                        item.status === 'cancelled' ? 'bg-red-50 text-red-700' :
                        'bg-amber-50 text-amber-700'
                      }`}>{item.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(item)} className="p-2 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
