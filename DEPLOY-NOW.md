# 🚀 Quick Deployment Guide - FitCoach AI

## ⚠️ Git Not Installed!

Your system doesn't have Git installed. Here are your options:

---

## ✅ EASIEST METHOD: GitHub Desktop

### Step 1: Download GitHub Desktop
- Go to: https://desktop.github.com
- Download and install

### Step 2: Sign In
- Open GitHub Desktop
- Sign in with your GitHub account

### Step 3: Add Your Project
1. Click "File" → "Add Local Repository"
2. Click "Choose..." and select your `fitcoach-ai` folder
3. If it says "not a git repository", click "Create a repository"

### Step 4: Publish to GitHub
1. Click "Publish repository" button (top right)
2. Name: `Full-Stack-AI-Web-App`
3. Uncheck "Keep this code private" (if you want it public)
4. Click "Publish repository"

### Step 5: Done! ✨
Your code is now on GitHub!

---

## 🔧 ALTERNATIVE: Install Git Command Line

### Step 1: Download Git
- Go to: https://git-scm.com/download/win
- Download the installer
- Run it (use all default settings)

### Step 2: Restart Terminal
- Close PowerShell/Command Prompt
- Open it again

### Step 3: Run Deployment Script
Open PowerShell in your project folder and run:
```powershell
cd fitcoach-ai
.\deploy.bat
```

Or manually run these commands:
```powershell
cd fitcoach-ai
git init
git remote add origin https://github.com/dharanishmadesh/Full-Stack-AI-Web-App.git
git add .
git commit -m "Initial commit: FitCoach AI"
git branch -M main
git push -u origin main --force
```

---

## 🌐 After GitHub Upload: Deploy to Vercel

### Step 1: Go to Vercel
Visit: https://vercel.com

### Step 2: Sign Up with GitHub
- Click "Sign Up"
- Choose "Continue with GitHub"
- Authorize Vercel

### Step 3: Import Repository
1. Click "Add New Project"
2. Find: `Full-Stack-AI-Web-App`
3. Click "Import"

### Step 4: Configure
- **Root Directory:** `fitcoach-ai` ⚠️ IMPORTANT!
- Framework: Next.js (auto-detected)

### Step 5: Add Environment Variables
Click "Environment Variables" and add these 3 variables:

```
NEXT_PUBLIC_SUPABASE_URL
Value: https://iqvefcqnvdhqexujdlbd.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxdmVmY3FudmRocWV4dWpkbGJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2NzU5NzcsImV4cCI6MjA1MjI1MTk3N30.sb_publishable_7DXNyVnevgTKrt1DXCuUWQ_rgLcRcWd

GEMINI_API_KEY
Value: AIzaSyCjbAenaeGfvvIWygjM2I5u7HBQnVM4KLo
```

### Step 6: Deploy!
- Click "Deploy"
- Wait 2-3 minutes
- Your app will be live! 🎉

### Step 7: Get Your URL
You'll get a URL like: `https://fitcoach-ai.vercel.app`

---

## 📋 Checklist

- [ ] Install GitHub Desktop OR Git
- [ ] Upload code to GitHub
- [ ] Sign up for Vercel
- [ ] Import repository to Vercel
- [ ] Set root directory to `fitcoach-ai`
- [ ] Add 3 environment variables
- [ ] Click Deploy
- [ ] Test your live site!

---

## 🆘 Need Help?

### If GitHub Desktop doesn't work:
- Make sure you're signed in
- Try "File" → "Clone Repository" instead
- Then manually copy your files

### If Vercel deployment fails:
- Check that root directory is set to `fitcoach-ai`
- Verify all 3 environment variables are added
- Check build logs for errors

### If site doesn't work after deployment:
- Check environment variables are correct
- Look at Vercel deployment logs
- Make sure Supabase database is set up

---

## 🎯 Quick Summary

1. **Install GitHub Desktop** (easiest)
2. **Add your project** to GitHub Desktop
3. **Publish** to GitHub
4. **Go to Vercel.com**
5. **Import** your repository
6. **Set root directory** to `fitcoach-ai`
7. **Add environment variables** (3 variables)
8. **Deploy!**

Your FitCoach AI will be live on the internet! 💪✨

---

## 📱 Your Repository
https://github.com/dharanishmadesh/Full-Stack-AI-Web-App

## 🌐 Vercel
https://vercel.com

## 💻 GitHub Desktop
https://desktop.github.com
