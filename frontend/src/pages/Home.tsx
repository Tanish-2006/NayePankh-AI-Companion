import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Heart, GraduationCap, Users, Globe, ChevronRight,
  Calendar, MapPin, Star, Quote, ArrowRight, BookOpen,
  Sparkles, Shield, Target
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

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
  transition: { staggerChildren: 0.15 },
}

const fadeInChild = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

const missions = [
  {
    icon: BookOpen,
    title: 'Education',
    description: 'Providing quality education and learning resources to underprivileged children, ensuring every child has the opportunity to build a brighter future.',
    color: 'from-primary-500 to-primary-600',
    bgLight: 'bg-primary-50',
  },
  {
    icon: Users,
    title: 'Empowerment',
    description: 'Empowering youth and women through skill development programs, vocational training, and leadership opportunities that create lasting change.',
    color: 'from-warm-500 to-brand-coral',
    bgLight: 'bg-warm-50',
  },
  {
    icon: Heart,
    title: 'Community',
    description: 'Building strong, resilient communities through collective action, local partnerships, and grassroots initiatives that foster belonging.',
    color: 'from-brand-coral to-warm-500',
    bgLight: 'bg-red-50',
  },
  {
    icon: Globe,
    title: 'Sustainability',
    description: 'Creating sustainable development models that ensure long-term impact through environmental stewardship and economic self-reliance.',
    color: 'from-brand-teal to-primary-600',
    bgLight: 'bg-teal-50',
  },
]

const stats = [
  { value: '5000+', label: 'Children Educated', icon: GraduationCap },
  { value: '200+', label: 'Communities Reached', icon: Globe },
  { value: '10000+', label: 'Volunteers Engaged', icon: Users },
  { value: '50+', label: 'Active Programs', icon: Sparkles },
]

const stories = [
  {
    name: 'Priya Sharma',
    role: 'Scholarship Recipient',
    quote: 'NayePankh gave me wings when I had none. Their scholarship program not only funded my education but also gave me the confidence to dream big. Today, I am a software engineer at a top company, and I owe it all to their belief in me.',
    image: 'P',
    color: 'bg-primary-100 text-primary-700',
  },
  {
    name: 'Ramesh Kumar',
    role: 'Community Leader',
    quote: 'When our village was struggling with access to clean water, NayePankh stepped in. They didnt just build a water system; they trained our community to maintain it. That is sustainable change that lasts generations.',
    image: 'R',
    color: 'bg-warm-100 text-warm-700',
  },
  {
    name: 'Anita Patel',
    role: 'Volunteer Coordinator',
    quote: 'Volunteering with NayePankh transformed my life. The joy of teaching a child to read, of seeing a womans face light up when she learns a new skill — there is nothing more fulfilling. This is what humanity is about.',
    image: 'A',
    color: 'bg-teal-100 text-teal-700',
  },
]

const programs = [
  {
    title: 'Shiksha Jyoti',
    category: 'Education',
    description: 'An after-school program providing tutoring, digital literacy, and mentorship to children from low-income families across rural and urban India.',
    image: '📚',
    impact: '5000+ children enrolled',
    link: '/programs',
  },
  {
    title: 'Sashakt Mahila',
    category: 'Women Empowerment',
    description: 'A comprehensive initiative offering vocational training, financial literacy, and entrepreneurship support to women in underserved communities.',
    image: '💪',
    impact: '2000+ women trained',
    link: '/programs',
  },
  {
    title: 'Green Earth',
    category: 'Sustainability',
    description: 'Community-led environmental projects including tree plantation drives, waste management programs, and renewable energy awareness campaigns.',
    image: '🌱',
    impact: '100000+ trees planted',
    link: '/programs',
  },
]

const events = [
  {
    title: 'Annual Fundraising Gala 2025',
    date: 'December 15, 2025',
    location: 'New Delhi, India',
    category: 'Fundraiser',
    description: 'Join us for an evening of inspiration, stories of impact, and community celebration as we raise funds for our upcoming education initiatives.',
  },
  {
    title: 'Community Health Camp',
    date: 'November 5, 2025',
    location: 'Rajasthan, India',
    category: 'Health',
    description: 'A free health check-up camp providing medical consultations, eye check-ups, and health awareness sessions for rural communities.',
  },
  {
    title: 'Youth Leadership Workshop',
    date: 'October 20, 2025',
    location: 'Mumbai, India',
    category: 'Workshop',
    description: 'A three-day intensive workshop empowering young leaders with skills in public speaking, project management, and social entrepreneurship.',
  },
]

