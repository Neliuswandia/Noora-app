"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Send, Paperclip, Smile, MoreVertical, Camera, File } from "lucide-react"
import { useHistory } from "react-router"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderType: "user" | "therapist"
  content: string
  timestamp: string
  read: boolean
  type: "text" | "image" | "file"
}

export default function TherapistMessage() {
  const params = useParams()
  const router = useHistory()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "therapist-1",
      senderName: "Dr. Sarah Chen",
      senderType: "therapist",
      content: "Hi Alex! How are you feeling after our last session?",
      timestamp: "2024-01-15T10:30:00Z",
      read: true,
      type: "text",
    },
    {
      id: "2",
      senderId: "user-1",
      senderName: "Alex",
      senderType: "user",
      content:
        "Hi Dr. Chen! I've been practicing the breathing exercises you taught me. They're really helping with my anxiety.",
      timestamp: "2024-01-15T10:35:00Z",
      read: true,
      type: "text",
    },
    {
      id: "3",
      senderId: "therapist-1",
      senderName: "Dr. Sarah Chen",
      senderType: "therapist",
      content:
        "That's wonderful to hear! Consistency is key with these techniques. How often have you been practicing them?",
      timestamp: "2024-01-15T10:40:00Z",
      read: true,
      type: "text",
    },
    {
      id: "4",
      senderId: "user-1",
      senderName: "Alex",
      senderType: "user",
      content:
        "I've been doing them twice a day - once in the morning and once before bed. The evening ones especially help me sleep better.",
      timestamp: "2024-01-15T10:45:00Z",
      read: true,
      type: "text",
    },
    {
      id: "5",
      senderId: "therapist-1",
      senderName: "Dr. Sarah Chen",
      senderType: "therapist",
      content:
        "Excellent! That's exactly what I hoped to hear. Keep up the great work. Is there anything specific you'd like to discuss in our next session?",
      timestamp: "2024-01-15T10:50:00Z",
      read: false,
      type: "text",
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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
        senderId: "user-1",
        senderName: "Alex",
        senderType: "user",
        content: message.trim(),
        timestamp: new Date().toISOString(),
        read: false,
        type: "text",
      }

      setMessages([...messages, newMessage])
      setMessage("")

      // Simulate therapist response after a delay
      setTimeout(() => {
        const therapistResponse: Message = {
          id: (Date.now() + 1).toString(),
          senderId: "therapist-1",
          senderName: "Dr. Sarah Chen",
          senderType: "therapist",
          content: "Thank you for sharing that with me. I'll make sure to address this in our next session.",
          timestamp: new Date().toISOString(),
          read: false,
          type: "text",
        }
        setMessages((prev) => [...prev, therapistResponse])
      }, 2000)
    }
  }

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
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

  // Mock therapist data
  const therapist = {
    id: "1",
    name: "Dr. Sarah Chen",
    image: "/placeholder.svg?height=40&width=40",
    status: "online",
  }

  return (
    <div className="h-screen bg-[#F5F7FA] flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex items-center justify-between border-b">
        <div className="flex items-center space-x-3">
          <button onClick={() => router.goBack()} className="p-2 hover:bg-[#F5F7FA] rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-[#333333]" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={therapist.image || "/placeholder.svg"}
                alt={therapist.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h1 className="font-semibold text-[#333333] font-poppins">{therapist.name}</h1>
              <p className="text-sm text-green-500">Online</p>
            </div>
          </div>
        </div>

        <button className="p-2 hover:bg-[#F5F7FA] rounded-full transition-colors">
          <MoreVertical className="w-6 h-6 text-[#666666]" />
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          const showDate = index === 0 || formatDate(messages[index - 1].timestamp) !== formatDate(msg.timestamp)

          return (
            <div key={msg.id}>
              {showDate && (
                <div className="text-center my-4">
                  <span className="bg-white px-3 py-1 rounded-full text-sm text-[#666666] shadow-sm">
                    {formatDate(msg.timestamp)}
                  </span>
                </div>
              )}

              <div className={`flex ${msg.senderType === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] ${msg.senderType === "user" ? "order-2" : "order-1"}`}>
                  {msg.senderType === "therapist" && (
                    <div className="flex items-center space-x-2 mb-1">
                      <img
                        src={therapist.image || "/placeholder.svg"}
                        alt={msg.senderName}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-[#666666] font-poppins">{msg.senderName}</span>
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-2xl ${
                      msg.senderType === "user"
                        ? "bg-[#4A90E2] text-white rounded-br-md"
                        : "bg-white text-[#333333] rounded-bl-md shadow-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed font-lora">{msg.content}</p>
                  </div>

                  <div
                    className={`flex items-center mt-1 space-x-1 ${
                      msg.senderType === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span className="text-xs text-[#666666]">{formatTime(msg.timestamp)}</span>
                    {msg.senderType === "user" && (
                      <div className={`w-2 h-2 rounded-full ${msg.read ? "bg-[#4A90E2]" : "bg-[#666666]"}`}></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t p-4">
        <div className="flex items-end space-x-3">
          <div className="flex space-x-2">
            <button className="p-2 text-[#666666] hover:text-[#4A90E2] transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <button className="p-2 text-[#666666] hover:text-[#4A90E2] transition-colors">
              <Camera className="w-5 h-5" />
            </button>
            <button className="p-2 text-[#666666] hover:text-[#4A90E2] transition-colors">
              <File className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full p-3 pr-12 bg-[#F5F7FA] rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-[#4A90E2] resize-none font-lora"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-[#666666] hover:text-[#4A90E2] transition-colors">
              <Smile className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`p-3 rounded-full transition-colors ${
              message.trim()
                ? "bg-[#4A90E2] text-white hover:bg-[#357ABD]"
                : "bg-[#E0E0E0] text-[#999999] cursor-not-allowed"
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-2 text-center">
          <p className="text-xs text-[#666666] font-lora">
            Messages are encrypted and secure. This is not a crisis support service.
          </p>
        </div>
      </div>
    </div>
  )
}
