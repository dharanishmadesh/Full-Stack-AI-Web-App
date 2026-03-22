'use client'

import { useRef, useState } from 'react'

export default function SpotlightCard({ children, className = '', containerClassName = '', tilt = true, ...props }) {
  const divRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()
    
    // Position for spotlight
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setPosition({ x, y })

    // Rotation calculation for 3D tilt (reduced for high-end feel)
    if (tilt) {
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      // Calculate rotation (-3 to 3 degrees max)
      const rotateX = ((y - centerY) / centerY) * -3
      const rotateY = ((x - centerX) / centerX) * 3
      
      setRotation({ x: rotateX, y: rotateY })
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
    setOpacity(1)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setOpacity(0)
    if (tilt) setRotation({ x: 0, y: 0 })
  }

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
    if (tilt) setRotation({ x: 0, y: 0 })
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(15,20,30,0.65)] overflow-hidden transition-all duration-500 hover:border-[rgba(0,255,135,0.4)] shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_40px_rgba(0,255,135,0.15),0_0_20px_rgba(0,255,135,0.08)] ${containerClassName}`}
      data-glass="true"
      style={{
        transform: tilt ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)` : 'none',
        transformStyle: 'preserve-3d',
        ...props.style
      }}
      {...props}
    >
      {/* Spotlight Radial Gradient */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      
      {/* Sweeping Glare Effect */}
      {tilt && (
        <div 
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 mix-blend-overlay"
          style={{
            opacity: opacity * 0.6,
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.3) 0%, transparent 50%)`,
          }}
        />
      )}

      <div className={`relative z-10 w-full h-full ${className}`} style={{ transform: tilt ? 'translateZ(20px)' : 'none' }}>
        {children}
      </div>
    </div>
  )
}
