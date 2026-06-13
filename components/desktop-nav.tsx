"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package, GraduationCap, ClipboardCheck, User, Lightbulb, Leaf, BookOpen, ShieldCheck, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/products", icon: Package, label: "Products" },
  { href: "/training", icon: GraduationCap, label: "Training" },
  { href: "/quizzes", icon: ClipboardCheck, label: "Quizzes" },
  { href: "/handbook", icon: BookOpen, label: "Handbook" },
  { href: "/sales-tips", icon: Lightbulb, label: "Sales Tips" },
  { href: "/badges", icon: Trophy, label: "Achievements" },
  { href: "/profile", icon: User, label: "Profile" },
]

const adminNavItems = [
  { href: "/admin", icon: ShieldCheck, label: "Admin" },
]

export function DesktopNav() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-16 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/20">
          <Leaf className="w-5 h-5 text-primary" />
        </div>
        <span className="font-semibold text-sidebar-foreground">Highlife Training</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Admin section */}
      <div className="px-3 pb-3">
        <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
          Leadership
        </p>
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <ThemeToggle />
      </div>
    </aside>
  )
}
