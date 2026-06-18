import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/lib/api'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Heart,
  BookOpen,
  MessageCircle,
  Target,
  Clock,
  Award,
  ChevronRight,
  Sparkles,
  User,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react'
import type { Volunteer, VolunteerMatch } from '@/types'
import { formatDate } from '@/lib/utils'

interface ActivityEntry {
  id: number
  activity_type: string
  description: string
  created_at: string | null
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth()
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null)
  const [matches, setMatches] = useState<VolunteerMatch[]>([])
  const [history, setHistory] = useState<ActivityEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'history' | 'matches'>('overview')

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [volunteerData, matchesData, historyData] = await Promise.all([
        api.volunteers.profile().catch(() => null),
        api.volunteers.matches().catch(() => []),
        api.volunteers.history().catch(() => []),
      ])
      setVolunteer(volunteerData)
      setMatches(Array.isArray(matchesData) ? matchesData : [])
      setHistory(Array.isArray(historyData) ? historyData : [])
    } catch {
      // Silently handle - data will show empty states
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const stats = [
    { label: 'Active Matches', value: matches.length, icon: Target, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'Skills Added', value: volunteer?.skills?.length || 0, icon: Award, color: 'text-brand-teal', bg: 'bg-teal-50' },
    { label: 'Activities Logged', value: history.length, icon: Clock, color: 'text-brand-coral', bg: 'bg-orange-50' },
    { label: 'Hours Contributed', value: volunteer?.hours_contributed || 0, icon: Heart, color: 'text-brand-gold', bg: 'bg-amber-50' },
  ]

  const quickActions = [
    { label: 'Story Generator', desc: 'Create impact stories with AI', to: '/story-generator', icon: Sparkles },
    { label: 'AI Assistant', desc: 'Get NGO knowledge & help', to: '/ai-assistant', icon: MessageCircle },
    { label: 'Find Scholarships', desc: 'Discover funding opportunities', to: '/scholarship-finder', icon: BookOpen },
  ]

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="gradient-primary h-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
      </div>

      <div className="section-container -mt-24 relative z-10 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-white text-3xl font-display font-bold shadow-lg">
                {user?.full_name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-display font-bold text-brand-navy">
                  Welcome back, {user?.full_name?.split(' ')[0] || 'Volunteer'}
                </h1>
                <p className="text-gray-600 mt-1">
                  Here&apos;s an overview of your volunteer journey with NayePankh.
                </p>
              </div>
              <Link to="/story-generator">
                <Button className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  New Impact Story
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {stats.map((stat) => (
                <div key={stat.label} className={`${stat.bg} rounded-xl p-4 text-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
                  <p className="text-2xl font-bold text-brand-navy">{stat.value}</p>
                  <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Link key={action.label} to={action.to}>
                <Card className="card-hover cursor-pointer border border-gray-100">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                      <action.icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-brand-navy">{action.label}</h3>
                      <p className="text-sm text-gray-500">{action.desc}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 shrink-0" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border border-gray-100">
              <CardContent className="p-6">
                <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
                  {(['overview', 'skills', 'history', 'matches'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all capitalize ${
                        activeTab === tab
                          ? 'bg-white text-brand-navy shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab === 'overview' && <User className="h-4 w-4 inline mr-1.5" />}
                      {tab === 'skills' && <Award className="h-4 w-4 inline mr-1.5" />}
                      {tab === 'history' && <Clock className="h-4 w-4 inline mr-1.5" />}
                      {tab === 'matches' && <Target className="h-4 w-4 inline mr-1.5" />}
                      {tab}
                    </button>
                  ))}
                </div>

                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-brand-navy text-lg">Profile Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <User className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Full Name</p>
                          <p className="font-medium text-brand-navy">{user?.full_name || 'Not set'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="font-medium text-brand-navy">{user?.email || 'Not set'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Location</p>
                          <p className="font-medium text-brand-navy">{volunteer?.location || 'Not set'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="font-medium text-brand-navy">{volunteer?.phone || 'Not set'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'skills' && (
                  <div>
                    <h3 className="font-semibold text-brand-navy text-lg mb-4">Your Skills & Interests</h3>
                    {volunteer?.skills && volunteer.skills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {volunteer.skills.map((skill) => (
                          <Badge key={skill} variant="info" className="text-sm px-4 py-1.5">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Award className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No skills added yet.</p>
                        <p className="text-sm text-gray-400 mt-1">Update your profile to showcase your skills.</p>
                      </div>
                    )}
                    {volunteer?.interests && volunteer.interests.length > 0 && (
                      <>
                        <h4 className="font-medium text-brand-navy mt-6 mb-3">Interests</h4>
                        <div className="flex flex-wrap gap-2">
                          {volunteer.interests.map((interest) => (
                            <Badge key={interest} variant="success" className="text-sm px-4 py-1.5">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {activeTab === 'history' && (
                  <div>
                    <h3 className="font-semibold text-brand-navy text-lg mb-4">Activity History</h3>
                    {history.length > 0 ? (
                      <div className="space-y-3">
                        {history.map((entry) => (
                          <div key={entry.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0 mt-0.5">
                              <Clock className="h-4 w-4 text-primary-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-brand-navy text-sm capitalize">{entry.activity_type}</p>
                              <p className="text-sm text-gray-600 mt-0.5">{entry.description}</p>
                              {entry.created_at && (
                                <p className="text-xs text-gray-400 mt-1">{formatDate(entry.created_at)}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No activity history yet.</p>
                        <p className="text-sm text-gray-400 mt-1">Start volunteering to build your history.</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'matches' && (
                  <div>
                    <h3 className="font-semibold text-brand-navy text-lg mb-4">Matched Opportunities</h3>
                    {matches.length > 0 ? (
                      <div className="space-y-3">
                        {matches.map((match) => (
                          <div key={match.id} className="p-5 bg-gray-50 rounded-xl">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-brand-navy">{match.project_title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{match.project_description}</p>
                                {match.reasoning && (
                                  <p className="text-sm text-gray-500 mt-2 italic">
                                    Why this match: {match.reasoning}
                                  </p>
                                )}
                              </div>
                              <div className="text-center shrink-0">
                                <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center">
                                  <span className="text-lg font-bold text-primary-600">
                                    {Math.round(match.match_score)}%
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Match</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-3">
                              <Badge variant={match.status === 'accepted' ? 'success' : match.status === 'pending' ? 'warning' : 'default'}>
                                {match.status}
                              </Badge>
                              {match.created_at && (
                                <span className="text-xs text-gray-400">{formatDate(match.created_at)}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Target className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No matches found yet.</p>
                        <p className="text-sm text-gray-400 mt-1">Complete your profile to get matched with opportunities.</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
