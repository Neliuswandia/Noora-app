"use client"

import { useState } from "react"
import { Search, Filter, MapPin, Star, Video, Phone, Calendar, Heart } from "lucide-react"
import BottomNavigation from "@/components/BottomNavigation"


interface Therapist {
  id: string
  name: string
  credentials: string
  specializations: string[]
  rating: number
  reviewCount: number
  distance: string
  nextAvailable: string
  acceptsInsurance: boolean
  languages: string[]
  sessionTypes: ("in-person" | "video" | "phone")[]
  rate: string
  bio: string
  image: string
}

export default function FindTherapist() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const therapists: Therapist[] = [
    {
      id: "1",
      name: "Dr. Sarah Chen",
      credentials: "PhD, Licensed Clinical Psychologist",
      specializations: ["Anxiety", "Depression", "CBT"],
      rating: 4.9,
      reviewCount: 127,
      distance: "2.3 miles",
      nextAvailable: "Tomorrow at 2:00 PM",
      acceptsInsurance: true,
      languages: ["English", "Mandarin"],
      sessionTypes: ["in-person", "video"],
      rate: "$150/session",
      bio: "Specializing in cognitive behavioral therapy with over 10 years of experience helping adults with anxiety and depression.",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "2",
      name: "Marcus Johnson, LMFT",
      credentials: "Licensed Marriage & Family Therapist",
      specializations: ["Trauma", "PTSD", "Relationships"],
      rating: 4.8,
      reviewCount: 89,
      distance: "4.1 miles",
      nextAvailable: "Friday at 10:00 AM",
      acceptsInsurance: true,
      languages: ["English", "Spanish"],
      sessionTypes: ["in-person", "video", "phone"],
      rate: "$120/session",
      bio: "Trauma-informed therapist with expertise in EMDR and helping individuals heal from past experiences.",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      credentials: "PsyD, Clinical Psychologist",
      specializations: ["Young Adults", "Life Transitions", "Mindfulness"],
      rating: 4.7,
      reviewCount: 156,
      distance: "1.8 miles",
      nextAvailable: "Next week",
      acceptsInsurance: false,
      languages: ["English", "Spanish"],
      sessionTypes: ["video"],
      rate: "$180/session",
      bio: "Specializing in helping young adults navigate life transitions with mindfulness-based approaches.",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const filterOptions = [
    { id: "anxiety", label: "Anxiety", category: "specialization" },
    { id: "depression", label: "Depression", category: "specialization" },
    { id: "trauma", label: "Trauma", category: "specialization" },
    { id: "relationships", label: "Relationships", category: "specialization" },
    { id: "insurance", label: "Accepts Insurance", category: "payment" },
    { id: "video", label: "Video Sessions", category: "format" },
    { id: "in-person", label: "In-Person", category: "format" },
    { id: "spanish", label: "Spanish Speaking", category: "language" },
  ]

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) => (prev.includes(filterId) ? prev.filter((f) => f !== filterId) : [...prev, filterId]))
  }

  return (
    <div className="overflow-auto h-screen bg-background text-black pb-20">
      {/* Header */}
      <header className="bg-card shadow-sm p-6">
        <h1 className="text-2xl font-bold text-foreground font-poppins mb-4">Find a Therapist</h1>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, specialization, or location..."
            className="w-full pl-10 pr-4 py-3 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between">
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center text-primary font-medium">
            <Filter className="w-5 h-5 mr-2" />
            Filters {selectedFilters.length > 0 && `(${selectedFilters.length})`}
          </button>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            Within 10 miles
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-foreground mb-2">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {filterOptions
                    .filter((f) => f.category === "specialization")
                    .map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => toggleFilter(filter.id)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          selectedFilters.includes(filter.id)
                            ? "bg-primary text-primary-foreground"
                            : "bg-card text-muted-foreground border border-border"
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">Session Format</h4>
                <div className="flex flex-wrap gap-2">
                  {filterOptions
                    .filter((f) => f.category === "format")
                    .map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => toggleFilter(filter.id)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          selectedFilters.includes(filter.id)
                            ? "bg-primary text-primary-foreground"
                            : "bg-card text-muted-foreground border border-border"
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">Other</h4>
                <div className="flex flex-wrap gap-2">
                  {filterOptions
                    .filter((f) => !["specialization", "format"].includes(f.category))
                    .map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => toggleFilter(filter.id)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          selectedFilters.includes(filter.id)
                            ? "bg-primary text-primary-foreground"
                            : "bg-card text-muted-foreground border border-border"
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="p-6 space-y-4">
        {/* Results Header */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground font-lora">{therapists.length} therapists found</p>
          <button className="text-primary text-sm font-medium">Sort by: Availability</button>
        </div>

        {/* Therapist Cards */}
        {therapists.map((therapist) => (
          <div key={therapist.id} className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <div className="flex items-start space-x-4">
              <img
                src={therapist.image || "/placeholder.svg"}
                alt={therapist.name}
                className="w-20 h-20 rounded-full object-cover"
              />

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground font-poppins">{therapist.name}</h3>
                    <p className="text-sm text-muted-foreground">{therapist.credentials}</p>
                  </div>
                  <button className="p-2 text-muted-foreground hover:text-red-500">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">{therapist.rating}</span>
                    <span className="text-sm text-muted-foreground ml-1">({therapist.reviewCount})</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {therapist.distance}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {therapist.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground font-lora mb-3 line-clamp-2">{therapist.bio}</p>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <p className="text-foreground font-medium">Next available:</p>
                    <p className="text-muted-foreground">{therapist.nextAvailable}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{therapist.rate}</p>
                    {therapist.acceptsInsurance && <p className="text-xs text-primary">Insurance accepted</p>}
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-4">
                  <div className="flex space-x-1">
                    {therapist.sessionTypes.includes("video") && (
                      <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded">
                        <Video className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    )}
                    {therapist.sessionTypes.includes("phone") && (
                      <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded">
                        <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1" />
                  <a href={`/therapist/${therapist.id}`}>
                    <button className="bg-muted text-foreground px-4 py-2 text-sm rounded-lg hover:bg-muted/80 transition-colors">
                      View Profile
                    </button>
                  </a>
                  <a href={`/booking?therapist=${therapist.id}`}>
                    <button className="bg-primary text-primary-foreground px-4 py-2 text-sm rounded-lg hover:bg-primary/90 transition-colors flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Book Now
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Load More */}
        <div className="text-center pt-4">
          <button className="bg-muted text-foreground px-6 py-3 rounded-lg hover:bg-muted/80 transition-colors">
            Load More Therapists
          </button>
        </div>
      </main>

      <BottomNavigation currentPage="therapist" />
    </div>
  )
}
