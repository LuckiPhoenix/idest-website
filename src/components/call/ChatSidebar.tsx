"use client"

import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, X } from 'lucide-react'

interface ChatMessage {
  id: string
  participantName: string
  message: string
  time: string
}

interface ChatSidebarProps {
  isOpen: boolean
  messages: ChatMessage[]
  newMessage: string
  onNewMessageChange: (message: string) => void
  onSendMessage: () => void
  onClose: () => void
}

export default function ChatSidebar({
  isOpen,
  messages,
  newMessage,
  onNewMessageChange,
  onSendMessage,
  onClose
}: ChatSidebarProps) {
  return (
    <div className={`fixed right-0 top-0 h-full w-80 bg-sidebar border-l border-sidebar-border flex flex-col z-40 transform transition-all duration-500 ease-in-out ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      {/* Header */}
      <div className="h-16 bg-sidebar border-b border-sidebar-border flex items-center justify-between px-4">
        <h2 className="text-sidebar-foreground font-semibold">Chat</h2>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onClose}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {messages.map(message => (
          <div key={message.id} className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-sidebar-primary">{message.participantName}</span>
              <span className="text-xs text-muted-foreground">{message.time}</span>
            </div>
            <p className="text-sidebar-foreground text-sm bg-sidebar-accent p-2 rounded">{message.message}</p>
          </div>
        ))}
      </div>
      
      {/* Chat Input */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => onNewMessageChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-muted-foreground"
          />
          <Button onClick={onSendMessage} size="sm" className="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 