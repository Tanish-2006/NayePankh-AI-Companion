import { useState } from 'react'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  GraduationCap,
  BookOpen,
  Trophy,
  ExternalLink,
  Calendar,
  Users,
  Sparkles,
  Loader2,
  School,
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import type { Scholarship, ScholarshipSearchResult } from '@/types'

const defaultScholarships: Scholarship[] = [
  {
    id: 1,
    title: 'National Merit cum Means Scholarship',
    provider: 'Ministry of Education, Govt. of India',
    description: 'Financial assistance to meritorious students from economically weaker sections for higher education.',
    amount: 120000,
    eligibility: 'Family income below ₹2.5 lakh/year, minimum 60% in academics',
    education_level: 'undergraduate',
    interest_area: 'general',
    application_url: 'https://scholarships.gov.in',
    deadline: '2026-10-31',
    is_active: true,
    created_at: null,
  },
  {
    id: 2,
    title: 'Begum Hazrat Mahal National Scholarship',
    provider: 'Maulana Azad Education Foundation',
    description: 'Merit-cum-means scholarship for minority community students pursuing technical/professional courses.',
    amount: 100000,
    eligibility: 'Minority community students, family income below ₹2 lakh/year',
    education_level: 'undergraduate',
    interest_area: 'engineering',
    application_url: 'https://maef.nic.in',
    deadline: '2026-09-30',
    is_active: true,
    created_at: null,
  },
  {
    id: 3,
    title: 'Pragati Scholarship for Girls',
    provider: 'AICTE',
    description: 'Encouragement to girl students pursuing technical education at AICTE-approved institutions.',
    amount: 50000,
    eligibility: 'Girl students, family income below ₹8 lakh/year, AICTE-approved institution',
    education_level: 'undergraduate',
    interest_area: 'engineering',
    application_url: 'https://www.aicte-india.org',
    deadline: '2026-11-15',
    is_active: true,
    created_at: null,
  },
  {
    id: 4,
    title: 'Post Graduate Indira Gandhi Scholarship',
    provider: 'UGC',
    description: 'Scholarship for single girl child pursuing post-graduate education.',
    amount: 62000,
    eligibility: 'Single girl child, PG admission in recognized university',
    education_level: 'postgraduate',
    interest_area: 'general',
    application_url: 'https://www.ugc.ac.in',
    deadline: '2026-12-31',
    is_active: true,
    created_at: null,
  },
  {
    id: 5,
    title: 'Sports Talent Scholarship',
    provider: 'Sports Authority of India',
    description: 'Support for young athletes balancing academics with sports training.',
    amount: 80000,
    eligibility: 'National/State level sportspersons, age 14-21',
    education_level: 'secondary',
    interest_area: 'sports',
    application_url: 'https://sportsauthorityofindia.nic.in',
    deadline: '2026-08-31',
    is_active: true,
    created_at: null,
  },
]

const educationLevels = [
  { value: 'secondary', label: 'Secondary School (Class 9-12)' },
  { value: 'undergraduate', label: 'Undergraduate (Bachelor\'s)' },
  { value: 'postgraduate', label: 'Postgraduate (Master\'s)' },
  { value: 'doctoral', label: 'Doctoral (PhD)' },
  { value: 'diploma', label: 'Diploma / Vocational' },
]

const interestAreas = [
  { value: 'general', label: 'General / All Streams' },
  { value: 'engineering', label: 'Engineering & Technology' },
  { value: 'medical', label: 'Medical & Health Sciences' },
  { value: 'arts', label: 'Arts & Humanities' },
  { value: 'science', label: 'Science & Research' },
  { value: 'commerce', label: 'Commerce & Management' },
  { value: 'law', label: 'Law & Legal Studies' },
  { value: 'sports', label: 'Sports & Physical Education' },
]

const defaultCourses = [
  { title: 'Digital Literacy for Rural Youth', provider: 'NayePankh Foundation', duration: '3 months', mode: 'Online' },
  { title: 'Spoken English & Communication', provider: 'Skill India Mission', duration: '6 months', mode: 'Hybrid' },
  { title: 'Financial Literacy Basics', provider: 'SEBI', duration: '4 weeks', mode: 'Online' },
  { title: 'Environmental Studies & Sustainability', provider: 'TERI', duration: '3 months', mode: 'Offline' },
]

const defaultCompetitions = [
  { title: 'National Science Olympiad', organizer: 'SOF', deadline: '2026-09-15', level: 'National' },
  { title: 'Youth Innovation Challenge', organizer: 'NayePankh Foundation', deadline: '2026-10-01', level: 'National' },
  { title: 'Essay Writing Competition on Social Impact', organizer: 'Ministry of Education', deadline: '2026-08-30', level: 'National' },
  { title: 'Community Service Project Contest', organizer: 'Rotary International', deadline: '2026-11-30', level: 'International' },
]

