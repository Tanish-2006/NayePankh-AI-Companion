import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, UserPlus } from 'lucide-react'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      await register({
        full_name: formData.full_name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      })
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-teal to-primary-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="relative flex flex-col justify-center px-16 text-white">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Heart className="h-12 w-12 mb-6 text-white/90" />
            <h1 className="text-4xl font-display font-bold mb-4">Join Our Mission</h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-md">
              Become a part of something bigger. Register to volunteer, create impact stories, 
              and help us bring meaningful change to communities across India.
            </p>
            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl font-display">"</div>
                <p className="text-sm text-white/70 italic">Together, we can lift wings and help dreams take flight.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-brand-cream">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-brand-navy">Create Account</h2>
            <p className="mt-2 text-gray-600">Join the NayePankh community</p>
          </div>

          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  id="full_name"
                  name="full_name"
                  label="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />

                <Input
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <Input
                  id="username"
                  name="username"
                  label="Username"
                  type="text"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />

                <Input
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg"
                  >
                    {error}
                  </motion.p>
                )}

                <Button type="submit" disabled={loading} className="w-full gap-2">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Creating account...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      Create Account
                    </span>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
