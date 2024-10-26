'use client'

import * as React from 'react'
import { useChat } from 'ai/react'
import { Send } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Component() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="flex items-center px-4 py-2 border-b bg-primary/10">
        {/* <SmartToy className="w-6 h-6 mr-2 text-primary" /> */}
        <h1 className="text-lg font-semibold">Gemini Chat AI</h1>
      </header>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
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
    </div>
  )
}