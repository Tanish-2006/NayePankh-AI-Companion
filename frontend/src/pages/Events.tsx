import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Clock, ArrowRight, Filter, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/api'
import { cn, formatDate, truncate } from '@/lib/utils'
import type { Event } from '@/types'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-50px' },
  transition: { staggerChildren: 0.1 },
}

const fadeInChild = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

const fallbackEvents: Event[] = [
  {
    id: 1,
    title: 'Annual Fundraising Gala 2025',
    slug: 'annual-fundraising-gala-2025',
    description: 'Join us for an evening of inspiration, stories of impact, and community celebration as we raise funds for our upcoming education initiatives across India. The gala will feature guest speakers, beneficiary stories, and a silent auction.',
    location: 'New Delhi, India',
    event_date: '2025-12-15',
    end_date: '2025-12-15',
    category: 'Fundraiser',
    organizer: 'NayePankh Foundation',
    max_participants: 500,
    registered_count: 234,
    image_url: '',
    is_upcoming: true,
    created_at: null,
  },
  {
    id: 2,
    title: 'Community Health Camp',
    slug: 'community-health-camp',
    description: 'A free health check-up camp providing medical consultations, eye check-ups, dental care, and health awareness sessions for rural communities in Rajasthan.',
    location: 'Rajasthan, India',
    event_date: '2025-11-05',
    end_date: '2025-11-07',
    category: 'Health',
    organizer: 'NayePankh Foundation + Doctors Without Borders',
    max_participants: 1000,
    registered_count: 567,
    image_url: '',
    is_upcoming: true,
    created_at: null,
  },
  {
    id: 3,
    title: 'Youth Leadership Workshop',
    slug: 'youth-leadership-workshop',
    description: 'A three-day intensive workshop empowering young leaders with skills in public speaking, project management, social entrepreneurship, and civic engagement.',
    location: 'Mumbai, India',
    event_date: '2025-10-20',
    end_date: '2025-10-22',
    category: 'Workshop',
    organizer: 'NayePankh Foundation',
    max_participants: 200,
    registered_count: 156,
    image_url: '',
    is_upcoming: true,
    created_at: null,
  },
  {
    id: 4,
    title: 'Tree Plantation Drive',
    slug: 'tree-plantation-drive',
    description: 'Join us for a massive tree plantation drive across 50 villages in Uttarakhand. Together, we aim to plant 50000 saplings and create green corridors.',
    location: 'Uttarakhand, India',
    event_date: '2025-09-15',
    end_date: '2025-09-20',
    category: 'Environment',
    organizer: 'Green Earth Initiative',
    max_participants: 2000,
    registered_count: 1890,
    image_url: '',
    is_upcoming: true,
    created_at: null,
  },
  {
    id: 5,
    title: 'Education Fair 2025',
    slug: 'education-fair-2025',
    description: 'A comprehensive education fair connecting students from underprivileged backgrounds with scholarship opportunities, colleges, and career counseling resources.',
    location: 'Bangalore, India',
    event_date: '2025-08-10',
    end_date: '2025-08-11',
    category: 'Education',
    organizer: 'NayePankh Foundation',
    max_participants: 3000,
    registered_count: 2450,
    image_url: '',
    is_upcoming: false,
    created_at: null,
  },
  {
    id: 6,
    title: 'Women Entrepreneurship Summit',
    slug: 'women-entrepreneurship-summit',
    description: 'A summit bringing together women entrepreneurs, investors, and mentors to foster entrepreneurship among women from underserved communities.',
    location: 'Pune, India',
    event_date: '2025-07-05',
    end_date: '2025-07-06',
    category: 'Empowerment',
    organizer: 'NayePankh Foundation + Women In Business',
    max_participants: 500,
    registered_count: 489,
    image_url: '',
    is_upcoming: false,
    created_at: null,
  },
]

const categoryColors: Record<string, string> = {
  Fundraiser: 'bg-green-50 text-green-700',
  Health: 'bg-red-50 text-red-700',
  Workshop: 'bg-purple-50 text-purple-700',
  Environment: 'bg-emerald-50 text-emerald-700',
  Education: 'bg-blue-50 text-blue-700',
  Empowerment: 'bg-pink-50 text-pink-700',
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [showUpcoming, setShowUpcoming] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    api.events.list()
      .then(setEvents)
      .catch(() => setEvents(fallbackEvents))
      .finally(() => setLoading(false))
  }, [])

  const filteredEvents = events.filter((event) => {
    const matchesUpcoming = !showUpcoming || event.is_upcoming
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesUpcoming && matchesSearch
  })

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-32 md:py-40 overflow-hidden bg-gradient-to-br from-brand-navy via-primary-900 to-brand-navy">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-1/4 w-80 h-80 bg-primary-400 rounded-full blur-[128px]" />
          <div className="absolute bottom-10 right-1/3 w-96 h-96 bg-brand-teal rounded-full blur-[128px]" />
        </div>
        <div className="relative section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-white/10 text-white border-0 mb-4">Events</Badge>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Join Us in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-warm-400">
                Making Impact
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              From community health camps to fundraising galas, there are many ways to get involved.
              Find an event near you and be part of the change.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search events..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <Filter className="w-4 h-4 text-gray-400 shrink-0" />
              <button
                onClick={() => setShowUpcoming(true)}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  showUpcoming
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                <Calendar className="w-4 h-4 inline mr-1.5" />
                Upcoming
              </button>
              <button
                onClick={() => setShowUpcoming(false)}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  !showUpcoming
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                All Events
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-brand-cream min-h-screen">
        <div className="section-container">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
            </div>
          ) : filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-32"
            >
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-display text-2xl font-semibold text-gray-500 mb-2">No events found</h3>
              <p className="text-gray-400">
                {showUpcoming
                  ? 'No upcoming events right now. Check back soon or view all events.'
                  : 'No events match your search criteria.'}
              </p>
            </motion.div>
          ) : (
            <motion.div {...staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <motion.div key={event.id} {...fadeInChild}>
                  <Card className="card-hover h-full border-0 shadow-md hover:shadow-xl overflow-hidden flex flex-col">
                    <div className="bg-gradient-to-r from-brand-navy to-primary-900 p-5 text-white">
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar className="w-5 h-5 text-brand-coral" />
                        <span className="text-sm font-medium">{formatDate(event.event_date)}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={cn('border-0 text-xs', categoryColors[event.category] || 'bg-white/10 text-white')}>
                          {event.category}
                        </Badge>
                        {event.is_upcoming && (
                          <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">
                            Upcoming
                          </span>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-6 flex flex-col flex-1">
                      <h3 className="font-display text-lg font-semibold text-brand-navy mb-3 leading-snug">
                        {event.title}
                      </h3>
                      <div className="space-y-2 mb-4 flex-1">
                        <div className="flex items-start gap-2 text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary-500" />
                          <span>{event.location}</span>
                        </div>
                        {event.event_date && event.end_date && (
                          <div className="flex items-start gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4 mt-0.5 shrink-0 text-brand-teal" />
                            <span>{formatDate(event.event_date)} — {formatDate(event.end_date)}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Users className="w-4 h-4 shrink-0 text-brand-coral" />
                          <span>{event.registered_count}/{event.max_participants} registered</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {truncate(event.description, 120)}
                      </p>
                      <Button size="sm" variant="outline" className="w-full border-primary-600 text-primary-600 hover:bg-primary-50">
                        Register for Event
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
