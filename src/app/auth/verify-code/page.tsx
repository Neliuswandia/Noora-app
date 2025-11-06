"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MailCheck, Loader2 } from "lucide-react"


export default function VerifyCodePage() {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    // Simulate verification
    setTimeout(() => {
      setLoading(false)
      setMessage("Code verified! Redirecting...")
      // Redirect to onboarding after verification
      window.location.href = "/onboarding"
    }, 1500)
  }

  const handleResend = () => {
    setMessage("Verification code resent!")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <MailCheck className="w-12 h-12 text-blue-500 mb-2" />
          <h1 className="text-2xl font-bold text-[#333333] font-poppins mb-1">Verify Your Email</h1>
          <p className="text-[#666666] font-lora text-center text-sm">Enter the 6-digit code sent to your email address to complete your sign up.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            maxLength={6}
            pattern="[0-9]{6}"
            required
            value={code}
            onChange={e => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter verification code"
            className="text-center tracking-widest text-lg font-mono"
            autoFocus
          />
          <Button type="submit" className="w-full btn-primary" disabled={loading || code.length !== 6}>
            {loading ? <Loader2 className="animate-spin w-5 h-5 mx-auto" /> : "Verify"}
          </Button>
        </form>
        <div className="flex justify-between items-center mt-4 text-sm">
          <span className="text-[#666666]">Didn't get the code?</span>
          <button type="button" className="text-blue-500 hover:underline font-medium" onClick={handleResend}>
            Resend Code
          </button>
        </div>
        {message && <div className="mt-4 text-center text-green-600 font-medium">{message}</div>}
        <div className="mt-6 text-center">
          <a href="/auth/login" className="text-[#666666] hover:text-blue-500 text-sm">Back to Login</a>
        </div>
      </div>
    </div>
  )
}
