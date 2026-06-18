import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Send,
  Loader2,
  Bot,
  User,
  RefreshCw,
} from 'lucide-react'
import type { ChatMessage } from '@/types'

const suggestedQuestions = [
  'What programs does NayePankh offer?',
  'How can I volunteer with NayePankh?',
  'Tell me about the education initiatives',
  'How are donations utilized?',
]

const welcomeMessage: ChatMessage = {
  role: 'assistant',
  content: 'Namaste! I am NayePankh\'s Knowledge Assistant. I can help you learn about our foundation, programs, volunteer opportunities, and impact initiatives. How may I assist you today?',
}

export default function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | undefined>()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (message?: string) => {
    const text = (message || input).trim()
    if (!text || loading) return

    const userMessage: ChatMessage = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await api.chat.send({ message: text, session_id: sessionId })
      if (res.session_id && !sessionId) {
        setSessionId(res.session_id)
      }
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: res.reply || 'I apologize, but I could not process that request. Please try asking differently.',
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I apologize, but I am having trouble connecting right now. Please try again in a moment.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleNewChat = () => {
    setMessages([welcomeMessage])
    setSessionId(undefined)
    setInput('')
    inputRef.current?.focus()
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
          className="max-w-4xl mx-auto"
        >
          <Card className="shadow-xl border-0 overflow-hidden">
            <div className="gradient-primary px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-semibold">NayePankh Knowledge Assistant</h2>
                  <p className="text-white/70 text-xs">AI-powered NGO guide</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNewChat}
                className="text-white/80 hover:text-white hover:bg-white/10"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-white">
              <AnimatePresence initial={false}>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        msg.role === 'assistant'
                          ? 'bg-primary-100'
                          : 'bg-brand-navy'
                      }`}
                    >
                      {msg.role === 'assistant' ? (
                        <Bot className="h-4 w-4 text-primary-600" />
                      ) : (
                        <User className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'assistant'
                          ? 'bg-gray-50 text-gray-800 rounded-tl-sm'
                          : 'gradient-primary text-white rounded-tr-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-primary-600" />
                  </div>
                  <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && !loading && (
              <div className="px-6 pb-4 bg-white">
                <p className="text-xs text-gray-500 mb-3 font-medium">Suggested Questions</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="text-xs px-3.5 py-2 rounded-full border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-gray-100 p-4 bg-white">
              <div className="flex gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about NayePankh Foundation..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 placeholder:text-gray-400 transition-all"
                  disabled={loading}
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                  className="gap-2"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Send
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                AI responses are generated based on NayePankh&apos;s knowledge base
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
