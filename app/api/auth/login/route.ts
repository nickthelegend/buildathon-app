import { NextResponse } from 'next/server'
import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = "mongodb+srv://nickthelegend:Nicolas1234%40@cluster0.c0edxav.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

export async function POST(request: Request) {
  const { email, password } = await request.json()

  try {
    await client.connect()
    const db = client.db("vertex")
    const users = db.collection('users')

    const user = await users.findOne({ email, password })
    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 400 })
    }

    const response = NextResponse.json({ success: true, message: 'Login successful' })
    response.cookies.set('auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  } finally {
    await client.close()
  }
}