export default function ScholarshipFinder() {
  const [educationLevel, setEducationLevel] = useState('')
  const [interestArea, setInterestArea] = useState('')
  const [budget, setBudget] = useState('')
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [results, setResults] = useState<ScholarshipSearchResult | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setSearched(true)

    try {
      const data = await api.scholarships.search({
        education_level: educationLevel,
        interest_area: interestArea,
        max_fee: budget ? parseInt(budget) : undefined,
      })
      setResults(data)
    } catch {
      const filtered = defaultScholarships.filter((s) => {
        if (educationLevel && s.education_level !== educationLevel) return false
        if (interestArea && s.interest_area !== interestArea) return false
        if (budget && s.amount > parseInt(budget)) return false
        return true
      })
      setResults({
        scholarships: filtered,
        ai_recommendations: [],
        courses: defaultCourses,
        competitions: defaultCompetitions,
      })
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

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
                  <h1 className="text-2xl font-display font-bold text-brand-navy">Scholarship Finder</h1>
                  <p className="text-gray-600 text-sm">Discover scholarships, courses, and competitions tailored to your educational journey.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700">
                      Education Level
                    </label>
                    <select
                      id="educationLevel"
                      value={educationLevel}
                      onChange={(e) => setEducationLevel(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                    >
                      <option value="">Select education level</option>
                      {educationLevels.map((level) => (
                        <option key={level.value} value={level.value}>{level.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="interestArea" className="block text-sm font-medium text-gray-700">
                      Interest Area
                    </label>
                    <select
                      id="interestArea"
                      value={interestArea}
                      onChange={(e) => setInterestArea(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                    >
                      <option value="">Select interest area</option>
                      {interestAreas.map((area) => (
                        <option key={area.value} value={area.value}>{area.label}</option>
                      ))}
                    </select>
                  </div>

                  <Input
                    id="budget"
                    label="Annual Budget (optional)"
                    type="number"
                    placeholder="e.g., 100000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">{error}</div>
                )}

                <Button type="submit" disabled={loading} size="lg" className="gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5" />
                      Find Opportunities
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {loading && (
            <Card className="shadow-lg border-0">
              <CardContent className="p-12 text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-brand-navy mb-2">Searching for Opportunities</h3>
                <p className="text-gray-500">Finding the best scholarships and programs for you...</p>
              </CardContent>
            </Card>
          )}

          {searched && !loading && results && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="h-6 w-6 text-primary-600" />
                  <h2 className="text-xl font-display font-bold text-brand-navy">
                    AI-Recommended Scholarships
                    {results.scholarships.length > 0 && (
                      <span className="text-sm font-body text-gray-500 ml-2">
                        ({results.scholarships.length} found)
                      </span>
                    )}
                  </h2>
                </div>

                {results.scholarships.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.scholarships.map((scholarship) => (
                      <Card key={scholarship.id} className="card-hover border border-gray-100">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-brand-navy">{scholarship.title}</h3>
                              <p className="text-sm text-gray-500 mt-0.5">{scholarship.provider}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-lg font-bold text-primary-600">
                                {formatCurrency(scholarship.amount)}
                              </p>
                              <Badge variant="success" className="mt-1">Award</Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                            {scholarship.description}
                          </p>
                          <div className="mt-4 space-y-2">
                            <div className="flex items-start gap-2 text-xs text-gray-500">
                              <Users className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                              <span>{scholarship.eligibility}</span>
                            </div>
                            {scholarship.deadline && (
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Calendar className="h-3.5 w-3.5 shrink-0" />
                                <span>Deadline: {new Date(scholarship.deadline).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                              </div>
                            )}
                          </div>
                          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                            <Badge variant="info">{scholarship.education_level}</Badge>
                            {scholarship.application_url && (
                              <a
                                href={scholarship.application_url}
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
                    ))}
                  </div>
                ) : (
                  <Card className="border border-gray-100">
                    <CardContent className="p-8 text-center">
                      <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No scholarships matched your criteria.</p>
                      <p className="text-sm text-gray-400 mt-1">Try broadening your search.</p>
                    </CardContent>
                  </Card>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-6 w-6 text-brand-teal" />
                  <h2 className="text-xl font-display font-bold text-brand-navy">Recommended Courses</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.courses && results.courses.length > 0 ? (
                    results.courses.map((course: any, idx: number) => (
                      <Card key={idx} className="border border-gray-100 card-hover">
                        <CardContent className="p-5 flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                            <School className="h-5 w-5 text-brand-teal" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-brand-navy">{course.title}</h3>
                            <p className="text-sm text-gray-500">{course.provider}</p>
                            <div className="flex gap-3 mt-2">
                              <Badge variant="default">{course.duration}</Badge>
                              <Badge variant="info">{course.mode}</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8">
                      <BookOpen className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">No course recommendations available.</p>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-3 mb-4">
                  <Trophy className="h-6 w-6 text-brand-coral" />
                  <h2 className="text-xl font-display font-bold text-brand-navy">Competitions & Events</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.competitions && results.competitions.length > 0 ? (
                    results.competitions.map((comp: any, idx: number) => (
                      <Card key={idx} className="border border-gray-100 card-hover">
                        <CardContent className="p-5 flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                            <Trophy className="h-5 w-5 text-brand-coral" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-brand-navy">{comp.title}</h3>
                            <p className="text-sm text-gray-500">{comp.organizer}</p>
                            <div className="flex gap-3 mt-2">
                              {comp.deadline && (
                                <Badge variant="warning">
                                  <Calendar className="h-3 w-3 inline mr-1" />
                                  {new Date(comp.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </Badge>
                              )}
                              <Badge variant="info">{comp.level}</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8">
                      <Trophy className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">No competitions found.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}

          {!searched && (
            <Card className="shadow-lg border-0">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-brand-navy mb-2">Discover Your Path</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Tell us about your educational background and interests, and we&apos;ll find 
                  scholarships, courses, and competitions perfect for you.
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}
