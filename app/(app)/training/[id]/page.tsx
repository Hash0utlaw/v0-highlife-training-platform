"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { mockModules } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  PlayCircle,
  ArrowRight,
  Lightbulb,
  AlertTriangle,
  Info,
  ChevronDown,
  Menu,
  X,
  Trophy,
  Clock,
  BookOpen,
  Star,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// ─── Rich content renderer ──────────────────────────────────────────────────

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  if (parts.length === 1) return text
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        )
      )}
    </>
  )
}

function LessonContent({ content }: { content: string }) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.trim() === "") { i++; continue }

    // H2 bold header (**Text**)
    if (line.startsWith("**") && line.endsWith("**") && !line.slice(2, -2).includes("**")) {
      elements.push(
        <h3 key={i} className="text-base font-semibold text-foreground mt-8 mb-3 pb-2 border-b border-border first:mt-0">
          {line.slice(2, -2)}
        </h3>
      )
      i++; continue
    }

    // Warning / danger callout
    if (
      (line.toLowerCase().includes("critical") || line.toLowerCase().includes("zero tolerance") || line.toLowerCase().includes("never sell")) &&
      line.startsWith("**")
    ) {
      elements.push(
        <div key={i} className="flex gap-3 bg-destructive/10 border border-destructive/30 rounded-lg p-4 my-4">
          <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
          <p className="text-sm text-foreground leading-relaxed">{renderInline(line.replace(/\*\*/g, ""))}</p>
        </div>
      )
      i++; continue
    }

    // Table detection: line starts with |
    if (line.startsWith("|")) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i])
        i++
      }
      // Filter out separator rows (---|---)
      const dataRows = tableLines.filter((l) => !l.match(/^\|[-| :]+\|$/))
      if (dataRows.length > 0) {
        const headers = dataRows[0].split("|").filter(Boolean).map((h) => h.trim())
        const rows = dataRows.slice(1).map((row) => row.split("|").filter(Boolean).map((c) => c.trim()))
        elements.push(
          <div key={`table-${i}`} className="my-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/80">
                  {headers.map((h, idx) => (
                    <th key={idx} className="px-3 py-2.5 text-left text-xs font-semibold text-foreground border-b border-border">
                      {renderInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ridx) => (
                  <tr key={ridx} className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors">
                    {row.map((cell, cidx) => (
                      <td key={cidx} className="px-3 py-2.5 text-xs text-muted-foreground">
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
      continue
    }

    // Numbered list
    if (/^\d+\./.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\./.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s*/, ""))
        i++
      }
      elements.push(
        <ol key={`ol-${i}`} className="space-y-2.5 my-4">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-3 items-start">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-sm text-muted-foreground leading-relaxed">{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      )
      continue
    }

    // Bullet list
    if (line.startsWith("- ")) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].substring(2))
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} className="space-y-2 my-4">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-2.5 items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span className="text-sm text-muted-foreground leading-relaxed">{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-3">
        {renderInline(line)}
      </p>
    )
    i++
  }

  return <div>{elements}</div>
}

// ─── Completion celebration ──────────────────────────────────────────────────

function CompletionBanner({ moduleId, quizId }: { moduleId: string; quizId: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-primary/10 border border-primary/30 p-6 text-center">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary rounded-full blur-3xl" />
      </div>
      <div className="relative">
        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
          <Trophy className="h-7 w-7 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-1">Module Complete!</h3>
        <p className="text-sm text-muted-foreground mb-5">
          You&apos;ve finished all lessons. Ready to prove what you know?
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button asChild size="sm" variant="outline">
            <Link href="/training">
              <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
              Back to Modules
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href={`/quizzes/${quizId}`}>
              Take the Quiz
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function TrainingModulePage({ params }: { params: Promise<{ id: string }> }) {
  const [moduleId, setModuleId] = useState<string | null>(null)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [readProgress, setReadProgress] = useState(0)
  const [animating, setAnimating] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    params.then(({ id }) => {
      setModuleId(id)
      const mod = mockModules.find((m) => m.id === id)
      if (mod) {
        const firstIncomplete = mod.lessons.findIndex((l) => !l.completed)
        setCurrentLessonIndex(firstIncomplete !== -1 ? firstIncomplete : 0)
        setCompletedLessons(new Set(mod.lessons.filter((l) => l.completed).map((l) => l.id)))
      }
    })
  }, [params])

  const module = moduleId ? mockModules.find((m) => m.id === moduleId) : null

  const handleScroll = useCallback(() => {
    const el = contentRef.current
    if (!el) return
    const { scrollTop, scrollHeight, clientHeight } = el
    const pct = scrollHeight <= clientHeight ? 100 : Math.round((scrollTop / (scrollHeight - clientHeight)) * 100)
    setReadProgress(pct)
  }, [])

  const navigateToLesson = (index: number) => {
    if (animating || !module) return
    setAnimating(true)
    setTimeout(() => {
      setCurrentLessonIndex(index)
      setReadProgress(0)
      setTimeout(() => contentRef.current?.scrollTo({ top: 0, behavior: "instant" }), 10)
      setAnimating(false)
    }, 150)
    setSidebarOpen(false)
  }

  const handleComplete = () => {
    if (!module) return
    const lesson = module.lessons[currentLessonIndex]
    const next = new Set(completedLessons)
    next.add(lesson.id)
    setCompletedLessons(next)
    if (currentLessonIndex < module.lessons.length - 1) {
      navigateToLesson(currentLessonIndex + 1)
    }
  }

  if (!moduleId) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-2">
          <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-muted-foreground">Loading module...</p>
        </div>
      </div>
    )
  }

  if (!module) {
    return (
      <div className="p-8 text-center space-y-4">
        <h1 className="text-xl font-bold">Module Not Found</h1>
        <p className="text-muted-foreground text-sm">This training module doesn&apos;t exist.</p>
        <Button asChild variant="outline" size="sm">
          <Link href="/training"><ArrowLeft className="h-4 w-4 mr-2" />Back to Training</Link>
        </Button>
      </div>
    )
  }

  const currentLesson = module.lessons[currentLessonIndex]
  const progress = Math.round((completedLessons.size / module.lessons.length) * 100)
  const allDone = completedLessons.size === module.lessons.length
  const isCurrentDone = completedLessons.has(currentLesson.id)

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-screen overflow-hidden">
      {/* Top reading progress bar */}
      <div className="h-0.5 bg-border shrink-0">
        <div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} />
      </div>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* ── LESSON SIDEBAR ──────────────────────────── */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-72 bg-card border-r border-border flex flex-col transition-transform duration-200",
            "md:relative md:translate-x-0 md:z-auto",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Sidebar header */}
          <div className="px-4 py-4 border-b border-border shrink-0">
            <Button variant="ghost" size="sm" className="-ml-2 mb-3 text-xs text-muted-foreground hover:text-foreground h-7" asChild>
              <Link href="/training">
                <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
                All Modules
              </Link>
            </Button>
            <h2 className="text-sm font-semibold text-foreground leading-snug line-clamp-2">{module.title}</h2>
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {module.estimatedTime}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                {module.lessons.length} lessons
              </span>
            </div>
          </div>

          {/* Module progress */}
          <div className="px-4 py-3 border-b border-border shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted-foreground">Progress</span>
              <span className="text-xs font-semibold text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>

          {/* Lesson list */}
          <div className="flex-1 overflow-y-auto py-2">
            {module.lessons.map((lesson, index) => {
              const isDone = completedLessons.has(lesson.id)
              const isCurrent = index === currentLessonIndex
              return (
                <button
                  key={lesson.id}
                  onClick={() => navigateToLesson(index)}
                  className={cn(
                    "w-full flex items-start gap-3 px-4 py-3 text-left transition-colors border-l-2",
                    isCurrent
                      ? "bg-primary/10 border-primary text-primary"
                      : "border-transparent hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <div className="mt-0.5 shrink-0">
                    {isDone ? (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    ) : isCurrent ? (
                      <PlayCircle className="h-4 w-4 text-primary" />
                    ) : (
                      <Circle className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-xs font-medium leading-snug", isCurrent && "text-primary")}>
                      {lesson.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">Lesson {index + 1}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Close button (mobile) */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-3 right-3 md:hidden p-1.5 rounded hover:bg-secondary text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </aside>

        {/* Sidebar overlay (mobile) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-30 bg-black/60 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* ── MAIN CONTENT ─────────────────────────────── */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Content toolbar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border shrink-0 bg-background/80 backdrop-blur-sm">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-md hover:bg-secondary text-muted-foreground"
            >
              <Menu className="h-4 w-4" />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground min-w-0 flex-1">
              <span className="text-primary font-medium truncate hidden sm:block">{module.title}</span>
              <ChevronRight className="h-3 w-3 shrink-0 hidden sm:block" />
              <span className="text-foreground font-medium truncate">{currentLesson.title}</span>
            </div>

            {/* Lesson counter */}
            <div className="shrink-0 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {currentLessonIndex + 1} / {module.lessons.length}
              </span>
              {isCurrentDone && (
                <Badge className="text-xs h-5 bg-primary/20 text-primary border-primary/30 font-normal">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Done
                </Badge>
              )}
            </div>
          </div>

          {/* Scrollable content */}
          <div
            ref={contentRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto"
          >
            <div
              className={cn(
                "max-w-2xl mx-auto px-4 md:px-8 py-8 transition-opacity duration-150",
                animating ? "opacity-0" : "opacity-100"
              )}
            >
              {/* Lesson header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                    Lesson {currentLessonIndex + 1} of {module.lessons.length}
                  </span>
                  {isCurrentDone && (
                    <span className="text-xs font-medium text-primary bg-primary/15 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Completed
                    </span>
                  )}
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground text-balance leading-tight">
                  {currentLesson.title}
                </h1>
              </div>

              <div className="h-px bg-border mb-8" />

              {/* Lesson body */}
              <LessonContent content={currentLesson.content} />

              {/* Key Takeaways */}
              {currentLesson.keyPoints && currentLesson.keyPoints.length > 0 && (
                <div className="mt-8 rounded-xl bg-primary/8 border border-primary/25 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Lightbulb className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">Key Takeaways</span>
                  </div>
                  <ul className="space-y-2.5">
                    {currentLesson.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Star className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm text-muted-foreground leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Info callout for info sections */}
              {currentLesson.content.toLowerCase().includes("note:") && (
                <div className="mt-4 flex gap-3 bg-blue-500/10 border border-blue-500/25 rounded-lg p-4">
                  <Info className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground">Review this lesson carefully before moving on.</p>
                </div>
              )}

              {/* Completion / Navigation */}
              <div className="mt-10 pt-6 border-t border-border">
                {allDone ? (
                  <CompletionBanner moduleId={module.id} quizId={module.quizId} />
                ) : (
                  <div className="flex items-center justify-between gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateToLesson(Math.max(0, currentLessonIndex - 1))}
                      disabled={currentLessonIndex === 0}
                    >
                      <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
                      Previous
                    </Button>

                    <Button
                      size="sm"
                      onClick={handleComplete}
                      className={cn(isCurrentDone && currentLessonIndex < module.lessons.length - 1 && "bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground")}
                    >
                      {isCurrentDone && currentLessonIndex < module.lessons.length - 1 ? (
                        <>
                          Next Lesson
                          <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                        </>
                      ) : currentLessonIndex === module.lessons.length - 1 ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                          Mark Complete
                        </>
                      ) : (
                        <>
                          Complete & Continue
                          <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {/* Bottom padding */}
              <div className="h-12" />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
