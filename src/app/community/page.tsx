"use client"

import { useState } from "react"
import { Plus, MessageCircle, Heart, Users, Search, Flag, Lock, Globe } from "lucide-react"
import BottomNavigation from "@/components/BottomNavigation"

interface Post {
  id: string
  author: string
  avatar: string
  title: string
  content: string
  category: string
  timestamp: string
  likes: number
  replies: number
  isLiked: boolean
  isAnonymous: boolean
}

interface Group {
  id: string
  name: string
  description: string
  members: number
  category: string
  isPrivate: boolean
  lastActivity: string
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"posts" | "groups">("posts")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showNewPost, setShowNewPost] = useState(false)

  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "Sarah M.",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Small wins today 🌟",
      content:
        "I managed to go for a 10-minute walk this morning despite feeling anxious. It's not much, but it felt like a victory. Anyone else celebrating small wins today?",
      category: "anxiety",
      timestamp: "2 hours ago",
      likes: 12,
      replies: 8,
      isLiked: false,
      isAnonymous: false,
    },
    {
      id: "2",
      author: "Anonymous",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Struggling with work stress",
      content:
        "The pressure at work has been overwhelming lately. I find myself staying up late worrying about tomorrow. Has anyone found effective ways to manage work-related anxiety?",
      category: "stress",
      timestamp: "4 hours ago",
      likes: 18,
      replies: 15,
      isLiked: true,
      isAnonymous: true,
    },
    {
      id: "3",
      author: "Mike R.",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "6 months of therapy - my experience",
      content:
        "I wanted to share my journey with therapy over the past 6 months. It's been challenging but incredibly rewarding. Happy to answer any questions about getting started.",
      category: "therapy",
      timestamp: "1 day ago",
      likes: 34,
      replies: 22,
      isLiked: false,
      isAnonymous: false,
    },
  ])
  const [showChat, setShowChat] = useState<string | null>(null)
  const [chatMessages, setChatMessages] = useState<{
    [key: string]: Array<{ id: string; author: string; message: string; timestamp: string }>
  }>({})
  const [newMessage, setNewMessage] = useState("")

  const groups: Group[] = [
    {
      id: "1",
      name: "Anxiety Support Circle",
      description: "A safe space to share experiences and coping strategies for anxiety",
      members: 1247,
      category: "anxiety",
      isPrivate: false,
      lastActivity: "2 hours ago",
    },
    {
      id: "2",
      name: "Young Professionals Wellness",
      description: "Mental health support for working professionals in their 20s and 30s",
      members: 892,
      category: "stress",
      isPrivate: false,
      lastActivity: "5 hours ago",
    },
    {
      id: "3",
      name: "Depression Recovery Journey",
      description: "Supporting each other through depression recovery",
      members: 654,
      category: "depression",
      isPrivate: true,
      lastActivity: "1 day ago",
    },
  ]

  const categories = [
    { id: "all", label: "All", count: posts.length },
    { id: "anxiety", label: "Anxiety", count: posts.filter((p) => p.category === "anxiety").length },
    { id: "depression", label: "Depression", count: posts.filter((p) => p.category === "depression").length },
    { id: "stress", label: "Stress", count: posts.filter((p) => p.category === "stress").length },
    { id: "therapy", label: "Therapy", count: posts.filter((p) => p.category === "therapy").length },
  ]

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const handleSendMessage = (postId: string) => {
    if (!newMessage.trim()) return

    const message = {
      id: Date.now().toString(),
      author: "You",
      message: newMessage,
      timestamp: "Just now",
    }

    setChatMessages((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), message],
    }))

    setNewMessage("")
  }

  return (
    <div className=" overflow-auto min-h-screen bg-[#F5F7FA] pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-[#333333] font-poppins">Community</h1>
            <p className="text-[#666666] font-lora">Connect with others on similar journeys</p>
          </div>
          <button onClick={() => setShowNewPost(true)} className="btn-primary p-3 rounded-full">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666] w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts and discussions..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Tabs */}
        <div className="flex rounded-lg bg-[#F5F7FA] p-1">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === "posts" ? "bg-white text-blue-500 shadow-sm" : "text-[#666666] hover:text-blue-500"
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab("groups")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === "groups" ? "bg-white text-blue-500 shadow-sm" : "text-[#666666] hover:text-blue-500"
            }`}
          >
            Groups
          </button>
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* Community Guidelines */}
        <div className="card bg-gradient-to-r from-blue-500 to-green-300 text-white">
          <h3 className="font-semibold mb-2 font-poppins">Community Guidelines</h3>
          <p className="text-sm font-lora opacity-90">
            Be kind, respectful, and supportive. This is a safe space for everyone to share and heal together.
          </p>
        </div>

        {activeTab === "posts" && (
          <>
            {/* Categories */}
            <div className="flex overflow-x-auto space-x-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-blue-500 text-white"
                      : "bg-white text-[#666666] hover:bg-blue-50 shadow-sm"
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="card hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <img
                      src={post.isAnonymous ? "/placeholder.svg?height=40&width=40" : post.avatar}
                      alt={post.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-[#333333] font-poppins">
                          {post.isAnonymous ? "Anonymous" : post.author}
                        </h4>
                        {post.isAnonymous && (
                          <div className="flex items-center text-xs text-[#666666]">
                            <Lock className="w-3 h-3 mr-1" />
                            Anonymous
                          </div>
                        )}
                        <span className="text-sm text-[#666666]">{post.timestamp}</span>
                      </div>

                      <h3 className="font-semibold text-[#333333] mb-2 font-poppins">{post.title}</h3>
                      <p className="text-[#666666] font-lora mb-3 leading-relaxed">{post.content}</p>

                      <div className="flex items-center space-x-1 mb-3">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleLike(post.id)}
                            className={`flex items-center space-x-1 text-sm transition-colors ${
                              post.isLiked ? "text-red-500" : "text-[#666666] hover:text-red-500"
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
                            <span>{post.likes}</span>
                          </button>
                          <button
                            onClick={() => setShowChat(post.id)}
                            className="flex items-center space-x-1 text-sm text-[#666666] hover:text-blue-500"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.replies}</span>
                          </button>
                        </div>
                        <button className="p-1 text-[#666666] hover:text-[#333333]">
                          <Flag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "groups" && (
          <div className="space-y-4">
            {groups.map((group) => (
              <div key={group.id} className="card hover:shadow-lg transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-[#333333] font-poppins">{group.name}</h3>
                      {group.isPrivate ? (
                        <Lock className="w-4 h-4 text-[#666666]" />
                      ) : (
                        <Globe className="w-4 h-4 text-[#666666]" />
                      )}
                    </div>

                    <p className="text-[#666666] font-lora mb-3">{group.description}</p>

                    <div className="flex items-center space-x-4 text-sm text-[#666666]">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {group.members.toLocaleString()} members
                      </div>
                      <span>Last activity: {group.lastActivity}</span>
                    </div>

                    <div className="mt-3">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{group.category}</span>
                    </div>
                  </div>

                  <button className="btn-secondary px-4 py-2 text-sm ml-4">
                    {group.isPrivate ? "Request to Join" : "Join Group"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 font-poppins">Share with Community</h3>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Title</label>
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Category</label>
                <select className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="general">General</option>
                  <option value="anxiety">Anxiety</option>
                  <option value="depression">Depression</option>
                  <option value="stress">Stress</option>
                  <option value="therapy">Therapy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Content</label>
                <textarea
                  placeholder="Share your thoughts, experiences, or questions..."
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor="anonymous" className="ml-2 text-sm text-[#666666]">
                  Post anonymously
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewPost(false)}
                  className="flex-1 py-3 px-4 border border-gray-200 rounded-full text-[#666666] hover:bg-[#F5F7FA] transition-colors"
                >
                  Cancel
                </button>
                <button type="submit" onClick={() => setShowNewPost(false)} className="flex-1 btn-primary">
                  Share Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md h-[70vh] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-poppins">Discussion</h3>
                <button onClick={() => setShowChat(null)} className="p-2 hover:bg-gray-100 rounded-full">
                  ✕
                </button>
              </div>
              <p className="text-sm text-[#666666] font-lora">{posts.find((p) => p.id === showChat)?.title}</p>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {(chatMessages[showChat] || []).map((message) => (
                <div key={message.id} className="flex space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {message.author[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm">{message.author}</span>
                      <span className="text-xs text-[#666666]">{message.timestamp}</span>
                    </div>
                    <p className="text-sm text-[#333333] bg-[#F5F7FA] p-2 rounded-lg">{message.message}</p>
                  </div>
                </div>
              ))}

              {(!chatMessages[showChat] || chatMessages[showChat].length === 0) && (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-[#666666] font-lora">No messages yet. Start the conversation!</p>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage(showChat)}
                />
                <button
                  onClick={() => handleSendMessage(showChat)}
                  disabled={!newMessage.trim()}
                  className="btn-primary px-4 py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation currentPage="community" />
    </div>
  )
}
