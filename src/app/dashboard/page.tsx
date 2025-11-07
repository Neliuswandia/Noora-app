"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import {
  MessageCircle,
  Heart,
  Calendar,
  Users,
  BookOpen,
  TrendingUp,
  Shield,
  Mic,
  Gamepad2,
  Target,
  CheckCircle,
  Moon,
} from "lucide-react"

import BottomNavigation from "@/components/BottomNavigation"

const dailyQuotes = [
  "You are stronger than you think and more resilient than you know.",
  "Every small step forward is progress worth celebrating.",
  "Your mental health matters, and so do you.",
  "Healing isn't linear, and that's perfectly okay.",
  "You have survived 100% of your difficult days so far.",
]

export default function Dashboard() {
  const searchParams = useSearchParams()
  const isGuest = searchParams?.get("guest") === "true"
  const [currentMood, setCurrentMood] = useState<string | null>(null)
  const [dailyQuote, setDailyQuote] = useState("")
  const [moodReason, setMoodReason] = useState("")
  const [moodIntensity, setMoodIntensity] = useState<number>(3)

  useEffect(() => {
    // Set daily quote
    const today = new Date().getDate()
    setDailyQuote(dailyQuotes[today % dailyQuotes.length])
  }, [])

  const moodOptions = [
    { emoji: "😊", label: "Great", value: "great", color: "bg-blue-500"  },
    { emoji: "🙂", label: "Good", value: "good", color: "bg-green-400" },
    { emoji: "😐", label: "Okay", value: "okay", color: "bg-yellow-500" },
    { emoji: "😔", label: "Low", value: "low", color: "bg-orange-500" },
    { emoji: "😢", label: "Struggling", value: "struggling", color: "bg-red-500" },
  ]

  // Sample goals data for dashboard preview
  const todayGoals = [
    { id: "1", title: "Daily Meditation", completed: false, progress: 7, target: 10, unit: "minutes" },
    { id: "2", title: "Gratitude Journal", completed: true, progress: 3, target: 3, unit: "entries" },
    { id: "3", title: "Deep Breathing", completed: false, progress: 2, target: 5, unit: "minutes" },
  ]

  const handleMoodSelect = (mood: string) => {
    setCurrentMood(mood)
    setMoodReason("") // Clear reason when selecting a new mood
    setMoodIntensity(3) // Reset intensity to middle value
    // In a real app, this would save to the backend
  }

  const handleSaveMood = () => {
    if (currentMood) {
      // In a real app, this would save to the backend
      alert(`Mood "${currentMood}" (Intensity: ${moodIntensity}/5) saved successfully! Reason: ${moodReason}`)
      // Clear the selected mood, reason, intensity, and hide the save button
      setCurrentMood(null)
      setMoodReason("")
      setMoodIntensity(3)
    }
  }

  const getIntensityColor = (intensity: number) => {
    if (intensity <= 2) return "bg-red-500"
    if (intensity === 3) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getIntensityLabel = (intensity: number) => {
    switch (intensity) {
      case 1:
        return "Very Low"
      case 2:
        return "Low"
      case 3:
        return "Moderate"
      case 4:
        return "High"
      case 5:
        return "Very High"
      default:
        return "Moderate"
    }
  }

  return (
    <div className="overflow-auto h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 font-poppins truncate">Welcome back! 👋</h1>
          </div>
          <a href="/crisis-support">
            <button className="btn-crisis p-2 sm:p-3 rounded-full flex-shrink-0">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </a>
        </div>
      </header>

      <main className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Daily Quote */}
        <div className="card bg-linear-to-r from-blue-500 to-green-400 text-white">
          <h3 className="font-semibold mb-2 font-poppins text-sm sm:text-base ">Daily Inspiration</h3>
          <p className="font-lora italic text-sm leading-relaxed">{dailyQuote}</p>
        </div>

        {/* Today's Goals */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold font-poppins flex items-center text-black">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500" />
              Today's Goals
            </h3>
            <a href="/goals" className="text-sm text-blue-500 hover:underline">
              View All
            </a>
          </div>
          <div className="space-y-3">
            {todayGoals.map((goal) => (
              <div key={goal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 flex-1">
                  <button
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      goal.completed ? "bg-green-500 border-green-500" : "border-gray-300"
                    }`}
                  >
                    {goal.completed && <CheckCircle className="w-3 h-3 text-white" />}
                  </button>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${goal.completed ? "line-through text-gray-500" : "text-gray-800"}`}
                    >
                      {goal.title}
                    </p>
                    <p className="text-xs text-gray-600">
                      {goal.progress}/{goal.target} {goal.unit}
                    </p>
                  </div>
                </div>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${goal.completed ? "bg-green-500" : "bg-blue-500"}`}
                    style={{ width: `${Math.min((goal.progress / goal.target) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mood Check-in */}
        <div className="card">
          <h3 className="text-base sm:text-lg font-semibold mb-4 font-poppins flex items-center text-black">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-500" />
            How are you feeling?
          </h3>
          <div className="grid grid-cols-5 gap-1 sm:gap-2">
            {moodOptions.map((mood) => (
              <button
                key={mood.value}
                onClick={() => handleMoodSelect(mood.value)}
                className={`p-2 sm:p-3 rounded-xl text-center transition-all duration-200 ${
                  currentMood === mood.value
                    ? "bg-blue-500 text-white shadow-lg scale-105"
                    : "bg-gray-100 hover:bg-blue-50"
                }`}
              >
                <div className="text-lg sm:text-2xl mb-1">{mood.emoji}</div>
                <div className="text-xs font-medium">{mood.label}</div>
              </button>
            ))}
          </div>

          {currentMood && (
            <>
              {/* Intensity Slider */}
              <div className="mt-4 mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Intensity: {getIntensityLabel(moodIntensity)} ({moodIntensity}/5)
                </label>
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-gray-500">1</span>
                  <div className="flex-1 relative">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={moodIntensity}
                      onChange={(e) => setMoodIntensity(Number.parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, ${getIntensityColor(moodIntensity)} 0%, ${getIntensityColor(moodIntensity)} ${((moodIntensity - 1) / 4) * 100}%, #e5e7eb ${((moodIntensity - 1) / 4) * 100}%, #e5e7eb 100%)`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">5</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Very Low</span>
                  <span>Low</span>
                  <span>Moderate</span>
                  <span>High</span>
                  <span>Very High</span>
                </div>
              </div>

              <textarea
                className="w-full mt-3 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-lora text-sm resize-none"
                rows={3}
                placeholder="Why do you feel this way? (Optional)"
                value={moodReason}
                onChange={(e) => setMoodReason(e.target.value)}
              />
              <div className="mt-3 mb-2">
                <button
                  onClick={handleSaveMood}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Save Mood
                </button>
              </div>
            </>
          )}
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center">
              <Mic className="w-4 h-4 mr-1" />
              Voice Check-in
            </button>
            <a href="/mood-tracker" className="flex-1">
              <button className="w-full btn-primary text-sm py-2">View Trends</button>
            </a>
          </div>
        </div>

        {/* AI Companion Quick Access */}
        <div className="card">
          <h3 className="text-base sm:text-lg font-semibold mb-3 font-poppins flex items-center">
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" />
            Chat with your AI Companion
          </h3>
          <p className="text-gray-600 text-sm mb-4 font-lora">
            I'm here to listen and support you. What's on your mind?
          </p>
          <a href="/ai-companion">
            <button className="btn-primary w-full">Start Conversation</button>
          </a>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <a href={isGuest ? "#" : "/find-therapist"} className={isGuest ? "opacity-50 pointer-events-none" : ""}>
            <div className="card text-center hover:shadow-lg transition-all duration-200 h-full">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-semibold text-sm font-poppins">Find a Therapist</h4>
              <p className="text-xs text-gray-600 mt-1">Book sessions</p>
              {isGuest && <p className="text-xs text-red-500 mt-1">Login required</p>}
            </div>
          </a>

          <a href="/sessions">
            <div className="card text-center hover:shadow-lg transition-all duration-200 h-full">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 mx-auto mb-2" />
              <h4 className="font-semibold text-sm font-poppins">My Sessions</h4>
              <p className="text-xs text-gray-600 mt-1">View appointments</p>
            </div>
          </a>

          <a href="/sleep-tracker">
            <div className="card text-center hover:shadow-lg transition-all duration-200 h-full">
              <Moon className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-500 mx-auto mb-2" />
              <h4 className="font-semibold text-sm font-poppins">Sleep Tracker</h4>
              <p className="text-xs text-gray-600 mt-1">Monitor sleep patterns</p>
            </div>
          </a>

          <a href={isGuest ? "#" : "/community"} className={isGuest ? "opacity-50 pointer-events-none" : ""}>
            <div className="card text-center hover:shadow-lg transition-all duration-200 h-full">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mx-auto mb-2" />
              <h4 className="font-semibold text-sm font-poppins">Community</h4>
              <p className="text-xs text-gray-600 mt-1">Connect & share</p>
              {isGuest && <p className="text-xs text-red-500 mt-1">Login required</p>}
            </div>
          </a>

          <a href="/resources">
            <div className="card text-center hover:shadow-lg transition-all duration-200 h-full">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-semibold text-sm font-poppins">Learn & Grow</h4>
              <p className="text-xs text-gray-600 mt-1">Educational resources</p>
            </div>
          </a>

          <a href="/games">
            <div className="card text-center hover:shadow-lg transition-all duration-200 h-full">
              <Gamepad2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mx-auto mb-2" />
              <h4 className="font-semibold text-sm font-poppins">Games Hub</h4>
              <p className="text-xs text-gray-600 mt-1">Therapeutic games</p>
            </div>
          </a>

          <a href="/mood-tracker">
            <div className="card text-center hover:shadow-lg transition-all duration-200 h-full">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 mx-auto mb-2" />
              <h4 className="font-semibold text-sm font-poppins">Mood Tracker</h4>
              <p className="text-xs text-gray-600 mt-1">Track patterns</p>
            </div>
          </a>

          <a href="/coping-kit">
            <div className="card text-center hover:shadow-lg transition-all duration-200 h-full">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-semibold text-sm font-poppins">Coping Kit</h4>
              <p className="text-xs text-gray-600 mt-1">Tools & exercises</p>
            </div>
          </a>
        </div>

        {/* Crisis Support Card */}
        <div className="card bg-linear-to-r from-red-500 to-pink-500 text-white">
          <h3 className="font-semibold mb-2 font-poppins flex items-center text-sm sm:text-base">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Need immediate support?
          </h3>
          <p className="text-sm mb-4 font-lora">
            If you're in crisis or having thoughts of self-harm, help is available 24/7.
          </p>
          <a href="/crisis-support">
            <button className="bg-white text-red-500 font-semibold py-2 px-4 rounded-full hover:bg-gray-100 transition-colors text-sm sm:text-base">
              Get Help Now
            </button>
          </a>
        </div>
      </main>

      <BottomNavigation currentPage="home" isGuest={isGuest} />
    </div>
  )
}
