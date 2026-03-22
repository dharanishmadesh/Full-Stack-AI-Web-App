# 🏋️ FitCoach AI - Your AI-Powered Personal Fitness Coach

<div align="center">

![FitCoach AI](https://img.shields.io/badge/FitCoach-AI-00ff87?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)
![Gemini AI](https://img.shields.io/badge/Google-Gemini%20AI-4285F4?style=for-the-badge&logo=google)

**A stunning, professional fitness tracking platform with 40+ animations, AI-powered insights, and gamification**

[Live Demo](#) • [Features](#features) • [Installation](#installation) • [Documentation](#documentation)

</div>

---

## ✨ Features

### 🎯 Core Features
- **🏋️ Workout Tracking** - Log activities with duration and date
- **📊 Stats Dashboard** - Real-time streak, weekly count, top activity, total time
- **📈 Performance Analytics** - Beautiful charts and heatmaps
- **🤖 AI Motivation** - Personalized coaching messages from Google Gemini
- **💬 AI Chat Widget** - Ask fitness questions and get expert advice
- **🏆 Achievement System** - Unlock 6 badges as you progress
- **📅 Interactive Calendar** - Visual monthly workout history
- **💬 Motivation Quotes** - Rotating inspirational fitness quotes

### 🎨 Visual Features
- **40+ Professional Animations** - Smooth, engaging interactions
- **Glassmorphism Design** - Modern blur effects and transparency
- **Animated Illustrations** - Gym-themed hero section
- **Progress Rings** - Beautiful circular indicators
- **Confetti Celebrations** - Reward user actions
- **Unique Icon Animations** - Each stat card has its own effect
- **3D Hover Effects** - Cards lift and transform
- **Gradient Backgrounds** - Shifting colors and patterns

### 🎮 Gamification
- ⭐ **First Step** - Log your first workout
- 🔥 **Week Warrior** - Maintain a 7-day streak
- 🎯 **Consistency King** - Log 10 workouts
- ⚡ **Power Player** - Complete 500 minutes total
- 🏆 **Champion** - Achieve a 30-day streak
- 👑 **Legend** - Log 50 workouts

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Frontend:** React 18
- **Styling:** Tailwind CSS + Custom CSS
- **Animations:** Framer Motion + React Spring
- **Database:** Supabase (PostgreSQL)
- **AI:** Google Gemini 1.5 Flash
- **Icons:** Lucide React
- **Fonts:** Bebas Neue + DM Sans

## 📸 Screenshots

### Hero Section
![Hero Section](./screenshots/hero.png)

### Stats Dashboard
![Stats Dashboard](./screenshots/stats.png)

### Achievements
![Achievements](./screenshots/achievements.png)

### Calendar
![Calendar](./screenshots/calendar.png)

## 🎬 Demo

### Live Features
- ✨ Smooth page load with staggered animations
- 🎊 Confetti burst when logging workouts
- 🏆 Achievement unlock notifications
- 💬 Real-time AI chat responses
- 📊 Interactive charts and graphs
- 📅 Clickable calendar with tooltips

## 🛠️ Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free)
- Google Gemini API key (free)

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/dharanishmadesh/Full-Stack-AI-Web-App.git
cd Full-Stack-AI-Web-App/fitcoach-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
GEMINI_API_KEY=your-gemini-api-key
```

4. **Set up Supabase database**

Run this SQL in your Supabase SQL Editor:
```sql
-- Workouts table
CREATE TABLE workouts (
  id BIGSERIAL PRIMARY KEY,
  activity TEXT NOT NULL,
  duration INTEGER NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat history table
CREATE TABLE chat_history (
  id BIGSERIAL PRIMARY KEY,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_workouts_date ON workouts(date DESC);
CREATE INDEX idx_chat_created ON chat_history(created_at DESC);
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Documentation

- [Quick Start Guide](./QUICKSTART.md)
- [Installation Guide](./INSTALLATION.md)
- [Animation Guide](./ANIMATION-GUIDE.md)
- [Professional Features](./PROFESSIONAL-FEATURES.md)
- [Deployment Guide](./DEPLOYMENT-GUIDE.md)

## 🎨 Customization

### Change Colors
Edit `app/globals.css`:
```css
:root {
  --accent-green: #00ff87;
  --accent-cyan: #60efff;
  --accent-gold: #ffb432;
  --accent-purple: #b464ff;
}
```

### Add Activities
Edit `components/WorkoutForm.jsx`:
```javascript
const ACTIVITIES = ['Running', 'Cycling', 'Yoga', 'Swimming', 'Gym', 'HIIT', 'Walking', 'Boxing']
```

### Modify Animations
See [ANIMATION-GUIDE.md](./ANIMATION-GUIDE.md) for all available animations.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for detailed instructions.

## 🎯 Roadmap

- [ ] Social sharing features
- [ ] Workout plans and programs
- [ ] Nutrition tracking
- [ ] Progress photos
- [ ] Community features
- [ ] Workout reminders
- [ ] Custom goal setting
- [ ] Data export
- [ ] Dark/light theme toggle
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Dharanish Madesh**
- GitHub: [@dharanishmadesh](https://github.com/dharanishmadesh)
- Repository: [Full-Stack-AI-Web-App](https://github.com/dharanishmadesh/Full-Stack-AI-Web-App)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [Google Gemini](https://ai.google.dev/) - AI-powered insights
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

## 📊 Project Stats

- **Components:** 15+
- **Animations:** 40+
- **Lines of Code:** 5000+
- **Documentation:** 10+ guides
- **Features:** 20+

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

<div align="center">

**Built with ❤️ using Next.js, Supabase, and Google Gemini AI**

[⬆ Back to Top](#-fitcoach-ai---your-ai-powered-personal-fitness-coach)

</div>
