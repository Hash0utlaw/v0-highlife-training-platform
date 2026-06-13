"use client"

import { useState, useMemo } from "react"
import {
  Trophy,
  Users,
  TrendingUp,
  Award,
  ChevronRight,
  Search,
  ArrowLeft,
  Crown,
  Flame,
  Zap,
  Play,
  CheckCircle2,
  Target,
  Brain,
  RefreshCw,
  Leaf,
  Star,
  Sprout,
  Heart,
  Gem,
  Scale,
  Shield,
  ShieldCheck,
  Briefcase,
  Lock,
  X,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  adminEmployees,
  allBadgeDefinitions,
  badgeTierMeta,
  badgeCategoryMeta,
  type BadgeTier,
  type BadgeCategory,
  type AdminEmployee,
} from "@/lib/data"

// ── Icon registry ─────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  zap: Zap,
  play: Play,
  "trending-up": TrendingUp,
  "shield-check": ShieldCheck,
  crown: Crown,
  flame: Flame,
  "check-circle-2": CheckCircle2,
  target: Target,
  brain: Brain,
  award: Award,
  "refresh-cw": RefreshCw,
  leaf: Leaf,
  star: Star,
  sprout: Sprout,
  heart: Heart,
  gem: Gem,
  scale: Scale,
  shield: Shield,
  briefcase: Briefcase,
  users: Users,
  trophy: Trophy,
}

