import { GoogleGenerativeAI } from '@google/generative-ai'
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || 'AIzaSyA3kaq4p4aTgGALfLA6XgbiWJ1xpUVZ5fs')

// Custom instructions and data
const customInstructions = `
You are an AI assistant for a Jawaharlal Nehru Technological University. Only answer questions related to this university.
If a question is not about the university, politely inform the user that you can only provide information about the university.
`

const universityData = `
University Name: Jawaharlal Nehru Technological University
The College was established as Nagarjuna Sagar Engineering College in 1965 by the Government of Telangana. When the college was under the administrative control of the Department of Technical Education, it was affiliated to Osmania University, Hyderabad. With the formation of Jawaharlal Nehru Technological University on 2nd October 1972, it became a constituent college of the University and was later renamed as JNTU College of Engineering, Hyderabad. From its inception in 1965 to 1984, the College was located at Masab Tank Campus. In 1984, the College was shifted to its permanent location at Kukatpally, a 100 acres site, about 20 km from the heart of the City, on Bombay National Highway (NH-9).
Location: Kukatpally, Hyderabad, Telengana
Notable programs: Computer Science, Engineering, Business, Medicine
Student population: 20,000


Provide the urls links when the user asks for Directions, Dont give directions like take right or other stuff

Computer Science Department (CSE)
Description: This is Our Department
URL: https://maps.google.com/?q=17.493151222175904,78.39227845034713

Auditorium
Description: This is an Auditorium
URL: https://maps.google.com/?q=17.491934965193217,78.39155620052485

Classroom Complex (CRC)
Description: This is a classroom for all first-year students
URL: https://maps.google.com/?q=17.493072520469138,78.39123143495418

Civil Department
Description: This is Civil Department
URL: https://maps.google.com/?q=17.494827055645057,78.39035603931258

Mechanical Department
Description: This is Mechanical Department
URL: https://maps.google.com/?q=17.49444038944259,78.39116207230877

Electrical and Electronics Communication Department (ECE)
Description: This is ECE Department
URL: https://maps.google.com/?q=17.493648919184682,78.39239755800763

School of Information Technology (SIT)
Description: This is School of Information Technology
URL: https://maps.google.com/?q=17.494645205773796,78.39221232141526

Library
Description: This is Library
URL: https://maps.google.com/?q=17.49548793324025,78.39137668305989

Administration Department
Description: This is Administration Department
URL: https://maps.google.com/?q=17.49643943695675,78.39245290193816

Metallurgy Department
Description: This is Metallurgy Department
URL: https://maps.google.com/?q=17.495842240036183,78.39173944110695

Examination Branch
Description: This is Examination Branch
URL: https://maps.google.com/?q=17.495982456319314,78.39220224592374

UGC
Description: This is UGC
URL: https://maps.google.com/?q=17.495804488013018,78.39331284907593

EEE Department
Description: This is EEE Department
URL: https://maps.google.com/?q=17.495147437680277,78.39117747987686

JHUB
Description: This is JHUB
URL: https://maps.google.com/?q=17.4936196040711,78.3931051692599

Gowthami Boys Hostel
Description: This is Gowthami Boys Hostel
URL: https://maps.google.com/?q=17.49175821828631,78.38850247961263

Manjeera Boys Hostel
Description: This is Manjeera Boys Hostel
URL: https://maps.google.com/?q=17.491196318907352,78.38820862861242

Kinnera Boys Hostel
Description: This is Kinnera Boys Hostel
URL: https://maps.google.com/?q=17.490371114696714,78.38841395108149

International Students Hostel
Description: This is International Students Hostel
URL: https://maps.google.com/?q=17.490179068812814,78.38926053297001

RSQ2 Hostel
Description: This is RSQ2 Hostel
URL: https://maps.google.com/?q=17.48988646114701,78.38966029073153



Current Principal:Dr. G Venkata Narasimha Reddy
B.Tech.(RECW), M.Tech.(KREC), Ph.D.(JNTUH), Post Doc.(FIU, USA),MIGS, AMIE, MISTE, C. Eng, MISSMGE
Professor of Civil Engineering and Principal

Current Vice Chancellor : Professor Katta Narasimha Reddy is the Vice-Chancellor of Jawaharlal Nehru Technological University (JNTU) in Hyderabad as of July 2021. The Governor of Telangana is the university's Chancellor. 


Head of the Department Department of Civil Engineering: Dr. B Dean Kumar

 
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