const scholarships = [
  {
    title: 'NayePankh Merit Scholarship',
    provider: 'NayePankh Foundation',
    amount: 50000,
    description: 'Awarded to outstanding students from underprivileged backgrounds pursuing higher education in STEM fields.',
    deadline: 'July 31, 2025',
  },
  {
    title: 'Future Leaders Grant',
    provider: 'Education For All Trust',
    amount: 75000,
    description: 'Supporting female students in rural areas to pursue undergraduate degrees in any discipline.',
    deadline: 'August 15, 2025',
  },
]

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 2000
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target])

  return (
    <span>{count.toLocaleString('en-IN')}{suffix}</span>
  )
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const Icon = stat.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center p-8"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-5">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
        <AnimatedCounter target={parseInt(stat.value.replace(/[^0-9]/g, ''))} suffix={stat.value.includes('+') ? '+' : ''} />
      </div>
      <p className="text-white/80 text-lg">{stat.label}</p>
    </motion.div>
  )
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy to-primary-900" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full blur-[128px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-teal rounded-full blur-[128px]" />
        </div>
        <div className="relative section-container py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
              >
                <Heart className="w-4 h-4 text-brand-coral" />
                <span className="text-white/90 text-sm font-medium">Spreading Wings, Changing Lives</span>
              </motion.div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                Every Child Deserves a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-warm-400">
                  Chance to Fly
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8 max-w-xl">
                At NayePankh Foundation, we believe that every individual, regardless of their circumstances,
                has the potential to soar. Join us in empowering communities through education, opportunity, and compassion.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/volunteer">
                  <Button size="lg" className="bg-white text-brand-navy hover:bg-gray-100 shadow-xl shadow-white/10">
                    Join Our Mission
                    <Heart className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/programs">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    Explore Programs
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <div className="w-96 h-96 rounded-3xl bg-gradient-to-br from-primary-500/30 to-brand-teal/30 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Heart className="w-20 h-20 text-brand-coral mx-auto mb-4" />
                    <p className="text-white/60 text-sm uppercase tracking-widest">NayePankh</p>
                    <p className="text-white/40 text-xs mt-2">Foundation</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-gradient-to-br from-warm-500 to-brand-coral flex items-center justify-center shadow-xl animate-bounce">
                  <span className="text-white font-display font-bold text-2xl">15+</span>
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-xl">
                  <span className="text-white text-sm font-medium">Years of Impact</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-brand-cream">
        <div className="section-container">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="info" className="mb-4">Our Mission</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-navy mb-4">
              What Drives Us
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our mission is rooted in the belief that every person has the power to create change.
              We focus on four key pillars to build a world where everyone can thrive.
            </p>
          </motion.div>
          <motion.div {...staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {missions.map((mission, i) => {
              const Icon = mission.icon
              return (
                <motion.div key={i} {...fadeInChild}>
                  <Card className="card-hover h-full group cursor-default border-0 shadow-md hover:shadow-xl">
                    <CardContent className="p-8">
                      <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center mb-5', mission.bgLight)}>
                        <Icon className="w-7 h-7 text-primary-600" />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-brand-navy mb-3">{mission.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{mission.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Impact Statistics Section */}
      <section className="py-24 bg-gradient-to-br from-brand-navy via-primary-900 to-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-400 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-teal rounded-full blur-[100px]" />
        </div>
        <div className="section-container relative">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-white/10 text-white border-0 mb-4">Our Impact</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Making a Difference Together
            </h2>
            <p className="text-white/70 text-lg">
              Numbers tell a story of hope, dedication, and the power of collective action.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-24 bg-white">
        <div className="section-container">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="success" className="mb-4">Success Stories</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-navy mb-4">
              Lives We Have Touched
            </h2>
            <p className="text-gray-600 text-lg">
              Real stories of transformation from the people whose lives have been changed through your support.
            </p>
          </motion.div>
          <motion.div {...staggerContainer} className="grid md:grid-cols-3 gap-8">
            {stories.map((story, i) => (
              <motion.div key={i} {...fadeInChild}>
                <Card className="card-hover h-full border-0 shadow-md hover:shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-50 to-brand-cream rounded-bl-3xl" />
                  <CardContent className="p-8">
                    <Quote className="w-10 h-10 text-primary-200 mb-4" />
                    <p className="text-gray-700 leading-relaxed mb-6 italic">"{story.quote}"</p>
                    <div className="flex items-center gap-4">
                      <div className={cn('w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-lg', story.color)}>
                        {story.image}
                      </div>
                      <div>
                        <p className="font-semibold text-brand-navy">{story.name}</p>
                        <p className="text-sm text-gray-500">{story.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mt-4">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-warm-500 text-warm-500" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Programs Showcase Section */}
      <section className="py-24 bg-brand-cream">
        <div className="section-container">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="info" className="mb-4">Our Programs</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-navy mb-4">
              Initiatives Creating Change
            </h2>
            <p className="text-gray-600 text-lg">
              From education to environment, our programs are designed to create lasting, meaningful impact.
            </p>
          </motion.div>
          <motion.div {...staggerContainer} className="grid md:grid-cols-3 gap-8">
            {programs.map((program, i) => (
              <motion.div key={i} {...fadeInChild}>
                <Card className="card-hover h-full border-0 shadow-md hover:shadow-xl overflow-hidden group">
                  <div className="h-48 bg-gradient-to-br from-primary-100 to-brand-cream flex items-center justify-center relative">
                    <span className="text-6xl">{program.image}</span>
                    <Badge className="absolute top-4 left-4 bg-white/90 text-brand-navy shadow-sm">
                      {program.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-display text-xl font-semibold text-brand-navy mb-3">{program.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{program.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-brand-teal font-medium">{program.impact}</span>
                      <Link to={program.link}>
                        <Button variant="ghost" size="sm" className="text-primary-600">
                          Learn More <ArrowRight className="ml-1 w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <motion.div {...fadeInUp} className="text-center mt-12">
            <Link to="/programs">
              <Button size="lg" className="gradient-primary text-white shadow-lg">
                View All Programs
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-24 bg-white">
        <div className="section-container">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="warning" className="mb-4">Upcoming Events</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-navy mb-4">
              Join Us in Making Impact
            </h2>
            <p className="text-gray-600 text-lg">
              Be part of our events and help us create meaningful change in communities across India.
            </p>
          </motion.div>
          <motion.div {...staggerContainer} className="grid md:grid-cols-3 gap-8">
            {events.map((event, i) => (
              <motion.div key={i} {...fadeInChild}>
                <Card className="card-hover h-full border border-gray-100 hover:border-primary-100 shadow-sm hover:shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-brand-navy to-primary-900 p-5 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5 text-brand-coral" />
                      <span className="text-sm font-medium">{event.date}</span>
                    </div>
                    <Badge className="bg-white/10 text-white border-0 text-xs">{event.category}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-semibold text-brand-navy mb-3">{event.title}</h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                    <Link to="/events" className="inline-flex items-center gap-1 text-primary-600 text-sm font-medium mt-4 hover:underline">
                      Learn More <ArrowRight className="w-3 h-3" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <motion.div {...fadeInUp} className="text-center mt-12">
            <Link to="/events">
              <Button size="lg" variant="outline" className="border-primary-600 text-primary-600">
                View All Events
                <Calendar className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Scholarship Opportunities Section */}
      <section className="py-24 bg-brand-cream">
        <div className="section-container">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="success" className="mb-4">Scholarships</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-navy mb-4">
              Open Doors to Education
            </h2>
            <p className="text-gray-600 text-lg">
              We connect students with scholarship opportunities that make quality education accessible to all.
            </p>
          </motion.div>
          <motion.div {...staggerContainer} className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {scholarships.map((scholarship, i) => (
              <motion.div key={i} {...fadeInChild}>
                <Card className="card-hover border-0 shadow-md hover:shadow-xl overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-display text-xl font-semibold text-brand-navy mb-1">{scholarship.title}</h3>
                        <p className="text-sm text-gray-500">{scholarship.provider}</p>
                      </div>
                      <div className="bg-gradient-to-br from-warm-500 to-brand-coral text-white px-4 py-2 rounded-xl text-center">
                        <p className="text-xs opacity-80">Amount</p>
                        <p className="font-display font-bold text-lg">₹{scholarship.amount.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{scholarship.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Deadline: {scholarship.deadline}</span>
                      </div>
                      <Link to="/scholarship-finder">
                        <Button size="sm" className="gradient-primary text-white">
                          Apply Now
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <motion.div {...fadeInUp} className="text-center mt-12">
            <Link to="/scholarship-finder">
              <Button size="lg" className="gradient-primary text-white shadow-lg">
                Find More Scholarships
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-brand-teal relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-white rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-white rounded-full blur-[100px]" />
        </div>
        <div className="section-container relative">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10">
              Whether you want to volunteer, donate, or partner with us, every effort counts.
              Together, we can give more wings to more dreams.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/volunteer">
                <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100 shadow-xl shadow-white/20">
                  <Heart className="mr-2 w-4 h-4" />
                  Become a Volunteer
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                  <Target className="mr-2 w-4 h-4" />
                  Partner With Us
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                  <Shield className="mr-2 w-4 h-4" />
                  Make a Donation
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
