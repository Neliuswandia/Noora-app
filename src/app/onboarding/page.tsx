"use client"

import { useState } from "react"
import { ArrowRight, Heart, Brain, Users, Shield } from "lucide-react"
import { useHistory } from "react-router"

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [preferences, setPreferences] = useState({
    goals: [] as string[],
    concerns: [] as string[],
    experience: "",
    notifications: true,
    aiTone: "supportive",
  })
  const router = useHistory()

  const steps = [
    {
      title: "Welcome to SerenitySpace! 🌟",
      subtitle: "Let's personalize your mental wellness journey",
      component: WelcomeStep,
    },
    {
      title: "What are your wellness goals?",
      subtitle: "Select all that apply to you",
      component: GoalsStep,
    },
    {
      title: "What brings you here today?",
      subtitle: "Help us understand your current concerns",
      component: ConcernsStep,
    },
    {
      title: "Your AI Companion",
      subtitle: "Customize how your AI companion communicates",
      component: AIPreferencesStep,
    },
    {
      title: "You're all set! 🎉",
      subtitle: "Your personalized wellness space is ready",
      component: CompletionStep,
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      localStorage.setItem("onboardingComplete", "true")
      router.push("/dashboard")
    }
  }

  const handleSkip = () => {
    localStorage.setItem("onboardingComplete", "true")
    router.push("/dashboard")
  }

  const CurrentStepComponent: any = steps[currentStep].component

  return (
    <div className="h-screen bg-linear-to-br from-[#F5F7FA] to-[#E8F4FD] flex flex-col">
      {/* Progress Bar */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </span>
          <button onClick={handleSkip} className="text-sm text-gray-500 hover:text-gray-700">
            Skip
          </button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 font-poppins">{steps[currentStep].title}</h1>
          <p className="text-gray-600 font-lora mb-8">{steps[currentStep].subtitle}</p>

          <CurrentStepComponent 
          preferences={preferences} 
          setPreferences={setPreferences} onNext={handleNext} />
        </div>
      </main>
    </div>
  )
}

function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-8">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-300 rounded-full flex items-center justify-center mx-auto shadow-lg">
        <Heart className="w-12 h-12 text-white" />
      </div>

      <div className="space-y-4 text-left">
        <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
          <Brain className="w-6 h-6 text-blue-500" />
          <span className="text-gray-700">AI-powered emotional support</span>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
          <Users className="w-6 h-6 text-green-400" />
          <span className="text-gray-700">Connect with supportive community</span>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
          <Shield className="w-6 h-6 text-red-500" />
          <span className="text-gray-700">HIPAA-compliant and secure</span>
        </div>
      </div>

      <button onClick={onNext} className="btn-primary w-full">
        Get Started
        <ArrowRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  )
}

function GoalsStep({ preferences, setPreferences, onNext }: any) {
  const goals = [
    "Manage anxiety",
    "Overcome depression",
    "Reduce stress",
    "Improve sleep",
    "Build confidence",
    "Better relationships",
    "Work-life balance",
    "Personal growth",
  ]

  const toggleGoal = (goal: string) => {
    setPreferences((prev: any) => ({
      ...prev,
      goals: prev.goals.includes(goal) ? prev.goals.filter((g: string) => g !== goal) : [...prev.goals, goal],
    }))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        {goals.map((goal) => (
          <button
            key={goal}
            onClick={() => toggleGoal(goal)}
            className={`p-4 rounded-lg text-sm font-medium transition-all ${
              preferences.goals.includes(goal)
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-blue-50 shadow-sm"
            }`}
          >
            {goal}
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={preferences.goals.length === 0}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
        <ArrowRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  )
}

function ConcernsStep({ preferences, setPreferences, onNext }: any) {
  const concerns = [
    "Feeling overwhelmed",
    "Panic attacks",
    "Trouble sleeping",
    "Low mood",
    "Social anxiety",
    "Work stress",
    "Relationship issues",
    "Life transitions",
  ]

  const toggleConcern = (concern: string) => {
    setPreferences((prev: any) => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter((c: string) => c !== concern)
        : [...prev.concerns, concern],
    }))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3">
        {concerns.map((concern) => (
          <button
            key={concern}
            onClick={() => toggleConcern(concern)}
            className={`p-4 rounded-lg text-sm font-medium transition-all text-left ${
              preferences.concerns.includes(concern)
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-blue-50 shadow-sm"
            }`}
          >
            {concern}
          </button>
        ))}
      </div>

      <button onClick={onNext} className="btn-primary w-full">
        Continue
        <ArrowRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  )
}

function AIPreferencesStep({ preferences, setPreferences, onNext }: any) {
  const tones = [
    { id: "supportive", label: "Supportive & Encouraging", description: "Warm, empathetic responses" },
    { id: "professional", label: "Professional & Clinical", description: "Evidence-based, structured approach" },
    { id: "friendly", label: "Friendly & Casual", description: "Conversational and approachable" },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {tones.map((tone) => (
          <button
            key={tone.id}
            onClick={() => setPreferences((prev: any) => ({ ...prev, aiTone: tone.id }))}
            className={`w-full p-4 rounded-lg text-left transition-all ${
              preferences.aiTone === tone.id
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-blue-50 shadow-sm"
            }`}
          >
            <div className="font-medium">{tone.label}</div>
            <div className="text-sm opacity-80 mt-1">{tone.description}</div>
          </button>
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={preferences.notifications}
            onChange={(e) => setPreferences((prev: any) => ({ ...prev, notifications: e.target.checked }))}
            className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
          />
          <span className="ml-3 text-sm text-gray-700">Send me helpful reminders and check-ins</span>
        </label>
      </div>

      <button onClick={onNext} className="btn-primary w-full">
        Continue
        <ArrowRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  )
}

function CompletionStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-8">
      <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
        <Heart className="w-12 h-12 text-white" />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 font-poppins">Your wellness space is ready!</h2>
        <p className="text-gray-600 font-lora">
          We've personalized SerenitySpace based on your preferences. Remember, you can always adjust these settings
          later.
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm text-left">
        <h3 className="font-medium text-gray-800 mb-2">What's next?</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Start a conversation with your AI companion</li>
          <li>• Log your first mood entry</li>
          <li>• Explore coping tools and exercises</li>
          <li>• Connect with the community when ready</li>
        </ul>
      </div>

      <button onClick={onNext} className="btn-primary w-full">
        Enter SerenitySpace
        <ArrowRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  )
}
