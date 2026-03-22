'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [historyLoaded, setHistoryLoaded] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('/api/chat')
        if (!res.ok) throw new Error()
        const data = await res.json()
        if (Array.isArray(data))
          setMessages(data.map((m) => ({ role: m.role, content: m.content })))
      } catch { /* silent */ }
      finally { setHistoryLoaded(true) }
    }
    fetchHistory()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (isOpen && historyLoaded)
      setTimeout(() => inputRef.current?.focus(), 150)
  }, [isOpen, historyLoaded])

  const handleSend = async () => {
    const userMessage = input.trim()
    if (!userMessage || loading) return
    setInput('')
    setError('')
    const updatedMessages = [...messages, { role: 'user', content: userMessage }]
    setMessages(updatedMessages)
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history: messages }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to get response')
      setMessages([...updatedMessages, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setError(err.message || 'Something went wrong.')
      setMessages(messages)
    } finally {
      setLoading(false) }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const SUGGESTIONS = ['Best post-workout meal? 🍗', 'How to build muscle faster? 💪', 'Tips for running longer? 🏃']

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" style={{ zIndex: 1000 }}>

      {/* ── Chat Panel ── */}
      {isOpen && (
        <div
          className="chat-open-anim mb-4 flex flex-col rounded-3xl overflow-hidden card-shine"
          style={{
            width: '390px',
            maxWidth: 'calc(100vw - 48px)',
            height: '560px',
            maxHeight: 'calc(100vh - 160px)',
            background: 'rgba(12,12,12,0.98)',
            border: '1px solid rgba(0,255,135,0.25)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 60px rgba(0,255,135,0.1)',
            backdropFilter: 'blur(32px)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 flex-shrink-0"
            style={{
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              background: 'linear-gradient(135deg, rgba(0,255,135,0.07), rgba(96,239,255,0.03))',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(0,255,135,0.25), rgba(96,239,255,0.15))', border: '1px solid rgba(0,255,135,0.25)' }}
              >
                <Bot size={17} style={{ color: '#00ff87' }} />
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: '#f0f0f0' }}>FitCoach AI</div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full online-dot" style={{ background: '#00ff87', boxShadow: '0 0 6px #00ff87' }} />
                  <span className="text-xs" style={{ color: '#555' }}>Online · Ready to help</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,80,80,0.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
            >
              <X size={14} style={{ color: '#888' }} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {!historyLoaded ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 size={22} className="animate-spin" style={{ color: '#00ff87' }} />
              </div>
            ) : messages.length === 0 ? (
              /* Welcome screen */
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-4">
                <div
                  className="w-16 h-16 rounded-3xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(0,255,135,0.2), rgba(96,239,255,0.1))', border: '1px solid rgba(0,255,135,0.2)' }}
                >
                  <Sparkles size={28} style={{ color: '#00ff87' }} />
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: '#f0f0f0' }}>Hey! I'm FitCoach AI 👋</p>
                  <p className="text-xs mt-1.5 leading-relaxed" style={{ color: '#555', maxWidth: 220, margin: '6px auto 0' }}>
                    Ask me anything about workouts, nutrition, recovery, and exercise science.
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setInput(s.replace(/\s*[^\w\s].*$/, '').trim()); inputRef.current?.focus() }}
                      className="text-xs px-4 py-2.5 rounded-xl text-left transition-all duration-150"
                      style={{
                        background: 'rgba(0,255,135,0.05)',
                        border: '1px solid rgba(0,255,135,0.15)',
                        color: '#aaa',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0,255,135,0.1)'
                        e.currentTarget.style.color = '#00ff87'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0,255,135,0.05)'
                        e.currentTarget.style.color = '#aaa'
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} fade-in`}
                  >
                    {msg.role === 'assistant' && (
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-2"
                        style={{ background: 'rgba(0,255,135,0.12)', border: '1px solid rgba(0,255,135,0.2)' }}
                      >
                        <Bot size={13} style={{ color: '#00ff87' }} />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] px-4 py-2.5 text-sm leading-relaxed ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}
                      style={{ color: msg.role === 'user' ? '#d0ffe0' : '#ccc' }}
                    >
                      {msg.content}
                    </div>
                    {msg.role === 'user' && (
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ml-2"
                        style={{ background: 'rgba(0,255,135,0.12)', border: '1px solid rgba(0,255,135,0.2)' }}
                      >
                        <User size={13} style={{ color: '#00ff87' }} />
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing indicator */}
                {loading && (
                  <div className="flex justify-start fade-in">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-2"
                      style={{ background: 'rgba(0,255,135,0.12)', border: '1px solid rgba(0,255,135,0.2)' }}
                    >
                      <Bot size={13} style={{ color: '#00ff87' }} />
                    </div>
                    <div
                      className="px-4 py-3 rounded-3xl rounded-tl-sm flex items-center gap-1.5"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <span className="typing-dot w-2 h-2 rounded-full" style={{ background: '#00ff87' }} />
                      <span className="typing-dot w-2 h-2 rounded-full" style={{ background: '#00ff87' }} />
                      <span className="typing-dot w-2 h-2 rounded-full" style={{ background: '#00ff87' }} />
                    </div>
                  </div>
                )}

                {error && !loading && (
                  <div className="text-xs px-4 py-2.5 rounded-xl text-center fade-in"
                    style={{ background: 'rgba(255,80,80,0.08)', color: '#ff6464', border: '1px solid rgba(255,80,80,0.2)' }}>
                    {error}
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div
              className="flex items-end gap-2 rounded-2xl p-2"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about workouts, nutrition..."
                rows={1}
                className="flex-1 resize-none text-sm bg-transparent py-1.5 px-2"
                style={{
                  color: '#f0f0f0',
                  maxHeight: '80px',
                  border: 'none',
                  boxShadow: 'none',
                  outline: 'none',
                  lineHeight: 1.5,
                }}
                onInput={(e) => {
                  e.target.style.height = 'auto'
                  e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px'
                }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  background: input.trim() && !loading
                    ? 'linear-gradient(135deg, #00ff87, #00cc6a)'
                    : 'rgba(255,255,255,0.05)',
                  cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                  transform: input.trim() && !loading ? 'scale(1)' : 'scale(0.95)',
                  boxShadow: input.trim() && !loading ? '0 4px 16px rgba(0,255,135,0.3)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (input.trim() && !loading) e.currentTarget.style.transform = 'scale(1.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = input.trim() && !loading ? 'scale(1)' : 'scale(0.95)'
                }}
              >
                <Send size={15} style={{ color: input.trim() && !loading ? '#0a0a0a' : '#333' }} />
              </button>
            </div>
            <p className="text-xs text-center mt-2" style={{ color: '#333' }}>
              Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>
      )}

      {/* ── Toggle Button ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-15 h-15 rounded-full flex items-center justify-center transition-all duration-300 hover-scale ripple-effect"
        style={{
          width: 58, height: 58,
          background: isOpen
            ? 'rgba(30,30,30,0.95)'
            : 'linear-gradient(135deg, #00ff87, #00e07a)',
          boxShadow: isOpen
            ? '0 4px 20px rgba(0,0,0,0.5)'
            : '0 8px 32px rgba(0,255,135,0.6), 0 0 60px rgba(0,255,135,0.3)',
          border: isOpen ? '1px solid rgba(255,255,255,0.15)' : 'none',
          transform: isOpen ? 'scale(0.95) rotate(90deg)' : 'scale(1) rotate(0deg)',
          animation: !isOpen ? 'breathe 4s ease-in-out infinite' : undefined,
        }}
        aria-label="Toggle chat"
      >
        {isOpen
          ? <X size={22} style={{ color: '#f0f0f0' }} />
          : <MessageCircle size={22} style={{ color: '#0a0a0a' }} className="bounce-animation" />
        }

        {/* Ripple ring on chat button when closed */}
        {!isOpen && (
          <span
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid rgba(0,255,135,0.5)',
              animation: 'pulseRing 2.5s ease-out infinite',
            }}
          />
        )}
      </button>

      {/* New chat notification when empty */}
      {!isOpen && messages.length === 0 && historyLoaded && (
        <div
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold notif-pulse"
          style={{
            background: 'linear-gradient(135deg, #60efff, #00c4ff)',
            color: '#0a0a0a',
            fontSize: '0.6rem',
          }}
        >
          ✦
        </div>
      )}
    </div>
  )
}
