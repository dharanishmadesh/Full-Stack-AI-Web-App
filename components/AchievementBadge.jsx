'use client'

import { useState, useEffect } from 'react'
import { Trophy, Flame, Target, Zap, Award, Star } from 'lucide-react'

const ACHIEVEMENTS = [
  { id: 'first-workout', icon: Star, title: 'First Step', desc: 'Log your first workout', threshold: 1, color: '#00ff87' },
  { id: 'week-warrior', icon: Flame, title: 'Week Warrior', desc: '7 day streak', threshold: 7, color: '#ff6464' },
  { id: 'consistency-king', icon: Target, title: 'Consistency King', desc: '10 workouts logged', threshold: 10, color: '#60efff' },
  { id: 'power-player', icon: Zap, title: 'Power Player', desc: '500 minutes total', threshold: 500, color: '#ffb432' },
  { id: 'champion', icon: Trophy, title: 'Champion', desc: '30 day streak', threshold: 30, color: '#b464ff' },
  { id: 'legend', icon: Award, title: 'Legend', desc: '50 workouts logged', threshold: 50, color: '#00ff87' },
]

export default function AchievementBadge({ workouts, stats }) {
  const [unlockedAchievements, setUnlockedAchievements] = useState([])
  const [showNotification, setShowNotification] = useState(null)

  useEffect(() => {
    const totalWorkouts = workouts.length
    const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0)
    const streak = stats.streak

    const newUnlocked = []

    ACHIEVEMENTS.forEach(achievement => {
      let isUnlocked = false

      if (achievement.id === 'first-workout' && totalWorkouts >= 1) isUnlocked = true
      if (achievement.id === 'week-warrior' && streak >= 7) isUnlocked = true
      if (achievement.id === 'consistency-king' && totalWorkouts >= 10) isUnlocked = true
      if (achievement.id === 'power-player' && totalMinutes >= 500) isUnlocked = true
      if (achievement.id === 'champion' && streak >= 30) isUnlocked = true
      if (achievement.id === 'legend' && totalWorkouts >= 50) isUnlocked = true

      if (isUnlocked && !unlockedAchievements.includes(achievement.id)) {
        newUnlocked.push(achievement)
      }
    })

    if (newUnlocked.length > 0) {
      setUnlockedAchievements(prev => [...prev, ...newUnlocked.map(a => a.id)])
      setShowNotification(newUnlocked[0])
      setTimeout(() => setShowNotification(null), 5000)
    }
  }, [workouts, stats, unlockedAchievements])

  const getProgress = (achievement) => {
    const totalWorkouts = workouts.length
    const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0)
    const streak = stats.streak

    if (achievement.id === 'first-workout') return Math.min((totalWorkouts / 1) * 100, 100)
    if (achievement.id === 'week-warrior') return Math.min((streak / 7) * 100, 100)
    if (achievement.id === 'consistency-king') return Math.min((totalWorkouts / 10) * 100, 100)
    if (achievement.id === 'power-player') return Math.min((totalMinutes / 500) * 100, 100)
    if (achievement.id === 'champion') return Math.min((streak / 30) * 100, 100)
    if (achievement.id === 'legend') return Math.min((totalWorkouts / 50) * 100, 100)

    return 0
  }

  return (
    <>
      {/* Achievement Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {ACHIEVEMENTS.map((achievement) => {
          const Icon = achievement.icon
          const progress = getProgress(achievement)
          const isUnlocked = unlockedAchievements.includes(achievement.id)

          return (
            <div
              key={achievement.id}
              className={`relative group ${isUnlocked ? 'hover-lift' : ''}`}
              style={{
                opacity: isUnlocked ? 1 : 0.5,
                filter: isUnlocked ? 'none' : 'grayscale(100%)',
              }}
            >
              <div
                className="glass-card p-4 text-center transition-all duration-300"
                style={{
                  border: `1px solid ${isUnlocked ? achievement.color + '40' : 'rgba(255,255,255,0.1)'}`,
                  background: isUnlocked ? achievement.color + '10' : 'rgba(255,255,255,0.02)',
                }}
              >
                {/* Progress Ring */}
                <div className="relative w-16 h-16 mx-auto mb-3">
                  <svg className="transform -rotate-90" width="64" height="64">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke={achievement.color}
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                      className="transition-all duration-1000"
                      style={{
                        filter: isUnlocked ? `drop-shadow(0 0 8px ${achievement.color})` : 'none',
                      }}
                    />
                  </svg>
                  <div
                    className={`absolute inset-0 flex items-center justify-center ${isUnlocked ? 'tada-effect' : ''}`}
                    style={{ color: achievement.color }}
                  >
                    <Icon size={24} />
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-xs font-bold mb-1" style={{ color: isUnlocked ? achievement.color : '#666' }}>
                  {achievement.title}
                </h4>
                <p className="text-xs" style={{ color: '#888' }}>
                  {achievement.desc}
                </p>

                {/* Progress Text */}
                {!isUnlocked && (
                  <div className="mt-2 text-xs" style={{ color: '#666' }}>
                    {Math.round(progress)}%
                  </div>
                )}

                {/* Unlock Effect */}
                {isUnlocked && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-2xl"
                      style={{
                        background: `radial-gradient(circle, ${achievement.color}40 0%, transparent 70%)`,
                        animation: 'pulse-grow 2s ease-in-out infinite',
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Achievement Notification */}
      {showNotification && (
        <div
          className="fixed top-20 right-6 z-50 glass-card p-4 flex items-center gap-3 elastic-bounce"
          style={{
            border: `1px solid ${showNotification.color}60`,
            background: `${showNotification.color}20`,
            boxShadow: `0 8px 32px ${showNotification.color}40`,
            minWidth: '280px',
          }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 tada-effect"
            style={{
              background: `${showNotification.color}30`,
              border: `2px solid ${showNotification.color}`,
            }}
          >
            <showNotification.icon size={24} style={{ color: showNotification.color }} />
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: showNotification.color }}>
              Achievement Unlocked!
            </div>
            <div className="text-sm font-bold" style={{ color: '#f0f0f0' }}>
              {showNotification.title}
            </div>
            <div className="text-xs" style={{ color: '#888' }}>
              {showNotification.desc}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
