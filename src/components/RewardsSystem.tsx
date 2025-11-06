"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { Trophy, Star, Award, Crown, Target, Calendar, Zap, Heart, X } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  color: string
  unlocked: boolean
  progress: number
  maxProgress: number
  unlockedAt?: Date
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  color: string
  rarity: "common" | "rare" | "epic" | "legendary"
  earnedAt: Date
}

interface UserRewards {
  level: number
  xp: number
  xpToNextLevel: number
  totalPlayTime: number
  currentStreak: number
  longestStreak: number
  lastPlayDate: string
  achievements: Achievement[]
  badges: Badge[]
}

interface RewardsContextType {
  userRewards: UserRewards
  newUnlocks: Achievement[]
  addXP: (amount: number) => void
  updateAchievementProgress: (achievementId: string, progress: number) => void
  addPlayTime: (minutes: number) => void
  updateStreak: () => void
  clearNewUnlocks: () => void
}

const RewardsContext = createContext<RewardsContextType | null>(null)

const initialAchievements: Achievement[] = [
  {
    id: "first_plant",
    title: "First Bloom",
    description: "Plant your first flower in Mindful Garden",
    icon: Trophy,
    color: "#4A90E2",
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rarity: "common",
  },
  {
    id: "garden_master",
    title: "Garden Master",
    description: "Grow 10 plants to full maturity",
    icon: Crown,
    color: "#A3D8C6",
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    rarity: "epic",
  },
  {
    id: "mindful_streak",
    title: "Mindful Streak",
    description: "Complete 5 mindfulness exercises",
    icon: Target,
    color: "#FF6F61",
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    rarity: "rare",
  },
  {
    id: "emotion_explorer",
    title: "Emotion Explorer",
    description: "Complete your first emotion puzzle",
    icon: Heart,
    color: "#FFD700",
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rarity: "common",
  },
  {
    id: "puzzle_master",
    title: "Puzzle Master",
    description: "Reach level 5 in Emotion Puzzle",
    icon: Star,
    color: "#9B59B6",
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    rarity: "rare",
  },
  {
    id: "affirmation_collector",
    title: "Affirmation Collector",
    description: "Unlock 10 affirmations",
    icon: Award,
    color: "#E74C3C",
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    rarity: "epic",
  },
  {
    id: "storyteller",
    title: "Storyteller",
    description: "Complete your first story in Story Weaver",
    icon: Trophy,
    color: "#F39C12",
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rarity: "common",
  },
  {
    id: "reflection_master",
    title: "Reflection Master",
    description: "Write 5 story reflections",
    icon: Star,
    color: "#3498DB",
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    rarity: "rare",
  },
  {
    id: "daily_player",
    title: "Daily Player",
    description: "Play games for 7 days in a row",
    icon: Calendar,
    color: "#2ECC71",
    unlocked: false,
    progress: 0,
    maxProgress: 7,
    rarity: "epic",
  },
  {
    id: "zen_master",
    title: "Zen Master",
    description: "Reach level 10 overall",
    icon: Crown,
    color: "#8E44AD",
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    rarity: "legendary",
  },
  {
    id: "wellness_warrior",
    title: "Wellness Warrior",
    description: "Play for 60 minutes total",
    icon: Zap,
    color: "#E67E22",
    unlocked: false,
    progress: 0,
    maxProgress: 60,
    rarity: "rare",
  },
]

