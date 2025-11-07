"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Heart, Mail, CheckCircle } from "lucide-react"


export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate sending reset email
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsEmailSent(true)
    setIsLoading(false)
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#F5F7FA] to-[#E8F4FD] flex flex-col items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-4 font-poppins">Check Your Email</h1>
          <p className="text-gray-600 font-lora mb-8">
            We've sent password reset instructions to <strong>{email}</strong>
          </p>

          <div className="space-y-4">
            <a href="/auth/login">
              <button className="btn-primary w-full">Back to Sign In</button>
            </a>
            <button onClick={() => setIsEmailSent(false)} className="w-full text-gray-500 hover:text-gray-700">
              Didn't receive the email? Try again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F5F7FA] to-[#E8F4FD] flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="flex items-center">
          <a href="/auth/login">
            <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
          </a>
          <div className="flex items-center ml-4">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-green-300 rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="ml-2 text-xl font-bold text-gray-800 font-poppins">SerenitySpace</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 font-poppins">Forgot Password?</h1>
            <p className="text-gray-600 font-lora">
              No worries! Enter your email and we'll send you reset instructions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className=" w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Send Reset Instructions"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <a href="/auth/login" className="text-gray-600 hover:text-gray-800">
              ← Back to Sign In
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
