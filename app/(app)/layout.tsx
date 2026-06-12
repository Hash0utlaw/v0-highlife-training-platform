import type React from "react"
import { BottomNav } from "@/components/bottom-nav"
import { DesktopNav } from "@/components/desktop-nav"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <DesktopNav />
      <main className="md:ml-64 pb-20 md:pb-0 min-h-screen">{children}</main>
      <BottomNav />
    </div>
  )
}
