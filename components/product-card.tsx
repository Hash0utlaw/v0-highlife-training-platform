"use client"

import Image from "next/image"
import type { Product } from "@/lib/data"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, MessageSquare, AlertTriangle, Sparkles } from "lucide-react"

const categoryColors: Record<string, string> = {
  delta: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  kratom: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  glass: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  accessories: "bg-purple-500/10 text-purple-500 border-purple-500/20",
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Dialog>
      <Card className="overflow-hidden hover:bg-secondary/30 transition-colors">
        <CardContent className="p-0">
          <div className="aspect-square bg-secondary/50 relative overflow-hidden">
            {product.image ? (
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Package className="h-16 w-16 text-muted-foreground/30" />
              </div>
            )}
          </div>
          <div className="p-4 space-y-2">
            <Badge variant="outline" className={categoryColors[product.category]}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Badge>
            <h3 className="font-semibold line-clamp-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <DialogTrigger asChild>
            <Button variant="secondary" className="w-full">
              View Details
            </Button>
          </DialogTrigger>
        </CardFooter>
      </Card>

      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-lg bg-secondary relative overflow-hidden flex-shrink-0">
              {product.image ? (
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Package className="h-8 w-8 text-muted-foreground/50" />
                </div>
              )}
            </div>
            <div>
              <Badge variant="outline" className={`${categoryColors[product.category]} mb-2`}>
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Badge>
              <DialogTitle className="text-xl">{product.name}</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <p className="text-muted-foreground">{product.description}</p>

        <Tabs defaultValue="effects" className="mt-4">
          <TabsList className="w-full">
            {product.effects.length > 0 && <TabsTrigger value="effects">Effects</TabsTrigger>}
            <TabsTrigger value="talking">Talking Points</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          {product.effects.length > 0 && (
            <TabsContent value="effects" className="mt-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                Key Effects & Benefits
              </div>
              <ul className="space-y-2">
                {product.effects.map((effect, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {effect}
                  </li>
                ))}
              </ul>
            </TabsContent>
          )}

          <TabsContent value="talking" className="mt-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <MessageSquare className="h-4 w-4" />
              Customer Talking Points
            </div>
            <ul className="space-y-2">
              {product.talkingPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="compliance" className="mt-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-destructive">
              <AlertTriangle className="h-4 w-4" />
              Compliance Notes
            </div>
            <ul className="space-y-2">
              {product.complianceNotes.map((note, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 flex-shrink-0" />
                  {note}
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
