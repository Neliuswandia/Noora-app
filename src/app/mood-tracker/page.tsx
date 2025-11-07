"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import {
  TrendingUp,
  Plus,
  Mic,
  Edit3,
  BookOpen,
  PenTool,
  Heart,
  Zap,
  Target,
  Award,
  Smile,
  Sun,
  Moon,
  Coffee,
} from "lucide-react"
import BottomNavigation from "@/components/BottomNavigation"

interface MoodEntry {
  id: string
  date: string
  mood: string
  moodValue: number
  intensity: number
  note?: string
  journalEntry?: string
  tags: string[]
}

interface JournalEntry {
  id: string
  date: string
  title: string
  content: string
  mood?: string
  tags: string[]
}

export default function MoodTracker() {
  const [selectedView, setSelectedView] = useState<"week" | "month" | "year">("week")
  const [showAddEntry, setShowAddEntry] = useState(false)
  const [showJournalModal, setShowJournalModal] = useState(false)
  const [newMoodNote, setNewMoodNote] = useState("")
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [moodIntensity, setMoodIntensity] = useState<number>(3)
  const [activeTab, setActiveTab] = useState<"tracker" | "journal">("tracker")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // Journal states
  const [journalTitle, setJournalTitle] = useState("")
  const [journalContent, setJournalContent] = useState("")
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null)

  // Sample mood data with journal entries - using current month dates
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  const moodEntries: MoodEntry[] = [
    {
      id: "1",
      date: new Date(currentYear, currentMonth, 15).toISOString().split("T")[0],
      mood: "Great",
      moodValue: 5,
      intensity: 4,
      note: "Had a wonderful day with friends",
      journalEntry:
        "Today was absolutely amazing! I spent the afternoon with my closest friends at the park. We had a picnic and just talked for hours. It reminded me how important these connections are for my mental health. I felt so supported and loved. The weather was perfect too - sunny but not too hot. I'm grateful for days like these that remind me of all the good in my life.",
      tags: ["social", "happy", "grateful"],
    },
    {
      id: "2",
      date: new Date(currentYear, currentMonth, 14).toISOString().split("T")[0],
      mood: "Good",
      moodValue: 4,
      intensity: 3,
      note: "Productive work day",
      journalEntry:
        "Work went really well today. I managed to complete all my tasks and even got ahead on some projects. My manager complimented my recent work, which felt really validating. I'm learning to appreciate these small wins more. Sometimes I forget to acknowledge my progress, but today I'm making a conscious effort to celebrate it.",
      tags: ["work", "accomplished", "progress"],
    },
    {
      id: "3",
      date: new Date(currentYear, currentMonth, 13).toISOString().split("T")[0],
      mood: "Okay",
      moodValue: 3,
      intensity: 2,
      note: "Feeling neutral",
      journalEntry:
        "Today was just... okay. Nothing particularly good or bad happened. I went through my usual routine, but I felt a bit disconnected from everything. Maybe I need to shake things up a bit or try something new. These neutral days aren't bad, but they make me realize I want more excitement or purpose in my daily life.",
      tags: ["neutral", "routine"],
    },
    {
      id: "4",
      date: new Date(currentYear, currentMonth, 12).toISOString().split("T")[0],
      mood: "Low",
      moodValue: 2,
      intensity: 4,
      note: "Stressed about deadlines",
      journalEntry:
        "The pressure at work is really getting to me. I have three major deadlines coming up next week and I'm not sure I can handle it all. I kept procrastinating today which only made me feel worse. I know I need to break things down into smaller tasks, but when I'm anxious, everything feels overwhelming. Maybe I should talk to my therapist about better coping strategies for work stress.",
      tags: ["stress", "work", "anxiety"],
    },
    {
      id: "5",
      date: new Date(currentYear, currentMonth, 11).toISOString().split("T")[0],
      mood: "Good",
      moodValue: 4,
      intensity: 5,
      note: "Good therapy session",
      journalEntry:
        "Had a breakthrough in therapy today. We talked about my tendency to people-please and how it's been affecting my relationships. Dr. Smith helped me see some patterns I hadn't noticed before. I feel hopeful about making some changes. It's scary but also exciting to think about setting better boundaries. I'm grateful I have this support system.",
      tags: ["therapy", "progress", "breakthrough"],
    },
    {
      id: "6",
      date: new Date(currentYear, currentMonth, 10).toISOString().split("T")[0],
      mood: "Great",
      moodValue: 5,
      intensity: 3,
      note: "Family dinner",
      journalEntry:
        "Family dinner was so nice tonight. Mom made my favorite pasta and we all just sat around talking and laughing. My little sister told us about her school play and dad shared some funny stories from work. These moments feel so precious. I want to make more effort to have regular family time like this.",
      tags: ["family", "love", "connection"],
    },
    {
      id: "7",
      date: new Date(currentYear, currentMonth, 9).toISOString().split("T")[0],
      mood: "Low",
      moodValue: 2,
      intensity: 3,
      note: "Feeling lonely",
      journalEntry:
        "Spent most of the day alone and it hit me harder than usual. I scrolled through social media and saw everyone else having fun, which made me feel even more isolated. I know comparison is the thief of joy, but it's hard not to feel left out sometimes. I should probably reach out to friends more instead of waiting for them to contact me first.",
      tags: ["lonely", "isolation", "social media"],
    },
    {
      id: "8",
      date: new Date(currentYear, currentMonth, 8).toISOString().split("T")[0],
      mood: "Good",
      moodValue: 4,
      intensity: 4,
      note: "Morning workout",
      tags: ["exercise", "energy"],
    },
    {
      id: "9",
      date: new Date(currentYear, currentMonth, 7).toISOString().split("T")[0],
      mood: "Okay",
      moodValue: 3,
      intensity: 2,
      note: "Quiet Sunday",
      tags: ["rest", "peaceful"],
    },
    {
      id: "10",
      date: new Date(currentYear, currentMonth, 6).toISOString().split("T")[0],
      mood: "Great",
      moodValue: 5,
      intensity: 5,
      note: "Date night",
      tags: ["love", "romance", "happy"],
    },
  ]

  const journalEntries: JournalEntry[] = [
    {
      id: "j1",
      date: new Date(currentYear, currentMonth, 16).toISOString().split("T")[0],
      title: "Reflections on Growth",
      content:
        "I've been thinking a lot about personal growth lately. It's interesting how we can change so much without even realizing it. Looking back at my journal entries from last year, I can see how much my perspective has shifted. I'm more aware of my emotions now, more willing to sit with discomfort instead of running from it. Therapy has been a huge part of this journey, but so has this daily practice of checking in with myself.",
      mood: "Reflective",
      tags: ["growth", "reflection", "therapy"],
    },
    {
      id: "j2",
      date: new Date(currentYear, currentMonth, 15).toISOString().split("T")[0],
      title: "Gratitude Practice",
      content:
        "Three things I'm grateful for today: 1) The warm sunshine streaming through my window this morning, 2) My friend Sarah's text checking in on me, 3) The delicious coffee I made that was just perfect. It's amazing how focusing on these small things can shift my entire mood. I want to make gratitude a more regular practice.",
      mood: "Grateful",
      tags: ["gratitude", "mindfulness", "friendship"],
    },
  ]

  const moodOptions = [
    { emoji: "😊", label: "Great", value: 5, color: "#4A90E2" },
    { emoji: "🙂", label: "Good", value: 4, color: "#A3D8C6" },
    { emoji: "😐", label: "Okay", value: 3, color: "#FFA500" },
    { emoji: "😔", label: "Low", value: 2, color: "#FF6F61" },
    { emoji: "😢", label: "Struggling", value: 1, color: "#FF4444" },
  ]

  const journalPrompts = [
    "What made you feel this way today?",
    "What are three things you're grateful for?",
    "How did you take care of yourself today?",
    "What challenged you today and how did you handle it?",
    "What would you like to focus on tomorrow?",
    "Describe a moment today when you felt truly present.",
    "What emotions came up for you today and why?",
    "What would you tell a friend who was feeling the way you feel right now?",
    "What patterns do you notice in your thoughts today?",
    "How can you show yourself compassion today?",
  ]

  const handleAddMoodEntry = () => {
    if (selectedMood) {
      // In a real app, this would save to the backend
      console.log("Adding mood entry:", { mood: selectedMood, intensity: moodIntensity, note: newMoodNote })
      setShowAddEntry(false)
      setSelectedMood(null)
      setNewMoodNote("")
      setMoodIntensity(3)
    }
  }

  const handleAddJournalEntry = () => {
    if (journalTitle.trim() || journalContent.trim()) {
      // In a real app, this would save to the backend
      console.log("Adding journal entry:", { title: journalTitle, content: journalContent })
      setShowJournalModal(false)
      setJournalTitle("")
      setJournalContent("")
      setSelectedPrompt(null)
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

  // Helper functions for mood insights
  const getMoodStreak = () => {
    const recentEntries = moodEntries.slice(0, 7).reverse()
    let streak = 0
    for (const entry of recentEntries) {
      if (entry.moodValue >= 4) {
        streak++
      } else {
        break
      }
    }
    return streak
  }

  const getMostCommonMood = () => {
    const moodCounts = moodEntries.reduce(
      (acc, entry) => {
        acc[entry.mood] = (acc[entry.mood] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const mostCommon = Object.entries(moodCounts).reduce((a, b) => (moodCounts[a[0]] > moodCounts[b[0]] ? a : b))
    return mostCommon[0]
  }

  const getWeeklyAverage = () => {
    const weekEntries = moodEntries.slice(0, 7)
    const average = weekEntries.reduce((sum, entry) => sum + entry.moodValue, 0) / weekEntries.length
    return average.toFixed(1)
  }

  const getTodaysMoodSuggestion = () => {
    const hour = new Date().getHours()
    if (hour < 12) {
      return {
        icon: Sun,
        title: "Good Morning!",
        message: "How are you feeling this morning?",
        color: "from-yellow-400 to-orange-500",
      }
    } else if (hour < 17) {
      return {
        icon: Coffee,
        title: "Afternoon Check-in",
        message: "Take a moment to reflect on your day so far",
        color: "from-blue-400 to-purple-500",
      }
    } else {
      return {
        icon: Moon,
        title: "Evening Reflection",
        message: "How did your day go overall?",
        color: "from-purple-500 to-indigo-600",
      }
    }
  }

  const getMoodForDate = (date: Date | undefined) => {
    if (!date) return null
    const dateString = date.toISOString().split("T")[0]
    const entry = moodEntries.find((entry) => entry.date === dateString)
    return entry ? moodOptions.find((mood) => mood.value === entry.moodValue) : null
  }

  const moodSuggestion = getTodaysMoodSuggestion()

  return (
    <div className="overflow-auto min-h-screen bg-[#F5F7FA] pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#333333] font-poppins">Mood Tracker</h1>
            <p className="text-[#666666] font-lora">Track your emotional patterns</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowJournalModal(true)}
              className="p-3 rounded-full bg-[#A3D8C6] text-white hover:bg-[#8BC7B8] transition-colors"
            >
              <PenTool className="w-5 h-5" />
            </button>
            <button onClick={() => setShowAddEntry(true)} className="btn-primary p-3 rounded-full">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex mt-4 bg-[#F5F7FA] rounded-lg p-1">
          {[
            { key: "tracker", label: "Tracker", icon: TrendingUp },
            { key: "journal", label: "Journal", icon: BookOpen },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === key ? "bg-white text-[#4A90E2] shadow-sm" : "text-[#666666] hover:text-[#4A90E2]"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* Tracker Tab */}
        {activeTab === "tracker" && (
          <>
            {/* Calendar with Cute Design */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#E8F4FD]">
              <h3 className="font-semibold mb-4 font-poppins flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#4A90E2] to-[#A3D8C6] rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                Calendar
                <div className="ml-auto flex gap-1">
                  <div className="w-2 h-2 bg-[#4A90E2] rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-[#A3D8C6] rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-[#FFB6C1] rounded-full animate-pulse delay-200"></div>
                </div>
              </h3>

              <div className="bg-gradient-to-br from-[#F8FBFF] to-[#F0F8FF] rounded-2xl p-4 border border-[#E8F4FD]">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="w-full mx-auto"
                  classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    month: "space-y-4",
                    caption: "flex justify-center pt-1 relative items-center mb-4",
                    caption_label:
                      "text-lg font-bold text-[#4A90E2] font-poppins bg-gradient-to-r from-[#4A90E2] to-[#A3D8C6] bg-clip-text text-transparent",
                    nav: "space-x-1 flex items-center",
                    nav_button:
                      "h-8 w-8 bg-gradient-to-r from-[#4A90E2] to-[#A3D8C6] text-white rounded-full p-0 hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex mb-2",
                    head_cell:
                      "text-[#666666] rounded-lg w-10 h-8 font-semibold text-sm flex items-center justify-center bg-[#F5F7FA] mx-0.5 font-poppins",
                    row: "flex w-full mt-1",
                    cell: "h-10 w-10 text-center text-sm p-0 relative mx-0.5 rounded-xl",
                    day: "h-10 w-10 p-0 font-medium rounded-xl transition-all duration-200 hover:scale-105 flex items-center justify-center border-2 border-transparent hover:border-[#A3D8C6] hover:bg-gradient-to-br hover:from-[#E8F4FD] hover:to-[#F0F8FF] hover:shadow-md",
                    day_range_end: "day-range-end",
                    day_selected:
                      "bg-gradient-to-br from-[#4A90E2] to-[#A3D8C6] text-white hover:from-[#4A90E2] hover:to-[#A3D8C6] hover:text-white shadow-lg scale-105 border-2 border-white",
                    day_today:
                      "bg-gradient-to-br from-[#FFB6C1] to-[#FFC0CB] text-white font-bold shadow-md border-2 border-[#FF69B4]",
                    day_outside: "text-[#CCCCCC] opacity-50 hover:opacity-75",
                    day_disabled: "text-[#CCCCCC] opacity-30",
                    day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                    day_hidden: "invisible",
                  }}
                />
              </div>

              {/* Selected Date Info with Cute Design */}
              {selectedDate && (
                <div className="mt-6 p-4 bg-gradient-to-r from-[#F8FBFF] via-[#F0F8FF] to-[#E8F4FD] rounded-2xl border-2 border-[#E8F4FD] relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-2 right-2 w-6 h-6 bg-[#FFB6C1] rounded-full opacity-20"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 bg-[#A3D8C6] rounded-full opacity-30"></div>
                  <div className="absolute top-1/2 right-6 w-3 h-3 bg-[#4A90E2] rounded-full opacity-25"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-[#4A90E2] to-[#A3D8C6] rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <p className="text-sm font-bold text-[#4A90E2] font-poppins text-lg">
                        {selectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    {(() => {
                      const mood = getMoodForDate(selectedDate)
                      const entry = moodEntries.find((e) => e.date === selectedDate.toISOString().split("T")[0])

                      if (mood && entry) {
                        return (
                          <div className="flex items-center gap-4 p-3 bg-white/70 rounded-xl backdrop-blur-sm border border-white/50">
                            <div className="w-12 h-12 bg-gradient-to-br from-white to-[#F8FBFF] rounded-full flex items-center justify-center shadow-md border-2 border-[#E8F4FD]">
                              <span className="text-2xl">{mood.emoji}</span>
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-[#333333] font-poppins text-lg">{entry.mood}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-[#666666] font-medium">Intensity:</span>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <div
                                      key={i}
                                      className={`w-2 h-2 rounded-full ${
                                        i < entry.intensity
                                          ? "bg-gradient-to-r from-[#4A90E2] to-[#A3D8C6]"
                                          : "bg-[#E8F4FD]"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs font-bold text-[#4A90E2]">
                                  {getIntensityLabel(entry.intensity)}
                                </span>
                              </div>
                              {entry.note && (
                                <p className="text-sm text-[#666666] mt-2 font-lora bg-white/50 p-2 rounded-lg border border-[#E8F4FD]">
                                  "{entry.note}"
                                </p>
                              )}
                            </div>
                          </div>
                        )
                      } else {
                        return (
                          <div className="text-center py-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#E8F4FD] to-[#F0F8FF] rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-[#A3D8C6] border-dashed">
                              <Plus className="w-8 h-8 text-[#A3D8C6]" />
                            </div>
                            <p className="text-sm text-[#666666] mb-3 font-poppins">
                              No mood logged for this beautiful day
                            </p>
                            <button
                              onClick={() => setShowAddEntry(true)}
                              className="bg-gradient-to-r from-[#4A90E2] to-[#A3D8C6] text-white px-6 py-2 rounded-full text-sm font-bold hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-poppins"
                            >
                              ✨ Add mood entry
                            </button>
                          </div>
                        )
                      }
                    })()}
                  </div>
                </div>
              )}
            </div>

            {/* Daily Check-in Card with Cute Design */}
            <div className="bg-white rounded-2xl p-6 shadow-lg relative overflow-hidden border-2 border-[#E8F4FD]">
              <div className={`absolute inset-0 bg-gradient-to-br ${moodSuggestion.color} opacity-90`}></div>

              {/* Cute decorative elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full"></div>
              <div className="absolute top-8 right-8 w-4 h-4 bg-white/15 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full"></div>
              <div className="absolute bottom-8 left-8 w-3 h-3 bg-white/20 rounded-full"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
                    <moodSuggestion.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-poppins text-white">{moodSuggestion.title}</h3>
                    <div className="flex gap-1 mt-1">
                      <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                      <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <p className="text-white/90 mb-6 font-lora text-lg leading-relaxed">{moodSuggestion.message}</p>
                <button
                  onClick={() => setShowAddEntry(true)}
                  className="bg-white/25 hover:bg-white/35 text-white px-8 py-3 rounded-full font-bold transition-all duration-200 backdrop-blur-sm border-2 border-white/30 hover:scale-105 shadow-lg hover:shadow-xl font-poppins text-lg"
                >
                  🌟 Track My Mood
                </button>
              </div>
            </div>

            {/* Mood Insights Grid with Cute Design */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm text-center relative overflow-hidden border-2 border-[#E8F4FD]">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#4A90E2]/10 to-[#A3D8C6]/10 rounded-full -translate-y-4 translate-x-4"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg border-4 border-white">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-[#333333] font-poppins mb-1">{getMoodStreak()}</h3>
                  <p className="text-sm text-[#666666] font-medium">Day Good Mood Streak</p>
                  <div className="flex justify-center gap-1 mt-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm text-center relative overflow-hidden border-2 border-[#E8F4FD]">
                <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full -translate-y-4 -translate-x-4"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg border-4 border-white">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-[#333333] font-poppins mb-1">{getWeeklyAverage()}</h3>
                  <p className="text-sm text-[#666666] font-medium">Weekly Average</p>
                  <div className="flex justify-center gap-1 mt-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Mood Check with Cute Design */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#E8F4FD] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#FFB6C1]/20 to-[#FFC0CB]/20 rounded-full -translate-y-6 translate-x-6"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-[#A3D8C6]/20 to-[#4A90E2]/20 rounded-full translate-y-4 -translate-x-4"></div>

              <div className="relative z-10">
                <h3 className="font-semibold mb-6 font-poppins flex items-center gap-3 text-lg">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#4A90E2] to-[#A3D8C6] rounded-full flex items-center justify-center">
                    <Smile className="w-4 h-4 text-white" />
                  </div>
                  Quick Mood Check
                  <div className="ml-auto">
                    <div className="w-3 h-3 bg-[#FFB6C1] rounded-full animate-bounce"></div>
                  </div>
                </h3>
                <div className="grid grid-cols-5 gap-3">
                  {moodOptions.map((mood, index) => (
                    <button
                      key={mood.value}
                      onClick={() => {
                        setSelectedMood(mood.label)
                        setShowAddEntry(true)
                      }}
                      className="p-4 rounded-2xl bg-gradient-to-br from-[#F8FBFF] to-[#F0F8FF] hover:from-[#E8F4FD] hover:to-[#F8FBFF] transition-all duration-300 text-center group hover:scale-110 shadow-sm hover:shadow-lg border-2 border-[#E8F4FD] hover:border-[#A3D8C6] relative overflow-hidden"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300 filter group-hover:drop-shadow-lg">
                          {mood.emoji}
                        </div>
                        <div className="text-xs font-bold text-[#666666] group-hover:text-[#4A90E2] transition-colors duration-300">
                          {mood.label}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mood Pattern Insights */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4 font-poppins flex items-center gap-2">
                <Target className="w-5 h-5 text-[#A3D8C6]" />
                Your Patterns
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#F5F7FA] rounded-lg">
                  <div>
                    <p className="font-medium text-[#333333] font-poppins">Most Common Mood</p>
                    <p className="text-sm text-[#666666]">This helps identify your baseline</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{moodOptions.find((m) => m.label === getMostCommonMood())?.emoji}</span>
                    <span className="font-medium text-[#333333]">{getMostCommonMood()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#F5F7FA] rounded-lg">
                  <div>
                    <p className="font-medium text-[#333333] font-poppins">Recent Trend</p>
                    <p className="text-sm text-[#666666]">Based on your last 7 entries</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {Number.parseFloat(getWeeklyAverage()) >= 4 ? (
                      <>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-600">Positive</span>
                      </>
                    ) : Number.parseFloat(getWeeklyAverage()) >= 3 ? (
                      <>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm font-medium text-yellow-600">Stable</span>
                      </>
                    ) : (
                      <>
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-medium text-red-600">Needs Attention</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Badge */}
            {getMoodStreak() >= 3 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold font-poppins">Great Job! 🎉</h3>
                    <p className="text-white/90 text-sm font-lora">
                      You've maintained a positive mood for {getMoodStreak()} days in a row!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Entries */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4 font-poppins">Recent Entries</h3>
              <div className="space-y-3">
                {moodEntries.slice(0, 5).map((entry) => {
                  const moodOption = moodOptions.find((m) => m.value === entry.moodValue)
                  return (
                    <div key={entry.id} className="flex items-start space-x-3 p-3 bg-[#F5F7FA] rounded-lg">
                      <div className="text-2xl">{moodOption?.emoji}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-[#333333] font-poppins">{entry.mood}</h4>
                          <span className="text-sm text-[#666666]">{new Date(entry.date).toLocaleDateString()}</span>
                        </div>

                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-[#666666]">Intensity:</span>
                          <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${getIntensityColor(entry.intensity)}`}></div>
                            <span className="text-xs font-medium text-[#333333]">
                              {getIntensityLabel(entry.intensity)} ({entry.intensity}/5)
                            </span>
                          </div>
                        </div>

                        {entry.note && <p className="text-sm text-[#666666] mt-1 font-lora">{entry.note}</p>}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {entry.tags.map((tag) => (
                            <span key={tag} className="text-xs bg-[#A3D8C6] text-[#333333] px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}

        {/* Journal Tab */}
        {activeTab === "journal" && (
          <>
            {/* Journal Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <BookOpen className="w-8 h-8 text-[#4A90E2] mx-auto mb-2" />
                <h3 className="font-semibold text-lg font-poppins">{journalEntries.length}</h3>
                <p className="text-sm text-[#666666]">Journal Entries</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <PenTool className="w-8 h-8 text-[#A3D8C6] mx-auto mb-2" />
                <h3 className="font-semibold text-lg font-poppins">
                  {moodEntries.filter((e) => e.journalEntry).length}
                </h3>
                <p className="text-sm text-[#666666]">Mood Journals</p>
              </div>
            </div>

            {/* Journal Prompts */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4 font-poppins">Daily Prompts</h3>
              <div className="grid grid-cols-1 gap-2">
                {journalPrompts.slice(0, 3).map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedPrompt(prompt)
                      setShowJournalModal(true)
                    }}
                    className="text-left p-3 bg-[#F5F7FA] rounded-lg hover:bg-[#E8F4FD] transition-colors"
                  >
                    <p className="text-sm text-[#666666] font-lora">{prompt}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Journal Entries */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4 font-poppins">Recent Journal Entries</h3>
              <div className="space-y-4">
                {journalEntries.map((entry) => (
                  <div key={entry.id} className="p-4 bg-[#F5F7FA] rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-[#333333] font-poppins">{entry.title}</h4>
                      <span className="text-sm text-[#666666]">{new Date(entry.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-[#666666] font-lora line-clamp-3">{entry.content}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {entry.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-[#A3D8C6] text-[#333333] px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mood-linked Journal Entries */}
              <div className="mt-6">
                <h4 className="font-medium mb-3 text-[#333333] font-poppins">Mood Journal Entries</h4>
                <div className="space-y-3">
                  {moodEntries
                    .filter((entry) => entry.journalEntry)
                    .slice(0, 3)
                    .map((entry) => {
                      const moodOption = moodOptions.find((m) => m.value === entry.moodValue)
                      return (
                        <div key={entry.id} className="p-3 bg-[#F5F7FA] rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-lg">{moodOption?.emoji}</span>
                            <span className="font-medium text-[#333333] font-poppins">{entry.mood}</span>
                            <span className="text-sm text-[#666666]">{new Date(entry.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm text-[#666666] font-lora line-clamp-2">{entry.journalEntry}</p>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Add Mood Entry Modal */}
      {showAddEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 font-poppins">How are you feeling?</h3>

            <div className="grid grid-cols-5 gap-2 mb-6">
              {moodOptions.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.label)}
                  className={`p-3 rounded-xl text-center transition-all duration-200 ${
                    selectedMood === mood.label
                      ? "bg-[#4A90E2] text-white shadow-lg scale-105"
                      : "bg-[#F5F7FA] hover:bg-[#E8F4FD]"
                  }`}
                >
                  <div className="text-2xl mb-1">{mood.emoji}</div>
                  <div className="text-xs font-medium">{mood.label}</div>
                </button>
              ))}
            </div>

            {selectedMood && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#333333] mb-2">
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
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#333333] mb-2">Add a note (optional)</label>
              <textarea
                value={newMoodNote}
                onChange={(e) => setNewMoodNote(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent resize-none"
                rows={3}
              />
              <div className="flex gap-2 mt-2">
                <button className="flex items-center text-sm text-[#4A90E2] hover:bg-[#E8F4FD] px-2 py-1 rounded">
                  <Mic className="w-4 h-4 mr-1" />
                  Voice note
                </button>
                <button
                  onClick={() => {
                    setShowAddEntry(false)
                    setShowJournalModal(true)
                  }}
                  className="flex items-center text-sm text-[#4A90E2] hover:bg-[#E8F4FD] px-2 py-1 rounded"
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  Full journal
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddEntry(false)}
                className="flex-1 py-3 px-4 border border-gray-200 rounded-full text-[#666666] hover:bg-[#F5F7FA] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMoodEntry}
                disabled={!selectedMood}
                className="flex-1 bg-[#4A90E2] text-white py-3 px-4 rounded-full font-medium hover:bg-[#3A7BC8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Entry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Journal Entry Modal */}
      {showJournalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 font-poppins">Journal Entry</h3>

            {selectedPrompt && (
              <div className="mb-4 p-3 bg-[#E8F4FD] rounded-lg">
                <p className="text-sm text-[#4A90E2] font-medium">Prompt:</p>
                <p className="text-sm text-[#666666] font-lora">{selectedPrompt}</p>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-[#333333] mb-2">Title (optional)</label>
              <input
                type="text"
                value={journalTitle}
                onChange={(e) => setJournalTitle(e.target.value)}
                placeholder="Give your entry a title..."
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#333333] mb-2">Your thoughts</label>
              <textarea
                value={journalContent}
                onChange={(e) => setJournalContent(e.target.value)}
                placeholder={selectedPrompt || "What's on your mind today?"}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent resize-none"
                rows={8}
              />
            </div>

            {!selectedPrompt && (
              <div className="mb-4">
                <p className="text-sm font-medium text-[#333333] mb-2">Need inspiration? Try a prompt:</p>
                <div className="grid grid-cols-1 gap-2">
                  {journalPrompts.slice(0, 3).map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPrompt(prompt)}
                      className="text-left p-2 text-sm bg-[#F5F7FA] rounded-lg hover:bg-[#E8F4FD] transition-colors text-[#666666] font-lora"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowJournalModal(false)
                  setJournalTitle("")
                  setJournalContent("")
                  setSelectedPrompt(null)
                }}
                className="flex-1 py-3 px-4 border border-gray-200 rounded-full text-[#666666] hover:bg-[#F5F7FA] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddJournalEntry}
                disabled={!journalTitle.trim() && !journalContent.trim()}
                className="flex-1 bg-[#4A90E2] text-white py-3 px-4 rounded-full font-medium hover:bg-[#3A7BC8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Entry
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation currentPage="mood" />
    </div>
  )
}
