import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail, Phone, MapPin, Clock, Send, Heart,
  Facebook, Twitter, Instagram, Youtube, ArrowRight,
  MessageSquare, ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
}

const contactInfo = [
  {
    icon: MapPin,
    title: 'Our Address',
    details: ['123, Community Centre, Sector 12', 'Dwarka, New Delhi', 'Delhi — 110078, India'],
    color: 'bg-primary-50 text-primary-600',
  },
  {
    icon: Phone,
    title: 'Phone Number',
    details: ['+91-11-45678900', '+91-9999999999'],
    action: { label: 'Call Now', href: 'tel:+911145678900' },
    color: 'bg-warm-50 text-warm-600',
  },
  {
    icon: Mail,
    title: 'Email Address',
    details: ['info@nayepankh.org', 'partnerships@nayepankh.org'],
    action: { label: 'Send Email', href: 'mailto:info@nayepankh.org' },
    color: 'bg-teal-50 text-teal-600',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['Monday — Friday: 9:00 AM — 6:00 PM', 'Saturday: 10:00 AM — 4:00 PM', 'Sunday: Closed'],
    color: 'bg-purple-50 text-purple-600',
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

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
            <Badge className="bg-white/10 text-white border-0 mb-4">Get In Touch</Badge>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              We Would Love to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-warm-400">
                Hear From You
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Whether you want to volunteer, partner with us, or simply learn more about our work — we are here to listen.
              Reach out and let us start a conversation.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-brand-cream">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 md:p-10">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                        <Send className="w-10 h-10 text-green-500" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-brand-navy mb-3">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto mb-6">
                        Thank you for reaching out. Our team will review your message and get back to you
                        within 24-48 hours. We look forward to connecting with you!
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSubmitted(false)
                          setFormData({ name: '', email: '', subject: '', message: '' })
                        }}
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                          <MessageSquare className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <h2 className="font-display text-2xl font-bold text-brand-navy">Send Us a Message</h2>
                          <p className="text-gray-500 text-sm">We will get back to you within 24 hours</p>
                        </div>
                      </div>
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-5">
                          <Input
                            label="Your Name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                            required
                          />
                          <Input
                            label="Your Email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                            required
                          />
                        </div>
                        <Input
                          label="Subject"
                          placeholder="How can we help you?"
                          value={formData.subject}
                          onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                          required
                        />
                        <Textarea
                          label="Your Message"
                          placeholder="Tell us about your query, partnership idea, or anything you would like to share..."
                          rows={6}
                          value={formData.message}
                          onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                          required
                        />
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full gradient-primary text-white shadow-lg"
                        >
                          <Send className="mr-2 w-4 h-4" />
                          Send Message
                        </Button>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {contactInfo.map((item, i) => {
                const Icon = item.icon
                return (
                  <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', item.color)}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-brand-navy text-sm mb-1">
                          {item.title}
                        </h3>
                        {item.details.map((detail, j) => (
                          <p key={j} className="text-gray-600 text-sm">{detail}</p>
                        ))}
                        {item.action && (
                          <a
                            href={item.action.href}
                            className="inline-flex items-center gap-1 text-primary-600 text-sm font-medium mt-2 hover:underline"
                          >
                            {item.action.label}
                            <ChevronRight className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}

              {/* Social Links */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <h3 className="font-display font-semibold text-brand-navy text-sm mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    {[
                      { icon: Facebook, href: '#', color: 'hover:bg-blue-100 hover:text-blue-600' },
                      { icon: Twitter, href: '#', color: 'hover:bg-sky-100 hover:text-sky-500' },
                      { icon: Instagram, href: '#', color: 'hover:bg-pink-100 hover:text-pink-600' },
                      { icon: Youtube, href: '#', color: 'hover:bg-red-100 hover:text-red-600' },
                    ].map((social, j) => {
                      const Icon = social.icon
                      return (
                        <a
                          key={j}
                          href={social.href}
                          className={cn(
                            'w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 transition-all duration-200',
                            social.color
                          )}
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Quick CTA */}
              <Card className="bg-gradient-to-br from-primary-600 to-brand-teal border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Heart className="w-12 h-12 text-white/80 mx-auto mb-4" />
                  <h3 className="font-display text-lg font-bold text-white mb-2">Want to Make a Difference?</h3>
                  <p className="text-white/70 text-sm mb-4">
                    Join us in our mission to empower communities and change lives.
                  </p>
                  <Button className="bg-white text-primary-700 hover:bg-gray-100 w-full">
                    Donate Now
                    <Heart className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Placeholder Section */}
      <section className="py-24 bg-white">
        <div className="section-container">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="info" className="mb-4">Find Us</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-navy mb-4">
              Visit Our Office
            </h2>
            <p className="text-gray-600 text-lg">
              We would be delighted to welcome you to our headquarters. Please reach out before visiting so we can give you the best experience.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-brand-cream to-gray-100"
          >
            <div className="aspect-[21/9] relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100/50 to-brand-cream/50" />
              <div className="relative text-center">
                <MapPin className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-brand-navy mb-2">NayePankh Foundation</h3>
                <p className="text-gray-500 mb-1">123, Community Centre, Sector 12</p>
                <p className="text-gray-500">Dwarka, New Delhi — 110078, India</p>
                <div className="mt-6 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm">
                  <MapPin className="w-4 h-4 text-brand-coral" />
                  <span className="text-sm text-gray-600">Interactive map coming soon</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
