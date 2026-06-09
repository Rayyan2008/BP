"use client"

import { useState } from "react"
import Image from "next/image"
import type { Product } from "@/lib/products-data"
import { useCart } from "@/lib/cart-context"

interface ProductQuickViewProps {
  product: Product
  onClose: () => void
}

export default function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const getAvailableStock = (size: string, color: string) => {
    return product.stock[`${color}-${size}`] || 0
  }

  const availableStock = getAvailableStock(selectedSize, selectedColor)
  const isOutOfStock = availableStock === 0

  const handleAddToCart = () => {
    if (isOutOfStock) return

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
      image: product.image,
      maxStock: availableStock,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Close Button */}
          <button onClick={onClose} className="float-right text-2xl text-muted-foreground hover:text-foreground">
            ✕
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 clear-both">
            {/* Image */}
            <div className="relative h-96 rounded-lg overflow-hidden bg-muted">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>

            {/* Details */}
            <div>
              <h2 className="text-3xl font-logo mb-2">{product.name}</h2>
              <p className="text-muted-foreground mb-4">{product.description}</p>

              {/* Price */}
              <div className="mb-6">
                <p className="text-3xl font-bold text-foreground">${product.price}</p>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Color</label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-lg border-2 transition ${
                        selectedColor === color ? "border-primary" : "border-border"
                      }`}
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
                                    : color === "Burgundy"
                                      ? "#800020"
                                      : color === "Deep Purple"
                                        ? "#663399"
                                        : color === "Taupe"
                                          ? "#b38b6d"
                                          : color === "Cream"
                                            ? "#fffdd0"
                                            : color === "Charcoal"
                                              ? "#36454f"
                                              : color === "Grey"
                                                ? "#808080"
                                                : color === "Olive"
                                                  ? "#808000"
                                                  : color === "Maroon"
                                                    ? "#800000"
                                                    : color === "Bronze"
                                                      ? "#cd7f32"
                                                      : color === "Cognac"
                                                        ? "#a1542d"
                                                        : "#666",
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Size</label>
                <div className="grid grid-cols-3 gap-2">
                  {product.sizes.map((size) => {
                    const stock = getAvailableStock(size, selectedColor)
                    const sizeOutOfStock = stock === 0
                    return (
                      <button
                        key={size}
                        onClick={() => !sizeOutOfStock && setSelectedSize(size)}
                        disabled={sizeOutOfStock}
                        className={`py-2 px-3 rounded-lg border transition ${
                          selectedSize === size
                            ? "border-primary bg-primary text-primary-foreground"
                            : sizeOutOfStock
                              ? "border-border opacity-50 cursor-not-allowed"
                              : "border-border hover:border-primary"
                        }`}
                      >
                        <div className="text-sm font-semibold">{size}</div>
                        {sizeOutOfStock && <div className="text-xs">Out</div>}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Stock Status */}
              {isOutOfStock ? (
                <div className="mb-6 p-3 bg-destructive/10 text-destructive rounded-lg text-sm font-semibold">
                  Out of Stock
                </div>
              ) : (
                <div className="mb-6 text-sm text-muted-foreground">{availableStock} in stock</div>
              )}

              {/* Quantity */}
              {!isOutOfStock && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3">Quantity</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 border border-border rounded hover:bg-muted"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(availableStock, quantity + 1))}
                      className="px-3 py-2 border border-border rounded hover:bg-muted"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
