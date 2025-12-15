"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
  ArrowLeft,
} from "lucide-react"
import { handbookSections, searchHandbook, type HandbookSection, type HandbookArticle } from "@/lib/handbook-data"

const iconMap: Record<string, React.ReactNode> = {
  Sunrise: <Sunrise className="h-5 w-5" />,
  Store: <Store className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  Scale: <Scale className="h-5 w-5" />,
  DollarSign: <DollarSign className="h-5 w-5" />,
  Package: <Package className="h-5 w-5" />,
  ShieldAlert: <ShieldAlert className="h-5 w-5" />,
  Phone: <Phone className="h-5 w-5" />,
}

export default function HandbookPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSection, setSelectedSection] = useState<HandbookSection | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<HandbookArticle | null>(null)

  const searchResults = searchQuery.length >= 2 ? searchHandbook(searchQuery) : []
  const showSearchResults = searchQuery.length >= 2

  const renderContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      // Bold headers
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <h4 key={index} className="font-semibold text-foreground mt-4 mb-2">
            {line.replace(/\*\*/g, "")}
          </h4>
        )
      }
      // Bullet points
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="text-muted-foreground ml-4 mb-1">
            {line.substring(2)}
          </li>
        )
      }
      // Numbered lists
      if (/^\d+\./.test(line)) {
        return (
          <li key={index} className="text-muted-foreground ml-4 mb-1 list-decimal list-inside">
            {line.replace(/^\d+\.\s*/, "")}
          </li>
        )
      }
      // Empty lines
      if (line.trim() === "") {
        return <br key={index} />
      }
      // Regular text
      return (
        <p key={index} className="text-muted-foreground mb-2">
          {line}
        </p>
      )
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Employee Handbook</h1>
        <p className="text-muted-foreground">Policies, procedures, and everything you need to know</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search handbook (e.g., 'clock in', 'dress code', 'bank run')..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-card"
        />
      </div>

      {/* Search Results */}
      {showSearchResults && (
        <Card className="bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Search Results</CardTitle>
            <CardDescription>
              {searchResults.length} {searchResults.length === 1 ? "result" : "results"} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {searchResults.length === 0 ? (
              <p className="text-muted-foreground text-sm">No articles found. Try different keywords.</p>
            ) : (
              <div className="space-y-2">
                {searchResults.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <p className="font-medium text-foreground">{article.title}</p>
                      <div className="flex gap-1.5 mt-1">
                        {article.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Sections Grid */}
      {!showSearchResults && !selectedSection && (
        <div className="grid gap-4 sm:grid-cols-2">
          {handbookSections.map((section) => (
            <Card
              key={section.id}
              className="bg-card hover:bg-accent/50 transition-colors cursor-pointer group"
              onClick={() => setSelectedSection(section)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary shrink-0">
                    {iconMap[section.icon] || <BookOpen className="h-5 w-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">{section.articles.length} articles</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Section View */}
      {!showSearchResults && selectedSection && !selectedArticle && (
        <div className="space-y-4">
          <Button variant="ghost" size="sm" onClick={() => setSelectedSection(null)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to all sections
          </Button>

          <Card className="bg-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                  {iconMap[selectedSection.icon] || <BookOpen className="h-5 w-5" />}
                </div>
                <div>
                  <CardTitle>{selectedSection.title}</CardTitle>
                  <CardDescription>{selectedSection.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selectedSection.articles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <p className="font-medium text-foreground">{article.title}</p>
                      <div className="flex gap-1.5 mt-1">
                        {article.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Article Modal */}
      <Dialog open={!!selectedArticle} onOpenChange={(open) => !open && setSelectedArticle(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto flex flex-col">
          <DialogHeader className="shrink-0">
            <DialogTitle>{selectedArticle?.title}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 min-h-0 pr-4">
            <div className="pb-4">
              {selectedArticle && renderContent(selectedArticle.content)}

              {selectedArticle && (
                <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-border">
                  {selectedArticle.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}