function BadgeIcon({ icon, className }: { icon: string; className?: string }) {
  const Comp = ICON_MAP[icon] || Award
  return <Comp className={className} />
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function earnedCount(emp: AdminEmployee) {
  return emp.earnedBadgeIds.length
}

function totalXP(emp: AdminEmployee) {
  return allBadgeDefinitions
    .filter((b) => emp.earnedBadgeIds.includes(b.id))
    .reduce((sum, b) => sum + b.xp, 0)
}

// ── Employee Badge Detail Modal ───────────────────────────────────────────────
function EmployeeBadgeModal({
  employee,
  onClose,
}: {
  employee: AdminEmployee
  onClose: () => void
}) {
  const earned = new Set(employee.earnedBadgeIds)
  const xp = totalXP(employee)

  const byTier = useMemo(() => {
    const map: Partial<Record<BadgeTier, typeof allBadgeDefinitions>> = {}
    allBadgeDefinitions
      .filter((b) => earned.has(b.id))
      .forEach((b) => {
        if (!map[b.tier]) map[b.tier] = []
        map[b.tier]!.push(b)
      })
    return map
  }, [employee])

  const TIER_ORDER: BadgeTier[] = ["platinum", "gold", "silver", "bronze"]

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full sm:max-w-lg bg-card border border-border rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-primary">
                {employee.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">{employee.name}</p>
              <p className="text-xs text-muted-foreground">{employee.role} &middot; {employee.storeLocation}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* XP + count summary */}
        <div className="grid grid-cols-3 gap-3 px-5 py-4 border-b border-border">
          <div className="text-center">
            <p className="text-xl font-bold text-primary">{earned.size}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Badges Earned</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-amber-400">{xp.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Total XP</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{allBadgeDefinitions.length - earned.size}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Remaining</p>
          </div>
        </div>

        {/* Badge list by tier */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {TIER_ORDER.map((tier) => {
            const badges = byTier[tier]
            if (!badges?.length) return null
            const meta = badgeTierMeta[tier]
            return (
              <div key={tier}>
                <div className="flex items-center gap-2 mb-2.5">
                  <Trophy className={cn("h-3.5 w-3.5", meta.color)} />
                  <p className={cn("text-xs font-bold uppercase tracking-widest", meta.color)}>{meta.label}</p>
                  <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded-full", meta.bg, meta.color)}>{badges.length}</span>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {badges.map((badge) => {
                    const cat = badgeCategoryMeta[badge.category]
                    return (
                      <div
                        key={badge.id}
                        className={cn("flex items-center gap-3 p-3 rounded-xl border", meta.border, meta.bg)}
                      >
                        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border", meta.bg, meta.border)}>
                          <BadgeIcon icon={badge.icon} className={cn("h-4 w-4", meta.color)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{badge.name}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{badge.condition}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full", cat.bg, cat.color)}>{cat.label}</span>
                          <span className="text-[10px] font-bold text-primary">+{badge.xp}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {earned.size === 0 && (
            <div className="py-12 text-center">
              <Lock className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No badges earned yet</p>
              <p className="text-xs text-muted-foreground/70 mt-1">Assign more modules to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Leaderboard Row ───────────────────────────────────────────────────────────
function LeaderboardRow({
  employee,
  rank,
  onClick,
}: {
  employee: AdminEmployee
  rank: number
  onClick: () => void
}) {
  const count = earnedCount(employee)
  const xp = totalXP(employee)
  const pct = Math.round((count / allBadgeDefinitions.length) * 100)
  const topBadge = allBadgeDefinitions
    .filter((b) => employee.earnedBadgeIds.includes(b.id))
    .sort((a, b) => {
      const tierOrder = { platinum: 4, gold: 3, silver: 2, bronze: 1 }
      return tierOrder[b.tier] - tierOrder[a.tier]
    })[0]

  const rankColor =
    rank === 1 ? "text-amber-400" : rank === 2 ? "text-slate-300" : rank === 3 ? "text-orange-400" : "text-muted-foreground"

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 px-5 py-4 hover:bg-secondary/30 transition-colors text-left group"
    >
      {/* Rank */}
      <div className="w-7 shrink-0 text-center">
        <span className={cn("text-sm font-bold", rankColor)}>
          {rank <= 3 ? ["1st", "2nd", "3rd"][rank - 1] : `#${rank}`}
        </span>
      </div>

      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-secondary border border-border flex items-center justify-center shrink-0">
        <span className="text-xs font-semibold text-foreground">
          {employee.name.split(" ").map((n) => n[0]).join("")}
        </span>
      </div>

      {/* Name + role */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{employee.name}</p>
        <p className="text-xs text-muted-foreground truncate">{employee.role} &middot; {employee.storeLocation}</p>
      </div>

      {/* Top badge */}
      {topBadge && (
        <div className={cn("hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border shrink-0", badgeTierMeta[topBadge.tier].bg, badgeTierMeta[topBadge.tier].border)}>
          <BadgeIcon icon={topBadge.icon} className={cn("h-3.5 w-3.5 shrink-0", badgeTierMeta[topBadge.tier].color)} />
          <span className={cn("text-[10px] font-semibold truncate max-w-[80px]", badgeTierMeta[topBadge.tier].color)}>{topBadge.name}</span>
        </div>
      )}

      {/* Progress bar */}
      <div className="w-24 hidden lg:block shrink-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-muted-foreground">{count}/{allBadgeDefinitions.length}</span>
          <span className="text-[10px] text-muted-foreground">{pct}%</span>
        </div>
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full", pct >= 70 ? "bg-emerald-400" : pct >= 40 ? "bg-amber-400" : "bg-red-400/60")}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* XP */}
      <div className="text-right shrink-0">
        <p className="text-sm font-bold text-primary">{xp.toLocaleString()}</p>
        <p className="text-[10px] text-muted-foreground">XP</p>
      </div>

      <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-muted-foreground shrink-0 transition-colors" />
    </button>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
const TIERS: BadgeTier[] = ["bronze", "silver", "gold", "platinum"]
const CATEGORIES: BadgeCategory[] = ["milestones", "quiz", "delta", "kratom", "kanna", "glass", "compliance", "sales"]

export default function AdminBadgesPage() {
  const [search, setSearch] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState<AdminEmployee | null>(null)
  const [activeBadgeFilter, setActiveBadgeFilter] = useState<"all" | BadgeTier | BadgeCategory>("all")

  // Org-wide badge stats
  const totalBadgesEarned = adminEmployees.reduce((sum, e) => sum + e.earnedBadgeIds.length, 0)
  const totalPossibleBadges = adminEmployees.length * allBadgeDefinitions.length
  const orgCompletionPct = Math.round((totalBadgesEarned / totalPossibleBadges) * 100)
  const totalOrgXP = adminEmployees.reduce((sum, e) => sum + totalXP(e), 0)

  // Most popular badge
  const badgePopularity = allBadgeDefinitions.map((b) => ({
    badge: b,
    count: adminEmployees.filter((e) => e.earnedBadgeIds.includes(b.id)).length,
  })).sort((a, b) => b.count - a.count)

  // Rarest badge (earned by at least 1 person)
  const rarestBadge = [...badgePopularity].filter((b) => b.count > 0).reverse()[0]

  // Leaderboard (sorted by badge count then XP)
  const leaderboard = useMemo(() => {
    return [...adminEmployees]
      .filter((e) => {
        const name = e.name.toLowerCase()
        return name.includes(search.toLowerCase()) || e.storeLocation.toLowerCase().includes(search.toLowerCase())
      })
      .sort((a, b) => {
        const countDiff = earnedCount(b) - earnedCount(a)
        return countDiff !== 0 ? countDiff : totalXP(b) - totalXP(a)
      })
  }, [search])

  // Per-badge org stats for the badge grid
  const badgeOrgStats = useMemo(() => {
    return allBadgeDefinitions.map((b) => ({
      badge: b,
      earnedBy: adminEmployees.filter((e) => e.earnedBadgeIds.includes(b.id)).length,
      pct: Math.round((adminEmployees.filter((e) => e.earnedBadgeIds.includes(b.id)).length / adminEmployees.length) * 100),
    }))
  }, [])

  const filteredBadgeStats = badgeOrgStats.filter((bs) => {
    if (activeBadgeFilter === "all") return true
    if (TIERS.includes(activeBadgeFilter as BadgeTier)) return bs.badge.tier === activeBadgeFilter
    return bs.badge.category === activeBadgeFilter
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <Link href="/admin" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
              Admin Dashboard
            </Link>
          </div>
          <div className="flex items-start justify-between gap-4 mt-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                <Trophy className="h-4.5 w-4.5 text-amber-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Badge Overview</h1>
                <p className="text-xs text-muted-foreground mt-0.5">Track achievement progress across your entire team</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">

        {/* Org KPI strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Badges Earned (Org)", value: totalBadgesEarned, icon: Trophy, color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
            { label: "Org Completion", value: `${orgCompletionPct}%`, icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
            { label: "Total XP Earned", value: totalOrgXP.toLocaleString(), icon: Zap, color: "text-primary", bg: "bg-primary/10 border-primary/20" },
            { label: "Most Earned Badge", value: badgePopularity[0]?.badge.name ?? "—", icon: Award, color: "text-cyan-400", bg: "bg-cyan-400/10 border-cyan-400/20", small: true },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-card border border-border rounded-xl px-5 py-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-muted-foreground font-medium">{kpi.label}</p>
                <div className={cn("w-7 h-7 rounded-lg border flex items-center justify-center", kpi.bg)}>
                  <kpi.icon className={cn("h-3.5 w-3.5", kpi.color)} />
                </div>
              </div>
              <p className={cn("font-bold", kpi.color, (kpi as any).small ? "text-base leading-tight" : "text-2xl")}>{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Tier breakdown */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Org Badge Distribution by Tier</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TIERS.map((tier) => {
              const meta = badgeTierMeta[tier]
              const tierDefs = allBadgeDefinitions.filter((b) => b.tier === tier)
              const orgEarned = adminEmployees.reduce(
                (sum, e) => sum + tierDefs.filter((b) => e.earnedBadgeIds.includes(b.id)).length,
                0
              )
              const possible = adminEmployees.length * tierDefs.length
              const pct = Math.round((orgEarned / possible) * 100)
              return (
                <div key={tier} className={cn("p-4 rounded-xl border", meta.bg, meta.border)}>
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy className={cn("h-4 w-4", meta.color)} />
                    <span className={cn("text-xs font-bold uppercase tracking-wide", meta.color)}>{meta.label}</span>
                  </div>
                  <p className={cn("text-2xl font-bold", meta.color)}>{orgEarned}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">of {possible} possible</p>
                  <div className="mt-3 h-1.5 bg-background/40 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", meta.color.replace("text-", "bg-"))} style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{pct}% unlocked</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Two column layout: leaderboard + badge catalog */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Leaderboard */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-400" />
                  <h2 className="text-sm font-semibold text-foreground">XP Leaderboard</h2>
                </div>
                <span className="text-[10px] text-muted-foreground">{leaderboard.length} employees</span>
              </div>
              {/* Search */}
              <div className="relative mt-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Filter employees..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-secondary border border-border rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>
            <div className="divide-y divide-border">
              {leaderboard.length === 0 && (
                <div className="py-12 text-center">
                  <Users className="h-7 w-7 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">No employees found</p>
                </div>
              )}
              {leaderboard.map((emp, i) => (
                <LeaderboardRow
                  key={emp.id}
                  employee={emp}
                  rank={i + 1}
                  onClick={() => setSelectedEmployee(emp)}
                />
              ))}
            </div>
          </div>

          {/* Badge catalog with org stats */}
          <div className="lg:col-span-3 bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-sm font-semibold text-foreground mb-3">Badge Adoption Rate</h2>
              {/* Filter chips */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setActiveBadgeFilter("all")}
                  className={cn(
                    "text-[10px] font-semibold px-2.5 py-1 rounded-lg border transition-all",
                    activeBadgeFilter === "all"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary text-muted-foreground border-border hover:text-foreground"
                  )}
                >
                  All
                </button>
                {TIERS.map((tier) => {
                  const meta = badgeTierMeta[tier]
                  return (
                    <button
                      key={tier}
                      onClick={() => setActiveBadgeFilter(activeBadgeFilter === tier ? "all" : tier)}
                      className={cn(
                        "text-[10px] font-semibold px-2.5 py-1 rounded-lg border transition-all capitalize",
                        activeBadgeFilter === tier
                          ? `${meta.bg} ${meta.color} border-current/30`
                          : "bg-secondary text-muted-foreground border-border hover:text-foreground"
                      )}
                    >
                      {tier}
                    </button>
                  )
                })}
                <div className="w-px h-5 bg-border self-center" />
                {CATEGORIES.map((cat) => {
                  const meta = badgeCategoryMeta[cat]
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveBadgeFilter(activeBadgeFilter === cat ? "all" : cat)}
                      className={cn(
                        "text-[10px] font-semibold px-2.5 py-1 rounded-lg border transition-all",
                        activeBadgeFilter === cat
                          ? `${meta.bg} ${meta.color} border-current/30`
                          : "bg-secondary text-muted-foreground border-border hover:text-foreground"
                      )}
                    >
                      {meta.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Badge rows */}
            <div className="divide-y divide-border overflow-y-auto max-h-[560px]">
              {filteredBadgeStats.map(({ badge, earnedBy, pct }) => {
                const tier = badgeTierMeta[badge.tier]
                const cat = badgeCategoryMeta[badge.category]
                return (
                  <div key={badge.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-secondary/20 transition-colors">
                    {/* Icon */}
                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border", tier.bg, tier.border)}>
                      <BadgeIcon icon={badge.icon} className={cn("h-4 w-4", tier.color)} />
                    </div>

                    {/* Name + category */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-foreground truncate">{badge.name}</p>
                        <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0", cat.bg, cat.color)}>{cat.label}</span>
                        <span className={cn("text-[10px] font-bold shrink-0", tier.color)}>{tier.label}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground truncate mt-0.5">{badge.condition}</p>
                    </div>

                    {/* Adoption bar */}
                    <div className="w-32 shrink-0 hidden md:block">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-muted-foreground">{earnedBy}/{adminEmployees.length} staff</span>
                        <span className="text-[10px] font-semibold text-foreground">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full transition-all", pct >= 70 ? "bg-emerald-400" : pct >= 30 ? "bg-amber-400" : "bg-red-400/60")}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    {/* XP */}
                    <div className="shrink-0 text-right w-12">
                      <p className="text-xs font-bold text-primary">+{badge.xp}</p>
                      <p className="text-[9px] text-muted-foreground">XP</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Employee badge detail modal */}
      {selectedEmployee && (
        <EmployeeBadgeModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  )
}
