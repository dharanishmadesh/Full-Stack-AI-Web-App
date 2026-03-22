# 🚀 FitCoach AI - Complete Installation & Setup Guide

This guide will walk you through setting up FitCoach AI with all its beautiful animations and professional features.

## 📋 Prerequisites

Before you begin, make sure you have:

- **Node.js 18+** installed ([Download here](https://nodejs.org/))
- **npm** or **yarn** package manager
- A **Supabase account** (free tier works perfectly)
- A **Google Gemini API key** (free, no credit card required)

## 🎯 Step-by-Step Installation

### Step 1: Install Dependencies

First, navigate to the project directory and install all required packages:

```bash
cd fitcoach-ai
npm install
```

This will install:
- Next.js 16
- React 18
- Framer Motion (for smooth animations)
- React Spring (for physics-based animations)
- Supabase client
- Google Gemini AI SDK
- Lucide React icons
- Tailwind CSS

### Step 2: Set Up Supabase Database

1. **Create a Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose a name and password
   - Wait for the project to be created

2. **Create Database Tables:**
   - Go to the SQL Editor in your Supabase dashboard
   - Run this SQL script:

```sql
-- Create workouts table
CREATE TABLE workouts (
  id BIGSERIAL PRIMARY KEY,
  activity TEXT NOT NULL,
  duration INTEGER NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create chat_history table for persistent chat
CREATE TABLE chat_history (
  id BIGSERIAL PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX idx_workouts_date ON workouts(date DESC);
CREATE INDEX idx_workouts_created ON workouts(created_at DESC);
CREATE INDEX idx_chat_created ON chat_history(created_at DESC);

-- Optional: Add Row Level Security (RLS) for production
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (configure properly for production)
CREATE POLICY "Allow all operations on workouts" ON workouts FOR ALL USING (true);
CREATE POLICY "Allow all operations on chat_history" ON chat_history FOR ALL USING (true);
```

3. **Get Your Supabase Credentials:**
   - Go to Project Settings → API
   - Copy your `Project URL` and `anon/public` key

### Step 3: Get Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com)
2. Click "Get API Key"
3. Create a new API key (it's free!)
4. Copy the API key

### Step 4: Configure Environment Variables

1. **Copy the example environment file:**
```bash
cp .env.example .env.local
```

2. **Edit `.env.local` with your credentials:**
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Google Gemini AI
GEMINI_API_KEY=your-gemini-api-key-here
```

⚠️ **Important:** Never commit `.env.local` to version control!

### Step 5: Run the Development Server

```bash
npm run dev
```

The app will start at [http://localhost:3000](http://localhost:3000)

## ✨ Features You'll See

Once running, you'll experience:

### 🎨 Visual Features
- **Glassmorphism cards** with backdrop blur effects
- **Smooth animations** on page load with staggered reveals
- **Floating particles** in the background
- **Gradient animations** that shift colors
- **Hover effects** on all interactive elements
- **Breathing animations** on key UI elements
- **Ripple effects** when clicking buttons
- **Magnetic button effects** with liquid animations

### 🎯 Functional Features
- **Workout tracking** with 7 activity types
- **Real-time statistics** (streak, weekly count, top activity)
- **AI motivation** with 3 different coach personalities
- **Persistent chat** with AI fitness coach
- **Performance analytics** with charts and heatmaps
- **Responsive design** that works on all devices

## 🎨 Animation Libraries

The app uses two powerful animation libraries:

### Framer Motion
- Page transitions
- Staggered animations
- Gesture-based interactions

### React Spring
- Physics-based animations
- Smooth number counting
- Natural motion effects

## 🔧 Troubleshooting

### Issue: "npm install" fails

**Solution:** Make sure you're using Node.js 18 or higher:
```bash
node --version
```

If you need to update Node.js, download the latest version from [nodejs.org](https://nodejs.org/)

### Issue: PowerShell execution policy error

**Solution:** Run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Issue: Supabase connection error

**Solution:** 
1. Check that your `.env.local` file has the correct credentials
2. Verify your Supabase project is active
3. Make sure the tables were created successfully

### Issue: Gemini API error

**Solution:**
1. Verify your API key is correct in `.env.local`
2. Check your API quota at [Google AI Studio](https://aistudio.google.com)
3. Make sure the key has no extra spaces or quotes

### Issue: Animations not working

**Solution:**
1. Clear your browser cache
2. Make sure all dependencies installed correctly:
```bash
npm install framer-motion react-spring @react-spring/web
```
3. Restart the development server

## 📱 Testing on Mobile

To test on your mobile device:

1. Find your computer's local IP address:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`

2. Make sure your phone is on the same WiFi network

3. Access the app at: `http://YOUR-IP-ADDRESS:3000`

## 🚀 Building for Production

When you're ready to deploy:

```bash
npm run build
npm start
```

This creates an optimized production build.

## 🌐 Deploying to Vercel

1. Push your code to GitHub (make sure `.env.local` is in `.gitignore`)

2. Go to [vercel.com](https://vercel.com) and import your repository

3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GEMINI_API_KEY`

4. Deploy!

## 🎯 Next Steps

Now that your app is running:

1. **Log your first workout** - Try different activity types
2. **Check your stats** - Watch the numbers animate
3. **Get AI motivation** - Try different coach tones
4. **Chat with the AI** - Ask fitness questions
5. **Customize the design** - Edit colors in `globals.css`

## 💡 Tips for Best Experience

- Use Chrome or Edge for best animation performance
- Enable hardware acceleration in your browser
- Use a high-refresh-rate monitor for smoothest animations
- Try the app in dark mode for the intended experience

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Google Gemini AI Documentation](https://ai.google.dev/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [React Spring Documentation](https://www.react-spring.dev/)

## 🤝 Need Help?

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the error messages in the browser console
3. Check the terminal for server-side errors
4. Verify all environment variables are set correctly

---

**Enjoy building with FitCoach AI! 💪✨**
