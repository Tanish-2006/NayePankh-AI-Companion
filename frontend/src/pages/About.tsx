import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Heart, Target, Eye, Quote, MapPin, Calendar,
  Users, BookOpen, ArrowRight, ChevronRight
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

const teamMembers = [
  {
    name: 'Dr. Arjun Mehta',
    role: 'Founder & Chairman',
    bio: 'A visionary educator with over 25 years of experience in social development and education reform across rural India.',
    initials: 'AM',
    color: 'bg-primary-100 text-primary-700',
  },
  {
    name: 'Ms. Kavita Reddy',
    role: 'Chief Executive Officer',
    bio: 'Former corporate leader turned social entrepreneur, passionate about creating sustainable impact through community-driven programs.',
    initials: 'KR',
    color: 'bg-warm-100 text-warm-700',
  },
  {
    name: 'Mr. Vikram Singh',
    role: 'Director of Programs',
    bio: 'Dedicated to designing and implementing large-scale education and empowerment programs reaching millions across the country.',
    initials: 'VS',
    color: 'bg-teal-100 text-teal-700',
  },
  {
    name: 'Dr. Sunita Gupta',
    role: 'Head of Research & Impact',
    bio: 'A PhD in Development Studies who ensures every program is data-driven and measured for tangible social outcomes.',
    initials: 'SG',
    color: 'bg-purple-100 text-purple-700',
  },
]

const timeline = [
  {
    year: '2010',
    title: 'The Beginning',
    description: 'NayePankh Foundation was founded by Dr. Arjun Mehta with a mission to provide quality education to 100 children in rural Uttar Pradesh.',
  },
  {
    year: '2013',
    title: 'First Major Program',
    description: 'Launched Shiksha Jyoti, our flagship after-school program, reaching 500 children across 10 villages.',
  },
  {
    year: '2016',
    title: 'Expanding Horizons',
    description: 'Introduced Sashakt Mahila, a women empowerment program, and expanded operations to 5 states in India.',
  },
  {
    year: '2019',
    title: 'Crossing Milestones',
    description: 'Reached 5000+ children, launched Green Earth sustainability initiative, and built a network of 5000+ volunteers.',
  },
  {
    year: '2022',
    title: 'Digital Leap',
    description: 'Introduced digital literacy programs, AI-assisted learning tools, and launched the Scholarship Finder platform.',
  },
  {
    year: '2025',
    title: 'The Journey Continues',
    description: 'Now operating across 15 states with 50+ programs, impacting over 10000 children annually, and growing stronger every day.',
  },
]

const values = [
  {
    icon: Heart,
    title: 'Compassion',
    description: 'Every action we take is rooted in genuine care and empathy for the communities we serve.',
  },
  {
    icon: Users,
    title: 'Inclusivity',
    description: 'We believe in equal opportunities for all, regardless of caste, creed, gender, or economic background.',
  },
  {
    icon: BookOpen,
    title: 'Education',
    description: 'Education is the most powerful tool for breaking the cycle of poverty and building a better future.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'We maintain complete transparency in our operations, ensuring every donation is used effectively.',
  },
  {
    icon: Target,
    title: 'Impact First',
    description: 'Every program we run is designed with clear, measurable goals to create tangible change.',
  },
  {
    icon: Heart,
    title: 'Sustainability',
    description: 'We build solutions that last, empowering communities to thrive independently long after our programs end.',
  },
]

