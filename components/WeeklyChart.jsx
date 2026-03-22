'use client'

import { useEffect, useState } from 'react'

export default function WeeklyChart({ workouts = [] }) {
  const [data, setData] = useState([])
  const [maxVal, setMaxVal] = useState(1)

  useEffect(() => {
    // Process workouts for the last 7 days
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (6 - i))
      return {
        dateStr: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        duration: 0
      }
    })

    workouts.forEach(w => {
      const entry = last7Days.find(d => d.dateStr === w.date)
      if (entry) entry.duration += w.duration
    })

    const max = Math.max(...last7Days.map(d => d.duration), 60) // At least scale to 60mins
    setMaxVal(max)
    setData(last7Days)
  }, [workouts])

  return (
    <div className="w-full h-48 mt-4 flex items-end justify-between gap-2 relative">
      {/* Y-Axis lines (Subtle) */}
      <div className="absolute inset-0 flex flex-col justify-between hidden sm:flex pointer-events-none opacity-20 z-0">
        <div className="border-t border-[rgba(255,255,255,0.2)] w-full"></div>
        <div className="border-t border-[rgba(255,255,255,0.2)] w-full"></div>
        <div className="border-t border-[rgba(255,255,255,0.2)] w-full"></div>
        <div className="border-t border-[rgba(255,255,255,0.2)] w-full"></div>
      </div>

      {data.map((day, i) => {
        const heightPct = (day.duration / maxVal) * 100
        const hasData = day.duration > 0
        
        return (
          <div key={day.dateStr} className="flex-1 flex flex-col items-center justify-end h-full z-10 group relative">
            
            {/* Tooltip */}
            <div className="absolute -top-8 bg-[#2a2a2a] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg border border-[rgba(255,255,255,0.1)]">
              {day.duration} min
            </div>

            {/* Bar */}
            <div className="w-full max-w-[40px] relative flex items-end justify-center h-[calc(100%-24px)]">
              <div 
                className={`w-full max-w-[24px] rounded-t-md transition-all duration-1000 ease-out ${hasData ? 'bg-gradient-to-t from-[rgba(0,255,135,0.2)] to-[#00ff87] group-hover:shadow-[0_0_15px_rgba(0,255,135,0.6)]' : 'bg-[rgba(255,255,255,0.05)]'}`}
                style={{ height: `${Math.max(heightPct, 4)}%`, animationDelay: `${i * 100}ms` }}
              />
            </div>
            
            {/* Label */}
            <span className="text-[10px] sm:text-xs text-[var(--foreground)] mt-2 font-medium opacity-60">
              {day.dayName}
            </span>
          </div>
        )
      })}
    </div>
  )
}
