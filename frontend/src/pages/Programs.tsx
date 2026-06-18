import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, MapPin, Users, Heart, ArrowRight, Filter, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/api'
import { cn, truncate } from '@/lib/utils'
import type { Project } from '@/types'

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

const fallbackProjects: Project[] = [
  {
    id: 1,
    title: 'Shiksha Jyoti',
    slug: 'shiksha-jyoti',
    category: 'Education',
    description: 'An after-school program providing tutoring, digital literacy, and mentorship to children from low-income families across rural and urban India. Students receive academic support, access to computers, and career guidance.',
    location: 'Pan India',
    impact: '5000+ children enrolled across 15 states',
    volunteers_needed: 500,
    volunteers_enrolled: 320,
    skills_required: ['Teaching', 'Mentoring', 'Digital Literacy'],
    start_date: '2024-06-01',
    end_date: null,
    is_active: true,
    image_url: '',
    created_at: null,
  },
  {
    id: 2,
    title: 'Sashakt Mahila',
    slug: 'sashakt-mahila',
    category: 'Women Empowerment',
    description: 'A comprehensive initiative offering vocational training, financial literacy, and entrepreneurship support to women in underserved communities. Helping women gain economic independence and leadership skills.',
    location: 'Rajasthan, Gujarat, Bihar',
    impact: '2000+ women trained, 500+ businesses started',
    volunteers_needed: 300,
    volunteers_enrolled: 180,
    skills_required: ['Vocational Training', 'Financial Literacy', 'Mentoring'],
    start_date: '2023-01-15',
    end_date: null,
    is_active: true,
    image_url: '',
    created_at: null,
  },
  {
    id: 3,
    title: 'Green Earth Initiative',
    slug: 'green-earth',
    category: 'Sustainability',
    description: 'Community-led environmental projects including tree plantation drives, waste management programs, water conservation, and renewable energy awareness campaigns across rural India.',
    location: 'Uttarakhand, Himachal, Kerala',
    impact: '100000+ trees planted, 50+ communities trained',
    volunteers_needed: 400,
    volunteers_enrolled: 250,
    skills_required: ['Environmental Science', 'Community Organizing', 'Project Management'],
    start_date: '2022-07-01',
    end_date: null,
    is_active: true,
    image_url: '',
    created_at: null,
  },
  {
    id: 4,
    title: 'Digital Sakshar',
    slug: 'digital-sakshar',
    category: 'Digital Literacy',
    description: 'Bridging the digital divide by providing computer education, internet access, and digital skills training to students and adults in rural and semi-urban areas.',
    location: 'Maharashtra, Madhya Pradesh',
    impact: '10000+ individuals trained in digital skills',
    volunteers_needed: 200,
    volunteers_enrolled: 145,
    skills_required: ['Computer Skills', 'Training', 'Technical Support'],
    start_date: '2023-09-01',
    end_date: null,
    is_active: true,
    image_url: '',
    created_at: null,
  },
  {
    id: 5,
    title: 'Healthy Village',
    slug: 'healthy-village',
    category: 'Health',
    description: 'A community health program focusing on preventive healthcare, nutrition awareness, maternal health, and organizing health check-up camps in remote villages.',
    location: 'Bihar, Jharkhand, Odisha',
    impact: '50000+ health check-ups conducted',
    volunteers_needed: 350,
    volunteers_enrolled: 200,
    skills_required: ['Healthcare', 'Nutrition', 'Community Outreach'],
    start_date: '2024-01-10',
    end_date: null,
    is_active: true,
    image_url: '',
    created_at: null,
  },
  {
    id: 6,
    title: 'Youth Leadership',
    slug: 'youth-leadership',
    category: 'Leadership',
    description: 'A program designed to nurture young leaders through workshops in public speaking, project management, social entrepreneurship, and civic engagement.',
    location: 'Delhi, Mumbai, Bangalore',
    impact: '3000+ youth trained as community leaders',
    volunteers_needed: 150,
    volunteers_enrolled: 98,
    skills_required: ['Leadership', 'Public Speaking', 'Mentoring'],
    start_date: '2024-04-01',
    end_date: null,
    is_active: true,
    image_url: '',
    created_at: null,
  },
]

const categoryColors: Record<string, string> = {
  Education: 'bg-blue-50 text-blue-700',
  'Women Empowerment': 'bg-pink-50 text-pink-700',
  Sustainability: 'bg-green-50 text-green-700',
  'Digital Literacy': 'bg-purple-50 text-purple-700',
  Health: 'bg-red-50 text-red-700',
  Leadership: 'bg-amber-50 text-amber-700',
}

export default function Programs() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    api.projects.list()
      .then(setProjects)
      .catch(() => setProjects(fallbackProjects))
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', ...new Set(projects.map((p) => p.category))]

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
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
            <Badge className="bg-white/10 text-white border-0 mb-4">Our Programs</Badge>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Initiatives That{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-warm-400">
                Transform Lives
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              From education to environment, every program is designed to create lasting, measurable impact
              in communities across India. Find a cause that speaks to your heart.
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
                placeholder="Search programs..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              <Filter className="w-4 h-4 text-gray-400 shrink-0" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200',
                    activeCategory === category
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 bg-brand-cream min-h-screen">
        <div className="section-container">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-32">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-display text-2xl font-semibold text-gray-500 mb-2">No programs found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <motion.div {...staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <motion.div key={project.id} {...fadeInChild}>
                  <Card className="card-hover h-full border-0 shadow-md hover:shadow-xl overflow-hidden group flex flex-col">
                    <div className="h-48 bg-gradient-to-br from-primary-100 via-brand-cream to-teal-50 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Heart className="w-16 h-16 text-primary-200" />
                      </div>
                      <Badge
                        className={cn(
                          'absolute top-4 left-4 shadow-sm',
                          categoryColors[project.category] || 'bg-gray-50 text-gray-700'
                        )}
                      >
                        {project.category}
                      </Badge>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-600 shadow-sm">
                        {project.is_active ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                    <CardContent className="p-6 flex flex-col flex-1">
                      <h3 className="font-display text-xl font-semibold text-brand-navy mb-3 group-hover:text-primary-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                        {truncate(project.description, 150)}
                      </p>
                      <div className="space-y-2.5 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin className="w-4 h-4 text-primary-500" />
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Heart className="w-4 h-4 text-brand-coral" />
                          <span>{project.impact}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Users className="w-4 h-4 text-brand-teal" />
                          <span>
                            {project.volunteers_enrolled}/{project.volunteers_needed} volunteers
                          </span>
                        </div>
                      </div>
                      {project.skills_required && project.skills_required.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.skills_required.map((skill) => (
                            <span key={skill} className="px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                      <Link to={`/volunteer`}>
                        <Button size="sm" className="w-full gradient-primary text-white">
                          Volunteer for This Program
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
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

