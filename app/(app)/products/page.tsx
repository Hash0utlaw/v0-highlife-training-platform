"use client"

import { useState, useMemo } from "react"
import { mockProducts } from "@/lib/data"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import Image from "next/image"

const categories = [
  { value: "all", label: "All" },
  { value: "delta", label: "Delta" },
  { value: "kratom", label: "Kratom" },
  { value: "glass", label: "Glass" },
  { value: "accessories", label: "Accessories" },
]

export default function ProductsPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === "all" || product.category === category
      return matchesSearch && matchesCategory
    })
  }, [search, category])

  return (
    <div className="space-y-6">
      <div className="relative h-40 md:h-56 w-full overflow-hidden">
        <Image src="/hero-products.jpg" alt="Product library" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Product Library</h1>
          <p className="text-muted-foreground mt-1">Learn about our products to help customers better</p>
        </div>
      </div>

      <div className="px-4 md:px-8 pb-4 md:pb-8 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-input/50"
          />
        </div>

        {/* Category Tabs */}
        <Tabs value={category} onValueChange={setCategory}>
          <TabsList className="w-full justify-start overflow-x-auto">
            {categories.map((cat) => (
              <TabsTrigger key={cat.value} value={cat.value} className="flex-shrink-0">
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
