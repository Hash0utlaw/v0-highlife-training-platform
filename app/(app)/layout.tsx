import type React from "react"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { BottomNav } from "@/components/bottom-nav"
import { DesktopNav } from "@/components/desktop-nav"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("must_change_password, is_admin")
    .eq("id", user.id)
    .single()

  // Force password change on first login
  const headersList = await headers()
  const pathname = headersList.get("x-pathname") ?? ""
  if (profile?.must_change_password && !pathname.startsWith("/change-password")) {
    redirect("/change-password")
  }

  // Protect /admin routes — only admins may access them
  // /admin/seed is exempt so it can be used to bootstrap the first accounts
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/seed") && !profile?.is_admin) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <DesktopNav />
      <main className="md:ml-64 pb-20 md:pb-0 min-h-screen">{children}</main>
      <BottomNav />
    </div>
  )
}
