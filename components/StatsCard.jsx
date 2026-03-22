'use client'

import { useEffect, useState } from 'react'
import SpotlightCard from './SpotlightCard'
import { useRef } from 'react'

// Count-up hook
function useCountUp(target, duration = 1200, delay = 0) {
  const [count, setCount] = useState(0)
  const [isCounting, setIsCounting] = useState(false)

  useEffect(() => {
    let startTime
    const end = parseInt(target) || 0
    if (end === 0) { setCount(0); setIsCounting(false); return } // Handle target 0 case

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        setIsCounting(true)
        window.requestAnimationFrame(step)
      } else {
        setIsCounting(false)
      }
    }
    const timeout = setTimeout(() => {
      window.requestAnimationFrame(step)
    }, delay)
    return () => clearTimeout(timeout)
  }, [target, duration, delay])

  return { count, isCounting }
}

export default function StatsCard({ icon: Icon, value, display, suffix = '', label, color = '#00ff87', delay = 0 }) {
  const [visible, setVisible] = useState(false)
  const { count: animatedValue, isCounting } = useCountUp(value, 1500, delay)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  // Color-derived variables
  const rgba = (a) => {
    const map = {
      '#00ff87': `rgba(0,255,135,${a})`,
      '#60efff': `rgba(96,239,255,${a})`,
      '#ffb432': `rgba(255,180,50,${a})`,
      '#b464ff': `rgba(180,100,255,${a})`,
    }
    return map[color] || `rgba(0,255,135,${a})`
  }

  const displayValue = display !== undefined
    ? display
    : (typeof value === 'number' ? animatedValue + suffix : value)

  return (
    <SpotlightCard
      className="stat-card-animate glass-card p-5 flex flex-col gap-4 transition-all duration-300 hover-lift card-shine"
      style={{
        animationDelay: `${delay}ms`,
        border: `1px solid ${rgba(0.22)}`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 20px ${rgba(0.08)}`,
        cursor: 'default',
      }}
    >
      <div className="card-glare" />

      {/* Icon + label row */}
      <div className="flex items-start justify-between">
        {/* Icon with pulse ring */}
        <div
          className="pulse-ring w-12 h-12 rounded-2xl flex items-center justify-center breathe-animation"
          style={{
            background: rgba(0.18),
            color,
            border: `1px solid ${rgba(0.25)}`,
            boxShadow: `0 0 16px ${rgba(0.15)}`,
          }}
        >
          <Icon size={22} />
        </div>

        {/* Trend indicator dot */}
        <div
          className="w-2 h-2 rounded-full mt-1 breathe-animation"
          style={{
            background: color,
            boxShadow: `0 0 8px ${color}`,
            animation: 'blink 3s ease-in-out infinite',
          }}
        />
      </div>

      {/* Number */}
      <div>
        <div
          className={`text-4xl md:text-5xl font-bold tracking-tight transition-all duration-300 ${visible ? 'number-glow-once' : ''}`}
          style={{
            color: color,
            fontFamily: "'Bebas Neue', sans-serif",
            filter: isCounting ? 'blur(4px)' : 'blur(0)',
            transform: isCounting ? 'scale(1.1) translateY(-5px)' : 'scale(1) translateY(0)',
          }}
        >
          {displayValue}
        </div>
        <div
          className="text-sm mt-1.5 font-medium"
          style={{ color: '#777', lineHeight: 1.3 }}
        >
          {label}
        </div>
      </div>

      {/* Colored bottom bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          opacity: 0.4,
        }}
      />
    </SpotlightCard>
  )
}
