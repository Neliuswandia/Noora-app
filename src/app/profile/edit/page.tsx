"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { User, Camera, Save, ArrowLeft, Mail, Phone, MapPin, Calendar, Globe, Lock } from "lucide-react"
import { useHistory } from "react-router"


export default function EditProfilePage() {
  const router = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    birthDate: "",
    website: "",
    profileImage: "",
    privacy: {
      showEmail: false,
      showPhone: false,
      showLocation: false,
      profileVisibility: "public",
    },
  })

  // Load existing profile data
  useEffect(() => {
    const savedName = localStorage.getItem("userName") || ""
    const savedEmail = localStorage.getItem("userEmail") || ""
    const savedProfile = localStorage.getItem("userProfile")

    if (savedProfile) {
      const parsed = JSON.parse(savedProfile)
      setProfileData({
        ...parsed,
        name: savedName,
        email: savedEmail,
      })
    } else {
      setProfileData((prev) => ({
        ...prev,
        name: savedName,
        email: savedEmail,
      }))
    }
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePrivacyChange = (field: string, value: any) => {
    setProfileData((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [field]: value,
      },
    }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileData((prev) => ({
          ...prev,
          profileImage: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)

    try {
      // Save to localStorage (in real app, this would be an API call)
      localStorage.setItem("userName", profileData.name)
      localStorage.setItem("userEmail", profileData.email)
      localStorage.setItem("userProfile", JSON.stringify(profileData))

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      alert("Profile updated successfully!")
      router.push("/settings")
    } catch (error) {
      alert("Failed to update profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="overflow-auto h-screen  bg-[#F5F7FA] pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm p-6 flex items-center">
        <a href="/settings">
          <button className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-[#333333]" />
          </button>
        </a>
        <div>
          <h1 className="text-2xl font-bold text-[#333333] font-poppins">Edit Profile</h1>
          <p className="text-[#666666] font-lora">Update your personal information</p>
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* Profile Picture */}
        <div className="card text-center">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 bg-linear-to-br from-blue-500 to-green-300 rounded-full flex items-center justify-center overflow-hidden">
              {profileData.profileImage ? (
                <img
                  src={profileData.profileImage || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-white" />
              )}
            </div>
            <label className="absolute -bottom-2 -right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer transition-colors">
              <Camera className="w-4 h-4" />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
          <p className="text-sm text-[#666666]">Click the camera icon to change your profile picture</p>
        </div>

        {/* Basic Information */}
        <div className="card">
          <h3 className="font-semibold text-[#333333] font-poppins mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-500" />
            Basic Information
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">Full Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">Bio</label>
              <textarea
                value={profileData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="card">
          <h3 className="font-semibold text-[#333333] font-poppins mb-4">Additional Information</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">Birth Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={profileData.birthDate}
                  onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">Website</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  value={profileData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="card">
          <h3 className="font-semibold text-[#333333] font-poppins mb-4 flex items-center">
            <Lock className="w-5 h-5 mr-2 text-green-500" />
            Privacy Settings
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">Profile Visibility</label>
              <select
                value={profileData.privacy.profileVisibility}
                onChange={(e) => handlePrivacyChange("profileVisibility", e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="public">Public - Anyone can see</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private - Only me</option>
              </select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#333333]">Show Email Address</p>
                  <p className="text-sm text-[#666666]">Let others see your email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profileData.privacy.showEmail}
                    onChange={(e) => handlePrivacyChange("showEmail", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#333333]">Show Phone Number</p>
                  <p className="text-sm text-[#666666]">Let others see your phone</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profileData.privacy.showPhone}
                    onChange={(e) => handlePrivacyChange("showPhone", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#333333]">Show Location</p>
                  <p className="text-sm text-[#666666]">Let others see your location</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profileData.privacy.showLocation}
                    onChange={(e) => handlePrivacyChange("showLocation", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="card">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className={`w-full flex items-center justify-center py-3 px-6 rounded-full font-medium transition-all duration-200 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl"
            }`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  )
}
