import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

function checkEnv() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'your_supabase_project_url') {
    return NextResponse.json(
      { error: 'Supabase URL not configured. Please add NEXT_PUBLIC_SUPABASE_URL to your .env.local file.' },
      { status: 503 }
    )
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === 'your_supabase_anon_key') {
    return NextResponse.json(
      { error: 'Supabase Anon Key not configured. Please add NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.' },
      { status: 503 }
    )
  }
  return null
}

export async function GET() {
  const envError = checkEnv()
  if (envError) return envError

  try {
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: `Database error: ${error.message}. Make sure the "workouts" table exists in Supabase.` },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('GET /api/workouts error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch workouts. Check your Supabase credentials.' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  const envError = checkEnv()
  if (envError) return envError

  try {
    const body = await request.json()
    const { activity, duration, date } = body

    if (!activity || !duration || !date) {
      return NextResponse.json(
        { error: 'Missing required fields: activity, duration, date' },
        { status: 400 }
      )
    }

    if (parseInt(duration) < 1) {
      return NextResponse.json(
        { error: 'Duration must be at least 1 minute' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('workouts')
      .insert([{ activity, duration: parseInt(duration), date }])
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: `Failed to save workout: ${error.message}. Make sure the "workouts" table exists.` },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('POST /api/workouts error:', error)
    return NextResponse.json(
      { error: 'Failed to log workout. Check your Supabase connection.' },
      { status: 500 }
    )
  }
}
