"use client"

import { useState } from "react"
import { Calendar, Video, Phone, MapPin, Clock, MessageCircle, Star } from "lucide-react"
import BottomNavigation from "@/components/BottomNavigation"


interface Session {
  id: string
  therapist: {
    name: string
    image: string
  }
  date: string
  time: string
  type: "video" | "phone" | "in-person"
  status: "upcoming" | "completed" | "cancelled"
  notes?: string
}

export default function SessionsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming")
  const [cancellingSession, setCancellingSession] = useState<string | null>(null)

  const sessions: Session[] = [
    {
      id: "1",
      therapist: {
        name: "Dr. Sarah Chen",
        image: "/placeholder.svg?height=60&width=60",
      },
      date: "2024-01-17",
      time: "2:00 PM",
      type: "video",
      status: "upcoming",
    },
    {
      id: "2",
      therapist: {
        name: "Dr. Sarah Chen",
        image: "/placeholder.svg?height=60&width=60",
      },
      date: "2024-01-10",
      time: "2:00 PM",
      type: "video",
      status: "completed",
      notes: "Discussed coping strategies for work anxiety. Homework: practice breathing exercises daily.",
    },
    {
      id: "3",
      therapist: {
        name: "Dr. Sarah Chen",
        image: "/placeholder.svg?height=60&width=60",
      },
      date: "2024-01-03",
      time: "2:00 PM",
      type: "video",
      status: "completed",
      notes: "Initial assessment session. Identified main concerns and treatment goals.",
    },
  ]

  const upcomingSessions = sessions.filter((s) => s.status === "upcoming")
  const pastSessions = sessions.filter((s) => s.status === "completed")

  const getSessionIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video
      case "phone":
        return Phone
      case "in-person":
        return MapPin
      default:
        return Video
    }
  }

  const handleCancelSession = (sessionId: string) => {
    setCancellingSession(sessionId)
  }

  const confirmCancelSession = (sessionId: string) => {
    // Here you would typically make an API call to cancel the session
    console.log(`Cancelling session ${sessionId}`)
    setCancellingSession(null)
    // You could also update the sessions state to remove the cancelled session
  }

  return (
    <div className="overflow-auto h-screen bg-[#F5F7FA] pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm p-6">
        <h1 className="text-2xl font-bold text-[#333333] font-poppins mb-4">My Sessions</h1>

        {/* Tabs */}
        <div className="flex rounded-lg bg-[#F5F7FA] p-1">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === "upcoming" ? "bg-white text-blue-500 shadow-sm" : "text-[#666666] hover:text-blue-500"
            }`}
          >
            Upcoming ({upcomingSessions.length})
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === "past" ? "bg-white text-blue-500 shadow-sm" : "text-[#666666] hover:text-blue-500"
            }`}
          >
            Past Sessions ({pastSessions.length})
          </button>
        </div>
      </header>

      <main className="p-4 sm:p-6 space-y-6">
        {activeTab === "upcoming" && (
          <>
            {upcomingSessions.length === 0 ? (
              <div className="card text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#333333] font-poppins mb-2">No Upcoming Sessions</h3>
                <p className="text-[#666666] font-lora mb-6">Ready to schedule your next therapy session?</p>
                <a href="/find-therapist">
                  <button className="btn-primary">Find a Therapist</button>
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingSessions.map((session) => {
                  const SessionIcon = getSessionIcon(session.type)
                  return (
                    <div key={session.id} className="card">
                      <div className="flex flex-col sm:flex-row items-start sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                        <img
                          src={session.therapist.image || "/placeholder.svg"}
                          alt={session.therapist.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
                        />

                        <div className="flex-1 w-full">
                          <h3 className="font-semibold text-[#333333] font-poppins mb-1">{session.therapist.name}</h3>

                          <div className="flex flex-wrap items-center gap-3 text-sm text-[#666666] mb-3">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {session.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {session.time}
                            </div>
                            <div className="flex items-center">
                              <SessionIcon className="w-4 h-4 mr-1" />
                              <span className="capitalize">{session.type}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <button className="btn-primary px-4 py-2 text-sm w-full sm:w-auto">Join Session</button>
                            <button className="btn-secondary px-4 py-2 text-sm w-full sm:w-auto">Reschedule</button>
                            <button
                              onClick={() => handleCancelSession(session.id)}
                              className="px-4 py-2 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors w-full sm:w-auto"
                            >
                              Cancel
                            </button>
                            <a href={`/therapist/1/message`}>
                              <button className="p-2 text-[#666666] hover:text-blue-500">
                                <MessageCircle className="w-5 h-5" />
                              </button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}

        {activeTab === "past" && (
          <>
            {pastSessions.length === 0 ? (
              <div className="card text-center py-12">
                <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#333333] font-poppins mb-2">No Past Sessions</h3>
                <p className="text-[#666666] font-lora">Your completed sessions will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pastSessions.map((session) => {
                  const SessionIcon = getSessionIcon(session.type)
                  return (
                    <div key={session.id} className="card">
                      <div className="flex flex-col sm:flex-row items-start sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                        <img
                          src={session.therapist.image || "/placeholder.svg"}
                          alt={session.therapist.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
                        />

                        <div className="flex-1 w-full">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                            <h3 className="font-semibold text-[#333333] font-poppins">{session.therapist.name}</h3>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full inline-block">
                              Completed
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-sm text-[#666666] mb-3">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {session.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {session.time}
                            </div>
                            <div className="flex items-center">
                              <SessionIcon className="w-4 h-4 mr-1" />
                              <span className="capitalize">{session.type}</span>
                            </div>
                          </div>

                          {session.notes && (
                            <div className="bg-[#F5F7FA] p-3 rounded-lg mb-3">
                              <h4 className="text-sm font-medium text-[#333333] mb-1">Session Notes</h4>
                              <p className="text-sm text-[#666666] font-lora">{session.notes}</p>
                            </div>
                          )}

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex flex-wrap gap-2">
                              <button className="btn-secondary px-4 py-2 text-sm w-full sm:w-auto">Book Follow-up</button>
                              <a href={`/therapist/1/message`}>
                                <button className="p-2 text-[#666666] hover:text-blue-500">
                                  <MessageCircle className="w-5 h-5" />
                                </button>
                              </a>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-sm text-[#666666]">Rate session:</span>
                              <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button key={star} className="text-yellow-400 hover:text-yellow-500">
                                    <Star className="w-4 h-4 fill-current" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}

        {/* Quick Actions */}
        <div className="card">
          <h3 className="font-semibold mb-4 font-poppins">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href="/find-therapist">
              <button className="w-full p-4 bg-[#F5F7FA] rounded-lg hover:bg-[#E8F4FD] transition-colors text-left">
                <Calendar className="w-6 h-6 text-blue-500 mb-2" />
                <p className="font-medium text-[#333333] text-sm">Book New Session</p>
              </button>
            </a>

            <a href="/ai-companion">
              <button className="w-full p-4 bg-[#F5F7FA] rounded-lg hover:bg-[#E8F4FD] transition-colors text-left">
                <MessageCircle className="w-6 h-6 text-green-400 mb-2" />
                <p className="font-medium text-[#333333] text-sm">Chat with AI</p>
              </button>
            </a>
          </div>
        </div>
      </main>

      {/* Cancellation Confirmation Dialog */}
      {cancellingSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-[#333333] font-poppins mb-2">Cancel Appointment?</h3>
            <p className="text-[#666666] font-lora mb-6">
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
              <button
                onClick={() => setCancellingSession(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Keep Appointment
              </button>
              <button
                onClick={() => confirmCancelSession(cancellingSession)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation currentPage="therapist" />
    </div>
  )
}
