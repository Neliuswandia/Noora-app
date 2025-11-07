"use client"

import { useState } from "react"
import { Play, Pause, Heart, Headphones, BookOpen, Share2, Plus, Clock } from "lucide-react"
import BottomNavigation from "@/components/BottomNavigation"

interface CopingTool {
  id: string
  title: string
  type: "meditation" | "breathing" | "affirmation" | "exercise" | "audio"
  duration: number
  description: string
  isFavorite: boolean
  category: string
}

export default function CopingKit() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isPlaying, setIsPlaying] = useState<string | null>(null)
  const [showCreateKit, setShowCreateKit] = useState(false)

  const copingTools: CopingTool[] = [
    {
      id: "1",
      title: "5-Minute Breathing Space",
      type: "breathing",
      duration: 5,
      description: "A gentle breathing exercise to center yourself",
      isFavorite: true,
      category: "anxiety",
    },
    {
      id: "2",
      title: "Body Scan Meditation",
      type: "meditation",
      duration: 10,
      description: "Progressive relaxation for your entire body",
      isFavorite: false,
      category: "stress",
    },
    {
      id: "3",
      title: "Positive Affirmations",
      type: "affirmation",
      duration: 3,
      description: "Uplifting statements to boost your mood",
      isFavorite: true,
      category: "depression",
    },
    {
      id: "4",
      title: "Grounding Exercise",
      type: "exercise",
      duration: 7,
      description: "5-4-3-2-1 technique to stay present",
      isFavorite: false,
      category: "anxiety",
    },
    {
      id: "5",
      title: "Nature Sounds",
      type: "audio",
      duration: 15,
      description: "Calming sounds of rain and forest",
      isFavorite: true,
      category: "stress",
    },
  ]

  const categories = [
    { id: "all", label: "All Tools", count: copingTools.length },
    { id: "anxiety", label: "Anxiety", count: copingTools.filter((t) => t.category === "anxiety").length },
    { id: "stress", label: "Stress", count: copingTools.filter((t) => t.category === "stress").length },
    { id: "depression", label: "Depression", count: copingTools.filter((t) => t.category === "depression").length },
    { id: "favorites", label: "Favorites", count: copingTools.filter((t) => t.isFavorite).length },
  ]

  const filteredTools = copingTools.filter((tool) => {
    if (selectedCategory === "all") return true
    if (selectedCategory === "favorites") return tool.isFavorite
    return tool.category === selectedCategory
  })

  const handlePlayPause = (toolId: string) => {
    if (isPlaying === toolId) {
      setIsPlaying(null)
    } else {
      setIsPlaying(toolId)
    }
  }

  const getToolIcon = (type: string) => {
    switch (type) {
      case "meditation":
        return BookOpen
      case "breathing":
        return Heart
      case "affirmation":
        return Heart
      case "exercise":
        return BookOpen
      case "audio":
        return Headphones
      default:
        return BookOpen
    }
  }

  return (
    <div className="overflow-auto h-screen bg-[#F5F7FA] pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#333333] font-poppins">Coping Kit</h1>
            <p className="text-[#666666] font-lora">Tools to help you feel better</p>
          </div>
          <button onClick={() => setShowCreateKit(true)} className="btn-primary p-3 rounded-full">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* Quick Access */}
        <div className="card">
          <h3 className="font-semibold mb-4 font-poppins">Quick Relief</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="btn-crisis p-4 rounded-xl text-left">
              <Heart className="w-6 h-6 mb-2" />
              <div className="text-sm font-medium">Emergency Calm</div>
              <div className="text-xs opacity-90">2 min breathing</div>
            </button>
            <button className="btn-secondary p-4 rounded-xl text-left">
              <Headphones className="w-6 h-6 mb-2" />
              <div className="text-sm font-medium">Instant Audio</div>
              <div className="text-xs opacity-90">Calming sounds</div>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="card">
          <h3 className="font-semibold mb-4 font-poppins">Categories</h3>
          <div className="flex overflow-x-auto space-x-2 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-[#4A90E2] text-white"
                    : "bg-[#F5F7FA] text-[#666666] hover:bg-[#E8F4FD]"
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Tools List */}
        <div className="space-y-4">
          {filteredTools.map((tool) => {
            const Icon = getToolIcon(tool.type)
            return (
              <div key={tool.id} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="w-12 h-12 bg-linear-to-br from-[#4A90E2] to-[#A3D8C6] rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#333333] font-poppins">{tool.title}</h4>
                      <p className="text-sm text-[#666666] font-lora mt-1">{tool.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center text-xs text-[#666666]">
                          <Clock className="w-3 h-3 mr-1" />
                          {tool.duration} min
                        </div>
                        <span className="text-xs bg-[#A3D8C6] text-[#333333] px-2 py-1 rounded-full">
                          {tool.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className={`p-2 rounded-full ${tool.isFavorite ? "text-[#FF6F61]" : "text-[#666666]"}`}>
                      <Heart className={`w-5 h-5 ${tool.isFavorite ? "fill-current" : ""}`} />
                    </button>
                    <button onClick={() => handlePlayPause(tool.id)} className="btn-primary p-3 rounded-full">
                      {isPlaying === tool.id ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* My Custom Kits */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold font-poppins">My Custom Kits</h3>
            <button className="text-[#4A90E2] text-sm font-medium">View All</button>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-[#F5F7FA] rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-[#333333] font-poppins">Morning Routine</h4>
                  <p className="text-sm text-[#666666] font-lora">3 tools • 15 min total</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-[#666666] hover:text-[#4A90E2]">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="btn-secondary px-4 py-2 text-sm">Start Kit</button>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#F5F7FA] rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-[#333333] font-poppins">Bedtime Wind-Down</h4>
                  <p className="text-sm text-[#666666] font-lora">4 tools • 20 min total</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-[#666666] hover:text-[#4A90E2]">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="btn-secondary px-4 py-2 text-sm">Start Kit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Create Kit Modal */}
      {showCreateKit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 font-poppins">Create Custom Kit</h3>
            <p className="text-[#666666] font-lora mb-6">Combine your favorite tools into a personalized coping kit.</p>

            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Kit name (e.g., 'Morning Calm')"
                className="w-full p-3 border border-gray-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
              />
              <textarea
                placeholder="Description (optional)"
                className="w-full p-3 border border-gray-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent resize-none"
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateKit(false)}
                className="flex-1 py-3 px-4 border border-gray-200 rounded-full text-[#666666] hover:bg-[#F5F7FA] transition-colors"
              >
                Cancel
              </button>
              <button onClick={() => setShowCreateKit(false)} className="flex-1 btn-primary">
                Create Kit
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation currentPage="coping" />
    </div>
  )
}
