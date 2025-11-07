"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Flower, Droplets, Sun, Wind, Pause, Play, Star, Trophy } from "lucide-react"

import { useRewardsSystem, RewardNotification, RewardsDisplay } from "@/components/RewardsSystem"

interface Plant {
  id: string
  type: "flower" | "tree" | "herb"
  name: string
  stage: number
  maxStage: number
  position: { x: number; y: number }
  color: string
  plantedAt: Date
}

interface MindfulnessTask {
  id: string
  title: string
  description: string
  duration: number
  reward: "seed" | "water" | "sunshine"
  completed: boolean
  instructions: string[]
  xpReward: number
}

export default function MindfulGardenPage() {
  const { userRewards, newUnlocks, addXP, updateAchievementProgress, addPlayTime, updateStreak, clearNewUnlocks } =
    useRewardsSystem()

  const [plants, setPlants] = useState<Plant[]>([
    {
      id: "1",
      type: "flower",
      name: "Serenity Rose",
      stage: 2,
      maxStage: 4,
      position: { x: 30, y: 60 },
      color: "#FF6F61",
      plantedAt: new Date(),
    },
    {
      id: "2",
      type: "flower",
      name: "Peace Lily",
      stage: 1,
      maxStage: 3,
      position: { x: 70, y: 40 },
      color: "#A3D8C6",
      plantedAt: new Date(),
    },
  ])

  const [resources, setResources] = useState({
    seeds: 3,
    water: 5,
    sunshine: 2,
  })

  const [currentTask, setCurrentTask] = useState<MindfulnessTask | null>(null)
  const [isTaskActive, setIsTaskActive] = useState(false)
  const [taskTimer, setTaskTimer] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [completedTasks, setCompletedTasks] = useState<string[]>([])
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null)
  const [maturePlants, setMaturePlants] = useState(0)

  const mindfulnessTasks: MindfulnessTask[] = [
    {
      id: "breathing",
      title: "Deep Breathing",
      description: "Take slow, deep breaths for 2 minutes",
      duration: 120,
      reward: "water",
      completed: false,
      xpReward: 20,
      instructions: [
        "Find a comfortable position",
        "Close your eyes or soften your gaze",
        "Breathe in slowly through your nose for 4 counts",
        "Hold your breath for 4 counts",
        "Exhale slowly through your mouth for 6 counts",
        "Repeat this cycle until the timer ends",
      ],
    },
    {
      id: "gratitude",
      title: "Gratitude Moment",
      description: "Think of three things you're grateful for",
      duration: 60,
      reward: "sunshine",
      completed: false,
      xpReward: 15,
      instructions: [
        "Think of three things you're grateful for today",
        "They can be big or small",
        "Feel the warmth of appreciation in your heart",
        "Take a moment to really savor these feelings",
      ],
    },
    {
      id: "body-scan",
      title: "Body Scan",
      description: "Notice sensations throughout your body",
      duration: 180,
      reward: "seed",
      completed: false,
      xpReward: 30,
      instructions: [
        "Start at the top of your head",
        "Slowly move your attention down your body",
        "Notice any sensations without judgment",
        "Breathe into areas of tension",
        "End at your toes, feeling grounded",
      ],
    },
  ]

  useEffect(() => {
    // Update streak when component mounts
    updateStreak()
    setSessionStartTime(new Date())

    return () => {
      // Track play time when component unmounts
      if (sessionStartTime) {
        const playTime = Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 60000)
        addPlayTime(playTime)
      }
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTaskActive && taskTimer > 0) {
      interval = setInterval(() => {
        setTaskTimer((prev) => prev - 1)
      }, 1000)
    } else if (taskTimer === 0 && isTaskActive && currentTask) {
      completeTask()
    }
    return () => clearInterval(interval)
  }, [isTaskActive, taskTimer, currentTask])

  const startTask = (task: MindfulnessTask) => {
    setCurrentTask(task)
    setTaskTimer(task.duration)
    setIsTaskActive(true)
  }

  const pauseTask = () => {
    setIsTaskActive(!isTaskActive)
  }

  const completeTask = () => {
    if (currentTask) {
      // Award resources
      setResources((prev) => ({
        ...prev,
        [currentTask.reward]: prev[currentTask.reward as keyof typeof prev] + 1,
      }))

      // Award XP
      addXP(currentTask.xpReward)

      // Mark task as completed
      setCompletedTasks((prev) => [...prev, currentTask.id])
      setShowCelebration(true)

      // Update achievements
      const newCompletedCount = completedTasks.length + 1
      updateAchievementProgress("mindful_streak", newCompletedCount)

      // Reset task state
      setCurrentTask(null)
      setIsTaskActive(false)
      setTaskTimer(0)

      // Hide celebration after 3 seconds
      setTimeout(() => setShowCelebration(false), 3000)
    }
  }

  const waterPlant = (plantId: string) => {
    if (resources.water > 0) {
      setPlants((prev) => {
        const updatedPlants = prev.map((plant) => {
          if (plant.id === plantId && plant.stage < plant.maxStage) {
            const newStage = plant.stage + 1

            // Check if plant reached maturity
            if (newStage === plant.maxStage) {
              setMaturePlants((current) => {
                const newCount = current + 1
                updateAchievementProgress("garden_master", newCount)
                return newCount
              })
              addXP(10) // Bonus XP for growing a plant to maturity
            }

            return { ...plant, stage: newStage }
          }
          return plant
        })
        return updatedPlants
      })
      setResources((prev) => ({ ...prev, water: prev.water - 1 }))
    }
  }

  const plantSeed = () => {
    if (resources.seeds > 0) {
      const flowerNames = ["Calm Daisy", "Hope Tulip", "Joy Sunflower", "Peace Rose", "Zen Lotus"]
      const colors = ["#4A90E2", "#A3D8C6", "#FF6F61", "#FFB347", "#DDA0DD"]

      const newPlant: Plant = {
        id: Date.now().toString(),
        type: "flower",
        name: flowerNames[Math.floor(Math.random() * flowerNames.length)],
        stage: 0,
        maxStage: 3,
        position: {
          x: Math.random() * 60 + 20,
          y: Math.random() * 40 + 30,
        },
        color: colors[Math.floor(Math.random() * colors.length)],
        plantedAt: new Date(),
      }

      setPlants((prev) => {
        const newPlants = [...prev, newPlant]

        // Update first plant achievement
        if (newPlants.length === 1) {
          updateAchievementProgress("first_plant", 1)
        }

        return newPlants
      })

      setResources((prev) => ({ ...prev, seeds: prev.seeds - 1 }))
      addXP(5) // XP for planting
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getPlantEmoji = (plant: Plant) => {
    if (plant.stage === 0) return "🌱"
    if (plant.stage === 1) return "🌿"
    if (plant.stage === plant.maxStage) return "🌸"
    return "🌺"
  }

  return (
    <div className="h-screen bg-linear-to-b from-[#E8F4FD] to-[#F5F7FA]">
      {/* Reward Notifications */}
      <RewardNotification achievements={newUnlocks} onClose={clearNewUnlocks} />

      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <a href="/games">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
          </a>
          <h1 className="text-xl font-bold text-[#333333] font-poppins">Mindful Garden</h1>
          <div className="w-10" />
        </div>

        {/* Rewards Display */}
        <div className="mt-4">
          <RewardsDisplay userRewards={userRewards} compact />
        </div>

        {/* Resources */}
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center bg-[#A3D8C6] bg-opacity-20 px-3 py-2 rounded-full">
            <Flower className="w-4 h-4 text-[#A3D8C6] mr-2" />
            <span className="font-medium text-[#333333]">{resources.seeds}</span>
          </div>
          <div className="flex items-center bg-[#4A90E2] bg-opacity-20 px-3 py-2 rounded-full">
            <Droplets className="w-4 h-4 text-[#4A90E2] mr-2" />
            <span className="font-medium text-[#333333]">{resources.water}</span>
          </div>
          <div className="flex items-center bg-[#FF6F61] bg-opacity-20 px-3 py-2 rounded-full">
            <Sun className="w-4 h-4 text-[#FF6F61] mr-2" />
            <span className="font-medium text-[#333333]">{resources.sunshine}</span>
          </div>
        </div>
      </header>

      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center animate-fade-in">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-[#333333] font-poppins mb-2">Well Done!</h2>
            <p className="text-[#666666] font-lora mb-4">You completed your mindfulness practice!</p>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <Trophy className="w-6 h-6 text-[#FF6F61] mr-2" />
                <span className="font-medium">+1 {currentTask?.reward}</span>
              </div>
              <div className="flex items-center">
                <Star className="w-6 h-6 text-[#4A90E2] mr-2" />
                <span className="font-medium">+{currentTask?.xpReward} XP</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Garden View */}
      <main className="flex-1 relative p-6">
        <div className="relative h-96 bg-gradient-to-b from-sky-200 to-green-200 rounded-2xl overflow-hidden shadow-lg">
          {/* Sky background with gentle animation */}
          <div className="absolute inset-0">
            <div className="absolute top-4 right-8 animate-pulse-gentle">
              <Sun className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="absolute top-8 left-12 animate-pulse-gentle" style={{ animationDelay: "1s" }}>
              <Wind className="w-6 h-6 text-blue-300" />
            </div>
            {/* Floating particles */}
            <div className="absolute top-16 left-1/4 animate-bounce" style={{ animationDelay: "2s" }}>
              <Star className="w-3 h-3 text-yellow-300 opacity-60" />
            </div>
            <div className="absolute top-24 right-1/3 animate-bounce" style={{ animationDelay: "3s" }}>
              <Star className="w-2 h-2 text-blue-300 opacity-60" />
            </div>
          </div>

          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-600 to-green-400 opacity-80"></div>

          {/* Plants */}
          {plants.map((plant) => (
            <button
              key={plant.id}
              onClick={() => waterPlant(plant.id)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform group"
              style={{
                left: `${plant.position.x}%`,
                top: `${plant.position.y}%`,
              }}
            >
              <div className="relative">
                {/* Plant visualization */}
                <div
                  className="text-4xl animate-pulse-gentle"
                  style={{
                    transform: `scale(${0.7 + plant.stage * 0.2})`,
                  }}
                >
                  {getPlantEmoji(plant)}
                </div>

                {/* Plant name tooltip */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {plant.name}
                </div>

                {/* Growth indicator */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-1">
                    {Array.from({ length: plant.maxStage }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-1 rounded-full ${i < plant.stage ? "bg-green-400" : "bg-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}

          {/* Plant seed button */}
          <button
            onClick={plantSeed}
            disabled={resources.seeds === 0}
            className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-3 rounded-full shadow-lg hover:bg-opacity-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Flower className="w-6 h-6 text-[#A3D8C6]" />
          </button>
        </div>

        {/* Current Task */}
        {currentTask && (
          <div className="mt-6 card bg-gradient-to-r from-[#4A90E2] to-[#A3D8C6] text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold font-poppins">{currentTask.title}</h3>
              <div className="text-2xl font-bold font-poppins">{formatTime(taskTimer)}</div>
            </div>

            <p className="font-lora mb-4 opacity-90">{currentTask.description}</p>

            {/* Instructions */}
            <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
              <h4 className="font-semibold mb-2">Instructions:</h4>
              <ul className="text-sm space-y-1 opacity-90">
                {currentTask.instructions.map((instruction, index) => (
                  <li key={index}>• {instruction}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-white bg-opacity-20 px-2 py-1 rounded-full">
                  {currentTask.reward === "water" && <Droplets className="w-4 h-4 mr-1" />}
                  {currentTask.reward === "seed" && <Flower className="w-4 h-4 mr-1" />}
                  {currentTask.reward === "sunshine" && <Sun className="w-4 h-4 mr-1" />}
                  <span className="text-sm capitalize">{currentTask.reward}</span>
                </div>
                <div className="flex items-center bg-white bg-opacity-20 px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 mr-1" />
                  <span className="text-sm">+{currentTask.xpReward} XP</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={pauseTask}
                  className="bg-white text-[#4A90E2] p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  {isTaskActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => {
                    setCurrentTask(null)
                    setIsTaskActive(false)
                    setTaskTimer(0)
                  }}
                  className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full hover:bg-opacity-30 transition-colors text-sm"
                >
                  Stop
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mindfulness Tasks */}
        {!currentTask && (
          <div className="mt-6 space-y-4">
            <h2 className="text-lg font-bold text-[#333333] font-poppins">Mindfulness Activities</h2>

            {mindfulnessTasks.map((task) => {
              const isCompleted = completedTasks.includes(task.id)
              return (
                <div
                  key={task.id}
                  className={`card hover:shadow-lg transition-all ${isCompleted ? "bg-green-50 border-green-200" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="font-semibold text-[#333333] font-poppins">{task.title}</h3>
                        {isCompleted && <Star className="w-4 h-4 text-green-500 ml-2" />}
                      </div>
                      <p className="text-[#666666] font-lora text-sm mb-2">{task.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-[#666666]">
                        <span>{Math.floor(task.duration / 60)} min</span>
                        <div className="flex items-center">
                          <span className="mr-1">Earns:</span>
                          {task.reward === "water" && <Droplets className="w-4 h-4 text-[#4A90E2]" />}
                          {task.reward === "seed" && <Flower className="w-4 h-4 text-[#A3D8C6]" />}
                          {task.reward === "sunshine" && <Sun className="w-4 h-4 text-[#FF6F61]" />}
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-[#FFD700] mr-1" />
                          <span>+{task.xpReward} XP</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => startTask(task)}
                      className={`px-4 py-2 text-sm ml-4 rounded-full transition-colors ${
                        isCompleted ? "bg-green-100 text-green-700 hover:bg-green-200" : "btn-primary"
                      }`}
                    >
                      {isCompleted ? "Practice Again" : "Start"}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Garden Stats */}
        <div className="mt-6 card">
          <h3 className="font-semibold text-[#333333] font-poppins mb-3">Garden Progress</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#4A90E2] font-poppins">{plants.length}</div>
              <div className="text-sm text-[#666666]">Plants Growing</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#A3D8C6] font-poppins">
                {plants.reduce((sum, plant) => sum + plant.stage, 0)}
              </div>
              <div className="text-sm text-[#666666]">Growth Points</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#FF6F61] font-poppins">{completedTasks.length}</div>
              <div className="text-sm text-[#666666]">Sessions Complete</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
