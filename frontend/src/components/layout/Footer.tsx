import { Link } from 'react-router-dom'
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-brand-coral" />
              </div>
              <span className="font-display text-xl font-bold">
                Naye<span className="text-primary-400">Pankh</span>
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-md mb-6">
              NayePankh Foundation is dedicated to empowering underprivileged communities
              through education, skill development, and sustainable opportunities.
              Together, we can create a world where every individual has the chance to spread their wings and soar.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/programs', label: 'Programs' },
                { href: '/events', label: 'Events' },
                { href: '/volunteer', label: 'Volunteer' },
                { href: '/scholarship-finder', label: 'Scholarships' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-400 shrink-0" />
                <span>Delhi, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                <a href="mailto:info@nayepankh.org" className="hover:text-white transition-colors">
                  info@nayepankh.org
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-400 shrink-0" />
                <a href="tel:+919999999999" className="hover:text-white transition-colors">
                  +91-9999999999
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} NayePankh Foundation. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
