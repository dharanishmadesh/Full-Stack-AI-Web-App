import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

function computeStats(workouts) {
  if (!workouts || workouts.length === 0) {
    return { streak: 0, total: 0, mostFrequentActivity: 'None', lastDate: 'N/A', gapDays: null, workoutsThisWeek: 0 }
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const sorted = [...workouts].sort((a, b) => new Date(b.date) - new Date(a.date))
  const dateSet = new Set(workouts.map((w) => w.date))

  let streak = 0
  let checkDate = new Date(today)
  const todayStr = today.toISOString().split('T')[0]
  if (!dateSet.has(todayStr)) checkDate.setDate(checkDate.getDate() - 1)
  while (true) {
    const ds = checkDate.toISOString().split('T')[0]
    if (dateSet.has(ds)) { streak++; checkDate.setDate(checkDate.getDate() - 1) }
    else break
  }

  const activityCount = {}
  workouts.forEach((w) => { activityCount[w.activity] = (activityCount[w.activity] || 0) + 1 })
  const mostFrequentActivity = Object.entries(activityCount).sort(([, a], [, b]) => b - a)[0][0]

  const lastDate = sorted[0].date
  const gapDays = Math.floor((today - new Date(lastDate + 'T00:00:00')) / 86400000)

  const dow = today.getDay()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - (dow === 0 ? 6 : dow - 1))
  startOfWeek.setHours(0, 0, 0, 0)
  const workoutsThisWeek = workouts.filter((w) => new Date(w.date + 'T00:00:00') >= startOfWeek).length

  return { streak, total: workouts.length, mostFrequentActivity, lastDate, gapDays, workoutsThisWeek }
}

export async function POST(request) {
  // Check Gemini key
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key') {
    return NextResponse.json(
      { error: 'Gemini API key not configured. Please add GEMINI_API_KEY to your .env.local file. Get a free key at https://aistudio.google.com' },
      { status: 503 }
    )
  }

  try {
    const body = await request.json()
    const { workouts = [], tone = 'Friendly Buddy 😊' } = body

    const { streak, total, mostFrequentActivity, lastDate, gapDays, workoutsThisWeek } = computeStats(workouts)

    const prompt = `You are a fitness coach with a "${tone}" personality.

Here is the user's actual workout data:
- Current streak: ${streak} days
- Total workouts logged: ${total}
- Most frequent activity: ${mostFrequentActivity}
- Last workout: ${lastDate === 'N/A' ? 'No workouts logged yet' : lastDate}
- Days since last workout: ${gapDays === null ? 'N/A' : gapDays}
- Workouts this week: ${workoutsThisWeek}

Write a short (2–4 sentences) personalized motivational message that:
1. References at least 2 specific data points from above
2. Suggests a next action based on their patterns
3. Matches the ${tone} personality

If tone is "Tough Coach 💪": be intense, direct, no fluff. Use bold challenge language.
If tone is "Friendly Buddy 😊": be warm, encouraging, emoji-friendly.
If tone is "Data Nerd 📊": reference numbers specifically, analytical tone with metrics.

Do NOT write generic messages. Every sentence must reference their real data.
${total === 0 ? 'The user has no workouts logged yet. Encourage them to start their first workout.' : ''}`

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' })
    const result = await model.generateContent(prompt)
    const message = result.response.text()

    return NextResponse.json({ message })
  } catch (error) {
    console.error('POST /api/motivate error:', error)
    const msg = error?.message || ''
    if (msg.includes('API_KEY') || msg.includes('API key')) {
      return NextResponse.json(
        { error: 'Invalid Gemini API key. Please check your GEMINI_API_KEY in .env.local' },
        { status: 401 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to generate motivation. Please try again.' },
      { status: 500 }
    )
  }
}
