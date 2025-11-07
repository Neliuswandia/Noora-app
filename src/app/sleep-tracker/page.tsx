"use client"

import { useState } from "react"
import { Moon, Plus, Target, Zap } from "lucide-react"
import BottomNavigation from "@/components/BottomNavigation"

interface SleepEntry {
  id: string
  date: string
  bedtime: string
  wakeTime: string
  sleepDuration: number
  sleepQuality: number
  mood: string
  notes?: string
  factors: string[]
}

export default function SleepTracker() {
  const [selectedView, setSelectedView] = useState<"week" | "month" | "year">("week")
  const [showAddEntry, setShowAddEntry] = useState(false)
  const [newEntry, setNewEntry] = useState({
    bedtime: "",
    wakeTime: "",
    sleepQuality: 3,
    mood: "",
    notes: "",
    factors: [] as string[],
  })

  // Sample sleep data
  const sleepEntries: SleepEntry[] = [
    {
      id: "1",
      date: "2024-01-15",
      bedtime: "22:30",
      wakeTime: "07:00",
      sleepDuration: 8.5,
      sleepQuality: 4,
      mood: "refreshed",
      notes: "Felt well-rested",
      factors: ["exercise", "no-caffeine"],
    },
    {
      id: "2",
      date: "2024-01-14",
      bedtime: "23:15",
      wakeTime: "06:45",
      sleepDuration: 7.5,
      sleepQuality: 3,
      mood: "okay",
      notes: "Took a while to fall asleep",
      factors: ["screen-time", "stress"],
    },
    {
      id: "3",
      date: "2024-01-13",
      bedtime: "22:00",
      wakeTime: "06:30",
      sleepDuration: 8.5,
      sleepQuality: 5,
      mood: "energized",
      notes: "Great night's sleep",
      factors: ["meditation", "cool-room"],
    },
    {
      id: "4",
      date: "2024-01-12",
      bedtime: "23:45",
      wakeTime: "07:30",
      sleepDuration: 7.75,
      sleepQuality: 2,
      mood: "tired",
      notes: "Woke up multiple times",
      factors: ["caffeine", "noise"],
    },
    {
      id: "5",
      date: "2024-01-11",
      bedtime: "22:15",
      wakeTime: "06:45",
      sleepDuration: 8.5,
      sleepQuality: 4,
      mood: "good",
      notes: "Solid sleep",
      factors: ["exercise", "routine"],
    },
  ]

  const sleepFactors = [
    { id: "exercise", label: "Exercise", positive: true },
    { id: "caffeine", label: "Caffeine", positive: false },
    { id: "screen-time", label: "Screen Time", positive: false },
    { id: "stress", label: "Stress", positive: false },
    { id: "meditation", label: "Meditation", positive: true },
    { id: "alcohol", label: "Alcohol", positive: false },
    { id: "routine", label: "Bedtime Routine", positive: true },
    { id: "cool-room", label: "Cool Room", positive: true },
    { id: "noise", label: "Noise", positive: false },
    { id: "no-caffeine", label: "No Caffeine", positive: true },
  ]

  const moodOptions = [
    { id: "energized", label: "Energized", emoji: "⚡", color: "text-green-500" },
    { id: "refreshed", label: "Refreshed", emoji: "😊", color: "text-blue-500" },
    { id: "good", label: "Good", emoji: "🙂", color: "text-green-400" },
    { id: "okay", label: "Okay", emoji: "😐", color: "text-yellow-500" },
    { id: "tired", label: "Tired", emoji: "😴", color: "text-orange-500" },
    { id: "groggy", label: "Groggy", emoji: "😵", color: "text-red-500" },
  ]

  const getAverageSleep = () => {
    const total = sleepEntries.reduce((sum, entry) => sum + entry.sleepDuration, 0)
    return (total / sleepEntries.length).toFixed(1)
  }

  const getAverageQuality = () => {
    const total = sleepEntries.reduce((sum, entry) => sum + entry.sleepQuality, 0)
    return (total / sleepEntries.length).toFixed(1)
  }

  const getSleepGoalProgress = () => {
    const target = 8 // 8 hours target
    const recent = sleepEntries.slice(0, 7) // Last 7 days
    const achieving = recent.filter((entry) => entry.sleepDuration >= target).length
    return Math.round((achieving / recent.length) * 100)
  }

  const getQualityColor = (quality: number) => {
    if (quality <= 2) return "text-red-500"
    if (quality <= 3) return "text-orange-500"
    if (quality <= 4) return "text-yellow-500"
    return "text-green-500"
  }

  const getQualityBg = (quality: number) => {
    if (quality <= 2) return "bg-red-100"
    if (quality <= 3) return "bg-orange-100"
    if (quality <= 4) return "bg-yellow-100"
    return "bg-green-100"
  }

  const getMoodEmoji = (mood: string) => {
    const option = moodOptions.find((m) => m.id === mood)
    return option ? option.emoji : "😐"
  }

  const getMoodColor = (mood: string) => {
    const option = moodOptions.find((m) => m.id === mood)
    return option ? option.color : "text-gray-500"
  }

  const calculateSleepDuration = (bedtime: string, wakeTime: string) => {
    if (!bedtime || !wakeTime) return 0

    const [bedHour, bedMin] = bedtime.split(":").map(Number)
    const [wakeHour, wakeMin] = wakeTime.split(":").map(Number)

    const bedMinutes = bedHour * 60 + bedMin
    let wakeMinutes = wakeHour * 60 + wakeMin

    // Handle overnight sleep
    if (wakeMinutes < bedMinutes) {
      wakeMinutes += 24 * 60
    }

    return (wakeMinutes - bedMinutes) / 60
  }

  const handleAddEntry = () => {
    if (newEntry.bedtime && newEntry.wakeTime) {
      const duration = calculateSleepDuration(newEntry.bedtime, newEntry.wakeTime)
      console.log("Adding sleep entry:", { ...newEntry, sleepDuration: duration })
      setShowAddEntry(false)
      setNewEntry({
        bedtime: "",
        wakeTime: "",
        sleepQuality: 3,
        mood: "",
        notes: "",
        factors: [],
      })
    }
  }

  const toggleFactor = (factorId: string) => {
    setNewEntry((prev) => ({
      ...prev,
      factors: prev.factors.includes(factorId)
        ? prev.factors.filter((f) => f !== factorId)
        : [...prev.factors, factorId],
    }))
  }

  const analyzeSleepTrends = () => {
    if (sleepEntries.length === 0) return null

    const recentEntries = sleepEntries.slice(0, 7)
    const avgDuration = recentEntries.reduce((sum, entry) => sum + entry.sleepDuration, 0) / recentEntries.length
    const avgQuality = recentEntries.reduce((sum, entry) => sum + entry.sleepQuality, 0) / recentEntries.length

    const recommendations = []

    if (avgDuration < 7) {
      recommendations.push({
        icon: "🛏️",
        title: "Increase Sleep Duration",
        message: "You're averaging less than 7 hours. Try going to bed 30 minutes earlier.",
        type: "duration",
      })
    }

    if (avgQuality < 3) {
      recommendations.push({
        icon: "💤",
        title: "Improve Sleep Quality",
        message: "Your sleep quality could be better. Consider a consistent bedtime routine.",
        type: "quality",
      })
    }

    // Analyze factors
    const allFactors = recentEntries.flatMap((entry) => entry.factors)
    const negativeFactors = allFactors.filter((factor) => sleepFactors.find((f) => f.id === factor && !f.positive))

    if (negativeFactors.length > 3) {
      const mostCommon = negativeFactors.reduce(
        (acc, factor) => {
          acc[factor] = (acc[factor] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )

      const topFactor = Object.entries(mostCommon).sort(([, a], [, b]) => b - a)[0]
      if (topFactor) {
        const factorLabel = sleepFactors.find((f) => f.id === topFactor[0])?.label
        recommendations.push({
          icon: "⚠️",
          title: "Address Sleep Disruptors",
          message: `${factorLabel} appears frequently in your entries. Consider reducing its impact.`,
          type: "factors",
        })
      }
    }

    return {
      avgDuration: avgDuration.toFixed(1),
      avgQuality: avgQuality.toFixed(1),
      recommendations: recommendations.slice(0, 3),
    }
  }

  return (
    <div className="overflow-auto min-h-screen bg-[#F5F7FA] pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#333333] font-poppins">Sleep Tracker</h1>
            <p className="text-[#666666] font-lora">Monitor your sleep patterns</p>
          </div>
          <button onClick={() => setShowAddEntry(true)} className="btn-primary p-3 rounded-full">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="card text-center">
            <Moon className="w-8 h-8 text-[#4A90E2] mx-auto mb-2" />
            <h3 className="font-semibold text-lg font-poppins">{getAverageSleep()}h</h3>
            <p className="text-sm text-[#666666]">Avg Sleep</p>
          </div>
          <div className="card text-center">
            <Target className="w-8 h-8 text-[#A3D8C6] mx-auto mb-2" />
            <h3 className="font-semibold text-lg font-poppins">{getSleepGoalProgress()}%</h3>
            <p className="text-sm text-[#666666]">Goal Progress</p>
          </div>
          <div className="card text-center">
            <Zap className="w-8 h-8 text-[#FFA500] mx-auto mb-2" />
            <h3 className="font-semibold text-lg font-poppins">{getAverageQuality()}/5</h3>
            <p className="text-sm text-[#666666]">Avg Quality</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="card">
          <div className="flex rounded-lg bg-[#F5F7FA] p-1">
            {(["week", "month", "year"] as const).map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  selectedView === view ? "bg-white text-[#4A90E2] shadow-sm" : "text-[#666666] hover:text-[#4A90E2]"
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Sleep Insights */}
        <div className="card">
          <h3 className="font-semibold mb-4 font-poppins">Sleep Insights</h3>

          {(() => {
            const analysis = analyzeSleepTrends()
            if (!analysis) {
              return (
                <div className="text-center py-8">
                  <p className="text-[#666666] font-lora">Start tracking your sleep to see personalized insights!</p>
                </div>
              )
            }

            return (
              <div className="space-y-4">
                {/* Quick Stats */}
                <div className="bg-gradient-to-r from-[#4A90E2] to-[#A3D8C6] rounded-lg p-4 text-white">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold">{analysis.avgDuration}h</div>
                      <div className="text-sm opacity-90">Average Duration</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{analysis.avgQuality}/5</div>
                      <div className="text-sm opacity-90">Average Quality</div>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                {analysis.recommendations.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-[#333333] font-poppins">Recommendations</h4>
                    {analysis.recommendations.map((rec, index) => (
                      <div key={index} className="p-3 rounded-lg bg-blue-50 border-l-4 border-blue-400">
                        <div className="flex items-start space-x-3">
                          <span className="text-xl">{rec.icon}</span>
                          <div className="flex-1">
                            <h5 className="font-medium text-[#333333] font-poppins">{rec.title}</h5>
                            <p className="text-sm text-[#666666] mt-1 font-lora">{rec.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })()}
        </div>

        {/* Recent Sleep Entries */}
        <div className="card">
          <h3 className="font-semibold mb-4 font-poppins">Recent Sleep</h3>
          <div className="space-y-3">
            {sleepEntries.slice(0, 7).map((entry) => (
              <div key={entry.id} className="p-4 bg-[#F5F7FA] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getMoodEmoji(entry.mood)}</div>
                    <div>
                      <h4 className="font-medium text-[#333333] font-poppins">
                        {new Date(entry.date).toLocaleDateString()}
                      </h4>
                      <p className="text-sm text-[#666666]">
                        {entry.bedtime} - {entry.wakeTime} ({entry.sleepDuration}h)
                      </p>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getQualityBg(entry.sleepQuality)} ${getQualityColor(entry.sleepQuality)}`}
                  >
                    {entry.sleepQuality}/5
                  </div>
                </div>

                {entry.notes && <p className="text-sm text-[#666666] mb-2 font-lora">{entry.notes}</p>}

                <div className="flex flex-wrap gap-1">
                  {entry.factors.map((factorId) => {
                    const factor = sleepFactors.find((f) => f.id === factorId)
                    return (
                      <span
                        key={factorId}
                        className={`text-xs px-2 py-1 rounded-full ${
                          factor?.positive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {factor?.label}
                      </span>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Add Sleep Entry Modal */}
      {showAddEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 font-poppins">Log Sleep Entry</h3>

            {/* Sleep Times */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Bedtime</label>
                <input
                  type="time"
                  value={newEntry.bedtime}
                  onChange={(e) => setNewEntry((prev) => ({ ...prev, bedtime: e.target.value }))}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Wake Time</label>
                <input
                  type="time"
                  value={newEntry.wakeTime}
                  onChange={(e) => setNewEntry((prev) => ({ ...prev, wakeTime: e.target.value }))}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                />
              </div>

              {newEntry.bedtime && newEntry.wakeTime && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    Sleep Duration: {calculateSleepDuration(newEntry.bedtime, newEntry.wakeTime).toFixed(1)} hours
                  </p>
                </div>
              )}
            </div>

            {/* Sleep Quality */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#333333] mb-2">
                Sleep Quality: {newEntry.sleepQuality}/5
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={newEntry.sleepQuality}
                onChange={(e) => setNewEntry((prev) => ({ ...prev, sleepQuality: Number(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Poor</span>
                <span>Fair</span>
                <span>Good</span>
                <span>Great</span>
                <span>Excellent</span>
              </div>
            </div>

            {/* Morning Mood */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#333333] mb-2">How did you feel waking up?</label>
              <div className="grid grid-cols-3 gap-2">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => setNewEntry((prev) => ({ ...prev, mood: mood.id }))}
                    className={`p-3 rounded-lg text-center transition-all ${
                      newEntry.mood === mood.id ? "bg-[#4A90E2] text-white" : "bg-[#F5F7FA] hover:bg-[#E8F4FD]"
                    }`}
                  >
                    <div className="text-xl mb-1">{mood.emoji}</div>
                    <div className="text-xs font-medium">{mood.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sleep Factors */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#333333] mb-2">What affected your sleep?</label>
              <div className="grid grid-cols-2 gap-2">
                {sleepFactors.map((factor) => (
                  <button
                    key={factor.id}
                    onClick={() => toggleFactor(factor.id)}
                    className={`p-2 rounded-lg text-sm transition-all ${
                      newEntry.factors.includes(factor.id)
                        ? factor.positive
                          ? "bg-green-100 text-green-700 border-2 border-green-300"
                          : "bg-red-100 text-red-700 border-2 border-red-300"
                        : "bg-[#F5F7FA] text-[#666666] hover:bg-[#E8F4FD]"
                    }`}
                  >
                    {factor.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#333333] mb-2">Notes (optional)</label>
              <textarea
                value={newEntry.notes}
                onChange={(e) => setNewEntry((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="How was your sleep? Any observations?"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] resize-none"
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddEntry(false)}
                className="flex-1 py-3 px-4 border border-gray-200 rounded-full text-[#666666] hover:bg-[#F5F7FA] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEntry}
                disabled={!newEntry.bedtime || !newEntry.wakeTime}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Entry
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation currentPage="sleep" />
    </div>
  )
}
