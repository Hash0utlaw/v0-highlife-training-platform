"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Users,
  BookOpen,
  TrendingUp,
  ClipboardCheck,
  Search,
  ChevronRight,
  X,
  CheckCircle2,
  Clock,
  Circle,
  RotateCcw,
  MapPin,
  Calendar,
  Mail,
  ShieldCheck,
  SlidersHorizontal,
  ArrowUpDown,
  CheckSquare,
  Square,
  Trophy,
  Award,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  adminEmployees,
  adminModules,
  allBadgeDefinitions,
  badgeTierMeta,
  badgeCategoryMeta,
  type AdminEmployee,
  type AdminModule,
  type BadgeTier,
} from "@/lib/data"

// ── Helpers ────────────────────────────────────────────────────────────────
function avgScore(emp: AdminEmployee): number {
  if (!emp.quizAttempts.length) return 0
  return Math.round(
    emp.quizAttempts.reduce((s, a) => s + a.bestScore, 0) / emp.quizAttempts.length
  )
}

function completionPct(emp: AdminEmployee): number {
  if (!emp.assignedModules.length) return 0
  return Math.round((emp.completedModules.length / emp.assignedModules.length) * 100)
}

function scoreBadge(score: number) {
  if (score >= 80) return { cls: "text-emerald-400 bg-emerald-400/10", label: `${score}%` }
  if (score >= 65) return { cls: "text-amber-400 bg-amber-400/10", label: `${score}%` }
  return { cls: "text-red-400 bg-red-400/10", label: `${score}%` }
}

function attemptBadge(attempts: number) {
  if (attempts === 1) return "text-emerald-400"
  if (attempts <= 3) return "text-amber-400"
  return "text-red-400"
}

function relativeDate(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000)
  if (diff === 0) return "Today"
  if (diff === 1) return "Yesterday"
  if (diff < 7) return `${diff}d ago`
  if (diff < 30) return `${Math.floor(diff / 7)}w ago`
  return `${Math.floor(diff / 30)}mo ago`
}

const MODULE_CATEGORY_COLORS: Record<AdminModule["category"], string> = {
  delta: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  kratom: "bg-green-500/10 text-green-400 border-green-500/20",
  kanna: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  glass: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  compliance: "bg-red-500/10 text-red-400 border-red-500/20",
  sales: "bg-primary/10 text-primary border-primary/20",
  operations: "bg-slate-500/10 text-slate-400 border-slate-500/20",
}

const DISTRICTS = ["All Districts", "Metro North", "East District", "West District", "North District"]
const LOCATIONS = ["All Locations", "Downtown", "Midtown", "Eastside", "Westgate", "Northpark"]

