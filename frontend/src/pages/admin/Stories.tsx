import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { Plus, Edit3, Trash2, X, Check } from 'lucide-react'
import type { AdminStory } from '@/types'

const statuses = ['draft', 'published', 'archived']

export default function AdminStories() {
  const [items, setItems] = useState<AdminStory[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<AdminStory | null>(null)
  const [filter, setFilter] = useState('')
  const [form, setForm] = useState({
    title: '', story: '', author: '', category: '', image_url: '', status: 'draft'
  })

  useEffect(() => { load() }, [filter])

  async function load() {
    setLoading(true)
    try {
      const data = await api.admin.stories.list(filter || undefined)
      setItems(data)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  function resetForm() {
    setForm({ title: '', story: '', author: '', category: '', image_url: '', status: 'draft' })
    setEditing(null)
    setShowForm(false)
  }

  function openEdit(item: AdminStory) {
    setForm({
      title: item.title, story: item.story, author: item.author,
      category: item.category, image_url: item.image_url, status: item.status
    })
    setEditing(item)
    setShowForm(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (editing) {
        await api.admin.stories.update(editing.id, form)
      } else {
        await api.admin.stories.create(form)
      }
      resetForm()
      load()
    } catch (e) { console.error(e) }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this story?')) return
    try { await api.admin.stories.delete(id); load() }
    catch (e) { console.error(e) }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Success Stories</h1>
          <p className="text-gray-500 mt-1">Manage impact stories and testimonials</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true) }}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700">
          <Plus className="w-4 h-4" /> New Story
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
              <h2 className="text-xl font-display font-bold">{editing ? 'Edit Story' : 'New Story'}</h2>
              <button onClick={resetForm} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Story</label>
                  <textarea value={form.story} onChange={e => setForm({ ...form, story: e.target.value })} required rows={6} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
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
        <div className="text-center py-12 text-gray-400">No stories found</div>
      ) : (
        <div className="grid gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === 'published' ? 'bg-green-50 text-green-700' :
                      item.status === 'archived' ? 'bg-gray-100 text-gray-500' :
                      'bg-amber-50 text-amber-700'
                    }`}>{item.status}</span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{item.story}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                    {item.author && <span>By {item.author}</span>}
                    {item.category && <span>{item.category}</span>}
                    {item.created_at && <span>{new Date(item.created_at).toLocaleDateString('en-IN')}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button onClick={() => openEdit(item)} className="p-2 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
