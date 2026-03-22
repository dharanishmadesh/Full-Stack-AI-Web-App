'use client'

import { useEffect, useState } from 'react'

export default function ProgressRing({ 
  progress = 0, 
  size = 120, 
  strokeWidth = 8, 
  color = '#00ff87',
  label = '',
  showPercentage = true,
  animated = true,
  children
}) {
  const [displayProgress, setDisplayProgress] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (displayProgress / 100) * circumference

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayProgress(progress)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setDisplayProgress(progress)
    }
  }, [progress, animated])

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 8px ${color})`,
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children || (
          <>
            {showPercentage && (
              <div className="text-2xl font-bold" style={{ color }}>
                {Math.round(displayProgress)}%
              </div>
            )}
            {label && (
              <div className="text-xs mt-1" style={{ color: '#888' }}>
                {label}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