export default function About() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-32 md:py-40 overflow-hidden bg-gradient-to-br from-brand-navy via-primary-900 to-brand-navy">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-1/3 w-80 h-80 bg-primary-400 rounded-full blur-[128px]" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-brand-teal rounded-full blur-[128px]" />
        </div>
        <div className="relative section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-white/10 text-white border-0 mb-4">About Us</Badge>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Our Story, Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-warm-400">
                Mission
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              For over 15 years, NayePankh Foundation has been dedicated to empowering underprivileged communities
              through education, skill development, and sustainable opportunities across India.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="info" className="mb-4">Our Story</Badge>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-navy mb-6">
                How NayePankh Began
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  NayePankh Foundation was born from a simple yet powerful idea — that every child, regardless of
                  their circumstances, deserves the opportunity to spread their wings and soar. In 2010, our founder
                  Dr. Arjun Mehta started teaching a small group of children under a banyan tree in a village in
                  Uttar Pradesh. What began as a humble effort soon grew into a movement.
                </p>
                <p>
                  Over the years, we have grown from that single classroom under a tree to a nationwide organization
                  touching the lives of millions. Our programs have expanded from basic education to include
                  women empowerment, environmental sustainability, digital literacy, and scholarship support.
                </p>
                <p>
                  Today, NayePankh Foundation operates across 15 states with over 50 active programs, supported by
                  a dedicated team of staff and a passionate network of 10,000+ volunteers. But our mission remains
                  the same: to give wings to dreams and build a world where every individual can thrive.
                </p>
              </div>
              <Link to="/volunteer" className="inline-block mt-6">
                <Button size="lg" className="gradient-primary text-white shadow-lg">
                  Join Our Story
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary-100 via-brand-cream to-teal-50 flex items-center justify-center p-12">
                <div className="text-center">
                  <Heart className="w-24 h-24 text-brand-coral mx-auto mb-6" />
                  <p className="text-brand-navy font-display text-3xl font-bold">15+ Years</p>
                  <p className="text-gray-500 mt-2">of dedicated service</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-40 h-24 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-display font-bold text-brand-navy">1M+</p>
                  <p className="text-xs text-gray-500">Lives Impacted</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-36 h-20 bg-gradient-to-br from-warm-500 to-brand-coral rounded-2xl shadow-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="text-lg font-display font-bold">15 States</p>
                  <p className="text-xs opacity-80">Pan India Presence</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-brand-cream">
        <div className="section-container">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="info" className="mb-4">Our Purpose</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-navy mb-4">
              Mission & Vision
            </h2>
            <p className="text-gray-600 text-lg">
              Everything we do is guided by our core purpose and the future we are working to create.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="h-2 bg-gradient-to-r from-primary-600 to-brand-teal" />
                <CardContent className="p-8 md:p-10">
                  <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-6">
                    <Target className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-brand-navy mb-4">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To empower underprivileged communities across India by providing access to quality education,
                    skill development, and sustainable opportunities that enable individuals to break the cycle
                    of poverty and build self-reliant, dignified lives.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {[
                      'Provide quality education to every child',
                      'Empower women through skill development',
                      'Build sustainable communities',
                      'Create opportunities for all',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="h-2 bg-gradient-to-r from-warm-500 to-brand-coral" />
                <CardContent className="p-8 md:p-10">
                  <div className="w-16 h-16 rounded-2xl bg-warm-50 flex items-center justify-center mb-6">
                    <Eye className="w-8 h-8 text-warm-600" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-brand-navy mb-4">Our Vision</h3>
                  <p className="text-gray-600 leading-relaxed">
                    A world where every individual, regardless of their background, has the opportunity to
                    reach their full potential; where communities are self-sufficient, empowered, and thriving;
                    and where no dream is too big and no child is left behind.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {[
                      'A nation where education is accessible to all',
                      'Communities that are self-reliant and thriving',
                      'Equal opportunities regardless of background',
                      'A sustainable and equitable world',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-warm-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-24 bg-white">
        <div className="section-container">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="success" className="mb-4">Our Team</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-navy mb-4">
              The People Behind the Mission
            </h2>
            <p className="text-gray-600 text-lg">
              Our dedicated team works tirelessly to turn vision into reality, bringing expertise, passion, and heart to everything we do.
            </p>
          </motion.div>
          <motion.div {...staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div key={i} {...fadeInChild}>
                <Card className="card-hover h-full border-0 shadow-md hover:shadow-xl text-center">
                  <CardContent className="p-8">
                    <div className={cn('w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5', member.color)}>
                      <span className="font-display font-bold text-2xl">{member.initials}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-brand-navy mb-1">{member.name}</h3>
                    <p className="text-sm text-primary-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Timeline Section */}
      <section className="py-24 bg-brand-cream">
        <div className="section-container">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="warning" className="mb-4">Our Journey</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-navy mb-4">
              Impact Timeline
            </h2>
            <p className="text-gray-600 text-lg">
              From our humble beginnings to where we are today — every milestone marks a step toward a better world.
            </p>
          </motion.div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-primary-300 to-primary-200 transform md:-translate-x-1/2" />
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn(
                  'relative flex items-start gap-6 mb-12 last:mb-0',
                  'md:flex-row md:gap-0',
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                )}
              >
                <div className={cn(
                  'flex-1 md:w-1/2',
                  i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                )}>
                  <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                    <span className="text-sm font-bold text-primary-600">{item.year}</span>
                    <h3 className="font-display text-lg font-semibold text-brand-navy mt-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm mt-2 leading-relaxed">{item.description}</p>
                  </div>
                </div>
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-primary-300 flex items-center justify-center -translate-y-1">
                  <div className="w-2 h-2 rounded-full bg-primary-600" />
                </div>
                <div className="flex-1 md:w-1/2 invisible md:visible" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="section-container">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="info" className="mb-4">Our Values</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-navy mb-4">
              What We Stand For
            </h2>
            <p className="text-gray-600 text-lg">
              These core values guide every decision we make and every program we create.
            </p>
          </motion.div>
          <motion.div {...staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <motion.div key={i} {...fadeInChild}>
                  <Card className="card-hover h-full border-0 bg-brand-cream shadow-sm hover:shadow-md">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-brand-navy mb-2">{value.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
          <motion.div {...fadeInUp} className="text-center mt-12">
            <Link to="/contact">
              <Button size="lg" className="gradient-primary text-white shadow-lg">
                Get In Touch
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
