import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Send, X } from "lucide-react"
import { ICON_STROKE_WIDTH } from "@/lib/constants"

export interface ChatMessage {
  id: string
  content: string
  sender: "me" | "them"
  timestamp: Date
}

export interface ChatWindowProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  recipient: {
    name: string
    avatar?: string
  }
  initialMessages?: ChatMessage[]
  className?: string
}

const defaultMessages: ChatMessage[] = [
  {
    id: "1",
    content: "Hi! Thanks for reaching out. How can I help you today?",
    sender: "them",
    timestamp: new Date(Date.now() - 60000),
  },
]

/**
 * ChatWindow — floating chat panel anchored bottom-right.
 *
 * Use for profile message feature: pass recipient and control visibility
 * with open/onOpenChange.
 */
export function ChatWindow({
  open,
  onOpenChange,
  recipient,
  initialMessages = defaultMessages,
  className,
}: ChatWindowProps) {
  const [messages, setMessages] = React.useState<ChatMessage[]>(initialMessages)
  const [inputValue, setInputValue] = React.useState("")
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const initials = recipient.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const handleSend = () => {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        content: trimmed,
        sender: "me",
        timestamp: new Date(),
      },
    ])
    setInputValue("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  React.useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [open, messages])

  if (!open) return null

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 flex w-[380px] flex-col rounded-lg border bg-card shadow-lg",
        "ring-1 ring-border/50",
        className
      )}
      role="dialog"
      aria-label={`Chat with ${recipient.name}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <Avatar className="size-9 shrink-0">
          <AvatarImage src={recipient.avatar} alt={recipient.name} />
          <AvatarFallback className="text-sm">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-medium">{recipient.name}</p>
          <p className="text-xs text-muted-foreground">Active now</p>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => onOpenChange(false)}
          aria-label="Close chat"
        >
          <X strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="h-[320px] flex-1 px-4">
        <div className="flex flex-col gap-4 py-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex max-w-[85%]",
                msg.sender === "me" ? "ml-auto" : "mr-auto"
              )}
            >
              <div
                className={cn(
                  "rounded-lg px-3 py-2 text-sm",
                  msg.sender === "me"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                )}
              >
                <p className="break-words">{msg.content}</p>
                <p
                  className={cn(
                    "mt-1 text-[10px]",
                    msg.sender === "me"
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  )}
                >
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="flex gap-2 border-t p-3">
        <Input
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-w-0"
          aria-label="Message input"
        />
        <Button
          type="button"
          size="icon"
          onClick={handleSend}
          disabled={!inputValue.trim()}
          aria-label="Send message"
        >
          <Send strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
        </Button>
      </div>
    </div>
  )
}
