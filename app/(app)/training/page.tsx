"use client"

import { useState, useMemo } from "react"
import { mockModules } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Clock,
  CheckCircle2,
  PlayCircle,
  BookOpen,
  Search,
  ChevronRight,
  Trophy,
  Layers,
  Lock,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const CATEGORY_COLORS: Record<string, string> = {
  all: "bg-secondary text-secondary-foreground",
  "product knowledge": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  compliance: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  operations: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  safety: "bg-red-500/15 text-red-400 border-red-500/30",
  sales: "bg-purple-500/15 text-purple-400 border-purple-500/30",
}

function CircularProgress({ value, size = 48 }: { value: number; size?: number }) {
  const radius = (size - 6) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={3} fill="none" className="text-border" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={3}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="text-primary transition-all duration-700"
      />
    </svg>
  )
}

export default function TrainingPage() {
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  const completedCount = mockModules.filter((m) => m.completed).length
  const inProgressCount = mockModules.filter((m) => !m.completed && m.progress > 0).length
  const overallProgress = Math.round((completedCount / mockModules.length) * 100)

  const filtered = useMemo(() => {
    return mockModules.filter((m) => {
      const matchesSearch = search.length < 2 || m.title.toLowerCase().includes(search.toLowerCase()) || m.description.toLowerCase().includes(search.toLowerCase())
      return matchesSearch
    })
  }, [search])

  return (
    <div className="min-h-full">
      {/* Hero Header */}
      <div className="relative bg-card border-b border-border overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative px-4 md:px-8 py-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Layers className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-primary uppercase tracking-wider">Training Center</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Your Learning Path</h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Complete modules to build your product knowledge and earn certifications.
              </p>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-4 md:gap-6 shrink-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{completedCount}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{inProgressCount}</div>
                <div className="text-xs text-muted-foreground">In Progress</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{mockModules.length - completedCount - inProgressCount}</div>
                <div className="text-xs text-muted-foreground">Not Started</div>
              </div>
            </div>
          </div>

          {/* Overall progress */}
          <div className="mt-6 max-w-md">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted-foreground">Overall completion</span>
              <span className="text-xs font-semibold text-primary">{overallProgress}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-700"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-4 md:px-8 py-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search modules..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-xs bg-card border-border"
            />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{filtered.length} module{filtered.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
      </div>

      {/* Module Grid */}
      <div className="px-4 md:px-8 py-6">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">No modules match your search.</p>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {filtered.map((module, index) => {
              const isCompleted = module.completed
              const hasProgress = !isCompleted && module.progress > 0
              const isLocked = false // future: unlock logic

              return (
                <Link
                  key={module.id}
                  href={isLocked ? "#" : `/training/${module.id}`}
                  className={cn(
                    "group relative flex gap-4 bg-card border border-border rounded-xl p-4 transition-all duration-200",
                    isLocked ? "opacity-60 cursor-not-allowed" : "hover:border-primary/40 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5",
                    isCompleted && "border-primary/20 bg-primary/5"
                  )}
                >
                  {/* Left: Progress Ring or Number */}
                  <div className="shrink-0 flex items-center justify-center">
                    {isCompleted ? (
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                    ) : hasProgress ? (
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <CircularProgress value={module.progress} size={48} />
                        <span className="absolute text-xs font-semibold text-primary">{module.progress}%</span>
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-muted-foreground group-hover:bg-primary/15 group-hover:text-primary transition-colors">
                        {isLocked ? <Lock className="h-4 w-4" /> : String(index + 1).padStart(2, "0")}
                      </div>
                    )}
                  </div>

                  {/* Middle: Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={cn(
                        "font-semibold text-sm leading-snug text-balance",
                        isCompleted ? "text-foreground" : "text-foreground group-hover:text-primary transition-colors"
                      )}>
                        {module.title}
                      </h3>
                      {isCompleted ? (
                        <Badge className="shrink-0 text-xs bg-primary/20 text-primary border-primary/30 font-normal">
                          Completed
                        </Badge>
                      ) : hasProgress ? (
                        <Badge variant="secondary" className="shrink-0 text-xs font-normal">
                          In Progress
                        </Badge>
                      ) : null}
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2.5">
                      {module.description}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {module.estimatedTime}
                      </span>
                      <span className="text-border">•</span>
                      <span className="flex items-center gap-1">
                        <PlayCircle className="h-3 w-3" />
                        {module.lessons.length} lessons
                      </span>
                      {module.quizId && (
                        <>
                          <span className="text-border">•</span>
                          <span className="flex items-center gap-1">
                            <Trophy className="h-3 w-3" />
                            Quiz included
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right: CTA arrow */}
                  {!isLocked && (
                    <div className="shrink-0 self-center">
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
