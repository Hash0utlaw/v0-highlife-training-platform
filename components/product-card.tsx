import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Zap, Timer, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const categoryColors: Record<string, string> = {
  delta: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  kratom: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  kanna: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  glass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  accessories: "bg-rose-500/10 text-rose-400 border-rose-500/20",
}

const categoryAccents: Record<string, string> = {
  delta: "bg-emerald-500",
  kratom: "bg-amber-500",
  kanna: "bg-violet-500",
  glass: "bg-blue-500",
  accessories: "bg-rose-500",
}

export function ProductCard({ product }: { product: Product }) {
  const hasTimingInfo =
    product.onsetTime && product.onsetTime !== "N/A" && product.duration && product.duration !== "N/A"

  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <Card className="overflow-hidden h-full flex flex-col hover:bg-secondary/40 active:scale-[0.98] transition-all duration-150 border-border hover:border-primary/30">
        {/* Colored top accent bar */}
        <div className={cn("h-0.5 w-full", categoryAccents[product.category] ?? "bg-primary")} />

        {/* Image */}
        <div className="aspect-[4/3] bg-secondary/50 relative overflow-hidden flex-shrink-0">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Package className="h-16 w-16 text-muted-foreground/30" />
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className="p-4 flex flex-col flex-1 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <Badge variant="outline" className={cn("text-xs shrink-0", categoryColors[product.category])}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Badge>
          </div>

          <div className="flex-1 space-y-1">
            <h3 className="font-semibold leading-tight line-clamp-2 text-sm md:text-base">{product.name}</h3>
            {product.tagline && (
              <p className="text-xs text-muted-foreground line-clamp-1">{product.tagline}</p>
            )}
          </div>

          {/* Timing chips */}
          {hasTimingInfo && (
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">
                <Zap className="h-2.5 w-2.5" />
                {product.onsetTime}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">
                <Timer className="h-2.5 w-2.5" />
                {product.duration}
              </span>
            </div>
          )}

          {/* Effects preview */}
          {product.effects && product.effects.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.effects.slice(0, 3).map((effect, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-primary/8 text-primary/80 border border-primary/15 px-1.5 py-0.5 rounded-full"
                >
                  {effect}
                </span>
              ))}
              {product.effects.length > 3 && (
                <span className="text-[10px] text-muted-foreground px-1 py-0.5">
                  +{product.effects.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* View details CTA */}
          <div className="flex items-center gap-1.5 text-xs text-primary font-medium pt-0.5 group-hover:gap-2.5 transition-all">
            View full details
            <ArrowRight className="h-3 w-3" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
