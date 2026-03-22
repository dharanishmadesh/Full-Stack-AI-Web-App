import { GoogleGenerativeAI } from '@google/generative-ai'
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

const SYSTEM_CONTEXT = `You are FitCoach AI, a helpful and knowledgeable fitness assistant. Answer questions about workouts, nutrition, recovery, and exercise science. Be concise, practical, and encouraging. Keep answers under 150 words unless the user asks for detail.`

function checkSupabaseEnv() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'your_supabase_project_url') {
    return false
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === 'your_supabase_anon_key') {
    return false
  }
  return true
}

function checkGeminiEnv() {
  return !(!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key')
}

export async function GET() {
  // If Supabase not configured, return empty array gracefully instead of 500
  if (!checkSupabaseEnv()) {
    return NextResponse.json([])
  }

  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(30)

    if (error) {
      console.error('Supabase chat fetch error:', error)
      // Return empty array so chat still loads
      return NextResponse.json([])
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('GET /api/chat error:', error)
    return NextResponse.json([])
  }
}

export async function POST(request) {
  if (!checkGeminiEnv()) {
    return NextResponse.json(
      { error: '🔑 Gemini API key not set. Add GEMINI_API_KEY to your .env.local file and restart the server. Get a free key at https://aistudio.google.com' },
      { status: 503 }
    )
  }

  try {
    const body = await request.json()
    const { message, history = [] } = body

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const recentHistory = history.slice(-5)
    const historyText = recentHistory
      .map((m) => `${m.role === 'user' ? 'User' : 'FitCoach AI'}: ${m.content}`)
      .join('\n')

    const fullPrompt = `${SYSTEM_CONTEXT}

${historyText ? `Previous conversation:\n${historyText}\n` : ''}User: ${message}
FitCoach AI:`

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' })
    const result = await model.generateContent(fullPrompt)
    const reply = result.response.text().trim()

    // Save to Supabase (non-blocking — don't fail the response if this errors)
    if (checkSupabaseEnv()) {
      try {
        await supabase.from('chat_messages').insert([{ role: 'user', content: message }])
        await supabase.from('chat_messages').insert([{ role: 'assistant', content: reply }])
      } catch (dbErr) {
        console.error('Failed to save chat to Supabase (non-fatal):', dbErr)
      }
    }

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('POST /api/chat error:', error)
    const msg = error?.message || ''
    if (msg.includes('API_KEY') || msg.includes('API key') || msg.includes('invalid')) {
      return NextResponse.json(
        { error: '🔑 Invalid Gemini API key. Check GEMINI_API_KEY in .env.local' },
        { status: 401 }
      )
    }
    if (msg.includes('quota') || msg.includes('rate')) {
      return NextResponse.json(
        { error: '⏳ Gemini API rate limit hit. Please wait a moment and try again.' },
        { status: 429 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to get AI response. Please try again.' },
      { status: 500 }
    )
  }
}
