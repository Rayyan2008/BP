"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "left" | "right"
}

export function ScrollReveal({ children, delay = 0, direction = "up" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.unobserve(ref.current!)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const animationClass =
    direction === "up" ? "animate-fade-in-up" : direction === "left" ? "animate-fade-in-slide" : "animate-fade-in-slide"

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? animationClass : "opacity-0"}`}
      style={{ transform: isVisible ? "none" : `translateY(${direction === "up" ? "20px" : "0"})` }}
    >
      {children}
    </div>
  )
}
