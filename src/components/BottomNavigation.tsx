"use client"


import { Home, MessageCircle, TrendingUp, Settings, Target, Moon } from "lucide-react"
import { usePathname } from "next/navigation"

interface BottomNavigationProps {
  currentPage?: string
  isGuest?: boolean
}

export default function BottomNavigation({ currentPage, isGuest = false }: BottomNavigationProps) {
  const pathname = usePathname()

  const navItems = [
    {
      href: isGuest ? "/dashboard?guest=true" : "/dashboard",
      icon: Home,
      label: "Home",
      id: "home",
    },
    {
      href: "/ai-companion",
      icon: MessageCircle,
      label: "AI Chat",
      id: "chat",
    },
    {
      href: "/mood-tracker",
      icon: TrendingUp,
      label: "Mood",
      id: "mood",
    },
    {
      href: "/sleep-tracker",
      icon: Moon,
      label: "Sleep",
      id: "sleep",
    },
    {
      href: "/goals",
      icon: Target,
      label: "Goals",
      id: "goals",
    },
    {
      href: "/settings",
      icon: Settings,
      label: "Settings",
      id: "settings",
    },
  ]

  const getActiveState = (itemId: string, href: string) => {
    if (currentPage) {
      return currentPage === itemId
    }
    return pathname === href || (href !== "/" && pathname.startsWith(href))
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = getActiveState(item.id, item.href)
          const isDisabled = item.disabled && isGuest

          return (
            <a
              key={item.id}
              href={isDisabled ? "#" : item.href}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : isActive
                    ? "text-[#4A90E2] bg-[#E8F4FD]"
                    : "text-[#666666] hover:text-[#4A90E2] hover:bg-[#F5F7FA]"
              }`}
              onClick={isDisabled ? (e) => e.preventDefault() : undefined}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
