"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Search,
  BookOpen,
  Sunrise,
  Store,
  Shield,
  Scale,
  DollarSign,
  Package,
  ShieldAlert,
  Phone,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  Clock,
  Menu,
  X,
  ArrowLeft,
  AlertTriangle,
  Info,
  BookMarked,
} from "lucide-react"
import { handbookSections, searchHandbook, type HandbookSection, type HandbookArticle } from "@/lib/handbook-data"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ReactNode> = {
  Sunrise: <Sunrise className="h-4 w-4" />,
  Store: <Store className="h-4 w-4" />,
  Shield: <Shield className="h-4 w-4" />,
  Scale: <Scale className="h-4 w-4" />,
  DollarSign: <DollarSign className="h-4 w-4" />,
  Package: <Package className="h-4 w-4" />,
  ShieldAlert: <ShieldAlert className="h-4 w-4" />,
  Phone: <Phone className="h-4 w-4" />,
}

function getReadTime(content: string): number {
  const words = content.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

function ArticleContent({ content }: { content: string }) {
  const lines = content.split("\n")

  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Skip empty lines
    if (line.trim() === "") {
      i++
      continue
    }

    // H2 bold header (standalone **text**)
    if (line.startsWith("**") && line.endsWith("**") && !line.slice(2, -2).includes("**")) {
      elements.push(
        <h3 key={i} className="text-base font-semibold text-foreground mt-6 mb-3 pb-1.5 border-b border-border">
          {line.slice(2, -2)}
        </h3>
      )
      i++
      continue
    }

    // Warning / important callout
    if (line.toLowerCase().includes("zero tolerance") || line.toLowerCase().includes("never") && line.startsWith("**")) {
      elements.push(
        <div key={i} className="flex gap-3 bg-destructive/10 border border-destructive/30 rounded-lg p-4 my-3">
          <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
          <p className="text-sm text-foreground">{line.replace(/\*\*/g, "")}</p>
        </div>
      )
      i++
      continue
    }

    // Numbered list — collect consecutive items
    if (/^\d+\./.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\./.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s*/, ""))
        i++
      }
      elements.push(
        <ol key={`ol-${i}`} className="space-y-2 my-3">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-3 items-start">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-semibold shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-sm text-muted-foreground leading-relaxed">{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      )
      continue
    }

    // Bullet list — collect consecutive items
    if (line.startsWith("- ")) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].substring(2))
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} className="space-y-1.5 my-3">
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

  return <div className="space-y-0.5">{elements}</div>
}

function renderInline(text: string): React.ReactNode {
  // Handle inline bold **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  if (parts.length === 1) return text
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          )
        }
        return part
      })}
    </>
  )
}

