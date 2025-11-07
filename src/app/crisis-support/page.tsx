"use client"

import { useState } from "react"
import { Phone, MessageCircle, MapPin, Heart, Shield, Clock, ExternalLink } from "lucide-react"
import BottomNavigation from "@/components/BottomNavigation"

export default function CrisisSupport() {
  const [location, setLocation] = useState("United States")
  const [showSafetyPlan, setShowSafetyPlan] = useState(false)

  const crisisResources = [
    {
      name: "988 Suicide & Crisis Lifeline",
      phone: "988",
      description: "24/7 free and confidential support",
      available: "24/7",
      languages: ["English", "Spanish"],
    },
    {
      name: "Crisis Text Line",
      phone: "Text HOME to 741741",
      description: "Free 24/7 crisis support via text",
      available: "24/7",
      languages: ["English", "Spanish"],
    },
    {
      name: "SAMHSA National Helpline",
      phone: "1-800-662-4357",
      description: "Treatment referral and information service",
      available: "24/7",
      languages: ["English", "Spanish"],
    },
  ]

  const localResources = [
    {
      name: "Community Mental Health Center",
      address: "123 Main St, Your City",
      phone: "(555) 123-4567",
      distance: "2.3 miles",
      services: ["Crisis intervention", "Emergency counseling"],
    },
    {
      name: "Regional Hospital Emergency",
      address: "456 Health Ave, Your City",
      phone: "(555) 987-6543",
      distance: "4.1 miles",
      services: ["24/7 Emergency", "Psychiatric evaluation"],
    },
  ]

  const safetyPlanSteps = [
    {
      step: 1,
      title: "Warning Signs",
      description: "Recognize thoughts, feelings, or behaviors that indicate crisis",
      example: "Feeling hopeless, isolating from others, increased substance use",
    },
    {
      step: 2,
      title: "Coping Strategies",
      description: "Things you can do on your own to help yourself feel better",
      example: "Deep breathing, listening to music, taking a walk",
    },
    {
      step: 3,
      title: "Social Support",
      description: "People who can provide distraction and support",
      example: "Family members, friends, support group members",
    },
    {
      step: 4,
      title: "Professional Contacts",
      description: "Mental health professionals and agencies to contact",
      example: "Therapist, crisis hotline, emergency services",
    },
    {
      step: 5,
      title: "Safe Environment",
      description: "Make your environment safer by removing means of harm",
      example: "Remove or secure potentially harmful items",
    },
  ]

  return (
    <div className="h-screen bg-[#F5F7FA] pb-20">
      {/* Header */}
      <header className="bg-linear-to-r from-[#FF6F61] to-[#FF8A80] text-white p-6">
        <div className="flex items-center mb-4">
          <Shield className="w-8 h-8 mr-3" />
          <div>
            <h1 className="text-2xl font-bold font-poppins">Crisis Support</h1>
            <p className="font-lora">Immediate help is available 24/7</p>
          </div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-4">
          <p className="text-sm font-lora">
            <strong>You are not alone.</strong> If you're having thoughts of suicide or self-harm, please reach out for
            help immediately. These resources are here for you.
          </p>
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* Emergency Actions */}
        <div className="card bg-white border-l-4 border-[#FF6F61]">
          <h3 className="font-semibold text-lg mb-4 font-poppins text-[#FF6F61]">Immediate Crisis Support</h3>
          <div className="space-y-3">
            <a href="tel:988" className="block">
              <button className="btn-crisis w-full flex items-center justify-center text-lg py-4">
                <Phone className="w-6 h-6 mr-3" />
                Call 988 - Suicide & Crisis Lifeline
              </button>
            </a>
            <a href="sms:741741?body=HOME" className="block">
              <button className="w-full bg-[#4A90E2] hover:bg-[#3A7BC8] text-white font-medium py-4 px-6 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 mr-3" />
                Text HOME to 741741
              </button>
            </a>
          </div>
        </div>

        {/* National Resources */}
        <div className="card">
          <h3 className="font-semibold text-lg mb-4 font-poppins">National Crisis Resources</h3>
          <div className="space-y-4">
            {crisisResources.map((resource, index) => (
              <div key={index} className="p-4 bg-[#F5F7FA] rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#333333] font-poppins">{resource.name}</h4>
                    <p className="text-sm text-[#666666] font-lora mt-1">{resource.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center text-xs text-[#666666]">
                        <Clock className="w-3 h-3 mr-1" />
                        {resource.available}
                      </div>
                      <div className="text-xs text-[#666666]">Languages: {resource.languages.join(", ")}</div>
                    </div>
                  </div>
                  <a href={`tel:${resource.phone.replace(/\D/g, "")}`}>
                    <button className="btn-secondary px-4 py-2 text-sm ml-3">
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Local Resources */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg font-poppins">Local Resources</h3>
            <button className="flex items-center text-[#4A90E2] text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              {location}
            </button>
          </div>
          <div className="space-y-4">
            {localResources.map((resource, index) => (
              <div key={index} className="p-4 bg-[#F5F7FA] rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#333333] font-poppins">{resource.name}</h4>
                    <p className="text-sm text-[#666666] mt-1">{resource.address}</p>
                    <p className="text-sm text-[#666666]">{resource.distance}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {resource.services.map((service) => (
                        <span key={service} className="text-xs bg-[#A3D8C6] text-[#333333] px-2 py-1 rounded-full">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 ml-3">
                    <a href={`tel:${resource.phone}`}>
                      <button className="btn-secondary px-3 py-2 text-sm">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </button>
                    </a>
                    <button className="btn-primary px-3 py-2 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      Directions
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Plan */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg font-poppins">Personal Safety Plan</h3>
            <button onClick={() => setShowSafetyPlan(!showSafetyPlan)} className="text-[#4A90E2] text-sm font-medium">
              {showSafetyPlan ? "Hide" : "Create/View"}
            </button>
          </div>

          {showSafetyPlan ? (
            <div className="space-y-4">
              <p className="text-sm text-[#666666] font-lora mb-4">
                A safety plan is a personalized, practical plan that can help you avoid dangerous situations and know
                how to react when you're having thoughts of suicide.
              </p>
              {safetyPlanSteps.map((step) => (
                <div key={step.step} className="p-4 bg-[#F5F7FA] rounded-lg">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-[#4A90E2] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#333333] font-poppins">{step.title}</h4>
                      <p className="text-sm text-[#666666] font-lora mt-1">{step.description}</p>
                      <p className="text-xs text-[#888888] mt-2 italic">Example: {step.example}</p>
                      <button className="text-[#4A90E2] text-sm mt-2 hover:underline">Add your own →</button>
                    </div>
                  </div>
                </div>
              ))}
              <button className="btn-primary w-full mt-4">Save My Safety Plan</button>
            </div>
          ) : (
            <p className="text-sm text-[#666666] font-lora">
              Create a personalized safety plan to help you stay safe during difficult times. This plan will be private
              and accessible only to you.
            </p>
          )}
        </div>

        {/* Additional Resources */}
        <div className="card">
          <h3 className="font-semibold text-lg mb-4 font-poppins">Additional Support</h3>
          <div className="space-y-3">
            <button className="w-full p-4 bg-[#F5F7FA] rounded-lg text-left hover:bg-[#E8F4FD] transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-[#333333] font-poppins">Online Crisis Chat</h4>
                  <p className="text-sm text-[#666666] font-lora">Chat with a crisis counselor</p>
                </div>
                <ExternalLink className="w-5 h-5 text-[#666666]" />
              </div>
            </button>

            <button className="w-full p-4 bg-[#F5F7FA] rounded-lg text-left hover:bg-[#E8F4FD] transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-[#333333] font-poppins">Mental Health First Aid</h4>
                  <p className="text-sm text-[#666666] font-lora">Learn how to help others in crisis</p>
                </div>
                <ExternalLink className="w-5 h-5 text-[#666666]" />
              </div>
            </button>

            <button className="w-full p-4 bg-[#F5F7FA] rounded-lg text-left hover:bg-[#E8F4FD] transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-[#333333] font-poppins">Crisis Resources by State</h4>
                  <p className="text-sm text-[#666666] font-lora">Find local crisis centers</p>
                </div>
                <ExternalLink className="w-5 h-5 text-[#666666]" />
              </div>
            </button>
          </div>
        </div>

        {/* Encouragement */}
        <div className="card bg-gradient-to-r from-[#4A90E2] to-[#A3D8C6] text-white">
          <div className="flex items-start">
            <Heart className="w-8 h-8 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2 font-poppins">You Matter</h3>
              <p className="font-lora text-sm leading-relaxed">
                Your life has value and meaning. Even in the darkest moments, there is hope. Recovery is possible, and
                you deserve support. Please reach out - there are people who care about you and want to help.
              </p>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation currentPage="crisis" />
    </div>
  )
}
