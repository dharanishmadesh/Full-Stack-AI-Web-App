'use client'

import { useEffect } from 'react'

export default function ConfettiEffect({ trigger }) {
  useEffect(() => {
    if (!trigger) return

    const colors = ['#00ff87', '#60efff', '#ffb432', '#ff6464', '#b464ff']
    const confettiCount = 50

    const createConfetti = () => {
      const confettiElements = []
      
      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div')
        confetti.className = 'confetti'
        confetti.style.left = Math.random() * 100 + 'vw'
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        confetti.style.animationDelay = Math.random() * 0.5 + 's'
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's'
        
        document.body.appendChild(confetti)
        confettiElements.push(confetti)
      }

      // Clean up after animation
      setTimeout(() => {
        confettiElements.forEach(el => el.remove())
      }, 4000)
    }

    createConfetti()
  }, [trigger])

  return null
}
