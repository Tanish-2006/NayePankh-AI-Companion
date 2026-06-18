import { useState } from 'react'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Sparkles,
  Copy,
  Check,
  FileText,
  Megaphone,
  Mail,
  Globe,
  Loader2,
  BookOpen,
} from 'lucide-react'
import type { StoryFormData, ImpactStory } from '@/types'

type ResultTab = 'story' | 'donor' | 'linkedin' | 'newsletter'

const tabConfig: { key: ResultTab; label: string; icon: typeof FileText }[] = [
  { key: 'story', label: 'Impact Story', icon: BookOpen },
  { key: 'donor', label: 'Donor Report', icon: FileText },
  { key: 'linkedin', label: 'LinkedIn Post', icon: Megaphone },
  { key: 'newsletter', label: 'Newsletter', icon: Mail },
]

export default function StoryGenerator() {
  const [formData, setFormData] = useState<StoryFormData>({
    event_name: '',
    location: '',
    activity_details: '',
    observations: '',
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ImpactStory | null>(null)
  const [activeTab, setActiveTab] = useState<ResultTab>('story')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setResult(null)
    try {
      const data = await api.reports.generateStory(formData)
      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Failed to generate story. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getActiveContent = (): string => {
    if (!result) return ''
    switch (activeTab) {
      case 'story': return result.story
      case 'donor': return result.donor_report
      case 'linkedin': return result.linkedin_post
      case 'newsletter': return result.newsletter
    }
  }

  const handleCopy = async () => {
    const content = getActiveContent()
    if (!content) return
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const textarea = document.createElement('textarea')
      textarea.value = content
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
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
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-display font-bold text-brand-navy">Impact Story Generator</h1>
                  <p className="text-gray-600 text-sm">Transform your volunteer experiences into powerful narratives using AI.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    id="event_name"
                    name="event_name"
                    label="Event Name"
                    placeholder="e.g., Education Drive at Village School"
                    value={formData.event_name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    id="location"
                    name="location"
                    label="Location"
                    placeholder="e.g., Rural Jhunjhunu, Rajasthan"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Textarea
                  id="activity_details"
                  name="activity_details"
                  label="Activity Details"
                  placeholder="Describe what activities were conducted, who participated, and what happened during the event..."
                  value={formData.activity_details}
                  onChange={handleChange}
                  rows={4}
                  required
                />

                <Textarea
                  id="observations"
                  name="observations"
                  label="Observations & Impact"
                  placeholder="Share your observations, outcomes, memorable moments, and the impact you witnessed..."
                  value={formData.observations}
                  onChange={handleChange}
                  rows={4}
                  required
                />

                {error && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <Button type="submit" disabled={loading} size="lg" className="gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Generating Your Story...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      Generate Impact Story
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
                <h3 className="text-lg font-semibold text-brand-navy mb-2">Crafting Your Impact Story</h3>
                <p className="text-gray-500">Our AI is analyzing your inputs and creating compelling narratives...</p>
                <div className="flex justify-center gap-2 mt-6">
                  <div className="w-2 h-2 rounded-full bg-primary-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-primary-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-primary-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </CardContent>
            </Card>
          )}

          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-xl border-0 overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-display font-bold text-brand-navy">Generated Content</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {result.event_name} &middot; {result.location}
                      </p>
                    </div>
                    <Badge variant="success" className="gap-1">
                      <Sparkles className="h-3 w-3" />
                      AI Generated
                    </Badge>
                  </div>

                  <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mt-6 overflow-x-auto">
                    {tabConfig.map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                          activeTab === tab.key
                            ? 'bg-white text-brand-navy shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <tab.icon className="h-4 w-4" />
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="bg-gray-50 rounded-xl p-6 relative group">
                    <div className="absolute top-4 right-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopy}
                        className="gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-green-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {getActiveContent() || 'No content available.'}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <Button variant="outline" onClick={handleCopy} className="gap-2">
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied to Clipboard
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy {tabConfig.find((t) => t.key === activeTab)?.label}
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {!result && !loading && (
            <Card className="shadow-lg border-0">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-brand-navy mb-2">Ready to Share Your Impact?</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Fill in the details of your volunteer activity above and let our AI create 
                  beautiful impact stories, donor reports, social media posts, and newsletters.
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}
