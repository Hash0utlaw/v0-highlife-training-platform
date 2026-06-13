"use client"

import { useState } from "react"
import {
  allBadgeDefinitions,
  badgeTierMeta,
  badgeCategoryMeta,
  mockEarnedBadgeIds,
  type BadgeTier,
  type BadgeCategory,
} from "@/lib/data"
import { cn } from "@/lib/utils"
import {
  Zap,
  Play,
  TrendingUp,
  ShieldCheck,
  Crown,
  Flame,
  CheckCircle2,
  Target,
  Brain,
  Award,
  RefreshCw,
  Leaf,
  Star,
  Sprout,
  Heart,
  Gem,
  Scale,
  Shield,
  Briefcase,
  Users,
  Trophy,
  Lock,
  X,
} from "lucide-react"

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

// ── Badge Card ────────────────────────────────────────────────────────────────
function BadgeCard({
  badge,
  earned,
  earnedAt,
  onClick,
}: {
  badge: (typeof allBadgeDefinitions)[0]
  earned: boolean
  earnedAt?: string
  onClick: () => void
}) {
  const tier = badgeTierMeta[badge.tier]
  const cat = badgeCategoryMeta[badge.category]

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center text-center p-4 rounded-2xl border transition-all duration-200 w-full group",
        earned
          ? `bg-card ${tier.border} border hover:scale-[1.03] hover:shadow-lg cursor-pointer`
          : "bg-card/40 border-border/40 opacity-50 cursor-pointer hover:opacity-70",
      )}
    >
      {/* Tier ring + icon */}
      <div
        className={cn(
          "relative flex items-center justify-center w-16 h-16 rounded-2xl border-2 mb-3 transition-all",
          earned ? `${tier.bg} ${tier.border}` : "bg-secondary border-border",
        )}
      >
        {earned ? (
          <BadgeIcon icon={badge.icon} className={cn("h-7 w-7", tier.color)} />
        ) : (
          <Lock className="h-6 w-6 text-muted-foreground/40" />
        )}

        {/* Tier pip */}
        {earned && (
          <span
            className={cn(
              "absolute -top-1.5 -right-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full border",
              tier.bg,
              tier.border,
              tier.color,
            )}
          >
            {badge.tier.toUpperCase().slice(0, 2)}
          </span>
        )}
      </div>

      {/* Name */}
      <p className={cn("text-sm font-bold leading-tight mb-1", earned ? "text-foreground" : "text-muted-foreground")}>
        {badge.name}
      </p>

      {/* Category pill */}
      <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2", cat.bg, cat.color)}>
        {cat.label}
      </span>

      {/* Earned date or locked label */}
      {earned && earnedAt ? (
        <p className="text-[10px] text-muted-foreground">
          Earned{" "}
          {new Date(earnedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </p>
      ) : earned ? (
        <p className="text-[10px] text-primary font-medium">Earned</p>
      ) : (
        <p className="text-[10px] text-muted-foreground/60">{badge.condition}</p>
      )}

      {/* XP */}
      <div className={cn("absolute top-3 left-3 text-[10px] font-bold px-1.5 py-0.5 rounded", earned ? "text-primary bg-primary/10" : "text-muted-foreground/40 bg-secondary")}>
        +{badge.xp} XP
      </div>
    </button>
  )
}

