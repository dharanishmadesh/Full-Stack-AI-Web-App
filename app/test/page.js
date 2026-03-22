export default function TestPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#0d1117',
      color: '#00ff87',
      fontSize: '2rem',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>✅ FitCoach AI is Working!</h1>
        <p style={{ fontSize: '1rem', color: '#888', marginTop: '1rem' }}>
          Server is running correctly
        </p>
        <a 
          href="/" 
          style={{ 
            color: '#60efff', 
            textDecoration: 'none',
            fontSize: '1rem',
            marginTop: '2rem',
            display: 'inline-block'
          }}
        >
          ← Go to Main App
        </a>
      </div>
    </div>
  )
}