export default function HandbookPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSection, setSelectedSection] = useState<HandbookSection | null>(handbookSections[0])
  const [selectedArticle, setSelectedArticle] = useState<HandbookArticle | null>(handbookSections[0].articles[0])
  const [readArticles, setReadArticles] = useState<Set<string>>(new Set())
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set([handbookSections[0].id]))
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [readProgress, setReadProgress] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  const searchResults = searchQuery.length >= 2 ? searchHandbook(searchQuery) : []
  const showSearch = searchQuery.length >= 2

  // Load read articles from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("handbook-read-articles")
    if (saved) setReadArticles(new Set(JSON.parse(saved)))
  }, [])

  // Track reading progress
  const handleScroll = useCallback(() => {
    const el = contentRef.current
    if (!el) return
    const { scrollTop, scrollHeight, clientHeight } = el
    const progress = scrollHeight <= clientHeight ? 100 : Math.round((scrollTop / (scrollHeight - clientHeight)) * 100)
    setReadProgress(progress)
    // Auto-mark as read when 80% scrolled
    if (progress >= 80 && selectedArticle) {
      setReadArticles((prev) => {
        const next = new Set(prev)
        next.add(selectedArticle.id)
        localStorage.setItem("handbook-read-articles", JSON.stringify([...next]))
        return next
      })
    }
  }, [selectedArticle])

  const markAsRead = (articleId: string) => {
    setReadArticles((prev) => {
      const next = new Set(prev)
      if (next.has(articleId)) {
        next.delete(articleId)
      } else {
        next.add(articleId)
      }
      localStorage.setItem("handbook-read-articles", JSON.stringify([...next]))
      return next
    })
  }

  const selectArticle = (article: HandbookArticle, section?: HandbookSection) => {
    setSelectedArticle(article)
    if (section) setSelectedSection(section)
    setSidebarOpen(false)
    setReadProgress(0)
    setTimeout(() => contentRef.current?.scrollTo({ top: 0 }), 10)
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(sectionId)) next.delete(sectionId)
      else next.add(sectionId)
      return next
    })
  }

  const totalArticles = handbookSections.reduce((acc, s) => acc + s.articles.length, 0)
  const readCount = readArticles.size

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-0px)] overflow-hidden">
      {/* Top progress bar */}
      {selectedArticle && (
        <div className="h-0.5 bg-border shrink-0">
          <div
            className="h-full bg-primary transition-all duration-150"
            style={{ width: `${readProgress}%` }}
          />
        </div>
      )}

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* ── SIDEBAR ────────────────────────────────── */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-72 bg-card border-r border-border flex flex-col transition-transform duration-200",
            "md:relative md:translate-x-0 md:z-auto",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-border shrink-0">
            <div className="flex items-center gap-2">
              <BookMarked className="h-4 w-4 text-primary" />
              <span className="font-semibold text-sm text-foreground">Handbook</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{readCount}/{totalArticles} read</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden p-1 rounded hover:bg-accent text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="px-4 py-3 border-b border-border shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted-foreground">Your progress</span>
              <span className="text-xs font-medium text-primary">
                {Math.round((readCount / totalArticles) * 100)}%
              </span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${(readCount / totalArticles) * 100}%` }}
              />
            </div>
          </div>

          {/* Search */}
          <div className="px-3 py-3 border-b border-border shrink-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 text-xs bg-background border-border"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          {/* Section / article list */}
          <div className="flex-1 overflow-y-auto py-2">
            {showSearch ? (
              <div className="px-2">
                <p className="text-xs text-muted-foreground px-2 py-1.5">
                  {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
                </p>
                {searchResults.length === 0 ? (
                  <p className="text-xs text-muted-foreground px-2 py-2">No articles found.</p>
                ) : (
                  searchResults.map((article) => {
                    const section = handbookSections.find((s) => s.articles.some((a) => a.id === article.id))
                    return (
                      <button
                        key={article.id}
                        onClick={() => selectArticle(article, section)}
                        className={cn(
                          "w-full text-left px-3 py-2.5 rounded-md mb-0.5 flex items-start gap-2 group transition-colors",
                          selectedArticle?.id === article.id ? "bg-primary/15 text-primary" : "hover:bg-accent/50"
                        )}
                      >
                        <ChevronRight className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground" />
                        <span className="text-xs font-medium text-foreground leading-snug">{article.title}</span>
                      </button>
                    )
                  })
                )}
              </div>
            ) : (
              <div className="px-2">
                {handbookSections.map((section) => {
                  const isExpanded = expandedSections.has(section.id)
                  const sectionReadCount = section.articles.filter((a) => readArticles.has(a.id)).length
                  return (
                    <div key={section.id} className="mb-1">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent/50 transition-colors group"
                      >
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                          {iconMap[section.icon] || <BookOpen className="h-4 w-4" />}
                        </span>
                        <span className="flex-1 text-left text-xs font-semibold text-foreground leading-snug">
                          {section.title}
                        </span>
                        <span className="text-xs text-muted-foreground mr-1">
                          {sectionReadCount}/{section.articles.length}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 text-muted-foreground transition-transform duration-150",
                            isExpanded && "rotate-180"
                          )}
                        />
                      </button>
                      {isExpanded && (
                        <div className="mt-0.5 ml-3 border-l border-border pl-2 space-y-0.5">
                          {section.articles.map((article) => {
                            const isRead = readArticles.has(article.id)
                            const isActive = selectedArticle?.id === article.id
                            return (
                              <button
                                key={article.id}
                                onClick={() => selectArticle(article, section)}
                                className={cn(
                                  "w-full text-left px-2.5 py-1.5 rounded-md flex items-center gap-2 transition-colors",
                                  isActive
                                    ? "bg-primary/15 text-primary"
                                    : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
                                )}
                              >
                                {isRead ? (
                                  <CheckCircle className="h-3 w-3 text-primary shrink-0" />
                                ) : (
                                  <div className="h-3 w-3 rounded-full border border-border shrink-0" />
                                )}
                                <span className="text-xs leading-snug">{article.title}</span>
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </aside>

        {/* Sidebar overlay (mobile) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── MAIN CONTENT ───────────────────────────── */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Content toolbar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border shrink-0 bg-background/80 backdrop-blur-sm">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-md hover:bg-accent text-muted-foreground"
            >
              <Menu className="h-4 w-4" />
            </button>

            {selectedSection && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
                <span className="text-primary">{selectedSection.title}</span>
                {selectedArticle && (
                  <>
                    <ChevronRight className="h-3 w-3 shrink-0" />
                    <span className="text-foreground font-medium truncate">{selectedArticle.title}</span>
                  </>
                )}
              </div>
            )}

            <div className="ml-auto flex items-center gap-2 shrink-0">
              {selectedArticle && (
                <>
                  <span className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {getReadTime(selectedArticle.content)} min read
                  </span>
                  <Button
                    variant={readArticles.has(selectedArticle.id) ? "default" : "outline"}
                    size="sm"
                    className="h-7 text-xs gap-1.5"
                    onClick={() => markAsRead(selectedArticle.id)}
                  >
                    <CheckCircle className="h-3 w-3" />
                    {readArticles.has(selectedArticle.id) ? "Read" : "Mark read"}
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Article content */}
          <div ref={contentRef} onScroll={handleScroll} className="flex-1 overflow-y-auto">
            {selectedArticle ? (
              <div className="max-w-2xl mx-auto px-4 md:px-8 py-8">
                {/* Article header */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    {selectedSection && (
                      <Badge variant="secondary" className="text-xs font-normal gap-1">
                        {iconMap[selectedSection.icon] || <BookOpen className="h-3 w-3" />}
                        {selectedSection.title}
                      </Badge>
                    )}
                    {readArticles.has(selectedArticle.id) && (
                      <Badge className="text-xs font-normal gap-1 bg-primary/20 text-primary border-primary/30">
                        <CheckCircle className="h-3 w-3" />
                        Completed
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight">
                    {selectedArticle.title}
                  </h1>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {getReadTime(selectedArticle.content)} min read
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedArticle.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-border mb-8" />

                {/* Article body */}
                <ArticleContent content={selectedArticle.content} />

                {/* Navigation to next article */}
                <div className="mt-12 pt-6 border-t border-border">
                  {(() => {
                    if (!selectedSection) return null
                    const currentIdx = selectedSection.articles.findIndex((a) => a.id === selectedArticle.id)
                    const nextArticle = selectedSection.articles[currentIdx + 1]
                    const nextSection = !nextArticle
                      ? handbookSections[handbookSections.findIndex((s) => s.id === selectedSection.id) + 1]
                      : null
                    const nextTarget = nextArticle || nextSection?.articles[0]
                    const nextTargetSection = nextArticle ? selectedSection : nextSection

                    if (!nextTarget) return null
                    return (
                      <button
                        onClick={() => selectArticle(nextTarget, nextTargetSection || undefined)}
                        className="group w-full flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
                      >
                        <div className="text-left">
                          <p className="text-xs text-muted-foreground mb-1">Up next</p>
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                            {nextTarget.title}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      </button>
                    )
                  })()}
                </div>
              </div>
            ) : (
              /* Landing state — no article selected */
              <div className="max-w-2xl mx-auto px-4 md:px-8 py-16 text-center">
                <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">Employee Handbook</h2>
                <p className="text-sm text-muted-foreground">Select an article from the sidebar to get started.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
