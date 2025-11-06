"use client"

import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight, Heart, Star, Bookmark } from "lucide-react"

interface Affirmation {
  id: string
  text: string
  category: string
  color: string
  emoji: string
}

interface AffirmationFlashcardsProps {
  isOpen: boolean
  onClose: () => void
  earnedAffirmations: Affirmation[]
  onSave?: (affirmation: Affirmation) => void
}

const allAffirmations: Affirmation[] = [
  {
    id: "joy-1",
    text: "Joy fills your heart and lights up your world! ✨",
    category: "Joy",
    color: "#FFD700",
    emoji: "😊",
  },
  {
    id: "joy-2",
    text: "Your happiness is a gift to yourself and others around you.",
    category: "Joy",
    color: "#FFD700",
    emoji: "😊",
  },
  {
    id: "calm-1",
    text: "You are centered, peaceful, and in control. 🧘‍♀️",
    category: "Calm",
    color: "#87CEEB",
    emoji: "😌",
  },
  {
    id: "calm-2",
    text: "In stillness, you find your strength and clarity.",
    category: "Calm",
    color: "#87CEEB",
    emoji: "😌",
  },
  {
    id: "love-1",
    text: "You are worthy of love and capable of giving love. 💕",
    category: "Love",
    color: "#FF69B4",
    emoji: "💖",
  },
  {
    id: "love-2",
    text: "Love flows through you and touches everyone you meet.",
    category: "Love",
    color: "#FF69B4",
    emoji: "💖",
  },
  {
    id: "hope-1",
    text: "Every new day brings fresh possibilities and hope. 🌅",
    category: "Hope",
    color: "#98FB98",
    emoji: "🌟",
  },
  {
    id: "hope-2",
    text: "Your dreams are valid and within your reach.",
    category: "Hope",
    color: "#98FB98",
    emoji: "🌟",
  },
  {
    id: "peace-1",
    text: "Inner peace is your natural state of being. 🕊️",
    category: "Peace",
    color: "#DDA0DD",
    emoji: "☮️",
  },
  {
    id: "peace-2",
    text: "You carry tranquility within you wherever you go.",
    category: "Peace",
    color: "#DDA0DD",
    emoji: "☮️",
  },
  {
    id: "gratitude-1",
    text: "Gratitude transforms ordinary moments into blessings. 🌸",
    category: "Gratitude",
    color: "#F0E68C",
    emoji: "🙏",
  },
  {
    id: "gratitude-2",
    text: "Your grateful heart attracts more reasons to be thankful.",
    category: "Gratitude",
    color: "#F0E68C",
    emoji: "🙏",
  },
]

export function AffirmationFlashcards({ isOpen, onClose, earnedAffirmations, onSave }: AffirmationFlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [savedAffirmations, setSavedAffirmations] = useState<Set<string>>(new Set())

  // Use earned affirmations or show random ones if none earned
  const displayAffirmations = earnedAffirmations.length > 0 ? earnedAffirmations : allAffirmations.slice(0, 3)

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0)
      setIsFlipped(false)
    }
  }, [isOpen])

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % displayAffirmations.length)
    setIsFlipped(false)
  }

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + displayAffirmations.length) % displayAffirmations.length)
    setIsFlipped(false)
  }

  const handleSave = (affirmation: Affirmation) => {
    setSavedAffirmations((prev) => new Set([...prev, affirmation.id]))
    onSave?.(affirmation)
  }

  if (!isOpen) return null

  const currentAffirmation = displayAffirmations[currentIndex]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4A90E2] to-[#A3D8C6] text-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-poppins">Your Affirmations</h2>
            <button onClick={onClose} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm opacity-90 mt-1">
            {displayAffirmations.length} affirmation{displayAffirmations.length !== 1 ? "s" : ""} earned
          </p>
        </div>

        {/* Card Counter */}
        <div className="px-4 py-2 bg-gray-50 text-center">
          <span className="text-sm text-gray-600">
            {currentIndex + 1} of {displayAffirmations.length}
          </span>
        </div>

        {/* Flashcard */}
        <div className="p-6">
          <div
            className="relative w-full h-64 cursor-pointer perspective-1000"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div
              className={`absolute inset-0 w-full h-full transition-transform duration-600 transform-style-preserve-3d ${
                isFlipped ? "rotate-y-180" : ""
              }`}
            >
              {/* Front of card */}
              <div
                className="absolute inset-0 w-full h-full rounded-xl shadow-lg flex flex-col items-center justify-center text-center p-6 backface-hidden"
                style={{ backgroundColor: currentAffirmation.color + "20" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4"
                  style={{ backgroundColor: currentAffirmation.color }}
                >
                  {currentAffirmation.emoji}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 font-poppins mb-2">{currentAffirmation.category}</h3>
                <p className="text-sm text-gray-600">Tap to reveal affirmation</p>
              </div>

              {/* Back of card */}
              <div
                className="absolute inset-0 w-full h-full rounded-xl shadow-lg flex flex-col items-center justify-center text-center p-6 rotate-y-180 backface-hidden"
                style={{ backgroundColor: currentAffirmation.color + "10" }}
              >
                <div className="flex items-center justify-between w-full mb-4">
                  <Heart className="w-5 h-5 text-gray-400" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSave(currentAffirmation)
                    }}
                    className={`p-2 rounded-full transition-colors ${
                      savedAffirmations.has(currentAffirmation.id)
                        ? "bg-blue-100 text-blue-600"
                        : "hover:bg-gray-100 text-gray-400"
                    }`}
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-lg font-lora italic text-gray-800 leading-relaxed">{currentAffirmation.text}</p>

                <div className="mt-4 flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-sm text-gray-600">Take a moment to breathe this in</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-4 border-t">
          <button
            onClick={prevCard}
            disabled={displayAffirmations.length <= 1}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">Previous</span>
          </button>

          <div className="flex space-x-2">
            {displayAffirmations.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsFlipped(false)
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextCard}
            disabled={displayAffirmations.length <= 1}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <span className="text-sm">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 text-center">
          <p className="text-xs text-gray-500">💡 Tip: Save your favorite affirmations to revisit them anytime</p>
        </div>
      </div>
    </div>
  )
}
