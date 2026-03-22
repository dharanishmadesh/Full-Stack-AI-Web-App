'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Flame, Calendar, Trophy, Clock } from 'lucide-react'
import WorkoutForm from '@/components/WorkoutForm'
import WorkoutList from '@/components/WorkoutList'
import StatsCard from '@/components/StatsCard'
import MotivationPanel from '@/components/MotivationPanel'
import ChatWidget from '@/components/ChatWidget'
import WeeklyChart from '@/components/WeeklyChart'
import ActivityHeatmap from '@/components/ActivityHeatmap'
import SpotlightCard from '@/components/SpotlightCard'
import AnimatedGymScene from '@/components/AnimatedGymScene'
import AchievementBadge from '@/components/AchievementBadge'
import MotivationQuotes from '@/components/MotivationQuotes'
import WorkoutCalendar from '@/components/WorkoutCalendar'
import ProgressRing from '@/components/ProgressRing'
import FeaturesShowcase from '@/components/FeaturesShowcase'

// ──────────────────────────────────────────────
// Stats helpers (client-side)
// ──────────────────────────────────────────────
function computeStats(workouts) {
  if (!workouts || workouts.length === 0)
    return { streak: 0, thisWeek: 0, mostFrequent: '—', totalMinutes: 0 }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dateSet = new Set(workouts.map((w) => w.date))

  let streak = 0
  let checkDate = new Date(today)
  if (!dateSet.has(today.toISOString().split('T')[0]))
    checkDate.setDate(checkDate.getDate() - 1)
  while (true) {
    const ds = checkDate.toISOString().split('T')[0]
    if (dateSet.has(ds)) { streak++; checkDate.setDate(checkDate.getDate() - 1) }
    else break
  }

  const dow = today.getDay()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - (dow === 0 ? 6 : dow - 1))
  startOfWeek.setHours(0, 0, 0, 0)
  const thisWeek = workouts.filter((w) => new Date(w.date + 'T00:00:00') >= startOfWeek).length

  const counts = {}
  workouts.forEach((w) => { counts[w.activity] = (counts[w.activity] || 0) + 1 })
  const mostFrequent = Object.entries(counts).sort(([, a], [, b]) => b - a)[0][0]

  const totalMinutes = workouts.reduce((s, w) => s + w.duration, 0)
  return { streak, thisWeek, mostFrequent, totalMinutes }
}

// ──────────────────────────────────────────────
// Animated section title
// ──────────────────────────────────────────────
function SectionTitle({ children, accent = '#00ff87' }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <h2
        className="section-heading"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '1.4rem',
          letterSpacing: '0.08em',
          color: '#f0f0f0',
        }}
      >
        {children}
      </h2>
      <div
        className="h-px flex-1"
        style={{
          background: `linear-gradient(90deg, ${accent}40, transparent)`,
        }}
      />
    </div>
  )
}

