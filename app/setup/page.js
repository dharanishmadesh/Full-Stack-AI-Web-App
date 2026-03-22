'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, ExternalLink, Copy, Check } from 'lucide-react'

export default function SetupPage() {
  const [checks, setChecks] = useState({ supabase: null, gemini: null })
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState('')

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      // Check workouts API (tests Supabase)
      let supOk = false
      try {
        const r = await fetch('/api/workouts')
        const d = await r.json()
        supOk = r.ok || (Array.isArray(d))
        if (!r.ok && d?.error?.toLowerCase().includes('not configured')) supOk = false
        else if (r.ok) supOk = true
      } catch { supOk = false }

      // Check motivate API (tests Gemini; send empty workouts)
      let gemOk = false
      try {
        const r = await fetch('/api/motivate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ workouts: [], tone: 'Friendly Buddy 😊' }),
        })
        const d = await r.json()
        if (d?.message) gemOk = true
        else if (d?.error?.toLowerCase().includes('not configured') || d?.error?.toLowerCase().includes('not set')) gemOk = false
        else if (r.status === 503) gemOk = false
        else gemOk = r.ok
      } catch { gemOk = false }

      setChecks({ supabase: supOk, gemini: gemOk })
      setLoading(false)
    }
    run()
  }, [])

  const copySQL = () => {
    navigator.clipboard.writeText(`-- Run this in your Supabase SQL Editor
CREATE TABLE workouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity text NOT NULL,
  duration integer NOT NULL,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);`)
    setCopied('sql')
    setTimeout(() => setCopied(''), 2000)
  }

  const allGood = checks.supabase && checks.gemini

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a', fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-2xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="text-5xl mb-3">⚡</div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: '#00ff87', letterSpacing: '0.05em' }}>
            FitCoach AI Setup
          </h1>
          <p style={{ color: '#666', marginTop: 8 }}>Configure your API keys to get the app fully working</p>
        </div>

        {/* Status cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { key: 'supabase', label: 'Supabase DB', icon: '🗄️' },
            { key: 'gemini', label: 'Gemini AI', icon: '🤖' },
          ].map(({ key, label, icon }) => (
            <div key={key} className="rounded-2xl p-5 flex items-center gap-3"
              style={{
                background: loading ? 'rgba(255,255,255,0.03)' : checks[key] ? 'rgba(0,255,135,0.07)' : 'rgba(255,80,80,0.07)',
                border: `1px solid ${loading ? 'rgba(255,255,255,0.07)' : checks[key] ? 'rgba(0,255,135,0.25)' : 'rgba(255,80,80,0.25)'}`,
              }}>
              <span className="text-2xl">{icon}</span>
              <div>
                <div style={{ color: '#f0f0f0', fontWeight: 600, fontSize: '0.9rem' }}>{label}</div>
                <div style={{ fontSize: '0.75rem', color: loading ? '#555' : checks[key] ? '#00ff87' : '#ff6464', marginTop: 2 }}>
                  {loading ? 'Checking...' : checks[key] ? '✓ Connected' : '✗ Not configured'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {allGood ? (
          <div className="rounded-2xl p-6 text-center mb-6"
            style={{ background: 'rgba(0,255,135,0.08)', border: '1px solid rgba(0,255,135,0.3)' }}>
            <CheckCircle size={36} style={{ color: '#00ff87', margin: '0 auto 12px' }} />
            <p style={{ color: '#00ff87', fontWeight: 700, fontSize: '1.1rem' }}>Everything is connected! 🎉</p>
            <p style={{ color: '#888', marginTop: 8, fontSize: '0.85rem' }}>Your app is fully working.</p>
            <a href="/" className="inline-block mt-4 px-6 py-2.5 rounded-xl font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #00ff87, #00cc6a)', color: '#0a0a0a' }}>
              Go to App →
            </a>
          </div>
        ) : (
          <>
            {/* Step 1 - Supabase */}
            <div className="rounded-2xl p-6 mb-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-2 mb-4">
                {checks.supabase
                  ? <CheckCircle size={18} style={{ color: '#00ff87' }} />
                  : <XCircle size={18} style={{ color: '#ff6464' }} />}
                <h2 style={{ color: '#f0f0f0', fontWeight: 700 }}>Step 1 — Set up Supabase</h2>
              </div>
              <ol style={{ color: '#888', fontSize: '0.875rem', lineHeight: 2, paddingLeft: 20 }}>
                <li>Go to <a href="https://supabase.com" target="_blank" style={{ color: '#60efff' }}>supabase.com</a> and create a free account</li>
                <li>Create a new project</li>
                <li>Go to <strong style={{ color: '#f0f0f0' }}>SQL Editor</strong> and run the SQL below</li>
                <li>Go to <strong style={{ color: '#f0f0f0' }}>Project Settings → API</strong> and copy your URL and anon key</li>
                <li>
                  Edit{' '}
                  <code style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: 4, color: '#60efff' }}>
                    fitcoach-ai/.env.local
                  </code>{' '}
                  and replace the placeholder values
                </li>
              </ol>

              <div className="mt-4 relative rounded-xl overflow-hidden" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: '#555', fontSize: '0.75rem' }}>SQL — Supabase SQL Editor</span>
                  <button onClick={copySQL} className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg transition-all"
                    style={{ background: 'rgba(0,255,135,0.1)', color: copied === 'sql' ? '#00ff87' : '#888', border: '1px solid rgba(0,255,135,0.2)' }}>
                    {copied === 'sql' ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy SQL</>}
                  </button>
                </div>
                <pre style={{ color: '#aaa', fontSize: '0.75rem', padding: '16px', overflowX: 'auto', lineHeight: 1.8, margin: 0 }}>{`CREATE TABLE workouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity text NOT NULL,
  duration integer NOT NULL,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);`}</pre>
              </div>

              <div className="mt-4 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: 8 }}>Add these to your <code style={{ color: '#60efff' }}>.env.local</code>:</p>
                <pre style={{ color: '#00ff87', fontSize: '0.8rem', lineHeight: 1.8, margin: 0 }}>{`NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...`}</pre>
              </div>
            </div>

            {/* Step 2 - Gemini */}
            <div className="rounded-2xl p-6 mb-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-2 mb-4">
                {checks.gemini
                  ? <CheckCircle size={18} style={{ color: '#00ff87' }} />
                  : <XCircle size={18} style={{ color: '#ff6464' }} />}
                <h2 style={{ color: '#f0f0f0', fontWeight: 700 }}>Step 2 — Get a Gemini API Key (free)</h2>
              </div>
              <ol style={{ color: '#888', fontSize: '0.875rem', lineHeight: 2, paddingLeft: 20 }}>
                <li>Go to <a href="https://aistudio.google.com" target="_blank" style={{ color: '#60efff' }}>aistudio.google.com</a></li>
                <li>Sign in with your Google account</li>
                <li>Click <strong style={{ color: '#f0f0f0' }}>"Get API Key"</strong> → <strong style={{ color: '#f0f0f0' }}>"Create API key"</strong></li>
                <li>Copy the key and add it to your <code style={{ color: '#60efff' }}>.env.local</code>:</li>
              </ol>
              <div className="mt-3 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <pre style={{ color: '#00ff87', fontSize: '0.8rem', margin: 0 }}>{`GEMINI_API_KEY=AIza...`}</pre>
              </div>
              <a href="https://aistudio.google.com/apikey" target="_blank"
                className="inline-flex items-center gap-2 mt-4 text-sm"
                style={{ color: '#60efff' }}>
                <ExternalLink size={14} /> Open Google AI Studio →
              </a>
            </div>

            {/* Step 3 - Restart */}
            <div className="rounded-2xl p-5 mb-6" style={{ background: 'rgba(255,180,50,0.06)', border: '1px solid rgba(255,180,50,0.2)' }}>
              <h2 style={{ color: '#ffb432', fontWeight: 700, marginBottom: 8 }}>⚡ Step 3 — Restart the dev server</h2>
              <p style={{ color: '#888', fontSize: '0.875rem', lineHeight: 1.7 }}>
                After editing <code style={{ color: '#60efff' }}>.env.local</code>, stop the server (Ctrl+C) and run:
              </p>
              <pre className="mt-3 rounded-xl p-4" style={{ background: '#111', color: '#00ff87', fontSize: '0.8rem', border: '1px solid rgba(255,255,255,0.06)' }}>{`npm run dev`}</pre>
              <p style={{ color: '#666', fontSize: '0.8rem', marginTop: 8 }}>
                Then refresh this page and click "Check Again" below.
              </p>
            </div>

            <button
              onClick={() => { setLoading(true); setChecks({ supabase: null, gemini: null }); window.location.reload() }}
              className="w-full py-3.5 rounded-xl font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #00ff87, #00cc6a)', color: '#0a0a0a' }}>
              🔄 Check Again (after restarting server)
            </button>
          </>
        )}

        <div className="text-center mt-8">
          <a href="/" style={{ color: '#444', fontSize: '0.8rem' }}>← Back to app</a>
        </div>
      </div>
    </div>
  )
}
