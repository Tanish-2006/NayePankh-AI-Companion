export interface User {
  id: number
  email: string
  username: string
  full_name: string
  role: string
  is_active: boolean
  is_volunteer: boolean
  created_at: string | null
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}

export interface Volunteer {
  id: number
  user_id: number
  bio: string
  skills: string[]
  interests: string[]
  availability: string
  location: string
  phone: string
  achievements: string[]
  hours_contributed: number
  created_at: string | null
}

export interface VolunteerMatch {
  id: number
  volunteer_id: number
  project_title: string
  project_description: string
  match_score: number
  reasoning: string
  status: string
  created_at: string | null
}

export interface Project {
  id: number
  title: string
  slug: string
  description: string
  category: string
  location: string
  impact: string
  volunteers_needed: number
  volunteers_enrolled: number
  skills_required: string[]
  start_date: string | null
  end_date: string | null
  is_active: boolean
  image_url: string
  created_at: string | null
}

export interface Event {
  id: number
  title: string
  slug: string
  description: string
  location: string
  event_date: string | null
  end_date: string | null
  category: string
  organizer: string
  max_participants: number
  registered_count: number
  image_url: string
  is_upcoming: boolean
  created_at: string | null
}

export interface ImpactStory {
  id: number
  title: string
  story: string
  donor_report: string
  linkedin_post: string
  newsletter: string
  event_name: string
  location: string
  created_at: string | null
}

export interface Scholarship {
  id: number
  title: string
  provider: string
  description: string
  amount: number
  eligibility: string
  education_level: string
  interest_area: string
  application_url: string
  deadline: string | null
  is_active: boolean
  created_at: string | null
}

export interface ScholarshipSearchResult {
  scholarships: Scholarship[]
  ai_recommendations: any[]
  courses: any[]
  competitions: any[]
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  created_at?: string
}

export interface ChatSession {
  session_id: string
  title: string
  messages: ChatMessage[]
  created_at: string | null
}

export interface StoryFormData {
  event_name: string
  location: string
  activity_details: string
  observations: string
}

export interface Opportunity {
  id: number
  title: string
  description: string
  opportunity_type: string
  eligibility: string
  deadline: string | null
  apply_link: string
  status: string
  created_at: string | null
  updated_at: string | null
}

export interface DashboardData {
  total_users: number
  total_volunteers: number
  active_events: number
  published_opportunities: number
  published_stories: number
  recent_activity: { type: string; message: string; timestamp: string | null }[]
}

export interface AdminVolunteer {
  id: number
  user_id: number
  user_email: string
  user_name: string
  bio: string
  skills: string[]
  interests: string[]
  availability: string
  location: string
  phone: string
  hours_contributed: number
  created_at: string | null
}

export interface AdminEvent {
  id: number
  title: string
  slug: string
  description: string
  location: string
  event_date: string | null
  end_date: string | null
  category: string
  organizer: string
  max_participants: number
  registered_count: number
  image_url: string
  status: string
  is_upcoming: boolean
  created_at: string | null
  updated_at: string | null
}

export interface AdminStory {
  id: number
  user_id: number | null
  title: string
  story: string
  author: string
  category: string
  image_url: string
  status: string
  is_published: boolean
  created_at: string | null
  updated_at: string | null
}
