"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MessageSquare, ChevronRight, Lightbulb } from "lucide-react"
import Link from "next/link"
import type { SalesTechnique } from "@/lib/data"

function SectionLabel({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-2.5">
      <span className="text-muted-foreground">{icon}</span>
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{text}</span>
    </div>
  )
}

export function SalesTipCard({ tip }: { tip: SalesTechnique }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div>
      <SectionLabel icon={<Lightbulb className="h-3.5 w-3.5" />} text="Today's Sales Tip" />
      <Card className="border-border overflow-hidden">
        <CardContent className="p-0">
          <div className="flex items-stretch">
            <div className="w-1 bg-amber-400 flex-shrink-0" />
            <div className="flex-1 p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-400">
                      {tip.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground">{tip.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 italic">{tip.tagline}</p>
                </div>
                <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-amber-400/10">
                  <Star className="h-4 w-4 text-amber-400" />
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{tip.description}</p>

              <div className="mt-3">
                {revealed ? (
                  <div className="rounded-lg bg-secondary border border-border p-3">
                    <p className="text-xs font-medium text-muted-foreground mb-1.5">Say this:</p>
                    <p className="text-sm font-medium text-foreground leading-relaxed">{tip.exactWords}</p>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setRevealed(true)}
                    className="w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-amber-400/40 bg-amber-400/5 hover:bg-amber-400/10 transition-colors py-2.5 px-3 text-sm font-medium text-amber-400"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    Reveal exact words to say
                  </button>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{tip.whyItWorks.slice(0, 60)}...</span>
                <Link href="/sales-tips" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
                  All tips <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
