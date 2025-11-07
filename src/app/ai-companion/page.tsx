"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Mic, MicOff, Volume2, VolumeX, AlertTriangle } from "lucide-react"
import BottomNavigation from "@/components/BottomNavigation"


interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
  needsEscalation?: boolean
}

export default function AICompanion() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm here to listen and support you. How are you feeling today? You can type or use voice to share what's on your mind.",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = (userMessage: string): { text: string; needsEscalation: boolean } => {
    const lowerMessage = userMessage.toLowerCase()

    // Crisis detection keywords
    const crisisKeywords = ["suicide", "kill myself", "end it all", "hurt myself", "self-harm", "die", "hopeless"]
    const needsEscalation = crisisKeywords.some((keyword) => lowerMessage.includes(keyword))

    if (needsEscalation) {
      return {
        text: "I'm really concerned about what you're sharing with me. Your safety is the most important thing right now. Please know that you're not alone, and there are people who want to help. Would you like me to connect you with crisis support resources right away?",
        needsEscalation: true,
      }
    }

    // Empathetic responses based on content
    if (lowerMessage.includes("anxious") || lowerMessage.includes("anxiety")) {
      return {
        text: "I hear that you're feeling anxious, and I want you to know that's completely valid. Anxiety can feel overwhelming, but you're taking a positive step by reaching out. Would you like to try a quick breathing exercise together, or would you prefer to talk about what's making you feel this way?",
        needsEscalation: false,
      }
    }

    if (lowerMessage.includes("depressed") || lowerMessage.includes("sad") || lowerMessage.includes("low")) {
      return {
        text: "I'm so sorry you're feeling this way. Depression can make everything feel heavy and difficult, but please remember that these feelings, while very real, are temporary. You've been brave to share this with me. What has helped you feel even a little bit better in the past?",
        needsEscalation: false,
      }
    }

    if (lowerMessage.includes("stressed") || lowerMessage.includes("overwhelmed")) {
      return {
        text: "It sounds like you're carrying a lot right now, and feeling stressed is a natural response to that. Let's take this one step at a time. Would it help to talk through what's feeling most overwhelming, or would you prefer to try some stress-relief techniques first?",
        needsEscalation: false,
      }
    }

    if (lowerMessage.includes("lonely") || lowerMessage.includes("alone")) {
      return {
        text: "Feeling lonely can be really painful, and I'm glad you reached out to me. Even though I'm an AI, I want you to know that your feelings matter and you deserve connection and support. Have you considered joining our community forum where you can connect with others who understand what you're going through?",
        needsEscalation: false,
      }
    }

    // Default supportive response
    return {
      text: "Thank you for sharing that with me. I'm here to listen without judgment and support you however I can. Your feelings are valid, and it takes courage to open up. What would feel most helpful for you right now - talking more about this, exploring some coping strategies, or something else?",
      needsEscalation: false,
    }
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: "ai",
        timestamp: new Date(),
        needsEscalation: aiResponse.needsEscalation,
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording)
    // In a real app, this would start/stop voice recording
  }

  const handleSpeakToggle = () => {
    setIsSpeaking(!isSpeaking)
    // In a real app, this would start/stop text-to-speech
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-linear-to-br from-[#4A90E2] to-[#A3D8C6] rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-semibold">AI</span>
            </div>
            <div>
              <h1 className="font-semibold text-[#333333] font-poppins">AI Companion</h1>
              <p className="text-sm text-[#666666]">Always here to listen</p>
            </div>
          </div>
          <button
            onClick={handleSpeakToggle}
            className={`p-2 rounded-full ${isSpeaking ? "bg-[#4A90E2] text-white" : "bg-[#F5F7FA] text-[#666666]"}`}
          >
            {isSpeaking ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                message.sender === "user" ? "bg-[#4A90E2] text-white" : "bg-white shadow-sm"
              }`}
            >
              <p className={`text-sm leading-relaxed ${message.sender === "user" ? "font-poppins" : "font-lora"}`}>
                {message.text}
              </p>
              {message.needsEscalation && (
                <div className="mt-3 p-3 bg-[#FF6F61] bg-opacity-10 rounded-lg border border-[#FF6F61] border-opacity-30">
                  <div className="flex items-center text-[#FF6F61] mb-2">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    <span className="text-sm font-semibold">Crisis Support Available</span>
                  </div>
                  <div className="space-y-2">
                    <a href="/crisis-support">
                      <button className="btn-crisis text-sm py-2 px-4 w-full">Get Immediate Help</button>
                    </a>
                    <a href="/find-therapist">
                      <button className="btn-secondary text-sm py-2 px-4 w-full">Find a Therapist</button>
                    </a>
                  </div>
                </div>
              )}
              <p className="text-xs opacity-70 mt-2">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white shadow-sm p-4 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#4A90E2] rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-[#4A90E2] rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-[#4A90E2] rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleVoiceToggle}
            className={`p-3 rounded-full ${
              isRecording ? "bg-[#FF6F61] text-white animate-pulse" : "bg-[#F5F7FA] text-[#666666] hover:bg-[#E8F4FD]"
            }`}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message or use voice..."
              className="w-full p-3 pr-12 rounded-full border text-gray-600 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-[#4A90E2] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3A7BC8] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-xs text-[#666666] text-center mt-2 font-lora">
          Your conversations are private and secure. Crisis support available 24/7.
        </p>
      </div>

      <BottomNavigation currentPage="chat" />
    </div>
  )
}
