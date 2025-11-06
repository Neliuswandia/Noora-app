"use client"

import { useState } from "react"
import { ArrowLeft, Bookmark, BookmarkCheck, Share2, Play, Clock, User, Shield, BookOpen } from "lucide-react"

import { useParams } from "next/navigation"

export default function ResourceDetailPage() {
  const params = useParams()
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Mock resource data - in real app, fetch based on params.id
  const resource = {
    id: "1",
    title: "Understanding Anxiety: What Your Body Is Telling You",
    type: "article",
    category: "anxiety",
    summary:
      "Learn about the physical and emotional signs of anxiety and how to recognize when your body is responding to stress.",
    readTime: "3 min read",
    image: "/placeholder.svg?height=200&width=400",
    author: "Dr. Maria Rodriguez, PhD",
    publishDate: "January 15, 2024",
    content: `
      <h2>What Is Anxiety?</h2>
      <p>Anxiety is your body's natural response to stress and potential threats. It's a normal emotion that everyone experiences from time to time. However, when anxiety becomes persistent, overwhelming, or interferes with daily life, it may indicate an anxiety disorder.</p>
      
      <h2>Physical Signs of Anxiety</h2>
      <p>Your body has many ways of signaling anxiety:</p>
      <ul>
        <li><strong>Rapid heartbeat:</strong> Your heart may race or pound</li>
        <li><strong>Sweating:</strong> Especially in palms, underarms, or face</li>
        <li><strong>Muscle tension:</strong> Particularly in shoulders, neck, and jaw</li>
        <li><strong>Breathing changes:</strong> Shallow, rapid, or feeling short of breath</li>
        <li><strong>Digestive issues:</strong> Nausea, butterflies, or stomach upset</li>
      </ul>
      
      <h2>Emotional and Mental Signs</h2>
      <p>Anxiety also affects your thoughts and emotions:</p>
      <ul>
        <li>Persistent worry or fear</li>
        <li>Racing thoughts</li>
        <li>Difficulty concentrating</li>
        <li>Feeling restless or on edge</li>
        <li>Anticipating the worst-case scenario</li>
      </ul>
      
      <h2>When to Seek Help</h2>
      <p>Consider reaching out to a mental health professional if:</p>
      <ul>
        <li>Anxiety interferes with work, school, or relationships</li>
        <li>You avoid situations due to anxiety</li>
        <li>Physical symptoms are severe or persistent</li>
        <li>You're using substances to cope with anxiety</li>
        <li>You're having thoughts of self-harm</li>
      </ul>
      
      <h2>Remember</h2>
      <p>Anxiety is treatable, and you don't have to face it alone. With proper support and treatment, you can learn to manage anxiety and live a fulfilling life.</p>
    `,
    relatedResources: [
      { id: "2", title: "CBT Basics: Changing Thought Patterns", type: "video" },
      { id: "3", title: "5 Grounding Techniques for Panic Attacks", type: "infographic" },
    ],
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <a href="/resources">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
          </a>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-6 h-6 text-[#FF6F61]" />
              ) : (
                <Bookmark className="w-6 h-6 text-gray-600" />
              )}
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-4xl mx-auto">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-xs bg-[#4A90E2] bg-opacity-10 text-[#4A90E2] px-3 py-1 rounded-full font-medium">
              {resource.category}
            </span>
            <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium capitalize">
              {resource.type}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-[#333333] font-poppins mb-4 leading-tight">{resource.title}</h1>

          <div className="flex items-center space-x-6 text-sm text-[#666666] mb-6">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {resource.author}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {resource.readTime}
            </div>
            <span>{resource.publishDate}</span>
          </div>

          {resource.image && (
            <img
              src={resource.image || "/placeholder.svg"}
              alt={resource.title}
              className="w-full h-64 object-cover rounded-xl shadow-lg mb-6"
            />
          )}
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div
            className="text-[#333333] font-lora leading-relaxed"
            dangerouslySetInnerHTML={{ __html: resource.content }}
          />
        </article>

        {/* Related Resources */}
        <div className="mt-12 card">
          <h3 className="font-semibold text-[#333333] font-poppins mb-4">Related Resources</h3>
          <div className="space-y-3">
            {resource.relatedResources.map((related) => (
              <a key={related.id} href={`/resources/${related.id}`}>
                <div className="flex items-center justify-between p-3 hover:bg-[#F5F7FA] rounded-lg transition-colors">
                  <div className="flex items-center">
                    {related.type === "video" ? (
                      <Play className="w-5 h-5 text-[#4A90E2] mr-3" />
                    ) : (
                      <BookOpen className="w-5 h-5 text-[#A3D8C6] mr-3" />
                    )}
                    <span className="font-medium text-[#333333]">{related.title}</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                    {related.type}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Crisis Support Notice */}
        <div className="mt-8 card bg-[#FFF9E6] border border-[#FFE066]">
          <div className="flex items-start">
            <Shield className="w-5 h-5 text-[#FF6F61] mr-3 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-[#333333] mb-2 font-poppins">Need Immediate Support?</h4>
              <p className="text-[#666666] font-lora text-sm leading-relaxed mb-3">
                If you're experiencing severe anxiety or having thoughts of self-harm, please reach out for immediate
                support.
              </p>
              <a href="/crisis-support">
                <button className="text-[#FF6F61] font-medium text-sm hover:underline">Get Crisis Support →</button>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
