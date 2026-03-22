'use client'

import { useEffect, useState } from 'react'

export default function ActivityHeatmap({ workouts = [] }) {
  const [grid, setGrid] = useState([])

  useEffect(() => {
    // Generate last 28 days (4 weeks x 7 days)
    const days = []
    const today = new Date()
    
    for (let i = 27; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      
      // Calculate total duration for this day
      const dailyWorkouts = workouts.filter(w => w.date === dateStr)
      const totalMins = dailyWorkouts.reduce((sum, w) => sum + w.duration, 0)
      
      days.push({
        date: dateStr,
        mins: totalMins
      })
    }
    
    setGrid(days)
  }, [workouts])

  // Color matching github style but using our neon green palette
  const getColor = (mins) => {
    if (mins === 0) return 'bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.05)]'
    if (mins < 30) return 'bg-[#004d28] border-[#006635]'
    if (mins < 60) return 'bg-[#009951] border-[#00b35f]'
    return 'bg-[#00ff87] border-[#33ff9f] shadow-[0_0_10px_rgba(0,255,135,0.5)]'
  }

  return (
    <div className="w-full mt-4 flex flex-col items-center">
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {grid.map((day, i) => (
          <div 
            key={i} 
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm border transition-all duration-300 hover:scale-125 cursor-default relative group ${getColor(day.mins)}`}
          >
             {/* Tooltip */}
             <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#1a1a1a] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-[rgba(255,255,255,0.1)] shadow-xl">
              {day.mins === 0 ? 'No activity' : `${day.mins} mins`} <br/>
              <span className="text-[8px] text-gray-400">{new Date(day.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 text-[10px] text-gray-500 w-full justify-end px-2">
        <span>Less</span>
        <div className="w-2 h-2 rounded-sm bg-[rgba(255,255,255,0.05)]"></div>
        <div className="w-2 h-2 rounded-sm bg-[#004d28]"></div>
        <div className="w-2 h-2 rounded-sm bg-[#009951]"></div>
        <div className="w-2 h-2 rounded-sm bg-[#00ff87]"></div>
        <span>More</span>
      </div>
    </div>
  )
}
