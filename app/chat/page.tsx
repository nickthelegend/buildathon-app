'use client'

import * as React from 'react'
import { useChat } from 'ai/react'
import { Menu, Send, MessageSquare, Settings, HelpCircle, Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import AudiowideText from '@/components/ui/AudioWideText'

const prewrittenQuestions = [
  "Who is the current Vice Chancellor of Our University?",
  "When was JNTU established?",
  "Where is CSE Department?",
  "Who is the Head of CSE Department",
]

export default function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit, setInput } = useChat()
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  const [isDarkTheme, setIsDarkTheme] = React.useState(false)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('/api/auth/check')
      const data = await response.json()
      if (!data.isLoggedIn) {
        router.push('/')
      } else {
        setIsAuthenticated(true)
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

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sidebarItems = [
    { icon: MessageSquare, label: 'New Chat' },
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help', href: 'https://testingtesla7s-organization.gitbook.io/jntubot' },
  ]

  const handleQuestionClick = (question: string) => {
    setInput(question)
    handleSubmit(new Event('submit') as unknown as React.FormEvent<HTMLFormElement>)
  }

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', isDarkTheme ? 'light' : 'dark')
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  if (!isAuthenticated) {
    return null // This will prevent any flash of content before redirect
  }

  return (
    <div className={`flex h-screen flex-col md:flex-row bg-background text-foreground overflow-hidden ${isDarkTheme ? 'dark' : ''}`}>
      {/* Sidebar for larger screens */}
      <aside className={`hidden md:flex flex-col ${isSidebarOpen ? 'w-64' : 'w-16'} p-4 border-r bg-white dark:bg-gray-800 transition-all duration-300`}>
        <div className="flex justify-between items-center mb-4">
          {isSidebarOpen && <AudiowideText text="VERTEX" />}
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isSidebarOpen ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
          </Button>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item, index) => (
            item.href ? (
              <Link key={index} href={item.href} passHref>
                <Button variant="ghost" className={`w-full justify-start ${isSidebarOpen ? '' : 'px-2'}`}>
                  <item.icon className={`h-4 w-4 ${isSidebarOpen ? 'mr-2' : ''}`} />
                  {isSidebarOpen && item.label}
                </Button>
              </Link>
            ) : (
              <Button key={index} variant="ghost" className={`w-full justify-start ${isSidebarOpen ? '' : 'px-2'}`}>
                <item.icon className={`h-4 w-4 ${isSidebarOpen ? 'mr-2' : ''}`} />
                {isSidebarOpen && item.label}
              </Button>
            )
          ))}
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between px-4 py-2 border-b bg-primary/10 dark:bg-gray-700">
          <div className="flex items-center">
            {/* Menu button for mobile */}
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex flex-col h-full p-4">
                  <AudiowideText text="VERTEX" />
                  <nav className="space-y-2">
                    {sidebarItems.map((item, index) => (
                      item.href ? (
                        <Link key={index} href={item.href} passHref>
                          <Button variant="ghost" className="w-full justify-start">
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.label}
                          </Button>
                        </Link>
                      ) : (
                        <Button key={index} variant="ghost" className="w-full justify-start">
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.label}
                        </Button>
                      )
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-lg font-semibold ml-2 md:ml-0">Chat</h1>
          </div>
          {/* Theme toggle button */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDarkTheme ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </Button>
        </header>

        <ScrollArea className="flex-1 p-4 overflow-y-auto" ref={scrollAreaRef}>
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              {/* Centered "JNTU BOT" text */}
              <AudiowideText text="JNTUH" />
              <div className="px-4 py-2 border-t bg-muted/50 dark:bg-gray-700 rounded-lg">
                <h2 className="text-sm font-semibold mb-2">Frequently Asked Questions:</h2>
                <div className="flex flex-wrap gap-2 justify-center">
                  {prewrittenQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuestionClick(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Display messages when there are messages in the array
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                    message.role === "user"
                      
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-muted dark:bg-gray-700"
                  )}
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <form onSubmit={handleSubmit} className="flex items-center p-4 border-t">
          <Input
            className="flex-1 mr-2 bg-background text-foreground dark:bg-gray-700 dark:text-white"
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit" size="icon" className="bg-primary text-primary-foreground">
            <Send className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </main>
    </div>
  )
}