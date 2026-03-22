async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyCjbAenaeGfvvIWygjM2I5u7HBQnVM4KLo'
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
  
  try {
    const response = await fetch(url)
    const data = await response.json()
    console.log("Status:", response.status)
    if (data.models) {
        console.log("Available Models:")
        data.models.forEach(m => console.log(` - ${m.name} (version: ${m.version})`))
    } else {
        console.dir(data, { गहराई: null })
    }
  } catch (e) {
    console.error("Fetch failed:", e)
  }
}
listModels()
