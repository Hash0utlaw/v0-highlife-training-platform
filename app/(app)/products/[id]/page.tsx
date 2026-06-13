"use client"

import { useParams, useRouter } from "next/navigation"
import { mockProducts } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Clock,
  Timer,
  Sparkles,
  MessageSquare,
  AlertTriangle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Package,
  Lightbulb,
  ShieldAlert,
  ListChecks,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const categoryColors: Record<string, { badge: string; accent: string; bg: string }> = {
  delta: {
    badge: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    accent: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  kratom: {
    badge: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    accent: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  kanna: {
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    accent: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  glass: {
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    accent: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  accessories: {
    badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    accent: "text-rose-400",
    bg: "bg-rose-500/10",
  },
}

const dosageLevelColors: Record<string, string> = {
  Beginner: "border-l-emerald-500 bg-emerald-500/5",
  "New to Kanna": "border-l-emerald-500 bg-emerald-500/5",
  "New to Delta edibles": "border-l-emerald-500 bg-emerald-500/5",
  Light: "border-l-blue-500 bg-blue-500/5",
  "Occasional users": "border-l-blue-500 bg-blue-500/5",
  Moderate: "border-l-amber-500 bg-amber-500/5",
  Standard: "border-l-blue-500 bg-blue-500/5",
  Enhanced: "border-l-amber-500 bg-amber-500/5",
  "Regular users": "border-l-amber-500 bg-amber-500/5",
  High: "border-l-red-500 bg-red-500/5",
  Experienced: "border-l-red-500 bg-red-500/5",
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left border border-border rounded-xl overflow-hidden transition-colors hover:border-primary/40"
    >
      <div className="flex items-center justify-between gap-3 p-4">
        <span className="font-medium text-sm text-foreground">{question}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
        )}
      </div>
      {open && (
        <div className="px-4 pb-4">
          <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      )}
    </button>
  )
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const product = mockProducts.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="p-6 text-center space-y-4">
        <Package className="h-12 w-12 text-muted-foreground mx-auto" />
        <p className="text-muted-foreground">Product not found.</p>
        <Button asChild variant="outline">
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
    )
  }

  const colors = categoryColors[product.category] ?? categoryColors.delta
  const relatedProducts = mockProducts.filter((p) => product.relatedProducts.includes(p.id))
  const categoryLabel = product.category.charAt(0).toUpperCase() + product.category.slice(1)

  return (
    <div className="pb-6">
      {/* Hero Image */}
      <div className="relative h-56 md:h-80 w-full overflow-hidden">
        {product.image ? (
          <Image src={product.image} alt={product.name} fill className="object-cover" priority />
        ) : (
          <div className="h-full w-full bg-secondary flex items-center justify-center">
            <Package className="h-20 w-20 text-muted-foreground/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        {/* Back button */}
        <div className="absolute top-4 left-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.back()}
            className="bg-background/80 backdrop-blur-sm border border-border/50"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back
          </Button>
        </div>
      </div>

      {/* Header */}
      <div className="px-4 md:px-8 -mt-10 relative z-10 space-y-3 mb-6">
        <Badge variant="outline" className={colors.badge}>
          {categoryLabel}
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold leading-tight text-balance">{product.name}</h1>
        {product.tagline && (
          <p className={cn("text-sm font-medium", colors.accent)}>{product.tagline}</p>
        )}
        <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>

        {/* Quick stats */}
        {(product.onsetTime || product.duration) && (
          <div className="flex flex-wrap gap-3 pt-1">
            {product.onsetTime && product.onsetTime !== "N/A" && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/60 px-3 py-1.5 rounded-full">
                <Zap className="h-3 w-3 text-primary" />
                <span>Onset: <span className="text-foreground font-medium">{product.onsetTime}</span></span>
              </div>
            )}
            {product.duration && product.duration !== "N/A" && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/60 px-3 py-1.5 rounded-full">
                <Timer className="h-3 w-3 text-primary" />
                <span>Duration: <span className="text-foreground font-medium">{product.duration}</span></span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main content tabs */}
      <div className="px-4 md:px-8">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="w-full overflow-x-auto justify-start scrollbar-none flex-nowrap">
            <TabsTrigger value="overview" className="shrink-0">Overview</TabsTrigger>
            {product.dosageGuide && product.dosageGuide.length > 0 && (
              <TabsTrigger value="dosage" className="shrink-0">Dosage</TabsTrigger>
            )}
            <TabsTrigger value="sales" className="shrink-0">Selling</TabsTrigger>
            <TabsTrigger value="compliance" className="shrink-0">Compliance</TabsTrigger>
            {product.faqs && product.faqs.length > 0 && (
              <TabsTrigger value="faq" className="shrink-0">FAQ</TabsTrigger>
            )}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-5 mt-4">
            {/* Long description */}
            {product.longDescription && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    About This Product
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {product.longDescription.split("\n\n").filter(Boolean).map((para, i) => (
                      <p key={i} className="text-sm text-muted-foreground leading-relaxed">{para.trim()}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Effects */}
            {product.effects && product.effects.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Effects & Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.effects.map((effect, i) => (
                      <div key={i} className="flex items-center gap-2.5 bg-primary/5 border border-primary/15 rounded-lg px-3 py-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="text-sm">{effect}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Best for */}
            {product.bestFor && product.bestFor.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <ListChecks className="h-4 w-4 text-primary" />
                    Best For
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {product.bestFor.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Specs */}
            {product.specs && product.specs.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Package className="h-4 w-4 text-primary" />
                    Product Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {product.specs.map((spec, i) => (
                      <div key={i} className="flex items-start justify-between gap-4 px-6 py-3">
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide shrink-0 w-32 md:w-40">{spec.label}</span>
                        <span className="text-sm text-foreground text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Dosage Tab */}
          {product.dosageGuide && product.dosageGuide.length > 0 && (
            <TabsContent value="dosage" className="space-y-4 mt-4">
              <p className="text-sm text-muted-foreground">
                These are general guidelines. Always recommend customers start at the lowest level and assess before increasing. Individual responses vary based on body weight, tolerance, and metabolism.
              </p>
              <div className="space-y-3">
                {product.dosageGuide.map((guide, i) => (
                  <div
                    key={i}
                    className={cn(
                      "border-l-4 rounded-r-xl p-4 space-y-1",
                      dosageLevelColors[guide.level] ?? "border-l-border bg-secondary/30"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-sm font-semibold">{guide.level}</span>
                      <span className="text-xs font-mono bg-background/50 border border-border px-2 py-0.5 rounded-md text-foreground">
                        {guide.amount}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{guide.description}</p>
                  </div>
                ))}
              </div>

              {/* Onset / Duration reminder */}
              {(product.onsetTime || product.duration) && product.onsetTime !== "N/A" && (
                <Card className="border-amber-500/20 bg-amber-500/5">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Clock className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-1 text-sm">
                      <p className="font-medium text-amber-400">Timing reminder for customers</p>
                      {product.onsetTime && product.onsetTime !== "N/A" && (
                        <p className="text-muted-foreground">Onset: <span className="text-foreground">{product.onsetTime}</span> — always advise customers to wait before redosing.</p>
                      )}
                      {product.duration && product.duration !== "N/A" && (
                        <p className="text-muted-foreground">Duration: <span className="text-foreground">{product.duration}</span></p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          )}

          {/* Selling Tab */}
          <TabsContent value="sales" className="space-y-4 mt-4">
            {/* Talking points */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  Customer Talking Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {product.talkingPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center text-[10px] font-bold text-primary mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Pro tips */}
            {product.proTips && product.proTips.length > 0 && (
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    Pro Tips for Staff
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {product.proTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                        <Lightbulb className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Pairings */}
            {product.pairings && product.pairings.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground px-0.5">Pairs well with</p>
                <div className="flex flex-wrap gap-2">
                  {product.pairings.map((pid) => {
                    const p = mockProducts.find((x) => x.id === pid)
                    if (!p) return null
                    return (
                      <Link key={pid} href={`/products/${p.id}`}>
                        <Badge variant="outline" className="hover:bg-secondary transition-colors cursor-pointer">
                          {p.name}
                        </Badge>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-4 mt-4">
            {/* Critical compliance notes */}
            <Card className="border-destructive/30 bg-destructive/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-destructive">
                  <ShieldAlert className="h-4 w-4" />
                  Compliance Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {product.complianceNotes.map((note, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <AlertTriangle className={cn(
                        "h-4 w-4 shrink-0 mt-0.5",
                        note.startsWith("CRITICAL") ? "text-red-500" : "text-amber-500"
                      )} />
                      <span className={cn(
                        "leading-relaxed",
                        note.startsWith("CRITICAL") ? "text-foreground font-medium" : "text-muted-foreground"
                      )}>
                        {note}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Warnings */}
            {product.warnings && product.warnings.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Product Warnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {product.warnings.map((warning, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        {warning}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* FAQ Tab */}
          {product.faqs && product.faqs.length > 0 && (
            <TabsContent value="faq" className="space-y-2 mt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Common questions you may hear from customers — and how to answer them.
              </p>
              {product.faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </TabsContent>
          )}
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8 space-y-4">
            <h2 className="text-base font-semibold">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {relatedProducts.map((related) => {
                const relColors = categoryColors[related.category] ?? categoryColors.delta
                return (
                  <Link key={related.id} href={`/products/${related.id}`}>
                    <Card className="overflow-hidden hover:bg-secondary/40 active:scale-[0.98] transition-all h-full">
                      <div className="aspect-video relative overflow-hidden bg-secondary/50">
                        {related.image ? (
                          <Image src={related.image} alt={related.name} fill className="object-cover" />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Package className="h-8 w-8 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-3 space-y-1">
                        <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0", relColors.badge)}>
                          {related.category}
                        </Badge>
                        <p className="text-xs font-medium leading-tight line-clamp-2">{related.name}</p>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