export function RewardsProvider({ children }: { children: React.ReactNode }) {
  const [userRewards, setUserRewards] = useState<UserRewards>({
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    totalPlayTime: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastPlayDate: "",
    achievements: initialAchievements,
    badges: [],
  })

  const [newUnlocks, setNewUnlocks] = useState<Achievement[]>([])

  useEffect(() => {
    // Load saved rewards from localStorage
    const saved = localStorage.getItem("userRewards")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setUserRewards({
          ...parsed,
          achievements: parsed.achievements.map((a: any) => ({
            ...a,
            icon: initialAchievements.find((ia) => ia.id === a.id)?.icon || Trophy,
          })),
        })
      } catch (error) {
        console.error("Error loading rewards:", error)
      }
    }
  }, [])

  useEffect(() => {
    // Save rewards to localStorage
    localStorage.setItem("userRewards", JSON.stringify(userRewards))
  }, [userRewards])

  const addXP = (amount: number) => {
    setUserRewards((prev) => {
      let newXP = prev.xp + amount
      let newLevel = prev.level
      let xpToNext = prev.xpToNextLevel

      // Check for level up
      while (newXP >= xpToNext) {
        newXP -= xpToNext
        newLevel++
        xpToNext = newLevel * 100 // 100 XP per level
      }

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNextLevel: xpToNext,
      }
    })
  }

  const updateAchievementProgress = (achievementId: string, progress: number) => {
    setUserRewards((prev) => {
      const updatedAchievements = prev.achievements.map((achievement) => {
        if (achievement.id === achievementId) {
          const newProgress = Math.min(progress, achievement.maxProgress)
          const wasUnlocked = achievement.unlocked
          const isNowUnlocked = newProgress >= achievement.maxProgress

          if (!wasUnlocked && isNowUnlocked) {
            // Achievement just unlocked
            const unlockedAchievement = {
              ...achievement,
              progress: newProgress,
              unlocked: true,
              unlockedAt: new Date(),
            }
            setNewUnlocks((prev) => [...prev, unlockedAchievement])
            return unlockedAchievement
          }

          return {
            ...achievement,
            progress: newProgress,
            unlocked: isNowUnlocked,
          }
        }
        return achievement
      })

      return {
        ...prev,
        achievements: updatedAchievements,
      }
    })
  }

  const addPlayTime = (minutes: number) => {
    setUserRewards((prev) => ({
      ...prev,
      totalPlayTime: prev.totalPlayTime + minutes,
    }))

    // Update wellness warrior achievement
    updateAchievementProgress("wellness_warrior", userRewards.totalPlayTime + minutes)
  }

  const updateStreak = () => {
    const today = new Date().toDateString()
    setUserRewards((prev) => {
      if (prev.lastPlayDate !== today) {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)

        let newStreak = 1
        if (prev.lastPlayDate === yesterday.toDateString()) {
          newStreak = prev.currentStreak + 1
        }

        // Update daily player achievement
        updateAchievementProgress("daily_player", newStreak)

        return {
          ...prev,
          currentStreak: newStreak,
          longestStreak: Math.max(prev.longestStreak, newStreak),
          lastPlayDate: today,
        }
      }
      return prev
    })
  }

  const clearNewUnlocks = () => {
    setNewUnlocks([])
  }

  return (
    <RewardsContext.Provider
      value={{
        userRewards,
        newUnlocks,
        addXP,
        updateAchievementProgress,
        addPlayTime,
        updateStreak,
        clearNewUnlocks,
      }}
    >
      {children}
    </RewardsContext.Provider>
  )
}

export function useRewardsSystem() {
  const context = useContext(RewardsContext)
  if (!context) {
    throw new Error("useRewardsSystem must be used within a RewardsProvider")
  }
  return context
}

interface RewardNotificationProps {
  achievements: Achievement[]
  onClose: () => void
}

export function RewardNotification({ achievements, onClose }: RewardNotificationProps) {
  if (achievements.length === 0) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full animate-fadeIn">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">🎉 Achievement Unlocked!</h2>
            <button onClick={onClose} className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {achievements.map((achievement) => {
            const Icon = achievement.icon
            return (
              <div key={achievement.id} className="flex items-center space-x-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: achievement.color + "20" }}
                >
                  <Icon className="w-6 h-6" style={{ color: achievement.color }} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                      achievement.rarity === "legendary"
                        ? "bg-purple-100 text-purple-800"
                        : achievement.rarity === "epic"
                          ? "bg-orange-100 text-orange-800"
                          : achievement.rarity === "rare"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {achievement.rarity}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="p-4 bg-gray-50 rounded-b-2xl">
          <button onClick={onClose} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

interface RewardsDisplayProps {
  userRewards: UserRewards
  compact?: boolean
}

export function RewardsDisplay({ userRewards, compact = false }: RewardsDisplayProps) {
  if (compact) {
    return (
      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">Level {userRewards.level}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-blue-500" />
            <span className="text-sm">{userRewards.achievements.filter((a) => a.unlocked).length}</span>
          </div>
        </div>
        <div className="w-24 bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(userRewards.xp / userRewards.xpToNextLevel) * 100}%` }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800">Your Progress</h3>
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span className="font-bold">Level {userRewards.level}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>XP Progress</span>
            <span>
              {userRewards.xp}/{userRewards.xpToNextLevel}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(userRewards.xp / userRewards.xpToNextLevel) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-500">{userRewards.currentStreak}</div>
            <div className="text-xs text-gray-600">Day Streak</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-500">
              {userRewards.achievements.filter((a) => a.unlocked).length}
            </div>
            <div className="text-xs text-gray-600">Achievements</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-500">{Math.floor(userRewards.totalPlayTime)}</div>
            <div className="text-xs text-gray-600">Minutes</div>
          </div>
        </div>
      </div>
    </div>
  )
}
