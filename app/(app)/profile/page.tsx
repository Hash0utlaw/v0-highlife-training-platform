"use client"

import type React from "react"
import { useState } from "react"
import {
  mockEmployee,
  mockModules,
  allBadgeDefinitions,
  badgeTierMeta,
  badgeCategoryMeta,
  mockEarnedBadgeIds,
} from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  User,
  MapPin,
  Briefcase,
  Award,
  Trophy,
  BookOpen,
  LogOut,
  Zap,
  Clock,
  CheckCircle2,
  Circle,
  Play,
  Target,
  TrendingUp,
  ChevronRight,
  Mail,
  Hash,
  Calendar,
  BarChart3,
  ShieldCheck,
  Star,
  Settings,
  Lock,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  zap: Zap,
  award: Award,
  star: Star,
  shield: ShieldCheck,
  "shield-check": ShieldCheck,
  "check-circle-2": CheckCircle2,
  target: Target,
  "trending-up": TrendingUp,
  trophy: Trophy,
  briefcase: Briefcase,
}

const categoryColors: Record<string, string> = {
  delta: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  kratom: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  kanna: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  glass: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  compliance: "text-red-400 bg-red-400/10 border-red-400/20",
  sales: "text-primary bg-primary/10 border-primary/20",
  operations: "text-muted-foreground bg-secondary border-border",
}

// Derive category from module title for display
function getModuleCategory(title: string): string {
  const t = title.toLowerCase()
  if (t.includes("delta") || t.includes("hhc") || t.includes("thca")) return "delta"
  if (t.includes("kratom")) return "kratom"
  if (t.includes("kanna")) return "kanna"
  if (t.includes("glass") || t.includes("accessories")) return "glass"
  if (t.includes("compliance") || t.includes("loss prevention")) return "compliance"
  if (t.includes("sales") || t.includes("customer service")) return "sales"
  return "operations"
}

