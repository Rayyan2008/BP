"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useAdmin } from "@/lib/admin-context"
import { useCart } from "@/lib/cart-context"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const { products } = useAdmin()
  const product = products.find((p) => p.id === productId)
  const { addToCart } = useCart()

  const [selectedColor, setSelectedColor] = useState<string>("")
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0] || "")
      setSelectedSize(product.sizes[0] || "")
    }
  }, [product])

  useEffect(() => {
    gsap.from(".product-detail-page", {
      duration: 1,
      opacity: 0,
      y: 50,
      scrollTrigger: {
        trigger: ".product-detail-page",
        start: "top center",
        toggleActions: "play none none none",
      },
    })
  }, [])

  if (!product) {
    return (
      <>
        <Navigation />
        <main className="flex-1 bg-background min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-logo mb-4">Product not found</h1>
            <Link href="/shop" className="text-primary hover:text-primary/80">
              Back to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

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

    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const generateWhatsAppMessage = () => {
    return encodeURIComponent(
      `Hi! I'm interested in ordering:\n\n${product.name}\nColor: ${selectedColor}\nSize: ${selectedSize}\nQuantity: ${quantity}\nPrice per item: ₨${product.price.toLocaleString()}`,
    )
  }

  const displayImage = product.colorImages?.[selectedColor] || product.image || "/placeholder.svg"

  return (
    <>
      <Navigation />
      <main className="flex-1 bg-background product-detail-page">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Back Button */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ChevronLeft size={20} />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative h-96 md:h-full rounded-lg overflow-hidden bg-muted min-h-96">
              {displayImage && (
                <Image
                  key={`${productId}-${selectedColor}`}
                  src={displayImage || "/placeholder.svg"}
                  alt={`${product.name} - ${selectedColor}`}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>

            {/* Details */}
            <div>
              <h1 className="text-4xl font-logo mb-2">{product.name}</h1>
              <p className="text-muted-foreground mb-6">{product.description}</p>

              {/* Price */}
              <div className="mb-8">
                <p className="text-4xl font-bold text-foreground">₨{product.price.toLocaleString()}</p>
              </div>

              {/* Badges */}
              <div className="flex gap-2 mb-8">
                {product.isNew && (
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded">
                    New
                  </span>
                )}
                {product.isTrending && (
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded">
                    Trending
                  </span>
                )}
              </div>

              {/* Color Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-3">Color</label>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-lg border-2 transition ${
                        selectedColor === color ? "border-primary" : "border-border"
                      } ${isOutOfStock ? "opacity-50 cursor-not-allowed" : ""}`}
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
                                      : color === "Charcoal"
                                        ? "#36454F"
                                        : color === "Taupe"
                                          ? "#b38b6d"
                                          : color === "Cream"
                                            ? "#fffdd0"
                                            : color === "Grey"
                                              ? "#808080"
                                              : color === "Olive"
                                                ? "#808000"
                                                : color === "Maroon"
                                                  ? "#800000"
                                                  : color === "Bronze"
                                                    ? "#cd7f32"
                                                    : color === "Cognac"
                                                      ? "#a86c3f"
                                                      : color === "Deep Purple"
                                                        ? "#2a0845"
                                                        : "#666",
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-3">Size</label>
                <div className="grid grid-cols-4 gap-2">
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
                <div className="mb-8">
                  <label className="block text-sm font-semibold mb-3">Quantity</label>
                  <div className="flex items-center gap-3 w-fit">
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

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`w-full py-3 rounded-lg font-semibold transition ${
                    addedToCart
                      ? "bg-green-600 text-white"
                      : isOutOfStock
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {addedToCart ? "Added to Cart ✓" : isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </button>

                <a
                  href={`https://wa.me/923164602653?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg font-semibold transition text-center"
                >
                  Contact to Order
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
