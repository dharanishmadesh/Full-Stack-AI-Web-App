'use client'

import { useState } from 'react'
import { Zap, Loader2, RefreshCw, Star } from 'lucide-react'

const TONES = [
  { id: 'Tough Coach 💪', label: 'Tough Coach', emoji: '💪', color: '#ff6464', bg: 'rgba(255,100,100,0.12)', border: 'rgba(255,100,100,0.3)' },
  { id: 'Friendly Buddy 😊', label: 'Friendly Buddy', emoji: '😊', color: '#00ff87', bg: 'rgba(0,255,135,0.12)', border: 'rgba(0,255,135,0.3)' },
  { id: 'Data Nerd 📊',     label: 'Data Nerd',     emoji: '📊', color: '#60efff', bg: 'rgba(96,239,255,0.12)', border: 'rgba(96,239,255,0.3)' },
]

export default function MotivationPanel({ workouts }) {
  const [tone, setTone] = useState('Friendly Buddy 😊')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const selectedTone = TONES.find((t) => t.id === tone)

  const handleGetMotivation = async () => {
    setLoading(true)
    setError('')
    setMessage('')
    try {
      const res = await fetch('/api/motivate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workouts, tone }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to get motivation')
      setMessage(data.message)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="shimmer-border glass-card p-6 md:p-8 hover-lift card-shine"
      style={{
        border: '1px solid rgba(255,180,50,0.2)',
        background: 'rgba(18,18,18,0.85)',
      }}
    >
      <div className="card-glare" />

      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-6 slide-in-left">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center glow-pulse breathe-animation"
            style={{
              background: 'linear-gradient(135deg, rgba(255,180,50,0.3), rgba(255,100,50,0.2))',
              border: '1px solid rgba(255,180,50,0.35)',
              boxShadow: '0 0 24px rgba(255,180,50,0.2)',
            }}
          >
            <Zap size={20} style={{ color: '#ffb432', animationDuration: '10s' }} className="rotate-animation" />
          </div>
          <div>
            <h2 className="text-xl font-semibold" style={{ color: '#f0f0f0' }}>AI Motivation</h2>
            <p className="text-xs mt-0.5" style={{ color: '#666' }}>Personalized coaching from your data</p>
          </div>
        </div>

        {/* Tone selector */}
        <div className="flex gap-2 stagger-children">
          {TONES.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTone(t.id); setMessage(''); setError('') }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover-scale ripple-effect"
              style={{
                background: tone === t.id ? t.bg : 'rgba(255,255,255,0.04)',
                border: tone === t.id ? `1px solid ${t.border}` : '1px solid rgba(255,255,255,0.07)',
                color: tone === t.id ? t.color : '#666',
                transform: tone === t.id ? 'scale(1.05)' : 'scale(1)',
                boxShadow: tone === t.id ? `0 0 16px ${t.bg}` : 'none',
              }}
            >
              <span className="zoom-in">{t.emoji}</span>
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* CTA button */}
      <button
        onClick={handleGetMotivation}
        disabled={loading}
        className="btn-primary flex items-center gap-2.5 px-6 py-3.5 text-sm mb-5 ripple-effect hover-scale card-shine"
      >
        {loading ? (
          <><Loader2 size={16} className="animate-spin" /> Generating...</>
        ) : message ? (
          <><RefreshCw size={16} className="rotate-animation" style={{ animationDuration: '2s' }} /> Regenerate</>
        ) : (
          <><Zap size={16} className="bounce-animation" /> Get AI Motivation</>
        )}
      </button>

      {/* Loading state */}
      {loading && (
        <div
          className="fade-in flex items-center gap-4 p-5 rounded-2xl"
          style={{
            background: 'rgba(255,180,50,0.05)',
            border: '1px solid rgba(255,180,50,0.12)',
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(255,180,50,0.15)' }}
          >
            <Zap size={18} style={{ color: '#ffb432' }} />
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              <span className="typing-dot w-2 h-2 rounded-full" style={{ background: '#ffb432' }} />
              <span className="typing-dot w-2 h-2 rounded-full" style={{ background: '#ffb432' }} />
              <span className="typing-dot w-2 h-2 rounded-full" style={{ background: '#ffb432' }} />
            </div>
            <p className="text-xs" style={{ color: '#888' }}>
              Your {selectedTone?.label} is analyzing your workout data...
            </p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div
          className="fade-in p-4 rounded-2xl text-sm"
          style={{
            background: 'rgba(255,80,80,0.07)',
            border: '1px solid rgba(255,80,80,0.2)',
            color: '#ff6464',
          }}
        >
          {error}
        </div>
      )}

      {/* Message */}
      {message && !loading && (
        <div
          className="message-reveal relative overflow-hidden p-6 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,180,50,0.07), rgba(255,90,50,0.04))',
            border: '1px solid rgba(255,180,50,0.18)',
          }}
        >
          {/* Top sparkle row */}
          <div className="absolute top-3 right-3 flex gap-1">
            {[...Array(3)].map((_, i) => (
              <Star
                key={i}
                size={8}
                className="sparkle"
                style={{
                  color: '#ffb432',
                  fill: '#ffb432',
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                background: `linear-gradient(135deg, ${selectedTone?.bg || 'rgba(255,180,50,0.2)'}, transparent)`,
                border: `1px solid ${selectedTone?.border || 'rgba(255,180,50,0.3)'}`,
              }}
            >
              <span className="text-lg">{selectedTone?.emoji}</span>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#ffb432' }}>
                Your {selectedTone?.label}
              </div>
              <div className="p-5 overflow-hidden">
                <p className="text-sm leading-relaxed text-[var(--foreground)] typewriter-text whitespace-pre-wrap">
                  {message}
                </p>
              </div>
            </div>
          </div>

          {/* Glow line at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,180,50,0.4), transparent)' }}
          />
        </div>
      )}

      {/* Empty state */}
      {!message && !loading && !error && (
        <div
          className="p-6 rounded-2xl text-center"
          style={{
            background: 'rgba(255,255,255,0.015)',
            border: '1px dashed rgba(255,255,255,0.07)',
          }}
        >
          <div className="text-3xl mb-2">🎯</div>
          <p className="text-sm" style={{ color: '#555' }}>
            Select your coach tone above and hit the button to get personalized motivation based on your real workout data.
          </p>
        </div>
      )}
    </div>
  )
}
