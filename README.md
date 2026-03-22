# FitCoach AI 🏋️⚡

A production-ready AI-powered fitness coaching web app built with Next.js 14, Supabase, and Google Gemini AI.

![Tech Stack](https://img.shields.io/badge/Next.js-14-black?logo=next.js) ![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?logo=supabase) ![Gemini](https://img.shields.io/badge/Google-Gemini%20AI-blue?logo=google)

## Features

- 📊 **Workout Logging** — Log activities with duration and date; real-time stats update instantly
- 📈 **Stats Dashboard** — Streak, weekly workouts, top activity, total minutes — all calculated live
- 🤖 **AI Motivational Nudges** — Personalized coaching messages powered by Gemini with 3 tone options
- 💬 **AI Q&A Chatbot** — Persistent floating chat widget with Supabase-backed message history

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS + Custom CSS |
| Database | Supabase (PostgreSQL) |
| AI/LLM | Google Gemini 1.5 Flash |
| Icons | Lucide React |
| Fonts | DM Sans + Bebas Neue (Google Fonts) |
| Deployment | Vercel |

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd fitcoach-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create Supabase tables

Go to your [Supabase Dashboard](https://supabase.com) → SQL Editor and run:

```sql
-- Workouts table
CREATE TABLE workouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity text NOT NULL,
  duration integer NOT NULL,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Chat messages table
CREATE TABLE chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);
```

### 4. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
GEMINI_API_KEY=your-gemini-api-key-here
```

**Getting API keys:**
- **Supabase**: Go to [supabase.com](https://supabase.com) → Project Settings → API
- **Gemini**: Go to [aistudio.google.com](https://aistudio.google.com) → Get API Key (free, no credit card)

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🚀

## Deployment to Vercel

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel Dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GEMINI_API_KEY`
4. Deploy!

**Live URL:** _Add your Vercel deployment URL here_

## Project Structure

```
fitcoach-ai/
├── app/
│   ├── layout.js               ← Root layout with Google Fonts
│   ├── page.js                 ← Main page (all sections, lifted state)
│   ├── globals.css             ← Dark fitness theme styles
│   └── api/
│       ├── workouts/route.js   ← GET + POST workouts
│       ├── motivate/route.js   ← AI motivational message
│       └── chat/route.js       ← AI chatbot with history
├── components/
│   ├── WorkoutForm.jsx         ← Controlled workout logging form
│   ├── WorkoutList.jsx         ← Sortable workouts table with badges
│   ├── StatsCard.jsx           ← Animated stat cards with glow
│   ├── MotivationPanel.jsx     ← AI motivation with tone selector
│   └── ChatWidget.jsx          ← Floating persistent chat widget
├── lib/
│   └── supabase.js             ← Supabase client
├── .env.local                  ← Secrets (never commit!)
└── README.md
```

## Design Decisions

### Why Google Gemini?
- **Free tier** — No credit card required, generous quota on `gemini-1.5-flash`
- **Quality** — Excellent instruction-following for personalized fitness content
- API key from [AI Studio](https://aistudio.google.com) in seconds

### Why Supabase?
- **Easy PostgreSQL** — Managed database with a great free tier
- **Auto-generated REST API** — Works perfectly with the `@supabase/supabase-js` client
- **Real-time capable** — Future-ready for live workout updates

### Why Next.js App Router?
- **API Routes co-located** — Clean `/app/api/` structure, server-side only for Gemini key
- **Server Components** — Optimized rendering with React 18 features
- **Vercel-native** — Zero-config deployment with edge functions

### Security
- `GEMINI_API_KEY` is **server-side only** — never exposed to the browser
- Supabase anon key is safe for client-side (Row Level Security should be configured for production)

## Customization

### Adding new activities
Edit the `ACTIVITIES` array in `components/WorkoutForm.jsx` and add badge styles in `app/globals.css`.

### Changing AI tone
Add new tone options to the `TONES` array in `components/MotivationPanel.jsx` and update the prompt in `app/api/motivate/route.js`.
