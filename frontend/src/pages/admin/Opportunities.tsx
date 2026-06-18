import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { Plus, Search, Edit3, Trash2, X, Check, Eye } from 'lucide-react'
import type { Opportunity } from '@/types'

const types = ['scholarship', 'internship', 'workshop', 'competition', 'training', 'volunteer']
const statuses = ['draft', 'published', 'archived']

export default function AdminOpportunities() {
  const [items, setItems] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Opportunity | null>(null)
  const [filter, setFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [form, setForm] = useState({
    title: '', description: '', opportunity_type: 'scholarship',
    eligibility: '', deadline: '', apply_link: '', status: 'draft'
  })

  useEffect(() => { load() }, [filter, typeFilter])

  async function load() {
    setLoading(true)
    try {
      const params: any = {}
      if (filter) params.status = filter
      if (typeFilter) params.opportunity_type = typeFilter
      const data = await api.admin.opportunities.list(params)
      setItems(data)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  function resetForm() {
    setForm({ title: '', description: '', opportunity_type: 'scholarship', eligibility: '', deadline: '', apply_link: '', status: 'draft' })
    setEditing(null)
    setShowForm(false)
  }

  function openEdit(item: Opportunity) {
    setForm({
      title: item.title, description: item.description, opportunity_type: item.opportunity_type,
      eligibility: item.eligibility, deadline: item.deadline ? item.deadline.slice(0, 16) : '', apply_link: item.apply_link, status: item.status
    })
    setEditing(item)
    setShowForm(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const payload = { ...form, deadline: form.deadline ? new Date(form.deadline).toISOString() : null }
      if (editing) {
        await api.admin.opportunities.update(editing.id, payload)
      } else {
        await api.admin.opportunities.create(payload)
      }
      resetForm()
      load()
    } catch (e) { console.error(e) }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this opportunity?')) return
    try {
      await api.admin.opportunities.delete(id)
      load()
    } catch (e) { console.error(e) }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Opportunities Hub</h1>
          <p className="text-gray-500 mt-1">Manage scholarships, internships, workshops & more</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true) }}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> New Opportunity
        </button>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
          >
            <option value="">All Types</option>
            {types.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
          </select>
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {['', ...statuses].map(s => (
            <button
              key={s || 'all'}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${filter === s ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All'}
            </button>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) resetForm() }}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold">{editing ? 'Edit Opportunity' : 'New Opportunity'}</h2>
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
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required rows={4} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select value={form.opportunity_type} onChange={e => setForm({ ...form, opportunity_type: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500">
                    {types.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500">
                    {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility</label>
                  <input value={form.eligibility} onChange={e => setForm({ ...form, eligibility: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                  <input type="datetime-local" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apply Link</label>
                  <input value={form.apply_link} onChange={e => setForm({ ...form, apply_link: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
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
        <div className="text-center py-12 text-gray-400">No opportunities found</div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-6 py-4 font-medium text-gray-500">Title</th>
                  <th className="text-left px-6 py-4 font-medium text-gray-500">Type</th>
                  <th className="text-left px-6 py-4 font-medium text-gray-500">Status</th>
                  <th className="text-left px-6 py-4 font-medium text-gray-500">Deadline</th>
                  <th className="text-right px-6 py-4 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.description.slice(0, 80)}...</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                        {item.opportunity_type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.status === 'published' ? 'bg-green-50 text-green-700' :
                        item.status === 'archived' ? 'bg-gray-100 text-gray-500' :
                        'bg-amber-50 text-amber-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {item.deadline ? new Date(item.deadline).toLocaleDateString('en-IN') : '—'}
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
