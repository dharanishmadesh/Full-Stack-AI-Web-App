'use client'

import { useState, useEffect } from 'react'
import { Quote } from 'lucide-react'

const QUOTES = [
  { text: "The only bad workout is the one that didn't happen.", author: "Unknown" },
  { text: "Your body can stand almost anything. It's your mind you have to convince.", author: "Unknown" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "The difference between try and triumph is a little umph.", author: "Unknown" },
  { text: "Don't wish for it, work for it.", author: "Unknown" },
  { text: "Sweat is fat crying.", author: "Unknown" },
  { text: "The pain you feel today will be the strength you feel tomorrow.", author: "Unknown" },
  { text: "Push yourself because no one else is going to do it for you.", author: "Unknown" },
]

export default function MotivationQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % QUOTES.length)
        setIsVisible(true)
      }, 500)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const quote = QUOTES[currentQuote]

  return (
    <div className="relative overflow-hidden rounded-3xl p-8 md:p-12" style={{
      background: 'linear-gradient(135deg, rgba(0,255,135,0.05) 0%, rgba(96,239,255,0.05) 100%)',
      border: '1px solid rgba(0,255,135,0.15)',
    }}>
      {/* Decorative Quote Icon */}
      <div className="absolute top-4 left-4 opacity-10">
        <Quote size={80} style={{ color: '#00ff87' }} />
      </div>

      {/* Quote Content */}
      <div
        className={`relative z-10 text-center transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <p className="text-xl md:text-2xl font-medium mb-4 leading-relaxed" style={{ color: '#f0f0f0' }}>
          "{quote.text}"
        </p>
        <p className="text-sm" style={{ color: '#00ff87' }}>
          — {quote.author}
        </p>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {QUOTES.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsVisible(false)
              setTimeout(() => {
                setCurrentQuote(index)
                setIsVisible(true)
              }, 300)
            }}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: index === currentQuote ? '#00ff87' : 'rgba(255,255,255,0.2)',
              transform: index === currentQuote ? 'scale(1.5)' : 'scale(1)',
            }}
          />
        ))}
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #00ff87 0%, transparent 70%)',
            animation: 'float 6s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #60efff 0%, transparent 70%)',
            animation: 'float 8s ease-in-out infinite',
            animationDelay: '1s',
          }}
        />
      </div>
    </div>
  )
}
