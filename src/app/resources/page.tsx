"use client"

import { useState } from "react"
import { Search, Filter, Bookmark, BookmarkCheck, Play, FileText, ImageIcon, Users, Shield } from "lucide-react"
import BottomNavigation from "@/components/BottomNavigation"


interface Resource {
  id: string
  title: string
  type: "article" | "video" | "infographic"
  category: string
  summary: string
  readTime: string
  image: string
  author: string
  isBookmarked: boolean
  culturalTag?: string
  content?: string
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [bookmarkedResources, setBookmarkedResources] = useState<string[]>([])

  const resources: Resource[] = [
    {
      id: "1",
      title: "Understanding Anxiety: What Your Body Is Telling You",
      type: "article",
      category: "anxiety",
      summary:
        "Learn about the physical and emotional signs of anxiety and how to recognize when your body is responding to stress.",
      readTime: "3 min read",
      image: "/placeholder.svg?height=120&width=200",
      author: "Dr. Maria Rodriguez, PhD",
      isBookmarked: false,
      content: "Anxiety is your body's natural response to stress and potential threats...",
    },
    {
      id: "2",
      title: "CBT Basics: Changing Thought Patterns",
      type: "video",
      category: "therapy",
      summary:
        "A therapist explains the fundamentals of Cognitive Behavioral Therapy and how it can help reshape negative thinking.",
      readTime: "2 min watch",
      image: "/placeholder.svg?height=120&width=200",
      author: "Dr. James Chen, LMFT",
      isBookmarked: true,
    },
    {
      id: "3",
      title: "5 Grounding Techniques for Panic Attacks",
      type: "infographic",
      category: "coping",
      summary:
        "Visual guide to five evidence-based grounding techniques you can use anywhere to manage panic and overwhelming feelings.",
      readTime: "1 min view",
      image: "/placeholder.svg?height=120&width=200",
      author: "SerenitySpace Clinical Team",
      isBookmarked: false,
    },
    {
      id: "4",
      title: "Mental Health in the Black Community: Breaking Stigma",
      type: "article",
      category: "cultural",
      summary:
        "Addressing unique challenges and cultural considerations for mental health support in Black communities.",
      readTime: "4 min read",
      image: "/placeholder.svg?height=120&width=200",
      author: "Dr. Aisha Williams, PsyD",
      isBookmarked: false,
      culturalTag: "BIPOC",
    },
    {
      id: "5",
      title: "LGBTQ+ Affirming Self-Care Practices",
      type: "video",
      category: "self-care",
      summary:
        "Culturally affirming self-care strategies specifically designed for LGBTQ+ individuals navigating mental health.",
      readTime: "2 min watch",
      image: "/placeholder.svg?height=120&width=200",
      author: "Dr. Alex Thompson, LCSW",
      isBookmarked: true,
      culturalTag: "LGBTQ+",
    },
    {
      id: "6",
      title: "Sleep and Mental Health Connection",
      type: "infographic",
      category: "wellness",
      summary:
        "Discover how sleep quality directly impacts your mental health and practical tips for better sleep hygiene.",
      readTime: "2 min view",
      image: "/placeholder.svg?height=120&width=200",
      author: "Dr. Sarah Kim, MD",
      isBookmarked: false,
    },
  ]

  const categories = [
    { id: "all", label: "All Topics", count: resources.length },
    { id: "anxiety", label: "Anxiety", count: resources.filter((r) => r.category === "anxiety").length },
    { id: "depression", label: "Depression", count: resources.filter((r) => r.category === "depression").length },
    { id: "therapy", label: "Therapy", count: resources.filter((r) => r.category === "therapy").length },
    { id: "coping", label: "Coping Skills", count: resources.filter((r) => r.category === "coping").length },
    { id: "self-care", label: "Self-Care", count: resources.filter((r) => r.category === "self-care").length },
    { id: "cultural", label: "Cultural", count: resources.filter((r) => r.category === "cultural").length },
    { id: "wellness", label: "Wellness", count: resources.filter((r) => r.category === "wellness").length },
  ]