// ── Assign Modules Modal ───────────────────────────────────────────────────
function AssignModulesModal({
  employee,
  onClose,
  onSave,
}: {
  employee: AdminEmployee
  onClose: () => void
  onSave: (empId: string, moduleIds: string[]) => void
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set(employee.assignedModules))

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const byCategory = useMemo(() => {
    const map: Record<string, AdminModule[]> = {}
    adminModules.forEach((m) => {
      if (!map[m.category]) map[m.category] = []
      map[m.category].push(m)
    })
    return map
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="font-semibold text-foreground">Assign Modules</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{employee.name} &middot; {employee.storeLocation}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Module list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {Object.entries(byCategory).map(([cat, mods]) => (
            <div key={cat}>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">{cat}</p>
              <div className="space-y-1.5">
                {mods.map((m) => {
                  const isChecked = selected.has(m.id)
                  const isCompleted = employee.completedModules.includes(m.id)
                  return (
                    <button
                      key={m.id}
                      onClick={() => toggle(m.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-colors",
                        isChecked
                          ? "border-primary/40 bg-primary/5"
                          : "border-border bg-secondary/30 hover:bg-secondary/60"
                      )}
                    >
                      {isChecked ? (
                        <CheckSquare className="h-4 w-4 text-primary shrink-0" />
                      ) : (
                        <Square className="h-4 w-4 text-muted-foreground shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">{m.title}</p>
                        <p className="text-xs text-muted-foreground">{m.estimatedTime}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {m.required && (
                          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                            Required
                          </span>
                        )}
                        {isCompleted && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">{selected.size} modules selected</p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border border-border text-foreground hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => { onSave(employee.id, Array.from(selected)); onClose() }}
              className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Save Assignments
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Employee Detail Panel ──────────────────────────────────────────────────
function EmployeePanel({
  employee,
  modules,
  onClose,
  onAssign,
}: {
  employee: AdminEmployee
  modules: AdminModule[]
  onClose: () => void
  onAssign: () => void
}) {
  const [tab, setTab] = useState<"overview" | "quizzes" | "badges">("overview")
  const score = avgScore(employee)
  const pct = completionPct(employee)
  const scoreStyle = scoreBadge(score)
  const modMap = useMemo(() => Object.fromEntries(modules.map((m) => [m.id, m])), [modules])

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-xl h-full bg-card border-l border-border flex flex-col shadow-2xl overflow-hidden">
        {/* Panel header */}
        <div className="px-6 py-5 border-b border-border">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <span className="text-sm font-semibold text-primary">
                  {employee.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <div>
                <h2 className="font-semibold text-foreground">{employee.name}</h2>
                <p className="text-xs text-muted-foreground">{employee.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onAssign}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
              >
                <BookOpen className="h-3.5 w-3.5" />
                Assign Modules
              </button>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {employee.storeLocation} &middot; {employee.district}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              {employee.email}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              Hired {new Date(employee.hireDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              Active {relativeDate(employee.lastActive)}
            </div>
          </div>

          {/* KPI bar */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-secondary/50 rounded-lg px-3 py-2.5 text-center">
              <p className={cn("text-lg font-bold", scoreStyle.cls.split(" ")[0])}>{score > 0 ? `${score}%` : "—"}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Avg Score</p>
            </div>
            <div className="bg-secondary/50 rounded-lg px-3 py-2.5 text-center">
              <p className="text-lg font-bold text-foreground">{pct}%</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Completion</p>
            </div>
            <div className="bg-secondary/50 rounded-lg px-3 py-2.5 text-center">
              <p className="text-lg font-bold text-foreground">{employee.completedModules.length}<span className="text-sm font-normal text-muted-foreground">/{employee.assignedModules.length}</span></p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Modules</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 bg-secondary/50 rounded-lg p-1">
            {(["overview", "quizzes", "badges"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "flex-1 py-1.5 text-xs font-medium rounded-md capitalize transition-colors",
                  tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t === "overview" ? "Modules" : t === "quizzes" ? "Quizzes" : `Badges (${employee.earnedBadgeIds.length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto">
          {tab === "overview" && (
            <div className="px-6 py-4 space-y-1.5">
              {employee.assignedModules.map((mid) => {
                const mod = modMap[mid]
                if (!mod) return null
                const isComplete = employee.completedModules.includes(mid)
                const isInProgress = employee.inProgressModules.includes(mid)
                return (
                  <div
                    key={mid}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors"
                  >
                    {isComplete ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    ) : isInProgress ? (
                      <Clock className="h-4 w-4 text-amber-400 shrink-0" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{mod.title}</p>
                      <p className="text-xs text-muted-foreground">{mod.estimatedTime}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={cn("text-[10px] px-1.5 py-0.5 rounded border", MODULE_CATEGORY_COLORS[mod.category])}>
                        {mod.category}
                      </span>
                      <span className={cn(
                        "text-[10px] font-medium",
                        isComplete ? "text-emerald-400" : isInProgress ? "text-amber-400" : "text-muted-foreground/50"
                      )}>
                        {isComplete ? "Complete" : isInProgress ? "In Progress" : "Not Started"}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {tab === "badges" && (() => {
            const earned = new Set(employee.earnedBadgeIds)
            const earnedBadges = allBadgeDefinitions.filter((b) => earned.has(b.id))
            const TIER_ORDER: BadgeTier[] = ["platinum", "gold", "silver", "bronze"]
            const byTier = TIER_ORDER.map((tier) => ({
              tier,
              badges: earnedBadges.filter((b) => b.tier === tier),
            })).filter((g) => g.badges.length > 0)

            if (earnedBadges.length === 0) {
              return (
                <div className="px-6 py-12 text-center">
                  <Trophy className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No badges earned yet</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">Assign more modules to unlock achievements</p>
                </div>
              )
            }

            return (
              <div className="px-6 py-4 space-y-5">
                {/* XP summary */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 text-center">
                    <p className="text-xl font-bold text-primary">{earnedBadges.length}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Badges Earned</p>
                  </div>
                  <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl px-4 py-3 text-center">
                    <p className="text-xl font-bold text-amber-400">
                      {earnedBadges.reduce((sum, b) => sum + b.xp, 0).toLocaleString()}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Total XP</p>
                  </div>
                </div>
                {byTier.map(({ tier, badges }) => {
                  const meta = badgeTierMeta[tier]
                  return (
                    <div key={tier}>
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className={cn("h-3 w-3", meta.color)} />
                        <p className={cn("text-[10px] font-bold uppercase tracking-widest", meta.color)}>{meta.label}</p>
                        <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded-full", meta.bg, meta.color)}>{badges.length}</span>
                      </div>
                      <div className="space-y-1.5">
                        {badges.map((badge) => {
                          const cat = badgeCategoryMeta[badge.category]
                          return (
                            <div key={badge.id} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg border", meta.bg, meta.border)}>
                              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border", meta.bg, meta.border)}>
                                <Award className={cn("h-3.5 w-3.5", meta.color)} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-foreground truncate">{badge.name}</p>
                                <p className="text-[10px] text-muted-foreground truncate">{badge.condition}</p>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded-full", cat.bg, cat.color)}>{cat.label}</span>
                                <span className="text-[10px] font-bold text-primary">+{badge.xp}</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })()}

          {tab === "quizzes" && (
            <div className="px-6 py-4 space-y-1.5">
              {employee.quizAttempts.length === 0 && (
                <div className="py-12 text-center">
                  <ClipboardCheck className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No quizzes completed yet</p>
                </div>
              )}
              {employee.quizAttempts.map((qa) => {
                const sb = scoreBadge(qa.bestScore)
                return (
                  <div
                    key={qa.quizId}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg border border-border bg-secondary/20"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{qa.quizTitle}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(qa.completedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {/* Attempts */}
                      <div className="text-center">
                        <p className={cn("text-sm font-semibold", attemptBadge(qa.attempts))}>
                          {qa.attempts}x
                        </p>
                        <p className="text-[10px] text-muted-foreground">attempts</p>
                      </div>
                      {/* Best score */}
                      <div className={cn("px-2.5 py-1 rounded-lg text-center min-w-[52px]", sb.cls)}>
                        <p className="text-sm font-bold">{qa.bestScore}%</p>
                        <p className="text-[10px] opacity-80">best</p>
                      </div>
                      {/* Pass/fail */}
                      {qa.passed ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <X className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main Admin Page ────────────────────────────────────────────────────────
export default function AdminPage() {
  const [search, setSearch] = useState("")
  const [districtFilter, setDistrictFilter] = useState("All Districts")
  const [locationFilter, setLocationFilter] = useState("All Locations")
  const [sortField, setSortField] = useState<"name" | "completion" | "score" | "lastActive">("name")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")
  const [selectedEmployee, setSelectedEmployee] = useState<AdminEmployee | null>(null)
  const [assignTarget, setAssignTarget] = useState<AdminEmployee | null>(null)
  const [employees, setEmployees] = useState(adminEmployees)
  const [showFilters, setShowFilters] = useState(false)

  function handleSort(field: typeof sortField) {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDir("asc")
    }
  }

  const filtered = useMemo(() => {
    return employees
      .filter((e) => {
        const matchSearch =
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.email.toLowerCase().includes(search.toLowerCase()) ||
          e.storeLocation.toLowerCase().includes(search.toLowerCase())
        const matchDistrict = districtFilter === "All Districts" || e.district === districtFilter
        const matchLocation = locationFilter === "All Locations" || e.storeLocation === locationFilter
        return matchSearch && matchDistrict && matchLocation
      })
      .sort((a, b) => {
        let va: string | number = ""
        let vb: string | number = ""
        if (sortField === "name") { va = a.name; vb = b.name }
        if (sortField === "completion") { va = completionPct(a); vb = completionPct(b) }
        if (sortField === "score") { va = avgScore(a); vb = avgScore(b) }
        if (sortField === "lastActive") { va = a.lastActive; vb = b.lastActive }
        if (va < vb) return sortDir === "asc" ? -1 : 1
        if (va > vb) return sortDir === "asc" ? 1 : -1
        return 0
      })
  }, [employees, search, districtFilter, locationFilter, sortField, sortDir])

  // Org-wide KPIs
  const totalEmployees = employees.length
  const avgCompletion = Math.round(employees.reduce((s, e) => s + completionPct(e), 0) / totalEmployees)
  const avgScoreAll = Math.round(
    employees.filter((e) => e.quizAttempts.length > 0)
      .reduce((s, e) => s + avgScore(e), 0) /
    employees.filter((e) => e.quizAttempts.length > 0).length
  )
  const totalModulesAssigned = employees.reduce((s, e) => s + e.assignedModules.length, 0)

  function handleSaveAssignments(empId: string, moduleIds: string[]) {
    setEmployees((prev) =>
      prev.map((e) => e.id === empId ? { ...e, assignedModules: moduleIds } : e)
    )
    if (selectedEmployee?.id === empId) {
      setSelectedEmployee((prev) => prev ? { ...prev, assignedModules: moduleIds } : prev)
    }
  }

  const SortButton = ({ field, label }: { field: typeof sortField; label: string }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-foreground transition-colors group"
    >
      {label}
      <ArrowUpDown className={cn(
        "h-3 w-3 transition-colors",
        sortField === field ? "text-primary" : "text-muted-foreground/40 group-hover:text-muted-foreground"
      )} />
    </button>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="border-b border-border px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">District & Regional Management</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Employees", value: totalEmployees, icon: Users, color: "text-sky-400", bg: "bg-sky-400/10 border-sky-400/20" },
            { label: "Avg Completion", value: `${avgCompletion}%`, icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
            { label: "Avg Quiz Score", value: `${avgScoreAll}%`, icon: ClipboardCheck, color: "text-primary", bg: "bg-primary/10 border-primary/20" },
            { label: "Modules Assigned", value: totalModulesAssigned, icon: BookOpen, color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-card border border-border rounded-xl px-5 py-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-muted-foreground font-medium">{kpi.label}</p>
                <div className={cn("w-7 h-7 rounded-lg border flex items-center justify-center", kpi.bg)}>
                  <kpi.icon className={cn("h-3.5 w-3.5", kpi.color)} />
                </div>
              </div>
              <p className={cn("text-2xl font-bold", kpi.color)}>{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Badge overview shortcut */}
        <Link
          href="/admin/badges"
          className="flex items-center justify-between px-5 py-4 bg-card border border-border rounded-xl hover:border-amber-400/40 hover:bg-amber-400/5 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
              <Trophy className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Badge &amp; Achievement Overview</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {employees.reduce((s, e) => s + e.earnedBadgeIds.length, 0).toLocaleString()} badges earned across {employees.length} employees &middot; View leaderboard &amp; adoption rates
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground group-hover:text-amber-400 transition-colors shrink-0">
            View
            <ChevronRight className="h-4 w-4" />
          </div>
        </Link>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search employees, locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <button
            onClick={() => setShowFilters((f) => !f)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors",
              showFilters
                ? "border-primary/40 bg-primary/5 text-primary"
                : "border-border bg-card text-foreground hover:bg-secondary"
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {(districtFilter !== "All Districts" || locationFilter !== "All Locations") && (
              <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {(districtFilter !== "All Districts" ? 1 : 0) + (locationFilter !== "All Locations" ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        {/* Filter dropdowns */}
        {showFilters && (
          <div className="flex flex-wrap gap-3 -mt-2">
            <div className="flex items-center gap-2">
              <label className="text-xs text-muted-foreground font-medium">District</label>
              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="bg-card border border-border rounded-lg text-sm text-foreground px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ring"
              >
                {DISTRICTS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-muted-foreground font-medium">Location</label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="bg-card border border-border rounded-lg text-sm text-foreground px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ring"
              >
                {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
            {(districtFilter !== "All Districts" || locationFilter !== "All Locations") && (
              <button
                onClick={() => { setDistrictFilter("All Districts"); setLocationFilter("All Locations") }}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto_auto] gap-x-4 px-5 py-3 border-b border-border bg-secondary/30">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              <SortButton field="name" label="Employee" />
            </p>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide w-28 hidden md:block">Location</p>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide w-32">
              <SortButton field="completion" label="Progress" />
            </p>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide w-24 hidden lg:block">
              <SortButton field="score" label="Avg Score" />
            </p>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide w-20 hidden lg:block">
              <SortButton field="lastActive" label="Active" />
            </p>
            <p className="w-16" />
          </div>

          {/* Table rows */}
          <div className="divide-y divide-border">
            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <Users className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No employees match your filters</p>
              </div>
            )}
            {filtered.map((emp) => {
              const score = avgScore(emp)
              const pct = completionPct(emp)
              const sb = score > 0 ? scoreBadge(score) : null
              const isSelected = selectedEmployee?.id === emp.id

              return (
                <div
                  key={emp.id}
                  onClick={() => setSelectedEmployee(isSelected ? null : emp)}
                  className={cn(
                    "grid grid-cols-[1fr_auto_auto_auto_auto_auto] gap-x-4 px-5 py-4 cursor-pointer transition-colors",
                    isSelected ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-secondary/30"
                  )}
                >
                  {/* Name + role */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center shrink-0">
                      <span className="text-xs font-semibold text-foreground">
                        {emp.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{emp.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{emp.role}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="w-28 hidden md:flex items-center">
                    <p className="text-xs text-muted-foreground truncate">{emp.storeLocation}</p>
                  </div>

                  {/* Progress bar */}
                  <div className="w-32 flex flex-col justify-center gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-foreground font-medium">{pct}%</span>
                      <span className="text-[10px] text-muted-foreground">{emp.completedModules.length}/{emp.assignedModules.length}</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          pct >= 80 ? "bg-emerald-400" : pct >= 50 ? "bg-amber-400" : "bg-red-400"
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  {/* Score */}
                  <div className="w-24 hidden lg:flex items-center">
                    {sb ? (
                      <span className={cn("text-xs font-semibold px-2 py-1 rounded-lg", sb.cls)}>
                        {sb.label}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground/50">—</span>
                    )}
                  </div>

                  {/* Last active */}
                  <div className="w-20 hidden lg:flex items-center">
                    <p className="text-xs text-muted-foreground">{relativeDate(emp.lastActive)}</p>
                  </div>

                  {/* View button */}
                  <div className="w-16 flex items-center justify-end">
                    <div className={cn(
                      "flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors",
                      isSelected
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}>
                      View
                      <ChevronRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Table footer */}
          <div className="px-5 py-3 border-t border-border bg-secondary/20">
            <p className="text-xs text-muted-foreground">
              Showing {filtered.length} of {employees.length} employees
            </p>
          </div>
        </div>
      </div>

      {/* Employee detail panel */}
      {selectedEmployee && !assignTarget && (
        <EmployeePanel
          employee={selectedEmployee}
          modules={adminModules}
          onClose={() => setSelectedEmployee(null)}
          onAssign={() => setAssignTarget(selectedEmployee)}
        />
      )}

      {/* Assign modules modal */}
      {assignTarget && (
        <AssignModulesModal
          employee={assignTarget}
          onClose={() => setAssignTarget(null)}
          onSave={handleSaveAssignments}
        />
      )}
    </div>
  )
}
