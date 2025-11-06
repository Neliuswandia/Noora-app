"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Video,
  Phone,
  MessageCircle,
  Calendar,
  Heart,
  CheckCircle,
  Award,
  Users,
  BookOpen,
  Globe,
} from "lucide-react"

import BottomNavigation from "@/components/BottomNavigation"

interface Review {
  id: string
  userName: string
  rating: number
  date: string
  comment: string
  verified: boolean
}

interface Therapist {
  id: string
  name: string
  credentials: string
  title: string
  specializations: string[]
  rating: number
  reviewCount: number
  yearsExperience: number
  distance: string
  nextAvailable: string
  acceptsInsurance: boolean
  languages: string[]
  sessionTypes: ("in-person" | "video" | "phone")[]
  rate: string
  bio: string
  image: string
  education: string[]
  certifications: string[]
  approaches: string[]
  availability: {
    [key: string]: string[]
  }
  reviews: Review[]
  verified: boolean
  responseTime: string
}

export default function TherapistProfile() {
  const params = useParams()
  const router = useRouter()
  const [isFavorited, setIsFavorited] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data - in real app, this would be fetched based on params.id
  const therapist: Therapist = {
    id: "1",
    name: "Dr. Sarah Chen",
    credentials: "PhD, Licensed Clinical Psychologist",
    title: "Clinical Psychologist specializing in Anxiety & Depression",
    specializations: [
      "Anxiety Disorders",
      "Depression",
      "Cognitive Behavioral Therapy",
      "Trauma Recovery",
      "Stress Management",
    ],
    rating: 4.9,
    reviewCount: 127,
    yearsExperience: 12,
    distance: "2.3 miles",
    nextAvailable: "Tomorrow at 2:00 PM",
    acceptsInsurance: true,
    languages: ["English", "Mandarin", "Cantonese"],
    sessionTypes: ["in-person", "video"],
    rate: "$150/session",
    bio: "Dr. Sarah Chen is a licensed clinical psychologist with over 12 years of experience helping adults navigate anxiety, depression, and life transitions. She specializes in cognitive behavioral therapy (CBT) and has extensive training in trauma-informed care. Dr. Chen believes in creating a warm, non-judgmental space where clients feel safe to explore their thoughts and feelings while developing practical coping strategies.",
    image: "/placeholder.svg?height=200&width=200",
    education: [
      "PhD in Clinical Psychology - Stanford University",
      "MA in Psychology - UC Berkeley",
      "BA in Psychology - UCLA",
    ],
    certifications: [
      "Licensed Clinical Psychologist (California)",
      "Certified CBT Therapist",
      "EMDR Level II Certified",
      "Trauma-Informed Care Specialist",
    ],
    approaches: [
      "Cognitive Behavioral Therapy (CBT)",
      "Mindfulness-Based Therapy",
      "EMDR",
      "Solution-Focused Therapy",
      "Psychodynamic Therapy",
    ],
    availability: {
      Monday: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
      Tuesday: ["10:00 AM", "1:00 PM", "3:00 PM"],
      Wednesday: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
      Thursday: ["10:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"],
      Friday: ["9:00 AM", "11:00 AM", "2:00 PM"],
      Saturday: ["10:00 AM", "12:00 PM"],
      Sunday: [],
    },
    reviews: [
      {
        id: "1",
        userName: "Jennifer M.",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Dr. Chen has been incredibly helpful in my journey with anxiety. Her approach is both professional and compassionate, and I always feel heard in our sessions.",
        verified: true,
      },
      {
        id: "2",
        userName: "Michael R.",
        rating: 5,
        date: "1 month ago",
        comment:
          "Excellent therapist! The CBT techniques she taught me have made a real difference in managing my depression. Highly recommend.",
        verified: true,
      },
      {
        id: "3",
        userName: "Lisa K.",
        rating: 4,
        date: "2 months ago",
        comment:
          "Very knowledgeable and patient. The video sessions work great for my schedule. Only wish she had more evening availability.",
        verified: true,
      },
    ],
    verified: true,
    responseTime: "Usually responds within 2 hours",
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "reviews", label: "Reviews" },
    { id: "availability", label: "Availability" },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card shadow-sm p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="p-2 hover:bg-muted rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <Heart className={`w-6 h-6 ${isFavorited ? "text-red-500 fill-current" : "text-muted-foreground"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Therapist Header */}
      <div className="bg-card p-6">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img
              src={therapist.image || "/placeholder.svg"}
              alt={therapist.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            {therapist.verified && (
              <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground font-poppins">{therapist.name}</h1>
            <p className="text-muted-foreground font-medium">{therapist.credentials}</p>
            <p className="text-sm text-muted-foreground mt-1">{therapist.title}</p>

            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium ml-1">{therapist.rating}</span>
                <span className="text-sm text-muted-foreground ml-1">({therapist.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                {therapist.distance}
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Award className="w-4 h-4 mr-1" />
                {therapist.yearsExperience} years experience
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                {therapist.responseTime}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{therapist.reviewCount}</div>
            <div className="text-xs text-muted-foreground">Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{therapist.yearsExperience}</div>
            <div className="text-xs text-muted-foreground">Years Exp.</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{therapist.specializations.length}</div>
            <div className="text-xs text-muted-foreground">Specialties</div>
          </div>
        </div>

        {/* Session Types & Rate */}
        <div className="flex items-center justify-between mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
          <div className="flex items-center space-x-3">
            {therapist.sessionTypes.includes("video") && (
              <div className="flex items-center text-blue-600 dark:text-blue-400">
                <Video className="w-4 h-4 mr-1" />
                <span className="text-sm">Video</span>
              </div>
            )}
            {therapist.sessionTypes.includes("phone") && (
              <div className="flex items-center text-blue-600 dark:text-blue-400">
                <Phone className="w-4 h-4 mr-1" />
                <span className="text-sm">Phone</span>
              </div>
            )}
            {therapist.sessionTypes.includes("in-person") && (
              <div className="flex items-center text-blue-600 dark:text-blue-400">
                <Users className="w-4 h-4 mr-1" />
                <span className="text-sm">In-Person</span>
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="font-bold text-foreground">{therapist.rate}</div>
            {therapist.acceptsInsurance && (
              <div className="text-xs text-green-600 dark:text-green-400">Insurance accepted</div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card border-b">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* About */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 font-poppins">About</h3>
              <p className="text-muted-foreground leading-relaxed font-lora">{therapist.bio}</p>
            </div>

            {/* Specializations */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 font-poppins">Specializations</h3>
              <div className="flex flex-wrap gap-2">
                {therapist.specializations.map((spec) => (
                  <span
                    key={spec}
                    className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Therapeutic Approaches */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 font-poppins">Therapeutic Approaches</h3>
              <div className="space-y-2">
                {therapist.approaches.map((approach) => (
                  <div key={approach} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-muted-foreground">{approach}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 font-poppins">Education</h3>
              <div className="space-y-2">
                {therapist.education.map((edu) => (
                  <div key={edu} className="flex items-center">
                    <BookOpen className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-muted-foreground">{edu}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 font-poppins">Languages</h3>
              <div className="flex items-center space-x-4">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{therapist.languages.join(", ")}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground font-poppins">Reviews ({therapist.reviewCount})</h3>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-lg font-bold ml-1">{therapist.rating}</span>
              </div>
            </div>

            {therapist.reviews.map((review) => (
              <div key={review.id} className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="font-medium text-foreground">{review.userName}</span>
                    {review.verified && <CheckCircle className="w-4 h-4 text-green-500 ml-2" />}
                  </div>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground font-lora">{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "availability" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground font-poppins">This Week's Availability</h3>
            <div className="space-y-3">
              {Object.entries(therapist.availability).map(([day, times]) => (
                <div key={day} className="bg-muted/50 rounded-lg p-4">
                  <div className="font-medium text-foreground mb-2">{day}</div>
                  {times.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {times.map((time) => (
                        <button
                          key={time}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">No availability</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Buttons */}
      <div className="fixed bottom-20 left-0 right-0 bg-card border-t p-4">
        <div className="flex space-x-3">
          <button className="flex-1 bg-muted text-foreground py-3 rounded-lg font-medium flex items-center justify-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            Message
          </button>
          <a href={`/booking?therapist=${therapist.id}`} className="flex-1">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center">
              <Calendar className="w-5 h-5 mr-2" />
              Book Session
            </button>
          </a>
        </div>
      </div>

      <BottomNavigation currentPage="therapist" />
    </div>
  )
}