function SectionLabel({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-2.5">
      <span className="text-muted-foreground">{icon}</span>
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{text}</span>
    </div>
  )
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex items-center gap-2.5 text-muted-foreground">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}

export default function ProfilePage() {
  const router = useRouter()
  const employee = mockEmployee
  const overallProgress = Math.round((employee.completedModules / employee.totalModules) * 100)
  const [activeTab, setActiveTab] = useState<"training" | "quizzes" | "badges">("training")

  const completedCount = mockModules.filter((m) => m.completed).length
  const inProgressCount = mockModules.filter((m) => !m.completed && m.progress > 0).length
  const notStartedCount = mockModules.filter((m) => !m.completed && m.progress === 0).length

  const handleLogout = () => {
    router.push("/login")
  }

  const initials = employee.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <div className="min-h-screen bg-background">

      {/* Profile Hero */}
      <div className="relative bg-card border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_oklch(0.72_0.17_162_/_0.07)_0%,_transparent_60%)]" />
        <div className="relative p-5 md:p-8">
          <div className="flex items-start gap-4 md:gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0 relative">
              <Avatar className="w-16 h-16 md:w-20 md:h-20">
                <AvatarFallback className="bg-primary/15 text-primary text-xl md:text-2xl font-bold border border-primary/20">
                  {initials}
                </AvatarFallback>
              </Avatar>
              {/* Active indicator */}
              <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-primary border-2 border-card" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">{employee.name}</h1>
                  <p className="text-sm text-muted-foreground mt-0.5">{employee.email}</p>
                </div>
                <div className="flex-shrink-0 px-2.5 py-1 bg-secondary border border-border rounded-md">
                  <span className="text-[10px] font-mono font-medium text-muted-foreground">{employee.id}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Briefcase className="h-3.5 w-3.5" />
                  <span>{employee.role}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{employee.storeLocation}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Joined Jan 2024</span>
                </div>
              </div>

              {/* Badges row */}
              {employee.badges.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  {employee.badges.map((badge) => {
                    const IconComp = iconMap[badge.icon] || Award
                    return (
                      <div
                        key={badge.id}
                        className="flex items-center gap-1.5 bg-secondary border border-border rounded-full px-2.5 py-1"
                      >
                        <IconComp className="h-3 w-3 text-amber-400" />
                        <span className="text-xs font-medium text-foreground">{badge.name}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-4 border-t border-border">
          {[
            { icon: <TrendingUp className="h-3.5 w-3.5 text-primary" />, value: `${overallProgress}%`, label: "Complete" },
            { icon: <Target className="h-3.5 w-3.5 text-amber-400" />, value: `${employee.averageQuizScore}%`, label: "Avg Score", border: true },
            { icon: <BookOpen className="h-3.5 w-3.5 text-blue-400" />, value: `${employee.completedModules}/${employee.totalModules}`, label: "Modules", border: true },
            { icon: <Award className="h-3.5 w-3.5 text-purple-400" />, value: `${employee.badges.length}`, label: "Badges", border: true },
          ].map((stat, i) => (
            <div key={i} className={cn("flex flex-col items-center justify-center gap-1 py-3.5", stat.border && "border-l border-border")}>
              <div className="flex items-center gap-1">{stat.icon}</div>
              <span className="text-base font-bold text-foreground leading-none">{stat.value}</span>
              <span className="text-[10px] text-muted-foreground font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 md:p-8 space-y-6">

        {/* Overall Progress Bar */}
        <div>
          <SectionLabel icon={<TrendingUp className="h-3.5 w-3.5" />} text="Training Completion" />
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">Overall Progress</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {completedCount} completed &middot; {inProgressCount} in progress &middot; {notStartedCount} not started
                  </p>
                </div>
                <span className="text-2xl font-bold text-primary">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-2.5" />

              {/* Category breakdown */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
                <div className="text-center p-2.5 rounded-lg bg-primary/5 border border-primary/10">
                  <CheckCircle2 className="h-4 w-4 text-primary mx-auto mb-1" />
                  <p className="text-lg font-bold text-primary">{completedCount}</p>
                  <p className="text-[10px] text-muted-foreground font-medium">Completed</p>
                </div>
                <div className="text-center p-2.5 rounded-lg bg-amber-400/5 border border-amber-400/10">
                  <Play className="h-4 w-4 text-amber-400 mx-auto mb-1" />
                  <p className="text-lg font-bold text-amber-400">{inProgressCount}</p>
                  <p className="text-[10px] text-muted-foreground font-medium">In Progress</p>
                </div>
                <div className="text-center p-2.5 rounded-lg bg-secondary border border-border">
                  <Circle className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                  <p className="text-lg font-bold text-foreground">{notStartedCount}</p>
                  <p className="text-[10px] text-muted-foreground font-medium">Not Started</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabbed section: Training / Quizzes / Badges */}
        <div>
          {/* Tab bar */}
          <div className="flex items-center gap-1 p-1 bg-secondary rounded-xl mb-4 border border-border">
            {(["training", "quizzes", "badges"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 py-2 text-xs font-semibold rounded-lg transition-all capitalize",
                  activeTab === tab
                    ? "bg-card text-foreground shadow-sm border border-border"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab === "training" ? "Modules" : tab === "quizzes" ? "Quiz History" : "Achievements"}
              </button>
            ))}
          </div>

          {/* Training tab */}
          {activeTab === "training" && (
            <div className="space-y-2">
              {mockModules.map((mod) => {
                const category = getModuleCategory(mod.title)
                const colorClass = categoryColors[category] || categoryColors.operations
                return (
                  <Link key={mod.id} href={`/training/${mod.id}`}>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group">
                      {/* Status icon */}
                      <div className={cn(
                        "flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg transition-colors",
                        mod.completed ? "bg-primary/10" : mod.progress > 0 ? "bg-amber-400/10" : "bg-secondary"
                      )}>
                        {mod.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        ) : mod.progress > 0 ? (
                          <Play className="h-4 w-4 text-amber-400" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-medium text-foreground truncate">{mod.title}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded border capitalize", colorClass)}>
                            {category}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {mod.estimatedTime}
                          </span>
                          {mod.completed && (
                            <span className="text-xs text-primary font-medium">Completed</span>
                          )}
                          {!mod.completed && mod.progress > 0 && (
                            <span className="text-xs text-amber-400 font-medium">{mod.progress}%</span>
                          )}
                        </div>
                        {!mod.completed && mod.progress > 0 && (
                          <Progress value={mod.progress} className="h-1 mt-1.5" />
                        )}
                      </div>

                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          {/* Quizzes tab */}
          {activeTab === "quizzes" && (
            <div>
              {/* Summary bar */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border mb-3">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{employee.quizHistory.length} quizzes completed</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Average score across all attempts</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{employee.averageQuizScore}%</p>
                  <p className="text-[10px] text-muted-foreground">avg score</p>
                </div>
              </div>

              <Card className="border-border">
                <CardContent className="p-0">
                  {employee.quizHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <BarChart3 className="h-8 w-8 text-muted-foreground/50 mb-3" />
                      <p className="text-sm text-muted-foreground">No quizzes taken yet</p>
                      <Link href="/quizzes">
                        <Button variant="outline" size="sm" className="mt-3">Browse Quizzes</Button>
                      </Link>
                    </div>
                  ) : (
                    employee.quizHistory.map((quiz, index) => {
                      const pct = Math.round((quiz.score / quiz.totalQuestions) * 100)
                      const passed = pct >= 80
                      const scoreColor = pct >= 80 ? "text-primary bg-primary/10" : pct >= 60 ? "text-amber-400 bg-amber-400/10" : "text-red-400 bg-red-400/10"
                      return (
                        <div
                          key={quiz.quizId}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3.5",
                            index < employee.quizHistory.length - 1 && "border-b border-border"
                          )}
                        >
                          {/* Score badge */}
                          <div className={cn("flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg text-sm font-bold", scoreColor)}>
                            {pct}%
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{quiz.quizTitle}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs text-muted-foreground">
                                {quiz.score}/{quiz.totalQuestions} correct
                              </span>
                              <span className="text-muted-foreground/40">&middot;</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(quiz.completedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                              </span>
                            </div>
                          </div>

                          <Badge
                            className={cn(
                              "text-[10px] font-semibold px-2 py-0.5 flex-shrink-0 border",
                              passed
                                ? "bg-primary/10 text-primary border-primary/20"
                                : "bg-red-400/10 text-red-400 border-red-400/20"
                            )}
                            variant="outline"
                          >
                            {passed ? "Passed" : "Needs Retry"}
                          </Badge>
                        </div>
                      )
                    })
                  )}
                </CardContent>
              </Card>

              <div className="mt-3">
                <Link href="/quizzes">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Take a Quiz <ChevronRight className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Badges tab */}
          {activeTab === "badges" && (
            <div>
              {/* Summary bar */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border mb-4">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20">
                  <Trophy className="h-5 w-5 text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{mockEarnedBadgeIds.length} badges earned</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {allBadgeDefinitions.length - mockEarnedBadgeIds.length} more to unlock
                  </p>
                </div>
                <Link href="/badges">
                  <Button variant="outline" size="sm" className="text-xs flex-shrink-0">
                    View All <ChevronRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </Link>
              </div>

              {/* Earned badges grid */}
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Earned</p>
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {allBadgeDefinitions
                  .filter((b) => mockEarnedBadgeIds.includes(b.id))
                  .map((badge) => {
                    const tier = badgeTierMeta[badge.tier]
                    const cat = badgeCategoryMeta[badge.category]
                    const IconComp = iconMap[badge.icon] || Award
                    return (
                      <div
                        key={badge.id}
                        className={cn("flex items-center gap-3 p-3 rounded-xl border bg-card", tier.border)}
                      >
                        <div className={cn("flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border", tier.bg, tier.border)}>
                          <IconComp className={cn("h-5 w-5", tier.color)} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-foreground truncate">{badge.name}</p>
                          <span className={cn("text-[10px] font-semibold", cat.color)}>{cat.label}</span>
                        </div>
                      </div>
                    )
                  })}
              </div>

              {/* Up next: locked */}
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Up Next</p>
              <div className="space-y-2">
                {allBadgeDefinitions
                  .filter((b) => !mockEarnedBadgeIds.includes(b.id))
                  .slice(0, 4)
                  .map((badge) => {
                    const tier = badgeTierMeta[badge.tier]
                    return (
                      <div key={badge.id} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card/50 opacity-60">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-secondary border border-border">
                          <Lock className="h-4 w-4 text-muted-foreground/50" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-muted-foreground truncate">{badge.name}</p>
                          <p className="text-[10px] text-muted-foreground/70 truncate">{badge.condition}</p>
                        </div>
                        <span className={cn("text-[10px] font-bold flex-shrink-0", tier.color)}>{tier.label}</span>
                      </div>
                    )
                  })}
              </div>

              <Link href="/badges" className="block mt-4">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  See All {allBadgeDefinitions.length} Achievements <ChevronRight className="h-3.5 w-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Account Info */}
        <div>
          <SectionLabel icon={<User className="h-3.5 w-3.5" />} text="Account Info" />
          <Card className="border-border">
            <CardContent className="px-4 py-1">
              <InfoRow icon={<User className="h-4 w-4" />} label="Full Name" value={employee.name} />
              <InfoRow icon={<Mail className="h-4 w-4" />} label="Email" value={employee.email} />
              <InfoRow icon={<Briefcase className="h-4 w-4" />} label="Role" value={employee.role} />
              <InfoRow icon={<MapPin className="h-4 w-4" />} label="Location" value={employee.storeLocation} />
              <InfoRow icon={<Hash className="h-4 w-4" />} label="Employee ID" value={employee.id} />
            </CardContent>
          </Card>
        </div>

        {/* Settings */}
        <div>
          <SectionLabel icon={<Settings className="h-3.5 w-3.5" />} text="Settings" />
          <Card className="border-border">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-border md:hidden">
                <span className="text-sm text-foreground">Appearance</span>
                <ThemeToggle />
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm text-foreground">Version</span>
                <span className="text-sm text-muted-foreground font-mono">v1.0.0</span>
              </div>
              <div className="pt-1">
                <Button
                  variant="destructive"
                  className="w-full font-medium"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
