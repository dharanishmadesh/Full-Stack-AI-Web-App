'use client'

import { Brain, Zap, TrendingUp, Shield, Sparkles, Target } from 'lucide-react'

const FEATURES = [
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description: 'Get personalized recommendations based on your workout history',
    color: '#00ff87',
    gradient: 'linear-gradient(135deg, rgba(0,255,135,0.2), rgba(0,255,135,0.05))',
  },
  {
    icon: Zap,
    title: 'Real-Time Tracking',
    description: 'Log workouts instantly and see your progress update live',
    color: '#ffb432',
    gradient: 'linear-gradient(135deg, rgba(255,180,50,0.2), rgba(255,180,50,0.05))',
  },
  {
    icon: TrendingUp,
    title: 'Progress Analytics',
    description: 'Visualize your fitness journey with beautiful charts and graphs',
    color: '#60efff',
    gradient: 'linear-gradient(135deg, rgba(96,239,255,0.2), rgba(96,239,255,0.05))',
  },
  {
    icon: Shield,
    title: 'Data Privacy',
    description: 'Your workout data is secure and encrypted',
    color: '#b464ff',
    gradient: 'linear-gradient(135deg, rgba(180,100,255,0.2), rgba(180,100,255,0.05))',
  },
  {
    icon: Sparkles,
    title: 'Gamification',
    description: 'Unlock achievements and stay motivated with rewards',
    color: '#ff6464',
    gradient: 'linear-gradient(135deg, rgba(255,100,100,0.2), rgba(255,100,100,0.05))',
  },
  {
    icon: Target,
    title: 'Goal Setting',
    description: 'Set and track your fitness goals with precision',
    color: '#00ff87',
    gradient: 'linear-gradient(135deg, rgba(0,255,135,0.2), rgba(0,255,135,0.05))',
  },
]

export default function FeaturesShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {FEATURES.map((feature, index) => {
        const Icon = feature.icon

        return (
          <div
            key={feature.title}
            className="glass-card p-6 hover-lift card-shine group"
            style={{
              border: `1px solid ${feature.color}20`,
              background: feature.gradient,
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {/* Icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
              style={{
                background: `${feature.color}20`,
                border: `1px solid ${feature.color}40`,
                boxShadow: `0 0 20px ${feature.color}20`,
              }}
            >
              <Icon size={28} style={{ color: feature.color }} />
            </div>

            {/* Title */}
            <h3
              className="text-lg font-bold mb-2"
              style={{ color: feature.color }}
            >
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-sm leading-relaxed" style={{ color: '#888' }}>
              {feature.description}
            </p>

            {/* Hover Effect Line */}
            <div
              className="h-1 mt-4 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
              style={{
                background: `linear-gradient(90deg, ${feature.color}, transparent)`,
                width: '0%',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.width = '100%')}
            />
          </div>
        )
      })}
    </div>
  )
}