// ──────────────────────────────────────────────
// Main Page
// ──────────────────────────────────────────────
export default function Home() {
  const [workouts, setWorkouts] = useState([])
  const [loadingWorkouts, setLoadingWorkouts] = useState(true)
  const [workoutsError, setWorkoutsError] = useState(false)
  const [mounted, setMounted] = useState(false)

  const stats = computeStats(workouts)

  useEffect(() => { setMounted(true) }, [])

  const fetchWorkouts = useCallback(async () => {
    setLoadingWorkouts(true)
    setWorkoutsError(false)
    try {
      const res = await fetch('/api/workouts')
      if (!res.ok) throw new Error()
      const data = await res.json()
      setWorkouts(data)
    } catch {
      setWorkoutsError(true)
    } finally {
      setLoadingWorkouts(false)
    }
  }, [])

  useEffect(() => { fetchWorkouts() }, [fetchWorkouts])

  const handleWorkoutLogged = useCallback((newWorkout) => {
    setWorkouts((prev) =>
      [newWorkout, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date))
    )
  }, [])

  const totalMinLabel =
    stats.totalMinutes >= 60
      ? `${Math.floor(stats.totalMinutes / 60)}h ${stats.totalMinutes % 60}m`
      : `${stats.totalMinutes}m`

  const statCards = [
    { icon: Flame,    value: stats.streak, suffix: stats.streak === 1 ? ' Day' : ' Days', label: 'Current Streak',       color: '#00ff87', delay: 0 },
    { icon: Calendar, value: stats.thisWeek, suffix: '',                                   label: 'Workouts This Week',   color: '#60efff', delay: 120 },
    { icon: Trophy,   value: null,           display: workouts.length === 0 ? '—' : stats.mostFrequent, label: 'Top Activity', color: '#ffb432', delay: 240 },
    { icon: Clock,    value: null,           display: totalMinLabel,                        label: 'Total Time Logged',   color: '#b464ff', delay: 360 },
  ]

  // ── Floating Particles (generated after mount to avoid hydration mismatch) ──
  const [particles, setParticles] = useState([])
  useEffect(() => {
    setParticles(Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      delay: Math.random() * 15,
      dur: Math.random() * 20 + 15,
      opacity: Math.random() * 0.3 + 0.1,
    })))
  }, [])

  return (
    <div className="min-h-screen relative text-white font-sans overflow-x-hidden" style={{ background: '#0d1117' }}>
      
      {/* ── Vibrant Background ── */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="Premium Gym"
          fill
          priority
          quality={95}
          className="object-cover pointer-events-none"
          style={{ filter: 'brightness(0.6) contrast(1.15) saturate(1.4)' }}
        />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 pointer-events-none gradient-animate" style={{
          background: 'linear-gradient(135deg, rgba(0,255,135,0.12) 0%, rgba(13,17,23,0.7) 30%, rgba(96,239,255,0.08) 60%, rgba(180,100,255,0.08) 100%)'
        }} />
        {/* Soft bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-[30vh] pointer-events-none" style={{
          background: 'linear-gradient(to top, #0d1117, transparent)'
        }} />
        {/* Radial glow effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] pointer-events-none" style={{
          background: 'radial-gradient(circle, rgba(0,255,135,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
      </div>

      {/* ── Floating Particles ── */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              bottom: '-5%',
              background: p.id % 3 === 0 ? '#00ff87' : p.id % 3 === 1 ? '#60efff' : '#b464ff',
              opacity: p.opacity + 0.15,
              animation: `floatUp ${p.dur}s ${p.delay}s linear infinite`,
              boxShadow: `0 0 ${p.size * 4}px ${p.size * 2}px currentColor`,
            }}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* ── Sticky Header ── */}
        <header
          className="relative z-50 sticky top-0 transition-all duration-500"
          style={{
            backdropFilter: 'blur(30px) saturate(180%)',
            WebkitBackdropFilter: 'blur(30px) saturate(180%)',
            background: 'linear-gradient(180deg, rgba(13,17,23,0.85) 0%, rgba(13,17,23,0.7) 100%)',
            borderBottom: '1px solid rgba(0,255,135,0.15)',
            boxShadow: '0 4px 30px rgba(0,255,135,0.08), 0 1px 3px rgba(0,0,0,0.3)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              {/* Logo */}
              <div className={mounted ? 'section-reveal section-reveal-1 hover-scale' : 'hover-scale'}>
                <div className="flex items-center gap-4 mb-1">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 glow-pulse"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,255,135,0.2), rgba(96,239,255,0.15))',
                      border: '1px solid rgba(0,255,135,0.3)',
                      boxShadow: '0 0 30px rgba(0,255,135,0.2)',
                    }}
                  >
                    <span className="text-2xl flame-icon bounce-animation">⚡</span>
                  </div>
                  <h1
                    className="logo-gradient text-glow-animate"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                      letterSpacing: '0.06em',
                      lineHeight: 1,
                    }}
                  >
                    FitCoach AI
                  </h1>
                </div>
                <p className="text-sm font-medium slide-in-left" style={{ color: '#777', paddingLeft: '64px' }}>
                  Your AI-powered personal fitness coach
                </p>
              </div>

              {/* Badges */}
              <div className={`flex items-center gap-3 flex-wrap ${mounted ? 'section-reveal section-reveal-2' : ''}`}>
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold hover-lift ripple-effect"
                  style={{
                    background: 'rgba(0,255,135,0.08)',
                    border: '1px solid rgba(0,255,135,0.2)',
                    color: '#00ff87',
                    cursor: 'pointer',
                  }}
                >
                  <span className="w-2 h-2 rounded-full online-dot breathe-animation" style={{ background: '#00ff87', boxShadow: '0 0 8px #00ff87' }} />
                  Gemini AI
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold hover-lift card-shine"
                  style={{
                    background: 'rgba(96,239,255,0.08)',
                    border: '1px solid rgba(96,239,255,0.2)',
                    color: '#60efff',
                  }}
                >
                  <span className="zoom-in">📊</span>
                  {workouts.length} workout{workouts.length !== 1 ? 's' : ''} logged
                </div>
              </div>
            </div>
          </div>

          {/* Gradient line */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, transparent 5%, rgba(0,255,135,0.3) 30%, rgba(96,239,255,0.3) 70%, transparent 95%)',
          }} />
        </header>

        {/* ── Main ── */}
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14 w-full">

          {/* ── Stats Dashboard ── */}
          <section className={mounted ? 'section-reveal section-reveal-1' : ''}>
            <SectionTitle accent="#00ff87">Stats Dashboard</SectionTitle>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
              {statCards.map((card) => (
                <StatsCard
                  key={card.label}
                  icon={card.icon}
                  value={card.value}
                  display={card.display}
                  suffix={card.suffix}
                  label={card.label}
                  color={card.color}
                  delay={card.delay}
                />
              ))}
            </div>
          </section>

          {/* ── Analytics with Image Section ── */}
          <section className={mounted ? 'section-reveal section-reveal-2' : ''}>
            <SectionTitle accent="#b464ff">Performance Analytics</SectionTitle>
            <div className="relative rounded-3xl overflow-hidden hover-lift card-shine" style={{
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 30px 80px -20px rgba(0,0,0,0.7), 0 0 60px rgba(180,100,255,0.1)',
            }}>
              {/* Background image for analytics section */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/stats-bg.png"
                  alt="Stats Background"
                  fill
                  className="object-cover pointer-events-none"
                  style={{ filter: 'brightness(0.35) saturate(1.6)', opacity: 0.7 }}
                />
                <div className="absolute inset-0 gradient-animate" style={{ 
                  background: 'linear-gradient(135deg, rgba(180,100,255,0.15) 0%, rgba(5,5,5,0.8) 50%, rgba(0,255,135,0.1) 100%)',
                  backgroundSize: '200% 200%'
                }} />
              </div>
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 lg:p-8" style={{
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}>
                <SpotlightCard className="p-6 h-full flex flex-col hover-scale">
                  <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}>
                    Weekly Volume
                  </h3>
                  <p className="text-xs text-gray-400 mb-2">Duration logged over the last 7 days</p>
                  <div className="flex-1 min-h-[220px]">
                    <WeeklyChart workouts={workouts} />
                  </div>
                </SpotlightCard>
                
                <SpotlightCard className="p-6 h-full flex flex-col items-center justify-center hover-scale">
                  <h3 className="text-lg font-bold text-white mb-1 w-full text-left" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}>
                    Consistency Heatmap
                  </h3>
                  <p className="text-xs text-gray-400 mb-4 w-full text-left">Your 28-day activity footprint</p>
                  <ActivityHeatmap workouts={workouts} />
                </SpotlightCard>
              </div>
            </div>
          </section>

          {/* ── Workout Tracker ── */}
          <section className={mounted ? 'section-reveal section-reveal-3' : ''}>
            <SectionTitle accent="#60efff">Workout Tracker</SectionTitle>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WorkoutForm onWorkoutLogged={handleWorkoutLogged} />
              <WorkoutList workouts={workouts} loading={loadingWorkouts} error={workoutsError} />
            </div>
          </section>

          {/* ── AI Motivation ── */}
          <section className={mounted ? 'section-reveal section-reveal-4' : ''}>
            <SectionTitle accent="#ffb432">AI Motivation</SectionTitle>
            <MotivationPanel workouts={workouts} />
          </section>

          {/* ── Achievements ── */}
          <section className={mounted ? 'section-reveal section-reveal-5' : ''}>
            <SectionTitle accent="#b464ff">Achievements</SectionTitle>
            <AchievementBadge workouts={workouts} stats={stats} />
          </section>

          {/* ── Motivation Quotes ── */}
          <section className={mounted ? 'section-reveal section-reveal-6' : ''}>
            <MotivationQuotes />
          </section>

          {/* ── Workout Calendar ── */}
          <section className={mounted ? 'section-reveal section-reveal-7' : ''}>
            <SectionTitle accent="#60efff">Workout Calendar</SectionTitle>
            <WorkoutCalendar workouts={workouts} />
          </section>

          {/* ── Footer ── */}
          <footer className="text-center pt-8 pb-12" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <div style={{ height: 1, width: 60, background: 'linear-gradient(90deg, transparent, rgba(0,255,135,0.2))' }} />
              <span className="text-xs" style={{ color: '#333' }}>✦</span>
              <div style={{ height: 1, width: 60, background: 'linear-gradient(90deg, rgba(0,255,135,0.2), transparent)' }} />
            </div>
            <p className="text-xs" style={{ color: '#333' }}>
              Built with Next.js · Supabase · Google Gemini ·{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #00ff87, #60efff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                FitCoach AI
              </span>{' '}
              © 2026
            </p>
          </footer>
        </main>

        {/* ── Floating Chat Widget ── */}
        <ChatWidget />
      </div>
    </div>
  )
}
