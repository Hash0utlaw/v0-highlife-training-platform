"use client"

import { useState, useEffect } from "react"
import { mockEmployee, mockModules, mockProducts, salesTechniques } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  ClipboardCheck,
  Lightbulb,
  Package,
  ArrowRight,
  TrendingUp,
  Clock,
  Zap,
  Award,
  Target,
  ChevronRight,
  Play,
  Star,
  CheckCircle2,
  Circle,
  MessageSquare,
  BarChart3,
  Briefcase,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const employee = mockEmployee
  const nextModule = mockModules.find((m) => !m.completed)
  const completedModules = mockModules.filter((m) => m.completed)
  const overallProgress = Math.round((employee.completedModules / employee.totalModules) * 100)
  const newProducts = mockProducts.slice(0, 3)

  // Rotate daily tip based on day of year
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  const dailyTip = salesTechniques[dayOfYear % salesTechniques.length]

  const [tipRevealed, setTipRevealed] = useState(false)
  const [greeting, setGreeting] = useState("Good morning")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 17) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  const firstName = employee.name.split(" ")[0]

  const quickActions = [
    { href: "/products", icon: Package, label: "Products", color: "text-blue-400", bg: "bg-blue-400/10" },
    { href: "/training", icon: BookOpen, label: "Training", color: "text-primary", bg: "bg-primary/10" },
    { href: "/quizzes", icon: ClipboardCheck, label: "Quizzes", color: "text-amber-400", bg: "bg-amber-400/10" },
    { href: "/sales-tips", icon: Lightbulb, label: "Sales Tips", color: "text-purple-400", bg: "bg-purple-400/10" },
    { href: "/handbook", icon: BookOpen, label: "Handbook", color: "text-rose-400", bg: "bg-rose-400/10" },
    { href: "/job-descriptions", icon: Briefcase, label: "Roles", color: "text-cyan-400", bg: "bg-cyan-400/10" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative bg-card border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.72_0.17_162_/_0.08)_0%,_transparent_60%)]" />
        <div className="relative p-5 md:p-8 md:pb-7">
          <div className="flex items-start justify-between gap-4">
            {/* Left: greeting + name */}
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-1">
                {greeting}
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                {firstName}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-muted-foreground">{employee.role}</span>
                <span className="text-muted-foreground/30">·</span>
                <span className="text-xs text-muted-foreground">{employee.storeLocation}</span>
              </div>
              {/* Badges row */}
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                {employee.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-center gap-1.5 bg-secondary border border-border rounded-full px-2.5 py-1"
                  >
                    {badge.icon === "zap" ? (
                      <Zap className="h-3 w-3 text-amber-400" />
                    ) : (
                      <Award className="h-3 w-3 text-primary" />
                    )}
                    <span className="text-xs font-medium text-foreground">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: circular progress */}
            <div className="flex-shrink-0">
              <CircularProgress value={overallProgress} size={88} />
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 border-t border-border">
          <StatCell
            icon={<CheckCircle2 className="h-3.5 w-3.5 text-primary" />}
            value={`${employee.completedModules}/${employee.totalModules}`}
            label="Modules"
          />
          <StatCell
            icon={<Target className="h-3.5 w-3.5 text-amber-400" />}
            value={`${employee.averageQuizScore}%`}
            label="Avg Score"
            border
          />
          <StatCell
            icon={<Award className="h-3.5 w-3.5 text-blue-400" />}
            value={`${employee.badges.length}`}
            label="Badges"
            border
          />
        </div>
      </div>

      <div className="p-4 md:p-8 space-y-5">

        {/* Continue Learning */}
        {nextModule && (
          <div>
            <SectionLabel icon={<Play className="h-3.5 w-3.5" />} text="Continue Learning" />
            <Link href={`/training/${nextModule.id}`}>
              <Card className="border-border hover:border-primary/50 transition-all group cursor-pointer overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-stretch">
                    {/* Color bar */}
                    <div className="w-1 bg-primary flex-shrink-0" />
                    <div className="flex-1 p-4 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 font-medium">
                              Up next
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {nextModule.estimatedTime}
                            </span>
                          </div>
                          <h3 className="font-semibold text-foreground leading-tight">{nextModule.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                            {nextModule.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <ArrowRight className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-muted-foreground">Progress</span>
                          <span className="text-xs font-medium text-primary">{nextModule.progress}%</span>
                        </div>
                        <Progress value={nextModule.progress} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <SectionLabel icon={<Zap className="h-3.5 w-3.5" />} text="Quick Access" />
          <div className="grid grid-cols-5 gap-2">
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href}>
                <div className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-card border border-border hover:border-primary/40 active:scale-95 transition-all text-center">
                  <div className={cn("flex items-center justify-center w-9 h-9 rounded-lg", action.bg)}>
                    <action.icon className={cn("h-4 w-4", action.color)} />
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground leading-tight">{action.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Today's Sales Tip */}
        <div>
          <SectionLabel icon={<Lightbulb className="h-3.5 w-3.5" />} text="Today's Sales Tip" />
          <Card className="border-border overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-stretch">
                <div className="w-1 bg-amber-400 flex-shrink-0" />
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-400">
                          {dailyTip.category}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground">{dailyTip.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5 italic">{dailyTip.tagline}</p>
                    </div>
                    <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-amber-400/10">
                      <Star className="h-4 w-4 text-amber-400" />
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">{dailyTip.description}</p>

                  {/* Exact words reveal */}
                  <div className="mt-3">
                    {tipRevealed ? (
                      <div className="rounded-lg bg-secondary border border-border p-3">
                        <p className="text-xs font-medium text-muted-foreground mb-1.5">Say this:</p>
                        <p className="text-sm font-medium text-foreground leading-relaxed">{dailyTip.exactWords}</p>
                      </div>
                    ) : (
                      <button
                        onClick={() => setTipRevealed(true)}
                        className="w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-amber-400/40 bg-amber-400/5 hover:bg-amber-400/10 transition-colors py-2.5 px-3 text-sm font-medium text-amber-400"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        Reveal exact words to say
                      </button>
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{dailyTip.whyItWorks.slice(0, 60)}...</span>
                    <Link href="/sales-tips" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
                      All tips <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Two-col: Quiz Scores + New Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Quiz History */}
          <div>
            <SectionLabel icon={<BarChart3 className="h-3.5 w-3.5" />} text="Recent Quizzes" />
            <Card className="border-border">
              <CardContent className="p-0">
                {employee.quizHistory.map((quiz, index) => {
                  const pct = Math.round((quiz.score / quiz.totalQuestions) * 100)
                  const passed = pct >= 80
                  return (
                    <div
                      key={quiz.quizId}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3",
                        index < employee.quizHistory.length - 1 && "border-b border-border"
                      )}
                    >
                      <div
                        className={cn(
                          "flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold",
                          passed ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                        )}
                      >
                        {pct}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{quiz.quizTitle}</p>
                        <p className="text-xs text-muted-foreground">
                          {quiz.score}/{quiz.totalQuestions} correct &middot; {new Date(quiz.completedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </p>
                      </div>
                      {passed ? (
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                  )
                })}
                <div className="px-4 py-3 border-t border-border">
                  <Link href="/quizzes">
                    <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground hover:text-foreground">
                      View all quizzes <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* New in Products */}
          <div>
            <SectionLabel icon={<Package className="h-3.5 w-3.5" />} text="New in Products" />
            <Card className="border-border">
              <CardContent className="p-0">
                {newProducts.map((product, index) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <div
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors",
                        index < newProducts.length - 1 && "border-b border-border"
                      )}
                    >
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-secondary border border-border overflow-hidden">
                        {product.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{product.category}</p>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </Link>
                ))}
                <div className="px-4 py-3 border-t border-border">
                  <Link href="/products">
                    <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground hover:text-foreground">
                      Browse all products <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Training Progress */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <SectionLabel icon={<TrendingUp className="h-3.5 w-3.5" />} text="Training Modules" inline />
            <Link href="/training" className="text-xs font-medium text-primary flex items-center gap-0.5 hover:underline">
              All modules <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {mockModules.slice(0, 5).map((mod) => (
              <Link key={mod.id} href={`/training/${mod.id}`}>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group">
                  <div
                    className={cn(
                      "flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg transition-colors",
                      mod.completed
                        ? "bg-primary/10"
                        : mod.progress > 0
                        ? "bg-amber-400/10"
                        : "bg-secondary"
                    )}
                  >
                    {mod.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    ) : mod.progress > 0 ? (
                      <Play className="h-4 w-4 text-amber-400" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-foreground truncate">{mod.title}</p>
                      <span className="text-xs text-muted-foreground flex-shrink-0 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {mod.estimatedTime}
                      </span>
                    </div>
                    {mod.progress > 0 && !mod.completed && (
                      <div className="mt-1.5">
                        <Progress value={mod.progress} className="h-1" />
                      </div>
                    )}
                    {mod.completed && (
                      <p className="text-xs text-primary mt-0.5">Completed</p>
                    )}
                    {!mod.completed && mod.progress === 0 && (
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{mod.description}</p>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({
  icon,
  text,
  inline,
}: {
  icon: React.ReactNode
  text: string
  inline?: boolean
}) {
  return (
    <div className={cn("flex items-center gap-1.5", inline ? "" : "mb-2.5")}>
      <span className="text-muted-foreground">{icon}</span>
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{text}</span>
    </div>
  )
}

function StatCell({
  icon,
  value,
  label,
  border,
}: {
  icon: React.ReactNode
  value: string
  label: string
  border?: boolean
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-1 py-3.5",
        border && "border-l border-border"
      )}
    >
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="text-base font-bold text-foreground tabular-nums">{value}</span>
      </div>
      <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{label}</span>
    </div>
  )
}

function CircularProgress({ value, size = 80 }: { value: number; size?: number }) {
  const radius = (size - 12) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="oklch(0.28 0.005 260)"
          strokeWidth={6}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="oklch(0.72 0.17 162)"
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold text-foreground tabular-nums leading-none">{value}%</span>
        <span className="text-[9px] text-muted-foreground font-medium uppercase tracking-wide mt-0.5">done</span>
      </div>
    </div>
  )
}
