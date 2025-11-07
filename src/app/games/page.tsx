"use client"

import { useState, useEffect } from "react"
import { Play, Flower, Puzzle, BookOpen, Trophy, Clock, Shield, MessageCircle } from "lucide-react"
import BottomNavigation from "@/components/BottomNavigation"

import { useRewardsSystem, RewardsDisplay } from "@/components/RewardsSystem"

interface Game {
  id: string
  title: string
  description: string
  benefits: string[]
  playTime: string
  difficulty: "Easy" | "Medium" | "Hard"
  image: string
  color: string
  icon: any
  isNew?: boolean
}

export default function GamesHubPage() {
  const { userRewards, updateStreak } = useRewardsSystem()
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  useEffect(() => {
    updateStreak()
  }, [])

  const games: Game[] = [
    {
      id: "mindful-garden",
      title: "Mindful Garden",
      description:
        "Grow a beautiful virtual garden by completing mindfulness exercises. Each breathing session, meditation, or moment of gratitude helps your garden bloom.",
      benefits: ["Reduces stress", "Builds mindfulness habits", "Encourages daily practice"],
      playTime: "5-15 min",
      difficulty: "Easy",
      image: "/placeholder.svg?height=200&width=300",
      color: "from-green-400 to-green-600",
      icon: Flower,
      isNew: true,
    },
    {
      id: "emotion-puzzle",
      title: "Emotion Puzzle",
      description:
        "A gentle match-3 game where you connect emotion tiles to create positive affirmations. No time pressure, just peaceful puzzle-solving with uplifting messages.",
      benefits: ["Emotional awareness", "Positive reinforcement", "Stress relief"],
      playTime: "10-20 min",
      difficulty: "Easy",
      image: "/placeholder.svg?height=200&width=300",
      color: "from-blue-400 to-purple-500",
      icon: Puzzle,
    },
    {
      id: "story-weaver",
      title: "Story Weaver",
      description:
        "Create meaningful short stories through guided prompts. Our AI companion helps you reflect on your choices and emotions as you craft your narrative.",
      benefits: ["Self-reflection", "Creative expression", "Emotional processing"],
      playTime: "15-30 min",
      difficulty: "Medium",
      image: "/placeholder.svg?height=200&width=300",
      color: "from-orange-400 to-red-500",
      icon: BookOpen,
    },
  ]

  const achievements = userRewards.achievements.filter((a) => a.unlocked).slice(0, 4)

  return (
    <div className="h-screen bg-[#F5F7FA] pb-20">
      {/* Header */}
      <header className="bg-linear-to-r from-[#A3D8C6] to-[#4A90E2] text-white p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold font-poppins">Games Hub</h1>
            <p className="font-lora italic opacity-90 text-sm sm:text-base">
              Therapeutic games for wellness and reflection
            </p>
          </div>
          <a href="/crisis-support">
            <button className="p-2 sm:p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors shrink-0">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </a>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div className="text-center">
            <div className="text-lg sm:text-2xl font-bold font-poppins">{userRewards.level}</div>
            <div className="text-xs sm:text-sm opacity-80">Level</div>
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-2xl font-bold font-poppins">{userRewards.badges.length}</div>
            <div className="text-xs sm:text-sm opacity-80">Badges</div>
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-2xl font-bold font-poppins">{Math.floor(userRewards.totalPlayTime)}</div>
            <div className="text-xs sm:text-sm opacity-80">Minutes Played</div>
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Rewards Display */}
        <RewardsDisplay userRewards={userRewards} />

        {/* Welcome Message */}
        <div className="card bg-linear-to-r from-[#FF6F61] to-[#FF8A80] text-white">
          <h3 className="font-semibold mb-2 font-poppins text-sm sm:text-base">Welcome to Your Wellness Games! 🎮</h3>
          <p className="text-sm font-lora opacity-90">
            These games are designed to support your mental health journey through play, mindfulness, and creative
            expression.
          </p>
        </div>

        {/* Games List */}
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-xl font-bold text-[#333333] font-poppins">Choose Your Game</h2>

          {games.map((game) => {
            const GameIcon = game.icon
            return (
              <div key={game.id} className="card hover:shadow-lg transition-all duration-200 animate-fadeIn">
                <div className="flex flex-col lg:flex-row">
                  {/* Game Image */}
                  <div className="relative mb-4 lg:mb-0 lg:mr-6">
                    <div
                      className={`w-full lg:w-48 h-32 bg-linear-to-br ${game.color} rounded-lg flex items-center justify-center relative overflow-hidden`}
                    >
                      <GameIcon className="w-12 h-12 sm:w-16 sm:h-16 text-white opacity-80" />
                      {game.isNew && (
                        <div className="absolute top-2 right-2 bg-[#FF6F61] text-white px-2 py-1 rounded-full text-xs font-bold">
                          NEW
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Game Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-[#333333] font-poppins mb-1">{game.title}</h3>
                        <div className="flex items-center space-x-2 sm:space-x-4 text-sm text-[#666666]">
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {game.playTime}
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              game.difficulty === "Easy"
                                ? "bg-green-100 text-green-700"
                                : game.difficulty === "Medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                          >
                            {game.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[#666666] font-lora mb-4 leading-relaxed text-sm sm:text-base">
                      {game.description}
                    </p>

                    {/* Benefits */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-[#333333] mb-2 font-poppins text-sm">Benefits:</h4>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {game.benefits.map((benefit, index) => (
                          <span
                            key={index}
                            className="text-xs bg-[#A3D8C6] bg-opacity-20 text-[#333333] px-2 sm:px-3 py-1 rounded-full"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                      <a href={`/games/${game.id}`} className="flex-1">
                        <button className="btn-primary w-full flex items-center justify-center text-sm sm:text-base">
                          <Play className="w-4 h-4 mr-2" />
                          Play Now
                        </button>
                      </a>
                      <button
                        onClick={() => setSelectedGame(selectedGame === game.id ? null : game.id)}
                        className="btn-secondary px-4 text-sm sm:text-base"
                      >
                        {selectedGame === game.id ? "Less Info" : "More Info"}
                      </button>
                    </div>

                    {/* Expanded Info */}
                    {selectedGame === game.id && (
                      <div className="mt-4 p-3 sm:p-4 bg-[#F5F7FA] rounded-lg animate-slide-up">
                        <h4 className="font-semibold text-[#333333] mb-2 font-poppins text-sm sm:text-base">
                          How to Play:
                        </h4>
                        <div className="text-sm text-[#666666] font-lora space-y-2">
                          {game.id === "mindful-garden" && (
                            <div>
                              <p>• Complete mindfulness exercises to earn seeds and water</p>
                              <p>• Plant different flowers based on your activities</p>
                              <p>• Watch your garden grow as you build healthy habits</p>
                              <p>• Customize your garden with decorations and themes</p>
                            </div>
                          )}
                          {game.id === "emotion-puzzle" && (
                            <div>
                              <p>• Match 3 or more emotion tiles to clear them</p>
                              <p>• Create positive affirmations by connecting related emotions</p>
                              <p>• No time limits - play at your own pace</p>
                              <p>• Unlock new tile designs and calming backgrounds</p>
                            </div>
                          )}
                          {game.id === "story-weaver" && (
                            <div>
                              <p>• Choose from guided story prompts or create your own</p>
                              <p>• Make choices that shape your character's journey</p>
                              <p>• Reflect on emotions and decisions with AI guidance</p>
                              <p>• Save stories privately or share anonymously</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Achievements - Updated */}
        <div className="card">
          <div className="flex items-center mb-4">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6F61] mr-3" />
            <h3 className="font-semibold text-[#333333] font-poppins text-sm sm:text-base">Recent Achievements</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {achievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <div
                  key={achievement.id}
                  className="p-3 rounded-lg border-2 border-[#A3D8C6] bg-[#A3D8C6] bg-opacity-10"
                >
                  <div className="flex items-center">
                    <div
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-3 shrink-0"
                      style={{ backgroundColor: achievement.color + "20" }}
                    >
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: achievement.color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-[#333333] font-poppins text-sm">{achievement.title}</h4>
                      <p className="text-xs text-[#666666] font-lora">{achievement.description}</p>
                      {achievement.unlockedAt && (
                        <p className="text-xs text-[#A3D8C6] mt-1">
                          Unlocked {achievement.unlockedAt.toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {achievements.length === 0 && (
            <p className="text-center text-[#666666] font-lora py-8 text-sm">
              Start playing games to unlock achievements! 🎮
            </p>
          )}
        </div>

        {/* Reflection Prompt */}
        <div className="card bg-linear-to-r from-[#4A90E2] to-[#A3D8C6] text-white">
          <h3 className="font-semibold mb-3 font-poppins text-sm sm:text-base">Post-Game Reflection</h3>
          <p className="text-sm font-lora opacity-90 mb-4">
            After playing, consider chatting with your AI companion about your experience. Reflection can deepen the
            therapeutic benefits of play.
          </p>
          <a href="/ai-companion">
            <button className="bg-white text-[#4A90E2] font-semibold py-2 px-4 rounded-full hover:bg-gray-100 transition-colors text-sm flex items-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat About Your Experience
            </button>
          </a>
        </div>

        {/* Safety Notice */}
        <div className="card bg-[#FFF9E6] border border-[#FFE066]">
          <div className="flex items-start">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6F61] mr-3 shrink-0 mt-1" />
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-[#333333] mb-2 font-poppins text-sm sm:text-base">
                Wellness Gaming Guidelines
              </h4>
              <p className="text-[#666666] font-lora text-sm leading-relaxed mb-3">
                These games are designed to support your mental health, not replace professional treatment. If you
                experience distress while playing, please reach out for support.
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <a href="/crisis-support">
                  <button className="text-[#FF6F61] font-medium text-sm hover:underline">Crisis Support</button>
                </a>
                <a href="/ai-companion">
                  <button className="text-[#4A90E2] font-medium text-sm hover:underline">Talk to AI Companion</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation currentPage="play" />
    </div>
  )
}
