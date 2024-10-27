'use client'

import * as React from 'react'
import { useChat } from 'ai/react'
import { Menu, Send, MessageSquare, Settings, HelpCircle } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import AudiowideText from '@/components/ui/AudioWideText'

const prewrittenQuestions = [
  "What are the admission requirements?",
  "How can I apply for scholarships?",
  "What majors are offered?",
  "When is the application deadline?",
]

export default function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit, setInput } = useChat()
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sidebarItems = [
    { icon: MessageSquare, label: 'New Chat' },
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help' },
  ]

  const handleQuestionClick = (question: string) => {
    setInput(question);
    handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
  };
  

  return (
    <div className="flex h-screen flex-col md:flex-row bg-background text-foreground overflow-hidden">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:flex flex-col w-64 p-4 border-r bg-white">
      <AudiowideText text="VERTEX" />

        <nav className="space-y-2">
          {sidebarItems.map((item, index) => (
            <Button key={index} variant="ghost" className="w-full justify-start">
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center px-4 py-2 border-b bg-primary/10">
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
                    <Button key={index} variant="ghost" className="w-full justify-start">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Button>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-lg font-semibold ml-2 md:ml-0">Chat</h1>
        </header>

        <ScrollArea className="flex-1 p-4 overflow-y-auto" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Prewritten questions */}
        <div className="px-4 py-2 border-t bg-muted/50">
          <h2 className="text-sm font-semibold mb-2">Frequently Asked Questions:</h2>
          <div className="flex flex-wrap gap-2">
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

        <form onSubmit={handleSubmit} className="flex items-center p-4 border-t">
          <Input
            className="flex-1 mr-2 bg-background text-foreground"
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