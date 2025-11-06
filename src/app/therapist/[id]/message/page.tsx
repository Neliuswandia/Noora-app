"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Send, Paperclip, Camera, FileText, MoreVertical } from "lucide-react"
import { useHistory } from "react-router"

interface Message {
  id: string
  content: string
  sender: "user" | "therapist"
  timestamp: Date
  read?: boolean
}

export default function TherapistMessagePage() {
  const router = useHistory()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi Dr. Smith! I wanted to follow up on our session yesterday. I've been practicing the breathing exercises you recommended.",
      sender: "user",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: true,
    },
    {
      id: "2",
      content:
        "That's wonderful to hear! How are you finding the breathing exercises? Are they helping with your anxiety levels?",
      sender: "therapist",
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000), // 1.5 hours ago
      read: true,
    },
    {
      id: "3",
      content:
        "Yes, they're really helping! I used them during a stressful meeting today and felt much calmer. I also wanted to ask about the journaling technique we discussed.",
      sender: "user",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      read: true,
    },
    {
      id: "4",
      content:
        "I'm so glad to hear that! For journaling, try to write for just 5-10 minutes each morning. Focus on three things: how you're feeling, what you're grateful for, and one intention for the day. Don't worry about perfect grammar or structure.",
      sender: "therapist",
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      read: true,
    },
    {
      id: "5",
      content: "That sounds manageable. Should I bring my journal entries to our next session?",
      sender: "user",
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: true,
    },
    {
      id: "6",
      content:
        "Only if you feel comfortable sharing them. The journal is primarily for your own reflection, but if there are specific entries or patterns you'd like to discuss, we can certainly do that.",
      sender: "therapist",
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      read: true,
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: message.trim(),
        sender: "user",
        timestamp: new Date(),
        read: false,
      }
      setMessages((prev) => [...prev, newMessage])
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {}

    messages.forEach((message) => {
      const dateKey = message.timestamp.toDateString()
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(message)
    })

    return groups
  }

  const messageGroups = groupMessagesByDate(messages)

  return (
    <div className="flex flex-col h-screen bg-[#F5F7FA]">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex items-center space-x-4">
        <button onClick={() => router.goBack()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-[#666666]" />
        </button>

        <div className="flex items-center space-x-3 flex-1">
          <div className="relative">
            <img src="/placeholder-user.jpg" alt="Dr. Sarah Smith" className="w-10 h-10 rounded-full object-cover" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h1 className="font-semibold text-[#333333] font-poppins">Dr. Sarah Smith</h1>
            <p className="text-sm text-green-500">Online</p>
          </div>
        </div>

        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreVertical className="w-5 h-5 text-[#666666]" />
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(messageGroups).map(([dateKey, dayMessages]) => (
          <div key={dateKey}>
            {/* Date Separator */}
            <div className="flex items-center justify-center my-4">
              <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                {formatDate(new Date(dateKey))}
              </div>
            </div>

            {/* Messages for this date */}
            {dayMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-4`}>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-[#4A90E2] text-white rounded-br-md"
                      : "bg-white text-[#333333] rounded-bl-md shadow-sm"
                  }`}
                >
                  <p className="text-sm font-lora leading-relaxed">{msg.content}</p>
                  <div className={`flex items-center justify-end mt-2 space-x-1`}>
                    <span className={`text-xs ${msg.sender === "user" ? "text-blue-100" : "text-[#666666]"}`}>
                      {formatTime(msg.timestamp)}
                    </span>
                    {msg.sender === "user" && (
                      <div className={`w-2 h-2 rounded-full ${msg.read ? "bg-blue-200" : "bg-blue-300"}`}></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-end space-x-3">
          {/* Attachment Options */}
          <div className="flex space-x-2">
            <button className="p-2 text-[#666666] hover:bg-gray-100 rounded-full transition-colors">
              <Camera className="w-5 h-5" />
            </button>
            <button className="p-2 text-[#666666] hover:bg-gray-100 rounded-full transition-colors">
              <FileText className="w-5 h-5" />
            </button>
            <button className="p-2 text-[#666666] hover:bg-gray-100 rounded-full transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
          </div>

          {/* Message Input */}
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full p-3 pr-12 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent resize-none max-h-32 font-lora"
              rows={1}
              style={{ minHeight: "44px" }}
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`p-3 rounded-full transition-all duration-200 ${
              message.trim()
                ? "bg-[#4A90E2] text-white hover:bg-[#357ABD] shadow-md"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Security Notice */}
        <div className="mt-3 text-center">
          <p className="text-xs text-[#666666] font-lora">
            🔒 Messages are encrypted • For crisis support, call emergency services
          </p>
        </div>
      </div>
    </div>
  )
}
