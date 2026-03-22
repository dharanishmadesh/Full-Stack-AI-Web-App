import './globals.css'

export const metadata = {
  title: 'FitCoach AI — Your AI-Powered Fitness Coach',
  description: 'Track workouts, get AI-powered motivation, and chat with your personal fitness coach powered by Google Gemini.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
        {children}
      </body>
    </html>
  )
}
