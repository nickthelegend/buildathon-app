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

    const existingUser = await users.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'User already exists' }, { status: 400 })
    }

    const result = await users.insertOne({ email, password })

    const response = NextResponse.json({ success: true, message: 'User created successfully' })
    response.cookies.set('auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  } finally {
    await client.close()
  }
}