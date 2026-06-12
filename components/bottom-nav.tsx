"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package, GraduationCap, BookOpen, User, ClipboardCheck, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const primaryNav = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/training", icon: GraduationCap, label: "Training" },
  { href: "/handbook", icon: BookOpen, label: "Handbook" },
  { href: "/quizzes", icon: ClipboardCheck, label: "Quizzes" },
  { href: "/profile", icon: User, label: "Profile" },
]

const moreNav = [
  { href: "/products", icon: Package, label: "Products" },
  { href: "/sales-tips", icon: Lightbulb, label: "Sales Tips" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/98 backdrop-blur-md border-t border-border md:hidden safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-1">
        {primaryNav.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 flex-1 h-full min-w-0 px-1 transition-all",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-8 h-7 rounded-xl transition-all",
                isActive ? "bg-primary/15" : ""
              )}>
                <item.icon className={cn("transition-all", isActive ? "h-5 w-5" : "h-[18px] w-[18px]")} />
              </div>
              <span className={cn("text-[10px] font-medium leading-none truncate max-w-full", isActive ? "text-primary" : "text-muted-foreground")}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
