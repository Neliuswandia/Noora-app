import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { RewardsProvider } from "@/components/RewardsSystem"

export const metadata: Metadata = {
  title: "SerenitySpace - Mental Health & Wellness",
  description: "Your personal space for mental health support, mindfulness, and wellness",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body antialiased" suppressHydrationWarning>
        <RewardsProvider>{children}</RewardsProvider>
      </body>
    </html>
  )
}
