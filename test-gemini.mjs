import { GoogleGenerativeAI } from '@google/generative-ai'

async function testGemini() {
  console.log("Starting Gemini test...")
  const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyCjbAenaeGfvvIWygjM2I5u7HBQnVM4KLo'
  console.log(`Using key starting with: ${apiKey.substring(0, 10)}...`)
  
  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    console.log("Trying gemini-1.5-flash-latest...")
    let model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' })
    let result = await model.generateContent("Say 'hello world' in 2 words.")
    console.log("SUCCESS (gemini-1.5-flash-latest):", result.response.text().trim())
  } catch (e) {
    console.error("ERROR checking gemini-1.5-flash-latest:", e.message)
    
    try {
        console.log("Trying gemini-1.5-flash...")
        const genAI = new GoogleGenerativeAI(apiKey)
        let model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
        let result = await model.generateContent("Say 'hello world' in 2 words.")
        console.log("SUCCESS (gemini-1.5-flash):", result.response.text().trim())
    } catch (e2) {
        console.error("ERROR checking gemini-1.5-flash:", e2.message)
    }
  }
}

testGemini()
