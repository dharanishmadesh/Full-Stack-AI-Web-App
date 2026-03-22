# ⚡ FitCoach AI - Quick Start Guide

Get your stunning fitness app running in 5 minutes!

## 🚀 Super Quick Setup

### 1. Install Dependencies (1 minute)

Open PowerShell as Administrator and run:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then in your project directory:

```bash
cd fitcoach-ai
npm install
```

### 2. Get Your API Keys (2 minutes)

#### Supabase (1 minute)
1. Go to [supabase.com](https://supabase.com) → Sign up/Login
2. Create new project → Wait 2 minutes for setup
3. Go to Settings → API → Copy `URL` and `anon key`

#### Google Gemini (1 minute)
1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Click "Get API Key" → Create new key
3. Copy the API key

### 3. Configure Environment (30 seconds)

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
GEMINI_API_KEY=your-gemini-key
```

### 4. Create Database Tables (1 minute)

In Supabase Dashboard → SQL Editor, paste and run:

```sql
CREATE TABLE workouts (
  id BIGSERIAL PRIMARY KEY,
  activity TEXT NOT NULL,
  duration INTEGER NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE chat_history (
  id BIGSERIAL PRIMARY KEY,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_workouts_date ON workouts(date DESC);
CREATE INDEX idx_chat_created ON chat_history(created_at DESC);
```

### 5. Run the App (30 seconds)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## ✨ What You'll See

- **Beautiful glassmorphism design** with blur effects
- **Smooth animations** on every interaction
- **Floating particles** in the background
- **AI-powered features** ready to use
- **Responsive design** that works everywhere

## 🎯 First Steps

1. **Log a workout** - Click an activity, enter duration, hit "Log Workout"
2. **Watch your stats** - See the animated numbers update
3. **Get motivated** - Scroll down, choose a coach tone, get AI motivation
4. **Chat with AI** - Click the floating chat button, ask fitness questions

## 🔧 Troubleshooting

### Can't run npm install?
```bash
# Make sure you have Node.js 18+
node --version

# If not, download from nodejs.org
```

### PowerShell script error?
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Supabase connection error?
- Double-check your URL and key in `.env.local`
- Make sure there are no extra spaces
- Verify your Supabase project is active

### Gemini API error?
- Verify your API key is correct
- Check you have quota at [aistudio.google.com](https://aistudio.google.com)
- Make sure the key is on a new line in `.env.local`

## 📱 Test on Your Phone

1. Find your computer's IP:
   ```bash
   ipconfig
   ```

2. On your phone (same WiFi), go to:
   ```
   http://YOUR-IP:3000
   ```

## 🎨 Customize

### Change Colors
Edit `fitcoach-ai/app/globals.css`:
```css
:root {
  --accent-green: #00ff87;  /* Change this! */
  --accent-cyan: #60efff;   /* And this! */
}
```

### Add Activities
Edit `fitcoach-ai/components/WorkoutForm.jsx`:
```javascript
const ACTIVITIES = ['Running', 'Cycling', 'Yoga', 'YourActivity']
```

## 🚀 Deploy to Vercel (Optional)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import
3. Add environment variables
4. Deploy!

## 💡 Pro Tips

- Use Chrome or Edge for best performance
- Enable hardware acceleration in browser settings
- Try different coach tones in the motivation section
- Ask the AI chatbot about nutrition, form, recovery, etc.

## 📚 Learn More

- Full installation guide: `INSTALLATION.md`
- All enhancements: `ENHANCEMENTS.md`
- Main README: `README.md`

---

**That's it! You now have a professional, animated fitness app running! 💪✨**

Need help? Check the troubleshooting section or the full `INSTALLATION.md` guide.
