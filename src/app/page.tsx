"use client"

import { useState } from "react"
import { Heart, Shield, Users, Brain } from "lucide-react"

export default function WelcomePage() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-[#E8F4FD] flex flex-col">
      {/* Header */}
      <header className="p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#4A90E2] to-[#A3D8C6] rounded-full flex items-center justify-center shadow-lg">
            <Heart className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-[#333333] mb-2 font-poppins">SerenitySpace</h1>
        <p className="text-lg text-[#666666] font-lora italic">Your Mental Wellness Companion</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="max-w-md w-full space-y-8">
          {/* Features Preview */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="card text-center p-4">
              <Brain className="w-8 h-8 text-[#4A90E2] mx-auto mb-2" />
              <p className="text-sm font-medium text-[#333333]">AI Companion</p>
            </div>
            <div className="card text-center p-4">
              <Users className="w-8 h-8 text-[#A3D8C6] mx-auto mb-2" />
              <p className="text-sm font-medium text-[#333333]">Community</p>
            </div>
            <div className="card text-center p-4">
              <Heart className="w-8 h-8 text-[#FF6F61] mx-auto mb-2" />
              <p className="text-sm font-medium text-[#333333]">Mood Tracking</p>
            </div>
            <div className="card text-center p-4">
              <Shield className="w-8 h-8 text-[#4A90E2] mx-auto mb-2" />
              <p className="text-sm font-medium text-[#333333]">Crisis Support</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <a href="/auth/login" className="block">
              <button className="btn-primary w-full text-lg">Log In</button>
            </a>

            <a href="/auth/signup" className="block">
              <button className="btn-secondary w-full text-lg">Sign Up</button>
            </a>

            <a href="/dashboard?guest=true" className="block">
              <button className="w-full py-3 px-6 rounded-full border-2 border-[#4A90E2] text-[#4A90E2] font-medium hover:bg-[#4A90E2] hover:text-white transition-all duration-200">
                Continue as Guest
              </button>
            </a>
          </div>

          {/* Privacy Notice */}
          <div className="text-center text-sm text-[#666666] font-lora">
            <p>Your privacy and security are our top priority.</p>
            <p>HIPAA compliant • End-to-end encrypted</p>
          </div>
        </div>
      </main>

      {/* Crisis Support Button - Always Visible */}
      <div className="fixed bottom-6 right-6">
        <a href="/crisis-support">
          <button className="btn-crisis rounded-full w-14 h-14 flex items-center justify-center shadow-2xl animate-pulse-gentle">
            <Shield className="w-6 h-6" />
          </button>
        </a>
      </div>
    </div>
  )
}
