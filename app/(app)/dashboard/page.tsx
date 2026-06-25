import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { mockModules, mockProducts, salesTechniques } from "@/lib/data"
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
  BarChart3,
  Briefcase,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { DashboardGreeting } from "@/components/dashboard-greeting"
import { SalesTipCard } from "@/components/sales-tip-card"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // Fetch all user data in parallel
  const [profileResult, moduleProgressResult, quizResultsResult, badgesResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("first_name, last_name, display_name, role, store_name, store_number")
      .eq("id", user.id)
      .single(),
    supabase
      .from("module_progress")
      .select("module_id, module_title, progress, completed, completed_at")
      .eq("user_id", user.id),
    supabase
      .from("quiz_results")
      .select("quiz_id, quiz_title, score, total_questions, passed, completed_at")
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false })
      .limit(5),
    supabase
      .from("employee_badges")
      .select("badge_id, badge_name, badge_icon, earned_at")
      .eq("user_id", user.id),
  ])

  const profile = profileResult.data
  const moduleProgress = moduleProgressResult.data ?? []
  const quizResults = quizResultsResult.data ?? []
  const earnedBadges = badgesResult.data ?? []

  // Compute stats
  const totalModules = mockModules.length
  const completedModules = moduleProgress.filter((m) => m.completed).length
  const inProgressModules = moduleProgress.filter((m) => !m.completed && m.progress > 0)
  const overallProgress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0

  const avgScore =
    quizResults.length > 0
      ? Math.round(
          quizResults.reduce((sum, q) => sum + Math.round((q.score / q.total_questions) * 100), 0) /
            quizResults.length
        )
      : 0

  // Find the next module to work on (in-progress first, then first not started)
  const progressMap = new Map(moduleProgress.map((m) => [m.module_id, m]))
  const nextModule =
    mockModules.find((m) => {
      const p = progressMap.get(m.id)
      return p && !p.completed && p.progress > 0
    }) ?? mockModules.find((m) => !progressMap.get(m.id)?.completed)

  const nextModuleProgress = nextModule ? (progressMap.get(nextModule.id)?.progress ?? 0) : 0

  // Daily tip
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  )
  const dailyTip = salesTechniques[dayOfYear % salesTechniques.length]

  const newProducts = mockProducts.slice(0, 3)

  const firstName = profile?.display_name?.split(" ")[0] ?? profile?.first_name ?? "there"
  const roleLine = profile?.role ?? ""
  const storeLine = profile?.store_name
    ? profile.store_name === "District"
      ? "District Office"
      : `Store ${profile.store_number} · ${profile.store_name}`
    : ""

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
              <DashboardGreeting firstName={firstName} />
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                {roleLine && <span className="text-xs text-muted-foreground">{roleLine}</span>}
                {roleLine && storeLine && <span className="text-muted-foreground/30">·</span>}
                {storeLine && <span className="text-xs text-muted-foreground">{storeLine}</span>}
              </div>
              {/* Earned badges row */}
              {earnedBadges.length > 0 && (
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  {earnedBadges.slice(0, 3).map((badge) => (
                    <div
                      key={badge.badge_id}
                      className="flex items-center gap-1.5 bg-secondary border border-border rounded-full px-2.5 py-1"
                    >
                      {badge.badge_icon === "zap" ? (
                        <Zap className="h-3 w-3 text-amber-400" />
                      ) : (
                        <Award className="h-3 w-3 text-primary" />
                      )}
                      <span className="text-xs font-medium text-foreground">{badge.badge_name}</span>
                    </div>
                  ))}
                  {earnedBadges.length > 3 && (
                    <Link href="/badges">
                      <span className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                        +{earnedBadges.length - 3} more
                      </span>
                    </Link>
                  )}
                </div>
              )}
              {earnedBadges.length === 0 && (
                <div className="mt-3">
                  <Link href="/training">
                    <span className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      Complete a module to earn your first badge
                    </span>
                  </Link>
                </div>
              )}
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
            value={`${completedModules}/${totalModules}`}
            label="Modules"
          />
          <StatCell
            icon={<Target className="h-3.5 w-3.5 text-amber-400" />}
            value={quizResults.length > 0 ? `${avgScore}%` : "—"}
            label="Avg Score"
            border
          />
          <StatCell
            icon={<Award className="h-3.5 w-3.5 text-blue-400" />}
            value={`${earnedBadges.length}`}
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
                    <div className="w-1 bg-primary flex-shrink-0" />
                    <div className="flex-1 p-4 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 font-medium">
                              {nextModuleProgress > 0 ? "In progress" : "Up next"}
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
                      {nextModuleProgress > 0 && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs text-muted-foreground">Progress</span>
                            <span className="text-xs font-medium text-primary">{nextModuleProgress}%</span>
                          </div>
                          <Progress value={nextModuleProgress} className="h-1.5" />
                        </div>
                      )}
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
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href}>
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-card border border-border hover:border-primary/40 active:scale-95 transition-all text-center">
                  <div className={cn("flex items-center justify-center w-9 h-9 rounded-lg", action.bg)}>
                    <action.icon className={cn("h-4 w-4", action.color)} />
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground leading-tight">{action.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Today's Sales Tip */}
        <SalesTipCard tip={dailyTip} />

        {/* Two-col: Quiz Scores + New Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Quiz History */}
          <div>
            <SectionLabel icon={<BarChart3 className="h-3.5 w-3.5" />} text="Recent Quizzes" />
            <Card className="border-border">
              <CardContent className="p-0">
                {quizResults.length === 0 ? (
                  <div className="px-4 py-6 text-center">
                    <ClipboardCheck className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No quizzes taken yet</p>
                    <Link href="/quizzes">
                      <Button variant="ghost" size="sm" className="mt-2 text-xs text-primary">
                        Take your first quiz
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    {quizResults.map((quiz, index) => {
                      const pct = Math.round((quiz.score / quiz.total_questions) * 100)
                      return (
                        <div
                          key={`${quiz.quiz_id}-${quiz.completed_at}`}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3",
                            index < quizResults.length - 1 && "border-b border-border"
                          )}
                        >
                          <div
                            className={cn(
                              "flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold",
                              quiz.passed ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                            )}
                          >
                            {pct}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{quiz.quiz_title}</p>
                            <p className="text-xs text-muted-foreground">
                              {quiz.score}/{quiz.total_questions} correct &middot;{" "}
                              {new Date(quiz.completed_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                          {quiz.passed ? (
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          )}
                        </div>
                      )
                    })}
                    <div className="px-4 py-3 border-t border-border">
                      <Link href="/quizzes">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-xs text-muted-foreground hover:text-foreground"
                        >
                          View all quizzes <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
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
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
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
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs text-muted-foreground hover:text-foreground"
                    >
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
            {mockModules.slice(0, 5).map((mod) => {
              const p = progressMap.get(mod.id)
              const pct = p?.progress ?? 0
              const done = p?.completed ?? false
              return (
                <Link key={mod.id} href={`/training/${mod.id}`}>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group">
                    <div
                      className={cn(
                        "flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg transition-colors",
                        done ? "bg-primary/10" : pct > 0 ? "bg-amber-400/10" : "bg-secondary"
                      )}
                    >
                      {done ? (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      ) : pct > 0 ? (
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
                      {pct > 0 && !done && (
                        <div className="mt-1.5">
                          <Progress value={pct} className="h-1" />
                        </div>
                      )}
                      {done && <p className="text-xs text-primary mt-0.5">Completed</p>}
                      {!done && pct === 0 && (
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{mod.description}</p>
                      )}
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                  </div>
                </Link>
              )
            })}
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
        "flex flex-col items-center justify-center gap-1 py-3 px-2",
        border && "border-l border-border"
      )}
    >
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="text-base font-bold text-foreground">{value}</span>
      </div>
      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span>
    </div>
  )
}

function CircularProgress({ value, size }: { value: number; size: number }) {
  const radius = (size - 10) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          className="text-border"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-primary transition-all duration-500"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-lg font-bold text-foreground leading-none">{value}%</span>
        <span className="text-[9px] text-muted-foreground uppercase tracking-wide mt-0.5">done</span>
      </div>
    </div>
  )
}
