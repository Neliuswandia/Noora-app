"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Calendar, Clock, Video, Phone, MapPin, ArrowLeft, Check } from "lucide-react"
import BottomNavigation from "@/components/BottomNavigation"
import { useHistory } from "react-router"

export default function BookingPage() {
  const { therapist: therapistId } = useParams()
  const router = useHistory()

  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [sessionType, setSessionType] = useState<"video" | "phone" | "in-person">("video")
  const [isBooked, setIsBooked] = useState(false)

  // Mock therapist data
  const therapist = {
    id: "1",
    name: "Dr. Sarah Chen",
    credentials: "PhD, Licensed Clinical Psychologist",
    image: "/placeholder.svg?height=80&width=80",
    rate: "$150/session",
    nextAvailable: "Tomorrow",
  }

  const availableDates = [
    { date: "2024-01-16", day: "Today", slots: ["2:00 PM", "4:00 PM"] },
    { date: "2024-01-17", day: "Tomorrow", slots: ["10:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"] },
    { date: "2024-01-18", day: "Thursday", slots: ["9:00 AM", "11:00 AM", "3:00 PM", "5:00 PM"] },
    { date: "2024-01-19", day: "Friday", slots: ["10:00 AM", "1:00 PM", "3:00 PM"] },
  ]

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      setIsBooked(true)
    }
  }

  if (isBooked) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-[#333333] font-poppins mb-4">Session Booked! 🎉</h1>
          <p className="text-[#666666] font-lora mb-6">
            Your session with {therapist.name} has been confirmed for {selectedDate} at {selectedTime}.
          </p>

          <div className="card text-left mb-6">
            <h3 className="font-semibold mb-3 font-poppins">Session Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#666666]">Therapist:</span>
                <span className="font-medium">{therapist.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Date:</span>
                <span className="font-medium">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Time:</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Type:</span>
                <span className="font-medium capitalize">{sessionType} Session</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Cost:</span>
                <span className="font-medium">{therapist.rate}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <a href="/dashboard">
              <button className="btn-primary w-full">Return to Dashboard</button>
            </a>
            <a href="/sessions">
              <button className="btn-secondary w-full">View My Sessions</button>
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm p-6">
        <div className="flex items-center mb-4">
          <a href="/find-therapist">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-3">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
          </a>
          <h1 className="text-2xl font-bold text-[#333333] font-poppins">Book Session</h1>
        </div>

        {/* Therapist Info */}
        <div className="flex items-center space-x-4">
          <img
            src={therapist.image || "/placeholder.svg"}
            alt={therapist.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-[#333333] font-poppins">{therapist.name}</h2>
            <p className="text-sm text-[#666666]">{therapist.credentials}</p>
            <p className="text-sm font-medium text-blue-500">{therapist.rate}</p>
          </div>
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* Session Type */}
        <div className="card">
          <h3 className="font-semibold mb-4 font-poppins">Session Type</h3>
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => setSessionType("video")}
              className={`p-4 rounded-lg border-2 transition-all ${
                sessionType === "video" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center">
                <Video className="w-6 h-6 text-blue-500 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-[#333333]">Video Call</p>
                  <p className="text-sm text-[#666666]">Secure video session from anywhere</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setSessionType("phone")}
              className={`p-4 rounded-lg border-2 transition-all ${
                sessionType === "phone" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-green-500 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-[#333333]">Phone Call</p>
                  <p className="text-sm text-[#666666]">Audio-only session</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setSessionType("in-person")}
              className={`p-4 rounded-lg border-2 transition-all ${
                sessionType === "in-person" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-red-500 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-[#333333]">In-Person</p>
                  <p className="text-sm text-[#666666]">Meet at therapist's office</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Available Dates */}
        <div className="card">
          <h3 className="font-semibold mb-4 font-poppins flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-500" />
            Select Date
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {availableDates.map((dateOption) => (
              <button
                key={dateOption.date}
                onClick={() => {
                  setSelectedDate(dateOption.date)
                  setSelectedTime("") // Reset time when date changes
                }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedDate === dateOption.date
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <p className="font-medium text-[#333333]">{dateOption.day}</p>
                <p className="text-sm text-[#666666]">{dateOption.date}</p>
                <p className="text-xs text-blue-500 mt-1">{dateOption.slots.length} slots</p>
              </button>
            ))}
          </div>
        </div>

        {/* Available Times */}
        {selectedDate && (
          <div className="card">
            <h3 className="font-semibold mb-4 font-poppins flex items-center">
              <Clock className="w-5 h-5 mr-2 text-green-500" />
              Select Time
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {availableDates
                .find((d) => d.date === selectedDate)
                ?.slots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedTime === time ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <p className="font-medium text-[#333333]">{time}</p>
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Session Summary */}
        {selectedDate && selectedTime && (
          <div className="card bg-gradient-to-r from-blue-500 to-green-300 text-white">
            <h3 className="font-semibold mb-3 font-poppins">Session Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span>{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Type:</span>
                <span className="capitalize">{sessionType}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>50 minutes</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>{therapist.rate}</span>
              </div>
            </div>
          </div>
        )}

        {/* Book Button */}
        <button
          onClick={handleBooking}
          disabled={!selectedDate || !selectedTime}
          className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm Booking
        </button>

        {/* Cancellation Policy */}
        <div className="card bg-gray-50">
          <h4 className="font-medium text-[#333333] mb-2">Cancellation Policy</h4>
          <p className="text-sm text-[#666666] font-lora">
            You can cancel or reschedule your session up to 24 hours before the appointment time without charge. Late
            cancellations may incur a fee.
          </p>
        </div>
      </main>

      <BottomNavigation currentPage="therapist" />
    </div>
  )
}
