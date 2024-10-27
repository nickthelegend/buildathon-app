'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sun, Moon } from 'lucide-react'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      const response = await fetch('/api/auth/check')
      const data = await response.json()
      setIsLoggedIn(data.isLoggedIn)
      if (data.isLoggedIn) {
        router.push('/chat')
      }
    }
    checkAuth()

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme')
    setIsDarkTheme(savedTheme === 'dark')
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }, [router])

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>, type: 'login' | 'signup') => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const response = await fetch(`/api/auth/${type}`, {
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (data.success) {
      router.push('/chat')
    } else {
      alert(data.message)
    }
  }

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', isDarkTheme ? 'light' : 'dark')
  }

  if (isLoggedIn) {
    return null // This will prevent any flash of content before redirect
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className="p-4 flex justify-between items-center">
        <span className="text-2xl font-bold">Vertex</span>
        <nav className="flex items-center">
          <Button variant="link" className={isDarkTheme ? 'text-white' : 'text-gray-900'}>Home</Button>
          <Button variant="link" className={isDarkTheme ? 'text-white' : 'text-gray-900'}>About</Button>
          <Button variant="link" className={isDarkTheme ? 'text-white' : 'text-gray-900'}>Contact</Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDarkTheme ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </Button>
        </nav>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Vertex</h1>
            <p className="text-xl mb-8">The next generation AI chatbot for all your needs</p>
          </div>
          <Tabs defaultValue="login" className="w-full max-w-md mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <form onSubmit={(e) => handleAuth(e, 'login')}>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <label htmlFor="email">Email</label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="password">Password</label>
                      <Input id="password" name="password" type="password" required />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Login</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Sign Up</CardTitle>
                  <CardDescription>Create a new account to get started</CardDescription>
                </CardHeader>
                <form onSubmit={(e) => handleAuth(e, 'signup')}>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <label htmlFor="email">Email</label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="password">Password</label>
                      <Input id="password" name="password" type="password" required />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Sign Up</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="p-4 text-center">
        <p>&copy; 2024 Vertex. All rights reserved.</p>
      </footer>
    </div>
  )
}