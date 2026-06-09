"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/products-data"
import { useCart } from "@/lib/cart-context"
import ProductQuickView from "./product-quick-view"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [showQuickView, setShowQuickView] = useState(false)
  const { addToCart } = useCart()

  const getAvailableStock = (size: string, color: string) => {
    return product.stock[`${color}-${size}`] || 0
  }

  const getTotalStock = () => {
    return Object.values(product.stock).reduce((sum, stock) => sum + stock, 0)
  }

  const isOutOfStock = getTotalStock() === 0

  return (
    <>
      <div
        className="group relative overflow-hidden rounded-lg bg-card hover:shadow-lg transition-all duration-300"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {product.isNew && (
              <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded">New</span>
            )}
            {product.isTrending && (
              <span className="bg-secondary text-secondary-foreground px-3 py-1 text-xs font-semibold rounded">
                Trending
              </span>
            )}
            {isOutOfStock && (
              <span className="bg-destructive text-destructive-foreground px-3 py-1 text-xs font-semibold rounded">
                Out of Stock
              </span>
            )}
          </div>

          {/* Hover Overlay */}
          {isHovering && !isOutOfStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-all duration-300">
              <button
                onClick={() => setShowQuickView(true)}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition"
              >
                Quick View
              </button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{product.description}</p>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-foreground">₨{product.price.toLocaleString()}</span>
            {isOutOfStock ? (
              <span className="text-xs text-destructive font-semibold">Out of Stock</span>
            ) : (
              <span className="text-xs text-muted-foreground">Available: {getTotalStock()}</span>
            )}
          </div>

          {/* Colors Preview */}
          <div className="flex gap-2 mb-4">
            {product.colors.map((color) => (
              <div
                key={color}
                title={color}
                className="w-4 h-4 rounded-full border border-border"
                style={{
                  backgroundColor:
                    color === "Black"
                      ? "#000"
                      : color === "Navy"
                        ? "#001f3f"
                        : color === "White"
                          ? "#fff"
                          : color === "Beige"
                            ? "#f5e6d3"
                            : color === "Sage Green"
                              ? "#87ae73"
                              : "#666",
                }}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-2">
            <Link
              href={`/shop/${product.id}`}
              className="block w-full text-center py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition font-semibold"
            >
              View Product
            </Link>
            <a
              href={`https://wa.me/923164602653?text=${encodeURIComponent(`Hi! I'm interested in the ${product.name} (${getTotalStock()} available). Please send more details.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg transition font-semibold"
            >
              Contact to Order
            </a>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && <ProductQuickView product={product} onClose={() => setShowQuickView(false)} />}
    </>
  )
}
