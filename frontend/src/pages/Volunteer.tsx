import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Heart, Users, BookOpen, Globe, Star, Shield,
  ArrowRight, CheckCircle, Clock, Sparkles,
  HeartHandshake, GraduationCap, Zap, Trophy
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/lib/api'

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

const benefits = [
  {
    icon: HeartHandshake,
    title: 'Make a Real Difference',
    description: 'Your time and skills can transform lives. Every hour you give helps a child learn, a woman gain independence, or a community thrive.',
  },
  {
    icon: GraduationCap,
    title: 'Learn New Skills',
    description: 'Gain valuable experience in teaching, project management, community organizing, and leadership that will serve you for life.',
  },
  {
    icon: Users,
    title: 'Join a Community',
    description: 'Become part of a passionate network of 10,000+ volunteers who share your commitment to creating positive change.',
  },
  {
    icon: Trophy,
    title: 'Earn Recognition',
    description: 'Receive certificates, letters of recommendation, and recognition for your contributions to social impact.',
  },
  {
    icon: Globe,
    title: 'Expand Your Horizons',
    description: 'Work with diverse communities across India, understand different cultures, and gain a broader perspective on life.',
  },
  {
    icon: Zap,
    title: 'Build Your Network',
    description: 'Connect with like-minded individuals, professionals, and organizations working in the social sector.',
  },
]

const requirements = [
  'Must be 18 years or older (16+ with parental consent)',
  'Commitment of at least 4 hours per week',
  'Strong passion for social change and community service',
  'Willingness to work in diverse environments',
  'Good communication and interpersonal skills',
  'Basic proficiency in Hindi and/or regional languages',
  'Access to reliable internet connection (for virtual roles)',
  'Clear background check for programs involving children',
]

const skillOptions = [
  'Teaching & Tutoring',
  'Digital Literacy',
  'Healthcare Support',
  'Environmental Conservation',
  'Event Management',
  'Fundraising',
  'Social Media & Marketing',
  'Graphic Design',
  'Content Writing',
  'Photography & Video',
  'Data Analysis',
  'Project Management',
  'Counseling',
  'Legal Support',
]

const interestOptions = [
  'Child Education',
  'Women Empowerment',
  'Environmental Sustainability',
  'Healthcare & Nutrition',
  'Digital Inclusion',
  'Youth Leadership',
  'Rural Development',
  'Disaster Relief',
]

export default function Volunteer() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    skills: [] as string[],
    interests: [] as string[],
    availability: '',
    bio: '',
    location: '',
    phone: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }))
  }

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await api.volunteers.createProfile(formData)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

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
            <Badge className="bg-white/10 text-white border-0 mb-4">Volunteer With Us</Badge>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Lend a Hand,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-warm-400">
                Change a Life
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-8">
              Your time, skills, and passion can create ripples of change that last a lifetime.
              Join thousands of volunteers who are making a real difference in communities across India.
            </p>
            <Link to={user ? '#register' : '/register'}>
              <Button size="lg" className="bg-white text-brand-navy hover:bg-gray-100 shadow-xl shadow-white/10">
                <Heart className="mr-2 w-5 h-5" />
                {user ? 'Register as Volunteer' : 'Join Us Today'}
              </Button>
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Why Volunteer Section */}
      <section className="py-24 bg-white">
        <div className="section-container">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="info" className="mb-4">Why Volunteer?</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-navy mb-4">
              Benefits of Volunteering
            </h2>
            <p className="text-gray-600 text-lg">
              Volunteering with NayePankh is not just about giving back — it is about growing, learning, and becoming part of something bigger than yourself.
            </p>
          </motion.div>
          <motion.div {...staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon
              return (
                <motion.div key={i} {...fadeInChild}>
                  <Card className="card-hover h-full border-0 bg-brand-cream shadow-sm hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-brand-navy mb-2">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-24 bg-brand-cream">
        <div className="section-container">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="warning" className="mb-4">Requirements</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-navy mb-4">
              What You Need to Know
            </h2>
            <p className="text-gray-600 text-lg">
              We want to make sure every volunteer has a fulfilling and impactful experience. Here is what we ask of our volunteers.
            </p>
          </motion.div>
          <motion.div {...staggerContainer} className="max-w-3xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 md:p-10">
                <div className="grid md:grid-cols-2 gap-4">
                  {requirements.map((req, i) => (
                    <motion.div
                      key={i}
                      {...fadeInChild}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                      <span className="text-gray-700 text-sm">{req}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-24 bg-white">
        <div className="section-container">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="success" className="mb-4">Get Started</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-navy mb-4">
              Become a Volunteer
            </h2>
            <p className="text-gray-600 text-lg">
              Ready to make a difference? Fill out the form below and our team will reach out to you with opportunities that match your interests.
            </p>
          </motion.div>

          {!user ? (
            <motion.div {...fadeInUp} className="max-w-lg mx-auto text-center">
              <Card className="border-0 shadow-lg p-10">
                <Heart className="w-16 h-16 text-brand-coral mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-brand-navy mb-3">
                  Join Us First
                </h3>
                <p className="text-gray-600 mb-6">
                  Please create an account or log in to register as a volunteer. It only takes a minute!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/register">
                    <Button size="lg" className="gradient-primary text-white shadow-lg w-full sm:w-auto">
                      Create Account
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="border-primary-600 text-primary-600 w-full sm:w-auto">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ) : success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center"
            >
              <Card className="border-0 shadow-lg p-10">
                <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="font-display text-2xl font-bold text-brand-navy mb-3">
                  Registration Submitted!
                </h3>
                <p className="text-gray-600 mb-6">
                  Thank you for your interest in volunteering with NayePankh Foundation.
                  Our team will review your application and reach out within 3-5 business days.
                </p>
                <Link to="/dashboard">
                  <Button size="lg" className="gradient-primary text-white shadow-lg">
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ) : (
            <motion.div {...fadeInUp} className="max-w-2xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 md:p-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Skills */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Your Skills <span className="text-red-400">*</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {skillOptions.map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            className={cn(
                              'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border',
                              formData.skills.includes(skill)
                                ? 'bg-primary-600 text-white border-primary-600'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300 hover:text-primary-600'
                            )}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Interests */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Areas of Interest <span className="text-red-400">*</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {interestOptions.map((interest) => (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            className={cn(
                              'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border',
                              formData.interests.includes(interest)
                                ? 'bg-warm-500 text-white border-warm-500'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-warm-300 hover:text-warm-600'
                            )}
                          >
                            {interest}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Availability */}
                    <Input
                      label="Weekly Availability"
                      placeholder="e.g., Weekday evenings, Weekend mornings, 10 hours/week"
                      value={formData.availability}
                      onChange={(e) => setFormData((p) => ({ ...p, availability: e.target.value }))}
                      required
                    />

                    {/* Location */}
                    <Input
                      label="Your Location"
                      placeholder="e.g., New Delhi, India"
                      value={formData.location}
                      onChange={(e) => setFormData((p) => ({ ...p, location: e.target.value }))}
                      required
                    />

                    {/* Phone */}
                    <Input
                      label="Phone Number"
                      placeholder="e.g., +91-9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                      required
                    />

                    {/* Bio */}
                    <Textarea
                      label="Why do you want to volunteer?"
                      placeholder="Tell us about yourself, your motivation, and any relevant experience..."
                      value={formData.bio}
                      onChange={(e) => setFormData((p) => ({ ...p, bio: e.target.value }))}
                      rows={5}
                      required
                    />

                    {error && (
                      <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gradient-primary text-white shadow-lg"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <span className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Heart className="w-5 h-5" />
                          Submit Registration
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
