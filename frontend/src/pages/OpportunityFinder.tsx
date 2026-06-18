import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  GraduationCap,
  Briefcase,
  Wrench,
  Trophy,
  BookOpen,
  Heart,
  ExternalLink,
  Calendar,
  Users,
  Sparkles,
  Loader2,
  Filter,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Opportunity } from '@/types'

const OPPORTUNITY_TYPES = [
  { value: 'scholarship', label: 'Scholarships', icon: GraduationCap, color: 'bg-blue-50 text-blue-600' },
  { value: 'internship', label: 'Internships', icon: Briefcase, color: 'bg-indigo-50 text-indigo-600' },
  { value: 'workshop', label: 'Workshops', icon: Wrench, color: 'bg-amber-50 text-amber-600' },
  { value: 'competition', label: 'Competitions', icon: Trophy, color: 'bg-purple-50 text-purple-600' },
  { value: 'training', label: 'Training Programs', icon: BookOpen, color: 'bg-emerald-50 text-emerald-600' },
  { value: 'volunteer', label: 'Volunteer', icon: Heart, color: 'bg-rose-50 text-rose-600' },
]

function getTypeConfig(type: string) {
  return OPPORTUNITY_TYPES.find((t) => t.value === type) ?? OPPORTUNITY_TYPES[0]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

export default function OpportunityFinder() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchOpportunities()
  }, [])

  const fetchOpportunities = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await api.opportunities.list()
      setOpportunities(data)
    } catch {
      setError('Failed to load opportunities. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const filtered = opportunities.filter((o) => {
    if (typeFilter && o.opportunity_type !== typeFilter) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        o.title.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q) ||
        o.eligibility.toLowerCase().includes(q)
      )
    }
    return true
  })

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="gradient-primary h-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
      </div>

      <div className="section-container -mt-24 relative z-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-xl border-0 overflow-hidden mb-8">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                  <Search className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-display font-bold text-brand-navy">Opportunity Finder</h1>
                  <p className="text-gray-600 text-sm">Discover scholarships, internships, workshops, and more tailored for you.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      placeholder="Search opportunities..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" onClick={fetchOpportunities} className="gap-2 shrink-0">
                    <Filter className="h-4 w-4" />
                    Refresh
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setTypeFilter('')}
                    className={cn(
                      'px-4 py-2 rounded-full text-sm font-medium transition-all border',
                      !typeFilter
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300'
                    )}
                  >
                    All
                  </button>
                  {OPPORTUNITY_TYPES.map((t) => {
                    const Icon = t.icon
                    return (
                      <button
                        key={t.value}
                        onClick={() => setTypeFilter(t.value)}
                        className={cn(
                          'px-4 py-2 rounded-full text-sm font-medium transition-all border inline-flex items-center gap-1.5',
                          typeFilter === t.value
                            ? 'bg-primary-600 text-white border-primary-600'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300'
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {t.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {error && (
            <Card className="shadow-lg border-0 mb-8">
              <CardContent className="p-8 text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={fetchOpportunities}>Try Again</Button>
              </CardContent>
            </Card>
          )}

          {loading && (
            <Card className="shadow-lg border-0">
              <CardContent className="p-12 text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-brand-navy mb-2">Loading Opportunities</h3>
                <p className="text-gray-500">Fetching the latest opportunities for you...</p>
              </CardContent>
            </Card>
          )}

          {!loading && !error && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-display font-bold text-brand-navy">
                  {typeFilter
                    ? `${OPPORTUNITY_TYPES.find((t) => t.value === typeFilter)?.label ?? 'Opportunities'}`
                    : 'All Opportunities'}
                  <span className="text-sm font-body text-gray-500 ml-2">({filtered.length} found)</span>
                </h2>
              </div>

              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filtered.map((opportunity) => {
                    const config = getTypeConfig(opportunity.opportunity_type)
                    const Icon = config.icon
                    return (
                      <motion.div key={opportunity.id} variants={itemVariants}>
                        <Card className="card-hover border border-gray-100 h-full">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <div className="flex items-center gap-2">
                                <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', config.color)}>
                                  <Icon className="h-5 w-5" />
                                </div>
                                <Badge variant="default" className="capitalize">
                                  {opportunity.opportunity_type}
                                </Badge>
                              </div>
                              {opportunity.deadline && (
                                <div className="flex items-center gap-1 text-xs text-gray-500 shrink-0">
                                  <Calendar className="h-3.5 w-3.5" />
                                  <span>{new Date(opportunity.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                </div>
                              )}
                            </div>

                            <h3 className="font-semibold text-brand-navy mb-1.5">{opportunity.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                              {opportunity.description}
                            </p>

                            {opportunity.eligibility && (
                              <div className="mt-3 flex items-start gap-2 text-xs text-gray-500">
                                <Users className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                                <span>{opportunity.eligibility}</span>
                              </div>
                            )}

                            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                              <span className="text-xs text-gray-400">
                                {new Date(opportunity.created_at ?? '').toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}
                              </span>
                              {opportunity.apply_link && (
                                <a
                                  href={opportunity.apply_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center gap-1"
                                >
                                  Apply Now
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              ) : (
                <Card className="shadow-lg border-0">
                  <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="h-10 w-10 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-brand-navy mb-2">No Opportunities Found</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      {search || typeFilter
                        ? 'Try adjusting your search or filters.'
                        : 'No published opportunities are available yet. Check back soon!'}
                    </p>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