  const types = [
    { id: "all", label: "All Formats" },
    { id: "article", label: "Articles" },
    { id: "video", label: "Videos" },
    { id: "infographic", label: "Infographics" },
  ]

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.summary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    const matchesType = selectedType === "all" || resource.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  const toggleBookmark = (resourceId: string) => {
    setBookmarkedResources((prev) =>
      prev.includes(resourceId) ? prev.filter((id) => id !== resourceId) : [...prev, resourceId],
    )
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return FileText
      case "video":
        return Play
      case "infographic":
        return ImageIcon
      default:
        return FileText
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#4A90E2] to-[#A3D8C6] text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold font-poppins">Learn & Grow</h1>
            <p className="font-lora italic opacity-90">Evidence-based mental health resources</p>
          </div>
          <a href="/crisis-support">
            <button className="p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors">
              <Shield className="w-5 h-5" />
            </button>
          </a>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white opacity-70 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles, videos, and guides..."
            className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-full text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          />
        </div>

        {/* Filter Toggle */}
        <button onClick={() => setShowFilters(!showFilters)} className="flex items-center text-white font-medium">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </button>
      </header>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border-b p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-[#333333] mb-3 font-poppins">Topics</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
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

          <div>
            <h3 className="font-semibold text-[#333333] mb-3 font-poppins">Format</h3>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedType === type.id
                      ? "bg-[#A3D8C6] text-[#333333]"
                      : "bg-[#F5F7FA] text-[#666666] hover:bg-[#E8F4FD]"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="p-6 space-y-6">

        {/* Cultural Resources Highlight */}
        {/* <div className="card border-l-4 border-[#A3D8C6]">
          <div className="flex items-center mb-3">
            <Users className="w-6 h-6 text-[#A3D8C6] mr-3" />
            <h3 className="font-semibold text-[#333333] font-poppins">Culturally Affirming Resources</h3>
          </div>
          <p className="text-[#666666] font-lora text-sm mb-4">
            Mental health support that honors your identity and cultural background.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs bg-[#A3D8C6] bg-opacity-20 text-[#333333] px-3 py-1 rounded-full">
              BIPOC Mental Health
            </span>
            <span className="text-xs bg-[#A3D8C6] bg-opacity-20 text-[#333333] px-3 py-1 rounded-full">
              LGBTQ+ Affirming
            </span>
            <span className="text-xs bg-[#A3D8C6] bg-opacity-20 text-[#333333] px-3 py-1 rounded-full">
              Multilingual
            </span>
          </div>
        </div> */}

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <p className="text-[#666666] font-lora">{filteredResources.length} resources found</p>
          <a href="/resources/bookmarks">
            <button className="flex items-center text-[#4A90E2] text-sm font-medium">
              <Bookmark className="w-4 h-4 mr-1" />
              My Bookmarks ({bookmarkedResources.length})
            </button>
          </a>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type)
            const isBookmarked = bookmarkedResources.includes(resource.id)

            return (
              <div key={resource.id} className="card hover:shadow-lg transition-all duration-200 animate-fade-in">
                <div className="relative mb-4">
                  <img
                    src={resource.image || "/placeholder.svg"}
                    alt={resource.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 left-2 flex items-center bg-white bg-opacity-90 px-2 py-1 rounded-full">
                    <TypeIcon className="w-3 h-3 mr-1 text-[#4A90E2]" />
                    <span className="text-xs font-medium text-[#333333] capitalize">{resource.type}</span>
                  </div>
                  <button
                    onClick={() => toggleBookmark(resource.id)}
                    className="absolute top-2 right-2 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-colors"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-[#FF6F61]" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-[#666666]" />
                    )}
                  </button>
                  {resource.culturalTag && (
                    <div className="absolute bottom-2 left-2 bg-[#A3D8C6] text-[#333333] px-2 py-1 rounded-full text-xs font-medium">
                      {resource.culturalTag}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-[#333333] font-poppins mb-2 line-clamp-2">{resource.title}</h3>
                    <p className="text-[#666666] font-lora text-sm leading-relaxed line-clamp-3">{resource.summary}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-3">
                      <span className="text-[#666666]">{resource.readTime}</span>
                      <span className="text-xs bg-[#4A90E2] bg-opacity-10 text-[#4A90E2] px-2 py-1 rounded-full">
                        {resource.category}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs text-[#666666] mb-3">By {resource.author}</p>
                    <a href={`/resources/${resource.id}`}>
                      <button className="btn-primary w-full text-sm">
                        {resource.type === "video"
                          ? "Watch Now"
                          : resource.type === "infographic"
                            ? "View Guide"
                            : "Read Article"}
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Load More */}
        {filteredResources.length > 6 && (
          <div className="text-center">
            <button className="btn-secondary">Load More Resources</button>
          </div>
        )}

        {/* Disclaimer */}
        <div className="card bg-[#FFF9E6] border border-[#FFE066]">
          <div className="flex items-start">
            <Shield className="w-5 h-5 text-[#FF6F61] mr-3 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-[#333333] mb-2 font-poppins">Important Notice</h4>
              <p className="text-[#666666] font-lora text-sm leading-relaxed">
                All content is reviewed by licensed mental health professionals. These resources are educational and not
                a substitute for professional mental health treatment. If you're experiencing a crisis, please contact
                our crisis support immediately.
              </p>
              <a href="/crisis-support" className="inline-block mt-3">
                <button className="text-[#FF6F61] font-medium text-sm hover:underline">Crisis Support →</button>
              </a>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation currentPage="learn" />
    </div>
  )
}
