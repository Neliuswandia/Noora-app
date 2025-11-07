"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, BookOpen, Heart, Share2, Save, Sparkles } from "lucide-react"

import { useRewardsSystem, RewardNotification, RewardsDisplay } from "@/components/RewardsSystem"

interface StoryChoice {
  id: string
  text: string
  emotion: string
  consequence: string
}

interface StoryPrompt {
  id: string
  title: string
  scenario: string
  choices: StoryChoice[]
  reflection: string
}

interface Story {
  id: string
  title: string
  content: string[]
  choices: string[]
  emotions: string[]
  createdAt: Date
}

export default function StoryWeaverPage() {
  const { userRewards, newUnlocks, addXP, updateAchievementProgress, addPlayTime, updateStreak, clearNewUnlocks } =
    useRewardsSystem()

  const [currentPrompt, setCurrentPrompt] = useState<StoryPrompt | null>(null)
  const [story, setStory] = useState<Story | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [showReflection, setShowReflection] = useState(false)
  const [reflectionText, setReflectionText] = useState("")
  const [savedStories, setSavedStories] = useState<Story[]>([])
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null)
  const [reflectionsWritten, setReflectionsWritten] = useState(0)

  const storyPrompts: StoryPrompt[] = [
    {
      id: "friendship",
      title: "The New Friend",
      scenario:
        "You're at a coffee shop when you notice someone sitting alone, looking sad. They seem like they could use a friend.",
      choices: [
        {
          id: "approach",
          text: "Walk over and gently ask if they're okay",
          emotion: "compassion",
          consequence: "They smile gratefully and share that they're having a tough day. You listen and offer support.",
        },
        {
          id: "smile",
          text: "Give them a warm smile from across the room",
          emotion: "kindness",
          consequence:
            "Your smile brightens their face. They wave back, and you both feel a moment of human connection.",
        },
        {
          id: "note",
          text: "Write an encouraging note and have the barista deliver it",
          emotion: "creativity",
          consequence:
            "The note brings tears of joy to their eyes. Sometimes small gestures make the biggest difference.",
        },
      ],
      reflection:
        "How did your choice make you feel? What does this tell you about your values and how you connect with others?",
    },
    {
      id: "challenge",
      title: "The Mountain Path",
      scenario:
        "You're hiking a difficult trail and reach a steep, challenging section. You're tired, but the summit is within reach.",
      choices: [
        {
          id: "push",
          text: "Take a deep breath and push forward with determination",
          emotion: "perseverance",
          consequence:
            "Each step is hard, but you find strength you didn't know you had. The view from the top is breathtaking.",
        },
        {
          id: "rest",
          text: "Find a comfortable spot to rest and enjoy the current view",
          emotion: "mindfulness",
          consequence:
            "You realize that the journey itself is beautiful. Sometimes the best views aren't at the destination.",
        },
        {
          id: "help",
          text: "Look for other hikers who might want to tackle it together",
          emotion: "community",
          consequence:
            "You find a group of friendly hikers. Together, you encourage each other and reach the summit as a team.",
        },
      ],
      reflection:
        "What does this choice reveal about how you handle challenges? How do you find strength in difficult moments?",
    },
    {
      id: "creativity",
      title: "The Blank Canvas",
      scenario:
        "You're in an art studio with a blank canvas in front of you. You have all the colors you could want, but you're not sure where to start.",
      choices: [
        {
          id: "bold",
          text: "Start with bold, bright strokes across the canvas",
          emotion: "courage",
          consequence:
            "Your bold beginning inspires a vibrant, energetic piece that surprises even you with its power.",
        },
        {
          id: "gentle",
          text: "Begin with soft, gentle touches of color",
          emotion: "patience",
          consequence:
            "Your gentle approach creates something delicate and beautiful, each layer adding depth and meaning.",
        },
        {
          id: "abstract",
          text: "Close your eyes and let your emotions guide your brush",
          emotion: "intuition",
          consequence: "What emerges is deeply personal and meaningful, a true expression of your inner world.",
        },
      ],
      reflection:
        "How do you approach creativity in your life? What does your artistic choice say about your inner self?",
    },
  ]

  useEffect(() => {
    updateStreak()
    setSessionStartTime(new Date())

    return () => {
      if (sessionStartTime) {
        const playTime = Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 60000)
        addPlayTime(playTime)
      }
    }
  }, [])

  const startNewStory = (prompt: StoryPrompt) => {
    setCurrentPrompt(prompt)
    setStory({
      id: Date.now().toString(),
      title: prompt.title,
      content: [prompt.scenario],
      choices: [],
      emotions: [],
      createdAt: new Date(),
    })
    setCurrentStep(0)
    setShowReflection(false)
    setReflectionText("")
  }

  const makeChoice = (choice: StoryChoice) => {
    if (!story || !currentPrompt) return

    const updatedStory = {
      ...story,
      content: [...story.content, choice.consequence],
      choices: [...story.choices, choice.text],
      emotions: [...story.emotions, choice.emotion],
    }

    setStory(updatedStory)
    setCurrentStep(currentStep + 1)

    // Award XP for making choices
    addXP(5)

    // After 3 choices, show reflection
    if (currentStep >= 2) {
      setShowReflection(true)
      // Update storyteller achievement on first completion
      updateAchievementProgress("storyteller", 1)
    }
  }

  const saveStory = () => {
    if (story && reflectionText.trim()) {
      setSavedStories((prev) => [...prev, { ...story, content: [...story.content, reflectionText] }])

      // Award XP for completing story with reflection
      addXP(25)

      // Update reflection achievement
      setReflectionsWritten((prev) => {
        const newCount = prev + 1
        updateAchievementProgress("reflection_master", newCount)
        return newCount
      })

      setCurrentPrompt(null)
      setStory(null)
      setShowReflection(false)
      setReflectionText("")
    }
  }

  const shareStory = () => {
    // In a real app, this would share anonymously to the community
    alert("Story shared anonymously with the community! 🌟")
  }

  if (showReflection && currentPrompt) {
    return (
      <div className="h-screen bg-linear-to-b from-[#E8F4FD] to-[#F5F7FA]">
        <RewardNotification achievements={newUnlocks} onClose={clearNewUnlocks} />

        <header className="bg-white shadow-sm p-4">
          <div className="flex items-center justify-between">
            <a href="/games">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
            </a>
            <h1 className="text-xl font-bold text-[#333333] font-poppins">Story Reflection</h1>
            <div className="w-10" />
          </div>
          <div className="mt-4">
            <RewardsDisplay userRewards={userRewards} compact />
          </div>
        </header>

        <main className="p-6">
          <div className="card bg-gradient-to-r from-[#4A90E2] to-[#A3D8C6] text-white mb-6">
            <h2 className="text-xl font-bold font-poppins mb-4">Your Story Journey</h2>
            <div className="space-y-3">
              {story?.content.map((paragraph, index) => (
                <p key={index} className="font-lora text-sm opacity-90">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="card mb-6">
            <h3 className="font-semibold text-[#333333] font-poppins mb-3">Your Emotional Journey</h3>
            <div className="flex flex-wrap gap-2">
              {story?.emotions.map((emotion, index) => (
                <span
                  key={index}
                  className="text-xs bg-[#A3D8C6] bg-opacity-20 text-[#333333] px-3 py-1 rounded-full capitalize"
                >
                  {emotion}
                </span>
              ))}
            </div>
          </div>

          <div className="card mb-6">
            <h3 className="font-semibold text-[#333333] font-poppins mb-3">Reflection Time</h3>
            <p className="text-[#666666] font-lora mb-4">{currentPrompt.reflection}</p>
            <textarea
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="Share your thoughts and feelings about this story..."
              className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent resize-none font-lora"
              rows={6}
            />
          </div>

          <div className="flex space-x-3">
            <button onClick={saveStory} className="flex-1 btn-primary flex items-center justify-center">
              <Save className="w-4 h-4 mr-2" />
              Save Story
            </button>
            <button onClick={shareStory} className="flex-1 btn-secondary flex items-center justify-center">
              <Share2 className="w-4 h-4 mr-2" />
              Share Anonymously
            </button>
          </div>
        </main>
      </div>
    )
  }

  if (currentPrompt && story) {
    return (
      <div className="h-screen bg-linear-to-b from-[#E8F4FD] to-[#F5F7FA]">
        <RewardNotification achievements={newUnlocks} onClose={clearNewUnlocks} />

        <header className="bg-white shadow-sm p-4">
          <div className="flex items-center justify-between">
            <a href="/games">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
            </a>
            <h1 className="text-xl font-bold text-[#333333] font-poppins">{currentPrompt.title}</h1>
            <div className="text-sm text-[#666666]">Step {currentStep + 1}/3</div>
          </div>
          <div className="mt-4">
            <RewardsDisplay userRewards={userRewards} compact />
          </div>
        </header>

        <main className="p-6">
          <div className="card mb-6">
            <div className="space-y-4">
              {story.content.map((paragraph, index) => (
                <p key={index} className="text-[#333333] font-lora leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="card mb-6">
            <h3 className="font-semibold text-[#333333] font-poppins mb-4">What do you do next?</h3>
            <div className="space-y-3">
              {currentPrompt.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => makeChoice(choice)}
                  className="w-full p-4 text-left bg-[#F5F7FA] hover:bg-[#E8F4FD] rounded-lg transition-colors border border-gray-200 hover:border-[#4A90E2]"
                >
                  <p className="font-medium text-[#333333] mb-1">{choice.text}</p>
                  <p className="text-sm text-[#666666] capitalize">Emotion: {choice.emotion}</p>
                </button>
              ))}
            </div>
          </div>

          {story.emotions.length > 0 && (
            <div className="card">
              <h3 className="font-semibold text-[#333333] font-poppins mb-3">Your Emotional Path</h3>
              <div className="flex flex-wrap gap-2">
                {story.emotions.map((emotion, index) => (
                  <span
                    key={index}
                    className="text-xs bg-[#A3D8C6] bg-opacity-20 text-[#333333] px-3 py-1 rounded-full capitalize"
                  >
                    {emotion}
                  </span>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    )
  }

  return (
    <div className="h-screen bg-linear-to-b from-[#E8F4FD] to-[#F5F7FA]">
      <RewardNotification achievements={newUnlocks} onClose={clearNewUnlocks} />

      <header className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <a href="/games">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
          </a>
          <h1 className="text-xl font-bold text-[#333333] font-poppins">Story Weaver</h1>
          <div className="w-10" />
        </div>
        <div className="mt-4">
          <RewardsDisplay userRewards={userRewards} compact />
        </div>
      </header>

      <main className="p-6">
        <div className="card mb-6 bg-gradient-to-r from-[#FF6F61] to-[#FF8A80] text-white">
          <div className="flex items-start">
            <Sparkles className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-semibold mb-2 font-poppins">Create Your Story</h2>
              <p className="text-sm font-lora opacity-90">
                Choose your path through interactive stories that help you explore emotions and reflect on your choices.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <h2 className="text-lg font-bold text-[#333333] font-poppins">Story Prompts</h2>
          {storyPrompts.map((prompt) => (
            <div key={prompt.id} className="card hover:shadow-lg transition-all">
              <h3 className="font-semibold text-[#333333] font-poppins mb-2">{prompt.title}</h3>
              <p className="text-[#666666] font-lora text-sm mb-4 leading-relaxed">{prompt.scenario}</p>
              <button onClick={() => startNewStory(prompt)} className="btn-primary">
                <BookOpen className="w-4 h-4 mr-2" />
                Start This Story
              </button>
            </div>
          ))}
        </div>

        {savedStories.length > 0 && (
          <div className="card">
            <h3 className="font-semibold text-[#333333] font-poppins mb-4">Your Saved Stories</h3>
            <div className="space-y-3">
              {savedStories.map((savedStory) => (
                <div key={savedStory.id} className="p-3 bg-[#F5F7FA] rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-[#333333] font-poppins">{savedStory.title}</h4>
                      <p className="text-sm text-[#666666]">
                        {savedStory.createdAt.toLocaleDateString()} • {savedStory.emotions.length} emotions explored
                      </p>
                    </div>
                    <Heart className="w-5 h-5 text-[#FF6F61]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
