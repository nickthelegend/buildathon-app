import { GoogleGenerativeAI } from '@google/generative-ai'
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || 'AIzaSyAF-0yDJVZVJMVey8e2b6aquNWfDJoBnww')

// Custom instructions and data
const customInstructions = `
You are an AI assistant for a specific university. Only answer questions related to this university.
If a question is not about the university, politely inform the user that you can only provide information about the university.
`

const universityData = `
University Name: Jawaharlal Nehru Technological University
The College was established as Nagarjuna Sagar Engineering College in 1965 by the Government of Telangana. When the college was under the administrative control of the Department of Technical Education, it was affiliated to Osmania University, Hyderabad. With the formation of Jawaharlal Nehru Technological University on 2nd October 1972, it became a constituent college of the University and was later renamed as JNTU College of Engineering, Hyderabad. From its inception in 1965 to 1984, the College was located at Masab Tank Campus. In 1984, the College was shifted to its permanent location at Kukatpally, a 100 acres site, about 20 km from the heart of the City, on Bombay National Highway (NH-9).
Location: Kukatpally, Hyderabad, Telengana
Notable programs: Computer Science, Engineering, Business, Medicine
Student population: 20,000


`

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()
  
  // Prepend custom instructions and data to the conversation
  const fullMessages = [
    { role: 'system', content: customInstructions },
    { role: 'system', content: universityData },
    ...messages
  ]

  const geminiStream = await genAI.getGenerativeModel({ model: "gemini-pro" })
    .generateContentStream({
      contents: fullMessages.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      })),
    })

  const stream = GoogleGenerativeAIStream(geminiStream)
  return new StreamingTextResponse(stream)
}