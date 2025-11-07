"use client"

import { useState, useEffect } from "react"
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Brain,
  Trash2,
  Download,
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Volume2,
  VolumeX,
} from "lucide-react"
import BottomNavigation from "@/components/BottomNavigation"

import { useHistory } from "react-router"

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>({
    notifications: {
      dailyCheckIn: true,
      moodReminders: true,
      communityUpdates: false,
      therapistMessages: true,
      crisisAlerts: true,
    },
    privacy: {
      profileVisibility: "friends",
      dataSharing: false,
      analyticsOptOut: false,
    },
    ai: {
      tone: "supportive",
      voiceEnabled: true,
      responseLength: "medium",
    },
    appearance: {
      theme: "light",
      fontSize: "medium",
      highContrast: false,
    },
    language: "en",
  })

  const [showDeleteAccount, setShowDeleteAccount] = useState(false)
  const router = useHistory()

  // Apply theme changes to document with error handling
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        if (settings.appearance.theme === "dark") {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      } catch (error) {
        console.error("Error applying theme:", error)
      }
    }
  }, [settings.appearance.theme])

  // Apply font size changes to document with error handling
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const root = document.documentElement
        root.classList.remove("text-sm", "text-base", "text-lg")

        switch (settings.appearance.fontSize) {
          case "small":
            root.classList.add("text-sm")
            break
          case "medium":
            root.classList.add("text-base")
            break
          case "large":
            root.classList.add("text-lg")
            break
        }
      } catch (error) {
        console.error("Error applying font size:", error)
      }
    }
  }, [settings.appearance.fontSize])

  // Load settings from localStorage on component mount with error handling
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedSettings = localStorage.getItem("appSettings")
        if (savedSettings) {
          const parsed = JSON.parse(savedSettings)
          setSettings(parsed)
        }
      } catch (error) {
        console.error("Error loading settings:", error)
      }
    }
  }, [])

  const handleSettingChange = (category: string, setting: string, value: any) => {
    try {
      const newSettings = {
        ...settings,
        [category]: {
          ...settings?.[category as keyof typeof settings],
          [setting]: value,
        },
      }

      setSettings(newSettings)

      if (typeof window !== "undefined") {
        localStorage.setItem("appSettings", JSON.stringify(newSettings))
      }
    } catch (error) {
      console.error("Error saving settings:", error)
    }
  }

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("isAuthenticated")
        localStorage.removeItem("userEmail")
        localStorage.removeItem("userName")
        router.push("/")
      } catch (error) {
        console.error("Error during logout:", error)
        router.push("/")
      }
    }
  }

  const handleDeleteAccount = () => {
    if (typeof window !== "undefined") {
      try {
        // In a real app, this would delete the account
        localStorage.clear()
        router.push("/")
      } catch (error) {
        console.error("Error deleting account:", error)
        router.push("/")
      }
    }
  }

  // Safe localStorage access
  const getUserName = () => {
    if (typeof window !== "undefined") {
      try {
        return localStorage.getItem("userName") || "User"
      } catch (error) {
        return "User"
      }
    }
    return "User"
  }

  const getUserEmail = () => {
    if (typeof window !== "undefined") {
      try {
        return localStorage.getItem("userEmail") || "user@example.com"
      } catch (error) {
        return "user@example.com"
      }
    }
    return "user@example.com"
  }

  return (
    <div className="overflow-auto min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border p-6">
        <h1 className="text-2xl font-bold text-foreground font-poppins">Settings</h1>
        <p className="text-muted-foreground font-lora">Customize your SerenitySpace experience</p>
      </header>

      <main className="p-6 space-y-6">
        {/* Profile Section */}
        <div className="card">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-300 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground font-poppins">{getUserName()}</h3>
              <p className="text-muted-foreground text-sm">{getUserEmail()}</p>
            </div>
          </div>
          <a href="/profile/edit">
            <button className="btn-secondary w-full">Edit Profile</button>
          </a>
        </div>

        {/* Notifications */}
        <div className="card">
          <div className="flex items-center mb-4">
            <Bell className="w-6 h-6 text-blue-500 mr-3" />
            <h3 className="font-semibold text-foreground font-poppins">Notifications</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Daily Check-in Reminders</p>
                <p className="text-sm text-muted-foreground">Get reminded to log your mood</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.dailyCheckIn}
                  onChange={(e) => handleSettingChange("notifications", "dailyCheckIn", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Mood Reminders</p>
                <p className="text-sm text-muted-foreground">Gentle reminders to track your mood</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.moodReminders}
                  onChange={(e) => handleSettingChange("notifications", "moodReminders", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Community Updates</p>
                <p className="text-sm text-muted-foreground">New posts and group activities</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.communityUpdates}
                  onChange={(e) => handleSettingChange("notifications", "communityUpdates", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* AI Companion Settings */}
        <div className="card">
          <div className="flex items-center mb-4">
            <Brain className="w-6 h-6 text-green-400 mr-3" />
            <h3 className="font-semibold text-foreground font-poppins">AI Companion</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Communication Tone</label>
              <select
                value={settings.ai.tone}
                onChange={(e) => handleSettingChange("ai", "tone", e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="supportive">Supportive & Encouraging</option>
                <option value="professional">Professional & Clinical</option>
                <option value="friendly">Friendly & Casual</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Voice Responses</p>
                <p className="text-sm text-muted-foreground">Enable text-to-speech</p>
              </div>
              <button
                onClick={() => handleSettingChange("ai", "voiceEnabled", !settings.ai.voiceEnabled)}
                className={`p-2 rounded-full ${settings.ai.voiceEnabled ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}
              >
                {settings.ai.voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Response Length</label>
              <select
                value={settings.ai.responseLength}
                onChange={(e) => handleSettingChange("ai", "responseLength", e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="short">Short & Concise</option>
                <option value="medium">Medium Detail</option>
                <option value="long">Detailed & Comprehensive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="card">
          <div className="flex items-center mb-4">
            <Palette className="w-6 h-6 text-red-500 mr-3" />
            <h3 className="font-semibold text-foreground font-poppins">Appearance</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Theme</p>
                <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
              </div>
              <button
                onClick={() =>
                  handleSettingChange("appearance", "theme", settings.appearance.theme === "light" ? "dark" : "light")
                }
                className={`p-2 rounded-full ${settings.appearance.theme === "dark" ? "bg-gray-800 text-white" : "bg-yellow-100 text-yellow-600"}`}
              >
                {settings.appearance.theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Font Size</label>
              <select
                value={settings.appearance.fontSize}
                onChange={(e) => handleSettingChange("appearance", "fontSize", e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">High Contrast Mode</p>
                <p className="text-sm text-muted-foreground">Improve readability</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.appearance.highContrast}
                  onChange={(e) => handleSettingChange("appearance", "highContrast", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="card">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 text-green-500 mr-3" />
            <h3 className="font-semibold text-foreground font-poppins">Privacy & Security</h3>
          </div>

          <div className="space-y-4">
            <a href="/privacy-policy">
              <div className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
                <span className="font-medium text-foreground">Privacy Policy</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </a>

            <a href="/data-export">
              <div className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
                <div className="flex items-center">
                  <Download className="w-5 h-5 text-blue-500 mr-3" />
                  <span className="font-medium text-foreground">Export My Data</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </a>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Data Sharing for Research</p>
                <p className="text-sm text-muted-foreground">Help improve mental health research</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy.dataSharing}
                  onChange={(e) => handleSettingChange("privacy", "dataSharing", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="card">
          <div className="flex items-center mb-4">
            <Globe className="w-6 h-6 text-blue-500 mr-3" />
            <h3 className="font-semibold text-foreground font-poppins">Language</h3>
          </div>

          <select
            value={settings.language}
            onChange={(e) => handleSettingChange("", "language", e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="zh">中文</option>
          </select>
        </div>

        {/* Account Actions */}
        <div className="card">
          <h3 className="font-semibold text-foreground font-poppins mb-4">Account</h3>

          <div className="space-y-3">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center p-3 border border-gray-200 rounded-lg text-muted-foreground hover:bg-accent transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </button>

            <button
              onClick={() => setShowDeleteAccount(true)}
              className="w-full flex items-center justify-center p-3 border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Delete Account
            </button>
          </div>
        </div>
      </main>

      {/* Delete Account Modal */}
      {showDeleteAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-2xl p-6 w-full max-w-md">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-foreground font-poppins mb-2">Delete Account</h3>
              <p className="text-muted-foreground font-lora">
                This action cannot be undone. All your data, including mood entries, conversations, and progress will be
                permanently deleted.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-medium">
                  Are you sure you want to delete your account? This will:
                </p>
                <ul className="text-red-600 text-sm mt-2 space-y-1">
                  <li>• Delete all your personal data</li>
                  <li>• Remove your mood tracking history</li>
                  <li>• Cancel any active therapy sessions</li>
                  <li>• Remove you from community groups</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteAccount(false)}
                  className="flex-1 py-3 px-4 border border-gray-200 rounded-full text-muted-foreground hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation currentPage="settings" />
    </div>
  )
}
