'use client'

import { useEffect, useState } from 'react'

export default function AnimatedGymScene() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-3xl" style={{
      background: 'linear-gradient(135deg, rgba(0,255,135,0.1) 0%, rgba(96,239,255,0.1) 100%)',
      border: '1px solid rgba(0,255,135,0.2)',
    }}>
      {/* Animated Person Lifting */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="relative">
          {/* Person Body */}
          <div className="dumbbell-animation">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              {/* Head */}
              <circle cx="60" cy="25" r="12" fill="#ffb432" />
              
              {/* Body */}
              <rect x="54" y="37" width="12" height="30" rx="6" fill="#ff6464" />
              
              {/* Arms with dumbbells */}
              <g className="muscle-flex">
                {/* Left arm */}
                <line x1="54" y1="45" x2="35" y2="55" stroke="#ffb432" strokeWidth="4" strokeLinecap="round" />
                {/* Left dumbbell */}
                <rect x="28" y="52" width="10" height="6" rx="3" fill="#00ff87" />
                
                {/* Right arm */}
                <line x1="66" y1="45" x2="85" y2="55" stroke="#ffb432" strokeWidth="4" strokeLinecap="round" />
                {/* Right dumbbell */}
                <rect x="82" y="52" width="10" height="6" rx="3" fill="#00ff87" />
              </g>
              
              {/* Legs */}
              <line x1="57" y1="67" x2="50" y2="90" stroke="#60efff" strokeWidth="5" strokeLinecap="round" />
              <line x1="63" y1="67" x2="70" y2="90" stroke="#60efff" strokeWidth="5" strokeLinecap="round" />
              
              {/* Shoes */}
              <ellipse cx="50" cy="92" rx="6" ry="3" fill="#333" />
              <ellipse cx="70" cy="92" rx="6" ry="3" fill="#333" />
            </svg>
          </div>
          
          {/* Energy waves */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="energy-wave" style={{ 
              width: 100, 
              height: 100, 
              color: '#00ff87',
              animationDelay: '0s'
            }} />
            <div className="energy-wave" style={{ 
              width: 100, 
              height: 100, 
              color: '#60efff',
              animationDelay: '0.5s'
            }} />
          </div>
        </div>
      </div>

      {/* Floating Weights */}
      <div className="absolute top-10 left-10 weight-spin">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="15" fill="#ff6464" opacity="0.8" />
          <circle cx="20" cy="20" r="10" fill="#ffb432" />
          <text x="20" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">25</text>
        </svg>
      </div>

      <div className="absolute top-20 right-10 weight-spin" style={{ animationDelay: '1s' }}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="15" fill="#60efff" opacity="0.8" />
          <circle cx="20" cy="20" r="10" fill="#00ff87" />
          <text x="20" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">45</text>
        </svg>
      </div>

      {/* Floating Stats */}
      <div className="absolute top-5 left-1/4 fade-in-up" style={{ animationDelay: '0.5s' }}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-full" style={{
          background: 'rgba(0,255,135,0.15)',
          border: '1px solid rgba(0,255,135,0.3)',
          backdropFilter: 'blur(10px)',
        }}>
          <span className="text-2xl fire-flicker">🔥</span>
          <span className="text-sm font-bold" style={{ color: '#00ff87' }}>+250 Cal</span>
        </div>
      </div>

      <div className="absolute top-5 right-1/4 fade-in-up" style={{ animationDelay: '0.7s' }}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-full" style={{
          background: 'rgba(96,239,255,0.15)',
          border: '1px solid rgba(96,239,255,0.3)',
          backdropFilter: 'blur(10px)',
        }}>
          <span className="text-2xl heartbeat-animation">💪</span>
          <span className="text-sm font-bold" style={{ color: '#60efff' }}>+15 Reps</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-5 left-5 right-5">
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: '#888' }}>Workout Progress</span>
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <div 
              className="progress-bar-animated h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #00ff87, #60efff)',
                '--progress': '75%',
                animationDelay: '1s'
              }}
            />
          </div>
          <span className="text-xs font-bold" style={{ color: '#00ff87' }}>75%</span>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(0,255,135,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,135,0.5) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />
      </div>
    </div>
  )
}
