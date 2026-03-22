'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function WorkoutCalendar({ workouts }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek, year, month }
  }

  const getWorkoutForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0]
    return workouts.filter(w => w.date === dateStr)
  }

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth)
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const previousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1))
  }

  const days = []
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const today = new Date()
  const isToday = (day) => {
    return day === today.getDate() && 
           month === today.getMonth() && 
           year === today.getFullYear()
  }

  return (
    <div className="glass-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={previousMonth}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover-scale"
          style={{
            background: 'rgba(0,255,135,0.1)',
            border: '1px solid rgba(0,255,135,0.2)',
          }}
        >
          <ChevronLeft size={16} style={{ color: '#00ff87' }} />
        </button>

        <h3 className="text-lg font-bold" style={{ color: '#f0f0f0' }}>
          {monthName}
        </h3>

        <button
          onClick={nextMonth}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover-scale"
          style={{
            background: 'rgba(0,255,135,0.1)',
            border: '1px solid rgba(0,255,135,0.2)',
          }}
        >
          <ChevronRight size={16} style={{ color: '#00ff87' }} />
        </button>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs font-semibold" style={{ color: '#666' }}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} />
          }

          const date = new Date(year, month, day)
          const dayWorkouts = getWorkoutForDate(date)
          const hasWorkout = dayWorkouts.length > 0
          const isTodayDate = isToday(day)

          return (
            <div
              key={day}
              className="aspect-square flex flex-col items-center justify-center rounded-lg transition-all duration-200 hover-scale cursor-pointer group relative"
              style={{
                background: hasWorkout 
                  ? 'linear-gradient(135deg, rgba(0,255,135,0.2), rgba(0,255,135,0.1))'
                  : isTodayDate
                  ? 'rgba(96,239,255,0.1)'
                  : 'rgba(255,255,255,0.02)',
                border: isTodayDate 
                  ? '2px solid #60efff'
                  : hasWorkout
                  ? '1px solid rgba(0,255,135,0.3)'
                  : '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <span
                className="text-sm font-semibold"
                style={{
                  color: hasWorkout ? '#00ff87' : isTodayDate ? '#60efff' : '#888',
                }}
              >
                {day}
              </span>

              {hasWorkout && (
                <>
                  <div className="flex gap-0.5 mt-1">
                    {dayWorkouts.slice(0, 3).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-1 rounded-full"
                        style={{ background: '#00ff87' }}
                      />
                    ))}
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div
                      className="px-3 py-2 rounded-lg text-xs whitespace-nowrap"
                      style={{
                        background: 'rgba(0,0,0,0.9)',
                        border: '1px solid rgba(0,255,135,0.3)',
                      }}
                    >
                      {dayWorkouts.length} workout{dayWorkouts.length > 1 ? 's' : ''}
                      <div className="text-xs" style={{ color: '#00ff87' }}>
                        {dayWorkouts.map(w => w.activity).join(', ')}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ background: 'rgba(0,255,135,0.2)', border: '1px solid rgba(0,255,135,0.3)' }} />
          <span style={{ color: '#888' }}>Workout Day</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ background: 'rgba(96,239,255,0.1)', border: '2px solid #60efff' }} />
          <span style={{ color: '#888' }}>Today</span>
        </div>
      </div>
    </div>
  )
}