// ── Detail Modal ──────────────────────────────────────────────────────────────
function BadgeModal({
  badge,
  earned,
  earnedAt,
  onClose,
}: {
  badge: (typeof allBadgeDefinitions)[0]
  earned: boolean
  earnedAt?: string
  onClose: () => void
}) {
  const tier = badgeTierMeta[badge.tier]
  const cat = badgeCategoryMeta[badge.category]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={cn(
          "relative w-full max-w-sm rounded-2xl border bg-card p-6 shadow-2xl",
          earned ? tier.border : "border-border",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Icon */}
        <div className="flex flex-col items-center text-center mb-5">
          <div
            className={cn(
              "flex items-center justify-center w-20 h-20 rounded-2xl border-2 mb-4",
              earned ? `${tier.bg} ${tier.border}` : "bg-secondary border-border",
            )}
          >
            {earned ? (
              <BadgeIcon icon={badge.icon} className={cn("h-9 w-9", tier.color)} />
            ) : (
              <Lock className="h-8 w-8 text-muted-foreground/40" />
            )}
          </div>

          {/* Tier + name */}
          <div className={cn("text-xs font-bold uppercase tracking-widest mb-1", tier.color)}>{tier.label}</div>
          <h2 className="text-xl font-bold text-foreground mb-1">{badge.name}</h2>
          <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", cat.bg, cat.color)}>{cat.label}</span>
        </div>

        {/* Flavor */}
        <p className="text-center text-sm italic text-muted-foreground mb-4 border-y border-border py-3">
          &ldquo;{badge.flavor}&rdquo;
        </p>

        {/* Description */}
        <p className="text-sm text-foreground text-center mb-4">{badge.description}</p>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center p-3 rounded-xl bg-secondary border border-border">
            <span className="text-xs text-muted-foreground mb-1">How to Earn</span>
            <span className="text-xs font-semibold text-foreground text-center leading-snug">{badge.condition}</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-secondary border border-border">
            <span className="text-xs text-muted-foreground mb-1">XP Reward</span>
            <span className={cn("text-lg font-bold", earned ? "text-primary" : "text-muted-foreground")}>
              +{badge.xp}
            </span>
          </div>
        </div>

        {/* Earned date */}
        {earned && earnedAt && (
          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-primary bg-primary/5 border border-primary/20 rounded-lg py-2">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Earned on{" "}
            {new Date(earnedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </div>
        )}

        {!earned && (
          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground bg-secondary border border-border rounded-lg py-2">
            <Lock className="h-3.5 w-3.5" />
            Not yet earned — keep training to unlock this badge
          </div>
        )}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
const TIERS: BadgeTier[] = ["bronze", "silver", "gold", "platinum"]
const CATEGORIES: BadgeCategory[] = ["milestones", "quiz", "delta", "kratom", "kanna", "glass", "compliance", "sales"]

// Fake earned-at dates for the mock earned badges
const EARNED_DATES: Record<string, string> = {
  "first-step": "2024-01-15",
  "getting-started": "2024-02-01",
  "first-pass": "2024-01-15",
  "delta-starter": "2024-01-20",
  "kratom-starter": "2024-02-10",
  "compliance-ready": "2024-03-05",
  "floor-ready": "2024-03-12",
  "comeback-kid": "2024-02-18",
  "kanna-curious": "2024-03-22",
  "glass-101": "2024-04-01",
}

export default function BadgesPage() {
  const [filterCategory, setFilterCategory] = useState<BadgeCategory | "all">("all")
  const [filterTier, setFilterTier] = useState<BadgeTier | "all">("all")
  const [filterEarned, setFilterEarned] = useState<"all" | "earned" | "locked">("all")
  const [selected, setSelected] = useState<(typeof allBadgeDefinitions)[0] | null>(null)

  const earned = new Set(mockEarnedBadgeIds)
  const earnedCount = mockEarnedBadgeIds.length
  const totalXP = allBadgeDefinitions
    .filter((b) => earned.has(b.id))
    .reduce((sum, b) => sum + b.xp, 0)

  const filtered = allBadgeDefinitions.filter((b) => {
    if (filterCategory !== "all" && b.category !== filterCategory) return false
    if (filterTier !== "all" && b.tier !== filterTier) return false
    if (filterEarned === "earned" && !earned.has(b.id)) return false
    if (filterEarned === "locked" && earned.has(b.id)) return false
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="p-5 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">Achievements</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Earn badges by completing modules, acing quizzes, and mastering products.
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-col items-end gap-1">
              <span className="text-2xl font-bold text-primary">{totalXP.toLocaleString()}</span>
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Total XP</span>
            </div>
          </div>

          {/* Progress overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TIERS.map((tier) => {
              const tierBadges = allBadgeDefinitions.filter((b) => b.tier === tier)
              const earnedTier = tierBadges.filter((b) => earned.has(b.id)).length
              const meta = badgeTierMeta[tier]
              return (
                <div
                  key={tier}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                    filterTier === tier ? `${meta.bg} ${meta.border}` : "bg-secondary border-border hover:border-border/80",
                  )}
                  onClick={() => setFilterTier(filterTier === tier ? "all" : tier)}
                >
                  <div className={cn("flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0", meta.bg)}>
                    <Trophy className={cn("h-4 w-4", meta.color)} />
                  </div>
                  <div className="min-w-0">
                    <p className={cn("text-xs font-bold uppercase tracking-wide", meta.color)}>{meta.label}</p>
                    <p className="text-sm font-semibold text-foreground">
                      {earnedTier}<span className="text-muted-foreground font-normal text-xs">/{tierBadges.length}</span>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Filter row */}
        <div className="flex items-center gap-2 px-5 md:px-8 pb-4 overflow-x-auto scrollbar-none">
          {/* Earned filter */}
          {(["all", "earned", "locked"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilterEarned(f)}
              className={cn(
                "flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all capitalize",
                filterEarned === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary text-muted-foreground border-border hover:text-foreground",
              )}
            >
              {f === "all" ? `All (${allBadgeDefinitions.length})` : f === "earned" ? `Earned (${earnedCount})` : `Locked (${allBadgeDefinitions.length - earnedCount})`}
            </button>
          ))}

          <div className="w-px h-5 bg-border flex-shrink-0" />

          {/* Category filters */}
          {CATEGORIES.map((cat) => {
            const meta = badgeCategoryMeta[cat]
            return (
              <button
                key={cat}
                onClick={() => setFilterCategory(filterCategory === cat ? "all" : cat)}
                className={cn(
                  "flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all",
                  filterCategory === cat
                    ? `${meta.bg} ${meta.color} border-current/30`
                    : "bg-secondary text-muted-foreground border-border hover:text-foreground",
                )}
              >
                {meta.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Badge grid */}
      <div className="p-4 md:p-8">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Award className="h-10 w-10 text-muted-foreground/30 mb-3" />
            <p className="text-sm font-medium text-foreground">No badges match your filters</p>
            <p className="text-xs text-muted-foreground mt-1">Try clearing a filter above</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filtered.map((badge) => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                earned={earned.has(badge.id)}
                earnedAt={EARNED_DATES[badge.id]}
                onClick={() => setSelected(badge)}
              />
            ))}
          </div>
        )}

        {/* Section by category if "all" selected */}
        {filterCategory === "all" && filterEarned === "all" && filterTier === "all" && filtered.length > 0 && (
          <p className="text-xs text-muted-foreground text-center mt-8">
            {earnedCount} of {allBadgeDefinitions.length} badges earned &middot; {totalXP.toLocaleString()} XP accumulated
          </p>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <BadgeModal
          badge={selected}
          earned={earned.has(selected.id)}
          earnedAt={EARNED_DATES[selected.id]}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}
