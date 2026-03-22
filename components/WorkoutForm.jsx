'use client'

import { useState } from 'react'
import { Dumbbell, Clock, Calendar, Activity } from 'lucide-react'

const ACTIVITIES = ['Running', 'Cycling', 'Yoga', 'Swimming', 'Gym', 'HIIT', 'Walking']

const ACTIVITY_EMOJI = {
  Running: '🏃', Cycling: '🚴', Yoga: '🧘',
  Swimming: '🏊', Gym: '🏋️', HIIT: '⚡', Walking: '🚶',
}

export default function WorkoutForm({ onWorkoutLogged }) {
  const today = new Date().toISOString().split('T')[0]

  const [form, setForm] = useState({ activity: 'Running', duration: '', date: today })
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [error, setError] = useState('')
  const [justLogged, setJustLogged] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.duration || parseInt(form.duration) < 1) {
      setError('Please enter a valid duration (at least 1 minute).')
      return
    }
    if (!form.date) {
      setError('Please select a date.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activity: form.activity, duration: parseInt(form.duration), date: form.date }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to log workout')

      setForm({ activity: 'Running', duration: '', date: today })
      setJustLogged(true)
      setShowToast(true)
      setTimeout(() => { setShowToast(false); setJustLogged(false) }, 3000)
      if (onWorkoutLogged) onWorkoutLogged(data)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="shimmer-border glass-card p-6 h-full hover-lift" style={{ border: '1px solid rgba(0,255,135,0.15)' }}>
      <div className="card-glare" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6 slide-in-left">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center glow-pulse breathe-animation"
          style={{
            background: 'linear-gradient(135deg, rgba(0,255,135,0.25), rgba(0,255,135,0.12))',
            border: '1px solid rgba(0,255,135,0.3)',
            boxShadow: '0 0 20px rgba(0,255,135,0.2)',
          }}
        >
          <Dumbbell size={20} style={{ color: '#00ff87' }} />
        </div>
        <div>
          <h2 className="text-xl font-semibold" style={{ color: '#f0f0f0' }}>Log Workout</h2>
          <p className="text-xs mt-0.5" style={{ color: '#666' }}>Track your fitness activity</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Activity */}
        <div>
          <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: '#666' }}>
            Activity
          </label>
          <div className="grid grid-cols-4 gap-2">
            {ACTIVITIES.map((a, idx) => (
              <button
                key={a}
                type="button"
                onClick={() => { setForm({ ...form, activity: a }); setError('') }}
                className="flex flex-col items-center gap-1 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 hover-scale ripple-effect zoom-in"
                style={{
                  background: form.activity === a
                    ? 'rgba(0,255,135,0.18)'
                    : 'rgba(255,255,255,0.04)',
                  border: form.activity === a
                    ? '1px solid rgba(0,255,135,0.4)'
                    : '1px solid rgba(255,255,255,0.07)',
                  color: form.activity === a ? '#00ff87' : '#888',
                  transform: form.activity === a ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: form.activity === a ? '0 0 16px rgba(0,255,135,0.2)' : 'none',
                  animationDelay: `${idx * 0.05}s`,
                }}
              >
                <span className="text-base">{ACTIVITY_EMOJI[a]}</span>
                <span style={{ fontSize: '0.65rem' }}>{a}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: '#666' }}>
            Duration (minutes)
          </label>
          <div className="relative">
            <Clock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#555' }} />
            <input
              type="number"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              min={1}
              placeholder="e.g. 45"
              className="w-full pl-10 pr-4 py-3 text-sm"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '12px',
                color: '#f0f0f0',
              }}
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: '#666' }}>
            Date
          </label>
          <div className="relative">
            <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10" style={{ color: '#555' }} />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              max={today}
              className="w-full pl-10 pr-4 py-3 text-sm"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '12px',
                color: '#f0f0f0',
                colorScheme: 'dark',
              }}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            className="text-sm px-4 py-3 rounded-xl fade-in"
            style={{
              background: 'rgba(255,80,80,0.08)',
              border: '1px solid rgba(255,80,80,0.25)',
              color: '#ff6464',
            }}
          >
            ⚠ {error}
          </div>
        )}

        {/* Liquid Magnetic Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="magnetic-btn ripple-effect w-full mt-2 py-4 rounded-xl flex items-center justify-center gap-2 text-black font-bold text-lg transition-all hover:scale-[1.05] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 card-shine"
        style={{
          background: loading ? 'linear-gradient(90deg, #00cc6a, #00ff87)' : 'linear-gradient(90deg, #00ff87, #60efff)',
          boxShadow: '0 6px 20px rgba(0, 255, 135, 0.4), 0 0 40px rgba(0, 255, 135, 0.2)',
          animation: loading ? 'none' : 'borderGlow 3s ease-in-out infinite',
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`)
          e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`)
        }}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
        ) : (
          <>
            <Activity size={20} className="bounce-animation" />
            Log Workout
          </>
        )}
      </button>
      </form>

      <div className={`toast ${showToast ? 'show' : ''}`}>🎯 Workout logged successfully!</div>
    </div>
  )
}
