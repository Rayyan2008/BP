"use client"

import { useState, useMemo } from "react"
import { useAdmin } from "@/lib/admin-context"
import ProductCard from "./product-card"
import Link from "next/link"

interface ProductGridProps {
  products?: Array<{
    id: number | string
    name: string
    category: string
    price: string
    description: string
    colors?: string[]
  }>
  whatsappLink?: string
}

export default function ProductGrid({ products: legacyProducts, whatsappLink }: ProductGridProps) {
  const { products: adminProducts } = useAdmin()
  const [filters, setFilters] = useState({ category: null as string | null, searchTerm: "" })
  const [sortBy, setSortBy] = useState("featured")

  const categories = ["everyday", "casual", "formal", "premium"]

  const dataProducts = adminProducts && adminProducts.length > 0 ? adminProducts : legacyProducts || []

  const isNewFormat =
    dataProducts.length > 0 && dataProducts[0] && typeof dataProducts[0] === "object" && "colors" in dataProducts[0]

  const filteredProducts = useMemo(() => {
    let result = dataProducts

    if (!isNewFormat) {
      // Legacy format filtering
      if (filters.searchTerm) {
        result = result.filter((p: any) => p.name.toLowerCase().includes(filters.searchTerm.toLowerCase()))
      }
      return result
    }

    // New format filtering
    if (filters.category) {
      result = result.filter((p: any) => p.category === filters.category)
    }

    if (filters.searchTerm) {
      result = result.filter((p: any) => p.name.toLowerCase().includes(filters.searchTerm.toLowerCase()))
    }

    if (sortBy === "price-low") {
      result.sort((a: any, b: any) => (a.price || 0) - (b.price || 0))
    } else if (sortBy === "price-high") {
      result.sort((a: any, b: any) => (b.price || 0) - (a.price || 0))
    }

    return result
  }, [filters, sortBy, dataProducts])

  if (isNewFormat === false) {
    return (
      <div className="space-y-6">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product: any) => (
              <div key={product.id} className="group flex flex-col h-full">
                <div className="bg-card h-64 mb-4 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-muted to-background flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Product Image</span>
                  </div>
                </div>

                <div className="flex flex-col flex-1">
                  <span className="text-xs text-muted-foreground tracking-wider uppercase mb-2">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-light text-foreground mb-2 tracking-wide">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{product.description}</p>
                  <p className="text-sm font-medium text-foreground mb-4">{product.price}</p>

                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/shop/${product.id}`}
                      className="flex items-center justify-center w-full px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium tracking-wide"
                    >
                      View Product
                    </Link>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium tracking-wide"
                    >
                      Contact to Order
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found.</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8 flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={filters.searchTerm}
              onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <select
            value={filters.category || ""}
            onChange={(e) => setFilters({ ...filters, category: e.target.value || null })}
            className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Showing {filteredProducts.length} of {dataProducts.length} products
        </p>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
