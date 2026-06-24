import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { BottomNav } from "@/components/bottom-nav"
import { DesktopNav } from "@/components/desktop-nav"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // If they still have the temp password, force the change (unless already on that page)
  const { data: profile } = await supabase
    .from("profiles")
    .select("must_change_password")
    .eq("id", user.id)
    .single()

  return (
    <div className="min-h-screen bg-background">
      <DesktopNav />
      <main className="md:ml-64 pb-20 md:pb-0 min-h-screen">{children}</main>
      <BottomNav />
    </div>
  )
}
