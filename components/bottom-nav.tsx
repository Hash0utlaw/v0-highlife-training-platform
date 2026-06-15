"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Package,
  GraduationCap,
  BookOpen,
  User,
  ClipboardCheck,
  Lightbulb,
  Trophy,
  Briefcase,
  ShieldCheck,
  MoreHorizontal,
  X,
  Moon,
  Sun,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

const primaryNav = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/training", icon: GraduationCap, label: "Training" },
  { href: "/quizzes", icon: ClipboardCheck, label: "Quizzes" },
  { href: "/profile", icon: User, label: "Profile" },
]

const moreNav = [
  { href: "/products", icon: Package, label: "Products" },
  { href: "/handbook", icon: BookOpen, label: "Handbook" },
  { href: "/sales-tips", icon: Lightbulb, label: "Sales Tips" },
  { href: "/badges", icon: Trophy, label: "Achievements" },
  { href: "/job-descriptions", icon: Briefcase, label: "Job Descriptions" },
  { href: "/admin", icon: ShieldCheck, label: "Admin" },
]

export function BottomNav() {
  const pathname = usePathname()
  const [moreOpen, setMoreOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const isMoreActive = moreNav.some(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  )

  // Close the More menu whenever the route changes
  useEffect(() => {
    setMoreOpen(false)
  }, [pathname])

  // Prevent background scroll while the More sheet is open
  useEffect(() => {
    if (moreOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [moreOpen])

  return (
    <>
      {/* More sheet + backdrop */}
      {moreOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="More navigation">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMoreOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-2xl pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-2 px-4 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between py-2">
              <h2 className="text-sm font-semibold text-foreground">More</h2>
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                aria-label="Close menu"
                className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:bg-secondary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 pb-3">
              {moreNav.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMoreOpen(false)}
                    className={cn(
                      "flex flex-col items-center justify-center gap-2 rounded-xl border p-3 text-center transition-all active:scale-95",
                      isActive
                        ? "border-primary/40 bg-primary/10"
                        : "border-border bg-secondary/40 hover:border-primary/30",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-lg",
                        isActive ? "bg-primary/15" : "bg-secondary",
                      )}
                    >
                      <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
                    </div>
                    <span
                      className={cn(
                        "text-[11px] font-medium leading-tight text-balance",
                        isActive ? "text-primary" : "text-foreground",
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                )
              })}
            </div>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex w-full items-center gap-3 rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm font-medium text-foreground active:scale-[0.99] transition-transform"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-secondary">
                <Sun className="h-4 w-4 text-amber-400 dark:hidden" />
                <Moon className="hidden h-4 w-4 text-primary dark:block" />
              </span>
              <span className="dark:hidden">Switch to dark mode</span>
              <span className="hidden dark:inline">Switch to light mode</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom tab bar */}
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
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-7 rounded-xl transition-all",
                    isActive ? "bg-primary/15" : "",
                  )}
                >
                  <item.icon className={cn("transition-all", isActive ? "h-5 w-5" : "h-[18px] w-[18px]")} />
                </div>
                <span
                  className={cn(
                    "text-[10px] font-medium leading-none truncate max-w-full",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}

          {/* More button */}
          <button
            type="button"
            onClick={() => setMoreOpen((v) => !v)}
            aria-expanded={moreOpen}
            aria-label="More navigation options"
            className={cn(
              "flex flex-col items-center justify-center gap-0.5 flex-1 h-full min-w-0 px-1 transition-all",
              moreOpen || isMoreActive ? "text-primary" : "text-muted-foreground",
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center w-8 h-7 rounded-xl transition-all",
                moreOpen || isMoreActive ? "bg-primary/15" : "",
              )}
            >
              <MoreHorizontal className={cn("transition-all", moreOpen || isMoreActive ? "h-5 w-5" : "h-[18px] w-[18px]")} />
            </div>
            <span
              className={cn(
                "text-[10px] font-medium leading-none truncate max-w-full",
                moreOpen || isMoreActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              More
            </span>
          </button>
        </div>
      </nav>
    </>
  )
}
