"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Product } from "@/lib/products-data"
import ProductCard from "./product-card"

interface ProductCarouselProps {
  title: string
  products: Product[]
}

export default function ProductCarousel({ title, products }: ProductCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const carouselRef = React.useRef<HTMLDivElement>(null)

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setScrollPosition(scrollLeft)
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener("scroll", checkScroll)
      window.addEventListener("resize", checkScroll)
      return () => {
        carousel.removeEventListener("scroll", checkScroll)
        window.removeEventListener("resize", checkScroll)
      }
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 400
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  if (products.length === 0) return null

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-logo mb-8">{title}</h2>

      <div className="relative">
        {/* Carousel */}
        <div
          ref={carouselRef}
          className="overflow-x-auto scrollbar-hide flex gap-6 pb-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-72">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition z-10"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition z-10"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  )
}

import React from "react"
