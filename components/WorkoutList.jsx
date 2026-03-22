'use client'

import { Activity, Clock, Calendar, CheckCircle, PlusCircle } from 'lucide-react'
import SpotlightCard from './SpotlightCard'

// Helper to format date
const ACTIVITY_BADGE = {
  Running: 'badge-running', Cycling: 'badge-cycling', Yoga: 'badge-yoga',
  Swimming: 'badge-swimming', Gym: 'badge-gym', HIIT: 'badge-hiit', Walking: 'badge-walking',
}
const ACTIVITY_EMOJI = {
  Running: '🏃', Cycling: '🚴', Yoga: '🧘',
  Swimming: '🏊', Gym: '🏋️', HIIT: '⚡', Walking: '🚶',
}
const ACTIVITY_MAX_MINUTES = {
  Running: 90, Cycling: 120, Yoga: 60, Swimming: 90,
  Gym: 90, HIIT: 45, Walking: 60,
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function WorkoutList({ workouts, loading, error }) {
  const maxDuration = workouts.length
    ? Math.max(...workouts.map((w) => w.duration))
    : 60

  if (loading) {
    return (
      <div className="glass-card p-6 h-full" style={{ border: '1px solid rgba(96,239,255,0.12)' }}>
        <div className="card-glare" />
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl skeleton" />
          <div>
            <div className="skeleton h-5 w-32 mb-2 rounded" />
            <div className="skeleton h-3 w-24 rounded" />
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton h-12 rounded-xl" style={{ animationDelay: `${i * 100}ms` }} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="glass-card p-6 h-full flex items-center justify-center" style={{ border: '1px solid rgba(255,80,80,0.15)' }}>
        <div className="text-center">
          <div className="text-4xl mb-3">⚠️</div>
          <p className="font-medium text-sm" style={{ color: '#ff6464' }}>Failed to load workouts</p>
          <p className="text-xs mt-1" style={{ color: '#555' }}>Check your Supabase connection</p>
        </div>
      </div>
    )
  }

  return (
    <div className="shimmer-border glass-card p-6 h-full" style={{ border: '1px solid rgba(96,239,255,0.12)' }}>
      <div className="card-glare" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(96,239,255,0.2), rgba(96,239,255,0.08))',
            border: '1px solid rgba(96,239,255,0.25)',
            boxShadow: '0 0 16px rgba(96,239,255,0.12)',
          }}
        >
          <Activity size={20} style={{ color: '#60efff' }} />
        </div>
        <div>
          <h2 className="text-xl font-semibold" style={{ color: '#f0f0f0' }}>Recent Workouts</h2>
          <p className="text-xs mt-0.5" style={{ color: '#666' }}>
            {workouts.length} workout{workouts.length !== 1 ? 's' : ''} logged
          </p>
        </div>
      </div>

      {/* Empty state */}
      {workouts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 px-4 text-center">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center mb-4"
            style={{
              background: 'rgba(96,239,255,0.05)',
              border: '1px dashed rgba(96,239,255,0.2)',
            }}
          >
            <span className="text-4xl">🏁</span>
          </div>
          <p className="font-semibold text-sm" style={{ color: '#e0e0e0' }}>No workouts yet</p>
          <p className="text-xs mt-2 leading-relaxed" style={{ color: '#555', maxWidth: 200 }}>
            Log your first workout to start building your fitness streak!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {workouts.map((w, index) => (
            <SpotlightCard
              key={w.id}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              containerClassName="group hover:-translate-y-1 transition-transform duration-300"
              style={{
                animation: `fadeSlideUp 0.4s ease-out forwards`,
                animationDelay: `${index * 80}ms`,
                opacity: 0,
              }}
            >
              {/* Left side: Icon + Details */}
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${ACTIVITY_BADGE[w.activity] || ''}`}
                >
                  {ACTIVITY_EMOJI[w.activity] || '💪'}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#e0e0e0' }}>{w.activity}</p>
                  <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#666' }}>
                    <Calendar size={12} /> {formatDate(w.date)}
                  </p>
                </div>
              </div>

              {/* Right side: Duration + Progress */}
              <div className="flex flex-col items-end sm:items-center gap-2 sm:gap-4 sm:flex-row">
                <div className="flex items-center gap-1.5 text-sm font-bold" style={{ color: '#e0e0e0' }}>
                  <Clock size={14} style={{ color: '#666' }} />
                  {w.duration}
                  <span className="text-xs font-normal" style={{ color: '#666' }}>min</span>
                </div>
                <div className="w-24 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${Math.min(100, (w.duration / (ACTIVITY_MAX_MINUTES[w.activity] || 60)) * 100)}%`,
                      background: 'linear-gradient(90deg, #60efff, #007bff)',
                    }}
                  />
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}
    </div>
  )
}
