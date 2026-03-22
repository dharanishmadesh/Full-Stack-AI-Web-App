@echo off
echo ========================================
echo   FitCoach AI - GitHub Deployment
echo ========================================
echo.

echo Step 1: Initializing Git repository...
git init
echo.

echo Step 2: Adding remote repository...
git remote add origin https://github.com/dharanishmadesh/Full-Stack-AI-Web-App.git
echo.

echo Step 3: Staging all files...
git add .
echo.

echo Step 4: Committing changes...
git commit -m "Initial commit: FitCoach AI - Professional Fitness Platform"
echo.

echo Step 5: Pushing to GitHub...
git branch -M main
git push -u origin main --force
echo.

echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Your code is now on GitHub!
echo Repository: https://github.com/dharanishmadesh/Full-Stack-AI-Web-App
echo.
echo Next steps:
echo 1. Visit https://vercel.com
echo 2. Import your GitHub repository
echo 3. Add environment variables
echo 4. Deploy!
echo.
pause
