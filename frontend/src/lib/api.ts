const API_BASE = 'https://nayepankh-ai-companion.onrender.com/api'

function getToken(): string | null {
  return localStorage.getItem('token')
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: 'Request failed' }))
    throw new Error(error.detail || 'Request failed')
  }

  return res.json()
}

export const api = {
  auth: {
    login: async (data: { username: string; password: string }) => {
      const formData = new URLSearchParams()
      formData.append('username', data.username)
      formData.append('password', data.password)

      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.detail || 'Login failed')
      }

      return res.json()
    },
    register: (data: { email: string; username: string; password: string; full_name: string }) =>
      request<any>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    me: () => request<any>('/auth/me'),
  },
  projects: {
    list: () => request<any[]>('/projects/'),
    get: (slug: string) => request<any>(`/projects/${slug}`),
  },
  events: {
    list: () => request<any[]>('/events/'),
    upcoming: () => request<any[]>('/events/upcoming'),
    get: (slug: string) => request<any>(`/events/${slug}`),
  },
  volunteers: {
    profile: () => request<any>('/volunteers/profile'),
    createProfile: (data: any) =>
      request<any>('/volunteers/profile', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    matches: () => request<any[]>('/volunteers/matches'),
    findMatches: () =>
      request<any[]>('/volunteers/match', { method: 'POST' }),
    history: () => request<any[]>('/volunteers/history'),
  },
  reports: {
    generateStory: (data: any) =>
      request<any>('/reports/generate-story', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    stories: () => request<any[]>('/reports/stories'),
    getStory: (id: number) => request<any>(`/reports/stories/${id}`),
  },
  scholarships: {
    search: (data: any) =>
      request<any>('/scholarships/search', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
  opportunities: {
    list: (params?: { type?: string }) => {
      const q = params?.type ? `?type=${params.type}` : ''
      return request<any[]>(`/opportunities${q}`)
    },
    get: (id: number) => request<any>(`/opportunities/${id}`),
  },
  chat: {
    send: (data: { message: string; session_id?: string }) =>
      request<any>('/chat/', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    history: () => request<any[]>('/chat/history'),
  },
  admin: {
    dashboard: () => request<any>('/admin/dashboard'),
    opportunities: {
      list: (params?: { status?: string; opportunity_type?: string }) => {
        const q = new URLSearchParams(params || {}).toString()
        return request<any[]>(`/admin/opportunities${q ? '?' + q : ''}`)
      },
      create: (data: any) =>
        request<any>('/admin/opportunities', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      get: (id: number) => request<any>(`/admin/opportunities/${id}`),
      update: (id: number, data: any) =>
        request<any>(`/admin/opportunities/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        }),
      delete: (id: number) =>
        request<void>(`/admin/opportunities/${id}`, { method: 'DELETE' }),
    },
    events: {
      list: (status?: string) => {
        const q = status ? `?status=${status}` : ''
        return request<any[]>(`/admin/events${q}`)
      },
      create: (data: any) =>
        request<any>('/admin/events', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      get: (id: number) => request<any>(`/admin/events/${id}`),
      update: (id: number, data: any) =>
        request<any>(`/admin/events/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        }),
      delete: (id: number) =>
        request<void>(`/admin/events/${id}`, { method: 'DELETE' }),
    },
    stories: {
      list: (status?: string) => {
        const q = status ? `?status=${status}` : ''
        return request<any[]>(`/admin/stories${q}`)
      },
      create: (data: any) =>
        request<any>('/admin/stories', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      get: (id: number) => request<any>(`/admin/stories/${id}`),
      update: (id: number, data: any) =>
        request<any>(`/admin/stories/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        }),
      delete: (id: number) =>
        request<void>(`/admin/stories/${id}`, { method: 'DELETE' }),
    },
    volunteers: {
      list: (params?: { search?: string; skill?: string }) => {
        const q = new URLSearchParams(params || {}).toString()
        return request<any[]>(`/admin/volunteers${q ? '?' + q : ''}`)
      },
      get: (id: number) => request<any>(`/admin/volunteers/${id}`),
    },
  },
}
