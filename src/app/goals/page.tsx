"use client"

import { useState } from "react"
import { Target, Plus, CheckCircle, Calendar, TrendingUp, Star, Award, Trash2 } from "lucide-react"
import BottomNavigation from "@/components/BottomNavigation"

interface Goal {
  id: string
  title: string
  description: string
  category: "mental-health" | "self-care" | "habits" | "therapy" | "social" | "physical"
  type: "daily" | "weekly" | "monthly" | "one-time"
  targetValue: number
  currentValue: number
  unit: string
  startDate: string
  endDate?: string
  completed: boolean
  streak: number
  lastUpdated: string
  priority: "low" | "medium" | "high"
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Daily Meditation",
      description: "Practice mindfulness meditation for better mental clarity",
      category: "mental-health",
      type: "daily",
      targetValue: 10,
      currentValue: 7,
      unit: "minutes",
      startDate: "2024-01-01",
      completed: false,
      streak: 5,
      lastUpdated: "2024-01-15",
      priority: "high",
    },
    {
      id: "2",
      title: "Weekly Therapy Sessions",
      description: "Attend regular therapy sessions for ongoing support",
      category: "therapy",
      type: "weekly",
      targetValue: 1,
      currentValue: 1,
      unit: "session",
      startDate: "2024-01-01",
      completed: true,
      streak: 3,
      lastUpdated: "2024-01-14",
      priority: "high",
    },
    {
      id: "3",
      title: "Social Connection",
      description: "Reach out to friends or family members",
      category: "social",
      type: "weekly",
      targetValue: 3,
      currentValue: 2,
      unit: "interactions",
      startDate: "2024-01-08",
      completed: false,
      streak: 2,
      lastUpdated: "2024-01-13",
      priority: "medium",
    },
    {
      id: "4",
      title: "Gratitude Journal",
      description: "Write down three things I'm grateful for each day",
      category: "self-care",
      type: "daily",
      targetValue: 3,
      currentValue: 3,
      unit: "entries",
      startDate: "2024-01-10",
      completed: true,
      streak: 6,
      lastUpdated: "2024-01-15",
      priority: "medium",
    },
  ])

  const [showAddGoal, setShowAddGoal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "mental-health" as Goal["category"],
    type: "daily" as Goal["type"],
    targetValue: 1,
    unit: "times",
    priority: "medium" as Goal["priority"],
  })
  const [mood, setMood] = useState<string | null>(null)
  const [showMoodPicker, setShowMoodPicker] = useState(false)
  const [moodNote, setMoodNote] = useState("")

  const categories = [
    { id: "all", label: "All Goals", icon: "🎯", color: "bg-gray-100" },
    { id: "mental-health", label: "Mental Health", icon: "🧠", color: "bg-blue-100" },
    { id: "self-care", label: "Self Care", icon: "💆", color: "bg-green-100" },
    { id: "habits", label: "Habits", icon: "🔄", color: "bg-purple-100" },
    { id: "therapy", label: "Therapy", icon: "💬", color: "bg-teal-100" },
    { id: "social", label: "Social", icon: "👥", color: "bg-orange-100" },
    { id: "physical", label: "Physical", icon: "🏃", color: "bg-red-100" },
  ]

  const filteredGoals = selectedCategory === "all" ? goals : goals.filter((goal) => goal.category === selectedCategory)

  const getProgressPercentage = (goal: Goal) => {
    return Math.min((goal.currentValue / goal.targetValue) * 100, 100)
  }

  const updateGoalProgress = (goalId: string, increment: number) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        if (goal.id === goalId) {
          const newValue = Math.max(0, goal.currentValue + increment)
          const completed = newValue >= goal.targetValue
          const newStreak = completed && increment > 0 ? goal.streak + 1 : goal.streak

          return {
            ...goal,
            currentValue: newValue,
            completed,
            streak: newStreak,
            lastUpdated: new Date().toISOString().split("T")[0],
          }
        }
        return goal
      }),
    )
  }

  const addNewGoal = () => {
    if (!newGoal.title.trim()) return

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      category: newGoal.category,
      type: newGoal.type,
      targetValue: newGoal.targetValue,
      currentValue: 0,
      unit: newGoal.unit,
      startDate: new Date().toISOString().split("T")[0],
      completed: false,
      streak: 0,
      lastUpdated: new Date().toISOString().split("T")[0],
      priority: newGoal.priority,
    }

    setGoals((prev) => [...prev, goal])
    setNewGoal({
      title: "",
      description: "",
      category: "mental-health",
      type: "daily",
      targetValue: 1,
      unit: "times",
      priority: "medium",
    })
    setShowAddGoal(false)
  }

  const deleteGoal = (goalId: string) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== goalId))
  }

  const getGoalStats = () => {
    const totalGoals = goals.length
    const completedGoals = goals.filter((goal) => goal.completed).length
    const activeStreaks = goals.filter((goal) => goal.streak > 0).length
    const highPriorityGoals = goals.filter((goal) => goal.priority === "high").length

    return { totalGoals, completedGoals, activeStreaks, highPriorityGoals }
  }

  const stats = getGoalStats()

  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#333333] font-poppins">Goals & Progress</h1>
            <p className="text-[#666666] font-lora">Set and track your wellness journey</p>
          </div>
          <button onClick={() => setShowAddGoal(true)} className="btn-primary p-3 rounded-full">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="card text-center">
            <Target className="w-6 h-6 text-[#4A90E2] mx-auto mb-2" />
            <h3 className="font-semibold text-lg font-poppins">{stats.totalGoals}</h3>
            <p className="text-xs text-[#666666]">Total Goals</p>
          </div>
          <div className="card text-center">
            <CheckCircle className="w-6 h-6 text-[#A3D8C6] mx-auto mb-2" />
            <h3 className="font-semibold text-lg font-poppins">{stats.completedGoals}</h3>
            <p className="text-xs text-[#666666]">Completed</p>
          </div>
          <div className="card text-center">
            <TrendingUp className="w-6 h-6 text-[#FF6F61] mx-auto mb-2" />
            <h3 className="font-semibold text-lg font-poppins">{stats.activeStreaks}</h3>
            <p className="text-xs text-[#666666]">Active Streaks</p>
          </div>
          <div className="card text-center">
            <Star className="w-6 h-6 text-[#FFA500] mx-auto mb-2" />
            <h3 className="font-semibold text-lg font-poppins">{stats.highPriorityGoals}</h3>
            <p className="text-xs text-[#666666]">High Priority</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="card">
          <h3 className="font-semibold mb-3 font-poppins">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-[#4A90E2] text-white shadow-md"
                    : `${category.color} text-[#333333] hover:shadow-sm`
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Goals List */}
        <div className="space-y-4">
          {filteredGoals.length === 0 ? (
            <div className="card text-center py-8">
              <Target className="w-12 h-12 text-[#A3D8C6] mx-auto mb-4" />
              <h3 className="font-semibold text-[#333333] font-poppins mb-2">No Goals Yet</h3>
              <p className="text-[#666666] font-lora mb-4">
                {selectedCategory === "all"
                  ? "Start your wellness journey by setting your first goal!"
                  : `No goals in the ${categories.find((c) => c.id === selectedCategory)?.label} category yet.`}
              </p>
              <button onClick={() => setShowAddGoal(true)} className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Goal
              </button>
            </div>
          ) : (
            filteredGoals.map((goal) => (
              <div key={goal.id} className="card">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-[#333333] font-poppins">{goal.title}</h4>
                      {goal.priority === "high" && <Star className="w-4 h-4 text-[#FFA500]" />}
                      {goal.completed && <CheckCircle className="w-4 h-4 text-[#A3D8C6]" />}
                    </div>
                    <p className="text-sm text-[#666666] font-lora mb-2">{goal.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-[#666666]">
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {goal.type}
                      </span>
                      {goal.streak > 0 && (
                        <span className="flex items-center text-[#FF6F61]">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {goal.streak} day streak
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="text-[#666666] hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-[#333333]">
                      {goal.currentValue} / {goal.targetValue} {goal.unit}
                    </span>
                    <span className="text-sm text-[#666666]">{Math.round(getProgressPercentage(goal))}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        goal.completed ? "bg-[#A3D8C6]" : "bg-[#4A90E2]"
                      }`}
                      style={{ width: `${getProgressPercentage(goal)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateGoalProgress(goal.id, 1)}
                    disabled={goal.completed}
                    className="flex-1 bg-[#4A90E2] hover:bg-[#3A7BC8] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-1 inline" />
                    Add Progress
                  </button>
                  {goal.currentValue > 0 && (
                    <button
                      onClick={() => updateGoalProgress(goal.id, -1)}
                      className="bg-gray-200 hover:bg-gray-300 text-[#333333] py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                    >
                      Undo
                    </button>
                  )}
                </div>

                {/* Completion Celebration */}
                {goal.completed && (
                  <div className="mt-3 p-3 bg-gradient-to-r from-[#A3D8C6] to-[#4A90E2] rounded-lg text-white text-center">
                    <Award className="w-5 h-5 mx-auto mb-1" />
                    <p className="text-sm font-medium">Goal Completed! 🎉</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Mood Picker */}

        {showMoodPicker && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-xs shadow-lg">
              <h4 className="font-semibold mb-3 text-center">Pick your mood</h4>
              <div className="flex justify-center gap-3 mb-4">
                {["😄", "🙂", "😐", "😔", "😭"].map((emoji) => (
                  <button
                    key={emoji}
                    className={`text-3xl transition-transform hover:scale-125 ${
                      mood === emoji ? "ring-2 ring-[#4A90E2]" : ""
                    }`}
                    onClick={() => setMood(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <textarea
                className="w-full border border-gray-200 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#4A90E2] resize-none"
                rows={2}
                placeholder="Write a short note about your mood..."
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  className="flex-1 py-2 rounded-full border border-gray-200 text-[#666] hover:bg-[#F5F7FA] transition"
                  onClick={() => setShowMoodPicker(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 py-2 rounded-full bg-[#4A90E2] text-white font-semibold hover:bg-[#3A7BC8] transition"
                  onClick={() => setShowMoodPicker(false)}
                  disabled={!mood}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 font-poppins">Create New Goal</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Goal Title</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="e.g., Daily meditation"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Description</label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  placeholder="Why is this goal important to you?"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Category</label>
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as Goal["category"] })}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                >
                  {categories.slice(1).map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Frequency</label>
                  <select
                    value={newGoal.type}
                    onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value as Goal["type"] })}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="one-time">One-time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Priority</label>
                  <select
                    value={newGoal.priority}
                    onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value as Goal["priority"] })}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Target</label>
                  <input
                    type="number"
                    value={newGoal.targetValue}
                    onChange={(e) => setNewGoal({ ...newGoal, targetValue: Number.parseInt(e.target.value) || 1 })}
                    min="1"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Unit</label>
                  <input
                    type="text"
                    value={newGoal.unit}
                    onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                    placeholder="e.g., minutes, times"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddGoal(false)}
                className="flex-1 py-3 px-4 border border-gray-200 rounded-full text-[#666666] hover:bg-[#F5F7FA] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addNewGoal}
                disabled={!newGoal.title.trim()}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Goal
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation currentPage="goals" />
    </div>
  )
}
