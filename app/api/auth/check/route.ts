import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = cookies()
  const authCookie = cookieStore.get('auth')

  if (authCookie?.value === 'true') {
    return NextResponse.json({ isLoggedIn: true })
  } else {
    return NextResponse.json({ isLoggedIn: false })
  }
}