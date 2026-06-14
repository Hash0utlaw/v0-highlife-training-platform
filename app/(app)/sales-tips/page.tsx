"use client"

import { useState } from "react"
import {
  salesTechniques,
  rolePlayScenarios,
  objectionCards,
  languageSwaps,
  tipOfTheDay,
  type RolePlayScenario,
  type ObjectionCard,
  type LanguageSwap,
  type SalesTechnique,
} from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  MessageCircle,
  Target,
  ShieldAlert,
  Languages,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  User,
  UserCircle,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Play,
  BookOpen,
  TrendingUp,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ── helpers ──────────────────────────────────────────────────────────────────
const categoryColors: Record<string, string> = {
  "first-timer": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  upsell: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  objection: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  compliance: "bg-red-500/15 text-red-400 border-red-500/30",
  kanna: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  kratom: "bg-green-500/15 text-green-400 border-green-500/30",
  delta: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
}

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-500/15 text-green-400 border-green-500/30",
  intermediate: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  advanced: "bg-red-500/15 text-red-400 border-red-500/30",
}

const severityConfig = {
  critical: { color: "text-red-400", bg: "bg-red-500/10 border-red-500/30", icon: XCircle },
  important: { color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30", icon: AlertTriangle },
  note: { color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30", icon: Info },
}

const techniqueIcons: Record<string, React.ElementType> = {
  opening: MessageCircle,
  discovery: Target,
  recommendation: BookOpen,
  upsell: TrendingUp,
  close: Zap,
}

// ── Tabs ─────────────────────────────────────────────────────────────────────
type Tab = "techniques" | "roleplay" | "objections" | "language"

const TABS: { id: Tab; label: string; icon: React.ElementType; count?: number }[] = [
  { id: "techniques", label: "Techniques", icon: TrendingUp, count: salesTechniques.length },
  { id: "roleplay", label: "Role Play", icon: Play, count: rolePlayScenarios.length },
  { id: "objections", label: "Objections", icon: ShieldAlert, count: objectionCards.length },
  { id: "language", label: "Language", icon: Languages, count: languageSwaps.length },
]

// ── Role Play Player ──────────────────────────────────────────────────────────
function RolePlayPlayer({ scenario, onClose }: { scenario: RolePlayScenario; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [revealed, setRevealed] = useState<Set<number>>(new Set())
  const [practiceMode, setPracticeMode] = useState(false)
  const currentLine = scenario.lines[step]
  const isLast = step === scenario.lines.length - 1

  function reset() {
    setStep(0)
    setRevealed(new Set())
  }

  function revealNote(i: number) {
    setRevealed((prev) => new Set(prev).add(i))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/70 p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-border">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <Badge className={cn("text-xs border", categoryColors[scenario.category])}>{scenario.category}</Badge>
              <Badge className={cn("text-xs border", difficultyColors[scenario.difficulty])}>{scenario.difficulty}</Badge>
            </div>
            <h2 className="font-bold text-base text-foreground">{scenario.title}</h2>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{scenario.scenario}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="ml-3 shrink-0">
            Close
          </Button>
        </div>

        {/* Goal */}
        <div className="px-5 py-3 bg-primary/5 border-b border-border">
          <p className="text-xs font-medium text-primary">
            Goal: <span className="text-muted-foreground font-normal">{scenario.goal}</span>
          </p>
        </div>

        {/* Progress */}
        <div className="px-5 pt-4 pb-2 flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / scenario.lines.length) * 100}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground shrink-0">
            {step + 1} / {scenario.lines.length}
          </span>
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
          {scenario.lines.slice(0, step + 1).map((line, i) => {
            const isEmployee = line.speaker === "employee"
            const noteRevealed = revealed.has(i)
            const isCurrent = i === step

            return (
              <div key={i} className={cn("flex gap-3", isEmployee ? "flex-row-reverse" : "flex-row")}>
                {/* Avatar */}
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                    isEmployee ? "bg-primary/20" : "bg-secondary",
                  )}
                >
                  {isEmployee ? (
                    <UserCircle className="h-4 w-4 text-primary" />
                  ) : (
                    <User className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>

                <div className={cn("flex flex-col gap-1 max-w-[80%]", isEmployee ? "items-end" : "items-start")}>
                  <span className="text-[10px] text-muted-foreground font-medium">
                    {isEmployee ? "You (Employee)" : "Customer"}
                  </span>
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      isEmployee
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-secondary text-foreground rounded-tl-sm",
                      isCurrent && "ring-2 ring-offset-2 ring-offset-card ring-primary/50",
                    )}
                  >
                    {practiceMode && isEmployee && isCurrent ? (
                      <span className="italic text-primary-foreground/60">[ Your turn — what do you say? ]</span>
                    ) : (
                      line.text
                    )}
                  </div>

                  {/* Coaching note */}
                  {isEmployee && line.note && (
                    <div className="w-full">
                      {noteRevealed ? (
                        <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 rounded-xl px-3 py-2 mt-1">
                          <Lightbulb className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                          <p className="text-xs text-amber-300 leading-relaxed">{line.note}</p>
                        </div>
                      ) : (
                        <button
                          onClick={() => revealNote(i)}
                          className="text-[10px] text-primary/70 hover:text-primary mt-1 flex items-center gap-1 transition-colors"
                        >
                          <Lightbulb className="h-3 w-3" />
                          Show coaching tip
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}

          {/* Key takeaways at end */}
          {isLast && (
            <div className="mt-4 bg-primary/5 border border-primary/20 rounded-xl p-4">
              <p className="text-xs font-semibold text-primary mb-3 flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5" />
                Key Takeaways
              </p>
              <ul className="space-y-1.5">
                {scenario.keyTakeaways.map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">•</span>
                    <span className="text-xs text-muted-foreground leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="border-t border-border p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={reset} className="gap-1.5 text-xs">
              <RotateCcw className="h-3.5 w-3.5" />
              Restart
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPracticeMode((p) => !p)}
              className={cn("text-xs gap-1.5", practiceMode && "text-primary")}
            >
              <Play className="h-3.5 w-3.5" />
              {practiceMode ? "Reading Mode" : "Practice Mode"}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            {step > 0 && (
              <Button variant="outline" size="sm" onClick={() => setStep((s) => s - 1)} className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            {!isLast ? (
              <Button size="sm" onClick={() => setStep((s) => s + 1)} className="gap-1">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button size="sm" variant="outline" onClick={onClose}>
                Done
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Objection Flip Card ───────────────────────────────────────────────────────
function ObjectionFlipCard({ card }: { card: ObjectionCard }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:border-primary/40 hover:-translate-y-0.5",
        flipped && "border-primary/40 bg-primary/5",
      )}
      onClick={() => setFlipped((f) => !f)}
    >
      <CardContent className="p-5">
        {!flipped ? (
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <Badge variant="outline" className="text-xs mb-2 capitalize">
                  {card.category}
                </Badge>
                <p className="text-sm font-medium text-foreground leading-relaxed">{card.objection}</p>
              </div>
              <div className="text-muted-foreground/40 shrink-0 mt-1">
                <RotateCcw className="h-4 w-4" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Tap to see how to handle this</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-semibold text-destructive mb-1 uppercase tracking-wide">Don&apos;t say</p>
                <p className="text-sm text-muted-foreground italic leading-relaxed">{card.wrongResponse}</p>
              </div>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-semibold text-primary mb-1 uppercase tracking-wide">Say this instead</p>
                <p className="text-sm text-foreground leading-relaxed">{card.rightResponse}</p>
              </div>
            </div>
            <div className="bg-secondary rounded-lg px-3 py-2">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-medium text-foreground">Why it works: </span>
                {card.whyItWorks}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ── Language Swap Card ────────────────────────────────────────────────────────
function LanguageSwapCard({ item }: { item: LanguageSwap }) {
  const config = severityConfig[item.severity]
  const SeverityIcon = config.icon

  return (
    <Card className={cn("border", config.bg)}>
      <CardContent className="p-5">
        <div className="flex items-start gap-2 mb-3">
          <SeverityIcon className={cn("h-4 w-4 shrink-0 mt-0.5", config.color)} />
          <div className="flex-1">
            <Badge className={cn("text-[10px] border mb-2 uppercase tracking-wide", config.bg, config.color)}>
              {item.severity}
            </Badge>
            <p className="text-xs text-muted-foreground">{item.context}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
            <p className="text-[10px] font-semibold text-red-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
              <XCircle className="h-3 w-3" />
              Never say
            </p>
            <p className="text-sm text-red-300 font-medium leading-relaxed">&ldquo;{item.neverSay}&rdquo;</p>
          </div>
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-3">
            <p className="text-[10px] font-semibold text-primary uppercase tracking-wide mb-1.5 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Always say
            </p>
            <p className="text-sm text-primary font-medium leading-relaxed">&ldquo;{item.alwaysSay}&rdquo;</p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed border-t border-border pt-3">{item.reason}</p>
      </CardContent>
    </Card>
  )
}

// ── Technique Card ────────────────────────────────────────────────────────────
function TechniqueCard({ technique }: { technique: SalesTechnique }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = techniqueIcons[technique.category] ?? Target

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:border-primary/40 hover:-translate-y-0.5",
        expanded && "border-primary/30",
      )}
      onClick={() => setExpanded((e) => !e)}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <Badge variant="outline" className="text-[10px] mb-1.5 capitalize">
                  {technique.category}
                </Badge>
                <h3 className="font-semibold text-sm text-foreground">{technique.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{technique.tagline}</p>
              </div>
              <ChevronRight className={cn("h-4 w-4 text-muted-foreground shrink-0 mt-1 transition-transform", expanded && "rotate-90")} />
            </div>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 space-y-3 pl-12">
            <p className="text-sm text-muted-foreground leading-relaxed">{technique.description}</p>

            <div className="bg-primary/10 border border-primary/20 rounded-xl p-3">
              <p className="text-[10px] font-semibold text-primary uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <MessageCircle className="h-3 w-3" />
                Exact words to use
              </p>
              <p className="text-sm text-foreground leading-relaxed">{technique.exactWords}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="bg-secondary rounded-xl p-3">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Why it works</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{technique.whyItWorks}</p>
              </div>
              <div className="space-y-2">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
                  <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wide mb-1">When to use</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{technique.whenToUse}</p>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
                  <p className="text-[10px] font-semibold text-amber-400 uppercase tracking-wide mb-1">Avoid when</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{technique.avoidWhen}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function SalesTipsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("techniques")
  const [activeScenario, setActiveScenario] = useState<RolePlayScenario | null>(null)
  const [scenarioFilter, setScenarioFilter] = useState<string>("all")
  const [objectionFilter, setObjectionFilter] = useState<string>("all")
  const [langFilter, setLangFilter] = useState<string>("all")

  const scenarioCategories = ["all", ...Array.from(new Set(rolePlayScenarios.map((s) => s.category)))]
  const objectionCategories = ["all", ...Array.from(new Set(objectionCards.map((o) => o.category)))]
  const langSeverities = ["all", "critical", "important", "note"]

  const filteredScenarios = scenarioFilter === "all" ? rolePlayScenarios : rolePlayScenarios.filter((s) => s.category === scenarioFilter)
  const filteredObjections = objectionFilter === "all" ? objectionCards : objectionCards.filter((o) => o.category === objectionFilter)
  const filteredLang = langFilter === "all" ? languageSwaps : languageSwaps.filter((l) => l.severity === langFilter)

  return (
    <>
      {activeScenario && <RolePlayPlayer scenario={activeScenario} onClose={() => setActiveScenario(null)} />}

      <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto pb-24 md:pb-8">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-balance">Sales Training</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Proven techniques, word-for-word role-play scripts, objection handling, and compliance language standards for every Highlife team member.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Techniques", value: salesTechniques.length, icon: TrendingUp, color: "text-primary" },
            { label: "Role Play Scripts", value: rolePlayScenarios.length, icon: Play, color: "text-emerald-400" },
            { label: "Objections Covered", value: objectionCards.length, icon: ShieldAlert, color: "text-amber-400" },
            { label: "Language Rules", value: languageSwaps.length, icon: Languages, color: "text-red-400" },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Icon className={cn("h-4 w-4", stat.color)} />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground leading-none">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Tip of the Day */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
              <Lightbulb className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge className="text-xs bg-primary/20 text-primary border-primary/30">Principle of the Day</Badge>
              </div>
              <h3 className="font-semibold text-sm text-foreground mb-1">{tipOfTheDay.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tipOfTheDay.content}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-secondary rounded-xl overflow-x-auto scrollbar-none">
          {TABS.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-1 justify-center",
                  activeTab === tab.id
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.count && (
                  <span
                    className={cn(
                      "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                      activeTab === tab.id ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground",
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* ── Techniques Tab ─────────────────────────────────────────────── */}
        {activeTab === "techniques" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-base">Sales Techniques</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Tap any card to see the full technique, exact words to use, when to use it, and when to hold back.</p>
              </div>
            </div>
            <div className="space-y-3">
              {salesTechniques.map((t) => (
                <TechniqueCard key={t.id} technique={t} />
              ))}
            </div>
          </div>
        )}

        {/* ── Role Play Tab ───────────────────────────────────────────────── */}
        {activeTab === "roleplay" && (
          <div className="space-y-4">
            <div>
              <h2 className="font-semibold text-base">Role Play Scripts</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Word-for-word scripts based on real scenarios. Step through line by line. Toggle Practice Mode to cover your lines and test your recall.
              </p>
            </div>

            {/* Filter chips */}
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
              {scenarioCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setScenarioFilter(cat)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap",
                    scenarioFilter === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  {cat === "all" ? "All" : cat}
                </button>
              ))}
            </div>

            <div className="grid gap-3">
              {filteredScenarios.map((scenario) => (
                <Card key={scenario.id} className="hover:border-primary/40 transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge className={cn("text-xs border capitalize", categoryColors[scenario.category])}>
                            {scenario.category}
                          </Badge>
                          <Badge className={cn("text-xs border capitalize", difficultyColors[scenario.difficulty])}>
                            {scenario.difficulty}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {scenario.lines.length} lines
                          </span>
                        </div>
                        <h3 className="font-semibold text-sm text-foreground mb-1">{scenario.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-3">{scenario.scenario}</p>
                        <div className="flex items-start gap-1.5">
                          <Target className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                          <p className="text-xs text-muted-foreground">
                            <span className="text-foreground font-medium">Goal: </span>{scenario.goal}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button
                        size="sm"
                        className="gap-1.5"
                        onClick={() => setActiveScenario(scenario)}
                      >
                        <Play className="h-3.5 w-3.5" />
                        Start Role Play
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ── Objections Tab ─────────────────────────────────────────────── */}
        {activeTab === "objections" && (
          <div className="space-y-4">
            <div>
              <h2 className="font-semibold text-base">Objection Handling</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Tap a card to flip it — see exactly what not to say, what to say instead, and the psychology behind why it works.
              </p>
            </div>

            {/* Filter chips */}
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
              {objectionCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setObjectionFilter(cat)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap",
                    objectionFilter === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  {cat === "all" ? "All" : cat}
                </button>
              ))}
            </div>

            <div className="grid gap-3">
              {filteredObjections.map((card) => (
                <ObjectionFlipCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        )}

        {/* ── Language Tab ───────────────────────────────────────────────── */}
        {activeTab === "language" && (
          <div className="space-y-4">
            <div>
              <h2 className="font-semibold text-base">Compliance Language Standards</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Every prohibited phrase, the correct alternative, and exactly why it matters legally. These are non-negotiable standards, not suggestions.
              </p>
            </div>

            {/* Filter chips */}
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
              {langSeverities.map((s) => (
                <button
                  key={s}
                  onClick={() => setLangFilter(s)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap capitalize",
                    langFilter === s
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  {s === "all" ? "All" : s}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredLang.map((item) => (
                <LanguageSwapCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
